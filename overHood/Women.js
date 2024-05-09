let shop = document.getElementById('ProductCard');
console.log(shop);

let shopItemsData = [{
    id:"s1",
    name: "FlowerBoy Oversized",
    price: "699",
    img: "https://assets.bonkerscorner.com/uploads/2023/05/30122649/20230530_062959572_iOS-768x1152.jpg"
},{
    id:"s2",
    name: "Ice Hockey",
    price: "799",
    img: "https://assets.bonkerscorner.com/uploads/2023/05/29132313/Bonkerscorner_Ice-Hockey-Jersy-Blue_06-768x1152.jpg"
},{
    id:"s3",
    name: "Mystical Mushroom",
    price: "699",
    img: "https://assets.bonkerscorner.com/uploads/2023/05/31142949/20230531_085325939_iOS-768x1152.jpg"
},{
    id:"s4",
    name: "Wish Granter",
    price: "899",
    img: "https://assets.bonkerscorner.com/uploads/2023/05/29142909/Bonkerscorner_Abraca-dabra_02-768x1152.jpg"
},{
    id:"s5",
    name: "Stitch D100",
    price: "999",
    img: "https://assets.bonkerscorner.com/uploads/2023/05/01121832/Bonkerscorner_Aloha_05-1-768x1152.jpg"
},{
    id:"s6",
    name: "The Hulk",
    price: "699",
    img: "https://assets.bonkerscorner.com/uploads/2023/08/01120704/Bonkerscorner_Hulk_04-768x1152.jpg"
},{
    id:"s7",
    name: "Imagination is Real",
    price: "599",
    img: "https://assets.bonkerscorner.com/uploads/2023/03/06172548/Bonkerscorner_Don-quixote_01-768x1152.jpg"
},{
    id:"s8",
    name: "World of Stitch",
    price: "899",
    img: "https://assets.bonkerscorner.com/uploads/2023/04/29142355/Bonkerscorner_Stich_05-768x1152.jpg"
},{
    id:"s9",
    name: "Keep Rockin",
    price: "699",
    img: "https://assets.bonkerscorner.com/uploads/2023/03/27161401/Bonkerscorner_Rocking-tee_07-768x1152.jpg"
},{
    id:"s10",
    name: "Donald Sk8",
    price: "1099",
    img: "https://assets.bonkerscorner.com/uploads/2023/03/27153521/Bonkerscorner_Donald-jersey_05-768x1152.jpg"
}
];

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