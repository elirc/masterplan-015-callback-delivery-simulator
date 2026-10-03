# Debugging laboratory

[Concepts](02-CONCEPTS-AND-TRACES.md) · [Practice stories](05-PRACTICE-STORIES.md)

These are deliberately proposed defects for a scratch branch. They are not claims that the shipped reference still contains these bugs. Keep main working and introduce only one change at a time.

## Case 1: An old delivery appears after Reset

**Introduce or discuss this mistake:** Remove the active guard and substitute a scheduler that still invokes a queued callback.

**Discriminating experiment:** Stop a fake run, then execute its captured callbacks.

### Worked diagnosis

First state the expected contract: A run emits start and scheduled synchronously, then delivers B before A using delayed callbacks. A may produce a simulated callback error without suppressing B. Starting again or resetting cancels the old timers and marks the old run inactive so an already queued callback cannot append stale output. Timing is injected for deterministic unit tests; the model is local and makes no network-delivery guarantees. Then create the smallest example from the experiment above. Compare the observed result with the contract before changing more code. The likely cause is at this boundary: **public/core.js: active belongs to each run closure.** Repair that boundary, rerun the example, and check one neighboring valid case so the repair does not merely special-case the chosen input.

The completed reasoning record is: symptom → contract violated → input that distinguishes hypotheses → owning line or rule → minimal repair → regression evidence. This is a worked diagnostic route; fill in your actual outputs when you run it. No invented console transcript is supplied.

## Case 2: The page reports an uncaught delayed exception

**Introduce or discuss this mistake:** Move try/catch outside schedule rather than inside its callback.

**Discriminating experiment:** Choose A failure and wait for A to execute.

### Your investigation

1. Write two possible explanations before looking at the hints.
2. Predict what the experiment would show if each explanation were true.
3. Run or inspect the smallest discriminating case and record the result.
4. Identify the owning file and make one bounded repair.
5. Verify the original case and a neighboring case; explain why both matter.

**Location hint, only after your attempt:** public/core.js: errors must be caught at the execution boundary.

## Case 3: Starting again merges two logs

**Introduce or discuss this mistake:** Forget to call the previous stop before creating a new run.

**Discriminating experiment:** Start twice before A completes and count duplicate deliveries.

### Your investigation

1. Write two possible explanations before looking at the hints.
2. Predict what the experiment would show if each explanation were true.
3. Run or inspect the smallest discriminating case and record the result.
4. Identify the owning file and make one bounded repair.
5. Verify the original case and a neighboring case; explain why both matter.

**Location hint, only after your attempt:** public/app.js: one active run owns the visible log.

## If the first repair does not work

Do not pile on another unrelated edit. Read the diff and check whether the observed failure changed. If the hypothesis was wrong, write that down and restore only your own experimental change before testing the next hypothesis. A rejected hypothesis is useful progress when its evidence is clear.

When asking an assistant for help, provide the exact input, expected and observed result, the current diff and the file you believe owns the rule. Ask for one counterexample or diagnostic question first. Keep proposed causes separate from demonstrated causes.
