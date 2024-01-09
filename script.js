let displayValue = '0';
let operator = '';
let operand = '';
let calculationHistory = [];

window.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    // Get the key that was pressed
    const key = event.key;

    // Check if the key is a numeric digit or a specific operator
    if (/[0-9]/.test(key)) {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay(key);
    } else if (['+', '-', '*', '/', '%', '^'].includes(key)) {
        setOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        removeLastChar();
    }
    // Add additional conditions for other keys if needed
}

function updateDisplay() {
    if (displayValue === 'Error') {
    	document.getElementById('display').innerText = displayValue;
    }
    else{
	document.getElementById('display').innerText = operand + ' ' + operator + ' ' + displayValue;
    }
}

function appendToDisplay(value) {
    if (displayValue === '0' || displayValue === 'Error') {
        displayValue = value;
    } else {
        displayValue += value;
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    operator = '';
    operand = '';
    updateDisplay();
}

function removeLastChar() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
    updateDisplay();
}

function setOperator(op) {
    if (operator && operand !== '') {
        // If there was a previous operator and operand, calculate the result
        calculate();
    }

    // Set the new operator and update the display
    operator = op;
    operand = displayValue;
    displayValue = '0';
    updateDisplay();
}

function calculate() {
    if (operator && operand !== '') {
        let result;
        let expression = operand + ' ' + operator + ' ' + displayValue;

        switch (operator) {
            case '+':
                result = parseFloat(operand) + parseFloat(displayValue);
                break;
            case '-':
                result = parseFloat(operand) - parseFloat(displayValue);
                break;
            case '*':
                result = parseFloat(operand) * parseFloat(displayValue);
                break;
            case '/':
                if (parseFloat(displayValue) !== 0) {
                    result = parseFloat(operand) / parseFloat(displayValue);
                } else {
                    displayValue = 'Error';
                    updateDisplay();
                    return;
                }
                break;
            case '//':
                if (parseFloat(displayValue) !== 0) {
                    result = Math.floor(parseFloat(operand) / parseFloat(displayValue));
                } else {
                    displayValue = 'Error';
                    updateDisplay();
                    return;
                }
                break;
            case '%':
                if (parseFloat(displayValue) !== 0) {
                    result = parseFloat(operand) % parseFloat(displayValue);
                } else {
                    displayValue = 'Error';
                    updateDisplay();
                    return;
                }
                break;
            case '^':
                result = Math.pow(parseFloat(operand), parseFloat(displayValue));  
                break;
	    		
            default:
                break;
        }

        // Store the calculation in history
        calculationHistory.push({
            expression: expression,
            result: result.toString(),
        });

        // Reset display and operator
        displayValue = result.toString();
        operator = '';
        operand = '';
        updateDisplay();
    }
}

/*
function calculateReciprocal() {
    if (parseFloat(displayValue) !== 0) {
        displayValue = (1 / parseFloat(displayValue)).toString();
    } else {
        displayValue = 'Error';
    }
    updateDisplay();
    updateDisplay();
    
}

function calculateSQRT() {
    if (parseFloat(displayValue) >= 0) {
        displayValue = Math.sqrt(parseFloat(displayValue)).toString();
    } else {
        displayValue = 'Error';
    }
    updateDisplay();
}
*/

function calculateReciprocal() {
    if (parseFloat(displayValue) !== 0) {
        let result = 1 / parseFloat(displayValue);
	let prevDisplayValue = parseFloat(displayValue);
        displayValue = result.toString();
        updateDisplay();

        // Store the calculation in history
        calculationHistory.push({
            expression: `1 / ${prevDisplayValue}`,
            result: result.toString(),
        });
    } else {
        displayValue = 'Error';
        updateDisplay();
    }
}

function calculateSQRT() {
    if (parseFloat(displayValue) >= 0) {
        let result = Math.sqrt(parseFloat(displayValue));
	let prevDisplayValue = parseFloat(displayValue);
        displayValue = result.toString();

        // Store the calculation in history
        calculationHistory.push({
            expression: `√${prevDisplayValue}`,
            result: result.toString(),
        });
	updateDisplay();
    } else {
        displayValue = 'Error';
        updateDisplay();
    }
}


function toggleSign() {
    displayValue = (parseFloat(displayValue) * -1).toString();
    updateDisplay();
}

function showHistory() {
    let historyContainer = document.getElementById('history-container');

    // Clear existing history
    historyContainer.innerHTML = '';

    // Loop through the calculation history and display each entry
    calculationHistory.forEach((entry, index) => {
        let historyItem = document.createElement('div');
        historyItem.innerText = `${entry.expression} = ${entry.result}`;
        historyContainer.appendChild(historyItem);
    });

    // Scroll to the bottom of the history container
    historyContainer.scrollTop = historyContainer.scrollHeight;
}

function toggleHistory() {
    let historyContainerWrapper = document.getElementById('history-container');
    historyContainerWrapper.classList.toggle('hidden');
    showHistory();
}
