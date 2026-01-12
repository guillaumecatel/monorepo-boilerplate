import { describe, expectTypeOf, it } from 'vitest'

import type { Falsy, Maybe, Nullable, Nullish, Primitive } from '@/alias'

describe('Type Tests - Nullable', () => {
  it('should add null to the type', () => {
    type Result = Nullable<string>
    expectTypeOf<Result>().toEqualTypeOf<string | null>()
  })

  it('should work with union types', () => {
    type Result = Nullable<string | number>
    expectTypeOf<Result>().toEqualTypeOf<string | number | null>()
  })

  it('should work with complex types', () => {
    type Result = Nullable<{ name: string; age: number }>
    expectTypeOf<Result>().toEqualTypeOf<{ name: string; age: number } | null>()
  })

  it('should be assignable from null', () => {
    type Result = Nullable<string>
    expectTypeOf<null>().toExtend<Result>()
  })

  it('should be assignable from the original type', () => {
    type Result = Nullable<string>
    expectTypeOf<string>().toExtend<Result>()
  })
})

describe('Type Tests - Maybe', () => {
  it('should add undefined to the type', () => {
    type Result = Maybe<string>
    expectTypeOf<Result>().toEqualTypeOf<string | undefined>()
  })

  it('should work with union types', () => {
    type Result = Maybe<string | number>
    expectTypeOf<Result>().toEqualTypeOf<string | number | undefined>()
  })

  it('should work with complex types', () => {
    type Result = Maybe<{ name: string; age: number }>
    expectTypeOf<Result>().toEqualTypeOf<
      { name: string; age: number } | undefined
    >()
  })

  it('should be assignable from undefined', () => {
    type Result = Maybe<string>
    expectTypeOf<undefined>().toExtend<Result>()
  })

  it('should be assignable from the original type', () => {
    type Result = Maybe<string>
    expectTypeOf<string>().toExtend<Result>()
  })
})

describe('Type Tests - Falsy', () => {
  it('should include all falsy values', () => {
    expectTypeOf<false>().toExtend<Falsy>()
    expectTypeOf<''>().toExtend<Falsy>()
    expectTypeOf<0>().toExtend<Falsy>()
    expectTypeOf<null>().toExtend<Falsy>()
    expectTypeOf<undefined>().toExtend<Falsy>()
  })

  it('should exclude truthy values', () => {
    expectTypeOf<true>().not.toMatchObjectType<Falsy>()
    expectTypeOf<'hello'>().not.toMatchObjectType<Falsy>()
    expectTypeOf<1>().not.toMatchObjectType<Falsy>()
    expectTypeOf<object>().not.toMatchObjectType<Falsy>()
    expectTypeOf<[]>().not.toMatchObjectType<Falsy>()
  })

  it('should work with Exclude as shown in documentation', () => {
    type Various = 'a' | 'b' | undefined | false
    type Cleaned = Exclude<Various, Falsy>

    expectTypeOf<Cleaned>().toEqualTypeOf<'a' | 'b'>()
  })

  it('should filter out falsy types from unions', () => {
    type Mixed = string | null | undefined | false | 0
    type OnlyTruthy = Exclude<Mixed, Falsy>

    expectTypeOf<OnlyTruthy>().toEqualTypeOf<string>()
  })
})

describe('Type Tests - Primitive', () => {
  it('should include all primitive types', () => {
    expectTypeOf<string>().toExtend<Primitive>()
    expectTypeOf<number>().toExtend<Primitive>()
    expectTypeOf<bigint>().toExtend<Primitive>()
    expectTypeOf<boolean>().toExtend<Primitive>()
    expectTypeOf<symbol>().toExtend<Primitive>()
    expectTypeOf<null>().toExtend<Primitive>()
    expectTypeOf<undefined>().toExtend<Primitive>()
  })

  it('should exclude non-primitive types', () => {
    expectTypeOf<object>().not.toMatchObjectType<Primitive>()
    expectTypeOf<[]>().not.toMatchObjectType<Primitive>()
    expectTypeOf<() => void>().not.toMatchObjectType<Primitive>()
    expectTypeOf<Date>().not.toMatchObjectType<Primitive>()
    expectTypeOf<RegExp>().not.toMatchObjectType<Primitive>()
  })

  it('should work with Exclude as shown in documentation', () => {
    type Various = number | string | object
    type Cleaned = Exclude<Various, Primitive>

    expectTypeOf<Cleaned>().toEqualTypeOf<object>()
  })

  it('should filter complex objects from unions', () => {
    type Mixed = string | number | { name: string } | Date
    type OnlyPrimitive = Extract<Mixed, Primitive>

    expectTypeOf<OnlyPrimitive>().toEqualTypeOf<string | number>()
  })
})

describe('Type Tests - Nullish', () => {
  it('should include null and undefined', () => {
    expectTypeOf<null>().toExtend<Nullish>()
    expectTypeOf<undefined>().toExtend<Nullish>()
  })

  it('should be exactly null | undefined', () => {
    expectTypeOf<Nullish>().toEqualTypeOf<null | undefined>()
  })

  it('should exclude other falsy values', () => {
    expectTypeOf<false>().not.toMatchObjectType<Nullish>()
    expectTypeOf<0>().not.toMatchObjectType<Nullish>()
    expectTypeOf<''>().not.toMatchObjectType<Nullish>()
  })

  it('should work with Exclude as shown in documentation', () => {
    type Various = 'a' | 'b' | undefined
    type Cleaned = Exclude<Various, Nullish>

    expectTypeOf<Cleaned>().toEqualTypeOf<'a' | 'b'>()
  })

  it('should filter nullish values from unions', () => {
    type Mixed = string | null | undefined | number
    type NonNullish = Exclude<Mixed, Nullish>

    expectTypeOf<NonNullish>().toEqualTypeOf<string | number>()
  })

  it('should work with nullish coalescing operator types', () => {
    type Result = string | Nullish
    const value: Result = 'test'

    expectTypeOf(value).toExtend<string | null | undefined>()
  })
})

describe('Type Tests - Combined Usage', () => {
  it('should combine Nullable and Maybe', () => {
    type Result = Nullable<Maybe<string>>
    expectTypeOf<Result>().toEqualTypeOf<string | undefined | null>()
  })

  it('should work with function return types', () => {
    function getValue(): Maybe<string> {
      return Math.random() > 0.5 ? 'value' : undefined
    }

    expectTypeOf(getValue).returns.toEqualTypeOf<string | undefined>()
  })

  it('should work with arrays', () => {
    type Result = Nullable<string[]>
    expectTypeOf<Result>().toEqualTypeOf<string[] | null>()
  })

  it('should work with nested types', () => {
    type User = {
      name: string
      email: Maybe<string>
      phone: Nullable<string>
    }

    expectTypeOf<User>().toEqualTypeOf<{
      name: string
      email: string | undefined
      phone: string | null
    }>()
  })

  it('should filter complex type unions', () => {
    type Complex = string | number | null | undefined | { id: number } | false
    type OnlyObjects = Exclude<Complex, Primitive>

    expectTypeOf<OnlyObjects>().toEqualTypeOf<{ id: number }>()
  })
})
