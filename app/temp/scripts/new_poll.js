const plus_one = document.getElementById('increaser');
const additional_choices = document.getElementById('additional_choices');
const minus_one = document.getElementById('decreaser');


plus_one.addEventListener('click', () => {
  console.log('just clicked');
  const input = document.createElement('span');
  input.innerHTML = '<input type="text" name="choice"><span id="decreaser" class="form-decreaser"> - </span><br>';

  additional_choices.appendChild(input);
});

minus_one.addEventListener('click', removeFields);

const removeFields = () => {
  console.log('just clicked destroy');
};
