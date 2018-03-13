import { mkArray, buildErrorPointer } from './helper';

export const extractErrorPositionFromErrorMsg = (msg: string): number | null => {
  const res = /Unexpected string in JSON at position (\d+)/.exec(msg);
  return res ? parseInt(res[1], 10) : null;
}

export const getErrorPlaceContext = (rawJson: string, position: number): string =>
  rawJson.substring(position - 20, position + 20);

export const buildMessageForSyntaxException = (rawJson: string, e: SyntaxError): string => {
  const context: Array<string> = [];

  const pos = extractErrorPositionFromErrorMsg(e.message);
  if (pos) {
    context.push(getErrorPlaceContext(rawJson, pos));
    context.push(buildErrorPointer(pos));
  }

  return [e.message, context.join('\n')].join('\n');
}

export const safeJsonParse = <A>(raw: string): A => {
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new SyntaxError(buildMessageForSyntaxException(raw, e));
  }
}
