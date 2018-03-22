import { buildErrorFromJsonAndPosition } from '../lib/helper';

describe('bulding message', () => {

  it('case 1', () => {
    // given
    const lines = [
      '{',
      '   "a": 4,',
      '   "b": 5,',
      '   "c: 5',
      '}'
    ];
    const err = new SyntaxError('JSON.parse: bad control character in string literal at line 4 column 9 of the JSON data');

    // expected
    const expected =
      [
        err.message,
        '   "b": 5,',
        '   "c: 5',
        '-------^',
        '}'
      ].join('\n');

    // then
    expect(buildErrorFromJsonAndPosition(lines, [err.message], { l: 3, c: 8 }))
      .toEqual(expected);

  });

  it('case 2', () => {
    // given
    const lines = [
      '{"',
      '   "a": 4,',
      '   "b": 5,',
      '   "c": 5',
      '}'
    ];
    const err = new SyntaxError('JSON.parse: bad control character in string literal at line 1 column 3 of the JSON data');

    // expected
    const expected =
      [
        err.message,
        '{"',
        '-^',
        '   "a": 4,'
      ].join('\n');

    // then
    expect(buildErrorFromJsonAndPosition(lines, [err.message], { l: 0, c: 2 }))
      .toEqual(expected);

  });

});
