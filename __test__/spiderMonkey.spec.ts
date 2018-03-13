import { extractErrorPositionFromErrorMsg, showFancySyntaxException } from '../lib/spiderMonkey';

describe('spiderMonkey', () => {

  describe('bulding message', () => {

    it('should parse position', () => {
      // given
      const err = new SyntaxError('JSON.parse: bad control character in string literal at line 4 column 9 of the JSON data');

      // expected
      const expecetd = {
        l: 3,
        c: 8
      };

      expect(extractErrorPositionFromErrorMsg(err.message)).toEqual(expecetd);
    });

    describe('build up error message', () => {

      it('case 1', () => {
        // given
        const testJson = [
          '{',
          '   "a": 4,',
          '   "b": 5,',
          '   "c: 5',
          '}'
        ].join('\n');
        const err = new SyntaxError('JSON.parse: bad control character in string literal at line 4 column 9 of the JSON data');

        // expected
        const expected =
          [
            'JSON.parse: bad control character in string literal at line 4 column 9 of the JSON data',
            '   "b": 5,',
            '   "c: 5',
            '-------^',
            '}'
          ].join('\n');

        // then
        expect(showFancySyntaxException(testJson, err))
          .toEqual(expected);

      });

      it('case 2', () => {
        // given
        const testJson = [
          '{"',
          '   "a": 4,',
          '   "b": 5,',
          '   "c": 5',
          '}'
        ].join('\n');
        const err = new SyntaxError('JSON.parse: bad control character in string literal at line 1 column 3 of the JSON data');

        // expected
        const expected =
          [
            'JSON.parse: bad control character in string literal at line 1 column 3 of the JSON data',
            '{"',
            '-^',
            '   "a": 4,'
          ].join('\n');

        // then
        expect(showFancySyntaxException(testJson, err))
          .toEqual(expected);

      });

    });


  });


});
