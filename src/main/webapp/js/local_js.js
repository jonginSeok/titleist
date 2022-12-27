//
// title: 백오피스 로컬 표준 init 함수
//
function gBackOfficeLocalInit() {
	// To Do something
};

//
// title: 자료 전송을 위한 기본 model
//
if (typeof gDefaultModel == "undefined") {
	gDefaultModel = new Object();
};

//
// title: model 을 사용한 팝업창 호출 및 사용 예제
//
function gOpenPopupTestRefundProcess() {
	//
	// step 1. 자료 준비
	gDefaultModel.popupParamTestRefundProcess = {
		"arrA" : [ "v1", "v2" ]
	};
	//
	// 참고 동일한 json 표현방법:
	// gDefaultModel.popupParamTestRefundProcess = new Object();
	// gDefaultModel.popupParamTestRefundProcess.arrA=["v1","v2"];
	//

	// step 2. 팝업 콜
	// open popup

	// step 3. 열린 popup 에서, 사용할 때.
	var gPDM = parent.gDefaultModel; // 때에 따라서는 opener.gDefaultModel;
	alert(gPDM.paramTestRefundProcess.arrA[0]);
};

//
// title: grid 를 위한 기본 이벤트 핸들러 1. (xml 데이타가 도착했을 때)
//
function gInitGridCommon(gridOptions, gridModel, gridEvents) {

	// step 0. 그리드 이름
	var strGridName = gridOptions.strGridName;

	// step 1. 그리드 타이틀 준비
	var gridTitles = new Array();
	for ( var i = 0, iFin = gridModel.length; i < iFin; i++) {
		gridTitles[i] = gridModel[i].title;
	}

	// step 2. 그리드 옵션 준비

	// step 2.1. 그리드 페이징 관련
	var pagingType = gridOptions.pagingType;
	if (pagingType == 'scrolling') {
		gridOptions.height = gridOptions.scrollHeight;
		gridOptions.scroll = '1';
		gridOptions.loadonce = true;
		gridOptions.gridview = true;
	} else if (pagingType == 'spaging') {// server paging
		gridOptions.height = 'auto';
		gridOptions.scroll = '';
		gridOptions.loadonce = false;
		gridOptions.gridview = false;
	} else if (pagingType == 'cpaging') {// client paging
		gridOptions.height = 'auto';
		gridOptions.scroll = '';
		gridOptions.loadonce = true;
		gridOptions.gridview = false;
	}

	// step 2.2. 좁은 그리드: 자동 width 설정, 넓은 그리드: 고정 width 설정
	var calculatedWidth = 0; // 수치로 입력된 개별 width 합 구하기
	for ( var i = 0, iFin = gridModel.length; i < iFin; i++) {
		calculatedWidth += gridModel[i].width;
	}

	var searchWidth = $.util.intSize($('#' + strGridName + 'BoxDiv').css('width'), 'px');
	if (calculatedWidth <= searchWidth) {
		gridOptions.autowidth = true;
		gridOptions.width = '100%';
	} else {
		gridOptions.width = '' + calculatedWidth;
	}

	// step 2.3. 기타 vof 공통 옵션
	// - 에디터블 false
	gridOptions.rowEditable = false;
	// - 변수명 바꾸기
	gridOptions.prmNames = {
		rows : 'rowsperpage',
		page : 'targetpage',
		sidx : 'sortindex',
		sord : 'sortorder'
	};
	// - 소팅을 위해 그리드 헤드를 눌렀을 때
	gridOptions.sortfnc = function(index, iCol, sortorder, url) {
		(new gMakeGridClickHeader(strGridName, gridOptions.formName1st))(index, iCol, sortorder, url);
	};

	// step 3. 그리드 이벤트 준비
	if (gridEvents == null) {
		gridEvents = new Object();
	}

	// step 3-1. xml 데이타가 도착했을 때
	// onload 시 callback을 설정했다면
	var fncOnloadCallback = null;
	if (!$.util.isNull(gridOptions.onloadCallback)) {
		fncOnloadCallback = gridOptions.onloadCallback;
	}
	if (typeof gridEvents.loadComplete == "undefined") {
		gridEvents.loadComplete = function(data) {
			(new gMakeGridLoadComplete(strGridName, calculatedWidth, fncOnloadCallback))(data);
		};
	}

	// step 3-2. checkbox 선택시 스타일 변환 및 에디터블
	// onselect 시 callback을 설정했다면
	var fncOnselectCallback = null;
	if (!$.util.isNull(gridOptions.onselectCallback)) {
		fncOnselectCallback = gridOptions.onselectCallback;
	}
	if (typeof gridEvents.onSelectRow == "undefined") {
		gridEvents.onSelectRow = function(rowid, check) {
			(new gMakeGridOnSelect(strGridName, fncOnselectCallback))(rowid, check);
		};
	}
	// step 3-3. checkbox 전체 선택하기
	if (typeof gridEvents.onSelectAll == "undefined") {
		gridEvents.onSelectAll = function(rowids, check) {
			(new gMakeGridOnSelectAll(strGridName))(rowids, check);
		};
	}

	// step 5. 그리드 초기화 호출
	var strInitUrl = '';
	if (!$.util.isNull(gridOptions.strInitUrl)) {
		strInitUrl = gridOptions.strInitUrl;
	}
	$('#' + strGridName).grid(strInitUrl, gridTitles, gridModel, gridOptions, gridEvents);

	// step 6. 그리드 버튼 이벤트 연결
	new gJoinGridButtonHandler(strGridName);

	// step 7. 그리드 스타일 지정, height 조절
	$('#' + strGridName).grid("setGridStyle", "vof_list");
	$('#' + strGridName).parents('div.ui-jqgrid-bdiv').css('height', 27 * $('#' + strGridName).grid('getGridParam', 'rowNum') + 'px');
};

