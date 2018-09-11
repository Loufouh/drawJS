"use strict";

class Color {
	constructor(a, b=a, c=b, d=1, type=ColorType.RGB) {
		this.type = type;

		if(this.type === ColorType.RGB) {
			this.r = a;
			this.g = b;
			this.b = c;
			this.a = d;
		} else if(this.type === ColorType.HSL) {
			this.h = a;
			this.s = b;
			this.l = c;
		} else 
			return error("The type isn't defined !" , new Color(255));
	}

	toString() {
		if(this.type === ColorType.RGB)
			return "rgba(" + this.r + "," + this.g + "," + this.b + ", " + this.a + ")";
		else if(this.type === ColorType.HSL)
			return "hsl(" + this.h + "," + this.s + "%," + this.l + "%)";
	}
}
