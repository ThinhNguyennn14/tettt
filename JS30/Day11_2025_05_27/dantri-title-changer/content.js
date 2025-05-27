// content.js - Script chạy trên trang dantri.com.vn

function changeSpecificArticleTitle() {
    const targetText = "Toàn văn tuyên bố chung Việt Nam - Pháp";
    const newFunnyTitle = "🎉 Toàn cảnh công bố chung: Việt Nam - Pháp cùng nhau 'phá đảo' thế giới ảo! 🚀"; // Tiêu đề mới bạn muốn thay đổi

    // Tìm tất cả các thẻ h3 trên trang
    const h3Elements = document.querySelectorAll('h3');

    let changed = false;

    h3Elements.forEach((element) => {
        // Kiểm tra nếu nội dung của thẻ h3 chứa targetText
        // và đảm bảo nó chưa bị thay đổi bởi extension (dựa vào newFunnyTitle)
        if (element.textContent.trim().includes(targetText) &&
            !element.textContent.trim().includes(newFunnyTitle.substring(0, 5))) { // Lấy 5 ký tự đầu của newFunnyTitle để check
            
            element.textContent = newFunnyTitle;
            console.log(`Đã thay đổi tiêu đề: "${targetText}" thành: "${newFunnyTitle}"`);
            changed = true;
            
            // Áp dụng một số style cơ bản để dễ nhận biết (tùy chọn)
            element.style.color = '#e74c3c'; // Màu đỏ
            element.style.fontWeight = 'bold'; // In đậm
            element.style.transition = 'color 0.3s ease'; // Hiệu ứng chuyển màu

            return; // Dừng vòng lặp sau khi tìm thấy và thay đổi phần tử đầu tiên
        }
    });

    if (changed) {
        console.log("Đã tìm thấy và thay đổi tiêu đề h3 cụ thể.");
    } else {
        console.log("Không tìm thấy tiêu đề h3 cụ thể để thay đổi hoặc đã được thay đổi trước đó.");
    }
}

// Chạy hàm khi trang đã load xong
// Đợi một khoảng thời gian ngắn để đảm bảo DOM đã được render đầy đủ
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(changeSpecificArticleTitle, 1500); // Đợi 1.5 giây
    });
} else {
    setTimeout(changeSpecificArticleTitle, 1000); // Đợi 1 giây nếu trang đã sẵn sàng
}

console.log('Extension Dân Trí Specific Title Changer (h3) đã được tải!');