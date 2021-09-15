const containerProducts = document.getElementById("products");

const products = [
  {
    name: "Super Junior",
    id: 1,
    details: "SUPER JUNIOR - Album Vol.10 [The Renaissance] (PASSIONATE Ver.)",
    price: 14000,
    photo:
      "https://www.ktown4u.com/goods_files/SH0164/goods_images/000053/GD00052828.default.1.jpg",
    stock: 3,
  },
  {
    name: "EXO",
    id: 2,
    details: "EXO - Special Album [DON’T FIGHT THE FEELING]",
    price: 15000,
    photo:
      "https://www.ktown4u.com/goods_files/SH0164/goods_images/000057/GD00056120.default.1.jpg",
    stock: 1,
  },
  {
    name: "EXO",
    id: 3,
    details:
      "EXO - Album Vol.4 Repackage [THE WAR: The Power of Music] (Korean Ver.)",
    price: 11000,
    photo:
      "https://www.ktown4u.com/goods_files/SH0164/goods_images/000031/GD00030493.default.1.png",
    stock: 4,
  },
  {
    name: "Super Junior",
    id: 4,
    details: "Super Junior - Album Vol.9 [Time_Slip]",
    price: 15000,
    photo:
      "https://www.ktown4u.com/goods_files/SH0164/goods_images/000041/GD00040626.default.1.png",
    stock: 2,
  },
];

// VARIABLES CONTROL
let login;
let disabled;
let nameUser;
let stock;
let total = 0;
let iva;
//let dataAdd = localStorage.getItem("newProducts");
//let cartAdd = JSON.parse(dataAdd);
//let inCartAdd = [...cartAdd];
let add = [];
let exist = false;
let inputName = document.getElementById("name");
let inputPass = document.getElementById("password");
let btn = document.getElementById("addProduct");
let form = document.getElementById("form");
let cart = document.getElementById("cart");
let user = document.getElementById("user");
let userText = document.getElementById("userText");
let totalContainer = document.getElementById("total");
// MUESTRA PRODUCTOS
function showProduct(products) {
  products.forEach((e) => {
    //localStorage.setItem("products", products);
    //verifyLogin();
    if (sessionStorage.getItem("disabled")) {
      disabled = "";
    } else {
      disabled = "disabled";
    }
    //localStorage.setItem("products", JSON.stringify(products));
    let productsAll = e;

    containerProducts.innerHTML += `
      <div class="card" style="width: 32%;">
      <img src=${e.photo} class="card-img-top" alt=${e.name}>
      <div class="card-body">
      <h5 class="card-title">${e.name}</h5>
      <p class="card-text">${e.details}</p>
      <p class=""> stock : ${e.stock} </p>
      <button class="btn btn-primary add-cart" id="${e.id}" onClick="addCart(${productsAll.id})" ${disabled}>Add to cart</button>
      </div>
      </div>
      `;
  });
}

// LOGIN
function loginIn(name, password) {
  let nameUser = "yesung";
  let passwordUser = "a";
  //let inputName = document.getElementById("name");
  //let inputPass = document.getElementById("password");
  let form = document.getElementById("form");

  let errorMsgName = document.getElementById("errorTextName");
  let errorMsgPass = document.getElementById("errorTextPass");

  if (!inputName.value.trim()) {
    errorMsgName.innerHTML = "Escriba un nombre";
    return;
  }
  if (inputName.value !== nameUser) {
    errorMsgName.innerHTML = "Nombre incorrecto";
    return;
  }
  if (!inputPass.value.trim()) {
    errorMsgPass.innerHTML = "Escriba una contraseña";
    return;
  }

  if (inputPass.value !== passwordUser) {
    errorMsgPass.innerHTML = "Contraseña incorrecta";
    return;
  }
  console.log(password);
  if (nameUser === name && passwordUser === password) {
    login = true;
    if (login) {
      sessionStorage.setItem("login", true);
      sessionStorage.setItem("disabled", "false");
      sessionStorage.setItem("user", name);
      disabled = "";
      nameUser = name;

      form.style.display = "none";
      location.reload();
    }
  }
}

//LOG IN VERIFICATION
function verificationLogIn() {
  if (sessionStorage.getItem("login")) {
    login = true;
    if (login) {
      form.style.display = "none";
    }
  } else {
    login = false;
  }

  if (sessionStorage.getItem("disabled")) {
    disabled = "";
  }
}

// USER ACTIVE
function userActive(name) {
  if (sessionStorage.getItem("user")) {
    user.style.display = "flex";
    userText.innerHTML = name;
  }
}
// ADD PRODUCTS SHOW
function addProduct(products) {
  if (sessionStorage.getItem("disabled")) {
    disabled = "";
  } else {
    disabled = "disabled";
  }
  cart.innerHTML = products
    .map(
      (e) =>
        ` <div class="cart-products mb-2">
      <div style="width:50%">
        <img
          src=${e.photo}
          class=""
          style="width:100%; heigth:auto; max-width:100px"
          alt=${e.name}
        />
      </div>

      <div style="width:50%">
        <p>${e.name} </p>
        <p>${e.price} </p>
        <div style="width:100%; display:flex; height:auto; align-items:center; justify-content:space-between">
       
        <p>${e.quantity} </p>

        </div>
      </div>
    </div> `
    )
    .join("");
}

//ADD TO CART FUNCTION

