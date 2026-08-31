export const DEFAULT_POLICY = {
  emails: true,
  apiKeys: true,
  bearerTokens: true,
  phoneNumbers: true,
  ipv4: false,
};

const detectors = {
  emails: { label: "email", pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi },
  apiKeys: { label: "secret", pattern: /\b(?:sk-[A-Za-z0-9_-]{12,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{20,}|xox[baprs]-[A-Za-z0-9-]{10,})\b/g },
  bearerTokens: { label: "bearer-token", pattern: /\bBearer\s+[A-Za-z0-9._~+\/-]+=*/gi },
  phoneNumbers: { label: "phone", pattern: /(?<!\d)(?:\+?\d[\d .()\-]{8,}\d)(?!\d)/g },
  ipv4: { label: "ipv4", pattern: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g },
};

export function redactText(input, policy = DEFAULT_POLICY) {
  let output = String(input ?? "");
  const matches = [];
  for (const [key, detector] of Object.entries(detectors)) {
    if (!policy[key]) continue;
    output = output.replace(detector.pattern, (match) => {
      matches.push({ type: detector.label, preview: preview(match), length: match.length });
      return `[REDACTED:${detector.label.toUpperCase()}]`;
    });
  }
  return { output, matches, changed: output !== input };
}

function preview(value) {
  if (value.length <= 4) return "••••";
  return `${value.slice(0, 2)}${"•".repeat(Math.min(8, Math.max(2, value.length - 4)))}${value.slice(-2)}`;
}
