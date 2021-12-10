const login = (evt) => {
    evt.preventDefault();
    document.location.replace('/login');
};

document.querySelector('#login-btn').addEventListener('click', login);