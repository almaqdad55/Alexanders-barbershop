// recive and refactor products data
// display products on DOM
// store products data in local storage

// variables
const ProductsDisplay = document.querySelector(".products-display");
const cartBtn = document.querySelector(".cart-btn");
const cartContentDisplay = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const totalItems = document.querySelector("#total-items");
const closeCart = document.querySelector(".close-cart");
const cartContent = document.querySelector(".cart-content");
const cartTotal = document.querySelector(".cart-total");
const clearCartBtn = document.querySelector(".clear-cart");

// cart
let cart = [];
const items = [
  {
    sys: { id: "1" },
    fields: {
      title: "Aveda",
      price: 10.99,
      image: { fields: { file: { url: "images/product-1.jpeg" } } },
    },
  },
  {
    sys: { id: "2" },
    fields: {
      title: "Grooming Kit - Leather Case",
      price: 98.99,
      image: { fields: { file: { url: "images/product-2.jpeg" } } },
    },
  },
  {
    sys: { id: "3" },
    fields: {
      title: "Proraso Beard Shave",
      price: 28.99,
      image: { fields: { file: { url: "images/product-3.jpeg" } } },
    },
  },
  {
    sys: { id: "4" },
    fields: {
      title: "Sukin",
      price: 22.99,
      image: { fields: { file: { url: "images/product-4.jpeg" } } },
    },
  },
  {
    sys: { id: "5" },
    fields: {
      title: "Beard Blade",
      price: 10.99,
      image: { fields: { file: { url: "images/product-5.jpeg" } } },
    },
  },
  {
    sys: { id: "6" },
    fields: {
      title: "Beard Styling",
      price: 12.99,
      image: { fields: { file: { url: "images/product-6.jpeg" } } },
    },
  },
  {
    sys: { id: "7" },
    fields: {
      title: "Meridian",
      price: 45.99,
      image: { fields: { file: { url: "images/product-7.jpeg" } } },
    },
  },
  {
    sys: { id: "8" },
    fields: {
      title: "table",
      price: 13.99,
      image: { fields: { file: { url: "images/product-8.jpeg" } } },
    },
  },
];

itemy = items.map((item) => {
  const { id } = item.sys;
  const { title, price } = item.fields;
  const image = item.fields.image.fields.file.url;
  return { id, title, price, image };
});

class Products {
  async getProducts() {
    try {
      const response = await fetch("products.json");
      const data = await response.json();
      let products = data.items;

      products = products.map((item) => {
        // const id = parseInt(item.sys.id);
        // const title = item.fields.title;
        // const price = item.fields.price;
        const { id } = item.sys;
        const { title, price } = item.fields;
        const image = item.fields.image.fields.file.url;
        return { id, title, price, image };
      });

      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

class UI {
  showCart() {
    cartContentDisplay.style.transform = "translateX(0)";
    cartOverlay.style.visibility = "visible";
  }

  hideCart() {
    cartContentDisplay.style.transform = "translateX(100%)";
    cartOverlay.style.visibility = "hidden";
  }

  cartClicked() {
    cartBtn.addEventListener("click", () => {
      this.showCart();
    });
  }

  cartClosed() {
    closeCart.addEventListener("click", () => {
      this.hideCart();
    });
  }

  cartClosedOverlay() {
    cartOverlay.addEventListener("click", (e) => {
      if (e.target.classList.contains("cart-overlay")) {
        this.hideCart();
      }
    });
  }

  clearCart(cart) {
    clearCartBtn.addEventListener("click", (e) => {
      localStorage.removeItem("cart");
      cartContent.innerHTML = "";
      totalItems.innerText = 0;
      cartTotal.innerText = 0;
      console.log(Storage.getCart());
      let inCart = cart.find((item) => item.id === id);
      console.log(inCart);
    });
  }

  updateCartIcon() {
    let y = Storage.getCart().length;

    totalItems.innerText = y;
  }

  cartLogic(cart) {
    cartContent.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-chevron-up")) {
      }
    });
  }

  setCartValues(cart) {
    let total = 0;
    let unitPrice = 0;
    cart.forEach((item) => {
      // total += item.price
      unitPrice = item.price * item.amount;

      // total += (parseFloat(item.price));
      total += unitPrice;
    });
    total = total.toFixed(2);
    // console.log(total)

    cartTotal.innerText = total;
  }

