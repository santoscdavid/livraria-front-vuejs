import { http } from "../config/axios";

export default {
    
    login: (dados) => {
        return http.post('Admin/login', dados)
    },
    cadastrar: (dados) => {
        return http.post('Admin/cadastrar', dados)
    }
    
}