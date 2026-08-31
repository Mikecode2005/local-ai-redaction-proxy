# Contributing

1. Install Node.js 20 or newer.
2. Run `npm test` and `npm run check`.
3. Add a synthetic test for each new detector or policy behavior.
4. Explain false positives, false negatives, and performance implications.
5. Never include real credentials, customer text, or private prompts.

Keep detection logic deterministic and dependency-light. A redaction feature should fail visibly when its policy is invalid rather than silently forwarding the original payload.
