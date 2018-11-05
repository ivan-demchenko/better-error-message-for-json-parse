export type Result<F, S> = Failure<F> | Success<S>;

export class Failure<F> {
  constructor(public value: F) {}
}

export class Success<S> {
  constructor(public value: S) {}
  map<T>(fn: (val: S) => T): Success<T> {
    return new Success(fn(this.value));
  }
}

export const failure = <F>(reason: F) => new Failure<F>(reason);

export const success = <S>(value: S) => new Success<S>(value);

export const map = <T, P>(fn: (x: T) => P, r: Result<any, T>): Result<any, P> => {
  if (r instanceof Failure) {
    return r;
  }
  return r.map(fn);
}

export const flatMap = <F, T, P>(fn: (x:T) => Result<F, P>, r: Result<F, T>): Result<F, P> => {
  if (r instanceof Failure) {
    return r;
  }
  return fn(r.value);
}

export const alt = <F1, S1, F2, S2>(r1: Result<F1, S1>, r2: Result<F2, S2>): Result<F1, S1> | Result<F2, S2> => {
  if (r1 instanceof Failure) {
    return r2;
  }
  return r1;
}

export default {
  failure,
  success,
  map,
  flatMap,
  alt
}
