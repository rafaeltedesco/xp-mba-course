import chai from 'chai';
import chaiHttp from 'chai-http';
import * as sinon from 'sinon';
import app from '../../src/app';
import connection from '../../src/database/connection';
import { beforeEach } from 'mocha';


// 4) Consulta de todos os proprietários (retornar uma lista com todos os
// proprietários, sendo cada proprietário representado por um objeto JSON com
// todas as propriedades). ✅
// − URL: http://localhost:3000/proprietario
// − Método HTTP: GET
// − Parâmetros: sem parâmetros

// 5) Consulta de um proprietário em específico (pegar o id do proprietário e
// retornar um objeto JSON com suas informações) ✅
// − URL: http://localhost:3000/proprietario/{proprietario_id}
// − Método HTTP: GET
// − Parâmetros: id do proprietário passado diretamente na URL, exemplo de
// um id de valor 15 passado na URL: http://localhost:3000/proprietario/15


chai.use(chaiHttp);

const { expect } = chai;

describe('Test Owner Route', function () {
  beforeEach(sinon.restore)
  describe('Test /POST', function () {
    it('should create an owner with valid data', async function () {
      sinon.stub(connection, 'query').resolves()
      const response = await chai.request(app)
        .post('/proprietario')
        .send({
          nome: 'Devon',
          telefone: '292-682-6873 x17408'
        })
      expect(response).to.have.status(201)
      expect(response.body).to.deep.equal({message: "New owner created!"})
    })
    it('should return status 400 when user send invalid data', async function () {
      let response = await chai.request(app)
        .post('/proprietario')
        .send({
          nome: 'Devon'
        })
      expect(response).to.have.status(400)

      response = await chai.request(app)
        .post('/proprietario')
        .send({
          telefone: '208-748-0076 x5663'
        })
      expect(response).to.have.status(400)
    })
  })
  describe('Test /PUT', function () {
    it('should update an owner', async function () {
      sinon.stub(connection, 'query').resolves({rowCount: 1})
      const response = await chai.request(app)
        .put('/proprietario/1')
        .send({
          nome: 'Lia',
          telefone: '(360) 986-2710 x4295'
        })

      expect(response).to.have.status(200)
      expect(response.body).to.deep.equal({
        message: `Owner updated`
      })
    })
    it('should return status 404 if owner does not exist', async function () {
      sinon.stub(connection, 'query').resolves({rowCount: 0})
      const response = await chai.request(app)
        .put('/proprietario/999')
        .send({
          nome: 'Emmitt',
          telefone: '760.854.5390 x25203'
        })
        expect(response).to.have.status(404);
        expect(response.body).to.deep.equal({
          message:  'Owner with id 999 not found!' 
        })
    })
    it('should return status 400 when data is invalid', async function () {

      let response = await chai.request(app)
        .put('/proprietario/1')
        .send({
          nome: 'Citlalli'
        })
      expect(response).to.have.status(400);

      response = await chai.request(app)
        .put('/proprietario/1')
        .send({
          telefone: '(260) 864-0452 x7838'
        })
      expect(response).to.have.status(400);


    })
  })
  describe('Test /DELETE', function () {
    it('should return status 204 when delete owner', async function () {
      sinon.stub(connection, 'query')
        .onFirstCall().resolves({rows: []})
        .onSecondCall().resolves({rowCount: 1})
      const response = await chai.request(app)
        .delete('/proprietario/7')

      expect(response).to.have.status(204);
    })
    it('should return status 401 when owner has pets', async function () {
      sinon.stub(connection, 'query')
        .onFirstCall().resolves({rows: [{ animal_id: 3, nome: 'Tutu', tipo: 'Cachorro', proprietario_id: 1 }]})
        .onSecondCall().resolves({ rowCount: 0 })
      const response = await chai.request(app)
        .delete('/proprietario/1')
      
      expect(response).to.have.status(401)
      expect(response.body).to.deep.equal({
        message: 'Cannot delete owner with animals'
      })
    })
  })
  
})