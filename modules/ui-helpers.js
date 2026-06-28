/**
 * UI-only helper functions.
 *
 * Mechanical resolver logic should not depend on this module.
 */

export function getCheckedValue(name, fallback = "") {
  return (
    document.querySelector(
      `input[name="${name}"]:checked`
    )?.value ?? fallback
  );
}

export function isMobileViewport(
  query = "(max-width: 920px)"
) {
  return window.matchMedia(query).matches;
}

export function formatNumber(value) {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  ) {
    return "—";
  }

  return String(Number(value));
}

export function formatSignedNumber(value) {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  ) {
    return "—";
  }

  const number = Number(value);

  return number > 0
    ? `+${number}`
    : String(number);
}

export function formatPercentileDisplay(value) {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  ) {
    return "—";
  }

  return String(Number(value)).padStart(2, "0");
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
