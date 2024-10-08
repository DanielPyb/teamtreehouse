const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    const employees = JSON.parse(xhr.responseText);
    let statusHTML = `<ul class="bulleted">`;
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].inOffice === true) {
        statusHTML += `<li class="in">`;
      } else {
        statusHTML += `<li class="out">`;
      }
      statusHTML += employees[i].name;
      statusHTML += `</li>`;
    }
    statusHTML += "</ul>";
    document.getElementById("employee-list").innerHTML = statusHTML;
  }
};
xhr.open("GET", "data/data.json");
xhr.send();
