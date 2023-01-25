import axios from "axios";

export default class RefundService {
  addRefund(cause,orderDetailId) {
    return axios.post("http://localhost:8080/api/refund/request-refund?cause="+cause+"&orderDetailId="+orderDetailId);
  }
}
