const editPost = (evt) => {
    evt.preventDefault();
    const id = window.location.pathname.split('/')[2];
    document.location.replace(`/post/update/${id}`);
}

async function deletePost(evt) {
    evt.preventDefault();
    const post_id = window.location.pathname.split('/')[2];
    const response = await fetch('/post', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: post_id })
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#edit-btn').addEventListener('click', editPost);
document.querySelector('#delete-btn').addEventListener('click', deletePost);