const output = document.getElementById('result');

let operation = {
  firstInput: '',
  secondInput: '',
  operandPressed: false,
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
  if (operation.firstInput.length >= 1) {
    operation.operandPressed = true;
    output.innerText = e.target.innerText;
    console.log(e.target.innerText);
  }
};

let inputElements = document.querySelectorAll('.input-btn').forEach((item) => {
  item.addEventListener('click', evaluate);
});
// document.addEventListener('click', evaluate);

document.getElementById('clear').addEventListener('click', () => {
  operation.firstInput = '';
  operation.secondInput = '';
  operation.operandPressed = false;
  output.innerText = '0';
});

let operatorClick = document.querySelectorAll('.operator').forEach((item) => {
  item.addEventListener('click', getMathOperation);
});

// TODO: Capture second variable info
