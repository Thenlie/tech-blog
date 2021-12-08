async function logout() {
    const response = await fetch('/user/logout');
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#logout-btn').addEventListener('click', logout);