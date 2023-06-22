let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

document.querySelector(".scoreArea button").addEventListener("click", resetEvent);

function showQuestion() {
  if(questions[currentQuestion]) {
    let q = questions[currentQuestion];
    let pct = Math.floor((currentQuestion / questions.length) * 100);

    document.querySelector(".progress--bar").style.width = `${pct}%`;
    document.querySelector(".scoreArea").style.display = "none";
    document.querySelector(".questionArea").style.display = "block";
    document.querySelector(".question").innerHTML = q.question;
    document.querySelector(".options").innerHTML = "";

    let optionsHtml = "";
    for(let i in q.options) {
      optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
    }
    document.querySelector(".options").innerHTML = optionsHtml;
    document.querySelectorAll(".options .option").forEach(item => {
      item.addEventListener("click", optionClickEvent);
    });
  } else {
    finishQuiz();
  }
}

function optionClickEvent(e) {
  let clickedOption = parseInt(e.target.getAttribute("data-op"));

  if(questions[currentQuestion].answer === clickedOption) {
    correctAnswers++;
  } 

  currentQuestion++;
  showQuestion();
}

function finishQuiz() {
  let points = Math.floor((correctAnswers / questions.length) * 100);

  if(points <= 20) {
    document.querySelector(".scoreText1").innerHTML = "Péssimo 💩😭";
    document.querySelector(".scorePct").style.color = "brown";
  } else if(points > 20 && points <= 40) {
    document.querySelector(".scoreText1").innerHTML = "Ruim 👎😞";
    document.querySelector(".scorePct").style.color = "red";
  } else if(points > 40 && points <= 60) {
    document.querySelector(".scoreText1").innerHTML = "Bom 👍🙂";
    document.querySelector(".scorePct").style.color = "yellow";
  } else if(points > 60 && points <= 80) {
    document.querySelector(".scoreText1").innerHTML = "Ótimo 💪😁";
    document.querySelector(".scorePct").style.color = "blue";
  } else if(points > 80) {
    document.querySelector(".scoreText1").innerHTML = "Excelente 🫶🤩";
    document.querySelector(".scorePct").style.color = "green";
  }

  document.querySelector(".scorePct").innerHTML = `Acertou ${points}%`;
  document.querySelector(".scoreText2").innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;
  document.querySelector(".scoreArea").style.display = "block";
  document.querySelector(".questionArea").style.display = "none";
  document.querySelector(".progress--bar").style.width = "100%";
}

function resetEvent() {
  correctAnswers = 0;
  currentQuestion = 0;
  showQuestion();
}