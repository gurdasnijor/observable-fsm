"use strict";
var chai = require('chai');
var index_js_1 = require('../src/index.js');
var rxjs_1 = require('@reactivex/rxjs');
chai.expect({});
var expect = chai.expect;
describe('Observable SM', function () {
    describe('when I provide a SM definition and Observable event stream', function () {
        it('should correctly provide terminal state when event stream ends', function (done) {
            var smDefinition = {
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
            var eventStream = rxjs_1.Observable.from(['open', 'close', 'open']);
            var door$ = index_js_1["default"](smDefinition, 'CLOSED', eventStream);
            door$.last().subscribe(function (lastState) {
                expect(lastState.name).to.equal('OPEN');
                done();
            });
        });
    });
});
