/**
 * Usuario model events
 */

'use strict';

import {EventEmitter} from 'events';
var Usuario = require('../../sqldb').Usuario;
var UsuarioEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UsuarioEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Usuario.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    UsuarioEvents.emit(event + ':' + doc._id, doc);
    UsuarioEvents.emit(event, doc);
    done(null);
  }
}

export default UsuarioEvents;
