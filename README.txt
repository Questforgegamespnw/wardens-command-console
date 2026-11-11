Personnel -> Vehicle cross-scale router, initial additive implementation.

1. Extract modules/ and tests/ into repository root.
2. Run: git apply --check app-router.patch
3. Run: git apply app-router.patch
4. Run: node --test tests/*.test.mjs

The app patch only validates personnel -> vehicle damage mode and delegates to
existing resolveDamage. It does not implement subsystem attack UI or automatic
crew/TAC consequence execution. The pure router exposes the subsystem route
for future explicit caller integration.

The source ZIP contained unrelated uncommitted changes, so app-router.patch
is a targeted diff against that uploaded app.js, not a replacement file.
