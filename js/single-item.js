// Create SingleItem Element
function createSingleItem(item) {
  var $div = $('<div class="single-item"></div>');

  $div.html(`
    <input type="checkbox" ${item.completed ? "checked" : ""} />
    <p style="text-decoration: ${item.completed ? "line-through" : "none"}">
      ${item.name}
    </p>
    <div class="quantity-controls">
      <button class="btn icon-btn qty-decrease-btn" type="button">-</button>
      <span class="qty-display">${item.quantity}</span>
      <button class="btn icon-btn qty-increase-btn" type="button">+</button>
    </div>
    <button class="btn icon-btn edit-btn" type="button">
      <i class="fa-regular fa-pen-to-square"></i>
    </button>
    <button class="btn icon-btn remove-btn" type="button">
      <i class="fa-regular fa-trash-can"></i>
    </button>
  `)
  // Add event listener for checkbox
  $div.find('input[type="checkbox"]').on("change", function () {
    editCompleted(item.id);
  });

  // Add event listener for remove button
  $div.find(".remove-btn").on("click", function () {
    removeItem(item.id);
  });
  // Add event listener for edit button
  $div.find(".edit-btn").on("click", function () {
    setEditId(item.id);
  });

  // Add event listeners for quantity buttons
  $div.find(".qty-increase-btn").on("click", function () {
    updateItemQuantity(item.id, 1);
  });

  $div.find(".qty-decrease-btn").on("click", function () {
    updateItemQuantity(item.id, -1);
  });

  return $div;
}