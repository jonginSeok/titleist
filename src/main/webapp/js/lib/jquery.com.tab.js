/*
 * Tab 관련 플러그인...
 */
(function($) {
	var methods = {
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).tab('init', options);	
		 * Desc : tab의 초기 옵션을 정의한다.	
		 * Parameter : options (tab 관련 옵션)		
		 * 				
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		init : function(options) {
			return this.each(function() {
				var option = {};
				if (options) {
					option = options;
				}
				$(this).tabs(option);
			});
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).tab('setIndex', index);		
		 * Desc : tab 중에서 선택되어진 탭을 설정하는 함수
		 * Parameter : index (탭 인덱스)		
		 * 				
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		setIndex : function(index) {

			return this.each(function() {
				$(this).tabs('select', index);
			});

		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).tab('getIndex');	
		 * Desc : 선택된 탭 인덱스를 얻는 함수	
		 * Parameter : 
		 * 				
		 * Return : 선택된 탭 인덱스
		 * ----------------------------------------------------------------------------------*/
		getIndex : function() {
			var selectedIndex = $(this).tabs('option', 'selected');
			return selectedIndex;
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).tab('setEnable', index);	
		 * Desc : disabled 된 인덱스를 enabled 시킨다.
		 * Parameter : index (disabled 된 인덱스)
		 * 				
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		setEnable : function(index) {

			return this.each(function() {
				$(this).tabs('enable', index);
			});

		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).tab('setDisable', index);	
		 * Desc : 해당 인덱스를 disabled 시킨다.		
		 * Parameter : index (disabled 할 인덱스)		
		 * 				
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		setDisable : function(index) {

			return this.each(function() {
				$(this).tabs('disable', index);
			});

		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).tab('addNew', id,  title, index);		
		 * Desc : tab을 추가한다.		
		 * Parameter : id (추가할 탭 아이디)			
		 * 				title (추가할 탭 제목)	
		 * 				index (추가할 탭의 index, 이값이 없으면 제일 마지막에 추가됨)
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		addNew : function(id, title, index) {

			return this.each(function() {
				if (index) {
					$(this).tabs('add', '#' + id, title, index);
				} else {
					$(this).tabs('add', '#' + id, title); // add new tab at the end
				}
			});

		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).tab('remove', index);	
		 * Desc : 해당 인덱스 탭을 삭제한다.  	
		 * Parameter : index (삭제할 탭 index)		
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		remove : function(index) {

			return this.each(function() {
				$(this).tabs('remove', index);
			});

		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).tab('tabselect', func);	
		 * Desc : 탭이 선택되었을 경우 이벤트  	
		 * Parameter : func (탭이 선택되었을 때 실행하는 함수)		
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		tabselect : function(func) {

			return this.each(function() {
				$(this).bind("tabsselect", func);
			});

		}
	};

	$.fn.tab = function(method) {

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
	};

})(jQuery);
