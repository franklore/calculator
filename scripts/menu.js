var leftbar = document.querySelector('#leftbar');
var menu = document.querySelector('#menu');

document.querySelector('#leftbar p').onclick = () => {
    if (menu.style.transform) {
        menu.style.transform = '';
    } else {
        let length = leftbar.clientWidth + menu.clientWidth;
        menu.style.transform = 'translateX(' + length + 'px)';
    }
}

var frame = document.querySelector('iframe');
document.querySelectorAll('#menu li').forEach((element) => {
    element.onclick = () => {
        frame.src = element.id + '.html';
    }
})