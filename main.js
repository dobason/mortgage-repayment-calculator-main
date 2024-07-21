// Lấy các phần tử từ DOM
const defaultText = document.getElementById('default-text');
const calculationsContainer = document.getElementById('calculations-container');

// Xử lý sự kiện khi người dùng thay đổi loại hình vay
document.querySelectorAll('.mortgage-type').forEach(input => {
    input.addEventListener('change', function () {
        // Xóa lớp 'selected' khỏi tất cả các phần tử radio
        document.querySelectorAll('.radio-input').forEach(div => {
            div.classList.remove('selected');
        });

        // Nếu radio được chọn, thêm lớp 'selected' vào phần tử cha
        if (this.checked) {
            this.parentElement.classList.add('selected');
        }
    });
});

// Xử lý sự kiện khi người dùng nhấn nút tính toán
document.getElementById('calculate-btn').addEventListener('click', () => {
    // Lấy giá trị từ các input
    const amount = parseFloat(document.getElementById('mortgage-amount').value);
    const term = parseFloat(document.getElementById('mortgage-term').value);
    const rate = parseFloat(document.getElementById('interest-rate').value) / 100;
    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');

    let isValid = true; // Biến kiểm tra tính hợp lệ của dữ liệu

    // Xóa lớp 'error' của các phần tử form-flex
    document.querySelectorAll('.form-flex').forEach(el => {
        el.classList.remove('error');
    });

    // Kiểm tra tính hợp lệ của dữ liệu nhập vào
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('amount-alert').style.display = 'block';
        document.getElementById('mortgage-amount-main').classList.add('error');
        document.getElementById('amount-alert').innerHTML = amount <= 0 ? 'Your input must be larger than 0' :  'This field is required' ;
        isValid = false;
    } else {
        document.getElementById('amount-alert').style.display = 'none';
    }

    if (isNaN(term) || term <= 0) {
        document.getElementById('term-alert').style.display = 'block';
        document.getElementById('mortgage-term-main').classList.add('error');
        document.getElementById('term-alert').innerHTML = term <= 0 ? 'Your input must be larger than 0' : 'This field is required';
        isValid = false;
    } else {
        document.getElementById('term-alert').style.display = 'none';
    }

    if (isNaN(rate) || rate <= 0) {
        document.getElementById('rate-alert').style.display = 'block';
        document.getElementById('mortgage-rate-main').classList.add('error');
        document.getElementById('rate-alert').innerHTML = rate <= 0 ? 'Your input must be larger than 0' : 'This field is required';
        isValid = false;
    } else {
        document.getElementById('rate-alert').style.display = 'none';
    }

    if (!mortgageType) {
        document.getElementById('type-alert').style.display = 'block';
        document.querySelectorAll('.radio-input').forEach(el => {
            el.classList.add('error');
        });
        isValid = false;
    } else {
        document.getElementById('type-alert').style.display = 'none';
        document.querySelectorAll('.radio-input').forEach(el => {
            el.classList.remove('error');
        });
    }

    // Nếu dữ liệu nhập vào hợp lệ, tính toán và hiển thị kết quả
    if (isValid) {
        let monthlyPayment = 0;
        let totalPayment = 0;

        defaultText.classList.add('hide');
        calculationsContainer.classList.add('show');

        // Tính toán trả góp hoặc lãi suất
        if (mortgageType.value === 'repayment') {
            const monthlyRate = rate / 12;
            const n = term * 12;
            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -n));
            totalPayment = monthlyPayment * n;
        } else if (mortgageType.value === 'interest-only') {
            monthlyPayment = (amount * rate) / 12;
            totalPayment = monthlyPayment * term * 12;
        }

        // Hiển thị kết quả với định dạng tiền tệ của Anh
        document.getElementById('result').innerText = monthlyPayment.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
        document.getElementById('term-result').innerText = totalPayment.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
    } else {
        // Nếu dữ liệu không hợp lệ, hiển thị thông báo và ẩn kết quả
        document.getElementById('result').innerText = '';
        document.getElementById('term-result').innerText = '';

        defaultText.classList.remove('hide');
        calculationsContainer.classList.remove('show');
    }
});

// Xử lý sự kiện khi người dùng nhấn nút làm sạch
document.getElementById('clear-btn').addEventListener('click', () => {
    // Reset form và ẩn kết quả tính toán
    document.getElementById('container-form').reset();
    document.getElementById('result').innerText = '';
    document.getElementById('term-result').innerText = '';
    document.querySelectorAll('.form-alert').forEach(alert => {
        alert.style.display = 'none';
    });

    defaultText.classList.remove('hide');
    calculationsContainer.classList.remove('show');

    // Xóa lớp 'selected' của các phần tử radio-input và 'error' của các form-flex
    document.querySelectorAll('.radio-input').forEach(div => {
        div.classList.remove('selected');
    });

    document.querySelectorAll('.form-flex').forEach(el => {
        el.classList.remove('error');
    });
});

// Ẩn các thông báo lỗi ban đầu
document.querySelectorAll('.form-alert').forEach(alert => {
    alert.style.display = 'none';
});
