
let numberQuestions = 0;
let numberCorrect = 0;

function watchForm(){
    console.log("form is loaded; waiting for event");
    
    $("#formOne").submit(function(event){
        event.preventDefault();
        let h = $("header");
        h.find("p").addClass("orange");

        fetch("https://opentdb.com/api.php?amount=1&category=9&difficulty=hard&type=multiple")
            .then(response => response.json())
            .then(responseJson => askQuestion(responseJson));
    });
}

function askQuestion(r){

    console.log("displayResults function ran"); 
    console.log("Here is the question: ");   
    console.log(r);
    let l = r.results.length;
    numberQuestions = numberQuestions + 1;
    console.log("Total questions asked: ");
    console.log(numberQuestions);

    $("#submitButton").addClass("hidden"); 

    let q = r.results[0].question;
    let cA = r.results[0].correct_answer;
    let iA = r.results[0].incorrect_answers[0];
    let iA1 = r.results[0].incorrect_answers[1];
    let iA2 = r.results[0].incorrect_answers[2];

    let answers = [cA, iA, iA1, iA2];
    answers = shuffle(answers);
    
    let dQ =
    ` 
    <h2 class="orange">Here is your question...</h2>

    <div id="questionContainer">

        <p>
        <legend class="left">
        ${q}
        </legend>
        </p>

        <form id="formTwo">
        
            <div id="d1" class="left">
            <label for="inputOne">
            <input id = "inputOne" type="radio" name="question"> 
            ${answers[0]}
            </label>
            </div>
            
            <div id="d2" class="left">
            <label for="inputTwo">
            <input id="inputTwo" type="radio" name="question"> 
            ${answers[1]}
            </label>
            </div>
            
            <div id="d3" class="left">
            <label for="inputThree">
            <input id="inputThree" type="radio" name="question"> 
            ${answers[2]}
            </label>
            </div>
            
            <div id="d4" class="left">
            <label for="inputFour">
            <input id="inputFour" type="radio" name="question">
            ${answers[3]}
            </label>
            </div>

            <p></p>

            <div id="d5">
            <label for="submitButtonTwo">
            <input type="submit" id="submitButtonTwo" value="Submit">
            </label>
            </div>

        </form>
    </div>
    `
    
    $("#displayArea").append(dQ);

    $("#formTwo").submit(function (event){
        event.preventDefault();
        let uN = $("input:checked");
        uN = uN[0].id;
        
        let uA = "XYZ";

        if(uN == "inputOne"){
            uA = answers[0];
        }

        if(uN == "inputTwo"){
            uA = answers[1];
        }

        if(uN == "inputThree"){
            uA = answers[2];
        }

        if(uN == "inputFour"){
            uA = answers[3];
        }

        console.log("Here is the user answer: ");
        console.log(uA);
        console.log("Here is the correct answer");
        console.log(cA);

        let gotItRight = false;
        if(uA == cA){
            gotItRight = true;
            numberCorrect = numberCorrect + 1;
        }

        console.log("Here is the result: ")
        console.log(gotItRight);
        console.log("Here is the number of questons answered correctly so far:");
        console.log(numberCorrect);
        displayResults(gotItRight, cA);

    })
}

function displayResults(gotItRight, cA){
    console.log("displayResults function ran");
    console.log(gotItRight);
    console.log(cA);

    let rightAnswer = 
    `That's correct! The answer is: ${cA}`;

    let wrongAnswer =
    `Sorry! The correct answer is ${cA}`;

    let formThree =
    `
    <form id="formThree">
      <p></p>
      <input type="submit" id="submitButtonThree" value="Click For Another Question!"></input>
    </form>
    `

    let formFour =
    `
    <form id="formFour">
      <p></p>
      <input type="submit" id="submitButtonFour" value="Click To Finish Playing!"></input>
    </form>
    `

    $("#displayArea").empty();

    if(gotItRight == true){
        $("#displayArea").append(rightAnswer);
    } else{
        $("#displayArea").append(wrongAnswer);
    }

    $("#displayArea").append(formThree);

    $("#displayArea").append(formFour);

    $("#formThree").submit(function(event){
        event.preventDefault();
        console.log("formThree submitted");
        $("#displayArea").empty();
        event.preventDefault();
        let h = $("header");
        h.find("p").addClass("orange");

        fetch("https://opentdb.com/api.php?amount=1&category=9&difficulty=hard&type=multiple")
            .then(response => response.json())
            .then(responseJson => askQuestion(responseJson));
    });

    $("#formFour").submit(function(event){
        event.preventDefault();
        console.log("formFour submitted");
        $("#displayArea").empty();
        restart();
    });
}

function restart(){
    console.log("restart function ran");

    let goodbyeMessage = 
    `
    <div id="first">
    <p id="first">Thanks for playing!</p>
    <p>You got ${numberCorrect} out of ${numberQuestions} questions correct.</p>
    <p></p>
    </div>

    <div id="second">
    <form id="formFive">
      <p></p>
      <input type="submit" id="submitButtonFive" value="Click To Play Again!"></input>
    </form>
    </div>
    `

    $("#displayArea").append(goodbyeMessage);

    $("#formFive").submit(function(event){
        event.preventDefault();
        console.log("formFive submitted");
        $("#first").find("p").addClass("hidden");
        $("#second").find("form").addClass("hidden");
        numberQuestions = 0;
        numberCorrect = 0;

        let h = $("header");
        h.find("p").addClass("orange");

        fetch("https://opentdb.com/api.php?amount=1&category=9&difficulty=hard&type=multiple")
            .then(response => response.json())
            .then(responseJson => askQuestion(responseJson));

    });
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}

$(watchForm)