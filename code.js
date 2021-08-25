// To run this assignment, right click on index.html in the Visual Studio Code file explorer to the left
// and select "Open with Live Server"

// YOUR CODE HERE!

let randomId = []
let theReturnData = []
let returnQuestion = ""
let theAnswer = ""
let userScore = 0 
let randomIdNum = 0
let num = 0

let introBlock = document.getElementById("introblock")
// let introPara1 = document.getElementById("introPara1")
// let introPara2 = document.getElementById("introPara2")
let buttonStart = document.getElementById ('buttonStart')
let buttonAnswer = document.getElementById ('buttonAnswer')
let buttonNext = document.getElementById ('buttonNext')
let category = document.getElementById("category")
let questionLine = document.getElementById ("question")
let inputLine = document.getElementById ('answer')
let pictureBlock = document.querySelector('.pictureBlock')

let newScore = document.getElementById('newScore')
let paraCongrat = document.getElementById('congrats')
let divQuestion = document.getElementById("divQuestion")
let paraEndGame = document.createElement('p')
// let countdown = document.querySelector(".countdown")

let finalScoreLine = document.createElement("p")
finalScoreLine.classList.add("finalScore")

let finalMessage = document.createElement('p')
finalMessage.classList.add('finalMessage')

let restartButton = document.getElementById('restartButton')



// for countdown

// let startingMinute = 01
// let time = startingMinute * 60
// setInterval(theCountdown, 1000);
// function theCountdown () {
//     let minutes = Math.floor (time / 60)
//     let seconds = time % 60
//     seconds = seconds < 10 ? '0' + seconds : seconds

//     countdown.innerHTML = `${minutes}: ${seconds}`
//     time--
    
// }


buttonStart.addEventListener("click", startEvent)
buttonAnswer.addEventListener("click", answersControl)
buttonNext.addEventListener("click", nextQuestion)
restartButton.addEventListener("click", () => { location.reload()})

fetch('https://jservice.io/api/random')
    .then(response => response.json())
    .then(data =>{ 
            // console.log(data)          
            // console.log (data[0].category_id)
            randomId = data[0].category_id

    fetch('https://jservice.io/api/clues?category=' + randomId)
    .then(response => response.json())
    .then(data =>{
            theReturnData = data
            console.log(theReturnData)           
            })
    })


// Game starter function.  

function startEvent(event) {
    // location.reload();
    event.preventDefault()      

    category.innerHTML = `Category: ` 
    + ` <i>${theReturnData[num].category.title}.</i> ` + `(${theReturnData.length} questions)` 
  
    questionLine.innerHTML = "Question: " + theReturnData[num].question 

    theAnswer = theReturnData[num].answer
    
    divQuestion.style.display = "block"  
    buttonStart.style.display = "none"  

    introBlock.style.display = "none"
                
}


// question and answer genetator

function randomQuestion() {    

    randomIdNum =  Math.floor ( Math.random() * theReturnData.length )

    returnQuestion = theReturnData[randomIdNum].question
    console.log(returnQuestion)            
    
    questionLine.innerHTML =  "Question: " + returnQuestion  

    theAnswer =  theReturnData[randomIdNum].answer
    console.log(theAnswer)   
   
    removeQuestion(theReturnData[randomIdNum])
         
    dataEmpty()
      
}

// refreshing the page function

function nextQuestion (event) {
    event.preventDefault ()   
    randomQuestion()

}


function removeQuestion(currentQ) {
    let questionIndex =theReturnData.indexOf(currentQ);
    theReturnData.splice(questionIndex, 1);
    console.log(questionIndex)
  
  }

 
// controling the answer and score manipulation.

function answersControl(event) { 
    event.preventDefault ()
   
    let userAnswer = inputLine.value
    // theAnswer =  theReturnData[randomIdNum].answer
          
    if (userAnswer ===""){
        alert("Please type your answer below.")
    }
      else if ( theAnswer.toLowerCase() === userAnswer.toLowerCase() ){
            paraCongrat.innerHTML = 'You answered: ' + '<b>' + userAnswer + "</b>" + "<br>" + ' That was Correct, Congrats !! You earned 1 point.'
            userScore +=1
            newScore.innerHTML = `Your Score: ${userScore}`
                     
        } else {
            // paraCongrat.innerHTML = 'You answered: ' + userAnswer + "<br>" + 'Sorry! wrong answer. You lose your points.'
            // userScore = 0
            // newScore.innerHTML = `Your Score: ${userScore}`
            endingGame(userScore)
        } 
        randomQuestion()
        inputLine.value = ""        
        
}

// final words with possibility to restart the Game.

function endingGame(finalScore) {
    finalScoreLine.innerHTML = `Your Final Score: ${finalScore} points`
    finalMessage.innerHTML = `The End of this Category.`

    restartButton.style.display = "block"
    countdown.style.display = "block"

    divQuestion.replaceWith(finalScoreLine, finalMessage,restartButton, theCountdown)
}
function dataEmpty (){
    if (theReturnData.length === 0 ) {
        
        finalScoreLine.innerHTML = `Your Final Score: ${userScore} points`
        finalMessage.innerHTML = `The End of this Category.`
        restartButton.style.display = "block"
        divQuestion.replaceWith(finalScoreLine, finalMessage,restartButton)
        
                
        // console.log("This is the End of the Game")
    }    
}
