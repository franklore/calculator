var input = document.querySelector('#input');
var output = document.querySelector('#output');
var btns = document.querySelectorAll('button');
var gender = document.querySelector('#gender');

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
        wife: '',
        sister: ['表姐妹'],
    },

    '表姐妹': {
        father: '姑父',
        husband: '',
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
        wife: '',
        sister: ['堂姐妹'],
    },

    '堂姐妹': {
        father: '伯父',
        husband: '',
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
        brother: ['伯父', '叔父'],
        sister: ['姑妈'],
    },
    '母亲': {
        father: '外祖父',
        husband: '父亲',
        brother: ['舅舅'],
        sister: ['姨妈'],
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
        wife: '',
        sister: ['侄女'],
    },

    '侄女': {
        father: '哥哥',
        husband: '',
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
        wife: '',
        sister: ['外甥女'],
    },

    '外甥女': {
        father: '姐夫',
        husband: '',
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
        brother: ['哥哥', '弟弟'],
        sister: ['姐姐', '妹妹'],
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
        sister: ['女儿'],
        offspring: '孙子',
    },
    '儿媳': {
        husband: '儿子',
    },

    '孙子': {
        father: '儿子',
        wife: '',
        sister: ['孙女'],
    },

    '孙女': {
        father: '儿子',
        husband: '',
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
        wife: '',
        sister: ['外孙女'],
    },

    '外孙女': {
        father: '女婿',
        husband: '',
    },
}

gender.onchange = () => {
    if (gender.value === 'male') {
        data['我'].wife = '妻子';
        data['我'].offspring = '儿子';
        delete data['我'].husband;

        data['儿子'].father = '我';
        data['女儿'].father = '我';
    } else {
        data['我'].husband = '丈夫';
        delete data['我'].wife;
        delete data['我'].offspring;

        data['儿子'].father = '丈夫';
        data['女儿'].father = '丈夫';
    }
};
gender.onchange();

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

function isOffspring(str) {
    return data[str].brother || data[str].sister;
}

function offspringElder(offspring, str) {
    if (data[offspring][str]) {
        return data[offspring][str][0];
    } else {
        return offspring;
    }
}

function offspringYounger(offspring, str) {
    if (data[offspring][str] && data[offspring][str] == 2) {
        return data[offspring][str][1];
    } else if (data[offspring][str] && data[offspring][str] == 1) {
        return data[offspring][str][0];
    } else {
        return offspring;
    }
}

function offspringSibilings(offspring, str, self) {
    if (data[offspring][str]) {
        if (self && data[offspring][str == 'brother' ? 'wife' : 'husband']) {
            return data[offspring][str].concat([offspring]);
        } else {
            return data[offspring][str];
        }
    } else {
        return [offspring];
    }
}

