$(document).ready(function() {
	$("a[rel=photos_group]").fancybox({
		'titlePosition'	: 'inside',
		'overlayColor'		: '#000',
		'overlayOpacity'		: 0.80,
		'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
			return '<span id="caption">' + (title.length ? title : '') + '</span>';
		}
	});
});