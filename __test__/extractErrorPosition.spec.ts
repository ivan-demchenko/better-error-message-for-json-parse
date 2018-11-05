import { findErrCoords } from "../lib/extractErrorPosition";

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
