# Build journal: Callback Delivery Simulator

[Code tour](03-CODE-TOUR.md) · [Actual verification](VERIFICATION.md)

This is a retrospective teaching narrative about the implementation in this repository. It is not a verbatim conversation, fabricated team debate or hidden chain-of-thought transcript. The design explanations below are reviewable rationales tied to the source. Dates and check results belong to the verification record.

## The starting problem

A learner wants to understand when a callback runs relative to ordinary statements.

The main temptation was to make the project larger than its learning target. The useful boundary is **execution order and delayed work**. A finished small example lets you inspect the whole path and ask what each part contributes. Extra infrastructure would add more things to configure before the central idea became clear.

## The first contract

A run emits start and scheduled synchronously, then delivers B before A using delayed callbacks. A may produce a simulated callback error without suppressing B. Starting again or resetting cancels the old timers and marks the old run inactive so an already queued callback cannot append stale output. Timing is injected for deterministic unit tests; the model is local and makes no network-delivery guarantees.

The contract turned broad intent into examples that can disagree with an implementation. That matters because a plausible-looking result can hide a wrong boundary rule. The examples in the concepts guide were chosen to expose those distinctions, not to make the demo look flawless.

## Decision note 1: Inject the scheduler

The core receives schedule and cancel functions. The browser supplies timers; tests collect callback jobs and invoke them in controlled order. This avoids tests that depend on sleeping for an exact amount of wall time. The fake scheduler still honors the asynchronous contract by not invoking callbacks during scheduling.

**What a learner should challenge:** Which part of the test models order, and which part deliberately does not model elapsed time?

**Evidence to consult:** inspect the owning source file, the contract examples and the verification scope. If your alternative satisfies the same behavior with a different structure, compare the maintenance cost instead of assuming one syntax is automatically correct.

## Decision note 2: Guard canceled runs as well as timers

Clearing timers is the normal cancellation mechanism, but the active flag also rejects a callback the test delivers after cancellation. It makes the desired stale-output rule observable independently of scheduler behavior. Each start owns its own flag and stop function; a new run must not reactivate an old one.

**What a learner should challenge:** Why is one global boolean shared by every run weaker than one closure per run?

**Evidence to consult:** inspect the owning source file, the contract examples and the verification scope. If your alternative satisfies the same behavior with a different structure, compare the maintenance cost instead of assuming one syntax is automatically correct.

## Decision note 3: Catch failure inside the callback

A try/catch around scheduling would finish before the delayed callback throws. The reference catches the simulated error at the actual execution boundary and emits a diagnostic row. It does not promise to recover from a broken emit adapter; that adapter is supplied by the application and expected to work.

**What a learner should challenge:** Where must a catch sit to observe an exception thrown later?

**Evidence to consult:** inspect the owning source file, the contract examples and the verification scope. If your alternative satisfies the same behavior with a different structure, compare the maintenance cost instead of assuming one syntax is automatically correct.

## What the checks contributed

The pure-function checks exercised the contract independently of the DOM. Browser checks then verified that real controls passed inputs, showed results and recovered from relevant error or empty states. These are complementary forms of evidence.

The record in VERIFICATION.md reports actual local observations. A GitHub Actions workflow is provided, but its remote result must be inspected separately after a push. A screenshot documents one rendered state; it is not a substitute for the interaction and boundary checks.

## What you should do differently on your own build

Start from the same user need but write your own examples first. Choose a small variation from the story list. Predict behavior, implement a slice and compare the result with your prediction. The reference helps you judge a finished result; your journal should record your own uncertainties and discoveries rather than adopting this narrative as if you experienced it.

## The handoff

The next learner can start from README, locate `deliveryRun`, reproduce the example table and attempt one bounded story. That is the intended handoff quality: a working result plus enough evidence and explanation to continue safely. The six practice stories remain unfinished for the learner.
