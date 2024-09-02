const form = document.querySelector("#registrar");
const input = form.querySelector("input");

const mainDiv = document.querySelector(".main");
const ul = document.getElementById("invitedList");

const filterCheck = document.querySelector(".main div input");

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
  function createElement(htmlEl, property, value) {
    const newEl = document.createElement(htmlEl);
    newEl[property] = value;
    return newEl;
  }
  function appendTo(parentEl, htmlEl, property, value) {
    const element = createElement(htmlEl, property, value);
    parentEl.appendChild(element);
  }
  const li = document.createElement("li");

  appendTo(li, "span", "innerText", text);

  const label = createElement("label", "innerText", "Confirmed");
  const checkbox = createElement("input", "type", "checkbox");
  label.appendChild(checkbox);
  li.appendChild(label);

  appendTo(li, "button", "innerText", "Edit");
  appendTo(li, "button", "innerText", "Remove");

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
});

ul.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    const nameActions = {
      remove: () => {
        ul.removeChild(li);
      },
      edit: () => {
        const span = li.firstElementChild;
        const input = document.createElement("input");
        input.type = "text";
        input.value = span.innerText;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.innerText = "Save";
      },
      save: () => {
        const input = li.firstElementChild;
        const span = document.createElement("span");
        span.innerText = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.innerText = "Edit";
      },
    };
    if (button.innerText.toLowerCase() === "remove") {
      nameActions.remove();
    } else if (button.innerText.toLowerCase() === "edit") {
      nameActions.edit();
    } else if (button.innerText.toLowerCase() === "save") {
      nameActions.save();
    }
  }
});
