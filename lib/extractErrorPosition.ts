import { ErrorPlace } from './helper';
import r, {Result} from './result';

const parseLineColumnMsg = (msg: string): Result<string, string[]> => {
  const result = /at line (\d+) column (\d+)/.exec(msg);
  return (result ? r.success([result[1], result[2]]) : r.failure('Parsing of error message failed'))
}

const extractFromPositionMsg = (msg: string, ls: string[]): Result<string, number> => {
  const result = /Unexpected string in JSON at position (\d+)/.exec(msg);
  return result ? r.success(parseInt(result[1], 10)) : r.failure('Parsing of error message failed');
}

const mapCoordsToErrorPlace = (coords: string[]): Result<string, ErrorPlace> => {
  if (coords.length !== 2) {
    return r.failure('Wrong coordinates');
  }
  return r.success({
    l: parseInt(coords[0], 10) - 1,
    c: parseInt(coords[1], 10) - 1
  });
}

export const findErrCoords = (
  lines: string[],
  errorProximity: number,
  lineIdx = 0
): ErrorPlace => {
  return errorProximity > lines[lineIdx].length
    ? findErrCoords(lines, errorProximity - lines[lineIdx].length - 1, ++lineIdx)
    : {l: lineIdx, c: errorProximity};
}

export const errMsgRegExps = (msg: string, ls: string[]): Result<string, ErrorPlace> =>
  r.alt(
    r.flatMap(mapCoordsToErrorPlace, parseLineColumnMsg(msg)),
    r.map((pos: number) => findErrCoords(ls, pos), extractFromPositionMsg(msg, ls))
  )
