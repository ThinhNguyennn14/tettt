document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử HTML cần thiết
    const maSVInput = document.getElementById('maSV');
    const hoTenInput = document.getElementById('hoTen');
    const emailInput = document.getElementById('email');
    const soDienThoaiInput = document.getElementById('soDienThoai');
    const mainActionButton = document.getElementById('mainActionButton');
    const studentTableBody = document.getElementById('studentTableBody'); 

    let currentlyEditingRow = null;

    function clearForm() {
        maSVInput.value = '';
        hoTenInput.value = '';
        emailInput.value = '';
        soDienThoaiInput.value = '';
    }


    function handleAddOrSave() {
        
        const maSV = maSVInput.value.trim();
        const hoTen = hoTenInput.value.trim();
        const email = emailInput.value.trim();
        const soDienThoai = soDienThoaiInput.value.trim();

        if (!maSV || !hoTen || !email || !soDienThoai) {
            alert('Vui lòng điền đầy đủ tất cả các thông tin!');
            return; 
        }

        if (mainActionButton.textContent === 'Thêm') {

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

            const soDienThoaiCell = document.createElement('td');
            soDienThoaiCell.textContent = soDienThoai;
            newRow.appendChild(soDienThoaiCell);

            const actionCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Sửa'; 
            editButton.classList.add('editButton'); 

            editButton.addEventListener('click', () => handleEdit(newRow));
            actionCell.appendChild(editButton); 
            newRow.appendChild(actionCell);

            studentTableBody.appendChild(newRow); 
        } else {

            if (currentlyEditingRow) { 
                const cells = currentlyEditingRow.querySelectorAll('td');
               
                cells[0].textContent = maSV; 
                cells[1].textContent = hoTen;
                cells[2].textContent = email; 
                cells[3].textContent = soDienThoai; 

                mainActionButton.textContent = 'Thêm';
                currentlyEditingRow = null;
            }
        }

        clearForm(); 
    }

    function handleEdit(row) {
        currentlyEditingRow = row; 

        const cells = row.querySelectorAll('td');

        maSVInput.value = cells[0].textContent;
        hoTenInput.value = cells[1].textContent;
        emailInput.value = cells[2].textContent;
        soDienThoaiInput.value = cells[3].textContent;

        mainActionButton.textContent = 'Lưu';
    }

    mainActionButton.addEventListener('click', handleAddOrSave);
});