class validation {
	constructor(test, errorMsg) {
		this.test = test;
		this.errorMsg = errorMsg || 'is invalid';
	}
	// convice yourself of this by end of code
	validate(value) {
		return this.test(value);
	}
}

class Field {
	constructor(inputDiv, validations) {
		this.inputDive = inputDiv;
		this.validations = validations || [];
	}
	clearErrorMsgs() {
		for (let msg of this.inputDiv.querySelectorAll('.error-msg')) {
			msg.remove();
		}
	}

	addErrorMsgs(errorMsgs) {
		let fieldName = this.inputDiv.querySelecor('label').innerText;
		for (let msg of errorMsgs) {
			const msgNode = document.createElement('p');
			msgNode.classList.add('input-hint', 'text-danger', 'error-msg');
			msgNode.innerText = `${fieldName} ${msg}.`;
			this.inputDiv.appendChild(msgNode);
		}
	}
	markValid() {
		this.clearErrorMsgs();
		this.inputDiv.classList.add('input-valid');
		this.inputDiv.classList.remove('input-invalid');
	}

	markInvalid() {
		this.clearErrorMsgs();
		this.inputDiv.classList.add('input-invalid');
		this.inputDiv.remove('input-valid');
	}
	getValue() {
		const input = this.inputDiv.querySelector('input, select, textarea');
		const value = input.value;
		return value;
	}

	// validate function takes no arguments - only returns true/false

	validate() {
		const value = this.getValue();

		// for each validation, validate that value.
		const errorMsgs = [];
		for (let validation of this.validations) {
			if (!validation.validate(value)) {
				errorMsgs.push(validation.errorMsg);
			}
		}

		if (errorMsgs.length === 0) {
			this.markValid();
		} else {
			this.markInvalid();
			this.addErrorMsgs(errorMsgs);
		}
		return errorMsgs.length === 0;
	}
}

// Represents form, filled with fields
class Form {
	contstructor(domNode = domNode) {
		this.domNode = domNode;
		this.fields = fields;
	}

	validate() {
		let valid = true;

		for (let field of fields) {
			const fieldIsValid = field.validate();
			if (!fieldIsValid) {
				valid = false;
			}
		}
		return valid;
	}
}
