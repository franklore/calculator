var input = document.querySelector('#input');
var btns = document.querySelectorAll('button');

var data = {
    '祖父': {
        wife: '祖母',
        son: ['叔父', '伯父', '父亲'],
        daughter: ['姑妈'],
    },
    '祖母': {
        husband: '祖父',
    },

    '姑妈': {
        father: '祖父',
        husband: '姑丈',
        elder_brother: ['叔父', '伯父', '父亲'],
        younger_brother: ['叔父', '伯父', '父亲'],
        elder_sister: ['姑妈'],
        younger_sister: ['姑妈'],
    },
    '姑丈': {
        wife: '姑妈',
    },

    '叔父': {
        father: '祖父',
        wife: '婶婶',
        elder_brother: ['叔父', '伯父', '父亲'],
        younger_brother: ['叔父', '伯父', '父亲'],
        elder_sister: ['姑妈'],
        younger_sister: ['姑妈'],
    },
    '婶婶': {
        husband: '叔父',
    },

    '伯父': {
        father: '祖父',
        wife: '伯母',
        elder_brother: ['伯父'],
        younger_brother: ['叔父', '伯父', '父亲'],
        elder_sister: ['姑妈'],
        younger_sister: ['姑妈'],
    },
    '伯母': {
        husband: '伯父',
    },

    '外祖父': {
        wife: '外祖母',
        son: ['舅舅'],
        daughter: ['母亲', '姨妈'],
    },
    '外祖母': {
        husband: '外祖父',
    },

    '姨妈': {
        father: '外祖父',
        husband: '姨夫',
        elder_brother: ['舅舅'],
        younger_brother: ['舅舅'],
        elder_sister: ['母亲', '姨妈'],
        younger_sister: ['母亲', '姨妈'],
    },
    '姨夫': {
        wife: '姑妈',
    },

    '舅舅': {
        father: '外祖父',
        wife: '婶婶',
        elder_brother: ['舅舅'],
        younger_brother: ['舅舅'],
        elder_sister: ['母亲', '姨妈'],
        younger_sister: ['母亲', '姨妈'],
    },
    '舅妈': {
        husband: '舅舅',
    },

    '父亲': {
        father: '祖父',
        wife: '母亲',
        elder_brother: ['伯父'],
        younger_brother: ['叔父'],
        elder_sister: ['姑妈'],
        younger_sister: ['姑妈'],
        son: ['哥哥', '弟弟', '我'],
        duaghter: ['姐姐', '妹妹', '我'],
    },
    '母亲': {
        husband: '父亲',
    },

    '哥哥': {
        father: '父亲',
        wife: '嫂子',
        elder_brother: ['哥哥'],
        younger_brother: ['弟弟', '我'],
        elder_sister: ['姐姐'],
        younger_sister: ['姐姐', '妹妹', '我'],
    },
    '嫂子': {
        husband: '哥哥',
    },

    '弟弟': {
        father: '父亲',
        wife: '弟媳',
        elder_brother: ['哥哥', '我'],
        younger_brother: ['弟弟'],
        elder_sister: ['姐姐', '我'],
        younger_sister: ['妹妹'],
    },
    '弟媳': {
        husband: '弟弟',
    },

    '姐姐': {
        father: '父亲',
        husband: '姐夫',
        elder_brother: ['哥哥'],
        younger_brother: ['弟弟', '我'],
        elder_sister: ['姐姐'],
        younger_sister: ['姐姐', '妹妹', '我'],
    },
    '姐夫': {
        wife: '姐姐',
    },

    '妹妹': {
        father: '父亲',
        husband: '妹夫',
        elder_brother: ['哥哥', '弟弟', '我'],
        younger_brother: ['弟弟'],
        elder_sister: ['姐姐', '妹妹', '我'],
        younger_sister: ['妹妹'],
    },
    '妹夫': {
        wife: '妹妹',
    },

    '我': {
        father: '父亲',
        husband: '妹夫',
        elder_brother: ['哥哥', '弟弟', '我'],
        younger_brother: ['弟弟'],
        elder_sister: ['姐姐', '妹妹', '我'],
        younger_sister: ['妹妹'],
    },
    '丈夫': {
        wife: '我',
        son: ['儿子'],
        duaghter: ['女儿'],
    },
    '妻子': {
        husband: '我', 
    },
}