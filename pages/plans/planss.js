$(`.card`).mouseenter(function(item) {
    $(` .card`).removeClass("card-selected");
    item.currentTarget.classList.add("card-selected")
  });