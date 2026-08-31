# Security policy

This project is a privacy helper, not a guarantee that sensitive data can never escape. Pattern-based detection has limits and can miss custom secrets, encoded values, screenshots, or domain-specific identifiers.

## Safe use

- Test with synthetic values first.
- Review the redacted preview before sending a request.
- Keep credentials out of browser storage and source files.
- Treat redaction logs as metadata; never log raw payloads by default.
- Add organization-specific patterns before production use.

## Reporting

Do not publish a real secret or private prompt in an issue. Contact the maintainer privately with a sanitized reproduction and impact description.
