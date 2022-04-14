import { http } from "../config/axios";

export default {

    listar: () => {
        return http.get('Editora')
    },

    salvar: (editora) => {
        return http.post('Editora', editora)
    },

    atualizar: (editora) => {
        return http.put('Editora/'+editora.id, editora)
    },

    deletar: (editora) => {
        return http.delete('Editora/'+editora.id)
    },
    paginate: (page, size) => {
        return http.get('Editora?PageNumber'+page+'&PageSize='+size);
    }

}