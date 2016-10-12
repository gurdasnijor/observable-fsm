"use strict";
var rxjs_1 = require('@reactivex/rxjs');
/**
 * Produces an Observable that represents a sequence of states in a state
 * machine being transisitoned by a corresponding Observable sequence of events
 */
function createObservableFSM(definition, initialStateKey, eventStreamObservable) {
    var curState = definition[initialStateKey];
    if (!curState) {
        throw new Error("No state corresponding to key " + initialStateKey + " found");
    }
    return new rxjs_1.Observable(function (observer) {
        eventStreamObservable.subscribe(function (event) {
            var newState = curState[event];
            observer.next(newState);
            curState = definition[newState.name];
        }, function (err) { return observer.error(err); }, function () { return observer.complete(); });
    });
}
exports.__esModule = true;
exports["default"] = createObservableFSM;
