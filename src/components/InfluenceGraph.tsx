"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";
import { GraphData, GraphNode, GraphNodeType } from "@/types";

interface InfluenceGraphProps {
  data: GraphData;
  width?: number;
  height?: number;
  onNodeSelect?: (node: GraphNode | null) => void;
}

const NODE_COLORS: Record<GraphNodeType, string> = {
  person: "#00e5c0",
  organization: "#f59e0b",
  document: "#818cf8",
  event: "#fb7185",
  location: "#34d399",
};

const NODE_SIZES: Record<GraphNodeType, number> = {
  person: 10,
  organization: 14,
  document: 9,
  event: 11,
  location: 8,
};

// D3 simulation needs mutable node/link objects
interface SimNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: GraphNodeType;
  corroborationScore: number;
}

interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  id: string;
  relation: string;
  weight: number;
}

export default function InfluenceGraph({
  data,
  width = 800,
  height = 560,
  onNodeSelect,
}: InfluenceGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    node: GraphNode;
  } | null>(null);

  const select = useCallback(
    (node: GraphNode | null) => {
      setSelected(node);
      onNodeSelect?.(node);
    },
    [onNodeSelect]
  );

  useEffect(() => {
    if (!svgRef.current || data.nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const nodes: SimNode[] = data.nodes.map((n) => ({ ...n }));
    const nodesById = new Map(nodes.map((n) => [n.id, n]));

    const links: SimLink[] = data.edges
      .map((e) => ({
        id: e.id,
        source: nodesById.get(e.source)!,
        target: nodesById.get(e.target)!,
        relation: e.relation,
        weight: e.weight,
      }))
      .filter((l) => l.source && l.target);

    const simulation = d3
      .forceSimulation<SimNode>(nodes)
      .force(
        "link",
        d3
          .forceLink<SimNode, SimLink>(links)
          .id((d) => d.id)
          .distance((l) => 120 - l.weight * 5)
          .strength(0.4)
      )
      .force("charge", d3.forceManyBody().strength(-220))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(22));

    // Arrow markers
    svg
      .append("defs")
      .selectAll("marker")
      .data(["default"])
      .enter()
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -4 8 8")
      .attr("refX", 22)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-4L8,0L0,4")
      .attr("fill", "#1e2736");

    // Zoom group
    const g = svg.append("g");
    svg.call(
      d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.3, 3])
        .on("zoom", (event) => g.attr("transform", event.transform))
    );

    // Links
    const linkSel = g
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#1e2736")
      .attr("stroke-width", (d) => 0.5 + d.weight * 0.3)
      .attr("stroke-opacity", 0.7)
      .attr("marker-end", "url(#arrow)");

    // Link labels
    const linkLabelSel = g
      .append("g")
      .selectAll("text")
      .data(links)
      .enter()
      .append("text")
      .attr("fill", "#334155")
      .attr("font-size", 8)
      .attr("font-family", "JetBrains Mono, monospace")
      .attr("text-anchor", "middle")
      .text((d) => d.relation.replace(/_/g, " "));

    // Node groups
    const nodeSel = g
      .append("g")
      .selectAll<SVGGElement, SimNode>("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("cursor", "pointer")
      .call(
        d3
          .drag<SVGGElement, SimNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      )
      .on("click", (_event, d) => {
        const original = data.nodes.find((n) => n.id === d.id) ?? null;
        select(original);
      })
      .on("mouseover", (event, d) => {
        const original = data.nodes.find((n) => n.id === d.id);
        if (original) {
          const rect = svgRef.current!.getBoundingClientRect();
          setTooltip({
            x: event.clientX - rect.left + 12,
            y: event.clientY - rect.top - 8,
            node: original,
          });
        }
      })
      .on("mouseleave", () => setTooltip(null));

    // Outer glow ring
    nodeSel
      .append("circle")
      .attr("r", (d) => NODE_SIZES[d.type] + 5)
      .attr("fill", (d) => NODE_COLORS[d.type])
      .attr("fill-opacity", 0.12);

    // Main circle
    nodeSel
      .append("circle")
      .attr("r", (d) => NODE_SIZES[d.type])
      .attr("fill", (d) => NODE_COLORS[d.type])
      .attr("fill-opacity", 0.9)
      .attr("stroke", "#0a0a0f")
      .attr("stroke-width", 1.5);

    // Labels
    nodeSel
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", (d) => NODE_SIZES[d.type] + 12)
      .attr("fill", "#94a3b8")
      .attr("font-size", 9)
      .attr("font-family", "JetBrains Mono, monospace")
      .text((d) => (d.label.length > 18 ? d.label.slice(0, 17) + "…" : d.label));

    simulation.on("tick", () => {
      linkSel
        .attr("x1", (d) => (d.source as SimNode).x ?? 0)
        .attr("y1", (d) => (d.source as SimNode).y ?? 0)
        .attr("x2", (d) => (d.target as SimNode).x ?? 0)
        .attr("y2", (d) => (d.target as SimNode).y ?? 0);

      linkLabelSel
        .attr("x", (d) => (((d.source as SimNode).x ?? 0) + ((d.target as SimNode).x ?? 0)) / 2)
        .attr("y", (d) => (((d.source as SimNode).y ?? 0) + ((d.target as SimNode).y ?? 0)) / 2);

      nodeSel.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    return () => {
      simulation.stop();
    };
  }, [data, width, height, select]);

  return (
    <div className="relative w-full" style={{ background: "var(--wr-bg)" }}>
      <svg
        ref={svgRef}
        width="100%"
        height={height}
        style={{ display: "block" }}
      />

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-10 rounded-lg border px-3 py-2 text-xs space-y-1 max-w-xs"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            borderColor: NODE_COLORS[tooltip.node.type],
            background: "var(--wr-surface-2)",
            borderWidth: "1px",
            boxShadow: `0 0 12px ${NODE_COLORS[tooltip.node.type]}40`,
          }}
        >
          <div
            className="font-bold wr-mono"
            style={{ color: NODE_COLORS[tooltip.node.type] }}
          >
            {tooltip.node.label}
          </div>
          <div className="text-[10px] uppercase tracking-widest" style={{ color: "var(--wr-text-dim)" }}>
            {tooltip.node.type}
          </div>
          <div className="text-[11px] leading-snug" style={{ color: "var(--wr-text)" }}>
            {tooltip.node.description}
          </div>
          <div className="text-[10px] wr-mono" style={{ color: "var(--wr-text-dim)" }}>
            Corroboration: {tooltip.node.corroborationScore}/100
          </div>
        </div>
      )}

      {/* Legend */}
      <div
        className="absolute top-3 right-3 rounded-lg border p-3 space-y-1.5 text-[10px] wr-mono"
        style={{ borderColor: "var(--wr-border)", background: "var(--wr-surface-2)" }}
      >
        {(Object.entries(NODE_COLORS) as [GraphNodeType, string][]).map(([type, color]) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ background: color }}
            />
            <span style={{ color: "var(--wr-text-dim)" }} className="capitalize">
              {type}
            </span>
          </div>
        ))}
        <div className="mt-2 pt-2" style={{ borderTop: "1px solid var(--wr-border)", color: "var(--wr-text-dim)" }}>
          Scroll to zoom · Drag nodes
        </div>
      </div>

      {/* Selected node details */}
      {selected && (
        <div
          className="absolute bottom-3 left-3 rounded-lg border px-4 py-3 max-w-xs space-y-1.5"
          style={{ borderColor: NODE_COLORS[selected.type], background: "var(--wr-surface-2)" }}
        >
          <button
            onClick={() => select(null)}
            className="absolute top-2 right-3 text-xs"
            style={{ color: "var(--wr-text-dim)" }}
          >
            ✕
          </button>
          <div
            className="font-bold text-sm wr-mono"
            style={{ color: NODE_COLORS[selected.type] }}
          >
            {selected.label}
          </div>
          <div className="text-[10px] uppercase tracking-widest" style={{ color: "var(--wr-text-dim)" }}>
            {selected.type} · Corroboration {selected.corroborationScore}/100
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--wr-text)" }}>
            {selected.description}
          </p>
        </div>
      )}
    </div>
  );
}
