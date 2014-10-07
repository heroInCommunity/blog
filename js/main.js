$( document ).ready(function() {
		
	//switch between full and less view modes on main page
	if($(window).width() < 767) $('#clicker_full').hide();
	var pageCentralBar = $('#page_central_bar');
	var centralBarOffset = pageCentralBar.offset();
	
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
		
		var adder = -pageLeftBar.width() + centralBarOffset.left;
		adder = adder < 0 ? -adder + 20 + (pageCentralBar.parents('.container').width() - pageCentralBar.width()) / 2 : 0;
		
		pageCentralBar.animate({'margin-left': (adder > 0 ? (adder) + "px" : "auto")}, 500, function() {
			pageCentralBar.click(function() {
			    pageLeftBar.css({'left': leftBarOffset.left + 'px'});
				pageCentralBar.css({'margin': "0 auto 0 auto"});
				pageCentralBar.unbind('click');
                isClicked = false;
			});
		});
        
        pageLeftBar.animate({'left': '0px'}, 500);
	});
	
	$('#show_comments').click(function() {
		if(isClicked) {
			return false;
		}
		isClicked = true;
		scrollable.data('progressbar').setPercent((comments.offset().top - articleContent.offset().top) / scrollable.find('div:eq(0)').height() * 100);
		isClicked = false;
	});
	
	//toogle sidebar
	$('button.btn[data-toggle="offcanvas"]').click(function() {
		if($('#page_left_bar').is(':visible')) $('#page_left_bar').hide();
		else $('#page_left_bar').show();
	});

	//progress bar functionality on main page
	scrollable.progressbar({
	    progressBar: $('#progressbar'), 
	    progressbarNav: $('#progressbar_nav')
    });
	
});