  disableProductSelection() {}

  displayProducts(data) {
    let html = "";
    data.forEach((item) => {
      html += `
                    <article class = "product">
                        <div class = "img-container">
                            <img src = ${item.image} alt="product" class="product-img">
                            <button class = "bag-btn" data-id=${item.id}>
                                <i class = "fas fa-shopping-cart"></i>
                                add to cart
                            </button>
                        </div>
                        <h3>${item.title}</h3>
                        <h4>$${item.price}</h4>
                    </article>
            `;
    });
    ProductsDisplay.insertAdjacentHTML("beforeend", html);
  }

  getProductsBtns() {
    let element;
    let id;

    let total;

    let buttons = document.querySelectorAll(".bag-btn");
    buttons = [...buttons];

    buttons.forEach((button) => {
      let id = button.dataset.id;
      cart = Storage.getCart();
      // console.log(u);

      let inCart = cart.find((item) => item.id === id);
      // console.log(inCart)
      if (inCart) {
        button.innerText = "Added to cart";
        button.disabled = true;
      }

      button.addEventListener("click", (e) => {
        // get product from products
        // update total items display on cart icon
        // add product to cart

        // update cart icon display
        // show product on cart display
        // update total values

        if (e.target.classList.contains("fas")) {
          e.target.parentElement.disabled = true;
          e.target.parentElement.textContent = "added to cart";
          // element = e.target.parentElement;
        } else {
          e.target.disabled = true;
          e.target.textContent = "added to cart";
          // element = e.target;
        }

        // this.disableProductSelection();

        // get product from products storage using id
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        // console.log(cartItem)

        // // add product to cart
        cart = [...cart, cartItem];
        // let amount = {cart}
        console.log(cart);
        // console.log(cart)

        // add cart to local storage
        Storage.saveCart(cartItem);

        this.addItemToCart();
        this.updateCartIcon();
        this.setCartValues(cart);

        // // show products in cart
        // this.addItemToCart(cartItem);
      });
    });
  }

  addItemToCart() {
    let cort = Storage.getCart();
    const div = document.createElement("div");
    div.classList.add("cart-item");
    let html = "";
    cort.forEach((item) => {
      html += `
            <div class="cart-item">
                <img src=${item.image} alt="product">
                <div>
                    <h4>${item.title}</h4>
                    <h5>$${item.price}</h5>
                    <span class="remove-item">remove</span>
                </div>
                <div>
                    <i class="fas fa-chevron-up"></i>
                    <p class="item-amount">${item.amount}</p>
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            `;
    });

    // div.innerHTML = `
    // <div class="cart-item">
    //     <img src=${item.image} alt="product">
    //     <div>
    //         <h4>${item.title}</h4>
    //         <h5>$${item.price}</h5>
    //         <span class="remove-item">remove</span>
    //     </div>
    //     <div>
    //         <i class="fas fa-chevron-up"></i>
    //         <p class="item-amount">1</p>
    //         <i class="fas fa-chevron-down"></i>
    //     </div>
    // </div>
    // `;

    // cartContent.appendChild(div);
    cartContent.innerHTML = html;
  }
}

class Storage {
  static saveProducts(products) {
    // Save List of products in loacal storage
    localStorage.setItem("Products", JSON.stringify(products));
  }
  static getProduct(id) {
    // get a product from local storage by id
    let products = JSON.parse(localStorage.getItem("Products"));
    return products.find((product) => product.id === id);
  }
  static saveCart(cartItem) {
    // Parse any JSON previously stored in cart
    let existingCart = JSON.parse(localStorage.getItem("cart"));
    if (existingCart === null) existingCart = [];
    existingCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));
  }

  static getCart() {
    if (JSON.parse(localStorage.getItem("cart")) === null) return [];
    return JSON.parse(localStorage.getItem("cart"));
  }
}
console.log(cart);
document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const ui = new UI();
  ui.cartClicked();
  ui.cartClosed();
  ui.cartClosedOverlay();
  ui.addItemToCart();
  ui.updateCartIcon();
  ui.clearCart();
  // // ui.updateCartIcon();
  // ui.getProductsBtns();
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(itemy);
      Storage.saveProducts(itemy);
    })
    .then(() => {
      ui.getProductsBtns();
      ui.cartLogic();
    });
});
