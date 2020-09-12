import {expectType} from 'tsd'
import pify, {noerr} from './'

function getData(a: number, b: string, cb: (err?: Error, data?: string) => void): void {
  cb(null, String(a + b))
  return
}
expectType<(a: number, b: string) => Promise<string>>(pify(getData))

function exists(path: string, cb: (result: boolean) => void): void {
  cb(true)
}
expectType<(path: string) => Promise<boolean>>(noerr(exists))
