const login = (evt) => {
    evt.preventDefault();
    document.location.replace('/user/login');
};

const dashboard = (evt) => {
    evt.preventDefault();
    document.location.replace('/dashboard');
};

document.querySelector('#dashboard-btn').addEventListener('click', dashboard);
document.querySelector('#login-btn').addEventListener('click', login);