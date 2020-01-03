// create a canvas which will render the grain
function initCanvas(){viewWidth=canvas.width=canvas.clientWidth,viewHeight=canvas.height=canvas.clientHeight,(ctx=canvas.getContext("2d")).scale(patternScaleX,patternScaleY)}
// create a canvas which will be used as a pattern
function initGrain(){(patternCanvas=document.createElement("canvas")).width=patternSize,patternCanvas.height=patternSize,patternCtx=patternCanvas.getContext("2d"),patternData=patternCtx.createImageData(patternSize,patternSize)}
// put a random shade of gray into every pixel of the pattern
function update(){for(var t,a=0;a<patternPixelDataLength;a+=4)t=255*Math.random()|0,patternData.data[a]=t,patternData.data[a+1]=t,patternData.data[a+2]=t,patternData.data[a+3]=patternAlpha;patternCtx.putImageData(patternData,0,0)}
// fill the canvas using the pattern
function draw(){ctx.clearRect(0,0,viewWidth,viewHeight),ctx.fillStyle=ctx.createPattern(patternCanvas,"repeat"),ctx.fillRect(0,0,viewWidth,viewHeight)}function loop(){++frame%patternRefreshInterval==0&&(update(),draw()),requestAnimationFrame(loop)}var viewWidth,viewHeight,canvas=document.getElementById("canvas"),ctx,patternSize=150,patternScaleX=1,patternScaleY=1,patternRefreshInterval=8,patternAlpha=20,patternPixelDataLength=patternSize*patternSize*4,patternCanvas,patternCtx,patternData,frame=0;
// change these settings
window.onload=function(){initCanvas(),initGrain(),requestAnimationFrame(loop)};