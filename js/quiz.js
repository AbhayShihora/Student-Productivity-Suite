document.addEventListener('DOMContentLoaded', () => 
{
  const quizBox = document.getElementById('quizBox');
  const nextBtn = document.getElementById('nextBtn');
  const restartBtn = document.getElementById('restartBtn');

  const questions = [
    {
      q: 'What does HTML stand for?',
      options: ['HyperText Markup Language', 'Home Tool Markup Language', 'Hyperlinks Text Mark Language'],
      answer: 0
    },
    {
      q: 'Which tag is used for a paragraph?',
      options: ['<p>', '<para>', '<paragraph>'],
      answer: 0
    },
    {
      q: 'Which language adds behavior to web pages?',
      options: ['CSS', 'JavaScript', 'HTML'],
      answer: 1
    },
    {
      q: 'Which CSS property changes text color?',
      options: ['color', 'font-color', 'text-color'],
      answer: 0
    }
  ];

  let current = 0;
  let score = 0;

  function renderQuestion() 
  {
    const item = questions[current];
    quizBox.innerHTML = '';

    const qEl = document.createElement('div');
    qEl.className = 'question';
    qEl.textContent = `${current + 1}. ${item.q}`;
    quizBox.appendChild(qEl);

    const opts = document.createElement('div');
    opts.className = 'options';

    item.options.forEach((opt, i) => 
    {
      const optEl = document.createElement('label');
      optEl.className = 'option';
      optEl.tabIndex = 0;

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quizOpt';
      radio.value = i;
      radio.setAttribute('aria-label', opt);

      const span = document.createElement('div');
      span.className = 'option-label';
      span.textContent = opt;

      optEl.appendChild(radio);
      optEl.appendChild(span);

      opts.appendChild(optEl);
    });

   quizBox.appendChild(opts);
  }

  function handleNext() {
    const checked = document.querySelector('input[name="quizOpt"]:checked');
    if (!checked) {
      alert('Please choose an option.');
      return;
    }
    const selected = Number(checked.value);
    if (selected === questions[current].answer) score++;

    current++;
    if (current >= questions.length) {
      showResult();
    } else {
      renderQuestion();
    }
  }

  function showResult() {
    quizBox.innerHTML = `
      <div class="result">
        <h3>Your score: ${score} / ${questions.length}</h3>
        <p class="muted">Good job! You can restart or review the quiz.</p>
      </div>
    `;
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
  }

  function restart() {
    current = 0;
    score = 0;
    nextBtn.style.display = 'inline-block';
    restartBtn.style.display = 'none';
    renderQuestion();
  }

  nextBtn.addEventListener('click', handleNext);
  restartBtn.addEventListener('click', restart);

  renderQuestion();
});
