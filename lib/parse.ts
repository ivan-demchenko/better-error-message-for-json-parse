import {
  showFancySyntaxException
} from './helper';

export const safeJsonParse = <A>(raw: string, reviver?: (key: any, value: any) => any): A => {
  try {
    return JSON.parse(raw, reviver);
  } catch (e) {
    throw new SyntaxError(showFancySyntaxException(raw, e));
  }
}
