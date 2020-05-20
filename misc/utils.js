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

function textColor(str) {
    const rgb = hexToRgb(str);
    const brightness = Math.round(((parseInt(rgb.r) * 299) + (parseInt(rgb.g) * 587) + (parseInt(rgb.b) * 114)) / 1000);
    return (brightness > 125) ? 'black' : 'white';
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function displayEllapsedTime(updated) {
    
    var d = new Date();
    const year = d.getYear() - updated.getYear();
    const month = d.getMonth() - updated.getMonth();
    const day = d.getDate() - updated.getDate();
    const hours = d.getHours() - updated.getHours();
    const mins = d.getMinutes() - updated.getMinutes();
    
    if (year > 1) return `${year} YEARS AGO`;
    if (year === 1) return `${year} YEAR AGO`;

    if (month > 1) return `${month} MONTHS AGO`;
    if (month === 1) return `${month} MONTH AGO`;

    if (day > 1) return `${day} DAYS AGO`;
    if (day === 1) return `${day} DAY AGO`;

    if (hours > 24) return `1 DAY AGO`;
    if (hours > 1) return `${hours} HOURS AGO`;
    if (hours === 1) return `1 HOUR AGO`;
    else {
        if (hours === 0) {
            if (mins === 1) return '1 MIN AGO';
            if (mins === 0) return '0 MIN AGO';
            else return `${mins} MINS AGO`;
        }
    }
    return 'JUST NOW';
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

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function isExpired(month, day) {
    const date = new Date();

    if (month <= date.getMonth()) {
        if (month == date.getMonth()) {
            return (day < date.getDate()) ? true : false;
        }
        else return true;
    }
    else return false;
}

module.exports = {
    color: color,
    textColor: textColor,
    displayET: displayEllapsedTime,
    formatDate: formatDate,
    sleep: sleep,
    isExpired: isExpired,
};