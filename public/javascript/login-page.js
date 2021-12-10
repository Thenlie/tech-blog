async function login(evt) {
    evt.preventDefault()
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    if (username && password) {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

const signup = () => {
    document.location.replace('/signup');
};

document.querySelector('#signup-btn').addEventListener('click', signup);
document.querySelector('#login-form').addEventListener('submit', login);