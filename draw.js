"use strict";const WIDTH_COEF=18/8,HEIGHT_COEF=75/48,FONTSIZE_MODE={FONTSIZE:"fontsize",WIDTH:"width",HEIGHT:"height"};function font(e,f,k=FONTSIZE_MODE.FONTSIZE,m=targetContext){k===FONTSIZE_MODE.WIDTH?e*=WIDTH_COEF:(k=FONTSIZE_MODE.HEIGHT)&&(e*=HEIGHT_COEF),m.font=e+"px "+f}function textAlign(e,f=targetContext){f.textAlign=e}function text(e,f,k,m=targetContext){isStroking&&m.strokeText(k,e,f),isFilling&&m.fillText(k,e,f)}function textFitInBox(e,f,k,m,n,o=targetContext){let p=new SimpleVector(e,f),q=new SimpleVector(k,m),t=new SimpleVector;t=q.x/n.length<q.y?getFontDimensions(5*q.x/12/n.length,FONTSIZE_MODE.WIDTH):getFontDimensions(12*q.y/24,FONTSIZE_MODE.HEIGHT),textAlign("center",o),font(t.x,"monospace",FONTSIZE_MODE.WIDTH,o),text(p.x+q.x/2,p.y+(q.y+t.y)/2,n,o)}function getFontDimensions(e,f){let k=new SimpleVector;if(f===FONTSIZE_MODE.WIDTH)k.x=e,k.y=getHeightOfChar(k.x,FONTSIZE_MODE.WIDTH);else if(f===FONTSIZE_MODE.HEIGHT)k.y=e,k.x=getWidthOfChar(k.y,FONTSIZE_MODE.HEIGHT);else if(f===FONTSIZE_MODE.FONTSIZE)k.x=getWidthOfChar(e,FONTSIZE_MODE.FONTSIZE),k.y=getHeightOfChar(e,FONTSIZE_MODE.FONTSIZE);else return error("The value entered is wrong, it's necessary to know the width, the height or the fontsize to deduce the font dimensions !",new SimpleVector(1,1));return k}function getFontSize(e,f){return f===FONTSIZE_MODE.WIDTH?e*WIDTH_COEF:f===FONTSIZE_MODE.HEIGHT?e*HEIGHT_COEF:error("The value entered is wrong, it's necessary to know the height or the width of a caractere to deduce the fontsize !",1)}function getWidthOfChar(e,f=FONTSIZE_MODE.FONTSIZE){return f===FONTSIZE_MODE.FONTSIZE?e/WIDTH_COEF:f===FONTSIZE_MODE.HEIGHT?e*HEIGHT_COEF/WIDTH_COEF:error("The value entered is wrong, it's necessary to know the fontsize or the height of a caractere to deduce its width !",1)}function getHeightOfChar(e,f=FONTSIZE_MODE.FONTSIZE){return f===FONTSIZE_MODE.FONTSIZE?e/HEIGHT_COEF:f===FONTSIZE_MODE.WIDTH?e*WIDTH_COEF/HEIGHT_COEF:error("The value entered is wrong, it's necessary to know the fontsize or the width of a caractere to deduce its height !",1)}let isStroking=!0,isFilling=!0;function fill(e,f=targetContext){e instanceof Color||(e=new Color(e)),f.fillStyle=e.toString(),isFilling=!0}function stroke(e,f=targetContext){e instanceof Color||(e=new Color(e)),f.strokeStyle=e.toString(),isStroking=!0}function background(e,f=targetContext){fill(e,f),noStroke(),rect(0,0,f.canvas.width,f.canvas.height,f)}function noFill(){isFilling=!1}function noStroke(){isStroking=!1}function lineCap(e,f=targetContext){f.lineCap=e}function drawShape(e=targetContext){isFilling&&e.fill(),isStroking&&e.stroke()}let targetContext;function setTargetContext(e){targetContext=e}function strokeWeight(e,f=targetContext){f.lineWidth=e}function border(e,f=targetContext){noFill(),stroke(e,f),rect(0,0,f.canvas.width,f.canvas.height,f)}function circle(e,f,k,m=targetContext){arc(e,f,k,0,2*Math.PI,!1,m)}function arc(e,f,k,m,n,o=!1,p=targetContext){p.beginPath(),p.arc(e,f,k,m,n),p.closePath(),drawShape(p)}function rect(e,f,k,m,n=targetContext){n.beginPath(),n.rect(e,f,k,m),n.closePath(),drawShape(n)}function grid(e,f,k,m){for(let n=e.x;n<=e.x+m.x-1;n+=f.x)line(n,e.y,n,e.y+m.y),n+=k.x,line(n,e.y,n,e.y+m.y);for(let n=e.y;n<=e.y+m.y-1;n+=f.y)line(e.x,n,e.x+m.x,n),n+=k.y,line(e.x,n,e.x+m.x,n);line(e.x+m.x,e.y,e.x+m.x,e.y+m.y),line(e.x,e.y+m.y,e.x+m.x,e.y+m.y)}function line(e,f,k,m,n=targetContext){n.beginPath(),n.moveTo(e,f),n.lineTo(k,m),n.closePath(),drawShape(n)}function drawImage(e,f,k,m=e.width,n=e.height,o,p,q,t,u=targetContext){o===void 0?u.drawImage(e,f,k,m,n):u.drawImage(e,f,k,m,n,o,p,q,t)}function createImageData(e,f,k=targetContext){return k.createImageData(e,f,k)}function getImageData(e,f,k,m,n=targetContext){return n.getImageData(e,f,k,m)}function putImageData(e,f,k,m=targetContext){m.putImageData(e,f,k)}function setPixel(e,f,k,m){let n=getPixelIndex(e,f,k);k.data[n]=m.r,k.data[n+1]=m.g,k.data[n+2]=m.b,k.data[n+3]=Math.floor(255*m.a)}function getPixel(e,f,k){let m=getPixelIndex(e,f,k);return new Color(k.data[m],k.data[m+1],k.data[m+2],Math.floor(k.data[m+3]/255))}function getPixelIndex(e,f,k){return 0>e||e>=k.width?error("x has a wrong value ! ("+e+")",0):0>f||f>=k.height?error("y has a wrong value ! ("+f+")",0):4*f*k.width+4*e}function resetTransform(e=targetContext){setTransform(1,0,0,1,0,0,e)}function setTransform(e,f,k,m,n,o,p=targetContext){p.setTransform(e,f,k,m,n,o)}function translate(e,f,k=targetContext){k.translate(e,f)}function rotate(e,f=targetContext){f.rotate(e)}function scale(e,f,k=targetContext){k.scale(e,f)}function save(e=targetContext){e.save()}function restore(e=targetContext){e.restore()}let ColorType={RGB:"rgb",HSL:"hsl"};class Color{constructor(e,f=e,k=f,m=1,n=ColorType.RGB){if(this.type=n,this.type===ColorType.RGB)this.r=e,this.g=f,this.b=k,this.a=m;else if(this.type===ColorType.HSL)this.h=e,this.s=f,this.l=k,this.a=m;else return"The type isn't defined !",new Color(255)}toString(){if(this.type===ColorType.RGB)return"rgba("+this.r+","+this.g+","+this.b+", "+this.a+")";return this.type===ColorType.HSL?"hsla("+this.h+","+this.s+"%,"+this.l+"%,"+this.a+")":void 0}static rgb(e,f=e,k=f){return Color.rgba(e,f,k)}static hsl(e,f=100,k=100){return Color.hsla(e,f,k,1)}static rgba(e,f=e,k=f,m=1){return new Color(e,f,k,m)}static hsla(e,f=100,k=100,m=1){return new Color(e,f,k,m,ColorType.HSL)}}