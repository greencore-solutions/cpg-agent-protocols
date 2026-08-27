// ============================================================
// mcp.cpgagentprotocols.ai — GSC protocol beacon  v1.0.0
// GreenCore Solutions Corp.
//
// The standards surface. No database, no state, no writes —
// the canon is compiled into the image and every answer is
// deterministic. Nine read tools over MCP + the same content
// broadcast as plain GET JSON for crawlers and LLMs.
//
//   ACM-SPARKS classifies → SM-ECO-10060 resolves → ACM-68000 signals
// ============================================================

import express from "express";
import crypto from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import {
  PROTOCOLS, SPINE, SIGNALS, SPARKS_DIMENSIONS, SPARKS_SENTENCE,
  GHOST_EIGHTEEN, GHOST_VERSION, MEMBERS,
} from "./canon.js";

const VERSION = "1.0.0";
const NODE = "mcp.cpgagentprotocols.ai";

// ---------- Ghost Headers Canon v3.2 — live emission ----------
function ghostEighteen(res, signal = "ACM-200", state = "ALLOW") {
  res.set({
    "x-gsc-protocol": "ACM-68000",
    "x-gsc-classification": "ACM-SPARKS",
    "x-gsc-operator": "GreenCore Solutions Corp.",
    "x-gsc-microsoft-partner": "AI-Cloud-Partner-Program-Member",
    "x-gsc-duns": "24-336-6774",
    "x-gsc-inbound": "https://x-gsi.ai/ingest",
    "x-gsc-trust-anchor": "dpuone.ai",
    "x-gsc-registry": "io.github.greencore-solutions/cpg-knowledge-graph",
    "x-gsc-mcp-server": "mcp.cpgknowledgegraph.ai",
    "x-gsc-agent-access": "MCP+A2A",
    "x-gsc-timestamp": new Date().toISOString(),
    "x-gsc-nonce": crypto.randomUUID(),
    "x-gsc-signal": signal,
    "x-gsc-state": state,
    "x-gsc-node": NODE,
    "x-gsc-jurisdiction": "FR",
    "x-gsc-product": "AI-Agents-for-CPG+CPG-Knowledge-Graph",
    "x-gsc-fleet": "https://gsc-cpg.ai,https://gsc-a2a.ai,https://gsc-a2a.io",
  });
}

const t = (obj) => ({ content: [{ type: "text", text: JSON.stringify(obj, null, 2) }] });
const notFound = (what, code) => t({ signal: "ACM-404", state: "NOT_FOUND", meaning: `${what} '${code}' is not registered in the canon.` });

