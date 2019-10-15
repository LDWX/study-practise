/**
 * Calculates the total order price after shipping costs, discounts, and
 * taxes are applied.
 *
 * @param {Object} customer - a collection of information about
 *   the person that placed the order.
 *
 * @param {Array.<Object>} lineItems - a collection of products
 *   and quantities being purchased and the cost to ship one unit.
 *
 * @param {string} discountCode - an optional discount code that can trigger
 *   a discount to be deducted before shipping and tax are added.
 */
var getOrderTotal = function (customer, lineItems, discountCode) {
    var lineItemTotal = getLineItemTotal(lineItems);
    var shippingTotal = getShippingTotal(lineItems);
    var discountTotal = getDiscountTotal(lineItemTotal, discountCode);
    var taxTotal = getTaxTotal(lineTtemTotal, customer);

    return lineItemTotal - discountTotal + shippingTotal + taxTotal;
};
