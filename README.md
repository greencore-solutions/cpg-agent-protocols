# CPG Agent Protocols

> mcp.cpgagentprotocols.ai — the standards door of the GSC AI Agent Stack. A stateless standards beacon for ACM-SPARKS, SM-ECO-10060 and ACM-68000.

The beacon serves the protocols themselves, compiled as canon: ACM-SPARKS classifies the SKU, SM-ECO-10060 resolves the jurisdiction, ACM-68000 emits the deterministic signal to the buyer's AI Agent. No database, no secrets, no state; every answer is the same for every agent that asks.

Canonical endpoint: https://mcp.cpgagentprotocols.ai/mcp (streamable-http, stateless).

This repository holds the beacon's source (`server.js`, `canon.js`, `DEPLOY.md`) and this connect kit: the tool list as the live server states it, the signal register, and one runnable example per language against the live endpoint. Nothing here carries a key, a secret or a customer.

## Tools

As returned by `tools/list` on the live beacon on 2026-09-09.

| Tool | What it answers |
| --- | --- |
| `list_protocols` | The protocol family and the spine: ACM-SPARKS classifies, SM-ECO-10060 resolves, ACM-68000 signals. |
| `get_protocol` | Full canon record for ACM-SPARKS, SM-ECO-10060, or ACM-68000. |
| `list_signals` | The signal register, enumerated individually. One meaning, no drift. |
| `resolve_signal` | The state and meaning of a single ACM-68000 signal code. A CPG- profile code resolves to its ACM- twin; the response carries the resolved ACM- code. |
| `list_sparks_dimensions` | SPARKS resolves six dimensions — SKU, Pack, Amount, Region, Kernel, and Standard — a CPG industry first. |
| `resolve_sparks_dimension` | Canon record for a single SPARKS dimension by letter or name. |
| `list_members` | The sovereign jurisdictional member nodes: code, namespace, jurisdiction, region, and GS1 territory GTIN. |
| `resolve_member` | Canon record for a single sovereign member by code, e.g. FR, AU, MX. |
| `get_header_canon` | The GSC wire-header canon: the x-gsc-* headers every GSC surface emits, in canon order. |

## The signals

The register. Each ACM- signal has a CPG- profile twin naming the same definition.

| ACM- (wire form) | State | CPG- profile | Meaning |
| --- | --- | --- | --- |
| acm-000 | NOT_APPLICABLE | cpg-000 | Control or framework does not apply to this SKU. |
| acm-200 | ALLOW | cpg-200 | Eligible for autonomous procurement. Buyer agent may complete the order with human-in-the-loop confirmation in the retailer's chosen ERP. |
| acm-300 | CONDITIONAL | cpg-300 | Eligible subject to a documented condition (volume threshold, jurisdictional carve-out, time-bounded approval). |
| acm-403 | RESTRICT | cpg-403 | Not eligible in the requested context. Buyer agent must not complete the order. |
| acm-404 | NOT_FOUND | cpg-404 | GTIN is not registered. No signal available. |
| acm-451 | ESCALATE | cpg-451 | Cannot be resolved deterministically. Human review required. Served by mcp.cpghumanintheloop.ai. |
| acm-500 | SYSTEM_ERROR | cpg-500 | Server or upstream error. Retry per backoff policy. |

Any of the CPG- codes in the table resolves to its ACM- definition on the same row; the wire form is ACM-. The beacon's `resolve_signal` accepts either form and answers with the ACM- record, the resolved ACM- code on the response (`code`) beside the code as given (`input_code`); anything outside the seven is NOT_FOUND.

Links: https://acm-68000.ai · https://cpg-68000.ai · https://standard-10060.org

## Examples

| Walk | Python | TypeScript |
| --- | --- | --- |
| call the beacon: `tools/list`, then `list_protocols`, `list_signals`, `list_sparks_dimensions`; print the protocol set it returns; stop | `examples/beacon.py` | `examples/beacon.ts` |

Python 3 standard library only. TypeScript runs on Node 24 as-is (`node examples/beacon.ts`) with no dependencies. Live endpoint only.

## Sources on the wire

https://cpgagentprotocols.ai · https://mcp.cpgagentprotocols.ai/protocol.json · https://mcp.cpgagentprotocols.ai/signals.json · https://mcp.cpgagentprotocols.ai/sparks.json · https://mcp.cpgagentprotocols.ai/nodes.json · https://acm-sparks.ai · https://sm-eco-10060.org · https://acm-68000.org

Registry listing: `io.github.greencore-solutions/cpg-agent-protocols`.

---

GreenCore Solutions Corp. — 4611 Viking Way, Suite #260, Richmond BC V6V 2K9 Canada
GSC Agentic Pty Ltd — Level 1, 63-73 Ann Street, Surry Hills NSW 2010, Australia

Operated by GreenCore Solutions Corp. · https://gsc-em.com · @GSC_Rail_ai · @ACM68000
