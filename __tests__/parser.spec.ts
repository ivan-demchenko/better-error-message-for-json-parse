import { showFancySyntaxException } from '../lib/main';
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

});
