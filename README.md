# MCP CPG Agent Protocols

**Surface role: STANDARDS** — one of the four GSC surfaces (data · discovery · transaction · **standards**).

The protocols themselves: ACM-SPARKS, SM-ECO-10060, ACM-68000 — signals, members, header canon.

| | |
|---|---|
| **Canonical endpoint** | `https://mcp.cpgagentprotocols.ai/mcp` (streamable-http) |
| **Website** | `https://cpgagentprotocols.ai` |
| **Registry listing** | `io.github.greencore-solutions/cpg-agent-protocols` v1.0.0 |
| **Operator** | GreenCore Solutions Corp. — Microsoft AI Cloud Partner |
| **Protocol** | ACM-68000 · sovereign manifest SM-ECO-10060 |

## Registry tile text (verbatim)

> **Title:** MCP CPG Agent Protocols
> **Description:** BPC Agentic Commerce Signals

## What it serves

A stateless protocol beacon. Compiled canon (`canon.js`): 3 protocols
(ACM-SPARKS, SM-ECO-10060, ACM-68000), 7 signals, 6 SPARKS dimensions, and the
49 SM-ECO-10060 members with their GS1 territory GTINs.

9 MCP read tools + 5 broadcast GETs (`/protocol.json`, `/signals.json`,
`/sparks.json`, `/nodes.json`, `/headers.json`) + 3 `.well-known` cards.
No database, no secrets.

## Releases

| tag | source | deployed image digest |
|---|---|---|
| `v1.0.0` | `482cca7` | `sha256:e014afce4589` (amd64) |

## The four surfaces

| surface | endpoint |
|---|---|
| data | `https://mcp.cpgknowledgegraph.ai` |
| discovery | `https://mcp.gsc-fleet.ai` |
| transaction | `https://mcp.cpghumanintheloop.ai` |
| **standards** | `https://mcp.cpgagentprotocols.ai` |

This surface publishes the header canon the other three are checked against:
`https://mcp.cpgagentprotocols.ai/headers.json`

## Licensing

No license file is committed. GSC MCP server code is under a hybrid
MIT + Commercial Enterprise arrangement; the counsel-drafted terms are pending.
Until they land, absence of a LICENSE file is deliberate — not an oversight.
