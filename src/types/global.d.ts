declare type Nullable<T> = T | null
declare type Arrayable<T> = T | T[]
declare type Awaitable<T> = Promise<T> | T
declare type Recordable<T = any> = Record<string, T>

declare type MaybePromise<T = any> = Promise<T> | T