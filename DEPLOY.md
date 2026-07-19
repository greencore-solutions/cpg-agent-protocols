# DEPLOY — mcp.cpgagentprotocols.ai v1.0.0

**Sub:** AIO Agents (`9e406344-81a4-4624-98de-a9c642a75d69`) · **RG:** `rg-aio-agents-fr` · **Region:** France Central
**ACR:** `gscemregistry` · **Env:** `aio-agents-env-fr` · **App:** `cpgprotocols-mcp`
**DB:** NONE — stateless beacon, no DSN, no secrets, no Phase 0.

## What this is

The GSC protocol beacon — the standards surface for the three protocols. ACM-SPARKS classifies → SM-ECO-10060 resolves → ACM-68000 signals. The canon is compiled into the image: 7 signals, 6 SPARKS dimensions, 49 sovereign members with GS1 territory GTINs (roster pulled from the live KG wire July 19 2026), the Ghost Eighteen header canon. Nine read tools over MCP, plus the same content broadcast as plain GET JSON (/protocol.json, /signals.json, /sparks.json, /nodes.json, /headers.json) for crawlers and LLMs.

Fourth surface of the set: KG = data · fleet = discovery · HITL = transaction · **this = standards**.

Smoke-tested pre-package: tools/list (9), resolve_signal, resolve_member hit + ACM-404 miss, header canon, all 11 GET surfaces 200, member_count 49 on the wire.

## Phase 1 — Build & push (CC)

```powershell
cd C:\GREENCORE\MCP\protocols-beacon
az acr login --name gscemregistry
docker build -t gscemregistry.azurecr.io/cpgprotocols-mcp:1.0.0 .
docker push gscemregistry.azurecr.io/cpgprotocols-mcp:1.0.0
```

## Phase 2 — Container App (CC — no secrets involved)

```powershell
az containerapp create `
  --name cpgprotocols-mcp `
  --resource-group rg-aio-agents-fr `
  --subscription 9e406344-81a4-4624-98de-a9c642a75d69 `
  --environment aio-agents-env-fr `
  --image gscemregistry.azurecr.io/cpgprotocols-mcp:1.0.0 `
  --target-port 8080 `
  --ingress external `
  --min-replicas 1 `
  --max-replicas 2 `
  --cpu 0.25 `
  --memory 0.5Gi `
  --registry-server gscemregistry.azurecr.io
```

## Phase 3 — Custom domain (operator: Cloudflare; CC: bind)

1. CC fetches default FQDN + custom-domain verification ID, hands both to operator
2. Operator, Cloudflare zone cpgagentprotocols.ai — **grey cloud / DNS only**:
   - CNAME `mcp` → default FQDN
   - TXT `asuid.mcp` → verification ID
3. CC adds custom domain `mcp.cpgagentprotocols.ai` → managed TLS

Apex = later human standards surface, separate cut.

## Verify (CC)

```powershell
Invoke-RestMethod "https://mcp.cpgagentprotocols.ai/health"          # status active, stateless true
Invoke-RestMethod "https://mcp.cpgagentprotocols.ai/nodes.json" | Select-Object member_count   # 49
$h = (Invoke-WebRequest "https://mcp.cpgagentprotocols.ai/").Headers
$h['x-gsc-node']           # mcp.cpgagentprotocols.ai
$h['x-gsc-jurisdiction']   # FR
# tools/list -> the 9 tools
```

## Rollback

```powershell
az containerapp revision list --name cpgprotocols-mcp --resource-group rg-aio-agents-fr -o table
az containerapp revision activate --name cpgprotocols-mcp --resource-group rg-aio-agents-fr --revision <previous>
```

## Registry (Phase R — CEO ruling July 19 2026)

BRAND-NEW listing under the new-era namespace — NOT a version-forward of any legacy entry:
`io.github.greencore-solutions/cpg-agent-protocols` · title "CPG Agent Protocols" · v1.0.0 · website https://cpgagentprotocols.ai · remote streamable-http https://mcp.cpgagentprotocols.ai/mcp · repo github.com/greencore-solutions/cpg-agent-protocols. Publish only after live-remote gates pass. The April 3 2026 allooloo-era entry is a frozen primacy receipt — untouched, never deleted, no longer a conversion target.

## Files

```
protocols-beacon/
├── server.js       # beacon — 9 tools + 11 broadcast/discovery GETs, Ghost Eighteen
├── canon.js        # compiled canon: protocols, signals, SPARKS, 49 members, header canon
├── package.json
├── Dockerfile      # node:22-alpine
└── DEPLOY.md
```