function compareRelation(offspring, str, f1, f2, f3) {
    if (data[offspring][str] && data[offspring][str].length == 2 && current === data[offspring][str][0]) {
        f1();
    } else if (data[offspring][str] && data[offspring][str].length == 2 && current === data[offspring][str][1]) {
        f2();
    } else if (data[offspring][str]) {
        f3();
    }
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
                if (element.id === 'son' && data[offspring].brother) {
                    var children = data[offspring].brother.slice();
                } else
                if (element.id === 'daughter' && data[offspring].sister) {
                    var children = data[offspring].sister.slice();
                } else {
                    var children = [];
                }
                if ((element.id === 'son' && data[offspring].wife !== undefined) ||
                    (element.id === 'daughter' && data[offspring].husband !== undefined)) {
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
            element.onclick = () => {
                if (isOffspring(current)) {
                    setCurrent(offspringElder(current, 'brother'), element.id);
                } else {
                    let sibiling = data[data[current].father].offspring;
                    if (data[current].wife) {
                        compareRelation(sibiling, 'brother',
                            () => {
                                setCurrent(current, element.id);
                            },
                            () => {
                                alert(offspringSibilings(sibiling, 'brother', true));
                            },
                            () => {
                                alert(offspringSibilings(sibiling, 'brother', true));
                            }, );
                    } else {
                        compareRelation(sibiling, 'sister',
                            () => {
                                setCurrent(offspringElder(sibiling, 'brother'), element.id);
                            },
                            () => {
                                let brothers = offspringSibilings(sibiling, 'brother', true);
                                if (brothers.length === 1) {
                                    setCurrent(brothers[0], element.id);
                                } else {
                                    alert(brothers);
                                }
                            },
                            () => {
                                let brothers = offspringSibilings(sibiling, 'brother', true);
                                if (brothers.length === 1) {
                                    setCurrent(brothers[0], element.id);
                                } else {
                                    alert(brothers);
                                }
                            }, );
                    }
                }
            };
            break;
        case 'elder_sister':
            element.onclick = () => {
                if (isOffspring(current)) {
                    setCurrent(offspringElder(current, 'sister'), element.id);
                } else {
                    let sibiling = data[data[current].father].offspring;
                    if (data[current].husband) {
                        compareRelation(sibiling, 'sister',
                            () => {
                                setCurrent(current, element.id);
                            },
                            () => {
                                alert(offspringSibilings(sibiling, 'sister', true));
                            },
                            () => {
                                alert(offspringSibilings(sibiling, 'sister', true));
                            }, );
                    } else {
                        compareRelation(sibiling, 'brother',
                            () => {
                                setCurrent(offspringElder(sibiling, 'sister'), element.id);
                            },
                            () => {
                                let sisters = offspringSibilings(sibiling, 'sister', true);
                                if (sisters.length === 1) {
                                    setCurrent(sisters[0], element.id);
                                } else {
                                    alert(sisters);
                                }
                            },
                            () => {
                                let sisters = offspringSibilings(sibiling, 'sister', true);
                                if (sisters.length === 1) {
                                    setCurrent(sisters[0], element.id);
                                } else {
                                    alert(sisters);
                                }
                            }, );
                    }
                }
            };
            break;
        case 'younger_brother':
            element.onclick = () => {
                if (isOffspring(current)) {
                    setCurrent(offspringYounger(current, 'brother'), element.id);
                } else {
                    let sibiling = data[data[current].father].offspring;
                    if (data[current].wife) {
                        compareRelation(sibiling, 'brother',
                            () => {
                                alert(offspringSibilings(sibiling, 'brother', true));
                            },
                            () => {
                                setCurrent(current, element.id);
                            },
                            () => {
                                alert(offspringSibilings(sibiling, 'brother', true));
                            }, );
                    } else {
                        compareRelation(sibiling, 'sister',
                            () => {
                                let brothers = offspringSibilings(sibiling, 'brother', true);
                                if (brothers.length === 1) {
                                    setCurrent(brothers[0], element.id);
                                } else {
                                    alert(brothers);
                                }
                            },
                            () => {
                                setCurrent(offspringYounger(sibiling, 'brother'), element.id);
                            },
                            () => {
                                let brothers = offspringSibilings(sibiling, 'brother', true);
                                if (brothers.length === 1) {
                                    setCurrent(brothers[0], element.id);
                                } else {
                                    alert(brothers);
                                }
                            }, );
                    }
                }
            };
            break;
        case 'younger_sister':
            element.onclick = () => {
                if (isOffspring(current)) {
                    setCurrent(offspringYounger(current, 'sister'), element.id);
                } else {
                    let sibiling = data[data[current].father].offspring;
                    if (data[current].husband) {
                        compareRelation(sibiling, 'sister',
                            () => {
                                alert(offspringSibilings(sibiling, 'sister', true));
                            },
                            () => {
                                setCurrent(current, element.id);
                            },
                            () => {
                                alert(offspringSibilings(sibiling, 'sister', true));
                            }, );
                    } else {
                        compareRelation(sibiling, 'brother',
                            () => {
                                let sisters = offspringSibilings(sibiling, 'sister', true);
                                if (sisters.length === 1) {
                                    setCurrent(sisters[0], element.id);
                                } else {
                                    alert(sisters);
                                }
                            },
                            () => {
                                setCurrent(offspringYounger(sibiling, 'sister'), element.id);
                            },
                            () => {
                                let sisters = offspringSibilings(sibiling, 'sister', true);
                                if (sisters.length === 1) {
                                    setCurrent(sisters[0], element.id);
                                } else {
                                    alert(sisters);
                                }
                            }, );
                    }
                }
            };
            break;
        default:
            break;
    }
});