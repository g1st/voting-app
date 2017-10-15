'use strict';

var plus_one = document.getElementById('increaser');
var additional_choices = document.getElementById('additional_choices');
var minus_one = document.getElementById('decreaser');

plus_one.addEventListener('click', function () {
  console.log('just clicked');
  var input = document.createElement('span');
  input.innerHTML = '<input type="text" name="choice"><span id="decreaser" class="form-decreaser"> - </span><br>';

  additional_choices.appendChild(input);
});

minus_one.addEventListener('click', removeFields);

var removeFields = function removeFields() {
  console.log('just clicked destroy');
};