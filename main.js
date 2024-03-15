const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
// to check if i already have items-> show it in the page form local storage OR if the items list is empty show empty list
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
  // to prevent submission every item added
  e.preventDefault();
  const text = this.querySelector("[name = item]").value;
  const item = {
    // text: text = text
    text,
    done: false,
  };

  items.push(item);
  populateList(items, itemsList);
  // to allocate the items into local storage and convert the items from objects to arrays of strings
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

// make an empty value (plates = []) for non breaking the logic if i forget to add any value
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
    <li>
      <input type="checkbox" data-index="${i}" id="item${i}" ${
        plate.done ? "checked" : ""
      }>
      <label for="item${i}">${plate.text}</label>
      <button class="delete" data-index="${i}">❌</button>
    </li>
    `;
    })
    .join("");
}

// toggling done state from (fales) to (true) and vise versa
function toggleDone(e) {
  // if the clicked.target == "input" return it , otherwise skip
  // so it will retur only the (input filed) and skip the (label)
  if (!e.target.matches("input")) return;
  const element = e.target;
  const elementIndex = element.dataset.index;
  // when i click --> if the element is done(true) it will turns into the opposite state(fales) and vise versa
  items[elementIndex].done = !items[elementIndex].done;

  // to update the localstorage state too
  localStorage.setItem("items", JSON.stringify(items)); // Update local storage
  populateList(items, itemsList); // Repopulate the list
}

// for delete button 
function handleDelete(e) {
  if (!e.target.matches("button.delete")) return;
  const index = parseInt(e.target.dataset.index);
  items.splice(index, 1); // Remove the item from the array
  localStorage.setItem("items", JSON.stringify(items)); // Update local storage
  populateList(items, itemsList); // Repopulate the list
}


addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
itemsList.addEventListener("click", handleDelete); // handle delete button clicks
populateList(items, itemsList);
