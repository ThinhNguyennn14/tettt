const NEW_REPLACEMENT_TEXT = "Thinh Nguyen🚀";

function changeFirstH3Title() {
    const firstH3Element = document.querySelector('h3'); 

    if (firstH3Element) { 
        const currentText = firstH3Element.textContent.trim();

        const isAlreadyModified = currentText.includes(NEW_REPLACEMENT_TEXT.substring(0, 5));

        if (!isAlreadyModified) {
            firstH3Element.textContent = NEW_REPLACEMENT_TEXT;

            firstH3Element.style.color = '#e74c3c'; 
            firstH3Element.style.fontWeight = 'bold'; 
            firstH3Element.style.transition = 'all 0.3s ease';
            firstH3Element.style.textDecoration = 'none';
            firstH3Element.style.lineHeight = '1.3';

            
            firstH3Element.onmouseenter = () => {
                firstH3Element.style.transform = 'scale(1.02)';
                firstH3Element.style.color = '#c0392b';
                firstH3Element.style.textDecoration = 'underline';
            };
            firstH3Element.onmouseleave = () => {
                firstH3Element.style.transform = 'scale(1)';
                firstH3Element.style.color = '#e74c3c';
                firstH3Element.style.textDecoration = 'none';
            };

            console.log(`Đã thay đổi thẻ h3 đầu tiên thành: "${NEW_REPLACEMENT_TEXT}"`);
        } else {
            console.log(`Thẻ h3 đầu tiên đã được thay đổi trước đó.`);
        }
    } else {
        console.log("Không tìm thấy thẻ h3 nào trên trang.");
    }
}

const observer = new MutationObserver((mutationsList, observer) => {
    changeFirstH3Title();
});

observer.observe(document.body, {
    childList: true, 
    subtree: true,  
    attributes: false,
    characterData: false
});


changeFirstH3Title();

console.log('Extension Dân Trí First H3 Changer đã được tải!');