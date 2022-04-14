import { http } from '../config/axios';

export default {
    listar: () => {
        return http.get('Livro');
    },
    findId: id => {
        return http.get('Livro/' + id);
    },
    salvar: livro => {
        return http.post('Livro', livro);
    },
    atualizar: livro => {
        return http.put('Livro/' + livro.id, livro);
    },
    deletar: livro => {
        return http.delete('Livro/' + livro.id);
    },
    forAluguel: () => {
        return http.get('Livro/ForAluguel');
    },
    paginate: (page, size) => {
        return http.get('Livro?PageNumber' + page + '&PageSize=' + size);
    }
};
