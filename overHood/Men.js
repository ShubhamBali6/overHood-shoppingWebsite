let shop = document.getElementById('ProductCard');
console.log(shop);

let shopItemsData = [{
    id:"s1",
    name: "Blaze Green Oversized",
    price: "Rs 699",
    img: "https://assets.bonkerscorner.com/uploads/2022/06/09163302/BLAZE-5_6-1.jpg"
},{
    id:"s2",
    name: "OffWhite Oversized",
    price: "Rs 799",
    img: "https://assets.bonkerscorner.com/uploads/2023/04/14142722/Bonkerscorner_Don-quixote_01-768x1152.jpg"
},{
    id:"s3",
    name: "Grey Oversized",
    price: "Rs 699",
    img: "https://assets.bonkerscorner.com/uploads/2023/03/31111428/Bonkerscorner_Slayer_06-768x1152.jpg"

},{
    id:"s4",
    name: "Metallica Oversized",
    price: "Rs 799",
    img: "https://assets.bonkerscorner.com/uploads/2022/11/28143014/20221118_063228000_iOS-4-1-768x1152.jpg"
},{
    id:"s5",
    name: "Siganture Oversized",
    price: "Rs 699",
    img: "https://assets.bonkerscorner.com/uploads/2022/11/14191146/Signature_cone_man_ost03-768x1152.jpg"
},{
    id:"s6",
    name: "Diesel Oversized",
    price: "Rs 799",
    img: "https://assets.bonkerscorner.com/uploads/2022/11/14162344/Bonkerscorner_Diesel_punk_ost01-768x1151.jpg",
},{
    id:"s7",
    name: "Pirate Oversized",
    price: "Rs 1099",
    img: "https://assets.bonkerscorner.com/uploads/2022/10/13152730/Bonkerscorner_-Pirate_crew_03-768x1152.jpg",
},{
    id:"s8",
    name: "Skater Oversized",
    price: "Rs 799",
    img: "https://assets.bonkerscorner.com/uploads/2022/08/15111855/20220813_065015042_iOS-768x1152.jpeg",
},{
    id:"s9",
    name: "Dead End Oversized",
    price: "Rs 699",
    img: "https://assets.bonkerscorner.com/uploads/2022/08/13152122/20220813_082537561_iOS.jpg",
},{
    id:"s10",
    name: "Ruffle Oversized",
    price: "Rs 999",
    img: "https://assets.bonkerscorner.com/uploads/2022/08/30103929/Black-Ruffle-It-Up-Oversized-T-shirt_1-768x1152.jpg",
}
]

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
            let {id, name, price, img} = x; 
        let search = basket.find((x)=>x.id === id) || [];
        return `
        <div id=product-id-${x.id} class="item">
        <div class="img">
          <img class="ProductImg" width="222" src="${x.img}" alt="">
        </div>
        <div class="details">
          <h3>${x.name}</h3>
          <div class="price">
            <h3>Rs ${x.price}</h3>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">
              ${search.item === undefined? 0:search.item}
              </div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>`
    }).join(""))
}

generateShop();

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
    
    localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x) => x.id == id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x+y,0);
};
calculation();