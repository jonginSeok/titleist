/*
 * File 관련 플러그인...
 */
(function($) {
	var methods = {
		/*----------------------------------------------------------------------------------* 
		 * Function : $(selector).file('search', after_func); 
		 * Desc : 파일 첨부 버튼 클릭 후 처리해야 되는 메소드가 있으면 실행시키는 함수 
		 *        브라우저 별로 처리되는 이벤트가 틀려서 구분하여 실행시킨다. 
		 * Parameter : after_func (파일 선택 후의 실행되는 메소드 이름)
		 * 				
		 * Return : after_func 실행 결과.
		 * ----------------------------------------------------------------------------------*/
		search : function(after_func) {
			if ($.browser.msie) {
				after_func($(this));
			} else {
				$(this).one('change', function() {
					after_func($(this));
				});
			}

		},
		/*----------------------------------------------------------------------------------* 
		 * Function : $(selector).file('reset', after_func); 
		 * Desc : input file 객체를 초기화 시키는 메소드 
		 *        브라우저 별로 초기화 시키는 방법이 틀린다. 
		 * Parameter : after_func (초기화 된 후 실행되는 메소드 이름)
		 * 				
		 * Return : input file 객체 초기화
		 * ----------------------------------------------------------------------------------*/
		reset : function(after_func) {
			if ($.browser.msie) {
				$(this).replaceWith($k1(this).clone(true));
			} else {
				$(this).val("");
			}

			after_func();
		}

	};

	$.fn.file = function(method) {

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
	};

	$.file = {
		/*----------------------------------------------------------------------------------* 
		 * Function : $.file.getName(file); 
		 * Desc : 전체 파일 경로에서 파일이름과 확장자 만을 추출하는 메소드.
		 *        
		 * Parameter : file (파일 전체 경로)
		 * 				
		 * Return : 파일이름.확장자
		 * ----------------------------------------------------------------------------------*/
		getName : function(file) {
			if (file === undefined) {
				return;
			}
			var filepath = file.split("\\");
			var file_name = filepath[filepath.length - 1]; // 마지막 화일명
			var real_name = file_name.substring(file_name.length - 4, file_name.length);// 확장자빼오기

			return file_name;
		}
	};
})(jQuery);
