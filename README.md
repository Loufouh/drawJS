# drawJS
This library has been created to draw easier on a canvas, you can target one and then don't have to create a global variable to save its context!

## How to use it?
### Import it
To import DrawJS, you can use npm with the command:

```bash
npm i @louis700/drawjs
```

Then, you have to specify you want to import JS files from your script with the attribute `type` set to `module`:
```html
<script type="module" src="script.js"></script>
```

### Target a context
To focus on the canvas to use, you have to call the function `setTargetContext(ctx)` located in drawJS module.<br>
Example : 
```javascript
import {drawJS} from "./node_modules/@louis700/drawjs/index.js";

window.onload = function() {
	let canvas = document.querySelector("canvas");
	drawJS.setTargetContext(canvas.getContext("2d"));
}
```

<strong>To use another context, you have to change the focus or to specify it as the last parameter:</strong>
	
```javascript
import {shapes} from "./node_modules/@louis700/drawjs/index";

shapes.rect(0, 0, 100, 100, ctx);
```


### Create a color
To create a color, this lib contains the class `Color` in the module `color`.<br>
There are two ways to create a color :

#### RGB/RGBA
If you don't know the RGBA color system, this Wikipedia page will help you: 
[RGBA color space](https://en.wikipedia.org/wiki/RGBA_color_space). <br>
The complete way to create a RGBA color is to specify all the parameters in the constructor `Color(r, g, b, a, type)` :
```javascript
import {color as color_m} from "./node_modules/@louis700/drawjs/index";

let color = new color_m.Color(255, 52, 52, 1, ColorType.RGB);
```
But hopefully, there are some shortcuts:
- When you use the RGBA system, you don't have to specify the type: `new Color(r, g, b, a)`
- When you want a color with an opacity of 1, you could write it like this: `new Color(r, g, b)`
- And if you want to use the same value for the lasts parameters, it will be repeated automatically:<br>
`new Color(52)` → `new Color(52, 52, 52)`<br>
`new Color(255, 52)` → `new Color(255, 52, 52)`

#### HSL/HSLA
There is a Wikipedia page about the HSLA system: [HSL and HSV](https://en.wikipedia.org/wiki/HSL_and_HSV). <br>
This time, there are no shortcuts, you have to specify all of the parameters each time `new Color(h, s, l, a, type)`:
```javascript
let color = new color_m.Color(240, 100, 60, ColorType.HSL);
```

### Draw on the canvas
To draw on the canvas, you can first define the colors (the default color is the black). To define the color of the stroke, you have to you use `stroke(color)`, and to define the color that will fill the shape, you have to use `fill(color)`. If you don't want to draw the stroke or to fill the shape, you can use `noFill()` and `noStroke()` (to draw again, you just have to specify color).<br><br>
Two other functions use the color: `background(color)` and `border(color)`, the first fills the whole canvas with the specified color, and the other one will outline it.

```javascript
import {style} from "./node_modules/@louis700/drawjs/index.js";

style.stroke(color);
style.fill(color);
style.noFill();
style.noStroke();
style.background(color);
style.border(color);
```
