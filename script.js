//@ts-check
console.log("Hello!")
class Random {
    /**
     * @param {number} min
     * @param {number} max
     */
    static IntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

class Dice {
    static pattern = /(?<times>\d+)?d(?<sides>\d+){1}(?<modifier>-L|-H)?/

    /**@type {Array<number>}*/
    dice_roll_result
    /**@type {string} */
    notation
    /**@type {number}*/
    discarded
    /**
     * @param {string} notation 
     */
    Roll(notation = this.notation) {
        const regmatch = Dice.pattern.exec(notation)
        if (regmatch == null) {
            throw new Error("Invalid Dice Notation");

        }
        if (regmatch.groups == undefined) {
            throw new Error("No Regex Groups detected. How.");
        }

        let times;
        this.dice_roll_result = new Array();
        let sides = Number(regmatch.groups.sides).valueOf()


        if (regmatch.groups.times == undefined) {
            times = 1;
        }
        else {
            times = Number(regmatch.groups.times).valueOf()
        }

        for (let index = 0; index < times; index++) {
            this.dice_roll_result.push(Random.IntInclusive(1, sides))
        }
        if (regmatch.groups.modifier == undefined) {
            return this.Result
        }
        this.dice_roll_result.sort((a, b) => a - b)
        if (regmatch.groups.modifier == "-L") {
            let discarded = this.dice_roll_result.splice(0, 1)[0]
            this.discarded = discarded;
        }
        if (regmatch.groups.modifier == "-H") {
            let discarded = this.dice_roll_result.pop()
            if (discarded == undefined) {

            }
            else {
                this.discarded = discarded
            }
        }
        return this.Result
    }
    get Result() {
        let summ = 0
        for (let index = 0; index < this.dice_roll_result.length; index++) {
            summ += this.dice_roll_result[index]
        }
        return summ
    }


    /**
     * @param {string} [notation]
     */
    constructor(notation) {
        this.notation = new String(notation).toString();
    }
}

let Kostka = new Dice("5d6");