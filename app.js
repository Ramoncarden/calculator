const output = document.getElementById('result');

let operation = {
  firstInput: '0',
  secondInput: '',
  operandPressed: false,
};

const evaluate = (e) => {
  operation.firstInput += e.target.innerText;
  console.log(e.target.innerText);
  console.log(operation.firstInput);

  output.innerText = operation.firstInput;
};

document.addEventListener('click', evaluate);

document.getElementById('clear').addEventListener('click', () => {
  operation.firstInput = '0';
  console.log(output.innerText);
});
