// Lấy các phần tử DOM cần thiết
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button'); // Lấy tất cả các nút

// Các biến để lưu trữ trạng thái máy tính
let currentInput = '0'; // Lưu trữ số hiện tại đang hiển thị/nhập
let firstOperand = null; // Lưu trữ số đầu tiên của phép toán
let operator = null; // Lưu trữ toán tử hiện tại
let waitingForSecondOperand = false; // Cờ báo hiệu đang chờ nhập số thứ hai

// Hàm cập nhật màn hình hiển thị
function updateDisplay() {
    display.textContent = currentInput;
}

// Xử lý khi nhấn nút số
function inputNumber(number) {
    if (waitingForSecondOperand === true) { // Nếu đang chờ số thứ 2, bắt đầu nhập số mới
        currentInput = number;
        waitingForSecondOperand = false;
    } else { // Nếu không, nối số vào input hiện tại
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay();
}

// Xử lý khi nhấn toán tử
function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput); // Chuyển đổi input hiện tại sang số

    if (operator && waitingForSecondOperand) {
        // Nếu đã có toán tử và đang chờ số thứ 2 (nghĩa là người dùng đổi toán tử),
        // thì chỉ cập nhật toán tử mới và thoát
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        // Nếu chưa có số hạng đầu tiên, gán input hiện tại làm số hạng đầu tiên
        firstOperand = inputValue;
    } else if (operator) {
        // Nếu đã có số hạng đầu tiên và toán tử, thực hiện phép tính trung gian
        const result = performCalculation[operator](firstOperand, inputValue);
        currentInput = String(result); // Hiển thị kết quả tạm thời
        firstOperand = result; // Kết quả này trở thành số hạng đầu tiên cho phép tính tiếp theo
    }

    waitingForSecondOperand = true; // Đặt cờ chờ số thứ hai
    operator = nextOperator; // Lưu toán tử mới
    updateDisplay(); // Cập nhật màn hình để hiển thị kết quả trung gian (nếu có)
}

// Đối tượng chứa các hàm tính toán cụ thể
const performCalculation = {
    '/': (first, second) => first / second,
    'x': (first, second) => first * second,
    '+': (first, second) => first + second,
    '-': (first, second) => first - second,
    // Toán tử '=' không thực hiện phép tính riêng, nó chỉ kích hoạt tính toán cuối cùng
};

// Xử lý nút xóa 'C'
function clearCalculator() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

// Gán sự kiện click cho tất cả các nút
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const { target } = event; // Lấy phần tử nút được click

        if (target.classList.contains('number')) {
            // Nếu là nút số, gọi hàm inputNumber
            inputNumber(target.textContent);
            return;
        }

        if (target.classList.contains('operator')) {
            if (target.classList.contains('clear')) {
                // Nếu là nút 'C', gọi hàm clearCalculator
                clearCalculator();
                return;
            }

            if (target.classList.contains('equals')) {
                // Nếu là nút '=', thực hiện phép tính cuối cùng
                if (firstOperand === null || operator === null) {
                    return; // Không làm gì nếu chưa đủ thông tin
                }
                const secondOperand = parseFloat(currentInput);
                const result = performCalculation[operator](firstOperand, secondOperand);
                currentInput = String(result); // Hiển thị kết quả cuối cùng
                firstOperand = null; // Reset số hạng đầu tiên
                operator = null; // Reset toán tử
                waitingForSecondOperand = true; // Sẵn sàng cho phép tính mới
                updateDisplay();
                return;
            }

            // Nếu là các toán tử khác (+, -, x, /), gọi handleOperator
            handleOperator(target.textContent);
            return;
        }
    });
});

// Khởi tạo hiển thị ban đầu khi tải trang
updateDisplay();