var input = document.querySelector('#input');
var output = document.querySelector('#output');
var btns = document.querySelectorAll('button');
var male = document.querySelector('#male');
var female = document.querySelector('#female');

var data = {
    '祖父': {
        wife: '祖母',
        offspring: '父亲',
    },
    '祖母': {
        husband: '祖父',
    },

    '姑妈': {
        father: '祖父',
        husband: '姑父',
    },
    '姑父': {
        wife: '姑妈',
        offspring: '表兄弟',
    },

    '表兄弟': {
        father: '姑父',
        elder_sister: '表姐妹',
        younger_sister: '表姐妹',
    },

    '表姐妹': {
        father: '姑父',
    },


    '叔父': {
        father: '祖父',
        wife: '婶婶',
        offspring: '堂兄弟',
    },
    '婶婶': {
        husband: '叔父',
    },

    '堂兄弟': {
        father: '伯父',
        elder_sister: '堂姐妹',
        younger_sister: '堂姐妹',
    },

    '堂姐妹': {
        father: '伯父',
    },

    '伯父': {
        father: '祖父',
        wife: '伯母',
        offspring: '堂兄弟',
    },
    '伯母': {
        husband: '伯父',
    },

    '外祖父': {
        wife: '外祖母',
        offspring: '母亲',
    },
    '外祖母': {
        husband: '外祖父',
    },

    '姨妈': {
        father: '外祖父',
        husband: '姨夫',
    },
    '姨夫': {
        wife: '姑妈',
        offspring: '表兄弟',
    },

    '舅舅': {
        father: '外祖父',
        wife: '舅妈',
        offspring: '表兄弟',
    },
    '舅妈': {
        husband: '舅舅',
    },

    '父亲': {
        father: '祖父',
        wife: '母亲',
        offspring: '我',
        elder_brother: '伯父',
        younger_brother: '叔父',
        elder_sister: '姑妈',
        younger_sister: '姑妈',
    },
    '母亲': {
        father: '外祖父',
        husband: '父亲',
        elder_brother: '舅舅',
        younger_brother: '舅舅',
        elder_sister: '姨妈',
        younger_sister: '姨妈',
    },

    '哥哥': {
        father: '父亲',
        wife: '嫂子',
        offspring: '侄子',
    },
    '嫂子': {
        husband: '哥哥',
    },

    '侄子': {
        father: '哥哥',
        elder_brother: '侄子',
        younger_brother: '侄子',
        elder_sister: '侄女',
        younger_sister: '侄女',
    },

    '侄女': {
        father: '哥哥',
    },

    '弟弟': {
        father: '父亲',
        wife: '弟媳',
        offspring: '侄子',
    },
    '弟媳': {
        husband: '弟弟',
    },

    '姐姐': {
        father: '父亲',
        husband: '姐夫',
    },
    '姐夫': {
        wife: '姐姐',
        offspring: '外甥',
    },

    '外甥': {
        father: '姐夫',
        elder_brother: '外甥',
        younger_brother: '外甥',
        elder_sister: '外甥女',
        younger_sister: '外甥女',
    },

    '外甥女': {
        father: '姐夫',
    },

    '妹妹': {
        father: '父亲',
        husband: '妹夫',
    },
    '妹夫': {
        wife: '妹妹',
        offspring: '外甥',
    },

    '我': {
        father: '父亲',
        //imcomplete
        elder_brother: '哥哥',
        younger_brother: '弟弟',
        elder_sister: '姐姐',
        younger_sister: '妹妹',
    },

    '妻子': {
        father: '外祖父',
        husband: '我',
    },
    '丈夫': {
        father: '祖父',
        wife: '我',
        offspring: '儿子',
    },

    '儿子': {
        // imcomplete
        wife: '儿媳',
        elder_brother: '儿子',
        younger_brother: '儿子',
        elder_sister: '女儿',
        younger_sister: '女儿',
        offspring: '孙子',
    },
    '儿媳': {
        husband: '儿子',
    },

    '孙子': {
        father: '儿子',
        elder_sister: '孙女',
        younger_sister: '孙女',
    },

    '孙女': {
        father: '儿子',
    },

    '女儿': {
        // imcomplete
        husband: '女婿',
    },
    '女婿': {
        wife: '女儿',
        offspring: '外孙',
    },

    '外孙': {
        father: '女婿',
        elder_sister: '外孙女',
        younger_sister: '外孙女',
    },

    '外孙女': {
        father: '女婿',
    },
}

