function laNamNhuan(nam) {
    if ((nam % 4 === 0 && nam % 100 !== 0) || nam % 400) {
        return true;
    } else {
        return false;
    }
}