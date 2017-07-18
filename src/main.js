import './css/styles.css';
import './favicon.ico';

(function() {
	$(document).ready(function(){
		$('.dropdown-button').dropdown({
			constrainWidth: false,
			hover: false,
			belowOrigin: true,
			alignment: 'right'
		});
		$('.button-collapse').sideNav();

		const toc = $('.table-of-contents');
		toc.pushpin({ top: toc.offset().top });
		$('.scrollspy').scrollSpy();
	});
})();