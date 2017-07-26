var input = document.querySelector('#input');
var output = document.querySelector('#output');
var btns = document.querySelectorAll('button');
var male = document.querySelector('#male');
var female = document.querySelector('#female');

var data = {
    '祖父': {
        wife: '祖母',
        son: '父亲',
        daughter: '姑妈',
    },
    '祖母': {
        husband: '祖父',
    },

    '姑妈': {
        father: '祖父',
        husband: '姑丈',
    },
    '姑丈': {
        wife: '姑妈',
    },

    '叔父': {
        father: '祖父',
        wife: '婶婶',
    },
    '婶婶': {
        husband: '叔父',
    },

    '伯父': {
        father: '祖父',
        wife: '伯母',
    },
    '伯母': {
        husband: '伯父',
    },

    '外祖父': {
        wife: '外祖母',
        son: '舅舅',
        daughter: '母亲',
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
    },

    '舅舅': {
        father: '外祖父',
        wife: '舅妈',
    },
    '舅妈': {
        husband: '舅舅',
    },

    '父亲': {
        father: '祖父',
        wife: '母亲',
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
    },
    '嫂子': {
        husband: '哥哥',
    },

    '弟弟': {
        father: '父亲',
        wife: '弟媳',
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
    },

    '妹妹': {
        father: '父亲',
        husband: '妹夫',
    },
    '妹夫': {
        wife: '妹妹',
    },

    '我': {
        father: '父亲',
        wife: '妻子',
        son: '儿子',
        daughter: '女儿',
        elder_brother: '哥哥',
        younger_brother: '弟弟',
        elder_sister: '姐姐',
        younger_sister: '妹妹',
    },
    '妻子': {
        husband: '我',
    },
}

male.onclick = () => {
    data['父亲'].son = '我';
    delete data['父亲'].daughter;

    data['我'].wife = '妻子';
    data['我'].son = '儿子';
    data['我'].daughter = '女儿';
    delete data['我'].husband;

    data['妻子'] = {
        father: '外祖父',
        husband: '我',
    };

    delete data['丈夫'];
}
female.onclick = () => {
    data['父亲'].daughter = '我';
    delete data['父亲'].son;

    data['我'].husband = '丈夫';
    delete data['我'].wife;
    delete data['我'].son;
    delete data['我'].daughter;

    data['丈夫'] = {
        father: '祖父',
        wife: '我',
        son: '儿子',
        duaghter: '女儿',
    };

    delete data['妻子'];
}

if (male.checked) {
    male.click();
} else {
    female.click();
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
btns.forEach((element) => {
    switch (element.id) {
        case 'C':
            element.onclick = () => {
                input.textContent = '我';
                current = '我';
                output.textContent = '';
            };
            break;
        case 'erase':
            element.onclick = () => {
                if (input.textContent.length <= 2) {
                    input.textContent == '我';
                } else {
                    input.textContent = input.textContent.substr(0, input.textContent.length - 3);
                }
            };
            break;
        case 'equal':
            element.onclick = () => {
                output.textContent = current;
                input.textContent = '我';
                current = '我';
            };
            break;
        case 'father':
        case 'husband':
        case 'wife':
            element.onclick = () => {
                input.textContent += '的' + str[element.id];
                current = data[current][element.id];
            };
            break;
        case 'mother':
            element.onclick = () => {
                input.textContent += '的' + str['mother'];
                current = data[data[current].father].wife;
            };
            break;
        case 'son':
        case 'daughter':
            element.onclick = () => {
                input.textContent += '的' + str[element.id];
                if (data[current].wife) {
                    current = data[current][element.id];
                } else {
                    current = data[data[current].husband][element.id];
                }
            };
            break;
        case 'elder_brother':
        case 'younger_brother':
        case 'elder_sister':
        case 'younger_sister':
            element.onclick = () => {
                if (data[current][element.id]) {
                    current = data[current][element.id];
                    input.textContent += '的' + str[element.id];
                } else {
                    let father_data = data[data[current].father]
                    let sibiling;
                    if (father_data.son) {
                        sibiling = father_data.son;
                    } else {
                        sibiling = father_data.daughter;
                    }

                    if ((current === data[sibiling].elder_brother && element.id === 'elder_brother') ||
                        (current === data[sibiling].younger_brother && element.id === 'younger_brother') ||
                        (current === data[sibiling].elder_sister && element.id === 'elder_sister') ||
                        (current === data[sibiling].younger_sister && element.id === 'younger_sister')) {
                        current = current;
                        input.textContent += '的' + str[element.id];
                    } else
                    if ((current === data[sibiling].elder_brother && element.id === 'elder_sister') ||
                        (current === data[sibiling].younger_brother && element.id === 'younger_sister') ||
                        (current === data[sibiling].elder_sister && element.id === 'elder_brother') ||
                        (current === data[sibiling].younger_sister && element.id === 'younger_brother')) {
                        current = data[sibiling][element.id];
                        input.textContent += '的' + str[element.id];
                    } else
                    if ((current === data[sibiling].elder_brother && element.id === 'younger_brother' && data[sibiling].husband) ||
                        (current === data[sibiling].younger_brother && element.id === 'elder_brother' && data[sibiling].husband) ||
                        (current === data[sibiling].elder_sister && element.id === 'younger_sister' && !data[sibiling].husband) ||
                        (current === data[sibiling].younger_sister && element.id === 'elder_sister' && !data[sibiling].husband)) {
                        current = data[sibiling][element.id];
                        input.textContent += '的' + str[element.id];
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