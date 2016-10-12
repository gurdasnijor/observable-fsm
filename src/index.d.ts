import { Observable } from '@reactivex/rxjs';
export declare type TargetState = {
    name: string;
    data: any;
};
export declare type EventMap = {
    [action: string]: TargetState;
};
export declare type StateMachineMap = {
    [stateKey: string]: EventMap;
};
/**
 * Produces an Observable that represents a sequence of states in a state
 * machine being transisitoned by a corresponding Observable sequence of events
 */
export default function createObservableFSM(definition: StateMachineMap, initialStateKey: string, eventStreamObservable: Observable<string>): Observable<TargetState>;
