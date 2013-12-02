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
	
	/*
	$('select.selectized,input.selectized').each(function() {
			var $container = $('<div>').addClass('value').html('Current Value: ');
			var $value = $('<span>').appendTo($container);
			var $input = $(this);
			var update = function(e) { $value.text(JSON.stringify($input.val())); }
		
			$(this).on('change', update);
			update();
		
			$container.insertAfter($input.next());
		});*/
	

});

