import chai from 'chai';
import observableSM from '../src/index.js';
import { Observable } from 'rx';

chai.expect();
const expect = chai.expect;


describe('Observable SM', function () {
  describe('when I provide a SM definition and Observable event stream', function () {
    it('should correctly provide terminal state when event stream ends', (done) => {
      const smDefinition = {
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
        Observable.from(['open', 'close', 'open']);
      const door$ =
        observableSM(smDefinition, 'CLOSED', eventStream);

      door$.last().subscribe(
        (lastState) => {
          expect(lastState).to.equal('OPEN');
          done();
        }
      );
    });
  });
});
