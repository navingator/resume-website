
// Materialize jQuery
(function($) {
	$(document).ready(function(){
		$('.dropdown-button').dropdown({
			constrainWidth: false,
			hover: true,
			belowOrigin: true,
			alignment: 'right'
		});

		$('.button-collapse').sideNav();

		const toc = $('.table-of-contents');
		toc.pushpin({ top: toc.offset().top });
		$('.scrollspy').scrollSpy();

		$('.resume-item > .card').click(toggleActiveCard);
	});

	function toggleActiveCard() {
		const card = $(this);
		const content = card.find('.resume-main-content');
		const prevCss = content.attr('style'); // cache style attribute to set later
		const heights = []; // array that contains initial and final heights 

		// cache initial card height for setting later
		heights[0] = card.height();

		// Get the new card height
		card.css({ height: 'auto' });
		if (card.hasClass('active')) {
			content.css({ display: 'none' });
		} else {
			content.css({ display: 'block' });
		}
		heights[1] = card.height(); // get calculated card height

		// Reset css
		if (prevCss) { content.css(prevCss); }
			else { content.removeAttr('style'); }
		card.css({ height: heights[0] }); // set the card height - required for animations
		this.offsetHeight; // HACK: trigger html reflow
		card.css({ height: heights[1] }); // set the new card height

		// set timeouts
		let timeout = 250; // must match CSS Timeout
		if (card.hasClass('active')) {
			timeout = 0;
		}
		
		setTimeout(function() {
			card.toggleClass('active');
		}, timeout);
	}
})(jQuery);