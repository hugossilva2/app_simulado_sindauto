const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

// Conectando ao banco de dados SQLite
const db = new sqlite3.Database(':memory:');

// Middleware
app.use(bodyParser.json());

// Inicializando o banco de dados com algumas perguntas e opções de resposta
db.serialize(() => {
  db.run('CREATE TABLE questoes (id INTEGER PRIMARY KEY, texto TEXT NOT NULL)');
  db.run('CREATE TABLE opcoes (id INTEGER PRIMARY KEY, questao_id INTEGER, texto TEXT NOT NULL, correta INTEGER, FOREIGN KEY(questao_id) REFERENCES questoes(id))');

  // Inserir pergunta específica e suas opções
  db.run('INSERT INTO questoes (texto) VALUES (?)', ['Como agir quando o sinal ficar vermelho?'], function (err) {
    if (err) {
      return console.log(err.message);
    }
    // O ID da pergunta inserida é recuperado por this.lastID
    const questaoId = this.lastID;

    // Opções de resposta
    const opcoes = [
      ['Parar', 1], // marcando esta opção como correta
      ['Ficar atento', 0],
      ['Ignorar', 0],
      ['Buzinar', 0],
      ['Acelerar', 0]
    ];

    


    // Inserir opções de resposta
    opcoes.forEach(([texto, correta]) => {
      db.run('INSERT INTO opcoes (questao_id, texto, correta) VALUES (?, ?, ?)', [questaoId, texto, correta], (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    });
  });
});

// Rota para buscar perguntas e opções de resposta
app.get('/questoes', (req, res) => {
  db.all('SELECT questoes.id, questoes.texto, opcoes.id AS opcaoId, opcoes.texto AS opcaoTexto, opcoes.correta FROM questoes JOIN opcoes ON questoes.id = opcoes.questao_id', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erro ao buscar questões');
      return;
    }
    res.json(rows);
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
