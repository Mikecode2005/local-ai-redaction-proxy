# local-ai-redaction-proxy

> Inspect what leaves your machine before an AI request does.

[![Node.js](https://img.shields.io/badge/node-%3E%3D20-2f6f4e?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Privacy](https://img.shields.io/badge/privacy-local--first-7c3aed)](SECURITY.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**local-ai-redaction-proxy** is a local-first privacy tool for detecting secrets and personal data before prompts or tool results are sent to an AI provider. This repository includes a browser playground for transparent redaction previews and a dependency-light JavaScript core that can be reused by a future localhost proxy.

## Why this exists

AI tools are useful, but prompts can accidentally contain email addresses, phone numbers, API keys, bearer tokens, internal IP addresses, and customer context. The safest default is to make the outgoing payload visible and reviewable before it leaves the developer machine.

This project is intentionally honest about its scope:

- The browser demo runs locally in the page and does not send text to an AI provider.
- The current MVP uses deterministic pattern detectors, not a claim of complete PII coverage.
- Redaction is a defense-in-depth layer, not a replacement for provider policies or secret management.
- False positives and false negatives are possible; review the preview before sending.

## Browser playground

The live demo contains synthetic content only. It shows:

- Redacted output side by side with the input.
- Match count and redaction categories.
- Toggles for email, API keys, bearer tokens, phone numbers, and IPv4 addresses.
- Copy and reset controls.
- Keyboard shortcut: Ctrl/Cmd + Enter refreshes the preview.

## Local development

```bash
npm test
npm run check
npm run build
```

For the browser preview:

```bash
npm run dev
```

## Detection policy

The default policy detects:

| Category | Default | Example replacement |
| --- | ---: | --- |
| Email | On | [REDACTED:EMAIL] |
| API key patterns | On | [REDACTED:SECRET] |
| Bearer tokens | On | [REDACTED:BEARER-TOKEN] |
| Phone numbers | On | [REDACTED:PHONE] |
| IPv4 addresses | Off | [REDACTED:IPV4] |

Patterns are intentionally conservative and should be extended with organization-specific policies before production use.

## Planned localhost proxy

The next implementation stage will add a localhost process that:

1. Accepts an explicit outbound request configuration.
2. Applies a named redaction policy before forwarding.
3. Writes a local audit event containing counts and categories, not raw secrets.
4. Shows a diff when a payload changes.
5. Fails closed when policy configuration is invalid.

No credentials belong in this repository. Read [SECURITY.md](SECURITY.md) before using real data.

## Contributing

Please add synthetic fixtures for new detectors, document false-positive tradeoffs, and avoid claiming complete protection. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).
