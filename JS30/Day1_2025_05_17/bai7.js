function veTamGiac(n) {
    for (var i = 1; i <= n; i++) {
        let dong = "";
        for (var j = 1; j <= i; j++) {
            dong += "*";
        }
        console.log(dong);
    }
}
veTamGiac(4);