(function ($) {
	'use strict';

	$(document).ready(function () {
		// policy tab actions
		var $policyTabGroup = $('#js-policy-tab-group');

		$policyTabGroup.on('click', 'a', function (e) {
			e.preventDefault();			
			var $link = $(this);

			// make the right tab appear active
			$policyTabGroup.find('.tab-active').removeClass('tab-active').addClass('tab');
			$link.parent().removeClass('tab').addClass('tab-active');

			// make the right content visible
			$('#js-policy-1, #js-policy-2, #js-policy-3').addClass('hidden');
			$($link.data('for')).removeClass('hidden');
		});

		// fee tab actions
		var $feeTabGroup = $('#js-fee-tab-group');

		$feeTabGroup.on('click', 'a', function (e) {
			e.preventDefault();
			var $link = $(this);

			// make the right tab appear active
			$feeTabGroup.find('.tab-active').removeClass('tab-active').addClass('tab');
			$link.parent().removeClass('tab').addClass('tab-active');

			// make the right content visible
			$('#js-fee-1, #js-fee-2, #js-fee3').addClass('hidden');
			$($link.data('for')).removeClass('hidden');
		});
	});
}(jQuery));