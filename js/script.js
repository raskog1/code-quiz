let container = document.querySelector(".container");
let mainBox = document.querySelector("#main-box");
let startButton = document.querySelector("#start-button");
let submitButton = document.querySelector("#submit-button");
let playAgainButton = document.querySelector("#play-again");
let leaderboardButton = document.querySelector("#leaderboard");
let timerScore = document.querySelector("#timer-score");
let listAnswers = document.querySelector("#list-answers");
let secondBox = document.querySelector("#second-box");
let addInitials = document.querySelector("#add-initials");
let dialogue = document.querySelector("#main-dialogue");
let questionDisplay = document.querySelector("#question-display");

// Variables used in code
let questions = [
    {
        question: "A boolean represents what type of values?",
        wrongAnswers: ["Spooky ghost verbage.", "Words or sets of characters.", "Imaginary numbers."],
        rightAnswer: "True and false.",
    },
    {
        question: "How many header tags are inherent in HTML?",
        wrongAnswers: ["7", "3", "4"],
        rightAnswer: "6",
    },
    {
        question: "The setTimer() function will execute an action after how many _______ are specified?",
        wrongAnswers: ["seconds", "nanoseconds", "minutes"],
        rightAnswer: "milliseconds",
    },
    {
        question: "Which element is not an HTML semantic element?",
        wrongAnswers: ["Article", "Aside", "Nav"],
        rightAnswer: "List",
    },
    {
        question: "Pseudocode means to do what?",
        wrongAnswers: ["Write code at an accelerated pace.", "Check code for bugs and errors.", "Visit a psychic for coding assistance."],
        rightAnswer: "Write code informally and informatively to help in development.",
    },
    {
        question: "Where should an external JavaScript file be linked in an HTML document?",
        wrongAnswers: ["In the header.", "At the end of the document, after the body.", "At the beginning of the body."],
        rightAnswer: "At the end of the body, before the closing body tag",
    },
    {
        question: "Media Queries are used to do what?",
        wrongAnswers: ["Ask a question to your local news station.", "Allow gaming devices to access your code.", "Create search tags that browsers will look for."],
        rightAnswer: "Define how CSS styles are applied on various devices",
    },
    {
        question: "What is not true about Bootstrap?",
        wrongAnswers: ["It increases development speed.", "It is used for mobile first apps.", "It is the most popular front end framework."],
        rightAnswer: "It is an obsolete coding language.",
    },
    {
        question: "Which of the following is not a comparison operator?",
        wrongAnswers: [">=", "===", "<"],
        rightAnswer: "=",
    },
    {
        question: "Which of the following would not create a variable?",
        wrongAnswers: ["let", "var", "const"],
        rightAnswer: "make",
    }

]
let ansBank = [];
let highScores = [];
let q = 0;
let quizTimer = 99;
let innerTimer = 10;
let startTimer = 3;
let totalScore = 100;

// Executes on screen load, creates h2, p, and ammends button
function onLoad() {
    playAgainButton.style.display = "none";
    leaderboardButton.style.display = "none";
    addInitials.style.display = "none";
    submitButton.style.display = "none";
}

onLoad();

// Randomize array of questions
function questArr() {
    shuffle(questions);
}

// Puts all answers in an array for random order output
function answerArr(quest) {
    ansBank.push(quest.rightAnswer);
    for (i = 0; i < quest.wrongAnswers.length; i++) {
        ansBank.push(quest.wrongAnswers[i]);
    }
}

// Initializes countdown timer and total quiz timer
function startQuiz() {

    questArr();
    q = 0;
    quizTimer = 99;
    startTimer = 3;
    totalScore = 100;
    startButton.style.display = "none";
    mainBox.firstElementChild.textContent = "Get ready, the quiz will begin in: ";
    dialogue.remove();

    let bigTime = document.createElement("h1");
    mainBox.appendChild(bigTime);

    // Starts countdown timer
    timer = setInterval(function () {
        if (startTimer >= 0) {
            bigTime.textContent = startTimer;
            startTimer--;
        } else {
            clearInterval(timer);
            mainBox.lastElementChild.remove(); // Deletes h1 element

            // Starts quizTimer
            let timeLeft = document.createElement("h3");
            timerScore.appendChild(timeLeft);

            timer2 = setInterval(function () {
                if (quizTimer >= 0) {
                    timeLeft.textContent = quizTimer;
                    quizTimer--;
                } else {
                    clearInterval(timer2);
                }
            }, 1000);
            listAns();
        }
    }, 1000);
}

