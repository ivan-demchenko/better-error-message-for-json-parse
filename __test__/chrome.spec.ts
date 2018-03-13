import { buildMessageForSyntaxException } from '../lib/chrome';

describe('Chrome', () => {

  describe('bulding message', () => {

    it('should show fancy error message', () => {
      // given
      const testJson = '{"some": "json" "that-is": "wrong"}';
      const err = new SyntaxError('Unexpected string in JSON at position 16');

      // expected
      const expected =
        [ 'Unexpected string in JSON at position 16'
        , '{"some": "json" "that-is": "wrong"}'
        , '---------------^'
        ].join('\n');

      // then
      expect(buildMessageForSyntaxException(testJson, err))
        .toEqual(expected);

    });


  });


});
