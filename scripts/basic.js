var btn = document.querySelectorAll("button");
var past = document.querySelector("#past-input");
var current = document.querySelector("#current-input");

var operator = {
    divide: '/',
    multiply: '*',
    plus: '+',
    minus: '-',
    pow: '**',
}

function retriveHistory() {
    current.textContent = this.dataset.ans;
}
historyIetm = 'basic_history';
initHistory();

var pastHistory = [];

function currentToPast() {
    pastHistory.push(past.textContent);
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
        case "multiply":
        case "minus":
        case "plus":
            k.onclick = () => {
                currentToPast();
                past.textContent += operator[k.id];
            };
            break;
        case "equal":
            k.onclick = () => {
                currentToPast();
                saveHistory(past.textContent + '=' + eval(past.textContent), eval(past.textContent));
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
                pastHistory = [];
                past.textContent = "";
                current.textContent = 0;
            };
            break;
        case "erase":
            k.onclick = () => {
                if (current.textContent === "0" && pastHistory.length >= 1) {
                    past.textContent = pastHistory.pop();
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