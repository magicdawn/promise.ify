/**
 * R = return
 * P = parameter
 */

export default function pify<Args extends unknown[], R>(
  fn: (...args: [...args: Args, cb: (err?: Error, result?: R) => any]) => any,
  context?: any
): (...args: Args) => Promise<R>

export function noerr<Args extends unknown[], R>(
  fn: (...args: [...args: Args, cb: (result?: R) => any]) => any,
  context?: any
): (...args: Args) => Promise<R>
