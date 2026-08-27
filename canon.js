// ============================================================
// canon.js — compiled protocol canon  v1.0.0
// cpgagentprotocols.ai — the GSC standards beacon
// Static by design: no database, no state, no drift.
// Member roster pulled from the live CPG Knowledge Graph wire
// (list_nodes) on 2026-07-19 — the wire is the source of truth.
// ============================================================

export const PROTOCOLS = {
  "ACM-SPARKS": {
    name: "ACM-SPARKS",
    role: "classifies",
    what: "GSC's owned classification standard for Beauty & Personal Care (BPC), pinning every SKU to its market. SPARKS resolves six dimensions — SKU, Pack, Amount, Region, Kernel, and Standard — a CPG industry first.",
    commercial_name: "SPARKS",
    home: "https://acm-68000.org",
    resolved_live_on: "https://mcp.cpgknowledgegraph.ai",
  },
  "SM-ECO-10060": {
    name: "SM-ECO-10060",
    role: "resolves",
    what: "The sovereign manifest — the registry of sovereign jurisdictional member nodes in which records resolve. Each member carries a GS1-licensed territory GTIN.",
    home: "https://sm-eco-10060.org",
    governance: "https://standard-10060.org",
    member_count: 49,
  },
  "ACM-68000": {
    name: "ACM-68000",
    role: "signals",
    what: "The Agent Commerce Manifest — the open signal protocol. Seven deterministic signals; one meaning, no drift. Emitted on the wire to the buyer's AI Agent.",
    home: "https://acm-68000.org",
    signal_count: 7,
  },
};

export const SPINE =
  "ACM-SPARKS classifies the SKU → SM-ECO-10060 resolves the jurisdiction → ACM-68000 emits the deterministic signal to the buyer's AI Agent. Graph → Node → Wire.";

// The 7 Signals — enumerated individually, never range-shorthand.
export const SIGNALS = {
  "ACM-000": { state: "NOT_APPLICABLE", meaning: "Control or framework does not apply to this SKU." },
  "ACM-200": { state: "ALLOW", meaning: "Eligible for autonomous procurement. Buyer agent may complete the order with human-in-the-loop confirmation in the retailer's chosen ERP." },
  "ACM-300": { state: "CONDITIONAL", meaning: "Eligible subject to a documented condition (volume threshold, jurisdictional carve-out, time-bounded approval)." },
  "ACM-403": { state: "RESTRICT", meaning: "Not eligible in the requested context. Buyer agent must not complete the order." },
  "ACM-404": { state: "NOT_FOUND", meaning: "GTIN is not registered. No signal available." },
  "ACM-451": { state: "ESCALATE", meaning: "Cannot be resolved deterministically. Human review required.", served_by: "https://mcp.cpghumanintheloop.ai" },
  "ACM-500": { state: "SYSTEM_ERROR", meaning: "Server or upstream error. Retry per backoff policy." },
};

// SPARKS — six dimensions. Names are canon; live resolution is the KG's job.
export const SPARKS_DIMENSIONS = [
  { letter: "S", name: "SKU-type", note: "One of 84 standing BPC product-type codes." },
  { letter: "P", name: "Pack-format", note: "One of 17 pack formats." },
  { letter: "A", name: "Amount", note: "The pack amount value." },
  { letter: "R", name: "Region-node", note: "The SM-ECO-10060 sovereign member the record resolves in." },
  { letter: "K", name: "Kernel", note: "Resolved live on the CPG Knowledge Graph." },
  { letter: "S2", name: "Standard-or-Specific", note: "Whether the record resolves to a standing standard or a specific rule. 4,091 standards rules." },
];
export const SPARKS_SENTENCE =
  "SPARKS resolves six dimensions — SKU, Pack, Amount, Region, Kernel, and Standard — a CPG industry first.";

