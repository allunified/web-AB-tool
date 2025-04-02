class processor extends AudioWorkletProcessor {
	constructor() {
		super();
		this.port.onmessage = (event) => {
			switch (event.data.type) {
				case 'load':
					this.pcm = event.data.data;
					this.port.postMessage('READY');
				case 'play':
					// Fade in
				case 'pause':
					// Fade out
				case 'swap':
					// Toggle A/B
			}
		}
	}
	process(outputs) {
		const {sig,pcm,currentFrame:i} = this;
		switch (sig) {
			case 0:

			case 1:

			case 2:

			case 3:

		}
		
		for (let value of outputs[0][0]) {
			value +=
		}
	}
}

