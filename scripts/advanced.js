var btn = document.querySelectorAll("button");
var input = document.querySelector("#input");
var output = document.querySelector("#output");

var canvasDiv = document.querySelector('#canvas-div');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
const drawMin = 2000;
var width, height;
var drawMax, drawX, drawY;

var operator = {
	divide: '/',
	multiply: '*',
	plus: '+',
	minus: '-',
	pow: '**',
	leftbr: '(',
	rightbr: ')',
	point: '.',
}

var img = {
	translateX: 0,
	translateY: 0,
	dotNumber: 5000,
	expr: '',
}

sin = Math.sin;
cos = Math.cos;
tan = Math.tan;
pow = Math.pow;
exp = Math.exp;
log = Math.log;
sqrt = Math.sqrt;
sq = (x) => x * x;
fact = function (x) {
	if (Math.floor(x) !== x)
		return 0;
	if (x < 0)
		return 0;
	let s = 1;
	for (let i = 1; i <= x; i++) {
		s *= i;
	}
	return s;
}

function drawFunction() {
	ctx.strokeStyle = 'black';
	ctx.beginPath();
	ctx.moveTo(-drawX / 2, 0);
	ctx.lineTo(drawX / 2, 0);
	ctx.moveTo(0, drawY / 2);
	ctx.lineTo(0, -drawY / 2);
	ctx.stroke();
	ctx.closePath();

	if (!img.expr) {
		return;
	}
	var f = (x) => eval(img.expr);
	ctx.strokeStyle = 'grey';
	ctx.beginPath();
	ctx.moveTo(-drawX / 2, f(-drawX / 2));
	for (let x = -drawX / 2; x < drawX / 2; x += drawX / img.dotNumber) {
		ctx.lineTo(x, f(x));
	}
	ctx.stroke();
}


var tracking, startX, startY, endX, endY;
canvas.onmousedown = (e) => {
	tracking = true;
	startX = e.clientX;
	startY = e.clientY;
};
canvas.onmousemove = (e) => {
	if (tracking) {
		endX = e.clientX;
		endY = e.clientY;
	}
};
canvas.onmouseup = (e) => {
	img.translateX += endX - startX;
	img.translateY += endY - startY;
	tracking = false;
};

function redraw() {
	width = canvas.width = canvasDiv.clientWidth;
	height = canvas.height = canvasDiv.clientHeight;
	if (width >= height) {
		drawMax = drawMin * width / height;
		drawX = drawMax;
		drawY = drawMin;
	} else {
		drawMax = drawMin * height / width;
		drawX = drawMin;
		drawY = drawMax;
	}

	ctx.clearRect(0, 0, width, height);
	ctx.save();
	ctx.translate(img.translateX, img.translateY);
	ctx.translate(width / 2, height / 2);
	// ctx.scale(Math.min(width, height) / drawMin, -Math.min(width, height) / drawMin);
	ctx.scale(1, -1);

	drawFunction()

	ctx.restore();
	window.requestAnimationFrame(redraw);
}
redraw();

var inputHistory = [''];

for (let k of btn) {
	switch (k.id) {
		case "num0":
		case "num1":
		case "num2":
		case "num3":
		case "num4":
		case "num5":
		case "num6":
		case "num7":
		case "num8":
		case "num9":
			k.onclick = () => {
				inputHistory.push(input.textContent);
				input.textContent += k.id[3];
			};
			break;
		case "point":
		case "divide":
		case "multiply":
		case "minus":
		case "plus":
		case "pow":
		case 'leftbr':
		case 'rightbr':
			k.onclick = () => {
				inputHistory.push(input.textContent);
				input.textContent += operator[k.id];
			};
			break;
		case 'sin':
		case 'cos':
		case 'tan':
		case 'exp':
		case 'log':
		case 'sqrt':
		case 'fact':
			k.onclick = () => {
				inputHistory.push(input.textContent);
				input.textContent += k.id + '(';
			}
			break;
		case 'x':
		case 'E':
			k.onclick = () => {
				inputHistory.push(input.textContent);
				input.textContent += k.id;
			}
			break;
		case "equal":
			k.onclick = () => {
				if (input.textContent.includes('x')) {
					img.expr = input.textContent;
				} else {
					output.textContent = eval(input.textContent).toPrecision(4);
				}
			};
			break;
		case "C":
			k.onclick = () => {
				inputHistory = [];
				input.textContent = '';
				output.textContent = '';
			};
			break;
		case "erase":
			k.onclick = () => {
				if (inputHistory) {
					input.textContent = inputHistory.pop();
				}
			};
			break;
		case 'left':
		case 'right':
		case 'up':
		case 'down':
		case 'scalex':
		case 'scaley':
		case 'suox':
		case 'suoy':
			k.onclick = () => {}
			break;
	}
}