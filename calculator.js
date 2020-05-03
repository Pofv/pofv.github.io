//Learning JS 
// using tutorial from https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98/


const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');
const better_dis = document.querySelector('.better_display');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;
        let firstValue = 0;
        let secondValue = 0;
        const operator = calculator.dataset.operator;

        if (!action) {
            console.log('number key!');
            if (displayNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayNum + keyContent;
            }
            if (previousKeyType === 'none') {
                better_dis.textContent = "";
            }
            better_dis.textContent += keyContent;

            calculator.dataset.previousKeyType = 'number';
        }
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            console.log('operator key!');
            key.classList.add('is-depressed');

            if (calculator.dataset.previousOperator === 'bracket' || 
            calculator.dataset.previousOperator === 'no') {
                firstValue = calculator.dataset.firstValue;
                secondValue = displayNum;

                display.textContent = calculate(firstValue, operator, secondValue);
            }

            if (action === 'add') {
                better_dis.textContent += '+';
                calculator.dataset.previousOperator = 'bracket';
            } else if (action === 'subtract') {
                better_dis.textContent += '-';
                calculator.dataset.previousOperator = 'bracket';
            } else if (action === 'multiply') {
                if(calculator.dataset.previousOperator === 'bracket') {
                    better_dis.textContent = '(' + better_dis.textContent + ')' + '×';
                } else {
                    better_dis.textContent += '×';
                }
                calculator.dataset.previousOperator = 'no';
            } else if (action === 'divide') {
                if(calculator.dataset.previousOperator === 'bracket') {
                    better_dis.textContent = '(' + better_dis.textContent + ')' + '÷';
                } else {
                    better_dis.textContent += '÷';
                }
                calculator.dataset.previousOperator = 'no';
            }

            calculator.dataset.firstValue = display.textContent;
            calculator.dataset.operator = action;
            calculator.dataset.previousKeyType = 'operator';
        }

        if (action === 'decimal') {
            console.log('decimal key!');
            display.textContent = displayNum + '.';
        }
        if (action === 'clear') {
            console.log('clear key!');
            display.textContent = "0";
            better_dis.textContent = "";
            calculator.dataset.previousKeyType = 'none';
            calculator.dataset.previousOperator = 'none';
            calculator.dataset.firstValue = 0;
        }
        if (action === 'calculate') {
            console.log('equal key!');
            firstValue = calculator.dataset.firstValue;
            secondValue = displayNum;

            display.textContent = calculate(firstValue, operator, secondValue);
            better_dis.textContent += '=' + display.textContent;
            calculator.dataset.previousKeyType = 'none';
            calculator.dataset.previousOperator = 'none';
            calculator.dataset.firstValue = 0;
        }

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));
    }
});

const calculate = (n1, operator, n2) => {
  let result = '';
  
  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2);
  }
  
  return result;
}
