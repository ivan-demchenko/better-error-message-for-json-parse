import { join } from 'path';
import { readFileSync } from 'fs';
import {
  fancySyntaxExceptionMsg,
  findErrCoords
} from '../lib/v8';

describe('V8', () => {

  describe('find error position', () => {

    it('case 1', () => {
      const json = '{\n"name" "abc",\n"model": 13,\n"var":[34]}';

      const expected = {
        l: 1,
        c: 7
      };
      expect(findErrCoords(json.split('\n'), 9)).toEqual(expected);
    });

    it('case 2', () => {
      const json = '{\n"name": "abc",\n"model": 13,\n"var":[34,]}';

      const expected = {
        l: 3,
        c: 10
      };
      expect(findErrCoords(json.split('\n'), 40)).toEqual(expected);
    });

  });

  describe('building message', () => {
    it('case 1', () => {
      const json = readFileSync(join(__dirname, 'fixtures', 'test1.json')).toString();
      const err = new SyntaxError('Unexpected string in JSON at position 118');
      
      const expected = [
        'Unexpected string in JSON at position 118',
        '  "surname": "Rowland"',
        '  "fullname": "Denise Pickett",',
        '-^',
        '  "email": "jack@garrison.vc",'
        ].join('\n');

      // then
      expect(fancySyntaxExceptionMsg(json, err))
        .toEqual(expected);
    });

    it('case 2', () => {
      const json = readFileSync(join(__dirname, 'fixtures', 'test2.json')).toString();
      const err = new SyntaxError('Unexpected string in JSON at position 105');
      
      const expected = [
        'Unexpected string in JSON at position 105',
        '  "name": "Eva",',
        '  "surname" "Rowland",',
        '-----------^',
        '  "fullname": "Denise Pickett",'
        ].join('\n');

      // then
      expect(fancySyntaxExceptionMsg(json, err))
        .toEqual(expected);
    });
  });


});
