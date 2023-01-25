import axios from 'axios';

export default class ColorService {
    getAll(){
        return axios.get("http://localhost:8080/api/color/get-all");
    }
}