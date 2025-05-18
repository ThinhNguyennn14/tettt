function kiemTraMatKhau(matkhau) {
    if (matkhau.length < 8) return false;
    if (!/[A-Z]/.test(matkhau)) return false;
    if (!/[a-z]/.test(matkhau)) return false;
    if (!/\d/.test(matkhau)) return false;
    return true;
}
