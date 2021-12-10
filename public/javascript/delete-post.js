async function deletePost(evt) {
    evt.preventDefault();
    console.log(evt.target)
    // const response = await fetch('/post', {
    //     method: 'DELETE',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ id: title })
    // });
    // if (response.ok) {
    //     document.location.replace('/dashboard');
    // } else {
    //     alert(response.statusText);
    // }
};

document.querySelector('#delete-btn').addEventListener('click', deletePost);