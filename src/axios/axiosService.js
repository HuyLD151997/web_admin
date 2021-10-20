import axios from "axios";
import swal from "sweetalert2";

class AxiosService {
  constructor() {
    //axios bộ thư viện hỗ trợ call api
    const intance = axios.create();
    intance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.intance = intance;
  }

  handleSuccess(response) {
    return response;
  }
  handleError(error) {
    if (error.response.status === 401) {
      swal.fire({
        icon: "error",
        text: "Thời gian truy cập hết hạn, xin ĐĂNG NHẬP lại",
        timer: 3000,
      });
      // localStorage.clear();
      // window.location.href = "/";
      return Promise.reject(error);
    }
  }

  get(url, token) {
    return this.intance.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  post(url, body, token) {
    console.log(body);
    return this.intance.post(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  put(url, body, token) {
    return this.intance.put(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  delete(url, token) {
    return this.intance.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new AxiosService();
