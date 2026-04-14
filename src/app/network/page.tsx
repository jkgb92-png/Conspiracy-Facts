"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { GraphData, GraphNode, GraphNodeType } from "@/types";

// Load D3 graph client-side only (no SSR) to avoid window/document errors
const InfluenceGraph = dynamic(() => import("@/components/InfluenceGraph"), { ssr: false });

const NODE_TYPE_OPTIONS: { label: string; value: GraphNodeType | "" }[] = [
  { label: "All", value: "" },
  { label: "People", value: "person" },
  { label: "Organizations", value: "organization" },
  { label: "Documents", value: "document" },
  { label: "Events", value: "event" },
  { label: "Locations", value: "location" },
];

const RELATION_LABELS: Record<string, string> = {
  funded_by: "Funded By",
  mentioned_in: "Mentioned In",
  affiliated_with: "Affiliated With",
  authored: "Authored",
  attended: "Attended",
  located_at: "Located At",
  predecessor_of: "Predecessor Of",
  collaborated_with: "Collaborated With",
};

export default function NetworkPage() {
  const [data, setData] = useState<GraphData>({ nodes: [], edges: [] });
  const [typeFilter, setTypeFilter] = useState<GraphNodeType | "">("");
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/network")
      .then((r) => r.json())
      .then(({ data: graphData }: { data: GraphData }) => {
        setData(graphData);
        setIsLoading(false);
      });
  }, []);

  // Derive filtered graph from data + typeFilter — no extra state needed
  const filtered = useMemo<GraphData>(() => {
    if (!typeFilter) return data;
    const nodes = data.nodes.filter((n) => n.type === typeFilter);
    const ids = new Set(nodes.map((n) => n.id));
    const edges = data.edges.filter((e) => ids.has(e.source) && ids.has(e.target));
    return { nodes, edges };
  }, [typeFilter, data]);

  // Get edges connected to selected node
  const selectedEdges = selectedNode
    ? data.edges.filter(
        (e) => e.source === selectedNode.id || e.target === selectedNode.id
      )
    : [];


  return (
    <div
      className="wr-bg wr-scanlines min-h-screen flex flex-col"
      style={{ fontFamily: "var(--wr-mono)" }}
    >
      {/* Top bar */}
      <div
        className="border-b px-6 py-3 flex items-center justify-between shrink-0"
        style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-2 h-2 rounded-full wr-pulse"
            style={{ background: "#f59e0b" }}
          />
          <span
            className="text-xs uppercase tracking-widest font-bold"
            style={{ color: "#f59e0b" }}
          >
            Network of Influence
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded border"
            style={{ borderColor: "var(--wr-border)", color: "var(--wr-text-dim)" }}
          >
            Neo4j · D3.js Force Graph
          </span>
        </div>
        <div className="text-xs wr-mono" style={{ color: "var(--wr-text-dim)" }}>
          {data.nodes.length} nodes · {data.edges.length} edges
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className="w-64 shrink-0 border-r flex flex-col overflow-hidden"
          style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface)" }}
        >
          {/* Filters */}
          <div
            className="px-4 py-2.5 border-b text-[10px] uppercase tracking-widest font-bold"
            style={{ borderColor: "var(--wr-border)", color: "var(--wr-text-dim)" }}
          >
            Filter by Type
          </div>
          <div className="p-3 space-y-1">
            {NODE_TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTypeFilter(opt.value)}
                className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors ${
                  typeFilter === opt.value
                    ? "font-bold"
                    : "hover:bg-[var(--wr-surface-2)]"
                }`}
                style={
                  typeFilter === opt.value
                    ? { background: "var(--wr-teal)20", color: "var(--wr-teal)" }
                    : { color: "var(--wr-text-dim)" }
                }
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Node list */}
          <div
            className="px-4 py-2 border-y text-[10px] uppercase tracking-widest font-bold"
            style={{ borderColor: "var(--wr-border)", color: "var(--wr-text-dim)" }}
          >
            Entities ({filtered.nodes.length})
          </div>
          <div className="flex-1 overflow-y-auto divide-y" style={{ borderColor: "var(--wr-border)" }}>
            {filtered.nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                className={`w-full text-left px-4 py-2.5 space-y-0.5 transition-colors hover:bg-[var(--wr-surface-2)] ${
                  selectedNode?.id === node.id ? "border-l-2 border-[var(--wr-teal)]" : ""
                }`}
                style={selectedNode?.id === node.id ? { background: "var(--wr-surface-2)" } : {}}
              >
                <p className="text-xs font-semibold truncate" style={{ color: "var(--wr-text)" }}>
                  {node.label}
                </p>
                <p className="text-[10px] capitalize" style={{ color: "var(--wr-text-dim)" }}>
                  {node.type} · {node.corroborationScore}/100
                </p>
              </button>
            ))}
          </div>
        </aside>

        {/* Graph canvas */}
        <main className="flex-1 overflow-hidden relative" style={{ background: "var(--wr-bg)" }}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <span className="w-8 h-8 border-2 border-[var(--wr-teal)] border-t-transparent rounded-full animate-spin" />
                <p className="text-xs wr-mono" style={{ color: "var(--wr-teal)" }}>
                  Loading graph data…
                </p>
              </div>
            </div>
          ) : (
            <InfluenceGraph
              data={filtered}
              height={600}
              onNodeSelect={setSelectedNode}
            />
          )}
        </main>

        {/* Right panel: Relationship details */}
        <aside
          className="w-64 shrink-0 border-l flex flex-col overflow-hidden"
          style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface)" }}
        >
          <div
            className="px-4 py-2.5 border-b text-[10px] uppercase tracking-widest font-bold"
            style={{ borderColor: "var(--wr-border)", color: "var(--wr-text-dim)" }}
          >
            {selectedNode ? "Relationships" : "Select a Node"}
          </div>

          {selectedNode ? (
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {/* Node info */}
              <div
                className="rounded-lg border p-3 space-y-1.5"
                style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface-2)" }}
              >
                <p className="text-xs font-bold" style={{ color: "var(--wr-text)" }}>
                  {selectedNode.label}
                </p>
                <p className="text-[10px] capitalize" style={{ color: "var(--wr-text-dim)" }}>
                  {selectedNode.type}
                </p>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--wr-text-dim)" }}>
                  {selectedNode.description}
                </p>
                <div className="pt-1">
                  <div
                    className="text-[10px] uppercase tracking-widest mb-1"
                    style={{ color: "var(--wr-text-dim)" }}
                  >
                    Corroboration Score
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="flex-1 rounded-full h-1 overflow-hidden"
                      style={{ background: "var(--wr-border)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${selectedNode.corroborationScore}%`,
                          background: "var(--wr-teal)",
                        }}
                      />
                    </div>
                    <span
                      className="text-xs font-bold wr-mono shrink-0"
                      style={{ color: "var(--wr-teal)" }}
                    >
                      {selectedNode.corroborationScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edges */}
              {selectedEdges.length > 0 && (
                <div className="space-y-1.5">
                  <p
                    className="text-[10px] uppercase tracking-widest font-bold"
                    style={{ color: "var(--wr-text-dim)" }}
                  >
                    Connected ({selectedEdges.length})
                  </p>
                  {selectedEdges.map((edge) => {
                    const otherId = edge.source === selectedNode.id ? edge.target : edge.source;
                    const other = data.nodes.find((n) => n.id === otherId);
                    const direction = edge.source === selectedNode.id ? "→" : "←";
                    return (
                      <button
                        key={edge.id}
                        onClick={() => other && setSelectedNode(other)}
                        className="w-full text-left rounded-lg border p-2.5 space-y-1 transition-colors hover:border-[var(--wr-teal)]/40"
                        style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface-2)" }}
                      >
                        <div
                          className="text-[10px] font-bold uppercase tracking-widest"
                          style={{ color: "var(--wr-teal)" }}
                        >
                          {direction} {RELATION_LABELS[edge.relation] ?? edge.relation}
                        </div>
                        <div className="text-[11px] truncate" style={{ color: "var(--wr-text)" }}>
                          {other?.label ?? otherId}
                        </div>
                        <div className="flex items-center gap-1">
                          {"▓".repeat(edge.weight).split("").map((_, i) => (
                            <div
                              key={i}
                              className="h-1 w-2 rounded-sm"
                              style={{ background: i < edge.weight ? "var(--wr-teal)" : "var(--wr-border)" }}
                            />
                          ))}
                          <span
                            className="text-[9px] wr-mono ml-1"
                            style={{ color: "var(--wr-text-dim)" }}
                          >
                            weight {edge.weight}/10
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xs text-center px-4" style={{ color: "var(--wr-text-dim)" }}>
                Click a node in the graph or select from the entity list to see connections.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
