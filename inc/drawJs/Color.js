"use strict";

class Color {
    /**
     * The constructor
     * @param a The first component (red if RGB, hue if HSL)
     * @param b The second component (green if RGB, saturation if HSL)
     * @param c The third component (blue if RGB, lightness if HSL)
     * @param opacity The opacity from 0 (invisible) to 1 (opaque), 1 if not specified.
     * @param type The type of color.
     * @returns {*} The color
     */
    constructor(a, b = a, c = b, opacity = 1, type = ColorType.RGB) {
        this.type = type;

        if (this.type === ColorType.RGB) {
            this.r = a;
            this.g = b;
            this.b = c;
            this.a = opacity;
        } else if (this.type === ColorType.HSL) {
            this.h = a;
            this.s = b;
            this.l = c;
            this.a = opacity;
        } else {
            return error("The type isn't defined !", new Color(255));
        }
    }

    /**
     * Convert the color to the required javascript text format (used in canvas API)
     * @returns {string} The text
     */
    toString() {
        if (this.type === ColorType.RGB)
            return "rgba(" + this.r + "," + this.g + "," + this.b + ", " + this.a + ")";
        else if (this.type === ColorType.HSL)
            return "hsla(" + this.h + "," + this.s + "%," + this.l + "%," + this.a + ")";
    }

    /**
     * Create a RGB Color.
     * @param r The red component (between 0 and 255).
     * @param g The green component (between 0 and 255).
     * @param b The blue component (between 0 and 255).
     * @returns {Color} The color.
     */
    static rgb(r, g = r, b = g) {
        return Color.rgba(r, g, b);
    }

    /**
     * Create a HSL Color.
     * @param h The hue component (between 0 and 360).
     * @param s The green component (between 0 and 100).
     * @param l The blue component (between 0 and 100).
     * @returns {Color} The color.
     */
    static hsl(h, s = 100, l = 100) {
        return Color.hsla(h, s, l, 1);
    }

    /**
     * Create a RGB Color.
     * @param r The red component (between 0 and 255).
     * @param g The green component (between 0 and 255).
     * @param b The blue component (between 0 and 255).
     * @param a The opacity component (between 0 and 1).
     * @returns {Color} The color.
     */
    static rgba(r, g = r, b = g, a = 1) {
        return new Color(r, g, b, a);
    }

    /**
     * Create a HSL Color.
     * @param h The hue component (between 0 and 360).
     * @param s The green component (between 0 and 100).
     * @param l The blue component (between 0 and 100).
     * @param a The opacity component (between 0 and 1).
     * @returns {Color} The color.
     */
    static hsla(h, s = 100, l = 100, a = 1) {
        return new Color(h, s, l, a, ColorType.HSL);
    }
}