//
// title: grid 를 위한 기본 이벤트 핸들러 1. (xml 데이타가 도착했을 때)
//
function gMakeGridLoadComplete(strGName, iCWidth, fncOCallback) {
	var strGridName = strGName;
	var iCalculatedWidth = iCWidth;
	var fncOnloadCallback = fncOCallback;
	var fnReturn = function(data) {
		var objGrid = $("#" + strGridName);
		var objGridPage = $("#" + strGridName + "PageNum");
		var objGridOuterDiv = $("#" + strGridName + "BoxDiv");

		// 그리드 스크롤 넓이 지정
		var searchWidth = $.util.intSize(objGridOuterDiv.css("width"), "px");
		if (iCalculatedWidth <= searchWidth) {
			objGrid.setGridWidth('100%', false);
		} else {
			objGrid.setGridWidth(searchWidth, false);
		}

		// 그리드 스타일 지정
		objGrid.grid("setGridStyle", "vof_list");

		var gridview = objGrid.grid("getGridParam", "gridview"); // 스크롤링 여부확인
		if (!gridview) {
			// 그리드 페이징 자료 준비
			var currentPage = objGrid.grid("getGridParam", "page"); // 현재페이지
			var pageSize = objGrid.grid("getGridParam", "rowNum"); // 페이지당 row 수
			var pageTotal = objGrid.grid("getGridParam", "records"); // 총 row 수
			var pageBlock = 10; // block 으로 보여 주는 page 수

			var loadonce = objGrid.grid("getGridParam", "loadonce"); // 서버 접근 횟수
			var url = objGrid.grid("getGridParam", "url"); // 페이지 이동시 url
			var formid = objGrid.grid("getGridParam", "formName1st"); // 페이지 이동시 param 으로 넘겨야 하는 form id
			var side = (loadonce ? "C" : "S"); // C:client, S:server

			// 그리드 페이징 호출
			objGridPage.pager({
				pageSize : pageSize,
				pageBlock : pageBlock,
				currentPage : currentPage,
				pageTotal : pageTotal,
				url : url,
				formid : formid
			}, {
				type : "grid",
				id : strGridName,
				style : "vof_list"
			}, side);
		}
		// call back chain
		if (fncOnloadCallback != null) {
			fncOnloadCallback(data);
		}
	};

	return fnReturn;
};

