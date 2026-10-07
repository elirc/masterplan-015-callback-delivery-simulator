# M015: mentor hints and answer directions

[Expanded workshop map](WORKBOOK-INDEX.md) · [Repository overview](../README.md)

Use this chapter after making an attempt. It provides reasoning directions and evaluation criteria, not finished feature patches. A learner can choose a different design when the revised contract is explicit and the evidence supports it.

## Retrieval card 01: answer direction

**Question:** Explain scheduling through this project

Registering work to run later.

Look for a concrete connection to `public/core.js` or `public/app.js`. A strong answer names an input or condition, the responsible operation and the resulting behavior. Merely repeating the vocabulary word is insufficient. If your example differs from the reference, check whether it is supported by the contract before treating a different outcome as a defect.

## Retrieval card 02: answer direction

**Question:** Explain run identity through this project

The particular invocation whose output is still relevant.

Look for a concrete connection to `public/core.js` or `public/app.js`. A strong answer names an input or condition, the responsible operation and the resulting behavior. Merely repeating the vocabulary word is insufficient. If your example differs from the reference, check whether it is supported by the contract before treating a different outcome as a defect.

## Retrieval card 03: answer direction

**Question:** Explain cancellation guard through this project

A check that makes stale callbacks do nothing.

Look for a concrete connection to `public/core.js` or `public/app.js`. A strong answer names an input or condition, the responsible operation and the resulting behavior. Merely repeating the vocabulary word is insufficient. If your example differs from the reference, check whether it is supported by the contract before treating a different outcome as a defect.

## Retrieval card 04: answer direction

**Question:** Explain error boundary through this project

The point where a thrown failure can be caught.

Look for a concrete connection to `public/core.js` or `public/app.js`. A strong answer names an input or condition, the responsible operation and the resulting behavior. Merely repeating the vocabulary word is insufficient. If your example differs from the reference, check whether it is supported by the contract before treating a different outcome as a defect.

## Retrieval card 05: answer direction

**Question:** Predict: Normal run

start, scheduled, delivered B, delivered A

Look for a concrete connection to `public/core.js` or `public/app.js`. A strong answer names an input or condition, the responsible operation and the resulting behavior. Merely repeating the vocabulary word is insufficient. If your example differs from the reference, check whether it is supported by the contract before treating a different outcome as a defect.

## Retrieval card 06: answer direction

**Question:** Predict: A fails

B still delivers; error A is recorded

Look for a concrete connection to `public/core.js` or `public/app.js`. A strong answer names an input or condition, the responsible operation and the resulting behavior. Merely repeating the vocabulary word is insufficient. If your example differs from the reference, check whether it is supported by the contract before treating a different outcome as a defect.

## Retrieval card 07: answer direction

**Question:** Predict: Reset before delivery

No old callback may append after Reset

Look for a concrete connection to `public/core.js` or `public/app.js`. A strong answer names an input or condition, the responsible operation and the resulting behavior. Merely repeating the vocabulary word is insufficient. If your example differs from the reference, check whether it is supported by the contract before treating a different outcome as a defect.

## Retrieval card 08: answer direction

**Question:** Which part of the test models order, and which part deliberately does not model elapsed time?

The core receives schedule and cancel functions. The browser supplies timers; tests collect callback jobs and invoke them in controlled order. This avoids tests that depend on sleeping for an exact amount of wall time. The fake scheduler still honors the asynchronous contract by not invoking callbacks during scheduling.

Look for a concrete connection to `public/core.js` or `public/app.js`. A strong answer names an input or condition, the responsible operation and the resulting behavior. Merely repeating the vocabulary word is insufficient. If your example differs from the reference, check whether it is supported by the contract before treating a different outcome as a defect.

## Retrieval card 09: answer direction

**Question:** Why is one global boolean shared by every run weaker than one closure per run?

Clearing timers is the normal cancellation mechanism, but the active flag also rejects a callback the test delivers after cancellation. It makes the desired stale-output rule observable independently of scheduler behavior. Each start owns its own flag and stop function; a new run must not reactivate an old one.

Look for a concrete connection to `public/core.js` or `public/app.js`. A strong answer names an input or condition, the responsible operation and the resulting behavior. Merely repeating the vocabulary word is insufficient. If your example differs from the reference, check whether it is supported by the contract before treating a different outcome as a defect.

## Retrieval card 10: answer direction

**Question:** Where must a catch sit to observe an exception thrown later?

A try/catch around scheduling would finish before the delayed callback throws. The reference catches the simulated error at the actual execution boundary and emits a diagnostic row. It does not promise to recover from a broken emit adapter; that adapter is supplied by the application and expected to work.

