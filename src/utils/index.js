Number.prototype.format = function () {
    if (isNaN(this)) return 0;
    return this.toString().replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
};

Number.prototype.prefix = function (length, char = "0") {
    if (!isNaN(this)) return 0;
    return (Array(length).join(char) + this).slice(-length);
};

Array.prototype.remove = function (ele) {
    let index = this.indexOf(ele);
    if (index > -1) this.splice(index, 1);
};

Array.prototype.removeAll = function (ele) {
    let index = 1;
    while (index > -1) {
        index = this.indexOf(ele);
        if (index > -1) this.splice(index, 1);
    }
};
