async function post(evt) {
    evt.preventDefault();
    document.location.replace('/post/create')
}

document.querySelector('#post-btn').addEventListener('click', post);