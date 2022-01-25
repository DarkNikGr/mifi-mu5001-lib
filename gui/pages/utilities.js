function calccolor(cur, l0, l1, l2, l3, l4, l5) {
    if (cur == '') return 'linear-gradient(to right, transparent 100%, transparent 100%)';
    if (cur < l0) cur = l0;
    if (cur > l5) cur = l5;
    var percent = parseInt((cur - l0) * 100 / (l5 - l0));
    var whitepercent = percent + 1;
    if (whitepercent > 100) whitepercent = 100;
    var color;
    if (cur >= l4) {
        color = '#00e000';
    } else if (cur >= l3) {
        color = '#a0e600';
    } else if (cur >= l2) {
        color = '#e6e600';
    } else if (cur >= l1) {
        color = '#ffa500';
    } else {
        color = '#f04040';
    }
    return 'linear-gradient(to right, ' + color + ' ' + percent + '%, transparent ' + whitepercent + '%)';
}