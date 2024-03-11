
const mango = {
    name: "Mango",
    price: 4.99,
    subtotal: 0,
    quantity: 0,
    inCart: false,
};
const plum = {
    name: "Plum",
    price: 2.99,
    subtotal: 0,
    quantity: 0,
    inCart: false,
};
const kiwi = {
    name: "Kiwi",
    price: 3.99,
    subtotal: 0,
    quantity: 0,
    inCart: false,
};
const pineapple = {
    name: "Pineapple",
    price: 9.99,
    subtotal: 0,
    quantity: 0,
    inCart: false,
};

/* =========================================================================================== */
/* JSON section */

/* Convert the given object to JSON, then add it to local storage */
function localStorageStorer ( product ) {
    
    const JSONproduct = JSON.stringify(product);
    localStorage.setItem(product.name, JSONproduct);

}

/* Takes in a JSON object, deserializes it, then sends it on its way */
function localStorageDeJSONifier ( JSONproduct ) {

    var productObject = JSON.parse(JSONproduct);
    return productObject;
    
}

/* Updates items in local storage */
function localStorageUpdater ( product ) {

    productInStorage = JSON.parse(localStorage.getItem(product.name));

    productInStorage.quantity = product.quantity;
    productInStorage.subtotal = product.subtotal;

    localStorage.setItem(product.name, JSON.stringify(productInStorage));

}

function localStorageItemRemover ( product ) {
    for ( var index = 0; index < localStorage.length; index++ ) {
        if ( product.name === localStorage.key(index) ) {
            localStorage.removeItem(product.name);
        }
    }
}

/* =========================================================================================== */
/* Miscellaneous Helper Functions */

let total = 0;

/* This function gets called every time an item gets added or removed */
function updateSummary() {

    const num_items = mango.quantity + plum.quantity + kiwi.quantity + pineapple.quantity;
    const current_num_items = document.getElementById("total_items");
    if ( num_items == 1 ) {
        current_num_items.innerHTML = num_items + " item in your cart";
    } else current_num_items.innerHTML = num_items + " items in your cart";    
    console.log(typeof total);

    total = Number(mango.subtotal) + Number(plum.subtotal) + Number(kiwi.subtotal) + Number(pineapple.subtotal);
    total = (Math.round(total * 100) / 100).toFixed(2);
    const current_total = document.getElementById("subtotal");
    current_total.innerHTML = "Total: $" + total; 

}  

function updateSubtotal(product) {
    const subtotal_display = document.getElementById(product.name+"_subtotal");
    subtotal_display.innerHTML = "$"+product.subtotal;
}  

function getRemoveHandler(item_name) {
    if ( item_name === "Mango" ) return mangoRemove;
    if ( item_name === "Plum" ) return plumRemove;
    if ( item_name === "Kiwi" ) return kiwiRemove;
    if ( item_name === "Pineapple" ) return pineappleRemove;
}

/* Returns the name of the quantity handler function with respect to the each fruit */
function getQuantityHandler(item_name) {
    if ( item_name === "Mango" ) return handleMangoChange;
    if ( item_name === "Plum" ) return handlePlumChange;
    if ( item_name === "Kiwi" ) return handleKiwiChange;
    if ( item_name === "Pineapple" ) return handlePineappleChange;
}

/* =========================================================================================== */
/* Div creation and appending section */

function createFourthDiv(item_price, item_name) {

    const div = document.createElement("div");
    const p = document.createElement("p");

    p.setAttribute('id', item_name+"_subtotal")
    p.innerText = "$"+item_price;
    div.append(p);
    return div;
}

function createThirdDiv(item_name) {

    var div = document.createElement("div");
    var quantity_form = document.createElement("form");

    var attributes = document.createElement('input');
    attributes.setAttribute('type', 'number');
    attributes.setAttribute('id', item_name+"_quantity");
    attributes.setAttribute('value', '1');
    attributes.setAttribute('min', '1');
    attributes.setAttribute('step', '1');
    attributes.addEventListener('input', getQuantityHandler(item_name));

    quantity_form.appendChild(attributes);
    div.append(quantity_form);
    return div;
}

function createSecondDiv(item_price) {

    const div = document.createElement("div");
    const p = document.createElement("p");

    p.innerText = "$"+item_price;
    div.append(p);
    return div;
}

function createFirstDiv(item_name) {

    const div = document.createElement("div");
    const p = document.createElement("p");

    p.innerText = item_name;
    div.append(p);

    // Now we create the 'remove' button
    var remove_button = document.createElement("button");
    remove_button.textContent = "Remove";
    remove_button.setAttribute('type', 'button');
    remove_button.setAttribute('id', item_name+"_remove");
    remove_button.addEventListener('click', getRemoveHandler(item_name));

    div.append(remove_button);
    return div;
}

/* This is the main function that creates the master div to be appended to the cart */
function itemAppender3000(product) {

    const item_name = product.name;
    const item_price = product.price;

    // 'item_container' is the encompassing div that everything gets appended to
    const item_container = document.createElement("div");
    item_container.classList.add("cart_item");
    
    // Create and append the first div. Includes the item name and the remove button
    item_container.append(createFirstDiv(item_name));    
    
    // Create and append the second div to display the price
    item_container.append(createSecondDiv(item_price));

    // Create and append the third div to hold the quantity form
    item_container.append(createThirdDiv(item_name));

    // Create and append the fourth div to display the subtotal
    item_container.append(createFourthDiv(item_price, item_name));


    return item_container;
}

/* =========================================================================================== */
/* Program start */

