import {PessoaCachorro} from '../../module/pessoa_cachorro.js';

async function verificaRelacao(pessoaId, cachorroId) {
    const relacao = await PessoaCachorro.findOne({
        where: {
            PessoaId: pessoaId,
            CachorroId: cachorroId
        }
    });
    if (relacao) {
        return true;      
    }
    return false;
}

async function criaRelacao(pessoaId, cachorroId) {
    const relacao = await PessoaCachorro.create({
        PessoaId: pessoaId,
        CachorroId: cachorroId
    });
    return true;
}

export {verificaRelacao, criaRelacao};