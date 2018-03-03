/**
 * Reclamo model events
 */

'use strict';

import {EventEmitter} from 'events';
var Reclamo = require('../../sqldb').Reclamo;
var ReclamoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ReclamoEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Reclamo.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ReclamoEvents.emit(event + ':' + doc._id, doc);
    ReclamoEvents.emit(event, doc);
    done(null);
  }
}

export default ReclamoEvents;
