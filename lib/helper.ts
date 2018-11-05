declare global {
  // Safari
  interface SyntaxError {
    line: number,
    column: number
  }
}

import { errMsgRegExps } from './extractErrorPosition';
import { Success } from './result';

export type ErrorPlace = {l: number, c: number};

export const mkArray = (lim: number): Array<number> =>
  Array.from(Array(lim), (_, i) => i);

export const buildErrorPointer = (pos: number): string =>
  mkArray(pos - 1).map(() => '-').join('') + '^';

export const showFancySyntaxException = (rawJson: string, e: SyntaxError): string => {
  const context: Array<string> = [ e.message ];
  const lines = rawJson.split('\n');
  const position = errMsgRegExps(e.message, lines);
  return position instanceof Success
    ? buildErrorFromJsonAndPosition(lines, context, position.value)
    : e.message;
}

export const buildErrorFromJsonAndPosition = (
  lines: string[],
  context: string[],
  position: ErrorPlace
): string => {
  if (lines[position.l - 1]) {
    context.push(lines[position.l - 1]);
  }
  context.push(lines[position.l]);
  context.push(buildErrorPointer(position.c));
  if (lines[position.l + 1]) {
    context.push(lines[position.l + 1]);
  }
  return context.join('\n');
}
