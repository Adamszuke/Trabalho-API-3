# 🎬 API de Catálogo de Filmes (TRABALHO-API-3)

Este projeto é uma API REST robusta desenvolvida para a gestão de um catálogo de filmes. O sistema permite criar, ler, atualizar e deletar (CRUD) registros, contando com funcionalidades avançadas como paginação, ordenação e filtros de busca.

---

## 🚀 Tecnologias Utilizadas

* **Node.js**: Ambiente de execução.
* **Express**: Framework web para criação das rotas.
* **Better-SQLite3**: Banco de dados SQL leve e rápido.
* **Joi**: Validação robusta de dados.

---

## 🛠️ Como Instalar e Rodar

1.  **Clonar o repositório** (ou baixar os arquivos):
    ```bash
    git clone <url-do-repositorio>
    ```

2.  **Instalar as dependências**:
    ```bash
    npm install
    ```

3.  **Configurar o Banco de Dados**:
    Execute o arquivo de teste/população para criar a tabela e inserir os 20 registros iniciais:
    ```bash
    node test.js
    ```

4.  **Iniciar o Servidor**:
    ```bash
    node index.js
    ```
    O servidor estará rodando em: `http://localhost:3000`

---

## 📌 Documentação da API (Endpoints)

### 1. Filmes

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| **GET** | `/filmes` | Lista filmes com paginação e filtros. |
| **POST** | `/filmes` | Cadastra um novo filme. |
| **PUT** | `/filmes/:id` | Atualiza os dados de um filme existente. |
| **DELETE** | `/filmes/:id` | Remove um filme do catálogo. |

#### 🔍 Detalhes da Listagem (GET)
Você pode utilizar parâmetros na URL para filtrar os resultados:
* `busca`: Filtra por nome do filme (Ex: `/filmes?busca=Interstellar`).
* `page`: Define a página (Padrão: 1).
* `limit`: Quantidade de registros por página (Padrão: 10).
* `sort`: Ordena por `id` ou `nome`.
* `order`: Define ordem `ASC` (ascendente) ou `DESC` (descendente).

---

## 🛡️ Validações e Status Codes

A API segue os padrões REST para respostas:

* **200 OK**: Requisição realizada com sucesso.
* **210 Created**: Registro criado com sucesso.
* **204 No Content**: Registro deletado com sucesso.
* **400 Bad Request**: Erro de validação (campos vazios ou curtos).
* **404 Not Found**: Filme não encontrado pelo ID.
* **500 Internal Server Error**: Erro inesperado no servidor.

---

## 📂 Arquivos do Projeto

* `index.js`: Código principal da API.
* `filmes.db`: Arquivo do banco de dados SQLite.
* `test.js`: Script para criação da tabela e inserção de 20 registros.
* `Postman_Collection.json`: Arquivo para importar no Postman e testar as rotas.

---

Desenvolvido como parte do Trabalho de API - Semestre 2026.