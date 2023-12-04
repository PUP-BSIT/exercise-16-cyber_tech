let currentSortOrder = 'asc';

function onTextChange() {
  let myInput = document.getElementById("my_input");
  let name = document.getElementById("name");
  let submitButton = document.getElementById("submit_button");

  submitButton.disabled = !(myInput.value.trim() && name.value.trim());
}

function addComment() {
  let name = document.getElementById("name").value;
  let comment = document.getElementById("my_input").value;

  if (!name || !comment) return;

  let commentsList = document.getElementById("comments_list");
  let listItem = document.createElement("li");
  let paragraph = document.createElement("p");

  const currentDate = new Date();
  listItem.setAttribute("data-date", currentDate);
  paragraph.textContent = `${name}: ${comment}`;
  listItem.appendChild(paragraph);
  commentsList.appendChild(listItem);

  document.getElementById("name").value = "";
  document.getElementById("my_input").value = "";
  document.getElementById("submit_button").disabled = true;

  sortComments();
}

function formatDate(date) {
  return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-
  ${padZero(date.getDate())} ${padZero(date.getHours())}:
  ${padZero(date.getMinutes())}`;
}

function padZero(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

function sortComments(order) {
  let commentsList = document.getElementById("comments_list");
  let comments = Array.from(commentsList.children);

  if (order) {
    currentSortOrder = order === 'asc' ? 'asc' : 'desc';
  }

  comments.sort((a, b) => {
    let dateA = new Date(a.getAttribute("data-date"));
    let dateB = new Date(b.getAttribute("data-date"));

    return currentSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  commentsList.innerHTML = "";
  comments.forEach(comment => commentsList.appendChild(comment));

  console.log(`Comments sorted by date in ${currentSortOrder}ending order.`);
}