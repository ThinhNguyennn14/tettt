function laSoNguyenTo(n) {
    if (n < 2) return false;
    for (var i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}
console.log(laSoNguyenTo(7));
console.log(laSoNguyenTo(10));