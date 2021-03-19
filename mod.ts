const funcs = {
    더하기(a: number, b: number) {
        return a + b
    },
    말하기(str: string) {
        console.log(str)
    }
}

type Josa = "에" | "를" | "을"

type Tokenizer <T extends string> = 
    T extends `${infer Value} ${infer State}`
        ? [
            Value extends `${infer Word}${Josa}`
                ? Word
                : Value,
            ...Tokenizer<State>
        ]
        : [T]

type FuncInputCount<name extends keyof typeof funcs> =
    Parameters<(typeof funcs)[name]> extends {length: infer L}
        ? L
        : 0

var a: Tokenizer<"1에 2를 더하기를 말하기">
var b: FuncInputCount<"더하기">

type FixedLengthArray<N extends number, T = any> =
    [
        [],
        [T],
        [T, T],
        [T, T, T],
        [T, T, T, T],
        [T, T, T, T, T],
    ][N]
var arr: FixedLengthArray<2>

type Splice <T extends any[], N extends number> = 
    T extends [...FixedLengthArray<N>, ...infer Rest] ? Rest : []

var sp: Splice<[1,2,3], 2>

type Parser <T extends any[]> = 
    T extends [infer A, ...infer B]
        ? A extends 1
            ? [[A, Parser<B>[0]], ...Splice<Parser<B>, 1>]
            : [A, ...Parser<B>]
        : T

var pp: Parser<[1, 1, "a", "b"]>