document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const ageInput = document.getElementById('age');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const submitButton = document.getElementById('submitButton');
    const errorMessage = document.getElementById('errorMessage');

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    storedUsers.forEach(user => addUserToTable(user));

    submitButton.addEventListener('click', function() {
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const age = parseInt(ageInput.value.trim(), 10);

        let valid = true;

        [firstNameInput, lastNameInput, ageInput].forEach(input => input.classList.remove('error'));

        if (!firstName) 
            {
            firstNameInput.classList.add('error');
            valid = false;
        }

        if (!lastName) 
            {
            lastNameInput.classList.add('error');
            valid = false;
        }

        if (isNaN(age) || !age) 
            {
            ageInput.classList.add('error');
            valid = false;
        }

        if (age < 18) 
            {
            ageInput.classList.add('error');
            valid = false;
            window.location.href = 'accessdenied.html';
        }

        if (valid) 
            {
            addUserToTable({ firstName, lastName, age });
            form.reset();
            errorMessage.style.display = 'none';
        } else 
        {
            errorMessage.textContent = 'Please fill in all of the fields correctly.';
            errorMessage.style.display = 'block';
        }
    });

    document.getElementById('clearButton').addEventListener('click', function() 
    {
        userTable.innerHTML = '';
        localStorage.removeItem('users');
    });
    

    function addUserToTable(user) 
    {
        const row = userTable.insertRow();
        row.insertCell(0).textContent = user.firstName;
        row.insertCell(1).textContent = user.lastName;
        row.insertCell(2).textContent = user.age;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
    
});
