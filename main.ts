let currentfreq = 0
function noteNumberToFrequency (num: number) {
    return 440 * 1.05946309436 ** (num - 69)
}
input.onButtonPressed(Button.B, function () {
    music.setVolume(127)
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.A)) {
        currentfreq = Math.map(input.acceleration(Dimension.X), 0, 1023, 0, 4)
        music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 2000, 0, 1023, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    }
})
