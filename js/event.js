var EventEmitter = require('events').EventEmitter;

let _event = null;

export function storeEvent() {
  _event = new EventEmitter();
}

export function getEvent() {
  return _event;
}
