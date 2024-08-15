/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/
enum Voice {
    Pipe,
    Pluck,
    Key,
    Chime
}
/*
 * Custom blocks
 */
//% color="#ff0000" icon="\uf001"  weight=105
namespace musicHelpers {
    //% block
    //% weight=100
    export function setInstrumentForTones(choice: Voice) {
            switch (choice) {
                case Voice.Pipe: {
                    music.setPlayTone(playPipe)               
                }
                case Voice.Pluck: {
                    music.setPlayTone(playPluckedString)
                }
                case Voice.Key: {
                    music.setPlayTone(playKeys)
                }
                case Voice.Chime: {
                    music.setPlayTone(playChime)
                }
            }

    }
    /**
     * TODO: describe your function here
     * @param value describe value here, eg: 5
     */
    //% block
    export function nearestNoteNumberFromFrequency(freq: number): number {
        return Math.round(69 + 12 * ((Math.log(freq) - Math.log(440) / Math.log(2))));
    }
    //% block
    function pentatonicNoteNumberToFrequency(pentNote: number) {
        let pentatonic = [
            0,
            2,
            4,
            7,
            9
        ]
        let note = pentNote % 5
        let octave = Math.floor(pentNote / 5)
        let targetNote = octave * 12 + pentatonic[note]
        return targetNote
    }
    //% block
    export function noteNumberToFrequency(num: number): number {
        return 440 * Math.pow(1.05946309436, (num - 69))
    }
    //% block
    //% draggableParameters
    //% weight=100
    export function setCustomPlayToneFunction(f: (frequency: number, duration: number) => void) {
        music.setPlayTone(f)
    }
    export function playPipe(frequency: number, length: number) {
        playnote(frequency, length, 0.4, 0.4 , 0.2)
    }
    export function playPluckedString(frequency: number, length: number) {
        playnote(frequency, length, 0,0,1)
    }
    export function playKeys(frequency: number, length: number) {
        playnote(frequency, length,  0.05, 0.45, 0.5)
    }
    //% block="play note %frequency for %duration||with ratios:| attack %attack| hold %middle| decay %decay"
    //% frequency.shadow=device_note
    //% duration.shadow=device_beat
    //% attack.defl=0.1
    //% middle.defl=0.1
    //% decay.defl=0.8
    //% expandableArgumentMode="toggle"
    export function playnote(frequency: number, duration: number, attack: number=0.1, middle: number=0.1, decay: number=0.8) {
        let paramTotal = attack + middle + decay
        if (paramTotal == 0) {
            playnote(frequency, duration,0,1,0)
            return
        }
        music.play(music.createSoundExpression(
            WaveShape.Square,
            frequency,
            frequency,
            0,
            255,
            duration * attack/paramTotal,
            SoundExpressionEffect.None,
            InterpolationCurve.Logarithmic
        ), music.PlaybackMode.InBackground)
        music.play(music.createSoundExpression(
            WaveShape.Square,
            frequency,
            frequency,
            255,
            255,
            duration * middle/paramTotal,
            SoundExpressionEffect.None,
            InterpolationCurve.Linear
        ), music.PlaybackMode.InBackground)
        music.play(music.createSoundExpression(
            WaveShape.Square,
            frequency,
            frequency,
            255,
            0,
            duration* decay/paramTotal,
            SoundExpressionEffect.None,
            InterpolationCurve.Curve
        ), music.PlaybackMode.InBackground)
    }
    function playChime(frequency: number, length: number) {
        playnote(frequency, length, 0.1, 0.1 , 0.8)
    }
}