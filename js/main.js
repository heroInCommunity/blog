$( document ).ready(function() {
		
	//switch between full and less view modes on main page
	if($(window).width() < 767) $('#clicker_full').hide();
	var pageCentralBar = $('#page_central_bar');
	
	var pageLeftBar = $('#page_left_bar');
	var leftBarOffset = pageLeftBar.offset();
	
	var comments = pageCentralBar.find('.comments');
	var articleContent = pageCentralBar.find('.article-content');
	
	var scrollable = $('#scrollable');
	
	var isClicked = false;
	$('#show_articles').click(function() {
		if(isClicked) {
			return false;
		}
		isClicked = true;
		
		pageCentralBar.animate({'margin-left': (-leftBarOffset.left + 20) + "px"}, 500, function() {
		    pageLeftBar.animate({'left': '0px'}, 500);
		    
			pageCentralBar.click(function() {
			    pageLeftBar.animate({'left': leftBarOffset.left + 'px'}, 500);
				pageCentralBar.animate({'margin-left': "0px"}, 500, function() {
					pageCentralBar.unbind('click');
					isClicked = false;
				});
			});
		});
	});
	
	$('#show_comments').click(function() {
		if(isClicked) {
			return false;
		}
		isClicked = true;
		
		articleContent.animate({
		    scrollTop: comments.offset().top - articleContent.offset().top, 
		    duration: 1000, 
		    complete: function() {
    			scrollable.progressbar().setPercent((comments.offset().top - articleContent.offset().top) / scrollable.find('div:eq(0)').height() * 100);
			    isClicked = false;
		      }
		});
	});
	
	//toogle sidebar
	$('button.btn[data-toggle="offcanvas"]').click(function() {
		if($('#page_left_bar').is(':visible')) $('#page_left_bar').hide();
		else $('#page_left_bar').show();
	});

	//progress bar functionality on main page
	scrollable.progressbar($('#progressbar'), $('#progressbar_nav'));
	
});

