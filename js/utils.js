"use strict";

const clamp = (x, min, max) => {
    if (x < min)
	return min;
    if (x > max)
	return max;
    return x;
}

const lerp = (a, b, t) => {
    return a * (1 - t) + b * t;
}

const random = (min, max) => {
    return lerp(min, max, Math.random());
}

// stolen from https://stackoverflow.com/a/2450976
const shuffle = (array) => {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

	// Pick a remaining element...
	let randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex--;

	// And swap it with the current element.
	[array[currentIndex], array[randomIndex]] = [
	    array[randomIndex], array[currentIndex]];
    }
}