// GHOST HEADERS CANON v3.2 — "The Ghost Eighteen" — locked July 18 2026.
// Canon order. Timestamp + nonce are per-request concrete values on live surfaces.
export const GHOST_EIGHTEEN = [
  { header: "x-gsc-protocol", value: "ACM-68000" },
  { header: "x-gsc-classification", value: "ACM-SPARKS" },
  { header: "x-gsc-operator", value: "GreenCore Solutions Corp." },
  { header: "x-gsc-microsoft-partner", value: "AI-Cloud-Partner-Program-Member" },
  { header: "x-gsc-duns", value: "24-336-6774" },
  { header: "x-gsc-inbound", value: "https://x-gsi.ai/ingest" },
  { header: "x-gsc-trust-anchor", value: "dpuone.ai" },
  { header: "x-gsc-registry", value: "io.github.greencore-solutions/cpg-knowledge-graph" },
  { header: "x-gsc-mcp-server", value: "mcp.cpgknowledgegraph.ai" },
  { header: "x-gsc-agent-access", value: "MCP+A2A" },
  { header: "x-gsc-timestamp", value: "<per request — ISO 8601>" },
  { header: "x-gsc-nonce", value: "<per request — UUID>" },
  { header: "x-gsc-signal", value: "ACM-200" },
  { header: "x-gsc-state", value: "ALLOW" },
  { header: "x-gsc-node", value: "<self — the emitting surface>" },
  { header: "x-gsc-jurisdiction", value: "<exact SM-ECO-10060 member; apex on the global MCP>" },
  { header: "x-gsc-product", value: "AI-Agents-for-CPG+CPG-Knowledge-Graph" },
  { header: "x-gsc-fleet", value: "https://gsc-cpg.ai,https://gsc-a2a.ai,https://gsc-a2a.io" },
];
export const GHOST_VERSION = "v3.2 — The Ghost Eighteen (locked July 18 2026)";

