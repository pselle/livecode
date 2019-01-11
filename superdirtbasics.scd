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