//
// title: grid 를 위한 기본 이벤트 핸들러 2. (개별 선택시 스타일 변환 및 에디터블)
//
function gMakeGridOnSelect(strGName, fncOCallback) {
	var strGridName = strGName;
	var fncOnselectCallback = fncOCallback;
	var fnReturn = function(rowid, check) {
		var objGrid = $("#" + strGridName);

		// 스타일 변환
		if (check) {
			$("#" + strGridName + " .ui-jqgrid tr.jqgrow:eq(" + (rowid - 1) + ")").addClass("vof-jqgrid-hover");
		} else {
			$("#" + strGridName + " .ui-jqgrid tr.jqgrow:eq(" + (rowid - 1) + ")").removeClass("vof-jqgrid-hover");
		}
		// 에디터블 처리(rowEditable에 의존함)
		var editOption = {
			"rowid" : rowid,
			"keys" : true,
			"oneditfunc" : function() {
			}
		};
		objGrid.grid("openRowEdit", editOption);

		// call back chain
		if (fncOnselectCallback != null) {
			fncOnselectCallback(rowid, check, objGrid);
		}
	};

	return fnReturn;
};

//
// title: grid 를 위한 기본 이벤트 핸들러 3. (checkbox 전체 선택하기)
//
function gMakeGridOnSelectAll(strGName) {
	var strGridName = strGName;
	var fnReturn = function(rowids, check) {
		if (check) {
			$("#" + strGridName + " .ui-jqgrid tr.jqgrow").addClass("vof-jqgrid-hover");
		} else {
			$("#" + strGridName + " .ui-jqgrid tr.jqgrow").removeClass("vof-jqgrid-hover");
		}
	};

	return fnReturn;
};

//
// title: grid 를 위한 기본 이벤트 핸들러 4. (소팅을 위해 그리드 헤드를 눌렀을 때)
//
function gMakeGridClickHeader(strGName, strFName) {
	var strGridName = strGName;
	var strFormName = strFName;
	var fnReturn = function(index, iCol, sortorder, url) {
		$('#' + strFormName + ' #orderby')[0].value = ' ' + index + ' ' + sortorder + ' '; /* 데이타 조작 */
		$('#' + strGridName).grid('setPostDataFromForm', strFormName); /* 재세팅 */
	};

	return fnReturn;
};