// ---------- MCP tools ----------
function buildMcp() {
  const mcp = new McpServer({ name: "cpg-agent-protocols", version: VERSION });

  mcp.registerTool("list_protocols", {
    title: "List the three GSC protocols",
    description: "The protocol family and the resolve-once spine: ACM-SPARKS classifies, SM-ECO-10060 resolves, ACM-68000 signals.",
    inputSchema: {},
  }, async () => t({ spine: SPINE, protocols: Object.values(PROTOCOLS) }));

  mcp.registerTool("get_protocol", {
    title: "Get one protocol",
    description: "Full canon record for ACM-SPARKS, SM-ECO-10060, or ACM-68000.",
    inputSchema: { name: z.enum(["ACM-SPARKS", "SM-ECO-10060", "ACM-68000"]).describe("Protocol name") },
  }, async ({ name }) => t(PROTOCOLS[name]));

  mcp.registerTool("list_signals", {
    title: "List the 7 ACM-68000 signals",
    description: "All seven signals, enumerated individually: ACM-000, ACM-200, ACM-300, ACM-403, ACM-404, ACM-451, ACM-500. One meaning, no drift.",
    inputSchema: {},
  }, async () => t({ protocol: "ACM-68000", signal_count: 7, signals: SIGNALS }));

  mcp.registerTool("resolve_signal", {
    title: "Resolve one signal code",
    description: "The state and meaning of a single ACM-68000 signal code.",
    inputSchema: { code: z.string().describe("Signal code, e.g. ACM-451") },
  }, async ({ code }) => {
    const key = code.toUpperCase().trim();
    return SIGNALS[key] ? t({ code: key, ...SIGNALS[key] }) : notFound("Signal", code);
  });

  mcp.registerTool("list_sparks_dimensions", {
    title: "List the six SPARKS dimensions",
    description: SPARKS_SENTENCE,
    inputSchema: {},
  }, async () => t({ standard: "ACM-SPARKS", sentence: SPARKS_SENTENCE, dimensions: SPARKS_DIMENSIONS, resolved_live_on: "https://mcp.cpgknowledgegraph.ai" }));

  mcp.registerTool("resolve_sparks_dimension", {
    title: "Resolve one SPARKS dimension",
    description: "Canon record for a single SPARKS dimension by letter (S, P, A, R, K, S2) or name.",
    inputSchema: { dimension: z.string().describe("Letter (S, P, A, R, K, S2) or name (e.g. Pack-format)") },
  }, async ({ dimension }) => {
    const q = dimension.trim().toLowerCase();
    const hit = SPARKS_DIMENSIONS.find((d) => d.letter.toLowerCase() === q || d.name.toLowerCase() === q);
    return hit ? t(hit) : notFound("SPARKS dimension", dimension);
  });

  mcp.registerTool("list_members", {
    title: "List SM-ECO-10060 members",
    description: "The 49 sovereign jurisdictional member nodes — code, namespace, jurisdiction, region, and GS1 territory GTIN. Live supply/demand data per member is the CPG Knowledge Graph's job.",
    inputSchema: {},
  }, async () => t({ sovereign_manifest: "SM-ECO-10060", member_count: MEMBERS.length, gs1_anchor: "GS1 Canada GEPIR (dpuone.ai lineage)", members: MEMBERS }));

  mcp.registerTool("resolve_member", {
    title: "Resolve one SM-ECO-10060 member",
    description: "Canon record for a single sovereign member by ISO-style code, e.g. FR, AU, MX.",
    inputSchema: { code: z.string().max(4).describe("Member code, e.g. FR") },
  }, async ({ code }) => {
    const hit = MEMBERS.find((m) => m.code === code.toUpperCase().trim());
    return hit
      ? t({ ...hit, resolve_live: "https://mcp.cpgknowledgegraph.ai" })
      : notFound("SM-ECO-10060 member", code);
  });

  mcp.registerTool("get_header_canon", {
    title: "Get the Ghost Headers canon",
    description: `The GSC wire-header canon (${GHOST_VERSION}) — the eighteen x-gsc-* headers every GSC surface emits, in canon order. Curl-auditable against any live GSC surface.`,
    inputSchema: {},
  }, async () => t({ canon: GHOST_VERSION, headers: GHOST_EIGHTEEN, note: "Timestamp and nonce are concrete per-request values on live surfaces; node self-announces; jurisdiction is the exact SM-ECO-10060 member." }));

  return mcp;
}

// ---------- HTTP ----------
const app = express();
app.use(express.json({ limit: "256kb" }));

app.post("/mcp", async (req, res) => {
  ghostEighteen(res);
  try {
    const mcp = buildMcp();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    res.on("close", () => { transport.close(); mcp.close(); });
    await mcp.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    console.error("MCP request error:", err.message);
    if (!res.headersSent) {
      ghostEighteen(res, "ACM-500", "SYSTEM_ERROR");
      res.status(500).json({ jsonrpc: "2.0", error: { code: -32603, message: "Internal server error" }, id: null });
    }
  }
});
app.get("/mcp", (req, res) => { ghostEighteen(res); res.status(405).json({ error: "Method not allowed. POST JSON-RPC to /mcp." }); });

// ---------- broadcast surfaces (plain GET JSON) ----------
const bc = (handler) => (req, res) => { ghostEighteen(res); res.json(handler()); };

app.get("/health", bc(() => ({
  protocol: "ACM-68000", version: VERSION, status: "active", node: NODE,
  role: "protocol-beacon", stateless: true,
  operator: "GreenCore Solutions Corp.", operator_url: "https://gsc-em.com",
  tools: ["list_protocols","get_protocol","list_signals","resolve_signal","list_sparks_dimensions","resolve_sparks_dimension","list_members","resolve_member","get_header_canon"],
})));

