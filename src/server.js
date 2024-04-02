const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(express.json());

// Rota para buscar todas as questões com suas opções
app.get('/questoes', async (req, res) => {
  try {
    const questoes = await prisma.questao.findMany({
      include: {
        opcoes: true, // Inclui as opções relacionadas à questão
      },
    });
    res.json(questoes);
  } catch (error) {
    console.error('Erro ao buscar questões:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
