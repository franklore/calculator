var btn = document.querySelectorAll('button');
var result = document.querySelector('#screen');
var str = '';
for (let k of btn) {
    k.onclick = function() {
        console.log(k.id);
        switch(k.id) {
            case 'num0': 
            case 'num1':
            case 'num2':
            case 'num3':
            case 'num4':
            case 'num5':
            case 'num6':
            case 'num7':
            case 'num8':
            case 'num9': str += k.id[3]; console.log(str); break;
            case 'point': str += '.'; console.log(str); break;
            case 'plisminus': break;
            case 'divide': str += '/'; break;
            case 'multiply': str += '*'; break;
            case 'minus': str += '-'; break;
            case 'plus': str += '+'; break;
            case 'equal': result.innerHTML = eval(str); str = eval(str); break;
            case 'CE': str = ''; result.innerHTML = 0; break;
            case 'C': str = ''; result.innerHTML = 0; break;
            case 'erase': str = str.substr(0,str.length - 1); break;

        }
    }
}