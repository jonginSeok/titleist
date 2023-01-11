/*
 * ID: jquery.tooltip.js
 * Version: 0.1
 * Date: 2009-09-04
 * Group: © 2008 nova studio.
 * Developer: maninblu
 */
/*
 * Description
 * 팝업으로 보여직 레이어 안에 내용이 들어갈 영역에는 반드시 
 * "tooltipText"라는 클래스가 있어야 함.
 * 
 * Depends: 
 */
(function($) {
	$.fn.tooltip = function($targetLayer, options) {
		var opts = $.extend({}, $.fn.tooltip.defaults, options);
		return this.each(function() {
			var $self = $(this);
			$self.hover(function(e) {
				var str = 'abcd';// $self.attr('tooltip');
				// $targetLayer.find(options.tooltipcss).text(str);
				// console.log($self.offset().left + ":" + $self.offset().top + " - " + $targetLayer.outerHeight());
				var offset = $self.offset();
				var x = e.pageX - ($targetLayer.outerHeight() / 2);
				var y = e.pageY - ($targetLayer.outerHeight() + 5);
				console.log(e.pageX + " = " + e.pageX);
				$targetLayer.show().css({
					left : x, // $self.offset().left + 'px',
					top : y, // $self.offset().top - $targetLayer.outerHeight() + 'px',
					position : 'absolute'
				});
			}, function() {
				$targetLayer.hide();
			})
		});// end of return
	};
	// (public)---------------------------------------------------------------------------
	// plugin defaults
	$.fn.tooltip.defaults = {
		metadata : {}
	};
})(jQuery);