import axios from 'axios';

export default class TypologyService {
    getByCategoryIdAndGender(id,gender){
        return axios.get("http://localhost:8080/api/typology/list-typologies-gender?categoryId="+ id +"&gender=" + gender);
    }

}