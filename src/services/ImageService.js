import axios from 'axios';

export default class IamgeService {
    getAllImage(){
        return axios.get("http://localhost:8080/api/image/get-all-product-images");
    }
}