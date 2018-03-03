/**
 * Ue model events
 */

'use strict';

import {EventEmitter} from 'events';
var Ue = require('../../sqldb').Ue;
var UeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UeEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Ue.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    UeEvents.emit(event + ':' + doc._id, doc);
    UeEvents.emit(event, doc);
    done(null);
  }
}

export default UeEvents;
