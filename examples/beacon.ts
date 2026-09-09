// Call the standards beacon and print the protocol set it returns.
// Walk: tools/list -> list_protocols -> list_signals -> list_sparks_dimensions -> print -> stop.
// The beacon is stateless: no initialize, no session. Node 24, no dependencies. Live endpoint only.
const MCP = "https://mcp.cpgagentprotocols.ai/mcp";
const UA = "cpg-agent-protocols-kit/1.0 (+https://github.com/greencore-solutions/cpg-agent-protocols)";

async function post(method: string, params: unknown, id: number): Promise<any> {
  const r = await fetch(MCP, { method: "POST", headers: { "User-Agent": UA, "Content-Type": "application/json", Accept: "application/json, text/event-stream" },
    body: JSON.stringify({ jsonrpc: "2.0", id, method, params }) });
  const raw = await r.text();
  if (raw.trimStart().startsWith("{")) return JSON.parse(raw);
  const msgs = raw.split("\n").filter((l) => l.startsWith("data:")).map((l) => JSON.parse(l.slice(5)));
  return msgs.find((m) => m.id === id) ?? msgs[msgs.length - 1];
}

function unwrap(msg: any): any {
  if (msg.error) { console.log("error:", msg.error); process.exit(1); }
  const r = msg.result;
  if (r.structuredContent) return r.structuredContent;
  const text = r.content[0].text;
  try { return JSON.parse(text); } catch { return { text }; }
}

const tools = (await post("tools/list", {}, 1)).result.tools as { name: string }[];
console.log("tools/list:", tools.map((t) => t.name).join(", "));
let id = 2;
for (const name of ["list_protocols", "list_signals", "list_sparks_dimensions"]) {
  const data = unwrap(await post("tools/call", { name, arguments: {} }, id++));
  console.log(`\n${name}:`);
  console.log(JSON.stringify(data, null, 2));
}
