"use strict";class Color{constructor(a,b=a,c=b,opacity=1,type=ColorType.RGB){this.type=type;if(this.type===ColorType.RGB){this.r=a;this.g=b;this.b=c;this.a=opacity}else if(this.type===ColorType.HSL){this.h=a;this.s=b;this.l=c;this.a=opacity}else{return error("The type isn't defined !",new Color(255))}}toString(){if(this.type===ColorType.RGB)return"rgba("+this.r+","+this.g+","+this.b+", "+this.a+")";else if(this.type===ColorType.HSL)return"hsla("+this.h+","+this.s+"%,"+this.l+"%,"+this.a+")"}static rgb(r,g=r,b=g){return Color.rgba(r,g,b)}static hsl(h,s=100,l=100){return Color.hsla(h,s,l,1)}static rgba(r,g=r,b=g,a=1){return new Color(r,g,b,a)}static hsla(h,s=100,l=100,a=1){return new Color(h,s,l,a,ColorType.HSL)}}"use strict";let ColorType={RGB:"rgb",HSL:"hsl"};"use strict";function resetTransform(ctx=targetContext){setTransform(1,0,0,1,0,0,ctx)}function setTransform(horizontalScaling,horizontalSkewing,verticalSkewing,verticalScaling,horizontalTranslation,verticalTranslation,ctx=targetContext){ctx.setTransform(horizontalScaling,horizontalSkewing,verticalSkewing,verticalScaling,horizontalTranslation,verticalTranslation)}function translate(x,y,ctx=targetContext){ctx.translate(x,y)}function rotate(angle,ctx=targetContext){ctx.rotate(angle)}function scale(x,y,ctx=targetContext){ctx.scale(x,y)}function save(ctx=targetContext){ctx.save()}function restore(ctx=targetContext){ctx.restore()}"use strict";function foreachImageData(imgData,func,use2DCoordinates=true){foreachImageDataRect(0,0,imgData.width,imgData.height,imgData,func,use2DCoordinates)}function mapImageData(imgData,func,use2DCoordinates=true){return mapImageDataRect(0,0,imgData.width,imgData.height,imgData,func,use2DCoordinates)}function foreachImageDataRect(posX,posY,width,height,imgData,func,use2DCoordinates=true){mapImageDataRect(posX,posY,width,height,imgData,(pixel,x,y)=>{func(pixel,x,y);return pixel},use2DCoordinates)}function mapImageDataRect(posX,posY,width,height,imgData,func,use2DCoordinates=true){if(posX<0||posX+width>imgData.width||(posY<0||posY+height>imgData.height)){return error("The position and the dimensions precised don't match with imgData's dimensions.",imgData)}for(let x=posX;x<posX+width;x++){for(let y=posY;y<posY+height;y++){setPixel(x,y,imgData,func(getPixel(x,y,imgData),use2DCoordinates?x:getPixelIndex(x,y),use2DCoordinates?y:undefined))}}return imgData}function getPixel(x,y,imgData){return getPixelByIndex(getPixelIndex(x,y,imgData),imgData)}function setPixel(x,y,imgData,color){setPixelByIndex(getPixelIndex(x,y,imgData),imgData,color)}function setPixelByIndex(i,imgData,color){imgData.data[i*4]=color.r;imgData.data[i*4+1]=color.g;imgData.data[i*4+2]=color.b;imgData.data[i*4+3]=Math.floor(color.a*255)}function getPixelByIndex(i,imgData){return new Color(imgData.data[i*4],imgData.data[i*4+1],imgData.data[i*4+2],imgData.data[i*4+3]/255)}function getPixelIndex(x,y,imgData){return x<0||x>=imgData.width?error("x has a wrong value ! ("+x+")",0):y<0||y>=imgData.height?error("y has a wrong value ! ("+y+")",0):y*imgData.width+x}function createImageData(width,height,ctx=targetContext){return ctx.createImageData(width,height,ctx)}function getImageData(x,y,width,height,ctx=targetContext){return ctx.getImageData(x,y,width,height)}function putImageData(imgData,x,y,ctx=targetContext){ctx.putImageData(imgData,x,y)}function fillImageData(imgData,value){return mapImageData(imgData,()=>value)}"use strict";let targetContext;function setTargetContext(ctx){targetContext=ctx}function strokeWeight(weight,ctx=targetContext){ctx.lineWidth=weight}function border(color,ctx=targetContext){noFill();stroke(color,ctx);rect(0,0,ctx.canvas.width,ctx.canvas.height,ctx)}function circle(xCenter,yCenter,radius,ctx=targetContext){arc(xCenter,yCenter,radius,0,2*Math.PI,false,ctx)}function arc(xCenter,yCenter,radius,startAngle,stopAngle,counterClockwise=false,ctx=targetContext){ctx.beginPath();ctx.arc(xCenter,yCenter,radius,startAngle,stopAngle);drawShape(ctx);ctx.closePath()}function rect(xLeft,yTop,width,height,ctx=targetContext){ctx.beginPath();ctx.rect(xLeft,yTop,width,height);drawShape(ctx);ctx.closePath()}function grid(pos,scales,separators,dimensions){rect(pos.x,pos.y,dimensions.x,dimensions.y);for(let i=pos.x+scales.x;i<=pos.x+dimensions.x-1;i+=scales.x){line(i,pos.y,i,pos.y+dimensions.y);i+=separators.x;line(i,pos.y,i,pos.y+dimensions.y)}for(let j=pos.y+scales.y;j<=pos.y+dimensions.y-1;j+=scales.y){line(pos.x,j,pos.x+dimensions.x,j);j+=separators.y;line(pos.x,j,pos.x+dimensions.x,j)}}function line(x1,y1,x2,y2,ctx=targetContext){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);drawShape(ctx);ctx.closePath()}function drawImage(img,x,y,width,height,ctx=targetContext){drawSubImage(img,0,0,img.width,img.height,x,y,width,height,ctx)}function drawSubImage(img,sx,sy,sWidth=img.width,sHeight=img.height,dx,dy,dWidth,dHeight,ctx=targetContext){if(dx===undefined){ctx.drawImage(img,sx,sy,sWidth,sHeight)}else{ctx.drawImage(img,sx,sy,sWidth,sHeight,dx,dy,dWidth,dHeight)}}"use strict";let isStroking=true;let isFilling=true;function drawShape(ctx=targetContext){if(isFilling)ctx.fill();if(isStroking)ctx.stroke()}function createRadialGradient(x1,y1,r1,x2,y2,r2,ctx=targetContext){return ctx.createRadialGradient(x1,y1,r1,x2,y2,r2,ctx=targetContext)}function createLinearGradient(x1,y1,x2,y2,ctx=targetContext){return ctx.createLinearGradient(x1,y1,x2,y2)}function fillGradient(gradient,ctx=targetContext){ctx.fillStyle=gradient}function strokeGradient(gradient,ctx=targetContext){ctx.strokeStyle=gradient}function fill(color,ctx=targetContext){if(!(color instanceof Color))color=new Color(color);ctx.fillStyle=color.toString();isFilling=true}function stroke(color,ctx=targetContext){if(!(color instanceof Color))color=new Color(color);ctx.strokeStyle=color.toString();isStroking=true}function background(color,ctx=targetContext){fill(color,ctx);noStroke();rect(0,0,ctx.canvas.width,ctx.canvas.height,ctx)}function noFill(){isFilling=false}function noStroke(){isStroking=false}function lineCap(type,ctx=targetContext){ctx.lineCap=type}function lineJoin(type,ctx=targetContext){ctx.lineJoin=type}function miterLimit(value,ctx=targetContext){ctx.miterLimit=value}function lineDashOffset(value,ctx=targetContext){ctx.lineDashOffset=value}function setLineDash(segments,ctx=targetContext){ctx.setLineDash(segments)}function getLineDash(ctx=targetContext){return ctx.getLineDash()}"use strict";const WIDTH_COEF=18/8;const HEIGHT_COEF=75/48;const FONTSIZE_MODE={FONTSIZE:"fontsize",WIDTH:"width",HEIGHT:"height"};function font(size,fontname,sizeMode=FONTSIZE_MODE.FONTSIZE,ctx=targetContext){if(sizeMode===FONTSIZE_MODE.WIDTH)size*=WIDTH_COEF;else if(sizeMode===FONTSIZE_MODE.HEIGHT)size*=HEIGHT_COEF;ctx.font=size+"px "+fontname}function textAlign(alignment,ctx=targetContext){ctx.textAlign=alignment}function text(x,y,str,ctx=targetContext){if(isStroking)ctx.strokeText(str,x,y);if(isFilling)ctx.fillText(str,x,y)}function textFitInBox(xBoxLeft,yBoxTop,boxWidth,boxHeight,str,ctx=targetContext){let boxPos=new Vector(xBoxLeft,yBoxTop);let boxDim=new Vector(boxWidth,boxHeight);let strDim;if(boxDim.x/str.length<boxDim.y){strDim=getFontDimensions(boxDim.x*5/12/str.length,FONTSIZE_MODE.WIDTH)}else{strDim=getFontDimensions(boxDim.y*12/24,FONTSIZE_MODE.HEIGHT)}textAlign("center",ctx);font(strDim.x,"monospace",FONTSIZE_MODE.WIDTH,ctx);text(boxPos.x+boxDim.x/2,boxPos.y+(boxDim.y+strDim.y)/2,str,ctx)}function getFontDimensions(size,sizeMode){let fontDim=new Vector;if(sizeMode===FONTSIZE_MODE.WIDTH){fontDim.x=size;fontDim.y=getHeightOfChar(fontDim.x,FONTSIZE_MODE.WIDTH)}else if(sizeMode===FONTSIZE_MODE.HEIGHT){fontDim.y=size;fontDim.x=getWidthOfChar(fontDim.y,FONTSIZE_MODE.HEIGHT)}else if(sizeMode===FONTSIZE_MODE.FONTSIZE){fontDim.x=getWidthOfChar(size,FONTSIZE_MODE.FONTSIZE);fontDim.y=getHeightOfChar(size,FONTSIZE_MODE.FONTSIZE)}else return error("The value entered is wrong, it's necessary to know the width, the height or the fontsize to deduce the font dimensions !",new Vector(1,1));return fontDim}function getFontSize(size,sizeMode){if(sizeMode===FONTSIZE_MODE.WIDTH)return size*WIDTH_COEF;else if(sizeMode===FONTSIZE_MODE.HEIGHT)return size*HEIGHT_COEF;else return error("The value entered is wrong, it's necessary to know the height or the width of a caractere to deduce the fontsize !",1)}function getWidthOfChar(size,sizeMode=FONTSIZE_MODE.FONTSIZE){if(sizeMode===FONTSIZE_MODE.FONTSIZE)return size/WIDTH_COEF;else if(sizeMode===FONTSIZE_MODE.HEIGHT)return size*HEIGHT_COEF/WIDTH_COEF;else return error("The value entered is wrong, it's necessary to know the fontsize or the height of a caractere to deduce its width !",1)}function getHeightOfChar(size,sizeMode=FONTSIZE_MODE.FONTSIZE){if(sizeMode===FONTSIZE_MODE.FONTSIZE)return size/HEIGHT_COEF;else if(sizeMode===FONTSIZE_MODE.WIDTH)return size*WIDTH_COEF/HEIGHT_COEF;else return error("The value entered is wrong, it's necessary to know the fontsize or the width of a caractere to deduce its height !",1)}"use strict";class Vector{constructor(x,y){this.x=x;this.y=y}add(v){let w=Vector.add(this,v);this.x=w.x;this.y=w.y}subtract(v){let w=Vector.subtract(this,v);this.x=w.x;this.y=w.y}multiply(value){let v=Vector.multiply(this,value);this.x=v.x;this.y=v.y}divide(value){let v=Vector.divide(this,value);this.x=v.x;this.y=v.y}copy(){return new Vector(this.x,this.y)}equals(v){return this.x==v.x&&this.y==v.y}static add(v,w){return new Vector(v.x+w.x,v.y+w.y)}static subtract(v,w){return new Vector(v.x-w.x,v.y-w.y)}static multiply(v,value){return new Vector(v.x*value,v.y*value)}static divide(v,value){return new Vector(v.x/value,v.y/value)}}"use strict";function randomInt(min,max){return Math.floor(random(min,max))}function random(min,max){return Math.random()*(max-min)+min}"use strict";function error(message,returnValue,logger=console.error){logger(message);return returnValue}