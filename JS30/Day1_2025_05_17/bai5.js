function bangCuuChuong(n) {
    if (n < 2 || n > 9) {
        console.log("vui long nhap so tu 2 den 9");
        return;
    }
    for (var i = 1; i <= 10; i++) {
        console.log(`${n} x ${i} = ${n * i}`);
    }
}
bangCuuChuong(9);