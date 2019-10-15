/**
 * Calculates the total order price after shipping costs, discounts, and
 * taxes are applied.
 *
 * @param {Object} customer - a collection of information about
 *   the person that placed the order.
 *
 * @param {Array.<Object>} lineItems - a collection of products
 *   and quantities being purchased as well as the cost to ship one unit.
 *
 * @param {string} discountCode - an optional discount code that can trigger
 *   a discount to be deducted before shipping and tax are added.
 */
var getOrderTotal = function (customer, lineItems, discountCode) {
  var discountTotal = 0;
  var lineItemTotal = 0;
  var shippingTotal = 0;
  var taxTotal = 0;

  for (var i = 0; i < lineItems.length; i++) {
      var lineItem = lineItems[i];
      lineItemTotal += lineItem.price * lineItem.quantity;
      shippingTotal += lineItem.shippingPrice * lineItem.quantity;
  }

  if (discountCode === '20PERCENT') {
      discountTotal = lineItemTotal * 0.2;
  }

  if (customer.shiptoState === 'CA') {
      taxTotal = (lineItemTotal - discountTotal) * 0.08;
  }

  var total = (
      lineItemTotal -
      discountTotal +
      shippingTotal +
      taxTotal
  );

  return total;
};
