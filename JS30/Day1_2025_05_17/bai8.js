function xepLoai(diem) {
    if (diem < 0 || diem > 10) {
        return "Điểm không hợp lệ";
    } else if (diem >= 9) {
        return "Xuất sắc";
    } else if (diem >= 8) {
        return "Giỏi";
    } else if (diem >= 6.5) {
        return "Khá";
    } else if (diem >= 5) {
        return "Trung bình";
    } else {
        return "Yếu";
    }
}