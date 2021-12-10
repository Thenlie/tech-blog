async function editPost(evt) {
    evt.preventDefault();
    const id = window.location.pathname.split('/')[3];
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const response = await fetch(`/post/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title, content: content })
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#post-form').addEventListener('submit', editPost);