(
s.waitForBoot {
	~dirt = SuperDirt(2, s); // two output channels
	~dirt.loadSoundFiles("/Users/pamselle/Projects/samples/*"); // specify sample folder to load
	~dirt.loadSoundFiles("/Users/pamselle/Library/Application Support/SuperCollider/downloaded-quarks/Dirt-Samples/*"); // specify sample folder to load
	s.options.memSize = 1024 * 128;
	s.options.numBuffers = 1024 *3;
	s.sync; // wait for supercollider to finish booting up
	~dirt.start(57120, [0, 0]); // start superdirt, listening on port 57120, create two busses each sending audio to channel 0
};
);
SuperDirt.start
Server.default.record
Server.default.stopRecording
SuperDirt.stop
Quarks.gui
(
"HOORAY".postln;
"there".postln;
)

{ SinOsc.ar(XLine.kr(2000, 700), 0, 0.5) }.play;
s.boot;
s.quit;
x = { var ampOsc;
	ampOsc = SinOsc.kr(0.5,1.5pi,440,0.5);
	SinOsc.ar(ampOsc,0, 0.5);
};
x.play
x.stop
{ Mix.new([0,SinOsc.ar([440,554,659], 0, 0.5)])}.play



{ Pan2.ar(PinkNoise.ar(0.2), SinOsc.kr(0.5)) }.play;
Pan
{ PinkNoise.ar(0.2) + SinOsc.ar(440, 0, 0.2) + Saw.ar(660, 0.02) }.play;
(
    var n = 8;
    { Mix.fill(n, { SinOsc.ar(500 + 500.0.rand, 0, 1 / n) }) }.play;
)

(
    var n = 8;
    { Mix.fill(n, { SinOsc.ar(500 + 500.0.rand, 0, 1 / n) }) }.play;
)

{ PinkNoise.ar(0.2) + SinOsc.ar(440, 0, 0.2) + Saw.ar(660, 0.2) }.plot;

{ SinOsc.ar(440) + SinOsc.ar(446) }.play
