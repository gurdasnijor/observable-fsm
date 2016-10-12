import * as chai from 'chai';
import observableSM from '../src/index.js';
import { Observable } from '@reactivex/rxjs';


chai.expect({});
const expect = chai.expect;


describe('Observable SM', function () {
  describe('when I provide a SM definition and Observable event stream', function () {
    it('should correctly provide terminal state when event stream ends', (done: Function) => {
      const smDefinition = {
        'CLOSED': {
          'open': {
            name: 'OPEN',
            data: {}
          },
          'lock': {
            name: 'LOCKED',
            data: {}
          }
        },
        'OPEN': {
          'close': {
            name: 'CLOSED',
            data: {}
          }
        },
        'LOCKED': {
          'unlock': {
            name: 'CLOSED',
            data: {}
          },
          'break': {
            name: 'BROKEN',
            data: {}
          }
        },
        'BROKEN': {
          'fix': {
            name: 'OPEN',
            data: {}
          }
        }
      };
      const eventStream =
        Observable.from(['open', 'close', 'open']);
      const door$ =
        observableSM(smDefinition, 'CLOSED', eventStream);

      door$.last().subscribe(
        (lastState) => {
          expect(lastState.name).to.equal('OPEN');
          done();
        }
      );
    });
  });
});
