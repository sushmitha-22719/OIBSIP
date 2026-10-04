const display = document.getElementById("display");
const buttons = document.querySelectorAll("[data-value]");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const equalsButton = document.getElementById("equals");

let expression = "";

const operators = ["+", "-", "*", "/"];

// Number, operator and decimal buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (operators.includes(value)) {
            addOperator(value);
        } else if (value === ".") {
            addDecimal();
        } else {
            expression += value;
            display.value = expression;
        }
    });
});

// Add operator
function addOperator(operator) {
    if (expression === "") {
        return;
    }

    const lastCharacter = expression.slice(-1);

    if (operators.includes(lastCharacter)) {
        expression = expression.slice(0, -1) + operator;
    } else {
        expression += operator;
    }

    display.value = expression;
}

// Add decimal
function addDecimal() {
    const parts = expression.split(/[+\-*/]/);
    const currentNumber = parts[parts.length - 1];

    if (!currentNumber.includes(".")) {
        expression += ".";
        display.value = expression;
    }
}

// Clear everything
clearButton.addEventListener("click", () => {
    expression = "";
    display.value = "";
});

// Delete last character
deleteButton.addEventListener("click", () => {
    expression = expression.slice(0, -1);
    display.value = expression;
});

// Calculate result
equalsButton.addEventListener("click", () => {
    if (expression === "") {
        return;
    }

    const lastCharacter = expression.slice(-1);

    if (operators.includes(lastCharacter)) {
        display.value = "Error";
        expression = "";
        return;
    }

    try {
        const result = calculate(expression);

        if (!Number.isFinite(result)) {
            display.value = "Error";
            expression = "";
            return;
        }

        display.value = result;
        expression = String(result);

    } catch (error) {
        display.value = "Error";
        expression = "";
    }
});

// Calculate without using eval()
function calculate(expression) {
    const numbers = expression.split(/[+\-*/]/);
    const operatorsUsed = expression.match(/[+\-*/]/g) || [];

    if (numbers.some(number => number === "")) {
        throw new Error("Invalid expression");
    }

    let result = Number(numbers[0]);

    for (let i = 0; i < operatorsUsed.length; i++) {
        const nextNumber = Number(numbers[i + 1]);
        const operator = operatorsUsed[i];

        if (operator === "+") {
            result += nextNumber;
        } else if (operator === "-") {
            result -= nextNumber;
        } else if (operator === "*") {
            result *= nextNumber;
        } else if (operator === "/") {
            if (nextNumber === 0) {
                throw new Error("Division by zero");
            }

            result /= nextNumber;
        }
    }

    return result;
}