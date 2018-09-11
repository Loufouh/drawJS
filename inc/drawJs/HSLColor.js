"use strict";

class HSLColor extends Color {
	constructor(h, s=100, l=100) {
		super(h, s, l, 0, ColorType.HSL);
	}
}