//
// title: grid 를 위한 기본 이벤트 핸들러 5. (CRUD 버튼용)
//
// - 참고(버튼id): "BB_grid01_Retrieve", "..._CallInsert", "..._CallUpdate", "..._Save", "..._Cancel", "..._Remove"
//
function gJoinGridButtonHandler(strGName) {

	var objG = $("#" + strGName);
	if (!$.util.isNull(objG)) {
		var objUrl = objG.grid("getGridParam", "gridCRUDUrl");
		if (!$.util.isNull(objUrl)) {

			// 그리드: 검색버튼
			if (!$.util.isNull(objUrl.select)) {
				$("#BB_" + strGName + "_Retrieve").bind("click", function() {
					var strGridName = this.id.split("_")[1];
					var objGrid = $("#" + strGridName);
					if (gButtonIsDisabled($(this))) {
						alert('지금은 사용할 수 없습니다.');
					} else {
						// step 1. 검색을 호출한다.
						var url = objGrid.grid("getGridParam", "gridCRUDUrl").select;
						var frm = objGrid.grid("getGridParam", "formName1st");
						objGrid.grid("selectData", url, frm);
					}
				});
			}

			// 그리드: 등록버튼
			if (!$.util.isNull(objUrl.insert)) {
				$("#BB_" + strGName + "_CallInsert").bind("click", function() {
					var strGridName = this.id.split("_")[1];
					var objGrid = $("#" + strGridName);
					var objThis = $(this);
					if (gButtonIsDisabled(objThis)) {
						alert('지금은 사용할 수 없습니다.');
					} else {
						// 현재 모드 Tag 확인
						var gridCRUDTag = objGrid.grid("getGridParam", "gridCRUDTag");
						if (gridCRUDTag == "" || gridCRUDTag == "GI") { // 모드 Tag 가 맞다면, (GI:Grid Insert)

							alert('자동 입력 [key 컬럼]은 입력할 수 없습니다.');

							// step 1. 주변 단추를 모두 disable 하여 사용불능으로 만든다.
							objThis.parent().find('a').each(function(index, item) {
								gButtonDisable($(this));
							});
							gButtonEnable(objThis); // 등록단추 활성화(멀티등록가능)
							gButtonEnable($("#BB_" + strGridName + "_Save")); // 저장단추 활성화
							gButtonEnable($("#BB_" + strGridName + "_Cancel")); // 취소단추 활성화

							// step 2. 모드 Tag 를 재세팅하고
							objGrid.grid("setGridParamNoReload", {
								gridCRUDTag : "GI"
							});

							// step 3. 다른 행은 update 안하고, 새행을 추가하여 등록 모드로 들어간다.
							var objConstraints = objGrid.grid("getGridParam", "constraints");
							var bPkeyAuto = false;
							if (!$.util.isNull(objConstraints) && !$.util.isNull(objConstraints.pkeyauto)) {
								bPkeyAuto = objConstraints.pkeyauto;
							}
							objGrid.grid("addRowWithoutUpdate", !bPkeyAuto);

							// step 4. 새 행이 들어왔으므로 스타일을 다시 적용한다.
							objGrid.grid("setGridStyle", "vof_list");
						}
					}
				});
			}

			// 그리드: 수정버튼
			if (!$.util.isNull(objUrl.update)) {
				$("#BB_" + strGName + "_CallUpdate").bind("click", function() {
					var strGridName = this.id.split("_")[1];
					var objGrid = $("#" + strGridName);
					var objThis = $(this);
					if (gButtonIsDisabled(objThis)) {
						alert('지금은 사용할 수 없습니다.');
					} else {
						// 현재 모드 Tag 확인
						var gridCRUDTag = objGrid.grid("getGridParam", "gridCRUDTag");
						if (gridCRUDTag == "") { // 모드 Tag 가 맞다면, (GU:Grid Update)

							alert('원하는 쎌을 수정하시기 바랍니다[key 컬럼] 및 [계산된 컬럼]은 수정할 수 없습니다.');

							// step 1. 주변 단추를 모두 disable 하여 사용불능으로 만든다.
							objThis.parent().find('a').each(function(index, item) {
								gButtonDisable($(this));
							});
							gButtonEnable($("#BB_" + strGridName + "_Save")); // 저장단추 활성화
							gButtonEnable($("#BB_" + strGridName + "_Cancel")); // 취소단추 활성화

							// step 2. 모드 Tag 를 재세팅하고
							objGrid.grid("setGridParamNoReload", {
								gridCRUDTag : "GU"
							});

							// step 3. update 상태로 들어간다.
							objGrid.grid("setGridParamNoReload", {
								rowEditable : true
							});
						}
					}
				});
			}

			if (!$.util.isNull(objUrl.insert) || !$.util.isNull(objUrl.update)) {
				// 그리드: 저장버튼
				gButtonDisable($("#BB_" + strGName + "_Save")); // 저장단추 비활성화
				$("#BB_" + strGName + "_Save").bind("click", function() {
					var strGridName = this.id.split("_")[1];
					var objGrid = $("#" + strGridName);
					var objThis = $(this);
					if (gButtonIsDisabled(objThis)) {
						alert('지금은 사용할 수 없습니다.');
					} else {
						// 현재 모드 Tag 확인
						var gridCRUDTag = objGrid.grid("getGridParam", "gridCRUDTag");
						if (gridCRUDTag == "GI" || gridCRUDTag == "GU") { // 모드 Tag 가 맞다면 (GI:Grid Insert, GU:Grid Update)

							// step 0. 가져온 code
							var jsonStr = "";
							var lastSelRow = objGrid.grid("getGridParam", "lastSelRow");
							if (lastSelRow != "none") {
								if (objGrid.grid("getGridParam", "rowEditable")) {
									objGrid.grid("setEditRowToGrid", lastSelRow);
									if ($.util.isNull(objGrid.grid("getGridParam", "updateData"))) {
										objGrid.grid("setGridParamNoReload", {
											lastSelRow : "none"
										});
										return;
									}
								}
							}
							jsonStr = objGrid.grid("getUpdateColDataByJsonString");

							// step 1. insert or update call
							var url = "";
							if (gridCRUDTag == "GI") {
								url = objGrid.grid("getGridParam", "gridCRUDUrl").insert;
							} else if (gridCRUDTag == "GU") {
								url = objGrid.grid("getGridParam", "gridCRUDUrl").update;
							}
							if (url != "") {
								objGrid.forms("ajaxsubmit", url, "post", function(data) {
									var objStatusInfo = $(data).find("statusInfo");
									var strStatus = objStatusInfo.find("status").text();
									if (strStatus == "FAILURE") {
										alert(objStatusInfo.find("errorMessage").text());
									} else { // "" 또는 , 아마도 "SUCCESS"
										alert("잘 처리되었습니다.");
										// step 1. 주변 단추를 모두 enable 하여 사용가능으로 만든다.
										objThis.parent().find('a').each(function(index, item) {
											gButtonEnable($(this));
										});
										gButtonDisable($("#BB_" + strGridName + "_Save")); // 저장단추 비활성화
										gButtonDisable($("#BB_" + strGridName + "_Cancel")); // 취소단추 비활성화

										// step 2. 모드 Tag 를 재세팅하고
										objGrid.grid("setGridParamNoReload", {
											gridCRUDTag : ""
										});

										// step 3. 다시 select 해 온다.
										var urlInner = objGrid.grid("getGridParam", "gridCRUDUrl").select;
										var frmInner = objGrid.grid("getGridParam", "formName1st");
										objGrid.grid("selectData", urlInner, frmInner);
									}
								}, "xml", {
									"jsonroot" : jsonStr
								});
							}
						}
					}
				});

				// 그리드: 취소버튼
				gButtonDisable($("#BB_" + strGName + "_Cancel")); // 취소단추 비활성화
				$("#BB_" + strGName + "_Cancel").bind("click", function() {
					var strGridName = this.id.split("_")[1];
					var objGrid = $("#" + strGridName);
					var objThis = $(this);
					if (gButtonIsDisabled(objThis)) {
						alert('지금은 사용할 수 없습니다.');
					} else {
						// 현재 모드 Tag 확인
						var gridCRUDTag = objGrid.grid("getGridParam", "gridCRUDTag");
						if (gridCRUDTag == "GI" || gridCRUDTag == "GU") { // 모드 Tag 가 맞다면
							// step 1. 에디트 상태를 막고
							objGrid.grid("setGridParamNoReload", {
								rowEditable : false
							});

							// step 2. 모드별 복구 작업을 한다.
							if (gridCRUDTag == "GI") { // 모드 Tag 가 (GI:Grid Insert) 라면
								// step 2-1. need 에디팅하게 추가된 행을 삭제한다.
								objGrid.grid('restoreInputRow');
							} else if (gridCRUDTag == "GU") { // 모드 Tag 가 (GU:Grid Update) 라면
								// step 2-2. need 에디팅하여 변경된 행을 원상복귀한다.
								objGrid.grid('restoreInputRow');
							}

							// step 3. 주변 단추를 모두 enable 하여 사용가능으로 만든다.
							objThis.parent().find('a').each(function(index, item) {
								gButtonEnable($(this));
							});
							gButtonDisable($("#BB_" + strGName + "_Save")); // 저장단추 비활성화
							gButtonDisable($("#BB_" + strGName + "_Cancel")); // 취소단추 비활성화

							// step 4. 모드 Tag 를 재세팅
							objGrid.grid("setGridParamNoReload", {
								gridCRUDTag : ""
							});
						}
					}
				});
			}

			// 그리드: 삭제버튼
			if (!$.util.isNull(objUrl.remove)) {
				$("#BB_" + strGName + "_Remove").bind("click", function() {
					var strGridName = this.id.split("_")[1];
					var objGrid = $("#" + strGridName);
					var objThis = $(this);
					if (gButtonIsDisabled(objThis)) {
						alert('지금은 사용할 수 없습니다.');
					} else {
						// 현재 모드 Tag 확인
						var gridCRUDTag = objGrid.grid("getGridParam", "gridCRUDTag");
						if (gridCRUDTag == "") { // 모드 Tag 가 맞다면
							var url = objGrid.grid("getGridParam", "gridCRUDUrl").remove;
							var jsonStr = objGrid.grid("getSelectedRowsPKey2JsonString"); // need: 선택한 행의 pKey Only
							var jsonObj = $.parseJSON(jsonStr);
							if (jsonObj.length <= 0) {
								alert("삭제할 행을 미리 선택하여 주십시오.");
							} else {
								if (confirm("정말로 삭제하시겠습니까?")) {
									objGrid.forms("ajaxsubmit", url, "post", function(data) { // 삭제후 콜백함수
										var objStatusInfo = $(data).find("statusInfo");
										var strStatus = objStatusInfo.text();
										if (strStatus == "FAILURE") {
											alert(objStatusInfo.find("errorMessage").text());
										} else { // "" 또는 , 아마도 "SUCCESS"
											alert("잘 처리되었습니다.");
											// 다시 select 해온다.
											var urlInner = objGrid.grid("getGridParam", "gridCRUDUrl").select;
											var frmInner = objGrid.grid("getGridParam", "formName1st");
											objGrid.grid("selectData", urlInner, frmInner);
										}
									}, "xml", {
										"jsonroot" : jsonStr
									});
								}
								;
							}
						}
					}
				});
			}
		}
	}
};

