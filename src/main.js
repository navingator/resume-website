import './css/styles.css';

(function() {
	$(document).ready(function(){
		$(".dropdown-button").dropdown();
		$(".button-collapse").sideNav();

		const toc = $('.table-of-contents');
		toc.pushpin({ top: toc.offset().top });
		$('.scrollspy').scrollSpy();
	});
})();