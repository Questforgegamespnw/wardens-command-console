/**
 * Warden Resolution Console
 * Shared dice utilities.
 *
 * Supported dice:
 * - Xd10
 * - Xd5, derived from d10 results
 * - d100 percentile checks
 *
 * Mothership percentile results use 00–99.
 */

/**
 * Return a random integer between min and max, inclusive.
 *
 * @param {number} min
 * @param {number} max
 * @param {() => number} rng
 * @returns {number}
 */
function randomInt(min, max, rng = Math.random) {
  if (!Number.isInteger(min) || !Number.isInteger(max) || min > max) {
    throw new RangeError("randomInt requires valid integer bounds.");
  }

  const randomValue = rng();

  if (
    typeof randomValue !== "number" ||
    Number.isNaN(randomValue) ||
    randomValue < 0 ||
    randomValue >= 1
  ) {
    throw new RangeError("rng must return a number from 0 inclusive to 1 exclusive.");
  }

  return Math.floor(randomValue * (max - min + 1)) + min;
}

/**
 * Validate a requested dice quantity.
 *
 * @param {number} count
 * @returns {number}
 */
function normalizeCount(count) {
  const normalized = Number(count);

  if (!Number.isInteger(normalized) || normalized < 1) {
    throw new RangeError("Dice count must be a positive integer.");
  }

  return normalized;
}

/**
 * Roll one ten-sided die.
 *
 * @param {() => number} rng
 * @returns {number}
 */
export function rollD10(rng = Math.random) {
  return randomInt(1, 10, rng);
}

/**
 * Roll Xd10 and return the individual dice and total.
 *
 * @param {number} count
 * @param {() => number} rng
 * @returns {{
 *   notation: string,
 *   rolls: number[],
 *   total: number
 * }}
 */
export function rollXd10(count = 1, rng = Math.random) {
  const quantity = normalizeCount(count);
  const rolls = Array.from({ length: quantity }, () => rollD10(rng));

  return {
    notation: `${quantity}d10`,
    rolls,
    total: rolls.reduce((sum, value) => sum + value, 0)
  };
}

/**
 * Convert a d10 result into the project's d5 result.
 *
 * Current homebrew rule:
 * Roll d10, halve the result, and round down.
 *
 * This produces values from 1–5.
 *
 * @param {number} d10Result
 * @returns {number}
 */
export function halveD10ToD5(d10Result) {
  const value = Number(d10Result);

  if (!Number.isInteger(value) || value < 1 || value > 10) {
    throw new RangeError("A d10 result must be an integer from 1 to 10.");
  }

  return Math.ceil(value / 2);
}

/**
 * Roll Xd5 by rolling Xd10, halving each die, and rounding down.
 *
 * @param {number} count
 * @param {() => number} rng
 * @returns {{
 *   notation: string,
 *   sourceNotation: string,
 *   sourceRolls: number[],
 *   rolls: number[],
 *   total: number
 * }}
 */
export function rollXd5(count = 1, rng = Math.random) {
  const quantity = normalizeCount(count);
  const source = rollXd10(quantity, rng);
  const rolls = source.rolls.map(halveD10ToD5);

  return {
    notation: `${quantity}d5`,
    sourceNotation: `${quantity}d10`,
    sourceRolls: source.rolls,
    rolls,
    total: rolls.reduce((sum, value) => sum + value, 0)
  };
}

/**
 * Roll a Mothership percentile result from 00–99.
 *
 * The tens and ones dice are preserved for transparent display.
 * A result of 00 is stored as numeric 0 and may be displayed as "00".
 *
 * @param {() => number} rng
 * @returns {{
 *   notation: string,
 *   tens: number,
 *   ones: number,
 *   rolls: number[],
 *   total: number,
 *   display: string
 * }}
 */
export function rollD100(rng = Math.random) {
  const tens = randomInt(0, 9, rng);
  const ones = randomInt(0, 9, rng);
  const total = tens * 10 + ones;

  return {
    notation: "d100",
    tens,
    ones,
    rolls: [tens, ones],
    total,
    display: String(total).padStart(2, "0")
  };
}

/**
 * Roll a supported notation string.
 *
 * Supported examples:
 * - d100
 * - d10
 * - 3d10
 * - d5
 * - 2d5
 *
 * @param {string} notation
 * @param {() => number} rng
 * @returns {object}
 */
export function rollNotation(notation, rng = Math.random) {
  if (typeof notation !== "string") {
    throw new TypeError("Dice notation must be a string.");
  }

  const normalized = notation.trim().toLowerCase();

  if (normalized === "d100" || normalized === "1d100") {
    return rollD100(rng);
  }

  const match = normalized.match(/^(\d*)d(10|5)$/);

  if (!match) {
    throw new RangeError(`Unsupported dice notation: ${notation}`);
  }

  const count = match[1] === "" ? 1 : Number(match[1]);
  const dieSize = Number(match[2]);

  return dieSize === 10
    ? rollXd10(count, rng)
    : rollXd5(count, rng);
}