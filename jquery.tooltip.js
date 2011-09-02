/*!
 * jQuery Tooltip plugin
 *
 * Copyright (c) 2011 Stefan Benicke
 *
 * Dual licensed under the MIT and GPL licenses
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($) {
	var defaults = {
		offsetX: 10,
		offsetY: 10,
		delay: 250,
		fade: true,
		id: 'tooltip',
		speed: 'fast',
		format: function(text) {
			return text.replace(/(^\ -\ |\ -\ $)/g, '').replace(/(\ -\ )+/g, ' - ').replace(/\ -\ /g, '<br/>');
		}
	},
	$window = $(window),
	$document = $(document),
	window_width,
	window_height,
	scroll_top,
	scroll_left,
	getSize = function() {
		window_width = $window.width();
		window_height = $window.height();
	},
	getScroll = function() {
		scroll_top = $document.scrollTop();
		scroll_left = $document.scrollLeft();
	};
	
	getSize();
	getScroll();
	$window.resize(getSize).scroll(getScroll);
		
	$.fn.tooltip = function(options) {
		
		options = $.extend({}, defaults, options);
		
		var $tooltip = $('#' + options.id);
		
		if ( ! $tooltip.length) {
			$tooltip = $('<div id="' + options.id + '" style="display:none;pointer-events:none"/>').appendTo('body');
		}
		
		return this.each(function() {
			var me = $(this),
			title = options.format(me.attr('title')),
			top, left, timer,
			enter = function(event) {
				top = event.pageY + options.offsetY;
				left = event.pageX + options.offsetX;
				timer = setTimeout(show, options.delay);
			},
			show = function() {
				$tooltip.html(title);
				var width = $tooltip.outerWidth(),
					height = $tooltip.outerHeight();
				
				if (top + height > window_height + scroll_top) {
					top = top - height - 2 * options.offsetY;
				}
				if (left + width > window_width + scroll_left) {
					left = left - width - 2 * options.offsetX;
				}
				$tooltip.css({top: top, left: left});
				if (options.fade) $tooltip.stop(true,true).fadeIn(options.speed);
				else $tooltip.show();
			},
			leave = function() {
				clearTimeout(timer);
				if (options.fade) $tooltip.fadeOut(options.speed);
				else $tooltip.hide();
			};
				
			me.removeAttr('title').mouseenter(enter).mouseleave(leave);
		});
		
	};
	
})(jQuery);