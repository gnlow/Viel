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