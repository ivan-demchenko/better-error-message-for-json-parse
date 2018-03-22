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
  mkArray(pos + 2).map(() => '-').join('') + '^';


export const positionedLine = (pos: number, lines: string[], fn?: (s: string) => string): string =>
  `${pos + 1}: ${fn ? fn(lines[pos]) : lines[pos]}`;

export const trimLine = (line: string): string =>
  line.length > 80 ? line.substr(0, 77) + '...' : line;

export const buildErrorFromJsonAndPosition = (lines: string[], context: string[], position: ErrorPlace): string => {
  if (lines[position.l - 1]) {
    context.push(positionedLine(position.l - 1, lines));
  }
  context.push(positionedLine(position.l, lines, trimLine));
  context.push(buildErrorPointer(position.c));
  if (lines[position.l + 1]) {
    context.push(positionedLine(position.l + 1, lines));
  }
  return context.join('\n');
}