male.onclick = () => {
    data['我'].wife = '妻子';
    data['我'].offspring = '儿子';
    delete data['我'].husband;

    data['儿子'].father = '我';
    data['女儿'].father = '我';
}
female.onclick = () => {
    data['我'].husband = '丈夫';
    delete data['我'].wife;
    delete data['我'].offspring;

    data['儿子'].father = '丈夫';
    data['女儿'].father = '丈夫';
}

if (male.checked) {
    male.onclick();
} else if (female.checked) {
    female.onclick();
}

var str = {
    father: '父亲',
    mother: '母亲',
    husband: '丈夫',
    wife: '妻子',
    elder_brother: '哥哥',
    younger_brother: '弟弟',
    elder_sister: '姐姐',
    younger_sister: '妹妹',
    son: '儿子',
    daughter: '女儿',
};

var current = '我';
var currentHistory = [];
var inputHistory = [];

function setCurrent(c, param) {
    currentHistory.push(current);
    current = c;
    inputHistory.push(input.textContent);
    input.textContent += '的' + str[param];
}

btns.forEach((element) => {
    switch (element.id) {
        case 'C':
            element.onclick = () => {
                input.textContent = '我';
                inputHistory = [];
                current = '我';
                currentHistory = [];
                output.textContent = '';
            };
            break;
        case 'erase':
            element.onclick = () => {
                if (currentHistory.length && inputHistory.length) {
                    current = currentHistory.pop();
                    input.textContent = inputHistory.pop();
                }
            };
            break;
        case 'equal':
            element.onclick = () => {
                output.textContent = current;
                input.textContent = '我';
                inputHistory = [];
                current = '我';
                currentHistory = [];
            };
            break;
        case 'father':
        case 'husband':
        case 'wife':
            element.onclick = () => {
                setCurrent(data[current][element.id], element.id);
            };
            break;
        case 'mother':
            element.onclick = () => {
                setCurrent(data[data[current].father].wife, 'mother');
            };
            break;
        case 'son':
        case 'daughter':
            element.onclick = () => {
                let offspring = data[current].wife ? data[current].offspring : data[data[current].husband].offspring;
                if (element.id === 'son' && data[offspring].elder_brother === data[offspring].younger_brother) {
                    var children = [data[offspring].elder_brother];
                } else
                if (element.id === 'daughter' && data[offspring].elder_sister === data[offspring].younger_sister) {
                    var children = [data[offspring].elder_sister];
                } else if (element.id === 'son') {
                    var children = [data[offspring].elder_brother, data[offspring].younger_brother];
                } else {
                    var children = [data[offspring].elder_sister, data[offspring].younger_sister];
                }
                if ((element.id === 'son' && data[offspring].wife && offscreenBuffering !== data[offspring].elder_brother) || (element.id === 'daughter' && data[offspring].husband)) {
                    children.push(offspring);
                }
                if (children.length === 1) {
                    setCurrent(children[0], element.id);
                } else {
                    alert(children);
                }
            };
            break;
        case 'elder_brother':
        case 'younger_brother':
        case 'elder_sister':
        case 'younger_sister':
            element.onclick = () => {
                if (data[current][element.id]) {
                    setCurrent(data[current][element.id], element.id);
                } else {
                    let sibiling = data[data[current].father].offspring;

                    if ((current === data[sibiling].elder_brother && element.id === 'elder_brother') ||
                        (current === data[sibiling].younger_brother && element.id === 'younger_brother') ||
                        (current === data[sibiling].elder_sister && element.id === 'elder_sister') ||
                        (current === data[sibiling].younger_sister && element.id === 'younger_sister')) {
                        setCurrent(current, element.id);
                    } else
                    if ((current === data[sibiling].elder_brother && element.id === 'elder_sister') ||
                        (current === data[sibiling].younger_brother && element.id === 'younger_sister') ||
                        (current === data[sibiling].elder_sister && element.id === 'elder_brother') ||
                        (current === data[sibiling].younger_sister && element.id === 'younger_brother')) {
                        setCurrent(data[sibiling][element.id], str[element.id]);
                    } else
                    if ((current === data[sibiling].elder_brother && element.id === 'younger_brother' && data[sibiling].husband) ||
                        (current === data[sibiling].younger_brother && element.id === 'elder_brother' && data[sibiling].husband) ||
                        (current === data[sibiling].elder_sister && element.id === 'younger_sister' && !data[sibiling].husband) ||
                        (current === data[sibiling].younger_sister && element.id === 'elder_sister' && !data[sibiling].husband)) {
                        setCurrent(data[sibiling][element.id], str[element.id]);
                    } else {
                        alert(sibiling + ' ' + data[sibiling][element.id]);
                    }
                }
            };
            break;
        default:
            break;
    }
});