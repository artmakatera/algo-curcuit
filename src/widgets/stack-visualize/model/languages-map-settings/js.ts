import { LANGUAGES, STEPS } from "../constants";





const code = `class Stack<T> {
    items: T[];
    constructor() {
        this.items = [];
    }

    push(element: T) {
        this.items.push(element);
    }

    pop() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.pop();
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }
}`




export const highlightLines: { [key in STEPS]?: number[] } = {
    [STEPS.push]: [7, 8, 9],
    [STEPS.pop]:[11, 12, 13, 14, 15, 16],
    [STEPS.peek]:[18, 19, 20, 21, 22, 23],

};


const model = {
    code,
    highlightLines,
    language: LANGUAGES.javascript,
}

export default model;