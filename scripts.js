const state = {
    userName: '',
    cardNumber: '',
    expDateMonth: '',
    expDateYear: '',
    cvc: ''
}

const errorName = document.querySelector('.field-container--user-name .error-message');
const errorCardNumber = document.querySelector('.field-container--card-number .error-message');
const errorExpDate = document.querySelector('.field-container--exp-date .error-message');
const errorCvc = document.querySelector('.field-container--cvc .error-message');

const validateNumbers = function(newState) {
    let valid = true;

    const numbers = new RegExp(/^(\s*|\d+)$/);

    if(!numbers.test(newState.cardNumber)) {
        errorCardNumber.innerHTML = 'Wrong format, numbers only';
        errorCardNumber.style.display = 'inline';
        valid = false;
    } else {
        errorCardNumber.style.display = 'none';
    } 

    if(!numbers.test(newState.expDateMonth) || !numbers.test(newState.expDateYear)) {
        errorExpDate.innerHTML = 'Wrong format, numbers only';
        errorExpDate.style.display = 'inline';
        valid = false;
    } else {
        errorExpDate.style.display = 'none';
    } 

    if(!numbers.test(newState.cvc)) {
        errorCvc.innerHTML = 'Wrong format, numbers only';
        errorCvc.style.display = 'inline';
        valid = false;
    } else {
        errorCvc.style.display = 'none';
    } 

    return valid;
}

const validateDate = function(newState) {
    let valid = true;

    if(+newState.expDateMonth < 1 ||  +newState.expDateMonth > 12) {
        errorExpDate.innerHTML = 'Wrong month';
        errorExpDate.style.display = 'inline';
        valid = false;
    } else {
        errorExpDate.style.display = 'none';
    } 

    if(+newState.expDateYear < new Date().getFullYear() ||  (+newState.expDateYear === new Date().getFullYear() && +newState.expDateMonth < new Date().getMonth())) {
        errorExpDate.innerHTML = 'Expired date';
        errorExpDate.style.display = 'inline';
        valid = false;
    } else {
        errorExpDate.style.display = 'none';
    } 
}

const typeOnField = (ev) => {
    const newState = {...state}
    if(ev.target.name === 'user-name') {
        newState.userName = ev.target.value;
    }
    if(ev.target.name === 'card-number') {
        newState.cardNumber = ev.target.value;
    }
    if(ev.target.name === 'exp-date-month') {
        newState.expDateMonth = ev.target.value;
    }
    if(ev.target.name === 'exp-date-year') {
        newState.expDateYear = ev.target.value;
    }
    if(ev.target.name === 'cvc') {
        newState.cvc = ev.target.value;
    }
    validateNumbers(newState);
    validateDate(newState);


}

document.querySelectorAll('input[name]').forEach(input => input.addEventListener('input', typeOnField));