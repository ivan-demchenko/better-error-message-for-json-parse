export const safeJsonParse = <A>(raw: string, reviver?: (key: any, value: any) => any): A => {
  try {
    // So, for Webkit it is a bit trickier as Webkit shows the place in JS file, not in JSON
    return JSON.parse(raw, reviver);
  } catch (e) {
    throw e;
  }
}
