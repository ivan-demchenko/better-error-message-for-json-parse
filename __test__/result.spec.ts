import { join } from 'path';
import { readFileSync } from 'fs';
import { showFancySyntaxException } from '../lib/helper';

const readFixture = (fixtureName: string): string =>
  readFileSync(join(__dirname, 'fixtures', fixtureName)).toString();

describe('building message', () => {
  it('case 1', () => {
    const json = readFixture('test1.json');
    const err = new SyntaxError('Unexpected string in JSON at position 118');

    const expected = [
      'Unexpected string in JSON at position 118',
      '  "surname": "Rowland"',
      '  "fullname": "Denise Pickett",',
      '-^',
      '  "email": "jack@garrison.vc",'
      ].join('\n');

    // then
    const result = showFancySyntaxException(json, err)
    expect(result).toEqual(expected);
    expect(result).toMatchSnapshot();
  });

  it('case 2', () => {
    const json = readFixture('test2.json');
    const err = new SyntaxError('Unexpected string in JSON at position 105');
    
    const expected = [
      'Unexpected string in JSON at position 105',
      '  "name": "Eva",',
      '  "surname" "Rowland",',
      '-----------^',
      '  "fullname": "Denise Pickett",'
      ].join('\n');

    // then
    const result = showFancySyntaxException(json, err);
    expect(result).toEqual(expected);
    expect(result).toMatchSnapshot();
  });

  it('case 3', () => {
    // given
    const testJson = readFixture('test3.json');
    const err = new SyntaxError('JSON.parse: bad control character in string literal at line 4 column 9 of the JSON data');

    // expected
    const expected =
      [
        'JSON.parse: bad control character in string literal at line 4 column 9 of the JSON data',
        '  "b": 5,',
        '  "c: 5',
        '-------^',
        '}'
      ].join('\n');

    // then
    const result = showFancySyntaxException(testJson, err);
    expect(result).toEqual(expected);
    expect(result).toMatchSnapshot();

  });

  it('case 4', () => {
    // given
    const testJson = readFixture('test4.json');
    const err = new SyntaxError('JSON.parse: bad control character in string literal at line 1 column 3 of the JSON data');

    // expected
    const expected =
      [
        'JSON.parse: bad control character in string literal at line 1 column 3 of the JSON data',
        '{"',
        '-^',
        '  "a": 4,'
      ].join('\n');

    // then
    const result = showFancySyntaxException(testJson, err);
    expect(result).toEqual(expected);
    expect(result).toMatchSnapshot();

  });
});