app.get("/protocol.json", bc(() => ({ spine: SPINE, protocols: PROTOCOLS })));
app.get("/signals.json", bc(() => ({ protocol: "ACM-68000", signal_count: 7, signals: SIGNALS })));
app.get("/sparks.json", bc(() => ({ standard: "ACM-SPARKS", sentence: SPARKS_SENTENCE, dimensions: SPARKS_DIMENSIONS, resolved_live_on: "https://mcp.cpgknowledgegraph.ai" })));
const membersPayload = () => ({ sovereign_manifest: "SM-ECO-10060", member_count: MEMBERS.length, gs1_anchor: "GS1 Canada GEPIR (dpuone.ai lineage)", members: MEMBERS });
app.get("/nodes.json", bc(membersPayload));
app.get("/members.json", bc(membersPayload));
app.get("/headers.json", bc(() => ({ canon: GHOST_VERSION, headers: GHOST_EIGHTEEN })));

// Root — the brochure surface. Humans find and read these.
app.get("/", bc(() => ({
  service: "CPGAgentProtocols.ai",
  what:
    "CPG AGENT PROTOCOLS v1.0.0 — THE GSC PROTOCOL BEACON. The standards surface for the three GSC protocols: ACM-SPARKS classifies the SKU → SM-ECO-10060 resolves the jurisdiction → ACM-68000 emits the deterministic signal to the buyer's AI Agent. Graph → Node → Wire. Seven signals, one meaning, no drift. Six SPARKS dimensions — SKU, Pack, Amount, Region, Kernel, and Standard — a CPG industry first. 49 SM-ECO-10060 sovereign member nodes, each with a GS1-licensed territory GTIN. The Ghost Eighteen wire-header canon, curl-auditable. Stateless and deterministic by design: the canon is compiled into this surface — this beacon answers about the standards; the CPG Knowledge Graph at mcp.cpgknowledgegraph.ai answers about the world. Nine MCP tools plus full broadcast JSON. ACM-68000 protocol. GSC is a Microsoft AI Cloud Partner.",
  operator: "GreenCore Solutions Corp.",
  operator_url: "https://gsc-em.com",
  operator_links: {
    gsc_em: "https://gsc-em.com",
    x_gsc: "https://x.com/GSC_Rail_ai",
    gsc_agentic_au: "https://gsc-agentic.ai",
    x_gsc_agentic: "https://x.com/gsc_agentic_ai",
  },
  microsoft_partner: "Microsoft AI Cloud Partner",
  endpoint: `https://${NODE}`,
  version: VERSION,
  role: "protocol-beacon",
  stateless: true,
  protocol: "ACM-68000",
  protocol_home: "https://acm-68000.org",
  sovereign_manifest: "SM-ECO-10060",
  sovereign_manifest_home: "https://sm-eco-10060.org",
  governance: "https://standard-10060.org",
  trust_anchor: "https://dpuone.ai",
  duns: "24-336-6774",
  spine: SPINE,
  mcp: { transport: "streamable-http", url: `https://${NODE}/mcp` },
  tools: ["list_protocols","get_protocol","list_signals","resolve_signal","list_sparks_dimensions","resolve_sparks_dimension","list_members","resolve_member","get_header_canon"],
  broadcast: {
    protocol: `https://${NODE}/protocol.json`,
    signals: `https://${NODE}/signals.json`,
    sparks: `https://${NODE}/sparks.json`,
    nodes: `https://${NODE}/nodes.json`,
    headers: `https://${NODE}/headers.json`,
  },
  surfaces: {
    data: "https://mcp.cpgknowledgegraph.ai",
    discovery: ["https://gsc-cpg.ai", "https://gsc-a2a.ai", "https://gsc-a2a.io"],
    transaction: "https://mcp.cpghumanintheloop.ai",
    standards: `https://${NODE}`,
  },
  machine_surfaces: {
    health: `https://${NODE}/health`,
    agent_card: `https://${NODE}/.well-known/agent-card.json`,
    agent_card_agent_json: `https://${NODE}/.well-known/agent.json`,
    ai_catalog: `https://${NODE}/.well-known/ai-catalog.json`,
    mcp: `https://${NODE}/mcp`,
  },
})));

