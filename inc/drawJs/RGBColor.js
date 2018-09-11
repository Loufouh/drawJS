"use strict";

class RGBColor extends Color {
	constructor(r, g=r, b=g, a=1) {
		super(r, g, b, a, ColorType.RGB);
	}
}
