let mainBox = document.querySelector("#main-box");
let startButton = document.querySelector("#start-button");
let timerScore = document.querySelector("#timer-score");
let listAnswers = document.querySelector("#list-answers");
let secondBox = document.querySelector("#second-box");


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
        rightAnswer: "At the end of the body, before the </body> tag",
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
let q = 0;
let quizTimer = 20;
let innerTimer = 11;
let startTimer = 3;
let totalScore = 100;

// Executes on screen load, creates h2, p, and ammends button
function onLoad() {
    let h2 = document.createElement("h2");
    h2.textContent = "Coding Quiz";
    mainBox.appendChild(h2);

    let p = document.createElement("p");
    p.textContent = "Welcome to the coding quiz.  You will get a series of 10 questions, and have 10 seconds to answer each question. Scoring is awarded by how fast each question is answered. There is a penalty for incorrect answers, so review all choices before submitting.  Click the button below to start the quiz."
    mainBox.appendChild(p);
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

    startButton.style.display = "none";
    mainBox.lastElementChild.textContent = "Get ready, the quiz will begin in: ";
    mainBox.lastElementChild.style.textAlign = "center";

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

// Puts all answers into HTML with radio buttons
function listAns() {

    innerTimer = 11;
    ansBank = [];
    listAnswers.innerHTML = "";
    answerArr(questions[q]);
    shuffle(ansBank);
    mainBox.lastElementChild.style.fontSize = "24px";
    mainBox.lastElementChild.textContent = (questions[q].question);

    for (i = 0; i < ansBank.length; i++) {
        let li = document.createElement("li");
        li.id = i;
        li.innerHTML = "<button>" + ansBank[i] + "</button>";
        listAnswers.append(li);
    }

    // Internal timer gives 11 seconds to answer each question
    timer = setInterval(function () {
        if (innerTimer > 0 && quizTimer > 0) {
            console.log(innerTimer);
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
        let chosenId = event.target.parentElement.id;
        let answerId = ansBank.indexOf(questions[q].rightAnswer);

        if (chosenId == answerId) {
            clearInterval(timer);
            totalScore -= (10 - innerTimer);
            nextQuestion();
        } else {
            clearInterval(timer);
            quizTimer -= 10;
            totalScore -= 10;
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

function endQuiz() {

    clearInterval(timer);
    clearInterval(timer2);
    timerScore.innerHTML = "";
    listAnswers.innerHTML = "";

    mainBox.lastElementChild.textContent = "The quiz is complete.  Your final score is:";
    let h1 = document.createElement("h1");
    h1.textContent = totalScore;
    mainBox.appendChild(h1);

    let initialBox = document.createElement("input");
    let submitButton = document.createElement("button");
    initialBox.setAttribute("placeholder", "Initials");
    initialBox.setAttribute("id", "initials");
    submitButton.setAttribute("id", "submit");
    submitButton.textContent = "Submit";
    timerScore.append(initialBox, submitButton);

    //Text input for initials
    //Call leaderBoard
}

function leaderBoard() {
    //sort array by high score
    //display array
}

//Code borrowed from http://javascript.info/task/shuffle, Fisher-Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

startButton.addEventListener("click", startQuiz);
listAnswers.addEventListener("click", checkAndScore);
timerScore.addEventListener("click", leaderBoard);
