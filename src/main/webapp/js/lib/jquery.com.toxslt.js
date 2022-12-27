(function($) {
	var methods = {
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).toxslt(xml, xsl, param, sucess_func);	
		 * Desc : xml와 xsl을 transform하는 함수		
		 * Parameter : xml (xml 주소)		
		 * 				xsl (xsl 주소)		
		 * 				param (파라미터 String)
		 * 				sucess_func (transform 한 후의 실행 메소드)	
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		init : function(xml, xsl, param, sucess_func) {
			try {
				var r = $.XSLTransform({
					xmlurl : xml,
					xslurl : xsl,
					params : param
				});

				var f = $(this).html(r);

				sucess_func();

			} catch (e) {
				alert('error : ' + e);
			}
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).toxslt('xmlstring', xmlstr, xslurl, param, sucess_func);	
		 * Desc : xml String과 xsl URL을 가지고 transform하는 함수
		 * 			한개의 xml을 가지고 여러 개의 xsl을 transform 할 수 있다. 		
		 * Parameter : xmlstr (xml String)		
		 * 				xslurl (xsl 주소)		
		 * 				param (파라미터 String)
		 * 				sucess_func (transform 한 후의 실행 메소드)	
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		xmlstring : function(xmlstr, xslurl, param, sucess_func) {
			try {
				var r = $.XSLTransform({
					xmlstring : xmlstr,
					xslurl : xslurl,
					params : param
				});

				var f = $(this).html(r);

				sucess_func();

			} catch (e) {
				alert('error : ' + e);
			}
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).toxslt('fromtext', xmlstr, xslstr, param, sucess_func);	
		 * Desc : xml text 과 xsl text 를  가지고 transform하는 함수
		 * Parameter : xmlstr (xml String)		
		 * 				xslstr (xsl String)		
		 * 				param (파라미터 String)
		 * 				sucess_func (transform 한 후의 실행 메소드)	
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		fromtext : function(xmlstr, xslstr, param, sucess_func) {
			try {
				var r = $.XSLTransform({
					xmlstring : xmlstr,
					xslstring : xslstr,
					params : param
				});

				var f = $(this).html(r);

				sucess_func();

			} catch (e) {
				alert('error : ' + e);
			}
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).toxslt('xslstring', xmlurl, xslstr, param, sucess_func);	
		 * Desc : xml URL 과 xsl String을 가지고 transform하는 함수
		 * Parameter : xmlurl (xml 주소)		
		 * 				xslstr (xsl String)		
		 * 				param (파라미터 String)
		 * 				sucess_func (transform 한 후의 실행 메소드)	
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		xslstring : function(xmlurl, xslstr, param, sucess_func) {
			try {
				var r = $.XSLTransform({
					xmlurl : xmlurl,
					xslstring : xslstr,
					params : param
				});

				var f = $(this).html(r);

				sucess_func();

			} catch (e) {
				alert('error : ' + e);
			}
		}

	};

	$.fn.toxslt = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method || $.util.isNull(methods[method])) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
	};

})(jQuery);
