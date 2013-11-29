$( document ).ready(function() {
	$('#search-word').selectize({
	    delimiter: ',',
	    persist: false,
	 	plugins: ['restore_on_backspace', 'remove_button'],
	    create: function(input) {
	        return {
	            value: input,
	            text: input
	        }
	    },
	     maxItems: 12
	});
	
	$('select.selectized,input.selectized').each(function() {
		var $container = $('<div>').addClass('value').html('Current Value: ');
		var $value = $('<span>').appendTo($container);
		var $input = $(this);
		var update = function(e) { $value.text(JSON.stringify($input.val())); }
	
		$(this).on('change', update);
		update();
	
		$container.insertAfter($input.next());
	});

});