Look for a concrete connection to `public/core.js` or `public/app.js`. A strong answer names an input or condition, the responsible operation and the resulting behavior. Merely repeating the vocabulary word is insufficient. If your example differs from the reference, check whether it is supported by the contract before treating a different outcome as a defect.

## Retrieval card 11: answer direction

**Question:** What does your strongest check not prove?

Use the scope recorded in VERIFICATION.md; do not infer production readiness from a small local fixture.

Look for a concrete connection to `public/core.js` or `public/app.js`. A strong answer names an input or condition, the responsible operation and the resulting behavior. Merely repeating the vocabulary word is insufficient. If your example differs from the reference, check whether it is supported by the contract before treating a different outcome as a defect.

## Retrieval card 12: answer direction

**Question:** Why does the order of starting work differ from the order of completing it?

A scheduled callback is future work, not a result that already exists. Cancellation therefore has two parts: ask the scheduler to remove work and make any stale callback harmless if it still arrives. A run-specific closure distinguishes old work from a new run. Deterministic tests can deliver captured callbacks in any order without pretending to simulate real elapsed time.

Look for a concrete connection to `public/core.js` or `public/app.js`. A strong answer names an input or condition, the responsible operation and the resulting behavior. Merely repeating the vocabulary word is insufficient. If your example differs from the reference, check whether it is supported by the contract before treating a different outcome as a defect.

## Story 07: Add configurable sample delays

**First hint:** The desired improvement is “Let learners predict another ordering.” Start by identifying which existing boundary already knows the necessary information. Do not copy that information into new state until you can explain why derivation is insufficient.

**Second hint:** Follow this source-specific route: Accept a small bounded delay choice; pass it through the scheduler boundary; document equal-delay limits separately. Keep each stage independently inspectable. If a step requires a policy choice, write the choice before implementing it.

**Third hint:** Your strongest completion evidence should establish: Tests control callback order without waiting on wall time. Invent a plausible wrong implementation and make your example disagree with it.

**Decision still left to you:** Choose the allowed delay values. The guide intentionally does not settle this. Evaluate your answer by clarity of the contract, consistency of the implementation and quality of verification, not by guessing the author's preferred wording.

## Story 08: Add a run identifier to the log

**First hint:** The desired improvement is “Make stale-output diagnosis visible.” Start by identifying which existing boundary already knows the necessary information. Do not copy that information into new state until you can explain why derivation is insufficient.

**Second hint:** Follow this source-specific route: Generate an ID at start; attach it to emitted events; preserve the per-run active guard. Keep each stage independently inspectable. If a step requires a policy choice, write the choice before implementing it.

**Third hint:** Your strongest completion evidence should establish: Old canceled run IDs never appear after reset in the current log. Invent a plausible wrong implementation and make your example disagree with it.

**Decision still left to you:** Choose a readable ID scheme. The guide intentionally does not settle this. Evaluate your answer by clarity of the contract, consistency of the implementation and quality of verification, not by guessing the author's preferred wording.

## Story 09: Add a completion summary

**First hint:** The desired improvement is “Signal when every scheduled job has finished.” Start by identifying which existing boundary already knows the necessary information. Do not copy that information into new state until you can explain why derivation is insufficient.

**Second hint:** Follow this source-specific route: Count completion for both success and failure; emit one final summary; suppress it for a canceled run. Keep each stage independently inspectable. If a step requires a policy choice, write the choice before implementing it.

**Third hint:** Your strongest completion evidence should establish: A failure does not leave the run permanently pending. Invent a plausible wrong implementation and make your example disagree with it.

**Decision still left to you:** Choose whether cancellation has its own summary. The guide intentionally does not settle this. Evaluate your answer by clarity of the contract, consistency of the implementation and quality of verification, not by guessing the author's preferred wording.

## Story 10: Add cancel feedback

**First hint:** The desired improvement is “Distinguish user cancellation from delivery failure.” Start by identifying which existing boundary already knows the necessary information. Do not copy that information into new state until you can explain why derivation is insufficient.

**Second hint:** Follow this source-specific route: Record cancellation as a UI event; call the stop function; avoid relabeling canceled jobs as failed deliveries. Keep each stage independently inspectable. If a step requires a policy choice, write the choice before implementing it.

**Third hint:** Your strongest completion evidence should establish: No later callback appends after cancellation feedback. Invent a plausible wrong implementation and make your example disagree with it.

**Decision still left to you:** Choose wording for jobs already completed. The guide intentionally does not settle this. Evaluate your answer by clarity of the contract, consistency of the implementation and quality of verification, not by guessing the author's preferred wording.

## Story 11: Add a scheduler contract worksheet

**First hint:** The desired improvement is “Clarify what a test double assumes.” Start by identifying which existing boundary already knows the necessary information. Do not copy that information into new state until you can explain why derivation is insufficient.

