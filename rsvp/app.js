const form = document.querySelector("#registrar");
const input = form.querySelector("input");

const mainDiv = document.querySelector(".main");
const ul = document.getElementById("invitedList");

const filterDiv = document.createElement("div");
const filterCheck = document.createElement("input");
const filterLabel = document.createElement("label");

filterLabel.innerText = "Only see confirmed attendees";
filterCheck.type = "checkbox";
filterDiv.append(filterLabel);
filterDiv.append(filterCheck);
mainDiv.insertBefore(filterDiv, ul);

filterCheck.addEventListener("change", (e) => {
  const isChecked = e.target.checked;
  const lis = ul.children;
  if (isChecked) {
    for (let i = 0; i < lis.length; i++) {
      let li = lis[i];
      if (li.className === "responded") {
        li.style.display = "";
      } else {
        li.style.display = "none";
      }
    }
  } else {
    for (let i = 0; i < lis.length; i++) {
      let li = lis[i];
      li.style.display = "";
    }
  }
});

function createLI(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(span);
  const label = document.createElement("label");
  label.innerText = "Confirmed";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  label.appendChild(checkbox);
  li.appendChild(label);
  const editBTN = document.createElement("button");
  editBTN.innerText = "Edit";
  li.appendChild(editBTN);

  const removeBTN = document.createElement("button");
  removeBTN.innerText = "Remove";
  li.appendChild(removeBTN);
  return li;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value;
  const li = createLI(text);
  ul.appendChild(li);
  input.value = "";
});

ul.addEventListener("change", (e) => {
  const checkbox = e.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;

  if (checked) {
    listItem.className = "responded";
  } else {
    listItem.className = "";
  }
  console.log(e.target.checked);
});

ul.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    if (button.innerText.toLowerCase() === "remove") {
      ul.removeChild(li);
    } else if (button.innerText.toLowerCase() === "edit") {
      const span = li.firstElementChild;
      const input = document.createElement("input");
      input.type = "text";
      input.value = span.innerText;
      li.insertBefore(input, span);
      li.removeChild(span);
      button.innerText = "Save";
    } else if (button.innerText.toLowerCase() === "save") {
      const input = li.firstElementChild;
      const span = document.createElement("span");
      span.innerText = input.value;
      li.insertBefore(span, input);
      li.removeChild(input);
      button.innerText = "Edit";
    }
  }
});
