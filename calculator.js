
const calculator = document.querySelector(".calculator");
const display = calculator.querySelector(".calc_display");
const keys = calculator.querySelector(".calc_keys");
const msg = document.querySelector(".msg");
calculator.dataset.value1 = "";
calculator.dataset.value2 = "";
var myFunction;

myFunction = event => {
    const ele = event.target;
    if (ele.matches("button")) {
        const sign = ele.dataset.sign;
        const content = ele.textContent;
        const previousKey = calculator.dataset.previousKey;
        const value1 = calculator.dataset.value1;
        const value2 = calculator.dataset.value2;
        const operator = calculator.dataset.operator;
        let ans = calculator.dataset.ans;

        if (previousKey === "clear") {
            keys.querySelector('[data-sign~="5"]').disabled = false; // k works pretty well
            display.textContent = "";
        }

        if (!sign) {
            if (operator == "0") {
                calculator.dataset.value1 = value1 + content;
            } else {
                calculator.dataset.value2 = value2 + content;
            }
            display.textContent += content;
            calculator.dataset.previousKey = "num";
        }

         else if (sign === "1" || sign === "2" || sign === "3" || sign === "4") {
            if(operator !== "0" || previousKey !== "num") {
                return;
            }
            display.textContent += content;
            calculator.dataset.operator = sign;
            calculator.dataset.previousKey = "operator";
            keys.querySelector('[data-sign~="5"]').disabled = false;
        }

         else if (sign === "5") {
            ele.disabled = true;
            display.textContent += content;
            if (operator == "0") {
                calculator.dataset.value1 = value1 + content;
            } else {
                calculator.dataset.value2 = value2 + content;
            }
            calculator.dataset.previousKey = "deci";
        }

        else if (sign === "6") {
            calculator.dataset.operator = "0";
            calculator.dataset.previousKey = "clear";
            calculator.dataset.value1 = "";
            calculator.dataset.value2 = "";
        }

        else if (sign === "7") {

        }

        else if (sign === "8") {
            if(previousKey !== "num") {
                msg.innerHTML = "Hey that's illegal!!";
                return;
            }
            if (operator === "0") {
                display.textContent += "=" + value1;
            } else {
                ans = calculate(value1, operator, value2);
                display.textContent += "=" + ans;
                calculator.dataset.ans = ans;
            }
            calculator.dataset.value1 = "";
            calculator.dataset.value2 = "";
            calculator.dataset.operator = "0";
            calculator.dataset.previousKey = "clear";
        }
    }
}

keys.addEventListener("click", myFunction);

const calculate = (n1, operator, n2) => {
    let result = "";

    if (operator === "1") {
        result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === "2") {
        result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === "3") {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === "4") {
        result = parseFloat(n1) / parseFloat(n2);
    }

    return result;
}