//
// title: grid 를 위한 기본 함수(grid reset 하기)
//
function gridReset(strGridName) {
	$("#" + strGridName + "BoxDiv").empty();
	$("<table id=\"" + strGridName + "\"></table><div id=\"" + strGridName + "PageNum' class='k1_page_num\"></div>").appendTo(
			"#" + strGridName + "BoxDiv");
};

//
// title: button 를 위한 기본 함수(disabled 인지 확인하기)
//
// - 참고: <a id='strButtonId' ...><em class='..._off'>....</a>
// - 사용법: gButtonIsDisabled($('#strButtonId'))
//
function gButtonIsDisabled(objButton) {

	var strClass = objButton.find('em').attr('class');
	var iIndex = strClass.indexOf('_off');
	if (iIndex < 0) {
		return false;
	}
	return true;
};

//
// title: button 를 위한 기본 함수(enabled 인지 확인하기)
//
// - 참고: <a id='strButtonId' ...><em class='..._off'>....</a>
// - 사용법: gButtonIsEnabled($('#strButtonId'))
//
function gButtonIsEnabled(objButton) {

	var strClass = objButton.find('em').attr('class');
	var iIndex = strClass.indexOf('_off');
	if (iIndex < 0) {
		return true;
	}
	return false;
};

//
// title: button 를 위한 기본 함수(disable 하기)
//
function gButtonDisable(objButton) {
	var objEmTag = objButton.find('em');
	var strClass = objEmTag.attr('class');
	var iIndex = strClass.indexOf('_off');
	if (iIndex < 0) {
		objEmTag.removeClass(strClass).addClass(strClass + "_off");
	}
};

