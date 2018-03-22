import { ErrorPlace } from './helper';

export const positionToErrorPlace = (ls: string[], errorPos: number, lineIdx = 0): ErrorPlace => {
  return errorPos > ls[lineIdx].length
    ? positionToErrorPlace(ls, errorPos - ls[lineIdx].length - 1, ++lineIdx)
    : {l: lineIdx, c: errorPos};
}

export const errorPosFromPositionMsg = (lines: string[], msg: string): ErrorPlace | null => {
  const res = /in JSON at position (\d+)/.exec(msg);
  return res ? positionToErrorPlace(lines, parseInt(res[1], 10)) : null;
}

export const errorPosFromLineColumnMsg = (ls: string[], msg: string): ErrorPlace | null => {
  const res = /at line (\d+) column (\d+)/.exec(msg);
  return res
    ? { l: parseInt(res[1], 10) - 1
      , c: parseInt(res[2], 10) - 1
      }
    : null;
  };

export const extractPosition = (lines: string[], msg: string): ErrorPlace | null => {
  const x = errorPosFromLineColumnMsg(lines, msg);
  return x || errorPosFromPositionMsg(lines, msg);
}
