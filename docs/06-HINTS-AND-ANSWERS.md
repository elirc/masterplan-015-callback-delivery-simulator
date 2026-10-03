# Hints and answer directions

[Return to the stories](05-PRACTICE-STORIES.md)

There are intentionally no complete feature patches here. Use one hint, return to your code and produce evidence. Your design can differ from the reference when you state and verify the new contract.

## Story 01: Add delivery C

**Hint 1 — ownership:** Begin from `deliveryRun`. Add a third job with a delay between B and A and extend the predicted trace.

**Hint 2 — reasoning:** Revisit the decision “Inject the scheduler”. Ask yourself: Which part of the test models order, and which part deliberately does not model elapsed time?

**Answer direction:** A defensible solution demonstrates this observable result: All three IDs appear exactly once in the documented order during a normal run. The exact code is not prescribed. If your change achieves that result by changing an unrelated original rule, revise either the implementation or the story contract explicitly.

**Self-review:** Could the UI or helper appear correct while the underlying rule remains wrong? Could the underlying calculation be correct while stale presentation misleads the user? Choose the question that applies and write one distinguishing example.

## Story 02: Show pending count

**Hint 1 — ownership:** Begin from `deliveryRun`. Represent pending job IDs as explicit run data or emitted events; derive a count.

**Hint 2 — reasoning:** Revisit the decision “Guard canceled runs as well as timers”. Ask yourself: Why is one global boolean shared by every run weaker than one closure per run?

**Answer direction:** A defensible solution demonstrates this observable result: Cancel resets the count and a failure still completes one pending job. The exact code is not prescribed. If your change achieves that result by changing an unrelated original rule, revise either the implementation or the story contract explicitly.

**Self-review:** Could the UI or helper appear correct while the underlying rule remains wrong? Could the underlying calculation be correct while stale presentation misleads the user? Choose the question that applies and write one distinguishing example.

## Story 03: Add a pause-before-start explanation

**Hint 1 — ownership:** Begin from `deliveryRun`. Display the learner's selected predicted order before starting and compare after completion.

**Hint 2 — reasoning:** Revisit the decision “Catch failure inside the callback”. Ask yourself: Where must a catch sit to observe an exception thrown later?

**Answer direction:** A defensible solution demonstrates this observable result: The UI distinguishes a prediction from recorded output and does not relabel guesses as evidence. The exact code is not prescribed. If your change achieves that result by changing an unrelated original rule, revise either the implementation or the story contract explicitly.

**Self-review:** Could the UI or helper appear correct while the underlying rule remains wrong? Could the underlying calculation be correct while stale presentation misleads the user? Choose the question that applies and write one distinguishing example.

## Story 04: Retry only A as a new run

**Hint 1 — ownership:** Begin from `deliveryRun`. Define a new bounded retry action that does not duplicate B.

**Hint 2 — reasoning:** Revisit the decision “Inject the scheduler”. Ask yourself: Which part of the test models order, and which part deliberately does not model elapsed time?

**Answer direction:** A defensible solution demonstrates this observable result: A failure followed by retry shows one retry result with a distinct attempt identifier. The exact code is not prescribed. If your change achieves that result by changing an unrelated original rule, revise either the implementation or the story contract explicitly.

**Self-review:** Could the UI or helper appear correct while the underlying rule remains wrong? Could the underlying calculation be correct while stale presentation misleads the user? Choose the question that applies and write one distinguishing example.

## Story 05: Prove old-run isolation

**Hint 1 — ownership:** Begin from `deliveryRun`. Create two fake runs, cancel the first, then invoke both sets of captured callbacks.

**Hint 2 — reasoning:** Revisit the decision “Guard canceled runs as well as timers”. Ask yourself: Why is one global boolean shared by every run weaker than one closure per run?

**Answer direction:** A defensible solution demonstrates this observable result: Only the second run contributes new visible events; reactivation of an old closure fails the test. The exact code is not prescribed. If your change achieves that result by changing an unrelated original rule, revise either the implementation or the story contract explicitly.

**Self-review:** Could the UI or helper appear correct while the underlying rule remains wrong? Could the underlying calculation be correct while stale presentation misleads the user? Choose the question that applies and write one distinguishing example.

## Story 06: Label error and success rows

**Hint 1 — ownership:** Begin from `deliveryRun`. Return structured event objects and render their labels without parsing message strings.

**Hint 2 — reasoning:** Revisit the decision “Catch failure inside the callback”. Ask yourself: Where must a catch sit to observe an exception thrown later?

**Answer direction:** A defensible solution demonstrates this observable result: Error display and counts depend on event fields, while ordering and cancellation remain unchanged. The exact code is not prescribed. If your change achieves that result by changing an unrelated original rule, revise either the implementation or the story contract explicitly.

**Self-review:** Could the UI or helper appear correct while the underlying rule remains wrong? Could the underlying calculation be correct while stale presentation misleads the user? Choose the question that applies and write one distinguishing example.

## Answers to the trace questions

Start click clears old run → deliveryRun emits start → schedules A at 80 ms then B at 20 ms → emits scheduled → synchronous call returns → B callback emits delivery → A callback emits delivery or a caught simulated error.

The expected examples are in the concepts table. Use them to check your reasoning, then supply a new example of your own. A copied sentence is not evidence that you can trace a changed input.

## When to ask for more help

Ask after you can show a concrete attempt, a specific uncertainty and an observation. Request a smaller hint before a full patch. If you do accept generated code, explain each changed line and run a counterexample you chose independently.
