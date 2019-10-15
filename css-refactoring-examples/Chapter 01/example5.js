/**
 * Calculates the total price of all line items ordered.
 *
 * @param {Array.<Object>} lineItems - a collection of products
 *   and quantities being purchased and the cost to ship one unit.
 *
 * @returns {number} The total price of all line items ordered.
 */
var getLineItemTotal = function (lineItems) {
    var lineItemTotal = 0;

    for (var i = 0; i < lineItems.length; i++) {
        var lineItem = lineItems[i];
        lineItemTotal += lineItem.price * lineItem.quantity;
    }

    return lineItemTotal;
};

/**
 * Calculates the total shipping cost of all line items ordered.
 *
 * @param {Array.<Object>} lineItems - a collection of products
 *   and quantities being purchased and the cost to ship one unit.
 *
 * @returns {number} The total price to ship of all line items ordered.
 */
var getShippingTotal = function (lineItems) {
    var shippingTotal = 0;

    for (var i = 0; i < lineItems.length; i++) {
        var lineItem = lineItems[i];
        shippingTotal += lineItem.shippingPrice * lineItem.quantity;
    }

    return shippingTotal;
};

/**
 * Calculates the total discount to be subtracted from an order total.
 *
 * @param {number} lineItemTotal - The total price of all line items ordered.
 *
 * @param {string} discountCode - An optional discount code that can trigger a
 *   discount to be deducted before shipping and tax are added.
 *
 * @returns {number} The total discount to be subtracted from an order total.
 */
var getDiscountTotal = function (lineItemTotal, discountCode) {
    var discountTotal = 0;

    if (discountCode === '20PERCENT') {
        discountTotal = lineItemTotal * 0.2;
    }

    return discountTotal;
};


/**
 * Calculates the total tax to apply to an order.
 *
 * @param {number} lineItemTotal - The total price of all line items ordered.
 *
 * @param {Object} customer - A collection of information about the person that
 *   placed an order.
 *
 * @returns {number} The total tax to be applied to an order.
 */
var getTaxTotal = function () {
    var taxTotal = 0;

    if (customer.shiptoState === 'CA') {
        taxTotal = lineItemTotal * 0.08;
    }

    return taxTotal;
};
