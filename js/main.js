var selectedSeats = [];
var seatPrice = 550;
// Function to handle seat click
function seatClickHandler(event) {
    var seat = event.target;
    var seatNumber = seat.textContent;
    var bookList = document.getElementById('selected-seats');
    var totalPriceElement = document.getElementById('total-price');
    var seatPrice = 550; // Assuming each seat has a price of 550

    if (!seat.classList.contains('booked')) {
        if(seat.classList.contains('active')){
            seat.classList.remove('active');
            // Remove seat number from selectedSeats array
            var index = selectedSeats.indexOf(seatNumber);
            if (index > -1) {
                selectedSeats.splice(index, 1);
                // Remove the corresponding seat info div
                var seatInfo = document.getElementById('seat-info-' + seatNumber);
                if (seatInfo) {
                    bookList.removeChild(seatInfo);
                }
                // Update the total price
                updateTotalPrice(-seatPrice);
            }
        } else {
            seat.classList.add('active');
            // Add seat number to selectedSeats array
            selectedSeats.push(seatNumber);
            // Append the seat info div
            var seatInfoDiv = document.createElement('div');
            seatInfoDiv.className = 'flex justify-between';
            seatInfoDiv.id = 'seat-info-' + seatNumber;
            seatInfoDiv.innerHTML = `
                <div class="text-lg font-normal">${seatNumber}</div>
                <div class="text-lg font-normal">Economic</div>
                <div class="text-lg font-normal seat-price">${seatPrice}</div>
            `;
            bookList.appendChild(seatInfoDiv);
            // Update the total price
            updateTotalPrice(seatPrice);
        }
        console.log('Selected seats:', selectedSeats);
    } else {
        alert('Seat ' + seatNumber + ' is already booked.');
    }
}

// Function to update the total price
function updateTotalPrice(priceChange) {
    var totalPriceElement = document.getElementById('total-price');
    var grandTotal = document.getElementById('grand-total');
    var currentTotal = parseInt(totalPriceElement.textContent);
    var newTotal = currentTotal + priceChange;
    totalPriceElement.textContent = newTotal;
    grandTotal.textContent = newTotal;
}
// Function to apply coupon and update the grand total
function applyCoupon() {
    var couponCode = document.getElementById('coupon-code').value.trim();
    var totalPriceElement = document.getElementById('total-price');
    var totalPrice = parseInt(totalPriceElement.textContent);
    var discount = 0;

    if (couponCode === "NEW15") {
        discount = totalPrice * 0.15;
        console.log('new15', discount);
    } else if (couponCode === "Couple 20") {
        discount = totalPrice * 0.20;
    }

    var grandTotal = totalPrice - discount;
    console.log(discount, grandTotal);
    document.getElementById('grand-total').textContent = grandTotal.toFixed(2);
}

// Function to update the grand total without applying the coupon
function updateGrandTotal() {
    var totalPriceElement = document.getElementById('total-price');
    var grandTotalElement = document.getElementById('grand-total');
    var totalPrice = parseInt(totalPriceElement.textContent);

    grandTotalElement.textContent = totalPrice.toFixed(2);
}
// Attach event listener to all elements with the class 'seat'
document.querySelectorAll('.seat').forEach(function(seat) {
    seat.addEventListener('click', seatClickHandler);
});
document.getElementById('coupon-submit-button').addEventListener('click', applyCoupon);

document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var name = document.getElementById('passenger-name').value.trim();
    var phone = document.getElementById('passenger-phone').value.trim();
    var email = document.getElementById('passenger-email').value.trim();
    
    if (name === '' || phone === '') {
      alert('Please fill in all required fields.');
    } else {
      openModal();
    }
});
function openModal() {
    document.getElementById('successModal').classList.remove('hidden');
}

function closeModal() {
    // Remove input values
    var inputFields = document.querySelectorAll('input');
    inputFields.forEach(function(field) {
        field.value = ''; // Set input value to empty string
    });
    var bookList = document.getElementById('selected-seats');
    bookList.innerHTML = '';
    var totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = '0';
    var grandTotal = document.getElementById('grand-total');
    grandTotal.textContent = '0';
    // Replace 'active' class with 'booked' class
    var activeElements = document.querySelectorAll('.active');
    activeElements.forEach(function(element) {
        element.classList.remove('active');
        element.classList.add('booked');
    });
    // Hide the modal
    document.getElementById('successModal').classList.add('hidden');
}
