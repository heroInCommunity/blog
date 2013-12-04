$( document ).ready(function() {
	$('#search-word').selectize({
	    delimiter: ',',
	    persist: false,
	 	plugins: ['restore_on_backspace', 'remove_button'],
	    create: function(input) {
	        return {
	            value: input,
	            text: input
	        };
	    },
	     maxItems: 12
	});
	
	var centralBarWidth = $("#page_central_bar").outerWidth();
	var leftBarWidth = $("#page_left_bar").outerWidth();
	
	$('#clicker_full').click(function() {
		$(".selectize-input").fadeOut(500);
		$('#page_left_bar').animate(
			{
				width: "5%",
				opacity: .5
			},
			500,
			"linear"
		);
		$("#page_central_bar").animate(
			{
				width: "95%"
			},
			1000,
			"linear"
		);
		$(this).fadeOut(100);
		$('#clicker_less').fadeIn(100);
	});
	
	$('#clicker_less').click(function() {
		$(".selectize-input").fadeIn(1000);
		$('#page_left_bar').animate(
			{
				width: leftBarWidth + "px",
				opacity: 1
			},
			1000,
			"linear"
		);
		$("#page_central_bar").animate(
			{
				width: centralBarWidth + "px"
			},
			500,
			"linear"
		);
		
		$(this).fadeOut(100);
		$('#clicker_full').fadeIn(100);
	});
		
	var scrolled = 0;
	var scrollBarSize = $('#scrollable > div').height();
	$('#scrollable > div').css('top', '0px');
	
	$('#scrollable').bind('mousewheel', function(event) {		
		if (scrolled <= event.delegateTarget.offsetTop) {
			scrolled = event.delegateTarget.offsetTop;
		}
		else if (scrolled >= $('#scrollable > div').height() - event.delegateTarget.offsetTop) {
			if (event.originalEvent.deltaY > 0) {				
				scrolled = $('#scrollable > div').height();
				$('#progressbar').css('width', '100%');			
			}
			else {
				scrolled -= event.delegateTarget.offsetTop;	
				var percent = scrolled / scrollBarSize * 100;
				$('#progressbar').css('width', percent + '%');
			}
			
			event.preventDefault();
			return false;
		}
		
		var scrollMove = event.originalEvent.deltaY;
		scrolled += scrollMove;
		
		if (scrolled <= event.delegateTarget.offsetTop) {
			$('#scrollable > div').css('top', '0px');
		}
		else {
			$('#scrollable > div').css('top', parseInt($('#scrollable > div').css('top')) - scrollMove);	
		}
		
		var percent = scrolled / scrollBarSize * 100;
		$('#progressbar').css('width', percent + '%');
		
		event.preventDefault();
		return false;
	});
	
	var progressbarWidth = $('#progressbar_nav').width();
	
	$('#progressbar_nav').click(function(event) {
		console.log(event);
		
	});
	
});

