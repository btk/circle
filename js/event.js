var EventEmitter = require('events').EventEmitter;

let _event = null;

export function store() {
  _event = new EventEmitter();
}

export function get() {
  return _event;
}
