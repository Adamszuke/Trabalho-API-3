const express = require('express');
const Database = require('better-sqlite3');

const app = express();
const db = new Database('filmes.db');

app.use(express.json());

const jwt = require('jsonwebtoken');
const SECRET_KEY = "sua_chave_secreta_super_segura"; 

app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    if (usuario === 'admin' && senha === '1234') {
        const token = jwt.sign({ id: 1, nome: 'Admin' }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ auth: true, token });
    }

    res.status(401).json({ erro: "Usuário ou senha inválidos" });
});

function verificarJWT(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ erro: "Nenhum token fornecido." });

    const bearerToken = token.split(' ')[1];

    jwt.verify(bearerToken, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ erro: "Token inválido ou expirado." });
        
        req.usuarioId = decoded.id; 
        next(); 
    });
}


app.post('/filmes', (req, res) => {
    const { nome, diretor } = req.body;

    if (!nome || !diretor || nome.length < 2) {
        return res.status(400).json({ erro: "Nome e diretor são obrigatórios e devem ser válidos." });
    }

    try {
        const stmt = db.prepare('INSERT INTO filmes (nome, diretor) VALUES (?, ?)');
        const info = stmt.run(nome, diretor);
        res.status(201).json({ id: info.lastInsertRowid, nome, diretor });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao salvar no banco de dados." });
    }
});

app.get('/filmes', (req, res) => {
    let { limit = 10, page = 1, sort = 'id', order = 'ASC', busca = '' } = req.query;
    
    const offset = (page - 1) * limit;

    try {
        const filmes = db.prepare(`
            SELECT * FROM filmes 
            WHERE nome LIKE ? 
            ORDER BY ${sort === 'nome' ? 'nome' : 'id'} ${order === 'DESC' ? 'DESC' : 'ASC'}
            LIMIT ? OFFSET ?
        `).all(`%${busca}%`, limit, offset);

        const total = db.prepare('SELECT COUNT(*) as count FROM filmes').get().count;

        res.json({
            total_registros: total,
            pagina_atual: Number(page),
            dados: filmes
        });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar filmes." });
    }
});

app.put('/filmes/:id', (req, res) => {
    const { id } = req.params;
    const { nome, diretor } = req.body;

    const filme = db.prepare('SELECT * FROM filmes WHERE id = ?').get(id);
    if (!filme) return res.status(404).json({ erro: "Filme não encontrado." });

    try {
        db.prepare('UPDATE filmes SET nome = ?, diretor = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
          .run(nome || filme.nome, diretor || filme.diretor, id);
        
        res.json({ mensagem: "Filme atualizado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao atualizar." });
    }
});

app.delete('/filmes/:id', (req, res) => {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM filmes WHERE id = ?').run(id);

    if (result.changes === 0) {
        return res.status(404).json({ erro: "Filme não encontrado." });
    }

    res.status(204).send(); // Sucesso sem conteúdo
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});


module.exports = app;