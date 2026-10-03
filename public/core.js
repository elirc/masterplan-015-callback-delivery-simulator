// Inject timing so unit tests can deliver callbacks in a chosen order.
export function deliveryRun({ schedule, cancel, emit, failA = false }) {
  let active = true;
  const handles = [];
  emit('start');
  for (const job of [{ id: 'A', delay: 80 }, { id: 'B', delay: 20 }]) {
    handles.push(schedule(() => {
      if (!active) return;
      try {
        if (job.id === 'A' && failA) throw new Error('simulated failure');
        emit(`delivered ${job.id}`);
      } catch (error) { emit(`error ${job.id}: ${error.message}`); }
    }, job.delay));
  }
  emit('scheduled');
  return () => { active = false; handles.forEach(cancel); };
}
