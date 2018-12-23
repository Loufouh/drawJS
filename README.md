# drawJS
This library has been created to draw easier on a canvas, you can target one and then don't have to create a global variable to save its context !
## How to use it ?
### Import it
At first, you have to download it [here](https://raw.githubusercontent.com/Louis700/drawJS/master/draw.js).
And then to import it you have to put this line in your html page :
```html
<script src="draw.js"></script>
```
### Basics
To focus on the canvas to use, you have to run the function ```setTargetContext(ctx)```
Example : 
```javascript
window.onload = function() {
	let canvas = document.querySelector("canvas");
	setTargetContext(canvas.getContext("2d"));
}
```
