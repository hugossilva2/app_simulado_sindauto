const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const novaQuestao = await prisma.questao.create({
    data: {
      texto: 'Qual a capital do brasil?',
      opcoes: {
        create: [
          { texto: 'Paris', correta: false },
          { texto: 'Londres', correta: false },
          { texto: 'Brasilia', correta: true },
          { texto: 'Madri', correta: false },
          { texto: 'Bali', correta: false },
        ],
      },
    },
  });

  console.log('Questão inserida:', novaQuestao);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
