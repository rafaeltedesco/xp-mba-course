import chai from 'chai';
import chaiHttp from 'chai-http';
import * as sinon from 'sinon';
import * as animalMock from '../mocks/animal/animal.mock';
import * as ownerMock from '../mocks/owner/owner.mock';
import app from '../../src/app';
import connection from '../../src/database/connection';

// 2) Atualização de um animal
// − URL: http://localhost:3000/animal ✅
// − Método HTTP: PUT
// − Parâmetros: objeto JSON com o id do animal que será atualizado, o
// nome, tipo e id do proprietário do animal que serão atualizados.

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
    describe('Test /GET/:id', function () {
        it('should return an animal with id 1', async function () {
            sinon.stub(connection, 'query').resolves({rows: [animalMock.animal]})
            const response = await chai.request(app)
                .get('/animal/1')
            expect(response).to.have.status(200)
            expect(response.body).to.deep.equal(animalMock.animal)
        })
        it('should return status 404 when animal does not exist', async function () {
            sinon.stub(connection, 'query').resolves({rows: []})
            const response = await chai.request(app)
                .get('/animal/999')
            expect(response).to.have.status(404)
            expect(response.body).to.deep.equal({
                message: "Animal with id 999 not found!"
            })
        })
    })
    describe('Test /DELETE', function () {
        it('should return status 204 when delete valid animal', async function () {
            const animalId = 1
            sinon.stub(connection, 'query').resolves({rowCount: 1})
            const response = await chai.request(app)
                .delete(`/animal/${animalId}`)
            expect(response).to.have.status(204)
        })
        it('should return 404 when delete invalid animal', async function () {
            const animalId = 999
            sinon.stub(connection, 'query').resolves({rowCount: 0})
            const response = await chai.request(app)
                .delete(`/animal/${animalId}`)
            expect(response).to.have.status(404)
            expect(response.body).to.deep.equal({
                "message": "Animal with id 999 not found!"
              })
        })
    })
    describe('Test /GET?proprietario_id', function () {
        it('should return all animais from owner with id 2', async function () {
            sinon.stub(connection, 'query').resolves({rows: animalMock.animalsOwner2})
            const response = await chai.request(app)
                .get('/animal')
                .query({
                    proprietario_id: 2
                })
            expect(response).to.have.status(200)
            expect(response.body).to.be.deep.equal({
                length: 2, animals: animalMock.animalsOwner2
            })
        })
        it('should update an animal that belongs to someone', async function () {
            const owner = ownerMock.owner
            sinon.stub(connection, 'query')
                .onFirstCall().resolves({rows: [{
                    owner
                }]})
                .onSecondCall().resolves({rowCount:1})
            const response = await chai.request(app)
                .put('/animal/1')
                .send({
                    proprietario_id: 1,
                    nome: 'Ratonero Murciano de Huerta',
                    tipo: 'Cachorro'
                })
            expect(response).to.have.status(200)
            expect(response.body).to.deep.equal({
                message: 'Animal updated'
              })
        })
    })
})