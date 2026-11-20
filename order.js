const ORDER_EMAIL = "hello@examplewebsite142.com";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".product-options");
  const orderBtn = document.getElementById("orderBtn");
  const qtyInput = document.getElementById("quantity");
  const minusBtn = document.getElementById("minus");
  const plusBtn = document.getElementById("plus");

  if (!form || !orderBtn || !qtyInput) return;

  // quantity buttons ---
  function getQty() {
    const n = parseInt(qtyInput.value, 10);
    return isNaN(n) || n < 1 ? 1 : n;
  }

  if (minusBtn) {
    minusBtn.addEventListener("click", function () {
      qtyInput.value = Math.max(1, getQty() - 1);
    });
  }
  if (plusBtn) {
    plusBtn.addEventListener("click", function () {
      qtyInput.value = getQty() + 1;
    });
  }

  // --- ORDER NOW ---
  orderBtn.addEventListener("click", function (event) {
    event.preventDefault(); // stop the form from reloading the page

    const checkedSize = form.querySelector('input[name="size"]:checked');
    const quantity = parseInt(qtyInput.value, 10);

    if (!checkedSize) {
      alert("Please select a size.");
      const firstSize = form.querySelector('input[name="size"]');
      if (firstSize) firstSize.focus();
      return;
    }
    if (!quantity || quantity < 1) {
      alert("Please enter a valid quantity.");
      qtyInput.focus();
      return;
    }

    // Product name comes from the page's main heading
    const heading = document.querySelector(".product-details h1");
    const productName = (heading ? heading.textContent : document.title).trim();

    const subject = "Order: " + productName;
    const body =
      "Hello Daily Standard,\r\n\r\n" +
      "I would like to order the following:\r\n\r\n\r\n" +
      "--------------------------------\r\n" +
      "ORDER DETAILS\r\n" +
      "--------------------------------\r\n" +  
      "Product: " + productName + "\r\n" +
      "Size: " + checkedSize.value + "\r\n" +
      "Quantity: " + quantity + "\r\n\r\n" +
      "Page: " + window.location.href + "\r\n\r\n" +
      "--------------------------------\r\n" +
      "CUSTOMER DETAILS\r\n" +
      "--------------------------------\r\n" +
      "Name:\r\n" +
      "Delivery address:\r\n" +
      "Contact number:\r\n\r\n" +
      "Thank you!";

    window.location.href =
      "mailto:" + ORDER_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });
});


//For the slider navigation
const slider = document.querySelector(".slider");
const indicators = document.querySelectorAll(".slider-indicators a");

function updateIndicators() {
    const currentSlide = Math.round(
        slider.scrollLeft / slider.clientWidth
    );

    indicators.forEach(function(indicator, index) {
        indicator.classList.remove("active");

        if (index === currentSlide) {
            indicator.classList.add("active");
        }
    });
}

slider.addEventListener("scroll", updateIndicators);