**Second hint:** Follow this source-specific route: List deferred invocation, handles and cancellation responsibilities; contrast a fake synchronous scheduler; explain unsupported behavior. Keep each stage independently inspectable. If a step requires a policy choice, write the choice before implementing it.

**Third hint:** Your strongest completion evidence should establish: The worksheet does not claim the fake measures real timer precision. Invent a plausible wrong implementation and make your example disagree with it.

**Decision still left to you:** Choose one assumption to challenge. The guide intentionally does not settle this. Evaluate your answer by clarity of the contract, consistency of the implementation and quality of verification, not by guessing the author's preferred wording.

## Story 12: Add a delivery-order comparison

**First hint:** The desired improvement is “Compare predicted and actual event IDs after a run.” Start by identifying which existing boundary already knows the necessary information. Do not copy that information into new state until you can explain why derivation is insufficient.

**Second hint:** Follow this source-specific route: Store the prediction separately; collect actual completions; compare only after completion or explicit cancel. Keep each stage independently inspectable. If a step requires a policy choice, write the choice before implementing it.

**Third hint:** Your strongest completion evidence should establish: Prediction is never presented as observed delivery evidence. Invent a plausible wrong implementation and make your example disagree with it.

**Decision still left to you:** Choose how to display a mismatch. The guide intentionally does not settle this. Evaluate your answer by clarity of the contract, consistency of the implementation and quality of verification, not by guessing the author's preferred wording.

## Story 13: Add a duplicate-callback probe

**First hint:** The desired improvement is “Explore an unreliable scheduler as a new contract.” Start by identifying which existing boundary already knows the necessary information. Do not copy that information into new state until you can explain why derivation is insufficient.

**Second hint:** Follow this source-specific route: Invoke one captured callback twice in a test; decide whether idempotent delivery is required; add per-job completion tracking only if chosen. Keep each stage independently inspectable. If a step requires a policy choice, write the choice before implementing it.

**Third hint:** Your strongest completion evidence should establish: The reference limit and your extended policy are clearly distinguished. Invent a plausible wrong implementation and make your example disagree with it.

**Decision still left to you:** Choose reject, ignore or record duplicates. The guide intentionally does not settle this. Evaluate your answer by clarity of the contract, consistency of the implementation and quality of verification, not by guessing the author's preferred wording.

## Story 14: Add a callback error detail toggle

**First hint:** The desired improvement is “Separate concise status from diagnostic explanation.” Start by identifying which existing boundary already knows the necessary information. Do not copy that information into new state until you can explain why derivation is insufficient.

**Second hint:** Follow this source-specific route: Return structured error data; render safe text in a disclosure; avoid exposing unrelated environment details. Keep each stage independently inspectable. If a step requires a policy choice, write the choice before implementing it.

**Third hint:** Your strongest completion evidence should establish: Toggling detail does not rerun the callback or change completion state. Invent a plausible wrong implementation and make your example disagree with it.

**Decision still left to you:** Choose the diagnostic fields. The guide intentionally does not settle this. Evaluate your answer by clarity of the contract, consistency of the implementation and quality of verification, not by guessing the author's preferred wording.

## Story 15: Add a stop-idempotence check

**First hint:** The desired improvement is “Verify repeated cancellation is harmless.” Start by identifying which existing boundary already knows the necessary information. Do not copy that information into new state until you can explain why derivation is insufficient.

**Second hint:** Follow this source-specific route: Call stop twice in a fake scheduler; invoke queued callbacks afterward; inspect output and cancellation records. Keep each stage independently inspectable. If a step requires a policy choice, write the choice before implementing it.

**Third hint:** Your strongest completion evidence should establish: No delivery is emitted after either stop and repeated calls do not reactivate work. Invent a plausible wrong implementation and make your example disagree with it.

**Decision still left to you:** Choose whether duplicate cancel requests are observable. The guide intentionally does not settle this. Evaluate your answer by clarity of the contract, consistency of the implementation and quality of verification, not by guessing the author's preferred wording.

## Mentor feedback rubric

| Dimension | Beginning | Developing | Independent evidence |
|---|---|---|---|
| Trace | Names files only | Follows one ordinary case | Predicts a new boundary and explains its owner |
| Test design | Copies output | Uses a stated expectation | Rejects a plausible wrong candidate |
| Design | Repeats a slogan | Names an alternative | Compares costs using a concrete change |
| Agent use | Accepts a generated answer | Checks suggested edits | Supplies own proposal and adjudicates critiques |
| Handoff | Claims it works | Lists actual checks | Explains behavior, evidence and limits coherently |

Use the rubric to choose the next practice action, not to label yourself permanently. A learner may be independent at source tracing and still need help designing a failure case. Target the missing skill with one smaller exercise.
