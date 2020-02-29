import { withLogger } from './logger/withLogger';

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T

export function compose<A1, A2, A3, A4, R>(
  fn1: (a?: A1, b?: A2, c?: A3, d?: A4) => R,
): (a?: A1, b?: A2, c?: A3, d?: A4) => R;

export function compose<A1, A2, A3, A4>(
  fn1: (context: A1) => A2,
  fn2?: (context: ThenArg<A2>) => A3,
  fn3?: (context: ThenArg<A3>) => A4,
  ...fns: ((context: ThenArg<A4>) => any)[]
): (context?: A1) => any;

export function compose(...funcs: any[]) {
  return async (...args: any[]) => {
    const length = funcs.length;

    let result = await withLogger(funcs[0])(...args);
    for (let i = 1; i < length; i++) {
      result = await withLogger(funcs[i])(result);
    }

    return result;
  }
}
