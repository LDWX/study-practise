var lineItem1 = {
  price: 50,
  quantity: 1,
  shippingPrice: 10
};

var lineItem2 = {
  price: 100,
  quantity: 2,
  shippingPrice: 20
};

var lineItems = [lineItem1, lineItem2];

var customer = {
  shiptoState: 'CA'
};

var discountCode = '20PERCENT';

var total = getOrderTotal(customer, lineItems, discountCode);

document.writeln('Total: $' + total);
