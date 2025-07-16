import { dotValidation,calculate, operatorValidation } from "./stringUtils.js";

document.addEventListener('DOMContentLoaded', function() {
    const calculatorWrapper=document.querySelector(".calculator-wrapper")
    const buttonWrapper = document.querySelector(".button-wrapper")
    const display = document.querySelector(".display .result");
    const numbers= document.querySelectorAll(".number-buttons div")
    const topButtons = document.querySelectorAll(".top-buttons div")
    const sideButtons = document.querySelectorAll(".side-buttons div")

    


    buttonWrapper.addEventListener("click",()=>{
         if(display.textContent.length>1){
                topButtons[0].children[0].className="fa-solid fa-delete-left fa-lg"
            }
            else{
                  topButtons[0].children[0].className="fa-solid fa-c fa-lg"
            }
    })

    // Top-buttons js kodları:
    topButtons.forEach((button) => {
        button.addEventListener("click", ()=> {
            if(button.className == "clear-operator"){
                if(display.textContent!="0" && display.textContent.length>1){
                    display.textContent=display.textContent.slice(0,display.textContent.length-1)
                }
                else{
                    display.textContent="0";
                }
            }
            else if(button.className=="plus-minus-operator"){
                display.textContent = Number(display.textContent)*-1
            }
            else{
                display.textContent = Number(display.textContent)/100
            }
        });
    });

    // Clear'ı kolaylaştırma kodları:
    let timer;
    topButtons[0].addEventListener("mousedown",()=>{
        clearTimeout(timer)
        timer=setTimeout(()=>{
            display.textContent="0";
            topButtons[0].children[0].className="fa-solid fa-c fa-lg"
        }, 500)
    })
    topButtons[0].addEventListener("mouseup", ()=>{
        clearTimeout(timer)
    })
    topButtons[0].addEventListener("mouseleave", ()=>{
        clearTimeout(timer)
    })

    // Clear'ı kolaylaştırma kodları (Mobil için):
     topButtons[0].addEventListener("touchstart", (e)=>{
        e.preventDefault();
        timer = setTimeout(()=>{
            display.textContent="0";
            topButtons[0].children[0].className="fa-solid fa-c fa-lg"
        }, 500)
     })
     topButtons[0].addEventListener("touchend", ()=>{
        clearTimeout(timer)
     })
      topButtons[0].addEventListener("touchmove", ()=>{
        clearTimeout(timer)
     })

    // Number-buttons js kodları: 
    numbers.forEach((button)=>{
        button.addEventListener("click", ()=>{
            let number=button.className.slice(7)
            if(display.textContent=="0" || display.textContent== "NaN" || display.textContent== "Infinity"){
                display.textContent=number
                if(number=="."){
                    display.textContent="0"+number
                }
            }
            else if(number=="." && !dotValidation(display.textContent+number)){
                return;
            }
            else{
                display.textContent=display.textContent+number
            }
            display.nextElementSibling.style.display="none"
        });
    });

    //Side-buttons js kodları:
    let calculation= []
    sideButtons[0].addEventListener("click",()=>{
        if(operatorValidation(display.textContent)){
            display.textContent+=" ÷ "
        }
        else{
            return;
        }
    })
    sideButtons[1].addEventListener("click",()=>{
        if(operatorValidation(display.textContent)){
            display.textContent+=" × "
        }
        else{
            return;
        }
    })
    sideButtons[2].addEventListener("click",()=>{
        if(operatorValidation(display.textContent)){
            display.textContent+=" - "
        }
        else{
            return;
        }
    })
    sideButtons[3].addEventListener("click",()=>{
         if(operatorValidation(display.textContent)){
            display.textContent+=" + "
        }
        else{
            return;
        }
    })
    sideButtons[4].addEventListener("click",()=>{
        let result= calculate(display.textContent);
        if(result.length>11){
            result = Number(result).toExponential(6);
        }
        display.textContent= result;
        display.nextElementSibling.style.display="flex"
    })
});