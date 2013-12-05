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
		var scrollBarSize = scrollableDiv.height();
		
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
				scrollableDiv.css('top', (parseInt(scrollableDiv.css('top')) * scrollableDiv.height() / scrollBarSize) + 'px');
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
		var scrollBarSize = scrollableDiv.height();
		
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
				scrollableDiv.css('top', (parseInt(scrollableDiv.css('top')) * scrollableDiv.height() / scrollBarSize) + 'px');
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
	var scrollableDiv = $('#scrollable > div');	
	var progressBar = $('#progressbar');
	var scrolled = 0;
	scrollableDiv.css('top', '0px');
	
	$('#scrollable').bind('mousewheel touchend DOMMouseScroll', function(event) {
		var scrollBarSize = scrollableDiv.height();
		
		if (scrolled <= event.delegateTarget.offsetTop) {
			scrolled = event.delegateTarget.offsetTop;
		}
		
		if (scrolled >= scrollBarSize - event.delegateTarget.offsetTop) {
			if (getDeltaY(event) > 0) {				
				scrolled = scrollBarSize;
				progressBar.css('width', '100%');			
			}
			else {
				scrolled -= event.delegateTarget.offsetTop;
				progressBar.css('width', (scrolled / scrollBarSize * 100) + '%');
			}
		}
		else {
			var scrollMove = getDeltaY(event);
			scrolled += scrollMove;
			
			if (scrolled <= event.delegateTarget.offsetTop) {
				scrollableDiv.css('top', '0px');
				progressBar.css('width', '0%');
			}
			else {
				scrollableDiv.css('top', parseInt(scrollableDiv.css('top')) - scrollMove);
				progressBar.css('width', (scrolled / scrollBarSize * 100) + '%');	
			}
		}			
		
		event.preventDefault();
		return false;
	});
	
	function getDeltaY(scrollEvent) {
		if(typeof scrollEvent.originalEvent.deltaY != 'undefined') {
			return scrollEvent.originalEvent.deltaY;
		}
		if(typeof scrollEvent.originalEvent.wheelDeltaY != 'undefined') {
			return -scrollEvent.originalEvent.wheelDeltaY;
		}
		else if(typeof scrollEvent.originalEvent.detail != 'undefined') {
			return scrollEvent.originalEvent.detail * 30;
		}
		return undefined;
	}	
	
	$('#progressbar_nav').click(function(event) {
		var scrollBarSize = scrollableDiv.height();
		var progressbarWidth = $('#progressbar_nav').width();
		var scrollableHeight = $('#scrollable').height();
		
		var percent = getX(event) / progressbarWidth * 100;
		progressBar.css('width', percent + '%');
		
		scrolled = percent * scrollBarSize / 100;
		if (scrolled <= scrollableHeight) {
			scrollableDiv.css('top', '0px');
		}
		else if (scrolled >= scrollBarSize - scrollableHeight) {
			scrollableDiv.css('top', (-scrollBarSize + scrollableHeight) + 'px');
		}
		else {
			scrollableDiv.css('top', -scrolled + 'px');	
		}
	});
	
	function getX(clickEvent) {
		if(typeof clickEvent.offsetX != 'undefined') {
			return clickEvent.offsetX;
		}
		else if(typeof clickEvent.originalEvent.layerX != 'undefined') {
			return clickEvent.originalEvent.layerX;
		}
		
		return undefined;
	}
	
});

