$( document ).ready(function() {
		
	//switch between full and less view modes on main page
	if($(window).width() < 767) $('#clicker_full').hide();
	var pageCentralBar = $('#page_central_bar');
	var centralBarWidth = pageCentralBar.outerWidth();
	var centralFromLeft = $('#page_central_bar').position().left;
	var centralFromRight = $('#page_central_bar').position().right;
	
	var isClicked = false;
	$('#show_articles').click(function() {
		if(isClicked) {
			return false;
		}
		isClicked = true;
		
		pageCentralBar.parents('.container').animate({'margin-left': $(document).width() * 0.9 + "px"}, 1000, function() {
			pageCentralBar.click(function() {
				pageCentralBar.parents('.container').animate({'margin-left': centralFromLeft + "px"}, 1000, function() {
					pageCentralBar.unbind('click');
					pageCentralBar.parents('.container').css('margin-left', "auto");
				});
			});
			isClicked = false;
		});
	});
	
	$('#show_comments').click(function() {
		if(isClicked) {
			return false;
		}
		isClicked = true;
		
		pageCentralBar.parents('.container').animate({'margin-right': $(document).width() * 0.9 + "px"}, 1000, function() {
			pageCentralBar.click(function() {
				pageCentralBar.parents('.container').animate({'margin-right': centralFromRight + "px"}, 1000, function() {
					pageCentralBar.unbind('click');
					pageCentralBar.parents('.container').css('margin-right', "auto");
				});
			});
			isClicked = false;
		});
	});
	
	//toogle sidebar
	$('button.btn[data-toggle="offcanvas"]').click(function() {
		if($('#page_left_bar').is(':visible')) $('#page_left_bar').hide();
		else $('#page_left_bar').show();
	});

	//progress bar functionality on main page
	$('#scrollable').progressbar($('#progressbar'), $('#progressbar_nav'));
	
});

