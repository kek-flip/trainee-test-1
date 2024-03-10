export type StringModifier = (str: string) => string

export const LATIN_RUS_MAP = {
    // кириллица -> латиница
    'а': 'a',
    'А': 'A',
    'В': 'B',
    'е': 'e',
    'Е': 'E',
    'ё': 'e',
    'Ё': 'E',
    'К': 'K',
    'М': 'M',
    'Н': 'H',
    'о': 'o',
    'О': 'O',
    'р': 'p',
    'Р': 'P',
    'с': 'c',
    'С': 'C',
    'у': 'y',
    'х': 'x',
    'Х': 'X',

    // латиница -> кириллица
    'a': 'а',
    'A': 'А',
    'B': 'В',
    'c': 'с',
    'C': 'С',
    'e': 'е',
    'E': 'Е',
    'H': 'Н',
    'K': 'К',
    'M': 'М',
    'o': 'о',
    'O': 'О',
    'p': 'р',
    'P': 'Р',
    'x': 'х',
    'X': 'Х',
    'y': 'у',
}

export function mapLatinRus(letter: string): string {
    return LATIN_RUS_MAP[letter] || letter;
}

export const ZWJ = '&zwj;';
export const ZWNJ = '&zwnj;';

export function addNoise(letter: string): string {
    const prefixRand = Math.floor(Math.random() * 1000);
    const postfixRand = Math.floor(Math.random() * 1000);
    return (
        (prefixRand % 2 == 0 ? ZWJ : ZWNJ).repeat(prefixRand % 3)
        + letter +
        (postfixRand % 2 == 0 ? ZWJ : ZWNJ).repeat(postfixRand % 3)
    );
}

function modifyLetter(letter: string, modifiers: StringModifier[]): string {
    for (const mod of modifiers) letter = mod(letter);
    return letter;
}

export function smokeString(HTMLStr: string, ...modifiers: StringModifier[]): string {
    const letters = HTMLStr.split('');
    for (let i = 0; i < letters.length; i++) {
        // Пропуск спецсимволов
        if (letters[i] == '&') {
            while (letters[i] != ';') i++;
            continue;
        }

        // Пропуск тегов
        if (letters[i] == '<') {
            while (letters[i] != '>') i++;
            continue;
        }

        letters[i] = modifyLetter(letters[i], modifiers);
    }
    return letters.join('');
}