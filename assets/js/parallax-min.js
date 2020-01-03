//============================================================
//
// The MIT License
//
// Copyright (C) 2014 Matthew Wagerfield - @wagerfield
//
// Permission is hereby granted, free of charge, to any
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the
// Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do
// so, subject to the following conditions:
//
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions
// of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY
// OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
// EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
// FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
// AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
// OR OTHER DEALINGS IN THE SOFTWARE.
//
//============================================================
/**
 * Parallax.js
 * @author Matthew Wagerfield - @wagerfield
 * @description Creates a parallax effect between an array of layers,
 *              driving the motion from the gyroscope output of a smartdevice.
 *              If no gyroscope is available, the cursor position is used.
 */
!function(m,u,y){
// Strict Mode
"use strict";
// Constants
function i(t,i){
// DOM Context
this.element=t,this.layers=t.getElementsByClassName("layer");
// Data Extraction
var e={calibrateX:this.data(this.element,"calibrate-x"),calibrateY:this.data(this.element,"calibrate-y"),invertX:this.data(this.element,"invert-x"),invertY:this.data(this.element,"invert-y"),limitX:this.data(this.element,"limit-x"),limitY:this.data(this.element,"limit-y"),scalarX:this.data(this.element,"scalar-x"),scalarY:this.data(this.element,"scalar-y"),frictionX:this.data(this.element,"friction-x"),frictionY:this.data(this.element,"friction-y"),originX:this.data(this.element,"origin-x"),originY:this.data(this.element,"origin-y")};
// Delete Null Data Values
for(var s in e)null===e[s]&&delete e[s];
// Compose Settings Object
this.extend(this,o,i,e),
// States
this.calibrationTimer=null,this.calibrationFlag=!0,this.enabled=!1,this.depths=[],this.raf=null,
// Element Bounds
this.bounds=null,this.ex=0,this.ey=0,this.ew=0,this.eh=0,
// Element Center
this.ecx=0,this.ecy=0,
// Element Range
this.erx=0,this.ery=0,
// Calibration
this.cx=0,this.cy=0,
// Input
this.ix=0,this.iy=0,
// Motion
this.mx=0,this.my=0,
// Velocity
this.vx=0,this.vy=0,
// Callbacks
this.onMouseMove=this.onMouseMove.bind(this),this.onDeviceOrientation=this.onDeviceOrientation.bind(this),this.onOrientationTimer=this.onOrientationTimer.bind(this),this.onCalibrationTimer=this.onCalibrationTimer.bind(this),this.onAnimationFrame=this.onAnimationFrame.bind(this),this.onWindowResize=this.onWindowResize.bind(this),
// Initialise
this.initialise()}var t="Parallax",n=30,o={relativeInput:!1,clipRelativeInput:!1,calibrationThreshold:100,calibrationDelay:500,supportDelay:500,calibrateX:!1,calibrateY:!0,invertX:!0,invertY:!0,limitX:!1,limitY:!1,scalarX:10,scalarY:10,frictionX:.1,frictionY:.1,originX:.5,originY:.5};i.prototype.extend=function(t){if(1<arguments.length)for(var i=t,e=1,s=arguments.length;e<s;e++){var n=arguments[e];for(var o in n)i[o]=n[o]}},i.prototype.data=function(t,i){return this.deserialize(t.getAttribute("data-"+i))},i.prototype.deserialize=function(t){return"true"===t||"false"!==t&&("null"===t?null:!isNaN(parseFloat(t))&&isFinite(t)?parseFloat(t):t)},i.prototype.camelCase=function(t){return t.replace(/-+(.)?/g,function(t,i){return i?i.toUpperCase():""})},i.prototype.transformSupport=function(t){for(var i=u.createElement("div"),e=!1,s=null,n=!1,o=null,r=null,a=0,h=this.vendors.length;a<h;a++)if(r=null!==this.vendors[a]?(o=this.vendors[a][0]+"transform",this.vendors[a][1]+"Transform"):o="transform",i.style[r]!==y){e=!0;break}switch(t){case"2D":n=e;break;case"3D":if(e){var l=u.body||u.createElement("body"),p=u.documentElement,c=p.style.overflow;u.body||(p.style.overflow="hidden",p.appendChild(l),l.style.overflow="hidden",l.style.background=""),l.appendChild(i),i.style[r]="translate3d(1px,1px,1px)",n=(s=m.getComputedStyle(i).getPropertyValue(o))!==y&&0<s.length&&"none"!==s,p.style.overflow=c,l.removeChild(i)}break}return n},i.prototype.ww=null,i.prototype.wh=null,i.prototype.wcx=null,i.prototype.wcy=null,i.prototype.wrx=null,i.prototype.wry=null,i.prototype.portrait=null,i.prototype.desktop=!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),i.prototype.vendors=[null,["-webkit-","webkit"],["-moz-","Moz"],["-o-","O"],["-ms-","ms"]],i.prototype.motionSupport=!!m.DeviceMotionEvent,i.prototype.orientationSupport=!!m.DeviceOrientationEvent,i.prototype.orientationStatus=0,i.prototype.propertyCache={},i.prototype.initialise=function(){var t;i.prototype.transform2DSupport===y&&(i.prototype.transform2DSupport=i.prototype.transformSupport("2D"),i.prototype.transform3DSupport=i.prototype.transformSupport("3D")),
// Configure Context Styles
this.transform3DSupport&&this.accelerate(this.element),"static"===m.getComputedStyle(this.element).getPropertyValue("position")&&(this.element.style.position="relative"),
// Setup
this.updateLayers(),this.updateDimensions(),this.enable(),this.queueCalibration(this.calibrationDelay)},i.prototype.updateLayers=function(){
// Cache Layer Elements
this.layers=this.element.getElementsByClassName("layer"),this.depths=[];
// Configure Layer Styles
for(var t=0,i=this.layers.length;t<i;t++){var e=this.layers[t];this.transform3DSupport&&this.accelerate(e),e.style.position=t?"absolute":"relative",e.style.display="block",e.style.left=0,e.style.top=0,
// Cache Layer Depth
this.depths.push(this.data(e,"depth")||0)}},i.prototype.updateDimensions=function(){this.ww=m.innerWidth,this.wh=m.innerHeight,this.wcx=this.ww*this.originX,this.wcy=this.wh*this.originY,this.wrx=Math.max(this.wcx,this.ww-this.wcx),this.wry=Math.max(this.wcy,this.wh-this.wcy)},i.prototype.updateBounds=function(){this.bounds=this.element.getBoundingClientRect(),this.ex=this.bounds.left,this.ey=this.bounds.top,this.ew=this.bounds.width,this.eh=this.bounds.height,this.ecx=this.ew*this.originX,this.ecy=this.eh*this.originY,this.erx=Math.max(this.ecx,this.ew-this.ecx),this.ery=Math.max(this.ecy,this.eh-this.ecy)},i.prototype.queueCalibration=function(t){clearTimeout(this.calibrationTimer),this.calibrationTimer=setTimeout(this.onCalibrationTimer,t)},i.prototype.enable=function(){this.enabled||(this.enabled=!0,this.orientationSupport?(this.portrait=null,m.addEventListener("deviceorientation",this.onDeviceOrientation),setTimeout(this.onOrientationTimer,this.supportDelay)):(this.cx=0,this.cy=0,this.portrait=!1,m.addEventListener("mousemove",this.onMouseMove)),m.addEventListener("resize",this.onWindowResize),this.raf=requestAnimationFrame(this.onAnimationFrame))},i.prototype.disable=function(){this.enabled&&(this.enabled=!1,this.orientationSupport?m.removeEventListener("deviceorientation",this.onDeviceOrientation):m.removeEventListener("mousemove",this.onMouseMove),m.removeEventListener("resize",this.onWindowResize),cancelAnimationFrame(this.raf))},i.prototype.calibrate=function(t,i){this.calibrateX=t===y?this.calibrateX:t,this.calibrateY=i===y?this.calibrateY:i},i.prototype.invert=function(t,i){this.invertX=t===y?this.invertX:t,this.invertY=i===y?this.invertY:i},i.prototype.friction=function(t,i){this.frictionX=t===y?this.frictionX:t,this.frictionY=i===y?this.frictionY:i},i.prototype.scalar=function(t,i){this.scalarX=t===y?this.scalarX:t,this.scalarY=i===y?this.scalarY:i},i.prototype.limit=function(t,i){this.limitX=t===y?this.limitX:t,this.limitY=i===y?this.limitY:i},i.prototype.origin=function(t,i){this.originX=t===y?this.originX:t,this.originY=i===y?this.originY:i},i.prototype.clamp=function(t,i,e){return t=Math.max(t,i),t=Math.min(t,e)},i.prototype.css=function(t,i,e){var s=this.propertyCache[i];if(!s)for(var n=0,o=this.vendors.length;n<o;n++)if(s=null!==this.vendors[n]?this.camelCase(this.vendors[n][1]+"-"+i):i,t.style[s]!==y){this.propertyCache[i]=s;break}t.style[s]=e},i.prototype.accelerate=function(t){this.css(t,"transform","translate3d(0,0,0)"),this.css(t,"transform-style","preserve-3d"),this.css(t,"backface-visibility","hidden")},i.prototype.setPosition=function(t,i,e){i+="px",e+="px",this.transform3DSupport?this.css(t,"transform","translate3d("+i+","+e+",0)"):this.transform2DSupport?this.css(t,"transform","translate("+i+","+e+")"):(t.style.left=i,t.style.top=e)},i.prototype.onOrientationTimer=function(){this.orientationSupport&&0===this.orientationStatus&&(this.disable(),this.orientationSupport=!1,this.enable())},i.prototype.onCalibrationTimer=function(){this.calibrationFlag=!0},i.prototype.onWindowResize=function(){this.updateDimensions()},i.prototype.onAnimationFrame=function(){this.updateBounds();var t=this.ix-this.cx,i=this.iy-this.cy;(Math.abs(t)>this.calibrationThreshold||Math.abs(i)>this.calibrationThreshold)&&this.queueCalibration(0),this.portrait?(this.mx=this.calibrateX?i:this.iy,this.my=this.calibrateY?t:this.ix):(this.mx=this.calibrateX?t:this.ix,this.my=this.calibrateY?i:this.iy),this.mx*=this.ew*(this.scalarX/100),this.my*=this.eh*(this.scalarY/100),isNaN(parseFloat(this.limitX))||(this.mx=this.clamp(this.mx,-this.limitX,this.limitX)),isNaN(parseFloat(this.limitY))||(this.my=this.clamp(this.my,-this.limitY,this.limitY)),this.vx+=(this.mx-this.vx)*this.frictionX,this.vy+=(this.my-this.vy)*this.frictionY;for(var e=0,s=this.layers.length;e<s;e++){var n=this.layers[e],o=this.depths[e],r=this.vx*o*(this.invertX?-1:1),a=this.vy*o*(this.invertY?-1:1);this.setPosition(n,r,a)}this.raf=requestAnimationFrame(this.onAnimationFrame)},i.prototype.onDeviceOrientation=function(t){
// Validate environment and event properties.
if(!this.desktop&&null!==t.beta&&null!==t.gamma){
// Set orientation status.
this.orientationStatus=1;
// Extract Rotation
var i=(t.beta||0)/n,e=(t.gamma||0)/n,s=this.wh>this.ww;//  -90 :: 90
this.portrait!==s&&(this.portrait=s,this.calibrationFlag=!0),
// Set Calibration
this.calibrationFlag&&(this.calibrationFlag=!1,this.cx=i,this.cy=e),
// Set Input
this.ix=i,this.iy=e}},i.prototype.onMouseMove=function(t){
// Cache mouse coordinates.
var i=t.clientX,e=t.clientY;
// Calculate Mouse Input
!this.orientationSupport&&this.relativeInput?(
// Clip mouse coordinates inside element bounds.
this.clipRelativeInput&&(i=Math.max(i,this.ex),i=Math.min(i,this.ex+this.ew),e=Math.max(e,this.ey),e=Math.min(e,this.ey+this.eh)),
// Calculate input relative to the element.
this.ix=(i-this.ex-this.ecx)/this.erx,this.iy=(e-this.ey-this.ecy)/this.ery):(
// Calculate input relative to the window.
this.ix=(i-this.wcx)/this.wrx,this.iy=(e-this.wcy)/this.wry)},
// Expose Parallax
m[t]=i}(window,document),function(){for(var o=0,t=["ms","moz","webkit","o"],i=0;i<t.length&&!window.requestAnimationFrame;++i)window.requestAnimationFrame=window[t[i]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[i]+"CancelAnimationFrame"]||window[t[i]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,i){var e=(new Date).getTime(),s=Math.max(0,16-(e-o)),n=window.setTimeout(function(){t(e+s)},s);return o=e+s,n}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}();