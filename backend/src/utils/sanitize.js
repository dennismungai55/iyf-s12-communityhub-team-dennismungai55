// backend/src/utils/sanitize.js
const escapeHtml = (value) => {
  if (typeof value !== "string") return value;
  return value
    .replace(/&(?!amp;|lt;|gt;|quot;|&#39;)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

const sanitizeText = (value) => {
  if (typeof value !== "string") return value;
  return escapeHtml(value.trim());
};

const sanitizeTags = (tags) => {
  if (!Array.isArray(tags)) return [];
  return tags
    .filter((tag) => typeof tag === "string" && tag.trim().length > 0)
    .map((tag) => sanitizeText(tag))
    .slice(0, 20);
};

module.exports = { escapeHtml, sanitizeText, sanitizeTags };
