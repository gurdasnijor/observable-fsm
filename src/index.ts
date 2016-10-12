import { Observable, Subscriber } from '@reactivex/rxjs';


type TargetState = {
  name: string,
  data: any
};

type EventMap = {
  [action: string]: TargetState,
};

type StateMachineMap = {
  [stateKey: string]: EventMap
};

/**
 * Produces an Observable that represents a sequence of states in a state
 * machine being transisitoned by a corresponding Observable sequence of events
 */
export default function createObservableFSM(
  definition: StateMachineMap,
  initialStateKey: string,
  eventStreamObservable: Observable<string>
) : Observable<TargetState>{

  let curState = definition[initialStateKey];

  if (!curState) {
    throw new Error(`No state corresponding to key ${initialStateKey} found`);
  }

  return new Observable((observer: Subscriber<TargetState>) => {
    eventStreamObservable.subscribe(
      (event) => {
        const newState = curState[event];
        
        observer.next(newState);
        curState = definition[newState.name];
      },
      (err) => observer.error(err),
      () => observer.complete()
    );
  });
}
