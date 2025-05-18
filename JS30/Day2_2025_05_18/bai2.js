function daoNguocChuoi(str) {
    var ketQua = "";
    for (var i = str.length - 1; i >= 0; i--) {
        ketQua += str[i];
    }
    return ketQua;
}
console.log(daoNguocChuoi("ThinhNguyen"));