function hashCode(id) {
    const str = id.toString()+"aa";
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return hash;
} 

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

function color(str) {
    const hash = hashCode(str);
    return intToRGB(hash);
}

module.exports = {
    color: color,
}