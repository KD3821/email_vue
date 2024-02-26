export default class Validatations {
    static checkUsername(username) {
        return username !== 'Admin01';
    }

    static minUsernameLength(username) {
        return username.length >= 2;
    }

    static checkEmail(email) {
        return /\S+@\S+\.\S+/.test(email.toLowerCase());
    }

    static minLength(password, minLength) {
        return password.length >= minLength;
    }
}
