const isNumber = str => !isNaN(str) && /^[-]?\d+$/.test(str);

module.exports = isNumber;
