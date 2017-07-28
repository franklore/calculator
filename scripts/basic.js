var btn = document.querySelectorAll("button");
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



var historyDiv = document.querySelector("#history");
const maxHistory = 10;

function retriveHistory() {
    current.textContent = this.dataset.ans;
}

function currentToPast() {
    if (current.textContent[0] === "-") {
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
                if (current.textContent === "0") {
                    current.textContent = k.id[3];
                } else {
                    current.textContent += k.id[3];
                }
            };
            break;
        case "point":
            k.onclick = () => {
                current.textContent += ".";
            };
            break;
        case "plusminus":
            k.onclick = () => {
                if (current.textContent[0] !== "-") {
                    current.textContent = "-" + current.textContent;
                } else {
                    current.textContent = current.textContent.substring(1);
                }
            };
            break;
        case "divide":
            k.onclick = () => {
                currentToPast();
                past.textContent += "/";
            };
            break;
        case "multiply":
            k.onclick = () => {
                currentToPast();
                past.textContent += "*";
            };
            break;
        case "minus":
            k.onclick = () => {
                currentToPast();
                past.textContent += "-";
            };
            break;
        case "plus":
            k.onclick = () => {
                currentToPast();
                past.textContent += "+";
            };
            break;
        case "equal":
            k.onclick = () => {
                currentToPast();
                var p = document.createElement('p');
                p.textContent = past.textContent + '=' + eval(past.textContent);
                p.dataset.ans = eval(past.textContent);
                p.onclick = retriveHistory;
                historyDiv.appendChild(p);
                if (historyDiv.childElementCount > maxHistory) {
                    historyDiv.removeChild(historyDiv.firstElementChild);
                }
                past.textContent = eval(past.textContent);
                current.textContent = 0;
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
                if (current.textContent === "0" && past.textContent.length >= 1) {
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
    }
}
