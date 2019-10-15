var successfulTestCount = 0;
var unsuccessfulTestCount = 0;
var unsuccessfulTestSummaries = [];

/**
 * Asserts the calculations in `getOrdertotal()` are correct.
 */
var testGetOrderTotal = function () {

    // set up expectations

    var expectedTotal = 266;

    // set up test data

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

    // test the results against expectations

    if (total === expectedTotal) {
      successfulTestCount++;
    } else {
      unsuccessfulTestCount++;
      unsuccessfulTestSummaries.push(
          'testGetOrderTotal: expected ' + expectedTotal + '; actual ' + total
      );
    }
};

// run tests

testGetOrderTotal();
document.writeln(successfulTestCount + ' successful test(s)<br/>');
document.writeln(unsuccessfulTestCount + ' unsuccessful test(s)<br/>');

if (unsuccessfulTestCount) {
    document.writeln('<ul>');
    for(var i = 0; i < unsuccessfulTestSummaries.length; i++) {
        document.writeln('<li>' + unsuccessfulTestSummaries[i] + '</li>');
    }
    document.writeln('</ul>');
}
