const signup = (evt) => {
    evt.preventDefault();
    document.location.replace('/signup');
};

document.querySelector('#signup-btn').addEventListener('click', signup);