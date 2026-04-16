const request = require('supertest');
const app = require('./index'); // Importa seu app Express

describe('Testes da API de Filmes', () => {
    
    // Teste de Listagem
    it('Deve listar todos os filmes com status 200', async () => {
        const res = await request(app).get('/filmes');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('dados');
    });

    // Teste de Criação (Sucesso)
    it('Deve criar um novo filme com sucesso', async () => {
        const res = await request(app)
            .post('/filmes')
            .send({
                nome: "Filme de Teste",
                diretor: "Diretor de Teste"
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.nome).toBe("Filme de Teste");
    });

    // Teste de Validação (Erro)
    it('Não deve criar um filme sem nome', async () => {
        const res = await request(app)
            .post('/filmes')
            .send({
                diretor: "Diretor Solitário"
            });
        expect(res.statusCode).toEqual(400); // Bad Request
    });
});