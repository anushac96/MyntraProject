

let itemsInCart;

onLoad();

function onLoad(){
    let bagItems = localStorage.getItem('bagItems');
    itemsInCart = bagItems?JSON.parse(bagItems):[];
    displayItemsOnHomePage();
    displayItemCountInCart();
}

function addToCart(itemId) {
    itemsInCart.push(itemId)
    localStorage.setItem('bagItems',JSON.stringify(itemsInCart));
    displayItemCountInCart();
}

function displayItemCountInCart(){
    let itemInCartcountElement =  document.querySelector('.itemInCartcount');
    if(itemsInCart.length>0){
        itemInCartcountElement.style.visibility  = 'visible';
        itemInCartcountElement.innerText = itemsInCart.length;
    }else{
        itemInCartcountElement.style.visibility  = 'hidden';
    }
}

function displayItemsOnHomePage() {
    let itemsContainer = document.querySelector(".items-container");
    if(!itemsContainer)
        return;
    let innerHTML = '';
    items.forEach(item => {
        innerHTML += `
    <div class="item-container">
        <img class="item-image" src="${item.image}" alt="item image">
        <div class="rating">
            ${item.rating.stars}🌟| ${item.rating.count}
        </div>
        <div class="company-name">
            ${item.company}
        </div>
        <div class="item-name">
            ${item.item_name}
        </div>
        <div class="price">
            <span class = "current-price">Rs ${item.current_price}</span>
            <span class = "original-price">Rs ${item.original_price}</span>
            <span class = "discount">(${item.discount_percentage}% OFF)</span>
        </div>
        <button class="btn-add-cart" onClick = "addToCart(${item.id})">Add to cart</button>
    </div>
    `
    });

    itemsContainer.innerHTML = innerHTML;
}