function addCart(id) {
  //info productos
  let data = localStorage.getItem("products");
  let cart = JSON.parse(data);
  let inCart = [...cart];

  //info cart

  inCart.map((e) => {
    if (id === e.id) {
      console.log("stock producto", e.stock);

      //SI NO HAY STOCK
      if (e.stock === 0) {
        console.log("no hay stock");
        return;
      }
      //SI HAY STOCK
      if (e.stock >= 1) {
        //RESTAR 1 AL STOCK
        e.stock = e.stock - 1;
        let actualStock = e.stock - 1;
        //GUARDAR EN LOCAL STORAGE
        localStorage.setItem("products", JSON.stringify(inCart));

        /* let dataAdd = localStorage.getItem("newProducts");
        let cartAdd = JSON.parse(dataAdd);
        let inCartAdd = [...cartAdd]; */

        if (localStorage.getItem("newProducts")) {
          sumQuantity(id, actualStock, e);
        }
        /* inCartAdd.map((x) => {
            console.log("new", inCartAdd);
          
            if (id === x.id) {
              exist = true;
              x.quantity = x.quantity + 1;
              localStorage.setItem("newProducts", JSON.stringify(inCartAdd));
              cart.innerHTML = "";
              total = x.quantity * x.price + x.quantity * 350 + total;
              addProduct(inCartAdd);
              sumTotal(total);
            }
          });
          
          if (!exist) {
            newObj = { ...e, stock: actualStock, quantity: 1 };
            inCartAdd.push(newObj);
            localStorage.setItem("newProducts", JSON.stringify(inCartAdd));
            
            total =
              newObj.quantity * newObj.price + newObj.quantity * 350 + total;
            addProduct(inCartAdd);
            sumTotal(total);
          }
        } */

        console.log("old", inCart);

        containerProducts.innerHTML = "";
        showProduct(cart);
        exist = false;
      }
    }
  });
}
// TOTAL
function sumTotal(sum) {
  iva = 350;

  //total = products.quantity * products.price + products.quantity * iva;
  localStorage.setItem("total", JSON.stringify(sum));
  totalContainer.innerHTML = `
<div style="width:100%; height:100% ">
<div style="width: 100%; height:100%;display:flex; justify-content: space-between">
<p>IVA</p> <p> $${iva} x producto </p>
</div>



<div style="width: 100%; height:100%;display:flex; justify-content: space-between; ">
<p>Total de Productos</p> <p> ${sum} </p>
</div>

<div style="width: 100%; height:100%;display:flex; justify-content: space-between; ">
<p>Total envío</p> <p> $1500 </p>
</div>

<div style="width: 100%; height:100%;display:flex; justify-content: space-between; ">
<p>Total compra</p> <p> ${
    JSON.parse(localStorage.getItem("total")) === 0 ? 0 : sum + 1500
  } </p>
</div>

<div style="width: 100%; height:100%;display:flex; justify-content: space-between; ">
<button> Realizar pedido </button>
</div>


</div>

`;
}

function sumQuantity(id, actualStock, actualProduct) {
  let dataAdd = localStorage.getItem("newProducts");
  let cartAdd = JSON.parse(dataAdd);
  let inCartAdd = [...cartAdd];
  inCartAdd.map((x) => {
    console.log("new", inCartAdd);
    // SI EXISTE EL MISMO PRODUCTO EN EL CARRO
    if (id === x.id) {
      exist = true;
      x.quantity = x.quantity + 1;
      localStorage.setItem("newProducts", JSON.stringify(inCartAdd));
      cart.innerHTML = "";
      total = x.quantity * x.price + x.quantity * 350 + total;
      addProduct(inCartAdd);
      sumTotal(total);
    }
  });
  // SI NO EXISTE EN EL CARRO DE COMPRAS
  if (!exist) {
    newObj = { ...actualProduct, stock: actualStock, quantity: 1 };
    inCartAdd.push(newObj);
    localStorage.setItem("newProducts", JSON.stringify(inCartAdd));
    //cart.innerHTML = "";
    total = newObj.quantity * newObj.price + newObj.quantity * 350 + total;
    addProduct(inCartAdd);
    sumTotal(total);
  }
}

function purchase() {}

// SUBMIT
function onSubmit(e) {
  e.preventDefault();
  loginIn(inputName.value, inputPass.value);
  //showProduct(products);
}

// FUNCION ACTIVDA
window.addEventListener("load", () => {
  //let data = localStorage.getItem("products");
  //let cart = JSON.parse(data);
  if (JSON.parse(localStorage.getItem("products"))) {
    showProduct(JSON.parse(localStorage.getItem("products")));
  } else {
    localStorage.setItem("products", JSON.stringify(products));

    showProduct(JSON.parse(localStorage.getItem("products")));
  }

  if (JSON.parse(localStorage.getItem("newProducts"))) {
    localStorage.setItem(
      "newProducts",
      JSON.stringify(JSON.parse(localStorage.getItem("newProducts")))
    );
    addProduct(JSON.parse(localStorage.getItem("newProducts")));
  } else {
    localStorage.setItem("newProducts", JSON.stringify(add));
    addProduct(add);
  }
  if (JSON.parse(localStorage.getItem("total"))) {
    localStorage.setItem(
      "total",
      JSON.stringify(JSON.parse(localStorage.getItem("total")))
    );
    sumTotal(JSON.parse(localStorage.getItem("total")));
  } else {
    localStorage.setItem("total", JSON.stringify(total));
    sumTotal(total);
  }
});

form.addEventListener("submit", onSubmit);
//loginIn(inputName.value, inputPass.value);

verificationLogIn();
userActive(sessionStorage.getItem("user"));
