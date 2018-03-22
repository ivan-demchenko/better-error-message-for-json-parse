import { showFancySyntaxException, safeJsonParse } from '../lib/main';
import { join } from 'path';
import { readFileSync } from 'fs';

describe('build fancy error message', () => {

  it('case 1', () => {
    const json = readFileSync(join(__dirname, 'fixtures', 'test1.json'), { encoding: 'utf8' });

    try {
      JSON.parse(json);
    } catch (err) {
      const msg = showFancySyntaxException(json, err);
      expect(msg).toEqual([
        err.message,
        '  "surname": "Rowland"',
        '  "fullname": "Denise Pickett",',
        '-^',
        '  "email": "jack@garrison.vc",'
      ].join('\n'));
    }

  });

  it('case 2', () => {
    const json = readFileSync(join(__dirname, 'fixtures', 'test2.json'), { encoding: 'utf8' });

    try {
      JSON.parse(json);
    } catch (err) {
      const msg = showFancySyntaxException(json, err);
      expect(msg).toEqual([
        err.message,
        '  "name": "Eva",',
        '  "surname" "Rowland",',
        '-----------^',
        '  "fullname": "Denise Pickett",',
      ].join('\n'));
    }

  });

  it('case 3', () => {
    const json = '{"a": 3, "b": 4 "c": 5, "e": 5}';

    try {
      JSON.parse(json);
    } catch (err) {
      const msg = showFancySyntaxException(json, err);
      expect(msg).toEqual([
        err.message,
        '{"a": 3, "b": 4 "c": 5, "e": 5}',
        '---------------^',
      ].join('\n'));
    }

  });

});

describe('safely parse json', () => {

  it('should work', () => {
    const json = '{"a": 3, "b": 4 "c": 5, "e": 5}';
    const expected = [
      'Unexpected string in JSON at position 16',
      '{"a": 3, "b": 4 "c": 5, "e": 5}',
      '---------------^',
    ].join('\n');

    try {
      safeJsonParse(json);
    } catch (err) {
      expect(err.message).toEqual(expected);
    }
  });

});
