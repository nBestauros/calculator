let operand = 0;
let memoryvalue = 0;
let operator = "";
let operations = ["add", "subtract", "multiply", "divide"];

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


var hasUsedOperator = false;
var justEqualed=false;
var hasStarted=false;
var justUsedOperator=false;
var selectedOperator = "";

function handleInput(buttonID){
    let str = buttonID;
    str = str.substring(6);
    console.log("input: "+ str)
    if(operations.includes(str)){
        if(selectedOperator!=""){
            selectedOperator.style.backgroundColor="lightblue";
            console.log("hello!!!")
        }
        operator = str;
        hasUsedOperator=true;
        hasStarted=true;
        justUsedOperator=true;
        displayMemoryValue();
        let buttonName = "button"+str;
        selectedOperator = document.getElementById(buttonName);
        selectedOperator.style.backgroundColor="crimson";
        
    }
    if(!isNaN(str)){
        display.textContent=str;
        if(!hasUsedOperator){
            console.log("Hi")
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
                operand=0;
                justUsedOperator=false;
            }
            if(operand==0){
                operand=str;
            }
            else{
                operand+=str;
            }

            var willError=false;

            if(hasStarted){
                memoryvalue=operate(parseFloat(memoryvalue), parseFloat(operand), operator);
                if(memoryvalue=="error"){
                    willError=true;
                }
                console.log("result: "+memoryvalue);
            }
            display.textContent=operand;
            if(willError){
                wipe(true);
            }
        }
    }
    if(str=="equals"){
        if(selectedOperator!=""){
            selectedOperator.style.backgroundColor="lightblue";
            selectedOperator="";
        }
        hasUsedOperator=false;
        justEqualed=true;
        hasStarted=false;
        displayMemoryValue();
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
    display.textContent=parseFloat(memoryvalue).toPrecision(7).replace(/\.?0+$/,"");
}