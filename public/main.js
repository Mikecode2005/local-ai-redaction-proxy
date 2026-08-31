import { DEFAULT_POLICY, redactText } from "/redactor.js";

const input = document.querySelector("#prompt-input");
const output = document.querySelector("#redacted-output");
const matchList = document.querySelector("#match-list");
const matchCount = document.querySelector("#match-count");
const stateLabel = document.querySelector("#state-label");
const copyButton = document.querySelector("#copy-output");
const resetButton = document.querySelector("#reset-demo");
const policyForm = document.querySelector("#policy-form");
const toast = document.querySelector("#toast");

const sample = `Summarize this support ticket for the team.\n\nCustomer: ada@example.com\nCall-back: +1 (415) 555-0199\nThe provider key is sk-proj-1234567890abcdef.\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9.demo-token\nServer: 192.168.10.44`;

function getPolicy() {
  const policy = { ...DEFAULT_POLICY };
  policyForm?.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
    policy[checkbox.name] = checkbox.checked;
  });
  return policy;
}

function render() {
  const result = redactText(input?.value ?? "", getPolicy());
  if (output) output.textContent = result.output || "Your redacted preview will appear here.";
  if (matchCount) matchCount.textContent = String(result.matches.length);
  if (stateLabel) {
    stateLabel.textContent = result.changed ? "Protected preview" : "No matches found";
    stateLabel.dataset.state = result.changed ? "protected" : "clean";
  }
  if (matchList) {
    matchList.innerHTML = result.matches.length
      ? result.matches.map((match) => `<li><span class="match-type">${escapeHtml(match.type)}</span><code>${escapeHtml(match.preview)}</code><span>${match.length} chars</span></li>`).join("")
      : "<li class=\"empty\">No sensitive patterns detected with this policy.</li>";
  }
}

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  window.setTimeout(() => { toast.hidden = true; }, 2200);
}

input?.addEventListener("input", render);
policyForm?.addEventListener("change", render);
resetButton?.addEventListener("click", () => { if (input) input.value = sample; policyForm?.querySelectorAll("input[type=checkbox]").forEach((checkbox) => { checkbox.checked = DEFAULT_POLICY[checkbox.name]; }); render(); showToast("Synthetic example restored"); });
copyButton?.addEventListener("click", async () => { await navigator.clipboard?.writeText(output?.textContent ?? ""); showToast("Redacted preview copied"); });
input?.addEventListener("keydown", (event) => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") { event.preventDefault(); render(); showToast("Preview refreshed"); } });

if (input) input.value = sample;
render();
