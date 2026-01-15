import { describe, expect, it } from 'vitest'

import {
  isArray,
  isBoolean,
  isDate,
  isDefined,
  isError,
  isFalsy,
  isFunction,
  isNaN,
  isNonNull,
  isNull,
  isNullish,
  isNumber,
  isObject,
  isPrimitive,
  isRegExp,
  isString,
  isTruthy,
  isUndefined,
} from '@/guards'

describe('isNumber', () => {
  it('should return true for valid numbers', () => {
    expect(isNumber(0)).toBe(true)
    expect(isNumber(42)).toBe(true)
    expect(isNumber(-42)).toBe(true)
    expect(isNumber(3.14)).toBe(true)
    expect(isNumber(Infinity)).toBe(true)
    expect(isNumber(-Infinity)).toBe(true)
  })

  it('should return false for NaN', () => {
    expect(isNumber(NaN)).toBe(false)
  })

  it('should return false for non-numbers', () => {
    expect(isNumber('42')).toBe(false)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber({})).toBe(false)
    expect(isNumber([])).toBe(false)
    expect(isNumber(true)).toBe(false)
  })
})

describe('isNaN', () => {
  it('should return true for NaN', () => {
    expect(isNaN(NaN)).toBe(true)
    expect(isNaN(Number('invalid'))).toBe(true)
  })

  it('should return false for valid numbers', () => {
    expect(isNaN(0)).toBe(false)
    expect(isNaN(42)).toBe(false)
    expect(isNaN(Infinity)).toBe(false)
  })

  it('should return false for non-numbers', () => {
    expect(isNaN('NaN')).toBe(false)
    expect(isNaN(undefined)).toBe(false)
    expect(isNaN(null)).toBe(false)
  })
})

describe('isString', () => {
  it('should return true for strings', () => {
    expect(isString('')).toBe(true)
    expect(isString('hello')).toBe(true)
    expect(isString('123')).toBe(true)
    expect(isString(String('test'))).toBe(true)
  })

  it('should return false for non-strings', () => {
    expect(isString(123)).toBe(false)
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString([])).toBe(false)
    expect(isString(true)).toBe(false)
  })
})

describe('isBoolean', () => {
  it('should return true for booleans', () => {
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean(Boolean(1))).toBe(true)
  })

  it('should return false for non-booleans', () => {
    expect(isBoolean(1)).toBe(false)
    expect(isBoolean(0)).toBe(false)
    expect(isBoolean('true')).toBe(false)
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean(undefined)).toBe(false)
    expect(isBoolean({})).toBe(false)
  })
})

describe('isFunction', () => {
  it('should return true for functions', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(function () {})).toBe(true)
    expect(isFunction(async () => {})).toBe(true)
    expect(isFunction(function* () {})).toBe(true)
    expect(isFunction(Array.isArray)).toBe(true)
  })

  it('should return false for non-functions', () => {
    expect(isFunction(null)).toBe(false)
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction([])).toBe(false)
    expect(isFunction('function')).toBe(false)
    expect(isFunction(42)).toBe(false)
  })
})

describe('isObject', () => {
  it('should return true for plain objects', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
    expect(isObject(Object.create(null))).toBe(true)
    expect(isObject(new Object())).toBe(true)
  })

  it('should return false for non-plain objects', () => {
    expect(isObject(null)).toBe(false)
    expect(isObject([])).toBe(false)
    expect(isObject(new Date())).toBe(false)
    expect(isObject(/regex/)).toBe(false)
    expect(isObject(new Error())).toBe(false)
    expect(isObject(new Map())).toBe(false)
    expect(isObject(new Set())).toBe(false)
  })

  it('should return false for primitives', () => {
    expect(isObject('string')).toBe(false)
    expect(isObject(42)).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject(undefined)).toBe(false)
    expect(isObject(Symbol('test'))).toBe(false)
  })
})

describe('isArray', () => {
  it('should return true for arrays', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1, 2, 3])).toBe(true)
    expect(isArray([])).toBe(true)
    expect(isArray(Array.from('hello'))).toBe(true)
  })

  it('should return false for non-arrays', () => {
    expect(isArray({})).toBe(false)
    expect(isArray(null)).toBe(false)
    expect(isArray(undefined)).toBe(false)
    expect(isArray('array')).toBe(false)
    expect(isArray({ length: 0 })).toBe(false)
  })
})

