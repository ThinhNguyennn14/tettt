function tongSoLe(n) {
    var tong = 0;
    for (var i = 1; i < n; i += 2) {
        tong += i;
    }
    return tong;
}
console.log(tongSoLe(10));