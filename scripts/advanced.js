var btn = document.querySelectorAll(".button");
var past = document.querySelector("#past-input");
var current = document.querySelector("#current-input");
var sta = {
dotted: false,
minus: false,
equaled: false,
functioned: false,
brBalance: 0,
clear: function() {
	this.dotted = false;
	this.minus = false;
	this.equaled = false;
	this.brBalance = 0;
	this.functioned = false;
}
};

var operator = {
	divide: '/',
	multiply: '*',
	plus: '+',
	minus: '-',
	pow: '**',
}

sin = Math.sin;
cos = Math.cos;
tan = Math.tan;
pow = Math.pow;
exp = Math.exp;
log = Math.log;
sqrt = Math.sqrt;
sq = (x) => x*x;
fact = function(x) {
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



function currentToPast() {
if (sta.equaled) {
	sta.clear();
	current.textContent = 0;
} else if (current.textContent[0] === "-") {
	past.textContent += "(" + current.textContent + ")";
} else {
	past.textContent += current.textContent;
}
current.textContent = 0;
}

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
			if (sta.equaled) {
			current.textContent = k.id[3];
			past.textContent = "";
			sta.clear();
			} else if (sta.functioned) {

			} else if (current.textContent === "0") {
			current.textContent = k.id[3];
			} else {
			current.textContent += k.id[3];
			}
		};
		break;
		case "point":
		k.onclick = () => {
			if (sta.equaled) {

			} 
			else if (!sta.dotted) {
			current.textContent += ".";
			sta.dotted = true;
			}
		};
		break;
		case "plusminus":
		k.onclick = () => {
			if (sta.equaled) {
			sta.clear();
			past.textContent = "";
			}
			if (!sta.minus) {
			current.textContent = "-" + current.textContent;
			sta.minus = true;
			} else {
			current.textContent = current.textContent.substring(1);
			sta.minus = false;
			}
		};
		break;
		case "divide":
		case "multiply":
		case "minus":
		case "plus":
		case "pow":
		k.onclick = () => {
			currentToPast();
			past.textContent += operator[k.id];
			sta.clear();
		};
		break;
		case "equal":
		k.onclick = () => {
			if (sta.brBalance !== 0) {
				past.textContent = '';
				current.textContent = 'error';
			}
			else {
				currentToPast();
				past.textContent = eval(past.textContent);
				current.textContent = past.textContent;
			}
			sta.equaled = true;
		};
		break;
		case "CE":
		k.onclick = () => {
			current.textContent = 0;
		};
		break;
		case "C":
		k.onclick = () => {
			past.textContent = "";
			current.textContent = 0;
		};
		break;
		case "erase":
		k.onclick = () => {
			if (sta.equaled) {
			} else if (
			current.textContent === "0" &&
			past.textContent.length >= 1
			) {
			past.textContent = past.textContent.substr(
				0,
				past.textContent.length - 1
			);
			} else if (current.textContent.length === 1) {
			current.textContent = 0;
			} else {
			current.textContent = current.textContent.substr(
				0,
				current.textContent.length - 1
			);
			}
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
			if (sta.equaled) {
				sta.clear();
				past.textContent = '';
			}
			current.textContent = k.id + '(' + current.textContent + ')';
			sta.functioned = true;
		}
		break;

		case 'leftbr':
		case 'rightbr':
		k.onclick = () => {
			if (sta.equaled) {

			}
			else if (k.id === 'leftbr') {
				sta.brBalance += 1;
				past.textContent += '(';
			}
			else if (k.id === 'rightbr') {
				sta.brBalance -= 1;
				currentToPast();
				past.textContent += ')';
				sta.equaled = true;
			}
		}
		
	}
}