describe('isDate', () => {
  it('should return true for valid dates', () => {
    expect(isDate(new Date())).toBe(true)
    expect(isDate(new Date('2024-01-01'))).toBe(true)
    expect(isDate(new Date(0))).toBe(true)
  })

  it('should return false for invalid dates', () => {
    expect(isDate(new Date('invalid'))).toBe(false)
  })

  it('should return false for non-dates', () => {
    expect(isDate('2024-01-01')).toBe(false)
    expect(isDate(1234567890)).toBe(false)
    expect(isDate(null)).toBe(false)
    expect(isDate(undefined)).toBe(false)
    expect(isDate({})).toBe(false)
  })
})

describe('isRegExp', () => {
  it('should return true for RegExp objects', () => {
    expect(isRegExp(/test/)).toBe(true)
    expect(isRegExp(new RegExp('test'))).toBe(true)
    expect(isRegExp(/[a-z]/gi)).toBe(true)
  })

  it('should return false for non-RegExp', () => {
    expect(isRegExp('/test/')).toBe(false)
    expect(isRegExp(null)).toBe(false)
    expect(isRegExp(undefined)).toBe(false)
    expect(isRegExp({})).toBe(false)
  })
})

describe('isError', () => {
  it('should return true for Error objects', () => {
    expect(isError(new Error())).toBe(true)
    expect(isError(new Error('message'))).toBe(true)
    expect(isError(new TypeError())).toBe(true)
    expect(isError(new RangeError())).toBe(true)
  })

  it('should return false for non-Error objects', () => {
    expect(isError({ message: 'error' })).toBe(false)
    expect(isError('Error')).toBe(false)
    expect(isError(null)).toBe(false)
    expect(isError(undefined)).toBe(false)
  })
})

describe('isUndefined', () => {
  it('should return true for undefined', () => {
    expect(isUndefined(undefined)).toBe(true)
    expect(isUndefined(void 0)).toBe(true)
  })

  it('should return false for defined values', () => {
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined(0)).toBe(false)
    expect(isUndefined('')).toBe(false)
    expect(isUndefined(false)).toBe(false)
    expect(isUndefined({})).toBe(false)
  })
})

describe('isDefined', () => {
  it('should return true for defined values', () => {
    expect(isDefined(null)).toBe(true)
    expect(isDefined(0)).toBe(true)
    expect(isDefined('')).toBe(true)
    expect(isDefined(false)).toBe(true)
    expect(isDefined({})).toBe(true)
    expect(isDefined([])).toBe(true)
  })

  it('should return false for undefined', () => {
    expect(isDefined(undefined)).toBe(false)
  })

  it('should filter undefined values correctly', () => {
    const values: (string | undefined)[] = ['a', undefined, 'b', undefined, 'c']
    const filtered = values.filter(isDefined)
    expect(filtered).toEqual(['a', 'b', 'c'])
  })
})

describe('isNull', () => {
  it('should return true for null', () => {
    expect(isNull(null)).toBe(true)
  })

  it('should return false for non-null values', () => {
    expect(isNull(undefined)).toBe(false)
    expect(isNull(0)).toBe(false)
    expect(isNull('')).toBe(false)
    expect(isNull(false)).toBe(false)
    expect(isNull({})).toBe(false)
  })
})

describe('isNonNull', () => {
  it('should return true for non-null values', () => {
    expect(isNonNull(undefined)).toBe(true)
    expect(isNonNull(0)).toBe(true)
    expect(isNonNull('')).toBe(true)
    expect(isNonNull(false)).toBe(true)
    expect(isNonNull({})).toBe(true)
  })

  it('should return false for null', () => {
    expect(isNonNull(null)).toBe(false)
  })

  it('should filter null values correctly', () => {
    const values: (string | null)[] = ['a', null, 'b', null, 'c']
    const filtered = values.filter(isNonNull)
    expect(filtered).toEqual(['a', 'b', 'c'])
  })
})

