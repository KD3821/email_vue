import { SIGNUP_ACTION } from "@/store/storeConstants";
import axios from "axios";

export default {
    async [SIGNUP_ACTION](_, payload) {
        let postData = {
            username: payload.username,
            email: payload.email,
            password: payload.password,
        };
        let response = await axios.post('http://127.0.0.1:8000/api/accounts/register', postData);
        console.log(response);
        console.log(postData);
    }
};