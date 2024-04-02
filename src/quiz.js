let currentQuestionIndex = 0;
let score = 0;
let questions = [];

document.getElementById('next-btn').style.display = 'none';

// Função para buscar as perguntas do servidor e reestruturá-las
function fetchQuestions() {
  fetch('http://localhost:3000/questoes')
    .then(response => response.json())
    .then(data => {
      // Reestrutura os dados para agrupar as opções por pergunta
      const groupedQuestions = data.reduce((acc, current) => {
        let question = acc.find(q => q.id === current.id);
        if (question) {
          question.opcoes.push({
            opcaoId: current.opcaoId,
            opcaoTexto: current.opcaoTexto,
            correta: current.correta
          });
        } else {
          acc.push({
            id: current.id,
            texto: current.texto,
            opcoes: [{
              opcaoId: current.opcaoId,
              opcaoTexto: current.opcaoTexto,
              correta: current.correta
            }]
          });
        }
        return acc;
      }, []);

      questions = groupedQuestions;
      displayQuestion();
    })
    .catch(error => console.error('Erro ao buscar questões:', error));
}

// Função para mostrar a questão atual
function displayQuestion() {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = ''; // Limpar questão anterior

  if (currentQuestionIndex >= questions.length) {
    quizContainer.innerHTML = `<div id="final-score">Pontuação Final: ${score}/${questions.length}</div>`;
    document.getElementById('next-btn').style.display = 'none';
    return;
  }

  const question = questions[currentQuestionIndex];
  const questionDiv = document.createElement('div');
  questionDiv.classList.add('question');
  questionDiv.innerText = question.texto;

  const optionsDiv = document.createElement('div');
  optionsDiv.classList.add('options');

  question.opcoes.forEach(option => {
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('option');
    optionDiv.innerText = option.opcaoTexto;
    optionDiv.dataset.correct = option.correta; // Adiciona o atributo para identificar se a opção é correta
    optionDiv.onclick = () => selectOption(option.correta === 1, optionDiv);

    optionsDiv.appendChild(optionDiv);
  });

  quizContainer.appendChild(questionDiv);
  quizContainer.appendChild(optionsDiv);
  document.getElementById('next-btn').style.display = 'none'; // Esconder o botão até que uma opção seja selecionada
}

// Função chamada quando uma opção é selecionada
function selectOption(isCorrect, optionElement) {
  const options = document.querySelectorAll('.option');
  optionElement.classList.add('blink'); // Adiciona a animação de piscada na opção clicada

  setTimeout(() => { // Espera a animação de piscada terminar
    options.forEach(option => {
      option.onclick = null; // Desabilitar mais cliques
      if (option === optionElement) {
        option.classList.add(isCorrect ? 'correct' : 'incorrect');
      } else if (!isCorrect && option.dataset.correct === 'true') {
        option.classList.add('correct'); // Destaca a correta se a escolha foi incorreta
      } else {
        option.classList.add('incorrect');
      }
    });

    if (isCorrect) {
      score++;
    }

    document.getElementById('next-btn').style.display = 'block'; // Mostrar botão para próxima questão
  }, 500); // Tempo correspondente à duração da animação
}

// Função para avançar para a próxima questão
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    // Exibir a pontuação final e reiniciar o quiz
    document.getElementById('quiz-container').innerHTML = `<h3>Seu resultado final é ${score} de ${questions.length}.</h3>`;
    document.getElementById('next-btn').style.display = 'none';
  }
}

// Iniciar o quiz
fetchQuestions();

document.getElementById('next-btn').addEventListener('click', nextQuestion);
