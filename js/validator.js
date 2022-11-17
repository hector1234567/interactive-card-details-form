export class Validator {
    #regExpNumbers = new RegExp(/^(\s*|\d+)$/)
    #actualYear = +new Date().getFullYear().toString().slice(-2)
    #actualMonth = new Date().getMonth() + 1

    constructor(form) {
        this.form = form;
    }

    isNotNumber(val) {
        return !this.#regExpNumbers.test(val);
    }

    dateExpired(month, year) {
        if(+year < this.#actualYear) return true;
        if(+year === this.#actualYear && +month < this.#actualMonth) return true;
        return false
    }

    invalidMonth(val) {
        return +val > 12; 
    }

    invalidYear(val) {
        return +val > 99;
    }

    moreThanLimitCharacters(str, limit) {
        return str.length > limit;
    }

    showErrorMessage(message, field) {
        const fieldContainer = this.form.querySelector(`.field-container--${field}`);
        fieldContainer.querySelectorAll('input[name]').forEach(input => input.classList.add('border-red'));
        fieldContainer.insertAdjacentHTML('beforeend', `<span class="error-message">${message}</span>`);
    }

    clearErrorMessage(field) {
        this.form.querySelectorAll(`.field-container--${field} input[name]`).forEach(input => input.classList.remove('border-red'));
        this.form.querySelector(`.field-container--${field} .error-message`)?.remove();
    }

    clearErrorMessages() {
        this.form.querySelectorAll(`input[name]`).forEach(input => input.classList.remove('border-red'));
        this.form.querySelectorAll(`.error-message`)?.forEach(err => err.remove());
    }
}
