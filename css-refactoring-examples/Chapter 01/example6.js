/**
 * Asserts getLineItemTotal works as expected.
 */
var testGetLineItemTotal = function () {
    var lineItem1 = {
        price: 50,
        quantity: 1
    };

    var lineItem2 = {
        price: 100,
        quantity: 2
    };

    var lineItemTotal = getLineItemTotal([lineItem1, lineItem2]);
    var expectedTotal = 250;

    if (lineItemTotal === expectedTotal) {
      successfulTestCount++;
    } else {
      unsuccessfulTestCount++;
      unsuccessfulTestSummaries.push(
          'testGetLineItemTotal: expected ' + expectedTotal + '; actual ' + 
          lineItemTotal
      );
    }
};

/**
 * Asserts getShippingTotal works as expected.
 */
var testGetShippingTotal = function () {
    var lineItem1 = {
        quantity: 1,
        shippingPrice: 10
    };

    var lineItem2 = {
        quantity: 2,
        shippingPrice: 20
    };

    var shippingTotal = getShippingTotal([lineItem1, lineItem2]);
    var expectedTotal = 250;

    if (shippingTotal === expectedTotal) {
      successfulTestCount++;
    } else {
      unsuccessfulTestCount++;
      unsuccessfulTestSummaries.push(
          'testGetShippingTotal: expected ' + expectedTotal + '; actual ' + 
          shippingTotal
      );
    }
};

/**
 * Ensures GetDiscountTotal works as expected when a valid discount code
 * is used.
 */
var testGetDiscountTotalWithValidDiscountCode = function () {
    var discountTotal = getDiscountTotal(100, '20PERCENT');
    var expectedTotal = 20;

    if (discountTotal === expectedTotal) {
      successfulTestCount++;
    } else {
      unsuccessfulTestCount++;
      unsuccessfulTestSummaries.push(
          'testGetDiscountTotalWithValidDiscountCode: expected ' + expectedTotal + 
          '; actual ' + discountTotal
      );
    }
};

/**
 * Ensures GetDiscountTotal works as expected when an invalid discount code
 * is used.
 */
var testGetDiscountTotalWithInvalidDiscountCode = function () {
    var discountTotal = get_discount_total(100, '90PERCENT');
    var expectedTotal = 0;

    if (discountTotal === expectedTotal) {
      successfulTestCount++;
    } else {
      unsuccessfulTestCount++;
      unsuccessfulTestSummaries.push(
          'testGetDiscountTotalWithInvalidDiscountCode: expected ' + expectedTotal + 
          '; actual ' + discountTotal
      );
    }
};

/**
 * Ensures GetTaxTotal works as expected when the customer lives in California.
 */
var testGetTaxTotalForCaliforniaResident = function () {
    var customer = {
      shiptoState: 'CA'
    };

    var taxTotal = getTaxTotal(100, customer);
    var expectedTotal = 8;

    if (taxTotal === expectedTotal) {
      successfulTestCount++;
    } else {
      unsuccessfulTestCount++;
      unsuccessfulTestSummaries.push(
          'testGetTaxTotalForCaliforniaResident: expected ' + expectedTotal + 
          '; actual ' + taxTotal
      );
    }
};

/**
 * Ensures GetTaxTotal works as expected when the customer doesn't live
 * in California.
 */
var testGetTaxTotalForNonCaliforniaResident = function () {
    var customer = {
        shiptoState: 'MA'
    };

    var taxTotal = getTaxTotal(100, customer);
    var expectedTotal = 0;

    if (taxTotal === expectedTotal) {
      successfulTestCount++;
    } else {
      unsuccessfulTestCount++;
      unsuccessfulTestSummaries.push(
          'testGetTaxTotalForNonCaliforniaResident: expected ' + expectedTotal + 
          '; actual ' + taxTotal
      );
    }
};
