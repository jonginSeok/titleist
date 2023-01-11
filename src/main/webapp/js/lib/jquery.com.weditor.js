/*
 * Smart 웹에디터 관련 플러그인...
 */
(function($) {
	var oEditors = [];
	var oScript = '/air/wfw/js/smartEditor/HuskyEZCreator.js';
	var methods = {
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).weditor(options, before_func, after_func);	
		 * Desc : 화면에 Smart 웹에디터를 그린다. 
		 * Parameter : options (editor 옵션, 
		 * 						[toolbarOpt:툴바 사용 여부 (true:사용/ false:사용하지 않음), 
		 * 						입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음), 
		 * 						모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
		 * 						])		
		 * 			   before_func (로딩되기 전에 실행되는 함수)
		 * 			   after_func (로딩된 후에 실행되는 함수)
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		create : function(options, before_func, after_func) {
			var toolbarOpt = true;
			var resizerOpt = true;
			var modeOpt = true;
			var contentPath = '/air';
			if (!$.util.isNull(options) && !$.util.isNull(options.useToolbar)) {
				toolbarOpt = options.useToolbar;
			}
			if (!$.util.isNull(options) && !$.util.isNull(options.useResizer)) {
				resizerOpt = options.useResizer;
			}
			if (!$.util.isNull(options) && !$.util.isNull(options.useMode)) {
				modeOpt = options.useMode;
			}
			if (!$.util.isNull(options) && !$.util.isNull(options.path)) {
				contentPath = options.path;
			}
			// alert(toolbarOpt + " : " + resizerOpt + " : " + modeOpt);

			nhn.husky.EZCreator.createInIFrame({
				oAppRef : oEditors,
				elPlaceHolder : $(this).attr("id"),
				sSkinURI : contentPath + "/wfw/html/smartEditor/SmartEditor2Skin.html",
				htParams : {
					bUseToolbar : toolbarOpt, // 툴바 사용 여부 (true:사용/ false:사용하지 않음)
					bUseVerticalResizer : resizerOpt, // 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
					bUseModeChanger : modeOpt, // 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
					fOnBeforeUnload : before_func
				}, // boolean
				fOnAppLoad : after_func,
				fCreator : "createSEditor2"
			});
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).weditor('setDefaultFont', sDefaultFont, nFontSize);	
		 * Desc : 웹에디터의 기본적인 폰트를 지정한다. 
		 * Parameter : sDefaultFont (디폴트 폰트 종류)		
		 * 			   nFontSize (폰트 크기)
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		setDefaultFont : function(sDefaultFont, nFontSize) {
			oEditors.getById[$(this).attr("id")].setDefaultFont(sDefaultFont, nFontSize);
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).weditor('setContent', shtml);	
		 * Desc : 웹에디터의 본문 내용을 넣는 메소드
		 * Parameter : shtml (본문 내용)		
		 * 			   
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		setContent : function(shtml) {
			oEditors.getById[$(this).attr("id")].exec("PASTE_HTML", [ shtml ]);
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).weditor('getContent');	
		 * Desc : 웹에디터의 본문을 가져 오는 메소드
		 * Parameter : 
		 * 			   
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		getContent : function() {
			return oEditors.getById[$(this).attr("id")].getIR();
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).weditor('getContent2');	
		 * Desc : 웹에디터의 본문을 가져 오는 메소드
		 * Parameter : 
		 * 			   
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		getContent2 : function() {
			oEditors.getById[$(this).attr("id")].exec("UPDATE_CONTENTS_FIELD", []);

			return $(this).val();
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).weditor('submitContent', elClickedObj);	
		 * Desc : 본문 내용을 가지고 form sumbit을 한다. 
		 * Parameter : elClickedObj (클릭 Object)
		 * 			   
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		submitContent : function(elClickedObj) {
			// 에디터의 내용이 textarea에 적용됩니다.
			oEditors.getById[$(this).attr("id")].exec("UPDATE_CONTENTS_FIELD", []);

			try {
				// elClickedObj.form.submit();
			} catch (e) {
				alert('submit error : ' + e.message);
			}
		}
	};

	$.fn.weditor = function(method) {

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.create.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
	};

})(jQuery);
