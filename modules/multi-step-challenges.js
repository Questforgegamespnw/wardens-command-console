const LENGTH_TARGETS = Object.freeze({
  short: 4,
  medium: 8,
  long: 12,
});

const SUPPORTED_LENGTHS = new Set([
  "short",
  "medium",
  "long",
  "custom",
]);

const SUPPORTED_STATUSES = new Set([
  "active",
  "paused",
  "completed",
  "abandoned",
  "failed",
]);

const PROGRESS_BY_DEGREE = Object.freeze({
  highest_success: 4,
  strong_success: 3,
  success: 2,
  narrow_success: 1,
  narrow_failure: 1,
  failure: 1,
  severe_failure: 1,
  highest_failure: 1,
});

export function getChallengeTarget(length, customTarget = null) {
  if (!SUPPORTED_LENGTHS.has(length)) {
    throw new RangeError(`Unknown challenge length: ${length}`);
  }

  if (length !== "custom") {
    return LENGTH_TARGETS[length];
  }

  const target = Number(customTarget);
  if (!Number.isInteger(target) || target < 1 || target > 99) {
    throw new RangeError(
      "Custom challenge progress must be an integer from 1 to 99."
    );
  }

  return target;
}

export function getDefaultChallengeProgress(degree) {
  if (!Object.hasOwn(PROGRESS_BY_DEGREE, degree)) {
    throw new RangeError(`Unknown Standard Test degree: ${degree}`);
  }

  return PROGRESS_BY_DEGREE[degree];
}

export function createMultiStepChallenge(input = {}, context = {}) {
  const now = context.now ?? (() => new Date().toISOString());
  const idFactory = context.idFactory ?? createLocalId;
  const length = input.length ?? "short";
  const targetProgress = getChallengeTarget(
    length,
    input.targetProgress
  );
  const currentProgress = clampInteger(
    input.currentProgress ?? 0,
    0,
    targetProgress,
    "Current progress"
  );
  const status = normalizeStatus(
    input.status ?? (currentProgress >= targetProgress ? "completed" : "active")
  );
  const timestamp = now();

  return Object.freeze({
    id: input.id ?? idFactory("challenge"),
    entityType: "multi_step_challenge",
    label: normalizeRequiredText(input.label, "Challenge label"),
    length,
    targetProgress,
    currentProgress,
    status:
      currentProgress >= targetProgress && status === "active"
        ? "completed"
        : status,
    stakes: normalizeOptionalText(input.stakes),
    completionOutcome: normalizeOptionalText(input.completionOutcome),
    defaultTest: normalizeDefaultTest(input.defaultTest),
    linkedEntityId: input.linkedEntityId ?? null,
    linkedShipEntityId: input.linkedShipEntityId ?? null,
    attemptCount: Number.isInteger(input.attemptCount)
      ? Math.max(0, input.attemptCount)
      : 0,
    history: Object.freeze(
      Array.isArray(input.history)
        ? input.history.map((entry) => Object.freeze({ ...entry }))
        : []
    ),
    notes: normalizeOptionalText(input.notes),
    createdAt: input.createdAt ?? timestamp,
    updatedAt: timestamp,
  });
}

export function applyChallengeAttempt(
  challenge,
  standardTestResult,
  options = {},
  context = {}
) {
  assertChallenge(challenge);

  if (challenge.status !== "active") {
    throw new Error("Only an active challenge can receive an attempt.");
  }

  if (standardTestResult?.resolverId !== "standard_test") {
    throw new TypeError(
      "A multi-step challenge attempt requires a Standard Test result."
    );
  }

  if (standardTestResult.status === "error") {
    throw new Error("An invalid Standard Test cannot be applied.");
  }

  const now = context.now ?? (() => new Date().toISOString());
  const proposedProgress = getDefaultChallengeProgress(
    standardTestResult.degree
  );
  const progressAdded = clampInteger(
    options.progressAdded ?? proposedProgress,
    0,
    99,
    "Attempt progress"
  );
  const nextProgress = Math.min(
    challenge.targetProgress,
    challenge.currentProgress + progressAdded
  );
  const completed = nextProgress >= challenge.targetProgress;
  const timestamp = now();

  const historyEntry = Object.freeze({
    id: createLocalId("challenge_attempt"),
    type: "attempt",
    actorLabel: normalizeOptionalText(options.actorLabel),
    approach: normalizeOptionalText(options.approach),
    resultId: standardTestResult.id ?? null,
    resultLabel: standardTestResult.label ?? "Standard Test",
    status: standardTestResult.status,
    degree: standardTestResult.degree,
    proposedProgress,
    progressAdded,
    progressBefore: challenge.currentProgress,
    progressAfter: nextProgress,
    consequence: normalizeOptionalText(options.consequence),
    createdAt: timestamp,
  });

  return Object.freeze({
    ...challenge,
    currentProgress: nextProgress,
    status: completed ? "completed" : challenge.status,
    attemptCount: challenge.attemptCount + 1,
    history: Object.freeze([...challenge.history, historyEntry]),
    updatedAt: timestamp,
  });
}

