var btn = document.querySelectorAll("button");
var past = document.querySelector("#past-input");
var current = document.querySelector("#current-input");

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
