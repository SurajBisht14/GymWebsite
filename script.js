window.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#page1").style.opacity = '1';
    document.querySelector("#page1").style.zIndex = '1';
    document.querySelector("#home").style.color = "gray";
})
// Chagning the page
let classButton = document.querySelectorAll(".button");
const pageObject = {
    home: '1',
    articles: '2',
    gallery: '3',
    shop: '4',
    contactUs: '5'
}
let prePage = 1;
let currentClassButton = document.querySelector("#home");
let preClassButton = currentClassButton;
classButton.forEach((e) => {
    e.addEventListener('click', (eventObj) => {
        currentClassButton = eventObj.target;
        currentClassButton.style.color = 'gray';
        if (preClassButton !== currentClassButton) {
            preClassButton.style.color = 'white';
            preClassButton = currentClassButton;
        }
        let buttonId = eventObj.target.getAttribute('id');
        let pageNumber = pageObject[buttonId];
        document.querySelector(`#page${prePage}`).style.opacity = '0';
        document.querySelector(`#page${prePage}`).style.zIndex = '0';
        document.querySelector(`#page${pageNumber}`).style.opacity = '1';
        document.querySelector(`#page${pageNumber}`).style.zIndex = '1';
        prePage = pageNumber;
    })
})

//Pop up the cart
let i = 1;
document.querySelector(".cart").addEventListener('click', (e) => {
    if (i == 1) {
        document.querySelector(".popupCartContainer").style.opacity = '1'
        document.querySelector(".popupCartContainer").style.zIndex = '1'
        i++;
    }
    else {
        document.querySelector(".popupCartContainer").style.opacity = '0';
        document.querySelector(".popupCartContainer").style.zIndex = '0';
        i = 1;
    }
});

                                    // items increasing
let subTotal = [0, 0, 0, 0]
let totalItemsCount = 0;
let itemCount = document.querySelectorAll(".itemCount");

                                    //subtract the number
let subItem = document.querySelectorAll(".subItem");
subItem.forEach((e, index) => {
    e.addEventListener('click', () => {
        if (subTotal[index] > 0) {
            totalcount = totalcount - subTotal[index];
            subTotal[index]--;
            itemCount[index].innerText = `${subTotal[index]}`;
            totalcount = totalcount + subTotal[index];
        }
    });
})
let addItem = document.querySelectorAll(".addItem");
let totalcount = 0;
addItem.forEach((e, index) => {
    e.addEventListener('click', () => {
        totalcount = totalcount - subTotal[index];
        subTotal[index]++;
        itemCount[index].innerText = `${subTotal[index]}`;
        totalcount = totalcount + subTotal[index];
    });
})

                                        //Filling the cart
let cartItem;
let cartSpan = document.querySelector(".cartSpan");
let addTocart = document.querySelectorAll(".addToCart");
addTocart.forEach((addobj, index) => {
    addobj.addEventListener("click", (e) => {
        let selectedValue = subTotal[index];
        if(selectedValue>0){
         document.querySelector(".thankuCart").style.opacity = '0';
         document.querySelector(".thankuCart").style.zIndex = '0';
         document.querySelector(".fullCart").style.opacity = '1';
        document.querySelector(".fullCart").style.zIndex = '1';
        let nameOfButton = e.target.getAttribute('name');
        let existingCartItem = document.querySelector(`.fullCartItem[name="${nameOfButton}"]`);
        if(existingCartItem){
            let quantityElement = existingCartItem.querySelector(`.${nameOfButton}`);
            quantityElement.innerText = `Quantity ${subTotal[index]} x ₹${getPrice(nameOfButton)}= ₹${subTotal[index] * getPrice(nameOfButton)}`;
            cartSpan.innerText = `${totalcount}`;
        }
        else{
            cartSpan.style.opacity = '1';
            cartSpan.innerText = `${totalcount}`;
            cartItem = document.createElement('p');
            cartItem.classList.add('fullCartItem', `${nameOfButton}`);
            cartItem.setAttribute('name', nameOfButton);
            cartItem.innerHTML = `
            <img src="${nameOfButton}.png" alt="${nameOfButton} IMG" width="15%" height="100%">
             <span>
            <b>${nameOfButton.charAt(0).toUpperCase() + nameOfButton.slice(1)}</b>
            <b class="${nameOfButton}">Quantity ${subTotal[index]} x ₹${getPrice(nameOfButton)}= ₹${subTotal[index] * getPrice(nameOfButton)}</b>
            </span>
            <i class="fa-solid fa-trash" name="${nameOfButton}"></i>`;
            document.querySelector('#fullCartMain').appendChild(cartItem);

                            // Deleting the node
            deleteButton=cartItem.querySelector(".fa-trash");
            
            deleteButton.addEventListener('click', (e)=>{
                let deleteIcon=e.target.getAttribute("name");
                console.log(document.querySelector(`.${deleteIcon}`));
                document.querySelector(`.${deleteIcon}`).remove();
                totalcount=totalcount-subTotal[index];
                subTotal[index]=0;
                itemCount[index].innerText = `${subTotal[index]}`;
                cartSpan.innerText = `${totalcount}`;
                console.log(totalcount);
                if(totalcount==0){
                    cartSpan.innerText=''
                    document.querySelector(".fullCart").style.opacity = '0';
                    document.querySelector(".fullCart").style.zIndex = '0';
                    document.querySelector(".thankuCart").style.opacity = '0';
                    document.querySelector(".thankuCart").style.zIndex = '0';
                    document.querySelector(".emptyCart").style.opacity = '1';
                    document.querySelector(".emptyCart").style.zIndex = '1';
                }
            });
        }

        function getPrice(itemName) {
            switch (itemName) {
                case 'dumbell':
                    return 2000;
                case 'bench':
                    return 5000;
                case 'cycle':
                    return 8000;
                case 'smith':
                    return 10000;
                default:
                    return 0;
            }
        }
        }
        else{
            alert('Please select at least 1 item before adding to cart.');
        }
    })
})

                                

                    //Clicking the order button to pop up thank u page
document.querySelector(".order").addEventListener('click', (e) => {

    document.querySelector(".emptyCart").style.opacity = '0';
    document.querySelector(".emptyCart").style.zIndex = '0';
    document.querySelector(".fullCart").style.opacity = '0';
    document.querySelector(".fullCart").style.zIndex = '0';
    document.querySelector(".thankuCart").style.opacity = '1';
    document.querySelector(".thankuCart").style.zIndex = '1';
    j = 0;
    cartSpan.innerText = '';
    subTotal = [0, 0, 0, 0];
    totalItemsCount = 0;
    totalcount=0;
    itemCount.forEach((e)=>{
        e.innerText='0';
    })
})


