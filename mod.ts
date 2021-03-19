type Josa = "에" | "를" | "을"

type Parser <T extends string> = 
    T extends `${infer Value} ${infer State}`
        ? [
            Value extends `${infer Word}${Josa}`
                ? Word
                : Value,
            ...Parser<State>
        ]
        : [T]


var a: Parser<"1에 2를 더하기를 말하기">