//
// title: button 를 위한 기본 함수(enable 하기)
//
function gButtonEnable(objButton) {

	var objEmTag = objButton.find('em');
	var strClass = objEmTag.attr('class');
	var iIndex = strClass.indexOf('_off');
	if (iIndex >= 0) {
		objEmTag.removeClass(strClass).addClass(strClass.substring(0, iIndex));
	}
};

//
// 검색 조건 상/하 이동 버튼 클릭시.
//
function gUpSideMoveDiv(strGridName) {
	var closeHtml = $('.k1_btn_tselect').html();
	var openHtml = $('.k1_hide').html();

	$('.k1_btn_tselect').event('upSideMoveDiv', '.k1_search_box', 500, {
		afterIn : function() {

			// 그리드 데이타를 재조회함 -> 확인 필요
			$(strGridName).grid('setGridParam', {
				rowNum : 15
			});

			// 그리드 높이를 재조회함
			$(strGridName).parents('div.ui-jqgrid-bdiv').css('height', 26 * $(strGridName).grid('getGridParam', 'rowNum') + 'px');
			$('.k1_btn_tselect').html(openHtml);

		},
		afterOut : function() {

			$(strGridName).grid('setGridParam', {
				rowNum : 12
			});

			// 그리드 높이를 재조회함
			$(strGridName).parents('div.ui-jqgrid-bdiv').css('height', 26 * $(strGridName).grid('getGridParam', 'rowNum') + 'px');
			$('.k1_btn_tselect').html(closeHtml);
		}
	});
}

//
// title: 그리드를 위한 기본 함수(userdata)
//
function gGetUserData(strGridName, index) {
	var temp = $("#" + strGridName).grid('getGridParam', 'userData')[null].split("\n")[index];
	if (temp != null) {
		return temp.trim();
	} else {
		return '';
	}
}