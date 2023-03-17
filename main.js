let select = document.getElementById("select");
let category = "Category";

let generateGrid = (list) => {
  return (document.getElementById("products").innerHTML = list
    .map((p) => {
      let { title, img, desc1, desc2, price } = p;
      return `
          <article class="col-lg-4 col-md-6">
              <div
                class="d-flex flex-column justify-content-center mb-4 border shadow"
              >
                <figure class="product-image">
                  <img
                    src=${img}
                    alt="Product Image"
                  />
                </figure>
                <section class="product-info p-4">
                  <h2>${title}</h2>
                  <p class="text-start my-2">${desc1}</p>
                  <p class="text-start mt-4">${desc2}</p>
                  <div
                    class="d-flex flex-row justify-content-between align-items-center mt-4"
                  >
                    <p>price ${price}$</p>
                    <button type="button" onclick="increaseCartAmount()" class="btn add-btn bg-primary px-3 py-2">Add to cart</button>
                  </div>
                </section>
              </div>
            </article>
      `;
    })
    .join(""));
};
generateGrid(products);

let increaseCartAmount = () => {
  let cart = document.getElementById("cart-amount");
  cart.innerHTML++;
};

select.onchange = () => {
  category = select.options[select.selectedIndex].innerHTML;
  generateGrid(filterByCategory());
};

let filterByCategory = () => {
  let filteredList = [];
  if (category === "WOMAN") {
    products.forEach((product) => {
      if (product.category === "WOMAN") {
        filteredList.push(product);
      }
    });
  } else if (category === "MAN") {
    products.forEach((product) => {
      if (product.category === "MAN") {
        filteredList.push(product);
      }
    });
  } else return products;
  return filteredList;
};

document.getElementById("search-btn").onclick = () => {
  let input = document
    .getElementById("search-input")
    .value.toLowerCase()
    .trim();
  if (input.length === 0) {
    alert("Nothing has been entered to search!");
  } else {
    let matchedList = [];
    filterByCategory().forEach((item) => {
      let title = item.title.toLowerCase();
      let category = item.category.toLowerCase();
      if (title.includes(input) || category.includes(input)) {
        matchedList.push(item);
      }
    });
    if (matchedList.length !== 0) {
      generateGrid(matchedList);
    } else {
      alert("Nothing found!");
    }
  }
};
