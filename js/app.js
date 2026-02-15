// Initialize items from local storage
var items = getLocalStorage();
function getLocalStorage() {
  var list = localStorage.getItem("grocery-list");
  if (list) {
    return JSON.parse(list);
  }
  return [];
}
function setLocalStorage(itemsArray) {
  localStorage.setItem("grocery-list", JSON.stringify(itemsArray));
}
var editId = null;
// Render App
function render() {
  var $app = $("#app");
  $app.empty();

  var itemToEdit = editId
    ? $.grep(items, function (item) {
        return item.id === editId;
      })[0]
    : null;

  var $formElement = createForm(editId, itemToEdit);
  var $itemsElement = createItems(items);
  $app.append($itemsElement);
  $app.append($formElement);
}
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
// Initialize App
$(document).ready(function () {
  render();
});
// Edit Completed Function
function editCompleted(itemId) {
  items = $.map(items, function (item) {
    if (item.id === itemId) {
      return $.extend({}, item, { completed: !item.completed });
    }
    return item;
  });
  setLocalStorage(items);
  render();
}

// Remove Item Function
function removeItem(itemId) {
  items = $.grep(items, function (item) {
    return item.id !== itemId;
  });
  setLocalStorage(items);
  render();
  setTimeout(function () {
    alert("Item Deleted Successfully!");
  }, 0);
}
// Add Item Function
function addItem(itemName) {
  var newItem = {
    name: itemName,
    completed: false,
    id: generateId(),
    quantity: 1,
  };
  items.push(newItem);
  setLocalStorage(items);
  render();
  setTimeout(function () {
    alert("Item Added Successfully!");
  }, 0);
}
// Update Item Name Function
function updateItemName(newName) {
  items = $.map(items, function (item) {
    if (item.id === editId) {
      return $.extend({}, item, { name: newName });
    }
    return item;
  });
  editId = null;
  setLocalStorage(items);
  render();
  setTimeout(function () {
    alert("Item Updated Successfully!");
  }, 0);
}

// Set Edit ID Function
function setEditId(itemId) {
  editId = itemId;
  render();

  // Focus input after render
  setTimeout(function () {
    $(".form-input").focus();
  }, 0);
}

// Update Item Quantity Function
function updateItemQuantity(itemId, change) {
  items = $.map(items, function (item) {
    if (item.id === itemId) {
      var newQuantity = Math.max(1, item.quantity + change);
      return $.extend({}, item, { quantity: newQuantity });
    }
    return item;
  });

  render();
}