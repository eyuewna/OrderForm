// Event listener for removing items from the cart
function Remove(key) {
    let itemToRemove = document.querySelector(`.cart .item[data-key="${key}"]`);
    itemToRemove.remove();
    // Recalculate total bill after removing an item
    updateTotalBill();
}

// Update total bill function
function updateTotalBill() {
    let totalBill = calculateTotalBill();
    document.getElementById('totalBill').textContent = totalBill.toFixed(2);
}

// Add event listener for adding items to the cart
let list = document.querySelectorAll('.list .item');
list.forEach(item => {
    item.addEventListener('click', function(event) {
        if (event.target.classList.contains('add')) {
            var itemNew = item.cloneNode(true);
            let checkIsset = false;

            let listCart = document.querySelectorAll('.cart .item');
            listCart.forEach(cart => {
                if (cart.getAttribute('data-key') == itemNew.getAttribute('data-key')) {
                    checkIsset = true;
                    cart.classList.add('danger');
                    setTimeout(function() {
                        cart.classList.remove('danger');
                    }, 1000)
                }
            })
            if (checkIsset == false) {
                document.querySelector('.listCart').appendChild(itemNew);
            }
            // Add event listener for removing items from the cart
            let removeButton = itemNew.querySelector('.remove');
            removeButton.addEventListener('click', function() {
                Remove(itemNew.getAttribute('data-key'));
            });
            // Recalculate total bill after adding an item
            updateTotalBill();
        }
    })
});

// Function to calculate total bill
function calculateTotalBill() {
    let total = 0;
    let items = document.querySelectorAll('.cart .item');
    items.forEach(item => {
        let price = parseFloat(item.querySelector('.price').textContent);
        let count = parseInt(item.querySelector('.count').value);
        total += price * count;
    });
    return total;
}

// Function to submit order and display sales invoice
function submitOrder() {
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let contact = document.getElementById('contact').value;
    let cash = parseFloat(document.getElementById('cash').value);

    let totalBill = calculateTotalBill();
    let change = cash - totalBill;

    // Display sales invoice
    let invoice = `Name: ${name}\nAddress: ${address}\nContact: ${contact}\nTotal Bill: Php${totalBill.toFixed(1)}\nCash: Php${cash.toFixed(2)}\nChange: Php${change.toFixed(2)}`;
    openPopup(invoice);
}

// Function to reset form
function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
    document.getElementById('contact').value = '';
    document.getElementById('cash').value = '';
}

// Function to open the popup and display the sales invoice
function openPopup(invoiceText) {
    document.getElementById('invoice').innerHTML = `<h3>Receipt</h3><pre>${invoiceText}</pre>`;
    document.getElementById('popup').style.display = 'block';
}

// Function to close the popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
