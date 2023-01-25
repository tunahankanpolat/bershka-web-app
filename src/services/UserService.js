import axios from 'axios';

export default class UserService {
    logIn(user){
        return axios.get("http://localhost:8080/api/user/sign-in?email="+user.email+"&password="+user.password);
    }

}