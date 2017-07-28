var btn = document.querySelectorAll("button");
var input = document.querySelector("#input");
var output = document.querySelector("#output");

var canvasDiv = document.querySelector('#canvas-div');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var minX = document.querySelector('#minX'),
	maxX = document.querySelector('#maxX'),
	minY = document.querySelector('#minY'),
	maxY = document.querySelector('#maxY');
var width, height;

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
	dotNumber: 1000,
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
	ctx.moveTo(-width / 2, 0);
	ctx.lineTo(width / 2, 0);
	ctx.moveTo(0, height / 2);
	ctx.lineTo(0, -height / 2);
	ctx.stroke();
	ctx.closePath();

	if (!img.expr) {
		return;
	}
	var f = (x) => eval(img.expr);
	ctx.strokeStyle = 'grey';
	ctx.beginPath();
	ctx.moveTo(minX.value, f(minX.value));
	for (let x = Number(minX.value); x < maxY.value; x += (maxX.value - minX.value) / img.dotNumber) {
		ctx.lineTo(x, f(x));
	}
	ctx.stroke();
}

function redraw() {
	width = canvas.width;
	height = canvas.height;

	ctx.clearRect(0, 0, width, height);
	ctx.save();
	ctx.scale(1, -1);
	ctx.scale(width / (maxX.value - minX.value), height / (maxY.value - minY.value));
	ctx.translate(-minX.value, -maxY.value);

	ctx.lineWidth = 1 / Math.max(width / (maxX.value - minX.value), height / (maxY.value - minY.value))
	drawFunction()

	ctx.restore();
	window.requestAnimationFrame(redraw);
}
redraw();

var inputHistory = [''];

function retriveHistory() {
	input.textContent += this.dataset.ans;
}
historyIetm = 'advanced_history';
initHistory();

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
					saveHistory(input.textContent, input.textContent);
					img.expr = input.textContent;
					output.textContent = '';
				} else {
					saveHistory(input.textContent + '=' + eval(input.textContent), eval(input.textContent));
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