const output = document.getElementById('result');
const decimal = document.getElementById('decimal');
const equal = document.getElementById('equals');

// Object to handle calculator state changes
let operation = {
  firstInput: '',
  secondInput: '',
  operandPressed: false,
  action: '',
  runningTotal: undefined,
  haveTotal: false,
  decimalPressed: false,
};

// collect first input, math operation, and then second input. Results saved in operation object.
const getInputs = (e) => {
  if (operation.operandPressed === false) {
    if (e.target.innerText === '.') {
      decimal.removeEventListener('click', getInputs);
    }
    operation.firstInput += e.target.innerText;
    output.innerText = operation.firstInput;
  } else {
    if (e.target.innerText === '.') {
      decimal.removeEventListener('click', getInputs);
    }
    operation.secondInput += e.target.innerText;
    output.innerText = operation.secondInput;
  }
};

// listen for math operation state change
const getMathOperation = (e) => {
  if (operation.firstInput.length >= 1 && operation.secondInput === '') {
    decimal.addEventListener('click', getInputs);
    operation.operandPressed = true;
    operation.action = e.target.innerText;
    output.innerText = e.target.innerText;
  }
};

// Data being gathered in string form gets converted to number type or float type to
// perform calculations correctly.
const checkInt = (func) => {
  if (Number.isInteger()) {
    output.innerText = func();
    operation.haveTotal = true;
    operation.secondInput = '';
    operation.runningTotal += output.innerText;
  } else {
    output.innerText = parseFloat(func.toFixed(6));
    operation.haveTotal = true;
    operation.secondInput = '';
    operation.runningTotal = output.innerText;
  }
};

function getTotal() {
  switch (true) {
    case operation.action === '+' && operation.firstInput !== undefined:
      const sumNums = () => {
        if (operation.haveTotal === false) {
          return Number(operation.firstInput) + Number(operation.secondInput);
        } else {
          return Number(operation.runningTotal) + Number(operation.secondInput);
        }
      };
      checkInt(sumNums());
      break;

    case operation.action === '-' && operation.firstInput !== undefined:
      const subNums = () => {
        if (operation.haveTotal === false) {
          return Number(operation.firstInput) - Number(operation.secondInput);
        } else {
          return Number(operation.runningTotal) - Number(operation.secondInput);
        }
      };
      checkInt(subNums());
      break;

    case operation.action === 'x' && operation.firstInput !== undefined:
      const multNums = () => {
        if (operation.haveTotal === false) {
          return Number(operation.firstInput) * Number(operation.secondInput);
        } else {
          return Number(operation.runningTotal) * Number(operation.secondInput);
        }
      };
      checkInt(multNums());
      break;

    case operation.action === '÷' && operation.firstInput !== undefined:
      const divNums = () => {
        if (operation.haveTotal === false) {
          return Number(operation.firstInput) / Number(operation.secondInput);
        } else {
          return Number(operation.runningTotal) / Number(operation.secondInput);
        }
      };
      checkInt(divNums());
      break;
    case operation.action === '' || operation.runningTotal === NaN:
      output.innerText = 'Invalid Input';
      clear();
      break;
    default:
      break;
  }
  decimal.addEventListener('click', getInputs);
}

// Reset state of operation object
const clear = () => {
  operation.firstInput = '';
  operation.secondInput = '';
  operation.operandPressed = false;
  output.innerText = '0';
  operation.runningTotal = 0;
  operation.haveTotal = false;
  decimal.addEventListener('click', getInputs);
};

// **************** DOM selectors *******************

let clearItems = document
  .getElementById('clear')
  .addEventListener('click', clear);

let inputElements = document.querySelectorAll('.input-btn').forEach((item) => {
  item.addEventListener('click', getInputs);
});

let operatorClick = document.querySelectorAll('.operand').forEach((item) => {
  item.addEventListener('click', getMathOperation);
});

decimal.addEventListener('click', getInputs);

equal.addEventListener('click', getTotal);
