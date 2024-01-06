function Validator(options) {
    function validate(inputElement, rule, errorElement)
    {
        
        var errorMessage = rule.test(inputElement.value);
        if(errorMessage)
        {
            errorElement.innerText = errorMessage;
            inputElement.classList.add('invalid');
            inputElement.parentElement.classList.add('invalid');
            inputElement.parentElement.classList.remove('border-bottom');
            inputElement.classList.remove('border-0');
        } else
        {
            errorElement.innerText = '';
            inputElement.classList.remove('invalid');
            inputElement.parentElement.classList.remove('invalid');
            inputElement.parentElement.classList.add('border-bottom');
            inputElement.classList.add('border-0');
        }
    };
    var formElement = document.querySelector(options.form);

    if(formElement)
    {
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            
            if(inputElement)
            {
                var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                inputElement.onblur = function () 
                {
                    
                    validate(inputElement, rule, errorElement);
                }

                inputElement.oninput = function ()
                {
                    errorElement.innerText = '';
                    inputElement.classList.remove('invalid');
                    inputElement.parentElement.classList.remove('invalid');
                    inputElement.parentElement.classList.add('border-bottom');
                    inputElement.classList.add('border-0');
                }
            }
        });
    }
}


Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Please enter this field';
        }
    };
}
Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : 'Email format is incorrect';
        }
    };
}
Validator.minLength = function (selector, min) {
    
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Please enter at least ${min} characters`;
        }
    };
}
Validator.isConfirmed = function (selector, getConfirmValue) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : 'Input value does not match';
        }
    };
}
