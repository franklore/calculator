var historyDiv = document.querySelector("#history");
const maxHistory = 10;
var historyIetm;

function saveHistory(str, data) {
    var p = document.createElement('p');
    p.textContent = str;
    p.dataset.ans = data;
    p.onclick = retriveHistory;
    historyDiv.appendChild(p);

    var his = localStorage.getItem(historyIetm);
    if (!his) {
        his = {};
    } else {
        his = JSON.parse(his);
    }
    if (historyDiv.childElementCount > maxHistory) {
        delete his[historyDiv.firstElementChild.textContent];
        historyDiv.removeChild(historyDiv.firstElementChild);
    }
    his[str] = data;
    localStorage.setItem(historyIetm, JSON.stringify(his));
}

function initHistory() {
    var his = localStorage.getItem(historyIetm);
    if (his) {
        his = JSON.parse(his);
        localStorage.removeItem(historyIetm);
    } else {
        return;
    }
    for (str in his) {
        saveHistory(str, his[str]);
    }
}