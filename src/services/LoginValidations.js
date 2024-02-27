import Validations from "@/services/Validatations";

class LoginValidations {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    checkLoginValidations() {
        let errors = [];
        if (!Validations.checkEmail(this.email)) {
            errors['email'] = 'Некорректный email';
        }
        if (!Validations.minLength(this.password, 6)) {
            errors['password'] = 'Минимальная длина пароля 6 символов'
        }
        return errors;
    }
    static getErrorMessageDetail(detail) {
        let errorMsg = [];
        for (let key in detail) {
            errorMsg.push(`${key} - ${detail[key]}`)
        }
        return errorMsg.length > 1 ? errorMsg.join(' ') : errorMsg[0];
    }
}

export default LoginValidations;