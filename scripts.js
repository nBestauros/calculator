let operand = 0;
let memoryvalue = 0;
let operator = "";
let operations = ["add", "subtract", "multiply", "divide", "equals"];

function operate(num1, num2, operation){
    if(operation=="add"){
        console.log(num1 + " " + num2);
        return (num1+num2);
    }
    if(operation=="subtract"){
        return num1-num2;
    }
    if(operation=="multiply"){
        return num1*num2;
    }
    if(operation=="divide"){
        console.log(num1+ " "+num2);
        if(num2==0){
            return "ERROR";
        }
        return num1/num2;
    }
    else{
        return num2;
    }
}

let buttons = document.querySelectorAll(".button");
const display = document.getElementById("display");

buttons.forEach(button => button.addEventListener("click", function(e){
    handleInput(this.id)
}));

//if either arent true, reset memory value.
var hasUsedOperator = false;
var justEqualed=false;

//if there are no numbers, dont start calculating yet.
var hasStarted=false;

//if we just used an operator, then reset our operand.
var justUsedOperator=false;

//stores the highlighted operator.
var selectedOperator = "";

function handleInput(buttonID){
    let str = buttonID;
    //just recieve our input info (removes "button" from string)
    str = str.substring(6);
    console.log("input: "+ str)

    if(operations.includes(str)){
        var willError=false;
        //if we already have data in place, calculate the result when an operation is clicked.
        if(hasStarted){
            memoryvalue=operate(parseFloat(memoryvalue), parseFloat(operand), operator);
            //if we divide by zero, show the user an error and reset.
            if(memoryvalue=="error"){
                willError=true;
            }
            console.log("result: "+memoryvalue);
        }
        if(willError){
            wipe(true);
        }
        //if the user hits equals, solve and display the result on screen.
        if(str=="equals"){
            if(selectedOperator!=""){
                selectedOperator.style.backgroundColor="lightblue";
                selectedOperator="";
            }
            hasUsedOperator=true;
            justEqualed=true;
            hasStarted=false;
            displayMemoryValue();
        }
        else{
            if(selectedOperator!=""){
                selectedOperator.style.backgroundColor="lightblue";
                console.log("hello!!!")
            }
            justEqualed=false;
            operator = str;
            hasUsedOperator=true;
            hasStarted=true;
            justUsedOperator=true;
            displayMemoryValue();
            let buttonName = "button"+str;
            selectedOperator = document.getElementById(buttonName);
            selectedOperator.style.backgroundColor="crimson";
        }



        
    }

    /*
    If we recieved a number, check if we are setting the memory for the first time.
    If we already have used an operator, and are putting in our operand, 
        store this new number temporarily in operand.
    */
    if(!isNaN(str)){
        display.textContent=str;
        if(!hasUsedOperator || justEqualed){
            console.log("Hi")
            
            if(justEqualed){
                wipe(false);
            }
            //If the value is zero, replace it with the input
            if(memoryvalue==0){
                memoryvalue=str;
            }
            else{
                memoryvalue+=str;
            }
            displayMemoryValue();
        }
        else{
            if(justUsedOperator){
                //if we just used an operator, we are making a new operand.
                operand=0;
                justUsedOperator=false;
            }
            if(operand==0){
                //If the value is zero, replace it with the input
                operand=str;
                console.log(operand);
            }
            else{
                operand+=str;
                console.log(operand);
            }

            //display our temporary operand as we are typing it.
            display.textContent=operand;

        }
    }

    if(str=="clear"){
        wipe();
    }
}

function wipe(isError){
    if(selectedOperator!=""){
        selectedOperator.style.backgroundColor="lightblue";
        selectedOperator="";
    }
    justUsedOperator = false;
    hasUsedOperator = false;
    justEqualed=false;
    hasStarted=false;
    operator="";
    memoryvalue=0;
    operand=0;
    display.textContent="";
    hasStarted=false;
    if(isError){
        display.textContent="ERROR!";
    }
}

/*https://stackoverflow.com/questions/16471419/javascript-trim-toprecision-trailing-zeros */
function displayMemoryValue(){
    console.log("before: " +memoryvalue);
    display.textContent=parseFloat(memoryvalue).toPrecision(7).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1");
    console.log("after: " + display.textContent);
}