// SM-ECO-10060 member roster — from the live wire, 2026-07-19.
export const MEMBERS = [
  { code: "AE", namespace: "ae-eco-10060", jurisdiction: "United Arab Emirates", region: "MENA+Africa", gtin: "00990832300624" },
  { code: "AR", namespace: "ar-eco-10060", jurisdiction: "Argentina", region: "Americas", gtin: "00990832300471" },
  { code: "AT", namespace: "at-eco-10060", jurisdiction: "Austria", region: "Europe", gtin: "00990832300396" },
  { code: "AU", namespace: "au-eco-10060", jurisdiction: "Australia", region: "Asia-Pacific", gtin: "00990832300235" },
  { code: "BE", namespace: "be-eco-10060", jurisdiction: "Belgium", region: "Europe", gtin: "00990832300372" },
  { code: "BR", namespace: "br-eco-10060", jurisdiction: "Brazil", region: "Americas", gtin: "00990832300228" },
  { code: "CA", namespace: "ca-eco-10060", jurisdiction: "Canada", region: "Americas", gtin: "00990832300204" },
  { code: "CH", namespace: "ch-eco-10060", jurisdiction: "Switzerland", region: "Europe", gtin: "00990832300167" },
  { code: "CL", namespace: "cl-eco-10060", jurisdiction: "Chile", region: "Americas", gtin: "00990832300488" },
  { code: "CO", namespace: "co-eco-10060", jurisdiction: "Colombia", region: "Americas", gtin: "00990832300495" },
  { code: "CR", namespace: "cr-eco-10060", jurisdiction: "Costa Rica", region: "Americas", gtin: "00990832300501" },
  { code: "CZ", namespace: "cz-eco-10060", jurisdiction: "Czech Republic", region: "Europe", gtin: "00990832300419" },
  { code: "DE", namespace: "de-eco-10060", jurisdiction: "Germany", region: "Europe", gtin: "00990832300112" },
  { code: "DK", namespace: "dk-eco-10060", jurisdiction: "Denmark", region: "Europe", gtin: "00990832300426" },
  { code: "DO", namespace: "do-eco-10060", jurisdiction: "Dominican Republic", region: "Americas", gtin: "00990832300518" },
  { code: "EC", namespace: "ec-eco-10060", jurisdiction: "Ecuador", region: "Americas", gtin: "00990832300525" },
  { code: "ES", namespace: "es-eco-10060", jurisdiction: "Spain", region: "Europe", gtin: "00990832300129" },
  { code: "EU", namespace: "eu-eco-10060", jurisdiction: "European Union", region: "Europe", gtin: "00990832300181" },
  { code: "FI", namespace: "fi-eco-10060", jurisdiction: "Finland", region: "Europe", gtin: "00990832300440" },
  { code: "FR", namespace: "fr-eco-10060", jurisdiction: "France", region: "Europe", gtin: "00990832300105" },
  { code: "GR", namespace: "gr-eco-10060", jurisdiction: "Greece", region: "Europe", gtin: "00990832300464" },
  { code: "GT", namespace: "gt-eco-10060", jurisdiction: "Guatemala", region: "Americas", gtin: "00990832300532" },
  { code: "ID", namespace: "id-eco-10060", jurisdiction: "Indonesia", region: "Asia-Pacific", gtin: "00990832300570" },
  { code: "IE", namespace: "ie-eco-10060", jurisdiction: "Ireland", region: "Europe", gtin: "00990832300402" },
  { code: "IL", namespace: "il-eco-10060", jurisdiction: "Israel", region: "MENA+Africa", gtin: "00990832300648" },
  { code: "IN", namespace: "in-eco-10060", jurisdiction: "India", region: "Asia-Pacific", gtin: "00990832300273" },
  { code: "IT", namespace: "it-eco-10060", jurisdiction: "Italy", region: "Europe", gtin: "00990832300136" },
  { code: "JP", namespace: "jp-eco-10060", jurisdiction: "Japan", region: "Asia-Pacific", gtin: "00990832300242" },
  { code: "KR", namespace: "kr-eco-10060", jurisdiction: "South Korea", region: "Asia-Pacific", gtin: "00990832300259" },
  { code: "MA", namespace: "ma-eco-10060", jurisdiction: "Morocco", region: "MENA+Africa", gtin: "00990832300662" },
  { code: "MX", namespace: "mx-eco-10060", jurisdiction: "Mexico", region: "Americas", gtin: "00990832300211" },
  { code: "MY", namespace: "my-eco-10060", jurisdiction: "Malaysia", region: "Asia-Pacific", gtin: "00990832300587" },
  { code: "NL", namespace: "nl-eco-10060", jurisdiction: "Netherlands", region: "Europe", gtin: "00990832300143" },
  { code: "NO", namespace: "no-eco-10060", jurisdiction: "Norway", region: "Europe", gtin: "00990832300457" },
  { code: "PA", namespace: "pa-eco-10060", jurisdiction: "Panama", region: "Americas", gtin: "00990832300549" },
  { code: "PE", namespace: "pe-eco-10060", jurisdiction: "Peru", region: "Americas", gtin: "00990832300556" },
  { code: "PH", namespace: "ph-eco-10060", jurisdiction: "Philippines", region: "Asia-Pacific", gtin: "00990832300594" },
  { code: "PL", namespace: "pl-eco-10060", jurisdiction: "Poland", region: "Europe", gtin: "00990832300150" },
  { code: "PT", namespace: "pt-eco-10060", jurisdiction: "Portugal", region: "Europe", gtin: "00990832300389" },
  { code: "SA", namespace: "sa-eco-10060", jurisdiction: "Saudi Arabia", region: "MENA+Africa", gtin: "00990832300631" },
  { code: "SE", namespace: "se-eco-10060", jurisdiction: "Sweden", region: "Europe", gtin: "00990832300433" },
  { code: "SG", namespace: "sg-eco-10060", jurisdiction: "Singapore", region: "Asia-Pacific", gtin: "00990832300266" },
  { code: "TH", namespace: "th-eco-10060", jurisdiction: "Thailand", region: "Asia-Pacific", gtin: "00990832300600" },
  { code: "TR", namespace: "tr-eco-10060", jurisdiction: "Turkey", region: "MENA+Africa", gtin: "00990832300655" },
  { code: "UK", namespace: "uk-eco-10060", jurisdiction: "United Kingdom", region: "Europe", gtin: "00990832300174" },
  { code: "US", namespace: "us-eco-10060", jurisdiction: "United States", region: "Americas", gtin: "00990832300198" },
  { code: "UY", namespace: "uy-eco-10060", jurisdiction: "Uruguay", region: "Americas", gtin: "00990832300563" },
  { code: "VN", namespace: "vn-eco-10060", jurisdiction: "Vietnam", region: "Asia-Pacific", gtin: "00990832300617" },
  { code: "ZA", namespace: "za-eco-10060", jurisdiction: "South Africa", region: "MENA+Africa", gtin: "00990832300679" },
];