/* 
After ANY add to cart gets activated, create a new object in local storage
if one of the quantites change, just update that element in local storage

If the remove button is activated, just remove the element from local storage.

Re-append all the stuff in local storage upon loading the page

*/

let shopping_cart = document.querySelector('.cart_item_list');

function getItem(product) {
    if ( product.name === "Mango" ) return mango;
    if ( product.name === "Plum" ) return plum;
    if ( product.name === "Kiwi" ) return kiwi;
    if ( product.name === "Pineapple" ) return pineapple;
}

// for ( var index = 0; index < localStorage.length; index++ ) {
//     var key = localStorage.key(index);
//     var productObject = localStorageDeJSONifier(localStorage.getItem(key));
//     product = getItem(productObject)

//     shopping_cart.append(itemAppender3000(product));
    
//     var quantityButton = document.getElementById(product.name+"_quantity");
//     quantityButton.setAttribute('value', productObject.quantity)

//     product.inCart = true;
//     product.quantity = productObject.quantity;
//     product.subtotal = productObject.subtotal;
//     updateSubtotal(product);
//     updateSummary();
// }

const mango_form = document.getElementById("mango");
mango_form.addEventListener("submit", function (event) {
    event.preventDefault();

    if ( mango.inCart ) {
        window.alert("Item: \"Mango\" is already in your cart!");
        return;
    }

    // Pass in the 'mango' object to the div creator and immediately append it
    shopping_cart.append(itemAppender3000(mango));

    // Set 'inCart' equal to true for mango
    mango.quantity = 1;
    mango.inCart = true;
    mango.subtotal = mango.price;
    updateSummary();

    // Add the item to local storage
    // localStorageStorer(mango);
});

const plum_form = document.getElementById("plum");
plum_form.addEventListener("submit", function (event) {
    event.preventDefault();

    if ( plum.inCart ) {
        window.alert("Item: \"Plum\" is already in your cart!");
        return;
    }

    // Pass in the 'plum' object to the div creator and immediately append it
    shopping_cart.append(itemAppender3000(plum));

    // Set 'inCart' equal to true for plum
    plum.quantity = 1;
    plum.inCart = true;
    plum.subtotal = plum.price;
    updateSummary();

    // Add the item to local storage
    // localStorageStorer(plum);
});

const kiwi_form = document.getElementById("kiwi");
kiwi_form.addEventListener("submit", function (event) {
    event.preventDefault();

    if ( kiwi.inCart ) {
        window.alert("Item: \"Kiwi\" is already in your cart!");
        return;
    }

    // Pass in the 'kiwi' object to the div creator and immediately append it
    shopping_cart.append(itemAppender3000(kiwi));

    // Set 'inCart' equal to true for kiwi
    kiwi.quantity = 1;
    kiwi.inCart = true;
    kiwi.subtotal = kiwi.price;
    updateSummary();

    // Add the item to local storage
    // localStorageStorer(kiwi);
});

const pineapple_form = document.getElementById("pineapple");
pineapple_form.addEventListener("submit", function (event) {
    event.preventDefault();

    if ( pineapple.inCart ) {
        window.alert("Item: \"Pineapple\" is already in your cart!");
        return;
    }

    // Pass in the 'pineapple' object to the div creator and immediately append it
    shopping_cart.append(itemAppender3000(pineapple));

    // Set 'inCart' equal to true for pineapple
    pineapple.quantity = 1;
    pineapple.inCart = true;
    pineapple.subtotal = pineapple.price;
    updateSummary();

    // Add the item to local storage
    // localStorageStorer(pineapple);
});

/* =========================================================================================== */
/* Various Event Listeners */

function handleMangoChange() {        
    var value = parseInt(document.getElementById('Mango_quantity').value, 10);
    mango.quantity = value;
    mango.subtotal = (Math.round((mango.quantity * mango.price) * 100) / 100).toFixed(2);
    updateSubtotal(mango);
    updateSummary();
    // localStorageUpdater(mango);
}

function handlePlumChange() {
    var value = parseInt(document.getElementById('Plum_quantity').value, 10);
    plum.quantity = value;
    plum.subtotal = (Math.round((plum.quantity * plum.price) * 100) / 100).toFixed(2);
    updateSubtotal(plum);
    updateSummary();
    // localStorageUpdater(plum);
}

function handleKiwiChange() {
    var value = parseInt(document.getElementById('Kiwi_quantity').value, 10);
    kiwi.quantity = value;
    kiwi.subtotal = (Math.round((kiwi.quantity * kiwi.price) * 100) / 100).toFixed(2);
    updateSubtotal(kiwi);
    updateSummary();
    // localStorageUpdater(kiwi);
}

function handlePineappleChange() {
    var value = parseInt(document.getElementById('Pineapple_quantity').value, 10);
    console.log("Hi?");
    
    pineapple.quantity = value;
    pineapple.subtotal = (Math.round((pineapple.quantity * pineapple.price) * 100) / 100).toFixed(2);
    updateSubtotal(pineapple);
    updateSummary();
    // localStorageUpdater(pineapple);
}

function removeHandler(product) {
    
    // Reset everything
    var child = document.getElementById(product.name+"_remove");
    var parent = child.parentElement.parentElement;

    // Remove the div completely
    parent.remove();

    product.quantity = 0;
    product.subtotal = 0;
    product.inCart = false;

    // localStorageItemRemover(product);
    updateSummary();
}

function mangoRemove() {    
    removeHandler(mango);
}
function plumRemove() {
    removeHandler(plum);
}
function kiwiRemove() {
    removeHandler(kiwi);
}
function pineappleRemove() {
    removeHandler(pineapple);
}