import axios from 'axios';

export default class OrderService {
    giveOrder(order){
        if(order.campaignCode == null){
            order.campaignCode = "zeroDiscount";
        }
        return axios.post("http://localhost:8080/api/order/give-order?billLocationId="+order.billingAddress+"&customerId="+order.userId+"&discountCode="+order.campaignCode+"&locationId="+order.shippingAddress);
    }
    getAll(){
        return axios.get("http://localhost:8080/api/order/get-all");
    }
    deleteOrder(orderId){
        return axios.delete("http://localhost:8080/api/order/delete?orderId="+orderId);
    }
}