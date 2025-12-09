const questions = [
    {
        question: "1. What is the minimum age for a learners drivers license?",
        options: ["A. 16", "B. 17", "C. 18", "D. 19"],
        answer: "A. 16"
    },
    {
        question: "2. What does a red traffic light mean?",
        options: ["A. Stop", "B. Go", "C. Slow down", "D. Yield"],
        answer: "A. Stop"
    },
    {
        question: "3. When can you make a U-turn?",
        options: ["A. At any time", "B. Only where permitted", "C. On highways", "D. In intersections"],
        answer: "B. Only where permitted"
    },
    {
        question: "4. What is the speed limit in urban areas?",
        options: ["A. 50 km/h", "B. 60 km/h", "C. 80 km/h", "D. 100 km/h"],
        answer: "A. 50 km/h"
    },
    {
        question: "5. What should you do if your brakes fail?",
        options: ["A. Pump the brakes", "B. Use the handbrake", "C. Shift to neutral", "D. All of the above"],
        answer: "D. All of the above"
    },
    {
        question: "6. When must you use headlights?",
        options: ["A. During the day", "B. At night", "C. In poor visibility", "D. B and C"],
        answer: "D. B and C"
    },
    {
        question: "7. When approaching this sign I am expected to:",
        options: ["A.Engage lower gears", "B. Drive like Vin Diesel", "C. Nothing be yourself", "D. Shayi'moto wena"],
        answer: "A. Engage lower gears"
    },
    {
        question: "8. What does a flashing amber light mean?",
        options: ["A. Stop", "B. Proceed with caution", "C. Go", "D. No entry"],
        answer: "B. Proceed with caution"
    },
    {
        question: "9. When should you use your horn?",
        options: ["A. To greet friends", "B. To warn of danger", "C. In traffic jams", "D. At all times"],
        answer: "B. To warn of danger"
    },
    {
        question: "10.What is the sequence of the traffic lights?",
        options: ["A. Red-Amber-Green", "B. Green-Amber-Red", "C. Amber-Green-Red", "D. None of the above"],
        answer: "B. Green-Amber-Red"
    },
    {
        question: "11. When can you overtake on the left?",
        options: ["A. Never", "B. When the vehicle in front of you is  turning right", "C. On one-way streets", "D. A and C"],
        answer: "B. When the vehicle in front of you is  turning right"
    },
    {
        question: "12. What must you do at a pedestrian crossing?",
        options: ["A. Stop if pedestrians are crossing", "B. Speed up", "C. Ignore", "D. Honk"],
        answer: "A. Stop if pedestrians are crossing"
    },
    {
        question: "13. What is the penalty for driving without a license?",
        options: ["A. Fine", "B. Warning", "C. License suspension", "D. A and C"],
        answer: "D. A and C"
    },
    {
        question: "14. When should you wear a seatbelt?",
        options: ["A. Only in front seats", "B. At all times", "C. When speeding", "D. Never"],
        answer: "B. At all times"
    },
    {
        question: "15. What does a green traffic light mean?",
        options: ["A. Stop", "B. Go", "C. Slow down", "D. Yield"],
        answer: "B. Go"
    },
    {
        question: "16. How should you park on a hill?",
        options: ["A. Facing uphill", "B. Facing downhill", "C. With wheels turned", "D. A and C"],
        answer: "D. A and C"
    },
    {
        question: "17. What is the speed limit on highways?",
        options: ["A. 80 km/h", "B. 100 km/h", "C. 120 km/h", "D. Unlimited"],
        answer: "C. 120 km/h"
    },
    {
        question: "18.  What is the overall stopping distance at 60km/h?",
        options: ["A. 35m", "B. 25m", "C. 55m", "D. 40m"],
        answer: "A. 35m"
    },
    {
        question: "19. What should you do in fog?",
        options: ["A. Use high beams", "B. Use low beams", "C. Speed up", "D. Stop"],
        answer: "B. Use low beams"
    },
    {
        question: "20. How many types of road signs are there?",
        options: ["A. 5", "B. 2", "C. 10", "D. 3"],
        answer: "D.3"
    },
    {
        question: "21. What is the legal age for a provisional license?",
        options: ["A. 16", "B. 17", "C. 18", "D. 19"],
        answer: "A. 16"
    },
    {
        question: "22. What does a broken white line mean?",
        options: ["A. No overtaking", "B. Overtaking allowed", "C. Parking", "D. Stop"],
        answer: "B. Overtaking allowed"
    },
    {
        question: "23. When should you check your mirrors?",
        options: ["A. Before changing lanes", "B. Before stopping", "C. Before overtaking", "D. All of the above"],
        answer: "D. All of the above"
    },
    {
        question: "24. What do you do when approaching a police roadblock?",
        options: ["A. Bust through like you're in Need for Speed and watch your bounty skyrocket", "B. Switch to “mission impossible mode” and pretend you're avoiding laser beams", "C. Start practising your most polite voice: “Good evening officer… sir… boss… commander… chief.", "D. Slow down, follow police instructions and expect to be stopped"],
        answer: "D. Slow down, follow police instructions and expect to be stopped"
    },
    {
        question: "25. When must you use indicators?",
        options: ["A. Before turning", "B. Before changing lanes", "C. Before stopping", "D. All of the above"],
        answer: "D. All of the above"
    }
];

const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        score++;
    }else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Retake Quiz";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {

    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
});
startQuiz();