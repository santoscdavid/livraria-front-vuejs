import { http } from "../config/axios";

export default {

    listar: () => {
        return http.get('Usuario')
    },

    salvar: (usuario) => {
        return http.post('Usuario', usuario)
    },

    atualizar: (usuario) => {
        return http.put('Usuario/'+usuario.id, usuario)
    },

    deletar: (usuario) => {
        return http.delete('Usuario/'+usuario.id)
    },
    paginate: (page, size) => {
        return http.get('Usuario?PageNumber'+page+'&PageSize='+size);
    }
    
}