// Puts all answers into HTML as list item buttons
function listAns() {

    innerTimer = 10;
    ansBank = [];
    listAnswers.innerHTML = "";
    answerArr(questions[q]);
    shuffle(ansBank);
    mainBox.firstElementChild.textContent = "Coding Quiz";
    questionDisplay.textContent = (questions[q].question);

    for (i = 0; i < ansBank.length; i++) {
        let ansButton = document.createElement("button");
        ansButton.id = i;
        ansButton.textContent = ansBank[i];
        ansButton.setAttribute("class", "btn btn-primary");
        listAnswers.append(ansButton);
    }

    // Internal timer gives 10 seconds to answer each question
    timer = setInterval(function () {
        if (innerTimer > 0 && quizTimer > 0) {
            innerTimer--;
        } else if (innerTimer <= 0 && quizTimer > 0) {
            clearInterval(timer);
            nextQuestion();
            totalScore -= 10;
        } else {
            endQuiz();
        }
    }, 1000);
}

// Compares answer to correct answer, updates totalScore
function checkAndScore() {

    if (event.target.matches("button")) {
        event.preventDefault();
        let chosenId = event.target.id;
        let answerId = ansBank.indexOf(questions[q].rightAnswer);

        if (chosenId == answerId) {
            clearInterval(timer);
            totalScore -= (10 - innerTimer);
            container.style.border = "10px solid #28a745";
            nextQuestion();
        } else {
            clearInterval(timer);
            quizTimer -= 10;
            totalScore -= 10;
            container.style.border = "10px solid #dc3545";
            nextQuestion();
        }
    }
}

// Checks for game over conditions, pulls next question
function nextQuestion() {

    q++;

    if (q < questions.length && quizTimer > 0) {
        listAns();
    } else {
        endQuiz();
    }
}

// Displays final score, displays entry for initials and Submit button
function endQuiz() {

    clearInterval(timer);
    clearInterval(timer2);
    timerScore.lastElementChild.remove();
    listAnswers.innerHTML = "";
    questionDisplay.textContent = "";
    mainBox.firstElementChild.textContent = "The quiz is complete.  Your final score is:";
    let bigScore = document.createElement("h1");
    bigScore.textContent = totalScore;
    mainBox.appendChild(bigScore);

    addInitials.style.display = "inline";
    submitButton.style.display = "inline";
}

// Event listener for the Submit button which stores initials and scores into an array, then sorts it
submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    container.style.border = "10px solid black";
    submitButton.style.display = "none";
    addInitials.style.display = "none";
    playAgainButton.style.display = "inline";
    leaderboardButton.style.display = "inline";

    let scoreEntry = {
        init: initials.value.trim(),
        score: totalScore
    };

    if (scoreEntry.init === "") {
        scoreEntry.init = "???";
    }

    highScores.push(scoreEntry);

    highScores.sort(function (a, b) {
        return a.score - b.score;
    });
});

// Populates a sorted leaderboard with a Play Again option
function seeLeaderboard() {
    mainBox.lastElementChild.textContent = "";
    leaderboardButton.style.display = "none";
    mainBox.firstElementChild.textContent = "Leaderboard";

    if (highScores.length > 8) {
        highScores.shift();
    }

    for (i = highScores.length - 1; i >= 0; i--) {
        let leaderList = document.createElement("h5");
        leaderList.innerHTML = highScores[i].init.toUpperCase() + ": " + highScores[i].score;
        listAnswers.append(leaderList);
    }
}

// Resets the quiz and begins from startQuiz function
function startOver() {
    mainBox.lastElementChild.remove();
    listAnswers.innerHTML = "";
    playAgainButton.style.display = "none";
    leaderboardButton.style.display = "none";
    startQuiz();
}

// Code borrowed from http://javascript.info/task/shuffle, Fisher-Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

startButton.addEventListener("click", startQuiz);
playAgainButton.addEventListener("click", startOver);
leaderboardButton.addEventListener("click", seeLeaderboard);
listAnswers.addEventListener("click", checkAndScore);

