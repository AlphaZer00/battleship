const Ship = (length) => {
	let timesHit = 0;

	const hit = () => {
		return timesHit++;
	};

	const isSunk = () => {
		if (timesHit >= length) {
			return true;
		} else {
			return false;
		}
	};

	const resetHits = () => {
		return timesHit = 0;
	};

	return {
		length: length,
		hit,
		isSunk,
		resetHits,
	};
};

export { Ship };
