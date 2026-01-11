import type { Falsy, Nullish, Primitive } from './alias'

/**
 * Tests if a value is a valid number (excludes NaN).
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is a number and not NaN
 *
 * @example
 *   if (isNumber(value)) {
 *     // typeof value === number (excluding NaN)
 *     console.log(value.toFixed(2))
 *   }
 */
export const isNumber = (val: unknown): val is number =>
  typeof val === 'number' && !Number.isNaN(val)

/**
 * Tests if a value is NaN (Not-a-Number).
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is NaN
 *
 * @example
 *   if (isNaN(value)) {
 *     console.log('Invalid number operation')
 *   }
 */
export const isNaN = (val: unknown): val is number =>
  typeof val === 'number' && Number.isNaN(val)

/**
 * Tests if a value is a string primitive.
 *
 * Note: This only checks for string primitives, not String objects created with `new String()`.
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is a string primitive
 *
 * @example
 *   if (isString(value)) {
 *     // typeof value === string
 *     console.log(value.toUpperCase())
 *   }
 */
export const isString = (val: unknown): val is string => typeof val === 'string'

/**
 * Tests if a value is a boolean primitive.
 *
 * Note: This only checks for boolean primitives, not Boolean objects created with `new Boolean()`.
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is a boolean primitive
 *
 * @example
 *   if (isBoolean(value)) {
 *     // typeof value === boolean
 *     console.log(value ? 'true' : 'false')
 *   }
 */
export const isBoolean = (val: unknown): val is boolean =>
  typeof val === 'boolean'

/**
 * Tests if a value is a function.
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is a function
 *
 * @example
 *   if (isFunction(value)) {
 *     // value is callable
 *     value()
 *   }
 */
export const isFunction = (
  val: unknown,
): val is (...args: unknown[]) => unknown => typeof val === 'function'

/**
 * Tests if a value is a plain object (excludes arrays, null, and other special objects like Date, RegExp, etc.).
 *
 * This function uses a strict check and only returns `true` for plain objects created with `{}` or `new Object()`.
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is a plain object
 *
 * @example
 *   if (isObject(value)) {
 *     // typeof value === object (plain object only)
 *     console.log(value.someProperty)
 *   }
 */
export const isObject = (val: unknown): val is Record<string, unknown> => {
  if (val === null || typeof val !== 'object' || Array.isArray(val)) {
    return false
  }
  // Check if it's a plain object (created with {} or new Object())
  const proto = Object.getPrototypeOf(val)
  return proto === Object.prototype || proto === null
}

/**
 * Tests if a value is an array.
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is an array
 *
 * @example
 *   if (isArray(value)) {
 *     // value is an array
 *     value.map(item => console.log(item))
 *   }
 */
export const isArray = (val: unknown): val is Array<unknown> =>
  Array.isArray(val)

/**
 * Tests if a value is a Date object with a valid date.
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is a valid Date instance
 *
 * @example
 *   if (isDate(value)) {
 *     // value is a valid Date
 *     console.log(value.toISOString())
 *   }
 */
export const isDate = (val: unknown): val is Date =>
  val instanceof Date && !Number.isNaN(val.getTime())

/**
 * Tests if a value is a RegExp object.
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is a RegExp instance
 *
 * @example
 *   if (isRegExp(value)) {
 *     // value is a RegExp
 *     console.log(value.test('some string'))
 *   }
 */
export const isRegExp = (val: unknown): val is RegExp => val instanceof RegExp

/**
 * Tests if a value is an Error object.
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is an Error instance
 *
 * @example
 *   if (isError(value)) {
 *     // value is an Error
 *     console.error(value.message)
 *   }
 */
export const isError = (val: unknown): val is Error => val instanceof Error

/**
 * Tests if a value is undefined.
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is undefined
 *
 * @example
 *   if (isUndefined(value)) {
 *     // value is undefined
 *     console.log('Value is not defined')
 *   }
 */
export const isUndefined = (val: unknown): val is undefined =>
  typeof val === 'undefined'

/**
 * Tests if a value is defined (not undefined).
 *
 * Useful for filtering out undefined values while preserving type information.
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is not undefined
 *
 * @example
 *   const values: (string | undefined)[] = ['a', undefined, 'b']
 *   const defined = values.filter(isDefined)
 *   // typeof defined === string[]
 */
export const isDefined = <T>(val: T | undefined): val is T =>
  typeof val !== 'undefined'

/**
 * Tests if a value is null.
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is null
 *
 * @example
 *   if (isNull(value)) {
 *     // value is null
 *     console.log('Value is null')
 *   }
 */
export const isNull = (val: unknown): val is null => val === null

/**
 * Tests if a value is not null.
 *
 * Useful for filtering out null values while preserving type information.
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is not null
 *
 * @example
 *   const values: (string | null)[] = ['a', null, 'b']
 *   const nonNull = values.filter(isNonNull)
 *   // typeof nonNull === string[]
 */
export const isNonNull = <T>(val: T | null): val is T => val !== null

/**
 * Tests if a value is truthy.
 *
 * A value is truthy if it coerces to `true` in a boolean context.
 * This excludes: false, 0, -0, 0n, "", null, undefined, and NaN.
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is truthy
 *
 * @example
 *   const values: (string | Falsy)[] = ['hello', '', 'world', 0]
 *   const truthy = values.filter(isTruthy)
 *   // typeof truthy === string[]
 */
export const isTruthy = <T>(val: T | Falsy): val is T => Boolean(val)

/**
 * Tests for Falsy by simply applying negation `!` to the tested `val`.
 *
 * The value is mostly in added type-information and explicity,
 * but in case of this simple type much the same can often be archived by just using negation `!`.
 *
 * Falsy values are: false, 0, -0, 0n, "", null, undefined, and NaN.
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is falsy
 *
 * @example
 *   const consumer = (value: boolean | Falsy) => {
 *     if (isFalsy(value)) {
 *       return
 *     }
 *     // typeof value === true
 *     // do stuff
 *   }
 */
export const isFalsy = (val: unknown): val is Falsy => !val

/**
 * Tests for Nullish by simply comparing `val` for equality with `null`.
 *
 * A value is nullish if it is either `null` or `undefined`.
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is null or undefined
 *
 * @example
 *   const consumer = (param: Nullish | string): string => {
 *     if (isNullish(param)) {
 *       // typeof param === Nullish (null | undefined)
 *       return String(param) + ' was Nullish'
 *     }
 *     // typeof param === string
 *     return param.toString()
 *   }
 */
export const isNullish = (val: unknown): val is Nullish => val == null

/**
 * Tests for one of the [Primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) types
 * using the JavaScript [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) operator.
 *
 * Primitive types in JavaScript are: string, number, bigint, boolean, symbol, undefined, and null.
 *
 * Clarification: TypeScript overloads this operator to produce TypeScript types if used in context of types.
 *
 * @param val - The value to be tested
 * @returns `true` if `val` is a primitive value
 *
 * @example
 *   const consumer = (value: Primitive | Primitive[]) => {
 *     if (isPrimitive(value)) {
 *       return console.log('Primitive value: ', value)
 *     }
 *     // typeof value === Primitive[]
 *     value.map((primitive) => consumer(primitive))
 *   }
 */
export const isPrimitive = (val: unknown): val is Primitive => {
  if (val === null || val === undefined) return true
  const type = typeof val
  return (
    type === 'string' ||
    type === 'number' ||
    type === 'bigint' ||
    type === 'boolean' ||
    type === 'symbol'
  )
}
