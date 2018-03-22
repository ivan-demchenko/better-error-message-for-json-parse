declare global {
  // Safari
  interface SyntaxError {
    line: number,
    column: number
  }
}

export type ErrorPlace = {l: number, c: number};


export const mkArray = (lim: number): Array<number> =>
  Array.from(Array(lim), function(a, i) { return i; });


export const buildErrorPointer = (pos: number): string =>
  mkArray(pos - 1).map(() => '-').join('') + '^';


export const buildErrorFromJsonAndPosition = (lines: string[], context: string[], position: ErrorPlace): string => {
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
