var expect = require('expect.js'),
    statsock = require('../app');

describe('statsock', function() {
  it('should say hello', function(done) {
    expect(statsock()).to.equal('Hello, world');
    done();
  });
});
