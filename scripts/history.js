var historyDiv = document.querySelector("#history");
const maxHistory = 10;

function saveHistory(str, data) {
    var p = document.createElement('p');
    p.textContent = str;
    p.dataset.ans = data;
    p.onclick = retriveHistory;
    historyDiv.appendChild(p);
    if (historyDiv.childElementCount > maxHistory) {
        historyDiv.removeChild(historyDiv.firstElementChild);
    }
}