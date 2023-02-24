import chai from 'chai';
import chaiHttp from 'chai-http';
import * as sinon from 'sinon';
import * as animalMock from '../mocks/animal/animal.mock';
import app from '../../src/app';
import connection from '../../src/database/connection';

// 2) Atualização de um animal
// − URL: http://localhost:3000/animal ✅
// − Método HTTP: PUT
// − Parâmetros: objeto JSON com o id do animal que será atualizado, o
// nome, tipo e id do proprietário do animal que serão atualizados.

// 3) Exclusão de um animal ✅
// − URL: http://localhost:3000/animal/{animal_id}
// − Método HTTP: DELETE
// − Parâmetros: id do animal passado diretamente na URL, exemplo de um
// id de valor 15 passado na URL: http://localhost:3000/animal/15.

// 4) Consulta de todos os animais (retornar uma lista com todos os animais,
// sendo cada animal representado por um objeto JSON com todas as
// propriedades). ✅
// − URL: http://localhost:3000/animal
// − Método HTTP: GET
// − Parâmetros: sem parâmetros.

// 5) Consulta de um animal em específico (pegar o id do animal e retornar um
// objeto JSON com suas informações). ✅
// − URL: http://localhost:3000/animal/{animal_id}
// − Método HTTP: GET
// − Parâmetros: id do animal passado diretamente na URL, exemplo de um
// id de valor 15 passado na URL: http://localhost:3000/animal/15

// 6) Consulta dos animais de um proprietário em específico (pegar o id do
// proprietário na URL e retornar uma lista dos seus animais, sendo cada animal
// representado por um objeto JSON com todas as propriedades). ✅
// − URL: http://localhost:3000/animal?proprietario_id={proprietario_id}
// − Método HTTP: GET
// − Parâmetros: id do proprietário passado diretamente na URL, exemplo de
// um id de valor 15 passado na URL:
// http://localhost:3000/animal?proprietario_id=15 (Sugestão: pode ser
// usado a mesma estrutura do endpoint do item 4 que consulta todos os
// animais, só que aqui nesse caso ele receberia um parâmetro para filtrar
// o proprietário).

chai.use(chaiHttp);

const { expect } = chai;

describe('Test Animal', function () {
    beforeEach(sinon.restore)
    describe('Test /POST', function () {
        it('should create an animal with valid data', async function () {
            sinon.stub(connection, 'query').
            onFirstCall().resolves({rows: [{
                "proprietario_id": 1,
                "nome": "Alda Valentim",
                "telefone": "(39) 98566-1222"
              }]})
            .onSecondCall().resolves()
            const response = await chai.request(app)
                .post('/animal')
                .send({
                    nome: 'Boston Terrier',
                    tipo: 'Cachorro',
                    proprietario_id: 1
                })
            expect(response).to.have.status(201);
            expect(response.body).to.deep.equal({
                message: 'New Animal created!'
            })
        })
        it('should return status 401 when invalid owner', async function () {
            sinon.stub(connection, 'query')
                .onFirstCall().resolves({rows: []})
                .onSecondCall().resolves()
            const response = await chai.request(app)
                .post('/animal')
                .send({
                    nome: 'Magyar agár',
                    tipo: 'Cachorro',
                    proprietario_id: 999
                })
            expect(response).to.have.status(401)
            expect(response.body).to.deep.equal({
                message: 'Cannot create an Animal with invalid Owner Id'
            })
        })
    })
    describe('Test /GET', function () {
        it('should return all animals and status 200', async function () {
            sinon.stub(connection, 'query').resolves({rows:animalMock.animals})
            const response = await chai.request(app)
                .get('/animal')
            expect(response).to.have.status(200)
            expect(response.body).to.deep.equal(animalMock.animals)
        }) 
    })
})