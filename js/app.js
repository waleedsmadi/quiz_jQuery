// questions
const questions = [
    {
        question: "What is 1 + 2?",
        choise1: 3,
        choise2: 4,
        choise3: 5,
        choise4: 6,
        answer: 1
    },

    {
        question: "What is 2 + 2?",
        choise1: 6,
        choise2: 4,
        choise3: 3,
        choise4: 1,
        answer: 2
    },
    
    {
        question: "What is 9 + 1?",
        choise1: 1,
        choise2: 2,
        choise3: 0,
        choise4: 10,
        answer: 4
    },
];


// setting 
let availableQuestions = [];
let currentQuestion = {};
let score = 0;
let counter = 0;
let activeToAnswer = true;
const MAX_QUESTIONS = questions.length;





// functions

function startApp(){
    // reset all setting
    score = 0;
    counter = 0;
    activeToAnswer = true;
    availableQuestions = [...questions];
    
    // get the question
    getNextQuestion();
}


function getNextQuestion(){
    // check is there any question
    if(availableQuestions.length == 0 || counter > MAX_QUESTIONS){
        localStorage.setItem("the_score", score);
        return $(location).attr("href", "/result.html");
    }
    counter ++;


    // make a random quesion
    // and get the current question
    const randomIndex = parseInt(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[randomIndex];

    // set all question stuff
    $("[data-question-text]").text(`Question ${counter} of ${MAX_QUESTIONS}`);
    $("[data-progress]").css("width", `${(counter / MAX_QUESTIONS) * 100}%`);
    $("[data-question]").text(currentQuestion.question);
    
    $("[data-choise]").each(function(i, c){
        const number = $(c).data("number");
        $(c).text(currentQuestion["choise"+number]);
    });


    // remove the question
    availableQuestions.splice(randomIndex, 1);

    activeToAnswer = true;
}


// correct the answers and get new question
$("[data-choise]").click(function(){
    if(!activeToAnswer) return 
    activeToAnswer = false;



    const theTarget = $(this);
    const selectedAnswer = theTarget.data("number");
    const correction = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    

    // increment the score if the answer is right
    if(correction == "correct"){
        score += 100;
        $("[data-score]").text(score);
    }

    // add correct color and remove it in 1/S
    theTarget.parent().addClass(correction);
    setTimeout(function(){
        theTarget.parent().removeClass(correction);
        getNextQuestion();
    },1000);
});



// Starting the App
startApp();