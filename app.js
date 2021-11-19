const output = document.getElementById('result');

let operation = {
  firstInput: '',
  secondInput: '',
  operandPressed: false,
  action: '',
  runningTotal: undefined,
  haveTotal: false,
  decimalPressed: false,
};

// Todo Add event listener for decimal point

const evaluate = (e) => {
  if (operation.operandPressed === false) {
    operation.firstInput += e.target.innerText;
    console.log('first num ' + operation.firstInput);
    output.innerText = operation.firstInput;
  } else {
    operation.secondInput += e.target.innerText;
    console.log('second num ' + operation.secondInput);
    output.innerText = operation.secondInput;
  }
};

const getMathOperation = (e) => {
  if (operation.firstInput.length >= 1 && operation.secondInput === '') {
    operation.operandPressed = true;
    operation.action = e.target.innerText;
    output.innerText = e.target.innerText;
    console.log(e.target.innerText);
  }
};

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
  console.log('running total is : ' + operation.runningTotal);
}

const clear = () => {
  operation.firstInput = '';
  operation.secondInput = '';
  operation.operandPressed = false;
  output.innerText = '0';
  operation.runningTotal = 0;
  operation.haveTotal = false;
};

let clearItems = document
  .getElementById('clear')
  .addEventListener('click', clear);

// **************** DOM selectors *******************

let inputElements = document.querySelectorAll('.input-btn').forEach((item) => {
  item.addEventListener('click', evaluate);
});

let operatorClick = document.querySelectorAll('.operand').forEach((item) => {
  item.addEventListener('click', getMathOperation);
});

let decimal = document
  .getElementById('decimal')
  .addEventListener('click', evaluate);

const equal = document.getElementById('equals');
equal.addEventListener('click', getTotal);
