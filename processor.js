class processor extends AudioWorkletProcessor {
	constructor() {
		super();
		this.port.onmessage = (event) => {
			switch (event.data.type) {
				case 'load':
					this.srcPCM = event.data.data;
					this.port.postMessage('READY');
				case 'play':
					// Fade in
				case 'pause':
					// Fade out
				case 'swap':
					// Toggle A/B
			}
		}
		this.loopMap = [
			[0, 0, 128],
			[1, 0, 128]
		];
	}
	process(outputs) {
		const {srcPCM, loopMap, currentFrame: srcIndex, controlVar: X} = this;

		let I;
		for (let [channel, i, length] of loopMap) {
			for (I = srcIndex; i < length; i++) {
				srcPCM[channel][I] += srcPCM[channel+2][I]
			}
		}

	}
}

registerProcessor('processor', processor);
