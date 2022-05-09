/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

/*
 * Custom blocks
 */
//% color="#ff0000" icon="\uf001"
namespace musicExtras {
    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 5
     */
    //% block
    export function nearestNoteNumberFromFrequency(freq: number): number {
        return Math.round(69 + 12 * ((Math.log(freq) - Math.log(440) / Math.log(2))));
    }
    //% block
    export function noteNumberToFrequency(num: number): number {
        return 440 * Math.pow(1.05946309436, (num - 69))
    }
    //% block
    //% sounds.shadow="lists_create_with"
    //% sounds.defl="soundExpression_createSoundEffect"
    export function joinSounds(sounds: string[]): string {
        return sounds.join(",")
    }
}