import { mapLatinRus, addNoise, smokeString } from "../smokeString";

describe('test smokeString module', () => {
    describe('test mapLatinRus function', () => {
        it.each([
            ['а', 'a'],
            ['о', 'o'],
            ['с', 'c'],
            ['е', 'e'],
            ['М', 'M'],
            ['Н', 'H'],
        ])('should map from rus (%s) to latin (%s) and vice versa', (rus, latin) => {
            expect(mapLatinRus(latin)).toEqual(rus);
            expect(mapLatinRus(rus)).toEqual(latin);
        });

        it.each(
            ['ф', 'й', 'ъ', 'ю', 'я', 'м']
        )('should not change non-mapping rus letter %s', (rusLetter) => {
            expect(mapLatinRus(rusLetter)).toEqual(rusLetter);
        });

        it.each(
            ['I', 'm', 'h', 'g', 'q', 'L']
        )('should not change non-mapping latin letter %s', (latinLetter) => {
            expect(mapLatinRus(latinLetter)).toEqual(latinLetter);
        });
    });

    describe('test addNoise fucntion', () => {
        it('should use Math.random', () => {
            const mockRandom = jest.spyOn(Math, 'random');
            addNoise('ф');
            expect(mockRandom).toHaveBeenCalled();
        });

        it('should contain origin letter', () => {
            expect(addNoise('ф').indexOf('ф')).not.toEqual(-1);
        });

        it.each(
            ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
        )('should add &zwj; and &zwnj; around letter %s', (letter) => {
            const pattern = "^(&zwj;|&zwnj;){0,2}" + letter + "(&zwj;|&zwnj;){0,2}$";
            expect(addNoise(letter)).toEqual(expect.stringMatching(new RegExp(pattern)));
        });
    });

    describe('test smokeString function', () => {
        it('should apply modifiers to each letter of text content', () => {
            const mockModifier = jest.fn((letter: string) => letter.repeat(2));
            const str = 'test';
            expect(smokeString(str, mockModifier)).toEqual('tteesstt');
            expect(mockModifier).toHaveBeenCalledTimes(str.length);
        });

        it('should skip HTML tags', () => {
            const mockModifier = jest.fn((letter: string) => letter.repeat(2));
            const HTMLStr = '<div>test</div>';
            expect(smokeString(HTMLStr, mockModifier)).toEqual('<div>tteesstt</div>');
        });

        it('should skip HTML characters', () => {
            const mockModifier = jest.fn((letter: string) => letter.repeat(2));
            const HTMLStr = '<div>test&nbsp;test</div>';
            expect(smokeString(HTMLStr, mockModifier)).toEqual('<div>tteesstt&nbsp;tteesstt</div>');
        });

        it('should not modify string if there is no modifiers', () => {
            expect(smokeString('test')).toEqual('test');

            const modifiers = [];
            expect(smokeString('test', ...modifiers)).toEqual('test');
        });

        it('should call modifiers the same to array order', () => {
            let modifiersOrder = '';

            const mockFirstModifier = jest.fn(() => modifiersOrder += '1');
            const mockSecondModifier = jest.fn(() => modifiersOrder += '2');
            const mockThirdModifier = jest.fn(() => modifiersOrder += '3');

            smokeString(' ', mockFirstModifier, mockSecondModifier, mockThirdModifier);

            expect(modifiersOrder).toEqual('123');
        });

        it('should pass return value from modifier to modifier', () => {
            const transitions = [];

            const mockFirstModifier = jest.fn((letter) => {
                transitions.push(letter);
                return letter += '1';
            });
            const mockSecondModifier = jest.fn((letter) => {
                transitions.push(letter);
                return letter += '2';
            });
            const mockThirdModifier = jest.fn((letter) => {
                transitions.push(letter);
                return letter += '3';
            });

            const HTMLStr = "<div>a</div>";

            expect(smokeString(HTMLStr, mockFirstModifier, mockSecondModifier, mockThirdModifier)).toEqual("<div>a123</div>");
            expect(transitions).toEqual(['a', 'a1', 'a12']);
        });
    });
})