// ---------- .well-known ----------
app.get("/.well-known/agent-card.json", bc(() => ({
  schema_version: "1.0",
  name: "CPG Agent Protocols",
  description:
    "GSC protocol beacon — the standards surface for ACM-SPARKS, SM-ECO-10060, and ACM-68000. Stateless, deterministic, compiled canon: 7 signals, 6 SPARKS dimensions, 49 sovereign members, the Ghost Eighteen header canon. Data lives on mcp.cpgknowledgegraph.ai; this surface defines the vocabulary.",
  url: `https://${NODE}`,
  version: VERSION,
  operator: "GreenCore Solutions Corp.",
  operator_url: "https://gsc-em.com",
  protocol: { name: "ACM-68000", registry: "io.github.greencore-solutions/cpg-knowledge-graph" },
  mcp: {
    endpoint: `https://${NODE}/mcp`,
    transport: "streamable-http",
    tools: ["list_protocols","get_protocol","list_signals","resolve_signal","list_sparks_dimensions","resolve_sparks_dimension","list_members","resolve_member","get_header_canon"],
  },
})));

app.get("/.well-known/agent.json", bc(() => ({
  protocolVersion: "0.3.0",
  name: "CPG Agent Protocols",
  description:
    "GSC protocol beacon by GreenCore Solutions Corp. — the standards surface for ACM-SPARKS (classifies), SM-ECO-10060 (resolves), and ACM-68000 (signals). Deterministic answers about the protocols themselves; live data is the CPG Knowledge Graph's job.",
  url: `https://${NODE}`,
  version: VERSION,
  provider: { organization: "GreenCore Solutions Corp.", url: "https://gsc-em.com" },
  capabilities: { streaming: false, pushNotifications: false },
  defaultInputModes: ["application/json"],
  defaultOutputModes: ["application/json"],
  skills: [
    { id: "list_protocols", name: "List protocols", description: "The three GSC protocols and the resolve-once spine." },
    { id: "resolve_signal", name: "Resolve a signal", description: "State and meaning of any ACM-68000 signal code." },
    { id: "list_sparks_dimensions", name: "SPARKS dimensions", description: "The six dimensions ACM-SPARKS resolves." },
    { id: "resolve_member", name: "Resolve a member", description: "Any SM-ECO-10060 sovereign member with its GS1 territory GTIN." },
    { id: "get_header_canon", name: "Header canon", description: "The Ghost Eighteen x-gsc-* wire headers, canon order." },
  ],
  endpoints: { mcp: `https://${NODE}/mcp` },
})));

app.get("/.well-known/ai-catalog.json", bc(() => ({
  service: "CPGAgentProtocols.ai",
  operator: "GreenCore Solutions Corp.",
  operator_url: "https://gsc-em.com",
  version: VERSION,
  protocol: "ACM-68000",
  role: "protocol-beacon",
  catalog: [
    { type: "mcp", transport: "streamable-http", url: `https://${NODE}/mcp`, tools: ["list_protocols","get_protocol","list_signals","resolve_signal","list_sparks_dimensions","resolve_sparks_dimension","list_members","resolve_member","get_header_canon"] },
    { type: "broadcast", urls: [`https://${NODE}/protocol.json`, `https://${NODE}/signals.json`, `https://${NODE}/sparks.json`, `https://${NODE}/nodes.json`, `https://${NODE}/headers.json`] },
    { type: "agent-card", url: `https://${NODE}/.well-known/agent-card.json` },
    { type: "a2a-agent-card", url: `https://${NODE}/.well-known/agent.json` },
    { type: "health", url: `https://${NODE}/health` },
  ],
  related: {
    knowledge_graph: "https://mcp.cpgknowledgegraph.ai",
    transaction: "https://mcp.cpghumanintheloop.ai",
    fleet: ["https://gsc-cpg.ai", "https://gsc-a2a.ai", "https://gsc-a2a.io"],
    governance: "https://standard-10060.org",
  },
})));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`CPG Agent Protocols beacon v${VERSION} listening on :${PORT}`));
