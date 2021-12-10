const login = (evt) => {
    evt.preventDefault();
    document.location.replace('/user/login');
};

document.querySelector('#login-btn').addEventListener('click', login);