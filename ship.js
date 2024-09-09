const Ship = (length) => {
	let timesHit = 0;
	const shipHealth = new Array(length).fill(false);

	const hit = (index) => {
		shipHealth[index] = true;
		return timesHit++;
	};

	const printShipStatus = () => {
		return shipHealth;
	};

	const isSunk = () => {
		if (timesHit >= length) {
			return true;
		} else {
			return false;
		}
	};

	const resetHits = () => {
		shipHealth.map(() => false);
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
