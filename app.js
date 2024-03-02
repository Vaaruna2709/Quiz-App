let questions =[
    {
        question:'Inside which HTML element do we put the JavaScript?',
        answers :
          [
            {
                text:"<javascript>" , correct:false
              },
            {
                text:"<script>" , correct:true
            },
            {
                text:"<java>" , correct:false
            },
            {
                text:"<scripting>" , correct:false
            }
          ]
    },
    {
        question:'What is the correct syntax for referring to an external script called "xxx.js"?',
        answers :
          [
            {
                text:"<script src='xxx.js'>" , correct:true
              },
            {
                text:"<script href='xxx.js' >" , correct:false
            },
            {
                text:"<script rel='xxx.js'>" , correct:false
            },
            {
                text:"<script name='xxx.js'>" , correct:false
            }
          ]
    },
    {
        question:'How to write an IF statement in JavaScript?',
        answers :
          [
            {
                text:"if i = 5 then " , correct:false
              },
            {
                text:"if i==5 then" , correct:false
            },
            {
                text:"if i=5" , correct:false
            },
            {
                text:"if (i==5)" , correct:true
            }
          ]
    },{
        question:'How does a FOR loop start?',
        answers :
          [
            {
                text:"for(i<=5,i++)" , correct:false
              },
            {
                text:"for i= 1 to 5" , correct:false
            },
            {
                text:"for(i=0,i<=5,i++)" , correct:true
            },
            {
                text:"for(i=0,i<=5)" , correct: false
            }
          ]
    },
    {
        question:'What is the correct way to write a JavaScript array?',
        answers :
          [
            {
                text:"let colors = 'red','green','blue'" , correct:false
              },
            {
                text:"let colors = ['red','green','blue']" , correct: true
            },
            {
                text:"let colors =(1:'red') ,(2:'green'),(3:'blue')" , correct:false
            },
            {
                text:"let colors = (1='red'),(2='green'),(3='blue')" , correct:false
            }
          ]
    },{
        question:'Which event occurs when the user clicks on an HTML element?',
        answers :
          [
            {
                text:"onmouseover" , correct:false
              },
            {
                text:"onchange" , correct:false
            },
            {
                text:"onmouseclick" , correct:false
            },
            {
                text:"onclick" , correct:true
            }
          ]
    }
]



const questionElement = document.querySelector(".question");
const answerOptions = document.querySelector(".answer-options");
const nextButton = document.querySelector(".Next");
let currentQuestionIndex = 0;
let score = 0;
function selectedAnswer(answer,button,currentQuestion){
  if(answer.correct){
    button.classList.add("green");
    score++;
    button.disabled = true;
    nextButton.style.display = 'block';
    currentQuestion.answers.forEach(ans=>{
      if(!ans.correct){
        const wrongBtn = Array.from(answerOptions.children).find((btn)=>{
          return btn.textContent === ans.text;
        })
        wrongBtn.disabled = true;
        }
    })
   }else{
    button.classList.add("red");
    currentQuestion.answers.forEach(ans=>{
      if(ans.correct){
        const correctBtn = Array.from(answerOptions.children).find((btn)=>{
          return btn.textContent === ans.text;
        }
        )
        correctBtn.classList.add("green");
      }})
      currentQuestion.answers.forEach(ans =>{
        if(!ans.correct && !(button.classList.contains("red"))){
          const wrongBtn = Array.from(answerOptions.children).find((btn)=>{
            return btn.textContent === ans.text;
          })
          wrongBtn.disabled = true;
          }
      })
      nextButton.style.display = 'block';
      
      
    }
   
  
}
function showScore(){
  const marks = document.querySelector(".app"); 
  marks.innerHTML = `Your score is ${score} out of ${questions.length}`;
  marks.classList.add("score");
}

function startQuiz(){
    currentQuestionIndex =0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQ();
}
try{
    function showQ(){
        answerOptions.innerHTML ="";
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex +1;
        questionElement.textContent = questionNo + ". " + currentQuestion.question;
    
        currentQuestion.answers.forEach(answer =>{
            const button = document.createElement("button");
            button.classList.add("btn");
            button.textContent = answer.text;
            button.setAttribute("aria-label", answer.text);
            answerOptions.appendChild(button);
          
           button.addEventListener("click",()=> selectedAnswer(answer,button,currentQuestion));
          
        })
        
        if (currentQuestionIndex < questions.length - 1) {
          currentQuestionIndex += 1;
          nextButton.addEventListener("click", showQ);
      } else {
          nextButton.style.display = 'none';
          showScore();
          // Remove the event listener once the quiz is completed
          nextButton.removeEventListener("click", showQ);
      }
        
    }
}catch(err){
    console.log(err);
}


startQuiz();