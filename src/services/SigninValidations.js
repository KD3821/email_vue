import Validations from "@/services/Validatations";

class SigninValidations {
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
}

export default SigninValidations;