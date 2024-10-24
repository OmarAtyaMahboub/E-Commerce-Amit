document.addEventListener('DOMContentLoaded', function ()
{
    const form = document.getElementById('form');
    const successMessage = document.getElementById('successMessage');

    // Validation functions
    const validators = {
        username: (value) =>
        {
            if(value.length < 3)
            {
                return 'Username must be at least 3 characters long';
            }
            return '';
        },
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

    function getNextId()
    {
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        if(existingUsers.length === 0)
        {
            return 1; // Start with ID 1 if no users exist
        }
        return existingUsers.length;
    }

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
            username: document.getElementById('fname').value,
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
            // Generate unique ID
            const userId = getNextId();

            // Create user object
            const user = {
                id: userId,
                username: formData.username,
                email: formData.email,
                password: formData.password
            };

            // Get existing users or initialize empty array
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

            // Add new user
            existingUsers.push(user);

            // Save to localStorage
            localStorage.setItem('users', JSON.stringify(existingUsers));

            // Reset form
            form.reset();
        }
    });
});