import axios from "axios";

export default class AdminService {
  getAllLogs() {
    return axios.get("http://localhost:8080/api/log/get-all");
  }
  activateCustomer(customerId) {
    return axios.post("http://localhost:8080/api/admin/set-active?customerId="+customerId);
  }
}
