
let itemsIndexInCart;
let bagItemsContainerElement = document.querySelector('.bag-items-container');

onLoad();

function onLoad() {
    showItemsInCart();
    cartAmountSummary();
    //totalItemsInCart();
    //totalMrpCal();
    //totalDiscountedPrice();
}

function displayUpdatedItemCountInCart() {
    let itemInCartcountElement = document.querySelector('.itemInCartcount');
    if (itemsIndexInCart.length > 0) {
        itemInCartcountElement.style.visibility = 'visible';
        itemInCartcountElement.innerText = itemsIndexInCart.length;
    } else {
        itemInCartcountElement.style.visibility = 'hidden';
    }
}

function removeFromCart(indexId) {
    itemsIndexInCart.splice(indexId, 1);

    localStorage.setItem('bagItems', JSON.stringify(itemsIndexInCart));
    displayUpdatedItemCountInCart();
    bagItemsContainerElement.innerHTML = '';
    onLoad();
}

function showItemsInCart() {

    let itemsIndexInCartElement = localStorage.getItem('bagItems');
    itemsIndexInCart = itemsIndexInCartElement ? JSON.parse(itemsIndexInCartElement) : [];
    itemsIndexInCart.forEach(itemsId => {
        bagItemsContainerElement.innerHTML += `
        <div class="bag-item-container">
            <div class="item-left-part">
                <img class="bag-item-img" src="../${items[itemsId - 1].image}">
            </div>
            <div class="item-right-part">
                <div class="company">${items[itemsId - 1].company}</div>
                <div class="item-name">${items[itemsId - 1].item_name}</div>
                <div class="price-container">
                <span class="current-price">Rs ${items[itemsId - 1].current_price}</span>
                <span class="original-price">Rs ${items[itemsId - 1].original_price}</span>
                <span class="discount-percentage">(${items[itemsId - 1].discount_percentage}% OFF)</span>
                </div>
                <div class="return-period">
                <span class="return-period-days">${items[itemsId - 1].return_period} days</span> return available
                </div>
                <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${items[itemsId - 1].delivery_date}</span>
                </div>
            </div>

            <div class="remove-from-cart" onClick="removeFromCart(${itemsIndexInCart.indexOf(itemsId)})">X</div>
        </div>
        `
    });
}

// function totalItemsInCart() {
//     let totalItem = document.querySelector(".price-header");
//     totalItem.innerHTML = ` PRICE DETAILS FOR ${itemsIndexInCart.length} ITEMS`;
// }

// function totalMrpCal() {
//     let totalMrpElement = document.querySelector(".price-item-value");
//     let mrpSum = 0;
//     itemsIndexInCart.forEach(itemId => {
//         console.log("price of each element: ", items[itemId - 1].current_price);
//         mrpSum = items[itemId - 1].original_price + mrpSum;
//     });
//     totalMrpElement.innerHTML = `Rs ${mrpSum}`;
// }

// function totalDiscountedPrice() {
//     let discountValueElement = document.querySelector('.priceDetail-base-discount');
//     let discountSum = 0;
//     itemsIndexInCart.forEach(itemId => {
//         discountSum = (items[itemId - 1].original_price - items[itemId - 1].current_price) + discountSum;
//     });
//     discountValueElement.innerHTML = `-Rs ${discountSum}`;
// }

// function totalAmount() {
//     let totalAmountElement = document.querySelector('.price-item-value');
//     let sum = 0;
//     sum = mrpSum - discountSum;
//     totalAmountElement.innerHTML = `-Rs ${sum}`;
// }

function cartAmountSummary() {
    let mrpSum = 0;
    let discountSum = 0;
    let sum = 0;

    itemsIndexInCart.forEach(itemId => {
        mrpSum = items[itemId - 1].original_price + mrpSum;
        discountSum = (items[itemId - 1].original_price - items[itemId - 1].current_price) + discountSum;
    });

    sum = mrpSum - discountSum;

    let bagSummaryElement = document.querySelector('.bag-summary');
    bagSummaryElement.innerHTML = `
        <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS FOR ${itemsIndexInCart.length} ITEMS</div>
            <div class="price-item">
            <span class="price-item-tag">Total MRP</span>
            <span class="price-item-value">Rs ${mrpSum}</span>
            </div>
            <div class="price-item">
            <span class="price-item-tag">Discount on MRP</span>
            <span class="price-item-value priceDetail-base-discount">- Rs ${discountSum}</span>
            </div>
            <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">Rs 99</span>
            </div>
            <hr>
            <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">Rs ${sum}</span>
            </div>
        </div>
    `
}