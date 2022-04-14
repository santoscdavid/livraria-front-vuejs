import { http } from '../config/axios';

export default {
    listar: () => {
        return http.get('Aluguel');
    },
    last: () => {
        return http.get('Aluguel/LastAluguel?PageSize=5');
    },

    salvar: aluguel => {
        return http.post('Aluguel', aluguel);
    },

    atualizar: aluguel => {
        return http.put('Aluguel/' + aluguel.id, aluguel);
    },

    deletar: aluguel => {
        return http.delete('Aluguel/' + aluguel.id);
    },
    paginate: (page, size) => {
        return http.get('Aluguel?PageNumber' + page + '&PageSize=' + size);
    }
};
