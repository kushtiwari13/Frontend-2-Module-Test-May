
    // Function to fetch the menu from JSON
    function getMenu() {
      fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
        .then(response => response.json())
        .then(data => {
          const menuDiv = document.getElementById('menu');
          data.forEach(item => {
            const menuItemDiv = document.createElement('div');
            menuItemDiv.classList.add('menuItem');
            menuItemDiv.textContent = item.name + ' - $' + item.price;
            menuItemDiv.addEventListener('click', () => {
              menuItemDiv.classList.toggle('selected');
            });
            menuDiv.appendChild(menuItemDiv);
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    // Function to take the order
    function takeOrder() {
      return new Promise(resolve => {
        setTimeout(() => {
          const selectedItems = Array.from(document.getElementsByClassName('selected'));
          const selectedOrder = selectedItems.map(item => {
            const [name, price] = item.textContent.split(' - $');
            return { name: name.trim(), price: parseFloat(price) };
          });
          const order = { burgers: selectedOrder };
          resolve(order);
        }, 2500);
      });
    }

    // Function for order preparation
    function orderPrep() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ order_status: true, paid: false });
        }, 1500);
      });
    }

    // Function to pay the order
    function payOrder() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ order_status: true, paid: true });
        }, 1000);
      });
    }

    // Function to display thank you message
    function thankyouFnc() {
      const thankYouDiv = document.getElementById('thankYou');
      thankYouDiv.textContent = 'Thank you for eating with us today!';
    }

    // Function to handle the promises
function handlePromises() {
  const orderStatusDiv = document.getElementById('orderStatus');
  const orderButton = document.getElementById('orderButton');
  orderStatusDiv.textContent = 'Order Status: Taking Order...';

  // Disable the order button to prevent multiple orders
  orderButton.disabled = true;

  takeOrder()
    .then(order => {
      orderStatusDiv.textContent = 'Order Status: Order Received';

      // Extract the ordered items and calculate the total amount
      const orderedItems = order.burgers;
      const totalAmount = orderedItems.reduce((total, item) => total + item.price, 0);

      // Display the ordered items and total amount
      const orderedItemsDiv = document.createElement('div');
      orderedItemsDiv.textContent = 'Ordered Items:';
      orderedItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - $${item.price}`;
        orderedItemsDiv.appendChild(itemDiv);
      });
      const totalAmountDiv = document.createElement('div');
      totalAmountDiv.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;
      orderStatusDiv.appendChild(orderedItemsDiv);
      orderStatusDiv.appendChild(totalAmountDiv);

      return orderPrep();
    })
    .then(orderStatus => {
      orderStatusDiv.textContent = 'Order Status: Preparing';
      console.log('Order Status:', orderStatus);
      return payOrder();
    })
    .then(paidStatus => {
      orderStatusDiv.textContent = 'Order Status: Payment Received';
      console.log('Paid Status:', paidStatus);
      thankyouFnc();

      // Enable the order button for future orders
      orderButton.disabled = false;
    })
    .catch(error => {
      console.error('Error:', error);

      // Enable the order button if there was an error
      orderButton.disabled = false;
    });
}


    // Load the menu on page load
    window.onload = getMenu;
