console.log('hey girl!');

function query(selector) {
	return document.querySelector(selector);
}

function queryAll(selector) {
	return document.querySelectorAll(selector);
}

function markValid(field) {
	// query('#parking-form').addEventListener('submit', function() {
	clearErrorMsgs(field);
	field.parentNode.classList.remove('input-invalid');
	field.parentNode.classList.add('input-valid');
}

function markInvalid(field, errorMsg) {
	// query('#parking-form').addEventListener('submit', function() {
	const fieldContainer = field.parentNode;
	clearErrorMsgs(field);
	fieldContainer.classList.remove('input-valid');
	fieldContainer.classList.add('input-invalid');

	if (query('.text-success')) {
		query('.text-success').remove();
	}

	if (errorMsg) {
		const errorParagraph = document.createElement('p');
		errorParagraph.classList.add('input-hint', 'text-danger', 'error-message');
		errorParagraph.innerText = errorMsg;
		fieldContainer.appendChild(errorParagraph);
	}
}

function clearErrorMsgs(field) {
	const fieldContainer = field.parentNode;
	for (let msg of fieldContainer.querySelectorAll('.error-message')) {
		msg.remove();
	}
}

function isDateTodayorLater(date) {
	let now = new Date();
	let userDate = new Date(date);
	console.log(now);
	return userDate <= now;
}

function validateCardNumber(number) {
	var regex = new RegExp('^[0-9]{16}$');
	if (!regex.test(number)) return false;

	return luhnCheck(number);
}

function luhnCheck(val) {
	var sum = 0;
	for (var i = 0; i < val.length; i++) {
		var intVal = parseInt(val.substr(i, 1));
		if (i % 2 == 0) {
			intVal *= 2;
			if (intVal > 9) {
				intVal = 1 + intVal % 10;
			}
		}
		sum += intVal;
	}
	return sum % 10 == 0;
}

function sumOfDays(startDay, field) {
	let now = new Date(startDay);
	let amountOfDays = Number(field.value);
	let sum = 0;
	let totalField = query('#total');
	let totalParagraph = document.createElement('p');
	// clearErrorMsgs(totalField);
	totalParagraph.classList.add('text-success', 'error-message');

	for (let i = 1; i <= amountOfDays; i++) {
		if (now.getDay() === 6 || now.getDay() === 0) {
			sum += 7;
		} else {
			sum += 5;
		}
		now.setDate(now.getDate() + 1);
		totalParagraph.innerText = `Success! Your form has been submitted. Your total is $${sum}.00.`;
		totalField.appendChild(totalParagraph);
	}
	return sum;
}

let validityPoints = 0;

function validateNameField(nameText) {
	query('#parking-form').addEventListener('submit', function() {
		event.preventDefault();
		let nameTextField = query('#name');
		nameText = nameTextField.value.trim();
		if (!nameText) {
			markInvalid(nameTextField, 'Oops! You forgot to add your name.');
		} else {
			markValid(nameTextField);
			validityPoints += 1;
		}
	});
}

function validateCarFields(carBox) {
	query('#parking-form').addEventListener('submit', function() {
		event.preventDefault();
		let carFields = query('.input-group').children;
		carBox = [];

		for (i = 0; i < carFields.length; i++) {
			carBox.push(carFields[i].value);
			if (!carBox[i]) {
				markInvalid(carFields[i].parentNode, 'Oops! All Fields are required');
				return;
			} else if (carBox[0] < 1900 || (carBox[0] > 2020 || isNaN(carBox[0]))) {
				markInvalid(carFields[i].parentNode, 'Oops! please enter a valid year.');
			} else {
				markValid(carFields[0].parentNode);
				validityPoints += 1;
			}
		}
	});
}

function validateDateField(dateText) {
	query('#parking-form').addEventListener('submit', function() {
		event.preventDefault();
		let dateTextField = query('#start-date');
		dateText = dateTextField.value;
		if (!dateText) {
			markInvalid(dateTextField, 'Oops! You need to add a date.');
		} else if (isDateTodayorLater(dateText)) {
			markInvalid(dateTextField, 'Oops! Your date needs to be in the future.');
		} else {
			markValid(dateTextField);
			validityPoints += 1;
		}
		console.log(dateText);
	});
}

