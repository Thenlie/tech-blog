const dashboard = (evt) => {
    evt.preventDefault();
    document.location.replace('/dashboard');
};

document.querySelector('#dashboard-btn').addEventListener('click', dashboard);