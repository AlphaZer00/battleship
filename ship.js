const Ship = (length) => {
	let timesHit = 0;
	const shipHealth = new Array(length).fill(false);

	const hit = (index) => {
		if (!shipHealth[index]) {
			shipHealth[index] = true;
			timesHit++;
		}
	};

	const printShipStatus = () => {
		return shipHealth;
	};

	const isSunk = () => {
		return shipHealth.every((value) => value === true);
	};

	const resetHits = () => {
		for (let i = 0; i < shipHealth.length; i++) {
			shipHealth[i] = false;
		}
		timesHit = 0;
	};

	return {
		length: length,
		hit,
		isSunk,
		resetHits,
		printShipStatus,
	};
};

export { Ship };
