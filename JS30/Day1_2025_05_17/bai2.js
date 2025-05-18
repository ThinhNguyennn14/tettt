function tinhGiaiThua(n) {
    if (n < 0) return "khonghople";
    var giaiThua = 1;
    for (var i = 2; i <= n; i++) {
        giaiThua *= i;
    }
    return giaiThua;
}