async function comment(evt) {
    evt.preventDefault();
    const comment = document.querySelector('#comment').value.trim();
    const post_id = window.location.pathname.split('/')[2];
    if (comment) {
        const response = await fetch('/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: comment, post_id: post_id })
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#comment-form').addEventListener('submit', comment);