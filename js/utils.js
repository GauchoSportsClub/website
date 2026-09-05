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
