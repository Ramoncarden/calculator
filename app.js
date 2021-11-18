const output = document.getElementById('result');

let operation = {
  firstInput: '',
  secondInput: '',
  operandPressed: false,
  action: '',
  runningTotal: undefined,
};

const evaluate = (e) => {
  // TODO: Lock first variable when operand is pressed
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
  } else {
    output.innerText = Math.round((func + Number.EPSILON) * 100) / 100;
  }
};

function getTotal() {
  switch (true) {
    case operation.action === '+':
      const sumNums = () =>
        Number(operation.firstInput) + Number(operation.secondInput);
      // if (Number.isInteger(sumNums())) {
      //   output.innerText = sumNums();
      // } else {
      //   output.innerText = Math.round((sumNums() + Number.EPSILON) * 100) / 100;
      // }
      checkInt(sumNums());
      break;
    case operation.action === '-':
      const subNums = () =>
        Number(operation.firstInput) - Number(operation.secondInput);
      checkInt(subNums());
      break;
    case operation.action === 'x':
      const multNums = () =>
        Number(operation.firstInput) * Number(operation.secondInput);
      checkInt(multNums());
      break;
    case operation.action === '÷':
      const divNums = () =>
        Number(operation.firstInput) / Number(operation.secondInput);
      checkInt(divNums());
      break;
    default:
      output.innerText = 0;
  }
  operation.runningTotal = output.innerText;
  console.log(operation.runningTotal);
}

document.getElementById('clear').addEventListener('click', () => {
  operation.firstInput = '';
  operation.secondInput = '';
  operation.operandPressed = false;
  output.innerText = '0';
});

// **************** DOM selectors *******************

let inputElements = document.querySelectorAll('.input-btn').forEach((item) => {
  item.addEventListener('click', evaluate);
});

let operatorClick = document.querySelectorAll('.operand').forEach((item) => {
  item.addEventListener('click', getMathOperation);
});

const equal = document.getElementById('equals');
equal.addEventListener('click', getTotal);
