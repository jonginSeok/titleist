/*
 * Form Object 관련 플러그인...
 */
(function($) {
	var methods = {
		init : function() {
			return this.each(function() {

			});
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).object('loaddata'url, params, dataOpt);
		 * Desc : 코드성 정보들을 불러 오는 함수.	
		 * 			코드성 정보를 가져와서 보여 주는 주체가 		
		 * 			select, radio, checkbox 인 것에 따라서 태그를 만들어 준다.
		 * Parameter : url (데이타를 조회하는 url)
		 * 				params (데이타 조회시 필요한 Parameter ex.param1=value1&param2=value2 )
		 * 				dataOpt (listNode, code, name의 필드 값[, 초기세팅값] )
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		loaddata : function(url, params, dataOpt, func) {
			var listNode = 'data > listCd111C5mTb';
			if (typeof dataOpt.listNode == 'string') {
				listNode = dataOpt.listNode;
			}
			if ($(this).tagName() == 'select') { // object = select
				var target = $(this);
				// target.object('ajaxsubmit', '../jsp/form_submit.jsp', "POST", select, "xml", "mode=select");
				target.object('ajaxsubmit', url, "GET", select, "xml", params);

				function select(xml) {
					$(xml).find(listNode).each(function() {
						var code = $(this).find(dataOpt.code).text();
						var name = $(this).find(dataOpt.name).text();

						if (!$.util.isNull(dataOpt.initVal)) {
							if (code == dataOpt.initVal[0]) {
								target.append("<option value='" + code + "' selected>" + name + "</option>");
							} else {
								target.append("<option value='" + code + "'>" + name + "</option>");
							}
						} else {
							target.append("<option value='" + code + "'>" + name + "</option>");
						}
					});

					// target.change(function() {
					// alert(target.val() + " : " + target.children("option:selected").text());
					// });
					if (typeof func == 'function') {
						func();
					}

				}
				;

			} else if ($(this).tagName() == 'input') {
				if ($(this).attr('type') == 'radio') { // object = radio
					var target = $(this);
					// target.object('ajaxsubmit', '../jsp/form_submit.jsp', "POST", radio, "xml", "mode=select");
					target.object('ajaxsubmit', url, "POST", radio, "xml", params);

					function radio(xml) {
						var targetName = target.attr('name');
						// target.parent().empty();
						$(xml).find(listNode).each(function(idx) {// listCd111C5mTb
							var code = $(this).find(dataOpt.code).text();
							var name = $(this).find(dataOpt.name).text();

							var radio = $('<input>').attr({
								type : 'radio',
								name : targetName,
								value : code,
								'class' : (idx == 0) ? 'k1_radio' : 'k1_radio k1_ml20'
							});
							if (!$.util.isNull(dataOpt.initVal)) {
								if (dataOpt.initVal[0] == code) {
									radio.attr('checked', true);
								}
							}
							target.before(radio.after(name));

						});
						target.remove();

						if ($.util.isNull(dataOpt.initVal)) {
							$("input[name='" + targetName + "']:eq(0)").attr("checked", "checked");
						}
						if (typeof func == 'function') {
							func();
						}
					}
					;

				} else if ($(this).attr('type') == 'checkbox') { // object = checkbox
					var target = $(this);
					// target.object('ajaxsubmit', '../jsp/form_submit.jsp', "POST", check, "xml", "mode=select");
					target.object('ajaxsubmit', url, "POST", check, "xml", params);

					function check(xml) {
						var targetName = target.attr('name');
						// target.parent().empty();
						$(xml).find(listNode).each(function() {
							var code = $(this).find(dataOpt.code).text();
							var name = $(this).find(dataOpt.name).text();

							var radio = $('<input>').attr({
								type : 'checkbox',
								name : targetName,
								id : targetName,
								value : code
							});

							if (!$.util.isNull(dataOpt.initVal)) {
								for ( var i = 0; i < dataOpt.initVal.length; i++) {
									if (code == dataOpt.initVal[i]) {
										radio.attr('checked', true);
									}
								}
							}

							target.before(radio.after(name));
						});
						target.remove();

						// $("input[name='"+targetName+"']:eq(0)").attr("checked", "checked");

						if (typeof func == 'function') {
							func();
						}
					}
					;
				}
			}
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).forms('ischange', org_data);
		 * Desc : form 객체들 중에 수정된 데이타가 있는지 여부를 체크하는 함수.
		 * Parameter : org_data (수정전에 데이타 : String)	
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		ischange : function(org_data) {
			var saveFData = $(this).serialize();
			if (saveFData == org_data) {
				return false;
			} else {
				return true;
			}
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).forms('validation', sumbit_func, options);
		 * Desc : 폼 데이타를 submit하기 전에 정의된 Validation을 체크한다. 
		 * 			(일반 이미지나 버튼을 이용하여 폼 Validation 체크시 사용)
		 * Parameter : sumbit_func (폼 데이타를 전송하는 함수)
		 * 				options (validation 체크 옵션 정의)	
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		validation : function(sumbit_func, options, etcOpt) {
			var formid = $(this).attr("id");
			var submitBtn = '<input type="submit" id="_sumbit" value="sumbit" style="display:none;"/>';

			$("#_sumbit").remove();
			$(this).append(submitBtn);

			$("#_sumbit").unbind("click");
			$("#_sumbit").bind('click', function() {
				$("#" + formid).forms('validCheck', sumbit_func, options, etcOpt);
			});

			$("#_sumbit").trigger('click');

		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).forms('validCheck', sumbit_func, options);
		 * Desc : 폼 데이타를 submit하기 전에 정의된 Validation을 체크한다. 
		 * 			(input type='submit' 또는 input type='image' 버튼을 이용하여 폼 Validation 체크시 사용)
		 * Parameter : sumbit_func (폼 데이타를 전송하는 함수)
		 * 				options (validation 체크 옵션 정의)	
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		validCheck : function(sumbit_func, options, etcOpt) {
			var preurl = ($.util.isNull(etcOpt) || $.util.isNull(etcOpt.preurl)) ? null : etcOpt.preurl;
			return this.each(function() {
				$(this).validate(
						{
							onkeyup : false,
							onclick : false,
							onfocusout : false,
							showErrors : function(errorMap, errorList) {
								if (!$.isEmptyObject(errorList)) {
									if (preurl == '/vof') { // vof에서는 alert창을 쓰기로 함. by sunny 2013.09.06
										alert(errorList[0].message);
									} else {
										// $.message.forPopup(errorList[0].message);
										// 2013.09.26 추가
										// 모달창에서 메세지창 호출시 모달창보다 메시지창이 클경우 스크롤 방지
										// width 조절 필요
										// _popupoptions_ = {
										// id : "_msgpopup_",
										// width : 500,
										// height : 200,
										// winName : '_message_'
										// };

										var _popupoptions_ = null;
										if (!$.util.isNull(etcOpt) && !$.util.isNull(etcOpt.popuopoptions)) {
											_popupoptions_ = etcOpt.popuopoptions;
										}

										$.message.forPopup(errorList[0].message, null,
												($.util.isNull(etcOpt) || $.util.isNull(etcOpt.popuptype)) ? '2' : etcOpt.popuptype, preurl,
												_popupoptions_, function(rt) {
												});
									}
								}
							},
							submitHandler : sumbit_func
						});

				if (!$.util.isNull(options)) {
					var checkItems = options[0];
					var validateRules = options[1];
					var msgItems = options[2];

					for ( var i = 0; i < validateRules.length; i++) {
						validateRules[i]['messages'] = msgItems[i];
					}
					$.validate.makeRule(checkItems, validateRules, 1, true, $(this));
				}
			});
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).forms('ajaxsubmit', url, type, success_func, dataType, data);
		 * Desc : form submit을 ajax 방식으로 전송하는 함수.
		 * Parameter : url (form 전송 주소)		
		 * 				type (form 전송 방식 : get/post)	
		 * 				success_func (form 전송이 성공했을 때 실행하는 함수)
		 * 				dataType (form 전송시 데이타 방식)	
		 * 				data (form 전송시 파라미터 데이타)	
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		ajaxsubmit : function(url, type, success_func, dataType, data, syncType, err_fnc) {
			if ($.util.isNull(url)) {
				alert("Error : URL 정보가 없습니다.");
				return;
			}

			if (typeof err_fnc != 'function') {
				err_fnc = function(XMLHttpRequest, textStatus, errorThrown) {
					alert("Error with ajax Function: " + textStatus + " " + errorThrown);
				};
			}
			// 2013.09.26 수정
			// form 전송 방식을 무조건 대문자로 변환
			var oAjax = $.ajax({
				type : ($.util.isNull(type)) ? "POST" : type.toUpperCase(),
				dataType : ($.util.isNull(dataType)) ? "xml" : dataType,
				url : url,
				data : ($.util.isNull(data)) ? $(this).serialize() : data,
				success : success_func,
				error : err_fnc,
				async : (typeof syncType == 'boolean') ? syncType : true
			});
			// oAjax.header("contentType", "multipart/form-data");
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).forms('getsubmit', url, success_func, data);	
		 * Desc : form submit을 get 방식으로 전송하는 함수.
		 * Parameter : url (form 전송 주소)		
		 * 				success_func (form 전송이 성공했을 때 실행하는 함수)	
		 * 				data (form 전송시 파라미터 데이타)	
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		getsubmit : function(url, success_func, data) {
			if ($.util.isNull(url)) {
				alert("Error : URL 정보가 없습니다.");
				return;
			}
			var param = ($.util.isNull(data)) ? $(this).serialize() : data;
			$.ajaxSetup({
				error : function(x, e) {
					if (x.status == 0) {
						alert('You are offline!!\n Please Check Your Network.');
					} else if (x.status == 404) {
						alert('Requested URL not found.');
					} else if (x.status == 500) {
						alert('Internel Server Error.');
					} else if (e == 'parsererror') {
						alert('Error.\nParsing JSON Request failed.');
					} else if (e == 'timeout') {
						alert('Request Time out.');
					} else {
						alert('Unknow Error.\n' + x.responseText);
					}
				}
			});
			$.get(url, param, success_func);
			// .fail(function(){
			// alert("error(fail)");
			// });

		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).forms('postsubmit', url, success_func, data);	
		 * Desc : form submit을 post 방식으로 전송하는 함수.
		 * Parameter : url (form 전송 주소)		
		 * 				success_func (form 전송이 성공했을 때 실행하는 함수)	
		 * 				data (form 전송시 파라미터 데이타)	
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		postsubmit : function(url, success_func, data) {
			if ($.util.isNull(url)) {
				alert("Error : URL 정보가 없습니다.");
				return;
			}
			var param = ($.util.isNull(data)) ? $(this).serialize() : data;
			$.ajaxSetup({
				error : function(x, e) {
					if (x.status == 0) {
						alert('You are offline!!\n Please Check Your Network.');
					} else if (x.status == 404) {
						alert('Requested URL not found.');
					} else if (x.status == 500) {
						alert('Internel Server Error.');
					} else if (e == 'parsererror') {
						alert('Error.\nParsing JSON Request failed.');
					} else if (e == 'timeout') {
						alert('Request Time out.');
					} else {
						alert('Unknow Error.\n' + x.responseText);
					}
				}
			});
			$.post(url, param, success_func);
			// .fail(function(){
			// alert("error(fail)");
			// });
		}
	};

	$.fn.forms = $.fn.object = function(method) {

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.toajaxsubmitoltip');
		}
	};

	$.validate = {
		/*----------------------------------------------------------------------------------* 	
		 * Function : $.validate.makeRule(items, rules, size, flag);	
		 * Desc : validate 체크를 위한 Rule을 추가한다. 
		 *        이 함수는 validation 체크 내부 로직에서 사요하는 함수를 재정의한 것임.
		 * Parameter : items (validation 체크를 할 항목)		
		 * 				rules (valiation 체크 항목에 대한 규칙 )	
		 * 				size (임의로 무조건 1)	
		 * 				flag (rule add : true, rulue remove : false)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		makeRule : function(items, rules, size, flag, objForm) {
			for ( var i = 0; i < items.length; i++) {
				var item = items[i];

				if (item.substring(item.length - 1, item.length) == "*") {
					var itemNm = item.substring(0, item.length - 1);
					for ( var j = 0; j < size; j++) {
						if (document.getElementById(itemNm + j) != null) {
							var ruleObj = objForm.find("#" + itemNm + j);
							if (flag) {
								$(ruleObj).rules("add", rules[i]);
							} else {
								$(ruleObj).rules("remove", rules[i]);
							}
						}
					}
				} else {
					if (document.getElementById(item) != null) {
						var ruleObj = objForm.find("#" + item);
						if (flag) {
							$(ruleObj).rules("add", rules[i]);
						} else {
							$(ruleObj).rules("remove", rules[i]);
						}
					}
				}
			}
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $.validate.addMethod(methodName, func, msg);	
		 * Desc : validation 체크시 사용자가 정의한 함수를 이용하여 
		 *        체크하기 위한 함수.
		 * Parameter : methodName (메소드 이름)		
		 * 				func (사용자 정의 함수 )	
		 * 				msg (validation 체크시 맞지 않으면 보여주는 메시지 정의)	
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		addMethod : function(methodName, func, msg) {

			$.validator.addMethod(methodName, function(value, element) {
				return func(value, element);
			}, msg);
		}
	};

	/*
	 * tagName 을 얻는 함수.
	 */
	$.fn.tagName = function() {
		var nodeName = this.get(0).nodeName.toLowerCase();
		if (arguments.length == 0) {
			return nodeName;
		}
		;
		for ( var i = 0, l = arguments.length; i < l; i++) {
			if (arguments[i].toLowerCase() == nn) {
				return true;
			}
			;
		}
		;
		return false;
	};

	/*----------------------------------------------------------------------------------* 	
	 * Function : $.selectajax(url, type, success_func, dataType, data);
	 * Desc : 폼을 이용하지 않고 바로 조회 가능한 함수. 
	 * Parameter		: url (form 전송 주소)										
	 * 				: type (form 전송 방식 : get/post)							
	 * 				: success_func (form 전송이 성공했을 때 실행하는 함수)		
	 * 				: dataType (form 전송시 데이타 방식)							
	 * 				: data (form 전송시 파라미터 데이타)							
	 * Return :
	 * ----------------------------------------------------------------------------------*/
	$.selectajax = function(url, type, success_func, dataType, data, err_fnc) {

		$("#object").object('ajaxsubmit', url, type, success_func, dataType, data, err_fnc);
	};

})(jQuery);
