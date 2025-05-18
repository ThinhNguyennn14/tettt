function tongChuSo(n) {
    var tong = 0;
    while (n > 0) {
        tong += n % 10;
        n = Math.floor(n / 10);
    }
    return tong;
}
console.log(tongChuSo(1234));