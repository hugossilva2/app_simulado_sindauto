let currentQuestionIndex = 0;
let score = 0;
let questions = [];

document.getElementById('next-btn').style.display = 'none';

// Função para buscar as perguntas do servidor
function fetchQuestions() {
  fetch('http://localhost:3000/questoes')
    .then(response => response.json())
    .then(data => {
      questions = data;
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
    optionDiv.innerText = option.texto;
    optionDiv.onclick = () => selectOption(option.correta, optionDiv);
    optionsDiv.appendChild(optionDiv);
  });

  quizContainer.appendChild(questionDiv);
  quizContainer.appendChild(optionsDiv);
  document.getElementById('next-btn').style.display = 'none'; // Esconder o botão até que uma opção seja selecionada
}

// Função chamada quando uma opção é selecionada
function selectOption(isCorrect, optionElement) {
  const options = document.querySelectorAll('.option');
  options.forEach(option => {
    option.onclick = null; // Desabilitar mais cliques
    option.classList.add('incorrect'); // Assume inicialmente que todas as opções são incorretas
  });

  if (isCorrect) {
    optionElement.classList.add('correct'); // Destaca a opção correta
    score++;
  } else {
    optionElement.classList.add('blink'); // Adiciona efeito de piscar para resposta incorreta
  }

  document.getElementById('next-btn').style.display = 'block'; // Mostrar botão para próxima questão
}

// Função para avançar para a próxima questão
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    // Exibir a pontuação final e oferecer reinício do quiz
    document.getElementById('quiz-container').innerHTML = `<h3>Seu resultado final é ${score} de ${questions.length}.</h3>`;
    document.getElementById('next-btn').style.display = 'none';
  }
}

// Iniciar o quiz
fetchQuestions();

document.getElementById('next-btn').addEventListener('click', () => {
  nextQuestion();
});
