import { buildErrorFromJsonAndPosition } from './helper';
import { extractPosition } from './extractErrorPosition';

export const showFancySyntaxException = (rawJson: string, e: SyntaxError): string => {
  const context: Array<string> = [ e.message ];
  const lines = rawJson.split('\n');
  const position = extractPosition(lines, e.message);
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
