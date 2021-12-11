async function signup(evt) {
    evt.preventDefault()
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    if (username && password) {
        const response = await fetch('/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

const login = () => {
    document.location.replace('/login');
};

document.querySelector('#login-btn').addEventListener('click', login);
document.querySelector('#signup-form').addEventListener('submit', signup);