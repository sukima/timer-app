import { module, test } from 'qunit';
import {
  padNumber,
  parseTime,
  parseSeconds,
  joinTimeParts,
} from 'timer-app/utils/parse-time';

module('Unit | Utility | parse-time', function() {

  module('#padNumber', function() {
    test('pads numbers with a leading zero', function(assert) {
      assert.equal(padNumber(0), '00');
      assert.equal(padNumber(1), '01');
      assert.equal(padNumber(2), '02');
      assert.equal(padNumber(3), '03');
      assert.equal(padNumber(4), '04');
      assert.equal(padNumber(5), '05');
      assert.equal(padNumber(6), '06');
      assert.equal(padNumber(7), '07');
      assert.equal(padNumber(8), '08');
      assert.equal(padNumber(9), '09');
      assert.equal(padNumber(10), '10');
    });
  });

  module('#parseTime', function() {
    test('parses colon delimited string into parts', function(assert) {
      assert.deepEqual(parseTime('1:2:3'), [1, 2, 3]);
      assert.deepEqual(parseTime('01:02:03'), [1, 2, 3]);
      assert.deepEqual(parseTime('01:02'), [0, 1, 2]);
      assert.deepEqual(parseTime('01'), [0, 0, 1]);
      assert.deepEqual(parseTime(''), [0, 0, 0]);
    });
  });

  module('#parseSeconds', function() {
    test('parses colon delimited string into seconds', function(assert) {
      assert.equal(parseSeconds('1:2:3'), 3723);
      assert.equal(parseSeconds('01:02:03'), 3723);
      assert.equal(parseSeconds('01:02'), 62);
      assert.equal(parseSeconds('01'), 1);
      assert.equal(parseSeconds(''), 0);
    });
  });

  module('#joinTimeParts', function() {
    test('returns a colon delimited string', function(assert) {
      assert.equal(joinTimeParts(1, 2, 3), '01:02:03');
      assert.equal(joinTimeParts(0, 1, 2), '01:02');
      assert.equal(joinTimeParts(0, 0, 1), '00:01');
      assert.equal(joinTimeParts(undefined, 1, 2), '01:02');
      assert.equal(joinTimeParts(undefined, undefined, 1), '01');
      assert.equal(joinTimeParts(undefined, undefined, undefined), '');
      assert.equal(joinTimeParts(-1, -1, -1), 'auto');
    });
  });

});