export function expandChallengeScope(
  challenge,
  options = {},
  context = {}
) {
  assertChallenge(challenge);

  const now = context.now ?? (() => new Date().toISOString());
  const previousTarget = challenge.targetProgress;
  let length = challenge.length;
  let newTarget;

  if (options.length) {
    length = options.length;
    newTarget = getChallengeTarget(length, options.targetProgress);
  } else {
    newTarget = Number(options.targetProgress);
    if (!Number.isInteger(newTarget) || newTarget < 1 || newTarget > 99) {
      throw new RangeError(
        "Expanded challenge target must be an integer from 1 to 99."
      );
    }
    length = inferLength(newTarget);
  }

  if (newTarget <= previousTarget) {
    throw new RangeError(
      "Expanding a challenge must increase its total target."
    );
  }

  const timestamp = now();
  const historyEntry = Object.freeze({
    id: createLocalId("challenge_scope"),
    type: "scope_expanded",
    previousTarget,
    newTarget,
    reason: normalizeOptionalText(options.reason),
    createdAt: timestamp,
  });

  return Object.freeze({
    ...challenge,
    length,
    targetProgress: newTarget,
    status:
      challenge.status === "completed" && challenge.currentProgress < newTarget
        ? "active"
        : challenge.status,
    history: Object.freeze([...challenge.history, historyEntry]),
    updatedAt: timestamp,
  });
}

export function updateChallengeStatus(challenge, status, context = {}) {
  assertChallenge(challenge);
  const now = context.now ?? (() => new Date().toISOString());
  const nextStatus = normalizeStatus(status);

  return Object.freeze({
    ...challenge,
    status: nextStatus,
    updatedAt: now(),
  });
}

export function replaceMultiStepChallenge(challenges, updated) {
  return challenges.map((challenge) =>
    challenge.id === updated.id ? updated : challenge
  );
}

export function removeMultiStepChallenge(challenges, challengeId) {
  return challenges.filter((challenge) => challenge.id !== challengeId);
}

export function getMultiStepChallenge(challenges, challengeId) {
  return challenges.find((challenge) => challenge.id === challengeId) ?? null;
}

function normalizeDefaultTest(test) {
  if (!test || typeof test !== "object") return null;

  return Object.freeze({
    testType: test.testType === "save" ? "save" : "action",
    baseLabel: normalizeOptionalText(test.baseLabel) || "Stat",
    baseValue: Number.isFinite(Number(test.baseValue))
      ? Number(test.baseValue)
      : 0,
    skillLabel: normalizeOptionalText(test.skillLabel),
    skillValue: Number.isFinite(Number(test.skillValue))
      ? Number(test.skillValue)
      : 0,
  });
}

function inferLength(target) {
  if (target === 4) return "short";
  if (target === 8) return "medium";
  if (target === 12) return "long";
  return "custom";
}

function assertChallenge(challenge) {
  if (!challenge || challenge.entityType !== "multi_step_challenge") {
    throw new TypeError("A valid multi-step challenge is required.");
  }
}

function normalizeStatus(status) {
  if (!SUPPORTED_STATUSES.has(status)) {
    throw new RangeError(`Unknown challenge status: ${status}`);
  }
  return status;
}

function normalizeRequiredText(value, label) {
  const text = String(value ?? "").trim();
  if (!text) throw new TypeError(`${label} is required.`);
  return text;
}

function normalizeOptionalText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function clampInteger(value, min, max, label) {
  const number = Number(value);
  if (!Number.isInteger(number)) {
    throw new TypeError(`${label} must be an integer.`);
  }
  return Math.max(min, Math.min(max, number));
}

function createLocalId(prefix) {
  if (globalThis.crypto?.randomUUID) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
