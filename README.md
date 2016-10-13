
# observable-fsm

Library for producing an Observable that represents a sequence of states in 
a state machine being transisitoned by a corresponding Observable sequence of events

Inspired by [rx-state-machine](https://github.com/logicalguess/rx-state-machine/blob/master/js/state-machine.js)

![FSM](https://www.thepastafoundation.org/wp-content/uploads/2015/06/FSM-icon.gif)


```js
const stateMachineDefinition = {
  'CLOSED': {
    'open': 'OPEN',
    'lock': 'LOCKED'
  },
  'OPEN': {
    'close': 'CLOSED'
  },
  'LOCKED': {
    'unlock': 'CLOSED',
    'break': 'BROKEN'
  },
  'BROKEN': {
    'fix': 'OPEN'
   }
};
const eventStream =
  Observable.from(['open', 'close', 'lock']);

const doorObs$ =
  observableSM(stateMachineDefinition, 'CLOSED', eventStream);


doorObs$.subscribe(
  state => console.log(state)
);
// => 'OPEN'
// => 'CLOSED'
// => 'LOCKED'

```
