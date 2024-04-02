// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const questao1 = await prisma.questao.create({
    data: {
      texto: 'Como agir quando o sinal fica vermelho?',
      opcoes: {
        create: [
          { texto: 'Parar', correta: true },
          { texto: 'Acelerar', correta: false },
          { texto: 'Continuar dirigindo', correta: false },
          // Adicione mais opções conforme necessário
        ],
      },
    },
  });

  console.log({ questao1 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
