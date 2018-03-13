import {
  OptErrorPlace,
  buildErrorFromJsonAndPosition
} from './helper';

export const extractErrorPositionFromErrorMsg = (msg: string): OptErrorPlace => {
  const res = /at line (\d+) column (\d+)/.exec(msg);
  return res
    ? {
        l: parseInt(res[1], 10) - 1,
        c: parseInt(res[2], 10) - 1
      }
    : null;
}

export const showFancySyntaxException = (rawJson: string, e: SyntaxError): string => {
  const context: Array<string> = [ e.message ];
  const lines = rawJson.split('\n');
  const position = extractErrorPositionFromErrorMsg(e.message);
  return position
    ? buildErrorFromJsonAndPosition(lines, context, position)
    : e.message;
}

export const safeJsonParse = <A>(raw: string, reviver?: (key: any, value: any) => any): A => {
  try {
    return JSON.parse(raw, reviver);
  } catch (e) {
    throw new SyntaxError(showFancySyntaxException(raw, e));
  }
}
