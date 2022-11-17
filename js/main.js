import { Validator } from "./validator.js";

const state = {
    userName: '',
    cardNumber: '',
    expDateMonth: '',
    expDateYear: '',
    cvc: ''
}

const form = document.querySelector('#card-form');
const userName = document.getElementById('user-name');
const cardNumber = document.getElementById('card-number');
const expDateMonth = document.getElementById('exp-date--month');
const expDateYear = document.getElementById('exp-date--year');
const cvc = document.getElementById('cvc');

const cardNumberSections = document.querySelectorAll('.card__front--number span');
const cardFrontUserName = document.querySelector('.card__front--user-name');
const cardExpDate = document.querySelector('.card__front--exp-date');
const cardCvc = document.querySelector('.card__back--cvc');

const thankYou = document.querySelector('.thank-you');

const validator = new Validator(form);

const renderState = function(section) {
    if(section === 'user-name') {
        cardFrontUserName.innerHTML = state.userName;
    }

    if(section === 'card-number') {
        let cardNumberArr = [...state.cardNumber];
        let index = 0;
        while(cardNumberArr.length) {
            const values = [0,0,0,0];
            cardNumberArr.splice(0,4).forEach((v, i) => values[i] = v);
            cardNumberSections[index++].innerHTML = values.join('');
        }
    }

    if(section === 'exp-date') {
        const monthArr = [0,0];
        const yearArr = [0,0];
        [...state.expDateMonth].reverse().forEach((v, i) => monthArr[1-i] = v);
        [...state.expDateYear].reverse().forEach((v, i) => yearArr[1-i] = v);
        cardExpDate.innerHTML = `${monthArr.join('')}/${yearArr.join('')}`;
    }

    if(section === 'cvc') {
        const cvcArr = [0,0,0];
        [...state.cvc].reverse().forEach((v, i) => cvcArr[2-i] = v);
        cardCvc.innerHTML = cvcArr.join('');
    }
}

// USER NAME
userName.addEventListener('input', function(ev) {
    if(validator.moreThanLimitCharacters(this.value,19)) {
        this.value = state.userName;
        return;
    }
    validator.clearErrorMessage('user-name');
    state.userName = this.value;
    renderState('user-name');
});

// CARD NUMBER
cardNumber.addEventListener('input', function(ev) {
    if(validator.moreThanLimitCharacters(this.value, 16)) {
        this.value = state.cardNumber;
        return;
    }

    validator.clearErrorMessage('card-number');

    if(validator.isNotNumber(this.value)) {
        validator.showErrorMessage('Wrong format, numbers only!', 'card-number');
        this.value = state.cardNumber;
        return;
    }

    if(validator.isNotNumber(this.value)) {
        validator.showErrorMessage('Wrong format, numbers only!', 'card-number');
        this.value = state.cardNumber;
        return;
    }
    state.cardNumber = this.value;
    renderState('card-number');
})

// EXPIRATION DATE
expDateYear.addEventListener('input', function(ev) {
    if(validator.invalidYear(this.value)) {
        this.value = state.expDateYear;
        return;
    }

    if(validator.moreThanLimitCharacters(this.value,2)) {
        this.value = state.expDateYear;
        return;
    }

    validator.clearErrorMessage('exp-date');
    if(validator.isNotNumber(this.value)) {
        validator.showErrorMessage('Wrong format, numbers only!', 'exp-date');
        this.value = state.expDateYear;
        return;
    }
    state.expDateYear = this.value;
    renderState('exp-date');
})

expDateMonth.addEventListener('input', function(ev) {
    if(validator.invalidMonth(this.value)) {
        this.value = state.expDateMonth;
        return;
    }

    if(validator.moreThanLimitCharacters(this.value,2)) {
        this.value = state.expDateMonth;
        return;
    }

    validator.clearErrorMessage('exp-date');
    if(validator.isNotNumber(this.value)) {
        validator.showErrorMessage('Wrong format, numbers only!', 'exp-date');
        this.value = state.expDateMonth;
        return;
    }
    state.expDateMonth = this.value;
    renderState('exp-date');
})

// CVC
cvc.addEventListener('input', function(ev) {
    if(validator.moreThanLimitCharacters(this.value,3)) {
        this.value = state.cvc;
        return;
    }

    validator.clearErrorMessage('cvc');
    if(validator.isNotNumber(this.value)) {
        validator.showErrorMessage('Wrong format, numbers only!', 'cvc');
        this.value = state.cvc;
        return;
    }
    state.cvc = this.value;
    renderState('cvc');
})

// SUBMIT
form.addEventListener('submit', function(ev) {
    ev.preventDefault();

    validator.clearErrorMessages();

    let valid = true;

    if(!state.userName) {
        validator.showErrorMessage('Can\'t be blank', 'user-name');
        valid = false;
    }

    if(!state.cardNumber) {
        validator.showErrorMessage('Can\'t be blank', 'card-number');
        valid = false;
    }else if(state.cardNumber.length < 16) {
        validator.showErrorMessage('Wrong number!', 'card-number');
        valid = false;
    }

    if(!state.expDateMonth || !state.expDateYear) {
        validator.showErrorMessage('Can\'t be blank', 'exp-date');
        valid = false;
    }else if(+state.expDateMonth === 0) {
        validator.showErrorMessage('Wrong month number!', 'exp-date');
        valid = false;
    } else if(validator.dateExpired(state.expDateMonth, state.expDateYear)) {
        validator.showErrorMessage('Date has expired', 'exp-date');
        valid = false;
    }

    if(!state.cvc) {
        validator.showErrorMessage('Can\'t be blank', 'cvc');
        valid = false;
    }else if(state.cvc.length < 3) {
        validator.showErrorMessage('Wrong number!', 'cvc');
        valid = false;
    }

    if(!valid) return;

    this.classList.add('hidden');
    thankYou.classList.remove('hidden');
})

document.querySelector('.btn-continue').addEventListener('click', function() {
    location.reload();
})