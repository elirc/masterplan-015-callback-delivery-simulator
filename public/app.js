import { deliveryRun } from './core.js';
const output = document.querySelector('#result');
let stop = () => {};
document.querySelector('#start').onclick = () => {
  stop(); output.textContent = '';
  stop = deliveryRun({ schedule: setTimeout, cancel: clearTimeout, failA: document.querySelector('#fail').value === 'yes', emit: line => { output.textContent += line + '\n'; } });
};
document.querySelector('#reset').onclick = () => { stop(); output.textContent = 'Reset. No pending delivery may append to this log.'; };
