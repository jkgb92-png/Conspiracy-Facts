import { NextResponse } from "next/server";
import { mockGraphData } from "@/lib/mockData";

// GET /api/network — return influence graph nodes and edges
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nodeType = searchParams.get("type");
  const nodeId = searchParams.get("nodeId");

  let { nodes, edges } = mockGraphData;

  // Filter to a subgraph if a specific node is requested
  if (nodeId) {
    const connectedEdges = edges.filter(
      (e) => e.source === nodeId || e.target === nodeId
    );
    const connectedIds = new Set<string>([
      nodeId,
      ...connectedEdges.map((e) => e.source),
      ...connectedEdges.map((e) => e.target),
    ]);
    nodes = nodes.filter((n) => connectedIds.has(n.id));
    edges = connectedEdges;
  } else if (nodeType) {
    const filteredNodes = nodes.filter((n) => n.type === nodeType);
    const filteredIds = new Set(filteredNodes.map((n) => n.id));
    edges = edges.filter((e) => filteredIds.has(e.source) && filteredIds.has(e.target));
    nodes = filteredNodes;
  }

  return NextResponse.json({ data: { nodes, edges } });
}
