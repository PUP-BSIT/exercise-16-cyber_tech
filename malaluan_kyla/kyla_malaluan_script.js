let commentForm = document.getElementById("comment_form");
let nameInput = document.getElementById("name");
let commentInput = document.getElementById("comment");
let commentsList = document.getElementById("comments_list");
let addCommentButton = document.getElementById("add_comment");

const toggleButtonState = () => {
    if (nameInput.value.trim() !== '' && 
        commentInput.value.trim() !== '') {
        addCommentButton.disabled = false;
    } else {
        addCommentButton.disabled = true;
    }
};

nameInput.addEventListener('input', toggleButtonState);
commentInput.addEventListener('input', toggleButtonState);

commentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let name = nameInput.value;
    let comment = commentInput.value;

    if (name && comment) {
        let newComment = document.createElement("li");
        newComment.textContent = `${name}: ${comment}`;
        newComment.dataset.date = new Date().getTime();

        commentsList.appendChild(newComment);

        sortComments();

        nameInput.value = "";
        commentInput.value = "";
        addCommentButton.disabled = true; 
    }
});

function sortComments() {
    let allComments = Array.from(commentsList.children);

    allComments.sort((a, b) => {
        let dateA = parseInt(a.dataset.date);
        let dateB = parseInt(b.dataset.date);
        return dateA - dateB;
    });

    allComments.forEach(comment => {
        commentsList.appendChild(comment);
    });
}

document.getElementById("sort_asc").addEventListener("click", sortComments);

document.getElementById("sort_desc").addEventListener("click", () => {
    let allComments = Array.from(commentsList.children);

    allComments.sort((a, b) => {
        let dateA = parseInt(a.dataset.date);
        let dateB = parseInt(b.dataset.date);
        return dateB - dateA;
    });

    while (commentsList.firstChild) {
        commentsList.removeChild(commentsList.firstChild);
    }

    allComments.forEach(comment => {
        commentsList.appendChild(comment);
    });
});
