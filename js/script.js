let listQuestion = document.querySelector("#list-question");
let listAnswers = document.querySelector("#list-answers");
let submitButton = document.querySelector("#submit");
let announcement = document.querySelector("#announcement");
let explanation = document.querySelector("#explanation");
let startButton = document.querySelector("#start")


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

listQuestion.textContent = "";
listAnswers.textContent = "";
announcement.textContent = "Coding Quiz"
explanation.textContent = "Welcome to the coding quiz.  You will get a series of 10 questions, and have 10 seconds to answer each question. Scoring is awarded by how fast each question is answered. There is a penalty for incorrect answers, so review all choices before submitting.  Click the button below to start the quiz."

function startQuiz() {

}

// Puts all answers in an array for random order output
function answerArr() {
    ansBank.push(randomQ.rightAnswer);
    for (i = 0; i < randomQ.wrongAnswers.length; i++) {
        ansBank.push(randomQ.wrongAnswers[i]);
    }
}

// Puts all answers into HTML 
function listAns() {

    answerArr();
    shuffle(ansBank);

    listQuestion.textContent = randomQ.question;

    for (i = 0; i < ansBank.length; i++) {

        let li = document.createElement("li");
        let input = document.createElement("input");
        let label = document.createElement("label");

        input.setAttribute("type", "radio");
        input.setAttribute("name", "chooseAns");    //Makes only one radio button selectable at a time
        input.setAttribute("id", i);                //Assigns ID of answer to match array ID
        label.setAttribute("for", input.id);

        label.innerHTML = ansBank[i];

        listAnswers.appendChild(li);
        li.append(input, label);
    }
}

function nextQuestion() {

}

//Code borrowed from http://javascript.info/task/shuffle, Fisher-Yates shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

submitButton.addEventListener("click", nextQuestion);
startButton.addEventListener("click", startQuiz);

//listAns();

console.log(randomQ.question);
console.log(ansBank);
console.log(randomQ.rightAnswer);