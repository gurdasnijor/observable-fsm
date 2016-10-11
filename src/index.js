import { Observable } from 'rx';

/**
 * Produces an Observable that represents a sequence of states in a state
 * machine being transisitoned by a corresponding Observable sequence of events
 */
export default function (
  definition,
  initialStateKey,
  eventStreamObservable
) {

  let curState = definition[initialStateKey];

  // TODO: validate definition object upfront here

  if (!curState) {
    throw new Error(`No state corresponding to key ${initialStateKey} found`);
  }

  return Observable.create(observer => {
    eventStreamObservable.subscribe(
      (event) => {
        const newStateKey = curState[event];

        observer.onNext(newStateKey);
        curState = definition[newStateKey];
      },
      (err) => observer.onError(err),
      () => observer.onCompleted()
    );
  });
}
