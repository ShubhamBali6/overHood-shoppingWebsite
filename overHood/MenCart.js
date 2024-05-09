let label = document.getElementById('label');
let shoppingCart = document.getElementById('shoppingCart')
let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x+y,0);
};
calculation();

let GenerateCartItems = ()=>{
    if(basket.length !== 0){
        return (shoppingCart.innerHTML = basket.map((x)=>{
            let {id, item} = x;
            let search = shopItemsData.find((y)=> y.id === id) || [];
            return `
            <div class="cart-item">
            <img class="CartImg" width="175px" src="${search.img}">
            <div class="details">
               
               <div class="title-price-x">
               <h4 class="title-price">
               <p>${search.name}</p>
               <p class="cart-item-price">Rs ${search.price}</p>
               </h4>
               </div>

               <div class="cart-Buttons">
               <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
               </div>

               <div class="div4">
               <h3>Rs ${item * search.price}</h3>
               </div>
               <div class="div3">
               <i onclick="removeItem(${id})" class="bi bi-trash3"></i>
               </div>
            </div>
            </div>
            `;
        }).join(""));
    }
    else{
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <img class="CartImg" src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png">
        <h2>Cart is Empty</h2>
        <a href="LandingPart.html">
        <button class="HomeBtn">Back to Main Page</button>
        </a>
        `;
    }
};
GenerateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id == selectedItem.id);
    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });    
    }
    else{
        search.item+=1
    }
    //console.log(basket);
    localStorage.setItem("data", JSON.stringify(basket));
    GenerateCartItems();
    update(selectedItem.id);
};
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    //console.log(basket);
    update(selectedItem.id);
    basket = basket.filter((x)=> x.item !== 0);
    GenerateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x) => x.id == id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};

let removeItem = (id)=>{
    selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    GenerateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}
let clearCart = () => {
    basket = [];
    GenerateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
  };
let TotalAmount = () => {
    if (basket.length !== 0) {
      let amount = basket
        .map((x) => {
          let { item, id } = x;
          let search = shopItemsData.find((y) => y.id === id) || [];
  
          return item * search.price;
        })
        .reduce((x, y) => x + y, 0);
      // console.log(amount);
      label.innerHTML = `
      <h2>Total Bill : Rs ${amount}</h2>
      <button class="checkout"><a class="ThankingPg" href="ThankingPg.html">Checkout</a></button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `;
    } else return;
  };
  
  TotalAmount();