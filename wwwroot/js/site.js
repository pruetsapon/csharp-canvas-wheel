// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


requestAnimationFrame(mainLoop);
Math.TAU = Math.PI * 2;
const size = 600;
const ctx = Object.assign(document.createElement("canvas"),{id: "mycanvas", width: size, height: size}).getContext("2d");
document.getElementById("canvas").appendChild(ctx.canvas);

var isSpin = false;
var isStart = true;
var randoms = Array(0.05,0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.55);

var options = [
  "images/1.png",
  "images/2.png",
  "images/1.png",
  "images/2.png",
  "images/1.png",
  "images/2.png",
  "images/1.png",
  "images/2.png",
  "images/1.png",
  "images/2.png"];

  options = options.map(x => { 
     var img = new Image();
     img.src = x;
     return img;
  });


var gTime;   // global time
const wheelSteps = options.length;
const minSpins = 6 * Math.TAU;  // min number of spins before stopping
const spinTime = 6000;          // in ms
const slowDownRate = 1 / 2.6;   // smaller this value the greater the ease in. 

const wheel = {  // hold wheel related variables
    img: createWheel(wheelSteps),
    endTime: performance.now() - 2000,
    set currentPos(val) {
        this.speed = (val - this.pos) / 2;  // for the wobble at stop
        this.pos = val;
    },
    set endAt(pos) {
        pos = getStop();
        this.endPos = (Math.TAU - (pos / wheelSteps) * Math.TAU) + minSpins + randoms[Math.floor(Math.random() * randoms.length)];;
        this.startPos = 0;
        this.endTime = gTime + spinTime;
        this.startTime = gTime;
    }
};

function getStop() {
    return 3;
}

function randomItem() {
    $('#spin').attr('disabled','disabled');
    isSpin = true;
    isStart = true;
    requestAnimationFrame(mainLoop);
}

function wheelPos(currentTime, startTime, endTime, startPos, endPos) {
    const x = ((currentTime - startTime) / (endTime - startTime)) ** slowDownRate;
    return x * (endPos - startPos) + startPos;
} 

function mainLoop(time) {
    gTime = time;
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0, 0, size, size);
    if (isStart) { // spin again
        wheel.endAt =  Math.random() * wheelSteps | 0;
        isStart = false;
    } else if (time <= wheel.endTime) { // wheel is spinning get pos
        wheel.currentPos = wheelPos(time, wheel.startTime, wheel.endTime, wheel.startPos, wheel.endPos);
    } else { // wobble at stop
        wheel.speed += (wheel.endPos - wheel.pos) * 0.25;
        wheel.speed *= 0.9;
        wheel.pos += wheel.speed;
        isSpin = false;
        $('#spin').removeAttr('disabled');
    }

    // draw wheel
    ctx.setTransform(1,0,0,1,size / 2, size / 2);
    ctx.rotate(wheel.pos);
    ctx.drawImage(wheel.img, -size / 2 , - size / 2);

    // draw marker
    ctx.setTransform(1,0,0,1,0,0);
    ctx.fillStyle = "#F00";
    ctx.beginPath();
    ctx.lineTo(size - 13, size / 2);
    ctx.lineTo(size, size / 2 - 7);
    ctx.lineTo(size, size / 2 + 7);
    ctx.fill();

    if(isSpin) {
        requestAnimationFrame(mainLoop);
    }
}


function createWheel(steps) {
    const ctx = Object.assign(document.createElement("canvas"),{id: "mycanvas", width: size, height: size}).getContext("2d");
    const s = size, s2 = s / 2, r = s2 - 4;

    var outsideRadius = r;
    var textRadius = 160;
    var insideRadius = 60;

    var gradient = ctx.createLinearGradient(0, 0, size, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // Fill with gradient
    ctx.strokeStyle = gradient;
    // ctx.strokeStyle = "black";
    ctx.lineWidth = 0.5;
    ctx.font = 'bold 12px Helvetica, Arial';


    var startAngle = 0;
    var arc = Math.PI / (options.length / 2);

    for(var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;
      //ctx.fillStyle = colors[i];
      ctx.fillStyle = getColor(i, options.length);

      ctx.beginPath();
      ctx.arc(s2, s2, outsideRadius, angle, angle + arc, false);
      ctx.arc(s2, s2, insideRadius, angle + arc, angle, true);
      ctx.fill("evenodd");
      ctx.stroke();

      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur    = 0;
      ctx.shadowColor   = "rgb(220,220,220)";
      ctx.fillStyle = "black";
      ctx.translate(s2 + Math.cos(angle + arc / 2) * textRadius, s2 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var img = options[i];
        ctx.drawImage(img, -38, -100, 80, 80);
      // var text = i + 1;
      // ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }
    return ctx.canvas;
}

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
  var phase = 0;
  var center = 128;
  var width = 127;
  var frequency = Math.PI*2/maxitem;

  red   = Math.sin(frequency*item+2+phase) * width + center;
  green = Math.sin(frequency*item+0+phase) * width + center;
  blue  = Math.sin(frequency*item+4+phase) * width + center;

  return RGB2Color(red,green,blue);
}