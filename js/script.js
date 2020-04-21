let mainBox = document.querySelector("#main-box");
let startButton = document.querySelector("#start-button");
let submitButton = document.querySelector("#submit-button");
let sButton = document.querySelector("sButton");
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
let randomQ = questions[Math.floor(Math.random() * questions.length)];
let ansBank = [];
let q = 0;
let quizTimer = 90;
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

let timer;

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
            listAns();

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
        }
    }, 1000);
}

// Puts all answers into HTML with radio buttons
function listAns() {

    innerTimer = 11;
    ansBank = [];
    answerArr(questions[q]);
    shuffle(ansBank);
    mainBox.lastElementChild.style.fontSize = "24px";
    mainBox.lastElementChild.textContent = JSON.stringify(questions[q].question);

    for (i = 0; i < ansBank.length; i++) {

        let content = document.getElementById(i);
        content.innerHTML = "";

        let input = document.createElement("input");
        let label = document.createElement("label");

        input.setAttribute("type", "radio");
        input.setAttribute("name", "chooseAns");    //Makes only one radio button selectable at a time
        input.setAttribute("id", i);                //Assigns ID of answer to match array ID
        label.setAttribute("for", input.id);

        label.textContent = ansBank[i];

        content = document.getElementById(i);
        content.append(input, label);
    }

    submitButton.style.display = "block";

    // Internal timer gives 11 seconds to answer each question
    timer = setInterval(function () {
        if (innerTimer > 0) {
            console.log(innerTimer);
            innerTimer--;
        } else {
            clearInterval(timer);
            nextQuestion();
            totalScore -= 10;
        }
    }, 1000);

}

// Compares answer to correct answer, updates totalScore
function checkAndScore() {

    let answer = ansBank.indexOf(questions[q].rightAnswer);
    //let answerValue = document.querySelector("input[type=radio]:checked").id;
    let nullCheck;

    //for (i = 0; i < ansBank.length; i++) {
    if (document.querySelector("input[type=radio]:checked")) {
        let answer = ansBank.indexOf(questions[q].rightAnswer);
        let answerValue = document.querySelector("input[type=radio]:checked").id;
        console.log("Array index chosen is " + answerValue);
        if (answer == answerValue) {
            clearInterval(timer);
            totalScore -= (10 - innerTimer);
            // console.log(totalScore);
            // console.log(answer);
            // console.log(answerValue);
        } else {
            clearInterval(timer);
            quizTimer -= 10;
            totalScore -= 10;
            // console.log(totalScore);
            // console.log(answer);
            // console.log(answerValue);
        }
    } else {
        alert("Please check a radio button.");
    }
    //}
}

// Checks for game over conditions, pulls next question
function nextQuestion() {

    q++;

    if (q < questions.length && quizTimer > 0) {
        checkAndScore(); console.log(totalScore);
        listAns();
    } else {
        endQuiz();
    }
}

function endQuiz() {

    mainBox.innerHTML = "";
    secondBox.innerHTML = "";


    //Display that quiz is complete, your final score is x
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

//submitButton.addEventListener("click", nextQuestion);
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", nextQuestion);