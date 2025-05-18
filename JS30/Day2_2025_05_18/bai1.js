function fibonacci(n) {
    if (n <= 0) return null;
    if (n === 1) return 0;
    if (n === 2) return 1;
    let a = 0; b = 1;
    for (var i = 3; i <= n; i++) {
        let sum = a + b;
        a = b;
        b = sum;
    }
    return b;
}
