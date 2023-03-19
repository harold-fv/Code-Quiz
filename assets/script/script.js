/*Declare variables*/

    var intro = document.getElementById("intro");
    var startBtn = document.getElementById("start_button");
    var introPage =document.getElementById("intro_page");
    
    var questionPage = document.getElementById("question_page");
    var askQuestion = document.getElementById("show_question");
    
    var reactButtons = document.querySelectorAll(".choices");
    var responseBtn1 = document.getElementById("response_btn1");
    var responseBtn2 = document.getElementById("response_btn2");
    var responseBtn3 = document.getElementById("response_btn3");
    var responseBtn4 = document.getElementById("response_btn4");
    
    var answerCheck = document.getElementById("answer_check");
    var submitPanel = document.getElementById("submit_panel");
    var finalScore = document.getElementById("final_score");
    var userInitial =document.getElementById("initial");
    
    var submitBtn =document.getElementById("submit_btn");
    var showResultsPanel =document.getElementById("show_results_label");
    var highScoreList = document.getElementById("high_score_list");
    var highScoreHeader = document.getElementById("high_score_header");

    var clearBtn=document.getElementById("clear_btn");

    var timeLeft = document.getElementById("timer");
    var warning = document.getElementById("warning");

    var highScoresButton = document.getElementById("highScores_Button");
    var backButton = document.getElementById("backButton");

  
    
        //Define questions (Object)
    var questionSource = [
        {
            question: "Questions 1 : Commonly used data types DO NOT include:",
            choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
            answer: "3"
        },
        {
            question: "Questions 2 : The condition in an if/else statement is enclosed within _____.",
            choices: ["1. quotes", "2. early brackets", "3. parentheses", "4. square braces"],
            answer: "3"
        },
        {
            question: "Questions 3 : Arrays in JavaScript can be used to store _____",
            choices: ["1. numbers and strings ", "2. other arrays", "3. booleans", "4. all of the above"],
            answer: "4"
        },
        {
            question: "Questions 4 :String values must be enclosed within _____ when being assigned to variables.",
            choices: ["1. commas", "2. curly braces", "3. quotes", "4. parentheses"],
            answer: "3"
        },
        {
            question: "Questions 5 : A very useful tool used during development and debugging for printing content to the debuggers is:",
            choices: ["1. Javascript", "2. terminal / bash ", "3. for loops", "4. console.log"],
            answer: "4"
        },
    ];
    
    //Declare other variables
    var secondsLeft = 60;
    var questionNumber = 0;
    var totalScore = 0;
    var questionCount = 1;

    var scoringList = [];
   
    function countdown() {
            console.log("inside counter ", secondsLeft);
        var timerInterval = setInterval(function () {

            secondsLeft--;
            timeLeft.textContent = "Time left: " + secondsLeft + " s";
    
            if (secondsLeft <= 0){
                clearInterval(timerInterval);
                secondsLeft =0;
                timeLeft.textContent =  "Time left: " + secondsLeft + " s";
                // if time is up, show on score board content instead of "all done!"
                finish.textContent = "Game over!";
                gameOver();

            } else  if(questionCount >= questionSource.length +1) {
                clearInterval(timerInterval);
                secondsLeft =0;
                timeLeft.textContent =  "Time left: " + secondsLeft + " s";
                gameOver();
                } 
        }, 1000);
    }
    
        //Click the button to start the quiz
    function startQuiz () {
        introPage.style.display = "none";
        questionPage.style.display = "block";
        highScoresButton.style.display = "none";
        clearBtn.style.display = "none";
        questionNumber = 0
        secondsLeft=60;
        countdown();
        showQuestion(questionNumber);
          
    }
        //show the questions and responses
    function showQuestion (n) {
        askQuestion.textContent = questionSource[n].question;
        responseBtn1.textContent = questionSource[n].choices[0];
        responseBtn2.textContent = questionSource[n].choices[1];
        responseBtn3.textContent = questionSource[n].choices[2];
        responseBtn4.textContent = questionSource[n].choices[3];
        questionNumber = n;
    }
    
        //check whether response is right or wrong
    function checkResponse() {
        
        answerCheck.style.display = "block";
        setTimeout(function () {
            answerCheck.style.display = 'none';
            warning.textContent = ""
        }, 1000);
    
        // if response is right
        if (questionSource[questionNumber].answer == event.target.value) {
            answerCheck.textContent = "Correct!"; 
            totalScore = totalScore + 1;
            warning.textContent = ""
        // if response is wrong
        } else {
            secondsLeft = secondsLeft - 5;
            answerCheck.textContent = "Wrong! The correct response is number " + questionSource[questionNumber].answer + " .";
            warning.textContent = "Minus 5 seconds"
        }

        if (questionNumber < questionSource.length - 1 ) {
            showQuestion(questionNumber + 1);
        } else {
            gameOver();
        }
        questionCount++;
    }
        
    function gameOver() {
        warning.textContent = ""
        questionPage.style.display = "none";
        submitPanel.style.display = "block";
        // show final score
        finalScore.textContent = "Your final score is :" + totalScore;
        // timeLeft.style.display = "none"; 
        userInitial.value = ""
    };

    function processSubmit() {
        if(userInitial.value === "" ){
            alert("Please enter a valid user initial");
        } 
        else {
            submitPanel.style.display = "none";
            introPage.style.display = "none";
            questionPage.style.display ="none";
            backButton.style.display = "block"
            clearBtn.style.display = "block"
            highScoresButton.style.display = "block"
            
            var scoreItem = {
                user: userInitial.value,
                score: totalScore
            }
            scoringList = JSON.parse(localStorage.getItem("ScoreList"))|| []
            console.log(scoringList);
            scoringList.push(scoreItem);
            localStorage.setItem("ScoreList", JSON.stringify(scoringList));

            var locallyStoredScores = JSON.parse(localStorage.getItem("ScoreList"));
            //console.log(sort(locallyStoredScores));
            console.log(locallyStoredScores)
            showHighScores(sort(locallyStoredScores));
        }
    }

    function sort (object) {
        var sorted = object.sort(function(a, b){
            return b.score - a.score;
        })
        return sorted;
    };

    function showHighScores (object) {
        // highScoreHeader.style.display = "block"
        showResultsPanel.style.display = "block";
        highScoresButton.style.display = "none";

        var textNode = document.createTextNode("High Scores");
        highScoreHeader.appendChild(textNode)
        
        showResultsPanel.innerHTML = '';
        highScoreList.innerHTML = '';
    }