function hashCode(id) {
    const str = id.toString() + "aa";
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return hash;
}

function intToRGB(i) {
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

function color(str) {
    const hash = hashCode(str);
    return intToRGB(hash);
}

function displayEllapsedTime(hrs, mins) {
    if (hrs > 1) return `${hrs} HOURS AGO`;
    else {
        if (hrs === 1) return `1 HOUR AGO`;
        if (hrs === 0) {
            if (mins === 1) return '1 MIN AGO';
            else return `${mins} MINS AGO`;
        }
        return 'JUST NOW';
    }
}

function formatDate(date) {
    if (!(date instanceof Date)) {
        return;
    }
    return date.toLocaleString("hu-HU", {
        day: "numeric",
        month: "short",
        //year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });
}

module.exports = {
    color: color,
    displayET: displayEllapsedTime,
    formatDate: formatDate,
}