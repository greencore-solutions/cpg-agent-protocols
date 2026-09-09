#!/usr/bin/env python3
"""Call the standards beacon and print the protocol set it returns.

Walk: tools/list -> list_protocols -> list_signals -> list_sparks_dimensions -> print -> stop.
The beacon is stateless: no initialize, no session. Standard library only. Live endpoint only.
"""
import json, urllib.request

MCP = "https://mcp.cpgagentprotocols.ai/mcp"
UA = "cpg-agent-protocols-kit/1.0 (+https://github.com/greencore-solutions/cpg-agent-protocols)"


def post(method, params, req_id):
    body = json.dumps({"jsonrpc": "2.0", "id": req_id, "method": method, "params": params}).encode("utf-8")
    req = urllib.request.Request(MCP, data=body, headers={
        "User-Agent": UA, "Content-Type": "application/json", "Accept": "application/json, text/event-stream"})
    with urllib.request.urlopen(req, timeout=60) as r:
        raw = r.read().decode("utf-8")
    if raw.lstrip().startswith("{"):
        return json.loads(raw)
    msgs = [json.loads(l[5:]) for l in raw.splitlines() if l.startswith("data:")]
    return next((m for m in msgs if m.get("id") == req_id), msgs[-1])


def unwrap(msg):
    if "error" in msg:
        raise SystemExit("error: %s" % msg["error"])
    r = msg["result"]
    if r.get("structuredContent"):
        return r["structuredContent"]
    text = r["content"][0]["text"]
    try:
        return json.loads(text)
    except ValueError:
        return {"text": text}


tools = post("tools/list", {}, 1)["result"]["tools"]
print("tools/list:", ", ".join(t["name"] for t in tools))
for i, name in enumerate(["list_protocols", "list_signals", "list_sparks_dimensions"], 2):
    data = unwrap(post("tools/call", {"name": name, "arguments": {}}, i))
    print("\n%s:" % name)
    print(json.dumps(data, indent=2, ensure_ascii=False))