describe('isTruthy', () => {
  it('should return true for truthy values', () => {
    expect(isTruthy(true)).toBe(true)
    expect(isTruthy(1)).toBe(true)
    expect(isTruthy('hello')).toBe(true)
    expect(isTruthy({})).toBe(true)
    expect(isTruthy([])).toBe(true)
    expect(isTruthy(42)).toBe(true)
    expect(isTruthy('0')).toBe(true)
    expect(isTruthy(Infinity)).toBe(true)
  })

  it('should return false for falsy values', () => {
    expect(isTruthy(false)).toBe(false)
    expect(isTruthy(0)).toBe(false)
    expect(isTruthy('')).toBe(false)
    expect(isTruthy(null)).toBe(false)
    expect(isTruthy(undefined)).toBe(false)
    expect(isTruthy(NaN)).toBe(false)
    expect(isTruthy(0n)).toBe(false)
  })

  it('should filter falsy values correctly', () => {
    const values = ['a', '', 'b', 0, 'c', null, undefined]
    const filtered = values.filter(isTruthy)
    expect(filtered).toEqual(['a', 'b', 'c'])
  })
})

describe('isFalsy', () => {
  it('should return true for falsy values', () => {
    expect(isFalsy(false)).toBe(true)
    expect(isFalsy(0)).toBe(true)
    expect(isFalsy('')).toBe(true)
    expect(isFalsy(null)).toBe(true)
    expect(isFalsy(undefined)).toBe(true)
    expect(isFalsy(NaN)).toBe(true)
    expect(isFalsy(0n)).toBe(true)
  })

  it('should return false for truthy values', () => {
    expect(isFalsy(true)).toBe(false)
    expect(isFalsy(1)).toBe(false)
    expect(isFalsy('hello')).toBe(false)
    expect(isFalsy({})).toBe(false)
    expect(isFalsy([])).toBe(false)
    expect(isFalsy(42)).toBe(false)
  })
})

describe('isNullish', () => {
  it('should return true for nullish values', () => {
    expect(isNullish(null)).toBe(true)
    expect(isNullish(undefined)).toBe(true)
  })

  it('should return false for non-nullish values', () => {
    expect(isNullish(0)).toBe(false)
    expect(isNullish('')).toBe(false)
    expect(isNullish(false)).toBe(false)
    expect(isNullish(NaN)).toBe(false)
    expect(isNullish({})).toBe(false)
    expect(isNullish([])).toBe(false)
  })

  it('should filter nullish values correctly', () => {
    const values = ['a', null, 'b', undefined, 'c']
    const filtered = values.filter((val) => !isNullish(val))
    expect(filtered).toEqual(['a', 'b', 'c'])
  })
})

describe('isPrimitive', () => {
  it('should return true for primitive values', () => {
    expect(isPrimitive(null)).toBe(true)
    expect(isPrimitive(undefined)).toBe(true)
    expect(isPrimitive(true)).toBe(true)
    expect(isPrimitive(false)).toBe(true)
    expect(isPrimitive(42)).toBe(true)
    expect(isPrimitive('string')).toBe(true)
    expect(isPrimitive(Symbol('test'))).toBe(true)
    expect(isPrimitive(BigInt(9007199254740991))).toBe(true)
  })

  it('should return false for non-primitive values', () => {
    expect(isPrimitive({})).toBe(false)
    expect(isPrimitive([])).toBe(false)
    expect(isPrimitive(new Date())).toBe(false)
    expect(isPrimitive(/regex/)).toBe(false)
    expect(isPrimitive(() => {})).toBe(false)
    expect(isPrimitive(new Error())).toBe(false)
    expect(isPrimitive(new Map())).toBe(false)
  })

  it('should work with recursive example from documentation', () => {
    const consumer = (value: string | string[]): void => {
      if (isPrimitive(value)) {
        // value is string
        expect(typeof value).toBe('string')
        return
      }
      // value is string[]
      expect(Array.isArray(value)).toBe(true)
      value.forEach((item) => consumer(item))
    }

    consumer('test')
    consumer(['a', 'b', 'c'])
  })
})
