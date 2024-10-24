document.addEventListener('DOMContentLoaded', function ()
{
    const form = document.getElementById('form');
    const successMessage = document.getElementById('successMessage');

    // Validation functions
    const validators = {
        email: (value) =>
        {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(value))
            {
                return 'Please enter a valid email address';
            }
            return '';
        },
        password: (value) =>
        {
            if(value.length < 6)
            {
                return 'Password must be at least 6 characters long';
            }
            return '';
        }
    };

    // Validate single field
    function validateField(fieldId, value, formData = {})
    {
        const validator = validators[fieldId];
        if(validator)
        {
            const error = validator(value, formData);
            return !error;
        }
        return true;
    }

    // Handle input events
    form.querySelectorAll('input').forEach(input =>
    {

        input.addEventListener('blur', function ()
        {
            validateField(this.id, this.value, getFormData());
        });
    });

    // Get form data
    function getFormData()
    {
        return {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
    }

    // Validate all fields
    function validateForm(formData)
    {
        let isValid = true;

        Object.keys(validators).forEach(fieldId =>
        {
            const isFieldValid = validateField(fieldId, formData[fieldId], formData);
            isValid = isValid && isFieldValid;
        });

        return isValid;
    }

    // Handle form submission
    form.addEventListener('submit', function (e)
    {
        e.preventDefault();

        const formData = getFormData();

        if(validateForm(formData))
        {

            // Create user object
            const user = {
                email: formData.email,
                password: formData.password
            };

            // Get existing users or initialize empty array
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            let exist = false;
            let index;

            for(let i = 0; i < existingUsers.length; i++)
            {
                if(user.email == existingUsers[i].email && user.password == existingUsers[i].password)
                {
                    index = i;
                    exist = true;
                    break;
                }
            }

            if(exist)
            {
                sessionStorage.setItem("id", JSON.stringify(JSON.parse(localStorage.getItem('users'))[index].id));
            }
            else
            {
                console.log("not a user");
            }
        }
    });
});