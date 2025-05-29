document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const maSVInput = document.getElementById('maSV');
    const hoTenInput = document.getElementById('hoTen');
    const emailInput = document.getElementById('email');
    const sdtInput = document.getElementById('soDT'); 
    const addButton = document.querySelector('button[type="submit"]'); 
    const studentTableBody = document.querySelector('tbody'); 
    
    addButton.addEventListener('click', () => {
        // Get values from input fields
        const maSV = maSVInput.value.trim();
        const hoTen = hoTenInput.value.trim();
        const email = emailInput.value.trim();
        const sdt = sdtInput.value.trim();

        
        if (!maSV || !hoTen || !email || !sdt) {
            alert('Vui lòng điền đầy đủ tất cả các thông tin!');
            return; 
        }

        const newRow = document.createElement('tr');

        const maSVCell = document.createElement('td');
        maSVCell.textContent = maSV;
        newRow.appendChild(maSVCell);

        const hoTenCell = document.createElement('td');
        hoTenCell.textContent = hoTen;
        newRow.appendChild(hoTenCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = email;
        newRow.appendChild(emailCell);

        const sdtCell = document.createElement('td');
        sdtCell.textContent = sdt;
        newRow.appendChild(sdtCell);

        studentTableBody.appendChild(newRow);

        maSVInput.value = '';
        hoTenInput.value = '';
        emailInput.value = '';
        sdtInput.value = '';
    });
});