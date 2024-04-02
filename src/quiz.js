document.addEventListener('DOMContentLoaded', () => {
  let currentQuestionIndex = 0;
  let score = 0;
  let questions = [];

  const nextBtn = document.getElementById('next-btn');
  const quizContainer = document.getElementById('quiz-container');

  nextBtn.style.display = 'none';

  const fetchQuestions = () => {
    fetch('http://localhost:3000/questoes')
      .then(response => response.json())
      .then(data => {
        questions = data;
        displayQuestion();
      })
      .catch(error => console.error('Erro ao buscar questões:', error));
  };

  const displayQuestion = () => {
    if (currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      quizContainer.innerHTML = `<div class="question">${question.texto}</div>`;

      const optionsDiv = document.createElement('div');
      optionsDiv.classList.add('options');

      question.opcoes.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option');
        optionDiv.innerText = option.texto;
        optionDiv.addEventListener('click', () => selectOption(option.correta, optionDiv));
        optionsDiv.appendChild(optionDiv);
      });

      quizContainer.appendChild(optionsDiv);
      nextBtn.style.display = 'none';
    } else {
      showFinalScore();
    }
  };

  const selectOption = (isCorrect, optionElement) => {
    document.querySelectorAll('.option').forEach(option => {
      option.classList.add('incorrect');
      option.removeEventListener('click', selectOption);
    });

    if (isCorrect) {
      optionElement.classList.remove('incorrect');
      optionElement.classList.add('correct');
      score++;
    } else {
      optionElement.classList.add('blink');
    }

    nextBtn.style.display = 'block';
  };

  const nextQuestion = () => {
    currentQuestionIndex++;
    displayQuestion();
  };

  const showFinalScore = () => {
    quizContainer.innerHTML = `<h3>Seu resultado final é ${score} de ${questions.length} questões.</h3>`;
    nextBtn.style.display = 'none';
  };

  nextBtn.addEventListener('click', nextQuestion);

  fetchQuestions();
});