function validateDaysField(daysText) {
	query('#parking-form').addEventListener('submit', function() {
		event.preventDefault();
		let daysTextField = query('#days');
		daysText = daysTextField.value.trim();
		if (!daysText) {
			markInvalid(daysTextField, 'Oops! We need to know how many days you need a pass.');
		} else if (isNaN(daysText) || daysText < 1 || daysText > 30) {
			markInvalid(daysTextField, 'Oops! The number of days must be a number between 1 and 30.');
		} else {
			markValid(daysTextField);
			validityPoints += 1;
		}
	});
}

function validateCreditCardField(creditCardText) {
	query('#parking-form').addEventListener('submit', function() {
		event.preventDefault();
		let creditCardField = query('#credit-card');
		creditCardText = creditCardField.value.trim();
		if (!creditCardText || validateCardNumber(creditCardText) === false) {
			markInvalid(creditCardField, 'Oops! We need a valid credit card number to process your payment.');
		} else {
			markValid(creditCardField);
			validityPoints += 1;
		}
	});
}

function validateCvvField(cvvText) {
	query('#parking-form').addEventListener('submit', function() {
		event.preventDefault();
		let cvvField = query('#cvv');
		cvvText = cvvField.value.trim();
		if (!cvvText || isNaN(cvvText) || cvvText.length !== 3) {
			markInvalid(cvvField, 'Oops! We need your three digit code on the back of your credit card.');
		} else {
			markValid(cvvField);
			validityPoints += 1;
		}
	});
}

function validateExpirationField(expirationText) {
	query('#parking-form').addEventListener('submit', function() {
		event.preventDefault();
		let expirationField = query('#expiration');
		expirationText = expirationField.value.trim();
		console.log(expirationText);
		expirationDate = expirationText.split('/').map(Number);
		now = new Date();
		year = now.getYear() - 100;
		month = now.getMonth() + 1;
		compareArray = [ month, year ];
		if (expirationDate[0] >= 1 && expirationDate[0] <= 12 && expirationDate[1] > compareArray[1]) {
			expirationDate[0] >= compareArray[0];
			markValid(expirationField);
			validityPoints += 1;
		} else if (expirationDate[0] >= compareArray[0] && expirationDate[1] === compareArray[1]) {
			markValid(expirationField);
			validityPoints += 1;
		} else {
			markInvalid(expirationField, 'We need the expiration date of your credit card');
			return false;
		}
	});
}

//  Create Object with key value pairs of ID and associated function

let fieldWithFunction = {
	'#name-field': validateNameField,
	'#car-field': validateCarFields,
	'#start-date': validateDateField,
	'#days-field': validateDaysField,
	'#credit-card-field': validateCreditCardField,
	'#cvv-field': validateCvvField,
	'#expiration-field': validateExpirationField
};

class Field {
	constructor(id, validator) {
		this.id = id;
		this.validator = validator;
	}
}

class Form {
	constructor(domNode, fields) {
		this.domNode = domNode;
		this.fields = fields;
	}

	validate() {
		let valid = true;

		for (let field of this.fields) {
			const fieldIsValid = fieldWithFunction[field]();
			if (!fieldIsValid) {
				valid = false;
			}
		}
		return valid;
	}
}

function createValidateField(id) {
	let newField = new Field(id, fieldWithFunction[id]);
	let validator = newField.validator(newField);
	return validator;
}

const nameField = createValidateField('#name-field');
console.log(createValidateField('#name-field'));

createValidateField('#car-field');

createValidateField('#start-date');

createValidateField('#days-field');

createValidateField('#credit-card-field');

createValidateField('#cvv-field');

createValidateField('#expiration-field');

let form = new Form(query('#parking-form'), [
	'#name-field',
	'#start-date',
	'#days-field',
	'#credit-card-field',
	'#cvv-field',
	'#expiration-field'
]);

query('#parking-form').addEventListener('submit', function() {
	if (!form.validate()) {
		sumOfDays(query('#start-date').value, query('#days'));
	}
});
