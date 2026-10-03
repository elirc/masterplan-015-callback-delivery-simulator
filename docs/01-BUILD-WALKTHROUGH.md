# Building Callback Delivery Simulator, one decision at a time

[Learning route](00-START-HERE.md) · [Code tour](03-CODE-TOUR.md)

This is a reconstruction of how to approach the finished reference. It explains visible design choices; it is not a transcript of hidden reasoning or a claim that a fictional team performed these steps.

## Start from the contract

A run emits start and scheduled synchronously, then delivers B before A using delayed callbacks. A may produce a simulated callback error without suppressing B. Starting again or resetting cancels the old timers and marks the old run inactive so an already queued callback cannot append stale output. Timing is injected for deterministic unit tests; the model is local and makes no network-delivery guarantees.

The smallest useful result answers this user need: A learner wants to understand when a callback runs relative to ordinary statements. Write the examples before choosing file names. Keep the scope small enough that the decisive behavior fits in one trace.

## Step 1: Predict without running

Write the four normal log entries in order before pressing Start. Scheduling A first does not mean delivering it first. start and scheduled belong to the synchronous path, while the deliveries happen after that path returns. The example uses different delays so this distinction is visible.

**Pause and produce evidence:** Normal run. Predict the outcome, then compare it with the reference. In your notes, distinguish what the code says should happen from what you actually observed.

## Step 2: Read the injected boundary

Trace schedule from deliveryRun into setTimeout in the adapter. Then find the fake schedule in test/core.test.js. It captures functions rather than waiting. A good test can invoke A first to check error isolation or B first to match the normal browser order; the contract does not depend on a single lucky timing observation.

**Pause and produce evidence:** A fails. Predict the outcome, then compare it with the reference. In your notes, distinguish what the code says should happen from what you actually observed.

## Step 3: Recover from a callback error

Select simulated error and run again. The log contains B and an error for A. Explain why the error does not propagate back into the earlier button handler. Place your cursor at the try/catch inside the scheduled callback and connect that location to the delayed execution trace.

**Pause and produce evidence:** Reset before delivery. Predict the outcome, then compare it with the reference. In your notes, distinguish what the code says should happen from what you actually observed.

## Step 4: Cancel a whole run

Trace stop through its active flag and handles. Reset must call stop before replacing the visible log. The adversarial test deliberately invokes callbacks after stop, stronger evidence than merely observing that a very fast reset happened before a timer fired once. This pattern prepares you for stale search and request responses.

**Pause and produce evidence:** Reset before delivery. Predict the outcome, then compare it with the reference. In your notes, distinguish what the code says should happen from what you actually observed.

## Keep the implementation reviewable

A useful commit has one understandable reason to exist. Separate the initial working slice, the checks that expose its important boundaries, and the teaching material that explains it. The published commits in this repository were assembled from verified working files; they are real commits, not fabricated evidence of a long historical development process. 

For your own variation, commit at a point where the behavior and evidence agree. Describe the trigger, the resulting behavior and the check in the commit message or review note. Avoid mixing a rule change with unrelated formatting because it makes the learning decision harder to see.

## Stop before adding a platform

The next useful improvement is a sharper example or clearer explanation, not a database, account system or framework migration. Add an abstraction only when it names a real repeated responsibility. You should be able to describe what becomes easier to change after the abstraction and what new complexity it introduces.

**Independent design choice from the original brief:** Predict the sequence before executing it.

The reference made one choice, documented in the code tour. You may choose differently in a branch if you first revise the contract and acceptance examples. A deliberate alternative is a stronger learning artifact than an unexplained copy.
