$( document ).ready(function() {
	
	//search words on main page
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
	
	//switch between full and less view modes on main page
	var centralBarWidth = $("#page_central_bar").outerWidth();
	var leftBarWidth = $("#page_left_bar").outerWidth();
	
	var isClicked = false;
	$('#clicker_full').click(function() {
		if(isClicked) {
			return false;
		}
		isClicked = true;
		
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
			"linear",
			function() {
				isClicked = false;
			}
		);
		$(this).fadeOut(100);
		$('#clicker_less').fadeIn(100);
	});
	
	$('#clicker_less').click(function() {
		if(isClicked) {
			return false;
		}
		isClicked = true;
		
		$(".selectize-input").fadeIn(1000);
		$('#page_left_bar').animate(
			{
				width: leftBarWidth + "px",
				opacity: 1
			},
			1000,
			"linear",
			function() {
				isClicked = false;
			}
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

	//progress bar functionality on main page
	var scrolled = 0;
	var scrollBarSize = $('#scrollable > div').height();
	$('#scrollable > div').css('top', '0px');
	
	$('#scrollable').bind('mousewheel', 'touchend', function(event) {
			
		if (scrolled <= event.delegateTarget.offsetTop) {
			scrolled = event.delegateTarget.offsetTop;
		}
		else if (scrolled >= $('#scrollable > div').height() - event.delegateTarget.offsetTop) {
			if (typeof event.originalEvent.deltaY != 'undefined' && event.originalEvent.deltaY > 0 || event.originalEvent.wheelDeltaY < 0) {				
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
		
		var scrollMove = (typeof event.originalEvent.deltaY != 'undefined') ? event.originalEvent.deltaY : -event.originalEvent.wheelDeltaY;
		scrolled += scrollMove;
		
		if (scrolled <= event.delegateTarget.offsetTop) {
			$('#scrollable > div').css('top', '0px');
			$('#progressbar').css('width', '0%');
		}
		else {
			$('#scrollable > div').css('top', parseInt($('#scrollable > div').css('top')) - scrollMove);
			$('#progressbar').css('width', (scrolled / scrollBarSize * 100) + '%');	
		}
		
		event.preventDefault();
		return false;
	});
	
	var progressbarWidth = $('#progressbar_nav').width();
	
	$('#progressbar_nav').click(function(event) {
		var percent = event.offsetX / progressbarWidth * 100;
		$('#progressbar').css('width', percent + '%');
		
		scrolled = percent * scrollBarSize / 100;
		if (scrolled <= $('#scrollable').height()) {
			$('#scrollable > div').css('top', '0px');
		}
		else if (scrolled >= scrollBarSize - $('#scrollable').height()) {
			$('#scrollable > div').css('top', (-scrollBarSize + $('#scrollable').height()) + 'px');
		}
		else {
			$('#scrollable > div').css('top', -scrolled + 'px');	
		}
	});
	
});

