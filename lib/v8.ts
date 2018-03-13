import {
  ErrorPlace,
  buildErrorFromJsonAndPosition
} from './helper';

export const extractErrorPositionFromErrorMsg = (msg: string): number | null => {
  const res = /Unexpected string in JSON at position (\d+)/.exec(msg);
  return res ? parseInt(res[1], 10) : null;
}

export const findErrCoords = (ls: string[], errorProximity: number, lineIdx = 0): ErrorPlace => {
  return errorProximity > ls[lineIdx].length
    ? findErrCoords(ls, errorProximity - ls[lineIdx].length - 1, ++lineIdx)
    : {l: lineIdx, c: errorProximity};
}

export const showFancySyntaxException = (rawJson: string, e: SyntaxError): string => {
  const context: Array<string> = [ e.message ];
  const lines = rawJson.split('\n');
  const absPos = extractErrorPositionFromErrorMsg(e.message);
  if (absPos) {
    const errCoords = findErrCoords(lines, absPos);
    return buildErrorFromJsonAndPosition(lines, context, errCoords);
  }
  return e.message;
}

export const safeJsonParse = <A>(raw: string, reviver?: (key: any, value: any) => any): A => {
  try {
    return JSON.parse(raw, reviver);
  } catch (e) {
    throw new SyntaxError(showFancySyntaxException(raw, e));
  }
}
