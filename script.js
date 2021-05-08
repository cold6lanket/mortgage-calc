const inputText = document.querySelectorAll(".inputText");
const inputNum = document.querySelectorAll('.inputNum');
const monthPrice = document.getElementById('priceMonth');
const overallPrice = document.getElementById('priceOverall');
const overPaymentPrice = document.getElementById('priceOverpayment');

let housePrice = 0, 
    initialFee = 0, 
    loanRate = 0, 
    loanTerm = 0;

inputText.forEach(input => input.addEventListener('input', syncInputs));
inputNum.forEach(input => input.addEventListener('input', syncInputs));

calculateMortgage();

function syncInputs() {
    const value = this.value;
    const index = this.getAttribute('data-index');
    
    inputText[index].value = value;
    inputNum[index].value = value;

    switch(index) {
        case '0' || 0:
            housePrice = parseInt(value);
            break;
        case '1' || 1:
            initialFee = parseInt(value);
            break;
        case '2'|| 2:
            loanRate = parseInt(value);
            break;
        case '3' || 3:
            loanTerm = parseInt(value);
            break;
    }

    calculateMortgage(housePrice, initialFee, loanRate, loanTerm);
}

function calculateMortgage(price = 0, fee = 0, rate = 0, term = 0) {
    const overall = (price / term) + (price - fee) * ((rate / 12) * 30 / 365);

    if (!isNaN(overall) && overall !== Infinity) {
        monthPrice.innerText = Math.round(overall);
        overallPrice.innerText = price;  
        overPaymentPrice.innerText = Math.round((overall * term) - price);
    }
}