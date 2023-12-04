document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("name");
    const commentInput = document.getElementById("comment");
    const commentButton = document.getElementById("comment_button");
    const commentsList = document.getElementById("comments_list");

    nameInput.addEventListener("input", updateCommentButtonState);
    commentInput.addEventListener("input", updateCommentButtonState);
    commentButton.addEventListener("click", addComment);

    function updateCommentButtonState() {
        if (nameInput.value.trim() !== "" && commentInput.value.trim() !== "") {
            commentButton.disabled = false;
        } else {
            commentButton.disabled = true;
        }
    }

    function addComment(event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();

        if (name === "" || comment === "") {
            return;
        }

        const newComment = document.createElement("li");
        const commentText = document.createElement("p");

        const currentDate = new Date().toLocaleDateString();
        newComment.setAttribute("data-date", currentDate);

        commentText.textContent = `${name}: ${comment}`;
        newComment.appendChild(commentText);
        commentsList.appendChild(newComment);

        nameInput.value = "";
        commentInput.value = "";
        commentButton.disabled = true;
    }

    function sortComments(order) {
        const comments = Array.from(commentsList.children);

        comments.sort((a, b) => {
            const dateA = new Date(a.getAttribute("data-date"));
            const dateB = new Date(b.getAttribute("data-date"));

            if (order === "asc") {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });

        commentsList.innerHTML = "";

        comments.forEach(comment => {
            commentsList.appendChild(comment);
        });
    }

    document.getElementById("sort_asc").addEventListener(
        "click", () => sortComments("asc")
        );
    document.getElementById("sort_desc").addEventListener(
        "click", () => sortComments("desc")
        );
});