
const ready = async (songID) => {
	// Start download
	const downloading = fetch(`a/${songID}`);

	// Setup AudioContext and rendering thread (processor)
	const context = new AudioContext();
	await context.audioWorklet.addModule('processor.js');
	const node = new AudioWorkletNode(context, 'processor');
	await node.connect(context.destination);

	// Decode file to an AudioBuffer interface
	const response = await downloading;
	const decoding = context.decodeAudioData(await response.arrayBuffer());
	const interface = await decoding;

	// List Float32Array of each channel
	const arrayList = [];
	let i = 0;
	while (i !== 4) {
		arrayList.push(interface.getChannelData(i));
		i++;
	}

	// Start listening to rendering thread for confirmation
	workletNode.port.onmessage = (event) => {
		event.data === 'READY' ? return true : console.log(event);
	};

	// Transfer array buffers to rendering thread
	await workletNode.port.postMessage(
		{type: 'load', data: arrayList},
		arrayList.map(arr => arr.buffer)
	);

}



