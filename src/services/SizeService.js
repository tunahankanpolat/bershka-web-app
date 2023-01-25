import axios from 'axios';

export default class SizeService {
    getAll(){
        return axios.get("http://localhost:8080/api/size/get-all");
    }
    getAllWithProductId(productId){
        return axios.get("http://localhost:8080/api/stock/get-product-with-id?productId="+productId);
    }
}