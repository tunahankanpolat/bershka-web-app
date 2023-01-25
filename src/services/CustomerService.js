import axios from 'axios';

export default class CustomerService {
    signUp(customer){
        return axios.post("http://localhost:8080/api/customer/sign-up",customer)
    }
    updatePassword(customerId,email,password){
        console.log(customerId,email,password)
        return axios.post("http://localhost:8080/api/customer/change-email-password?customerId="+customerId+"&email="+email+"&password="+password)
    }

    addLocation(Location,customerId){
        return axios.put("http://localhost:8080/api/customer/add-location?address="+Location.address+"&city="+Location.city+"&customerId="+customerId+"&postCode="+Location.postalCode+"&title="+Location.title +"&town="+Location.town)
    }
    getAllInActives(){
        return axios.get("http://localhost:8080/api/customer/get-all-InActive");
    }
    getCustomerById(id){
        return axios.get("http://localhost:8080/api/customer/get-customer-id?id="+id)
    }
    getFavourites(customerId){
        return axios.get("http://localhost:8080/api/customer/get-favorites?customerId="+customerId)
    }
    addFavourites(customerId,productId){
        return axios.post("http://localhost:8080/api/customer/add-favorite?customerId="+customerId+"&productId="+productId)
    }
    deleteFavourite(customerId,productId){
        return axios.delete("http://localhost:8080/api/customer/remove-favorite?customerId="+customerId+"&productId="+productId)
    }


    addBasket(customerId,productId,amount,sizeId){

        return axios.post("http://localhost:8080/api/customer/add-basket?amount="+amount+"&customerId="+customerId+"&productId="+productId+"&sizeId="+sizeId)
    }
    removeBasket(customerId,productId,sizeId){

        return axios.delete("http://localhost:8080/api/customer/delete-basket?customerId="+customerId+"&productId="+productId+"&sizeId="+sizeId)
    }
    getBasket(customerId){
        return axios.get("http://localhost:8080/api/customer/get-baskets?customerId="+customerId)
    }


    increaseBudget(customerId,budgetAmount){
        return axios.post("http://localhost:8080/api/customer/increase-budget?amount="+budgetAmount+"&customerId="+customerId)
    }
}

