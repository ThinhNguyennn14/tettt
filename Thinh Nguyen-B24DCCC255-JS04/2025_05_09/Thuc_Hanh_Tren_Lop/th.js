// bai1:
// cach 1: dùng for 
var tongFor = 0;
for (var iFor = 1; iFor <= 100; iFor++) {
    tongFor += iFor;
    if (tongFor >= 100) {
        console.log(`Tổng (for): ${tongFor} và Số lần lặp (for): ${iFor} `);
        break;
    }
}
// cach 2: dùng while
var tongWhile = 0;
var iWhile = 1;
while (iWhile <=100) {
    iWhile++;
    tongWhile += iWhile;
    if (tongWhile >= 100) {
        console.log(`Tổng (while): ${tongWhile} và Số lần lặp (while): ${iWhile}`);
        break;
    }
}

// bai2:
var n;
    while (true) {
        var input = prompt("Vui lòng nhập một số lớn hơn 0:");
        n = parseInt(input);
        if (typeof n === 'number' && n > 0) {
            break;
        } else if (input === null) {
            alert("Bạn đã hủy nhập.");
            break;
        } else {
            alert("Số bạn nhập không hợp lệ. Vui lòng nhập lại số lớn hơn 0.");
        }
    }
    if (n !== undefined) {
        if (n % 2 === 0) {
            alert(`${n} là số chẵn.`);
        } else {
            alert(`${n} là số lẻ.`);
        }
    }