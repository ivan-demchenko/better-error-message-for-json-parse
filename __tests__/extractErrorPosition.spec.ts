import { join } from 'path';
import { readFileSync } from 'fs';
import { extractPosition, errorPosFromLineColumnMsg } from '../lib/extractErrorPosition';

describe('find error position', () => {

  it('should parse position', () => {
    // given
    const err = new SyntaxError('JSON.parse: bad control character in string literal at line 4 column 9 of the JSON data');

    // expected
    const expecetd = {
      l: 3,
      c: 8
    };

    expect(errorPosFromLineColumnMsg([], err.message)).toEqual(expecetd);
  });

  it('case 1', () => {
    const json = readFileSync(join(__dirname, 'fixtures', 'test1.json')).toString();

    try {
      JSON.parse(json)
    } catch(err) {
      expect(extractPosition(json.split('\n'), err.message))
        .toEqual({"c": 2, "l": 7});
    }
  });

  it('case 2', () => {
    const json = readFileSync(join(__dirname, 'fixtures', 'test2.json')).toString();

    try {
      JSON.parse(json)
    } catch(err) {
      expect(extractPosition(json.split('\n'), err.message))
        .toEqual({"c": 12, "l": 6});
    }
  });

});
