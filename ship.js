const Ship = (length) => {
	let timesHit = 0;

	const hit = () => {
		timesHit++;
	};

	const isSunk = () => {
		timesHit === length ? true : false;
	};

	return {
		length: length,
		hit,
		isSunk,
	};
};
export { Ship };
