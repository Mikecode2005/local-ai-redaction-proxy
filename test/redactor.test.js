import test from "node:test";
import assert from "node:assert/strict";
import { redactText } from "../public/redactor.js";

test("redacts enabled email and API key patterns", () => {
  const result = redactText("Contact ada@example.com with sk-proj-1234567890abcdef.");
  assert.equal(result.changed, true);
  assert.match(result.output, /REDACTED:EMAIL/);
  assert.match(result.output, /REDACTED:SECRET/);
  assert.equal(result.matches.length, 2);
});

test("keeps disabled patterns unchanged", () => {
  const result = redactText("Reach ada@example.com at 192.168.10.44", { emails: false, apiKeys: false, bearerTokens: false, phoneNumbers: false, ipv4: false });
  assert.equal(result.output, "Reach ada@example.com at 192.168.10.44");
  assert.equal(result.matches.length, 0);
});

test("supports bearer token and phone detection", () => {
  const result = redactText("Bearer eyJhbGciOiJIUzI1NiJ9.demo-token / +1 (415) 555-0199");
  assert.ok(result.matches.some((match) => match.type === "bearer-token"));
  assert.ok(result.matches.some((match) => match.type === "phone"));
});
