class AbrigoAnimais {

    animais = {
        'Rex': {
            especie: 'cão',
            brinquedos: ['RATO', 'BOLA']
        },
        'Mimi': {
            especie: 'gato',
            brinquedos: ['BOLA', 'LASER']
        },
        'Fofo': {
            especie: 'gato',
            brinquedos: ['BOLA', 'RATO', 'LASER']
        },
        'Zero': {
            especie: 'gato',
            brinquedos: ['RATO', 'BOLA']
        },
        'Bola': {
            especie: 'cão',
            brinquedos: ['CAIXA', 'NOVELO']
        },
        'Bebe': {
            especie: 'cão',
            brinquedos: ['LASER', 'RATO', 'BOLA']
        },
        'Loco': {
            especie: 'jabuti',
            brinquedos: ['SKATE', 'RATO']
        }
    };

    encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
        const listaAnimais = ordemAnimais.split(',');
        const brinquedosP1 = brinquedosPessoa1.split(',');
        const brinquedosP2 = brinquedosPessoa2.split(',');

        if (this.duplicados(listaAnimais)) {
            return {
                erro: 'Animal inválido'
            };
        }

        if (this.duplicados(brinquedosP1) || this.duplicados(brinquedosP2)) {
            return {
                erro: 'Brinquedo inválido'
            };
        }

        for (const animal of listaAnimais) {
            if (!this.animais[animal]) {
                return {
                    erro: 'Animal inválido'
                };
            }
        }

        if (listaAnimais.length === 1 && listaAnimais[0] === 'Loco') {
            return {
                lista: ['Loco - abrigo']
            };
        }

        let adotante1 = 0;
        let adotante2 = 0;
        const resultados = [];

        for (const nomeAnimal of listaAnimais) {
            const infoAnimal = this.animais[nomeAnimal];
            const brinquedosAnimal = infoAnimal.brinquedos;
            const especie = infoAnimal.especie;

            const pessoa1 = this.podeAdotar(brinquedosAnimal, brinquedosP1, especie);
            const pessoa2 = this.podeAdotar(brinquedosAnimal, brinquedosP2, especie);

            let status;

            if (pessoa1 && pessoa2) {
                status = 'abrigo';
            } else if (pessoa1 && adotante1 < 3) {
                status = 'pessoa 1';
                adotante1++;
            } else if (pessoa2 && adotante2 < 3) {
                status = 'pessoa 2';
                adotante2++;
            } else {
                status = 'abrigo';
            }

            resultados.push({
                nome: nomeAnimal,
                status: status
            });       
        }
        resultados.sort((a, b) => a.nome.localeCompare(b.nome));

        const listaFinal = resultados.map(item => `${item.nome} - ${item.status}`);

        return {
            lista: listaFinal
        };
    }

    duplicados(lista) {
        const itensVistos = [];
        for (let i = 0; i < lista.length; i++) {
            const itemAtual = lista[i];
            if (itensVistos.includes(itemAtual)) {
                return true;
            }
            itensVistos.push(itemAtual);
        }
        return false;
    }

    podeAdotar(brinquedosAnimal, brinquedosPessoa, especie) {
        if (especie === 'jabuti') {
            return brinquedosPessoa.length > 0;
        }

        if (especie === 'gato') {
           for (const brinquedoGato of brinquedosAnimal) {
                if (!brinquedosPessoa.includes(brinquedoGato)) {
                    return false;
                }
            }
            return true;
        }

        let indicePessoa = 0;
        for (const brinquedoAnimal of brinquedosAnimal) {
            const indiceEncontrado = brinquedosPessoa.indexOf(brinquedoAnimal, indicePessoa);
            
            if (indiceEncontrado === -1) {
                return false;
            }
            
            indicePessoa = indiceEncontrado + 1;
        }

        return true;
    }
}

export {
    AbrigoAnimais as AbrigoAnimais
};
