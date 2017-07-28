var historyDiv = document.querySelector("#history");
var deleteBtn = document.querySelector("#delete");
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
    if (historyDiv.childElementCount > maxHistory + 1) {
        let first = document.querySelectorAll('#history>p')[0];
        delete his[first.textContent];
        historyDiv.removeChild(first);
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

deleteBtn.onclick = () => {
    let first = document.querySelectorAll('#history>p');
    if (first.length >= 1) {
        first = first[0];
        var his = localStorage.getItem(historyIetm);
        if (his) {
            his = JSON.parse(his);
            delete his[first.textContent];
            localStorage.setItem(historyIetm, JSON.stringify(his));
        }
        delete his[first.textContent];
        historyDiv.removeChild(first);
    }
};