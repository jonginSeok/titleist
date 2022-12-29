(function($) {
	var methods = {
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('init', uurl, title, model, option, event);
		 * Desc : 처음 Grid을 만드는 함수.
		 * Parameter : uurl (grid 데이타를 만들 xml 파일의 경로)
		 * 				title (그리드 Header 이름)
		 * 				model (그리드 칼럼 속성을 정의)
		 * 				option (필요한 그리드 속성 정의)
		 * 				event (필요한 그리드의 이벤트 정의)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		init : function(uurl, title, model, option, event) {
			return this.each(function() {
				// loadComplete 이벤트는 반드시 그리드 최초 생성시에 넣어 줘야 한다.
				var complete_func = null;
				if (!$.util.isNull(event) && !$.util.isNull(event.loadComplete)) {
					complete_func = event.loadComplete;
				}
				var paging_func = null;
				if (!$.util.isNull(event) && !$.util.isNull(event.paging)) {
					paging_func = event.paging;
				}
				// local에서 실행 할수 있도록 수정 2013-08-20
				var beforesend_func = null;
				// if (!$.util.isNull(event) && !$.util.isNull(event.loadBeforeSend)) {
				// beforesend_func = event.loadBeforeSend;
				// }
				// multiselect 옵션은 처음 그리드 생성시에 넣어 줘야 한다.
				var multiselectOpt = false;
				if (!$.util.isNull(option) && !$.util.isNull(option.multiselect)) {
					multiselectOpt = option.multiselect;
				}
				var pageOpt = null;
				if (!$.util.isNull(option) && !$.util.isNull(option.pager)) {
					pageOpt = option.pager;
				}
				var rowListOpt = new Array();
				if (!$.util.isNull(option) && !$.util.isNull(option.rowList)) {
					rowListOpt = option.rowList;
				}
				var groupFlag = false;
				if (!$.util.isNull(option) && !$.util.isNull(option.grouping)) {
					groupFlag = option.grouping;
				}

				var groupView = null;
				if (!$.util.isNull(option) && !$.util.isNull(option.groupingView)) {
					groupView = option.groupingView;
				}

				var userDataFlag = false;
				if (!$.util.isNull(option) && !$.util.isNull(option.userDataOnFooter)) {
					userDataFlag = option.userDataOnFooter;
				}

				var footerrowFlag = false;
				if (!$.util.isNull(option) && !$.util.isNull(option.footerrow)) {
					footerrowFlag = option.footerrow;
				}

				/* added scroll */
				var scrollFlag = 0;
				if (!$.util.isNull(option) && !$.util.isNull(option.scroll)) {
					scrollFlag = option.scroll;
				}
				var gridView = true;
				// performance increase. if gridView is true, can not use treeGrid, subGrid, or the
				// afterInsertRow
				if (!$.util.isNull(option) && !$.util.isNull(option.gridview)) {
					gridView = option.gridview;
				}
				var rownum = null;
				if (!$.util.isNull(option) && !$.util.isNull(option.rowNum)) {
					rownum = option.rowNum;
				}
				/* added scroll */

				/* page */
				var loadOnce = false;
				if (!$.util.isNull(option) && !$.util.isNull(option.loadonce)) {
					loadOnce = option.loadonce;
				}

				var postDataArr = {};
				if (!$.util.isNull(uurl)) {
					if (uurl.indexOf('?') > -1) {
						var getParams = uurl.substring(uurl.indexOf('?') + 1, uurl.length);

						var getParamsArr = getParams.split('&');
						for ( var i = 0; i < getParamsArr.length; i++) {
							var key = getParamsArr[i].split("=")[0];
							var value = getParamsArr[i].split("=")[1];
							postDataArr[key] = value;
						}
						uurl = uurl.substring(0, uurl.indexOf('?'));
					}
				}

				var spage = 1;
				if (!$.util.isNull(option) && !$.util.isNull(option.page)) {
					spage = option.page;
				}

				var customPrmNames = {
					page : "page",
					rows : "rows",
					sort : "sidx",
					order : "sord",
					search : "_search",
					nd : "nd",
					id : "id",
					oper : "oper",
					editoper : "edit",
					addoper : "add",
					deloper : "del",
					subgridid : "id",
					npage : null,
					totalrows : "totalrows"
				};
				if (!$.util.isNull(option) && !$.util.isNull(option.prmNames)) {
					$.extend(true, customPrmNames, option.prmNames);
				}

				var sorder = "asc";
				if (!$.util.isNull(option) && !$.util.isNull(option.sortorder)) {
					sorder = option.sortorder;
				}
				var sname = "";
				if (!$.util.isNull(option) && !$.util.isNull(option.sortname)) {
					sname = option.sortname;
				}

				var rowEditable = false;
				if (!$.util.isNull(option) && !$.util.isNull(option.rowEditable)) {
					rowEditable = option.rowEditable;
				}

				var sortfnc = null;
				if (!$.util.isNull(option) && !$.util.isNull(option.sortfnc)) {
					sortfnc = option.sortfnc;
				}

				var constraints = null;
				if (!$.util.isNull(option) && !$.util.isNull(option.constraints)) {
					constraints = option.constraints;
				}

				var pagingType = 'cpaging';
				if (!$.util.isNull(option) && !$.util.isNull(option.pagingType)) {
					pagingType = option.pagingType;
				}

				var gridCRUDTag = '';
				if (!$.util.isNull(option) && !$.util.isNull(option.gridCRUDGTag)) {
					gridCRUDGTag = option.gridCRUDGTag;
				}

				var gridCRUDUrl = new Object();
				if (!$.util.isNull(option) && !$.util.isNull(option.gridCRUDGUrl)) {
					gridCRUDGUrl = option.gridCRUDGUrl;
				}

				var formName1st = '';
				if (!$.util.isNull(option) && !$.util.isNull(option.formName1st)) {
					//2022.12.29 //ngins7512
					//formName1st = option.formName1st;
					
					var param = $("#" + formName1st).serialize();
					var getParamsArr = param.split('&');
					for ( var i = 0; i < getParamsArr.length; i++) {
						postDataArr[getParamsArr[i].split("=")[0]] = getParamsArr[i].split("=")[1];
					}
				}

				var rownumbers = false;
				if (!$.util.isNull(option) && !$.util.isNull(option.rownumbers)) {
					rownumbers = option.rownumbers;
				}

				var rownumWidth = 40;
				if (!$.util.isNull(option) && !$.util.isNull(option.rownumWidth) && rownumbers) {
					rownumWidth = option.rownumWidth;
				}

				// title.unshift('Status');
				// model.unshift({
				// name : '_status',
				// index : '_status',
				// width : 40,
				// hidden : true
				// });

				/* page */

				$(this).jqGrid({
					url : uurl,
					//datatype : "xml",
					datatype : "json",
					mtype : "POST",
					postData : postDataArr,
					colNames : title,
					colModel : model,
					page : spage,
					sortorder : sorder,
					sortname : sname,
					viewrecords : true,
					loadonce : loadOnce, // paging
					loadtext : 'Loading ...',// 'Loading ...',
					multiselect : multiselectOpt,
					scroll : scrollFlag, // scroll
					gridview : gridView, // scroll
					rowNum : rownum, // scroll
					pager : pageOpt,
					rowList : rowListOpt,
					grouping : groupFlag,
					groupingView : groupView,
					userDataOnFooter : userDataFlag,
					footerrow : footerrowFlag,
					width : (!$.util.isNull(option) && !$.util.isNull(option.width)) ? option.width : null,
					height : (!$.util.isNull(option) && !$.util.isNull(option.height)) ? option.height : null,
					loadBeforeSend : beforesend_func,
					loadComplete : complete_func,
					onPaging : paging_func, // paging
					onSortCol : function(index, iCol, sortorder) {

						// 2013-06-13 URL 복사관련 추가 시작
						var gridCRUDUrl = $(this).grid('getGridParam', 'gridCRUDUrl');
						gridCRUDUrl.lastSelectedSortOrder = sortorder; // asc/desc 둘중하나가 저장됨
						gridCRUDUrl.lastSelectedSortIndex = index; // 컬럼명이 저장됨
						// 2013-06-13 URL 복사관련 추가 종료

						$(this).grid("onSortCol", index, iCol, sortorder, uurl, sortfnc);
					},
					prmNames : customPrmNames,
					rownumbers : rownumbers,
					rownumWidth : rownumWidth,
					// == custom option start
					rowEditable : rowEditable,
					lastSelRow : 'none',
					originalData : null,
					updateData : null,
					constraints : constraints,
					pagingType : pagingType,
					gridCRUDTag : gridCRUDTag,
					gridCRUDUrl : gridCRUDUrl,
					formName1st : formName1st,
					pageEnable : true
				// == custom option end
				});

				if (!$.util.isNull(option)) {
					$(this).grid('setGridParam', option);
				}
				if (!$.util.isNull(event)) {
					$(this).grid('setGridEvent', event);
				}
				// $(this).jqGrid('setFrozenColumns');
			});
		}, // end init
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('makeTree', uurl, title, model, option, event);
		 * Desc : Grid 중에서 Tree Grid을 만드는 함수.
		 * Parameter : uurl (grid 데이타를 만들 xml 파일의 경로)
		 * 				title (그리드 Header 이름)
		 * 				model (그리드 칼럼 속성을 정의)
		 * 				option (필요한 그리드 속성 정의)
		 * 				event (필요한 그리드의 이벤트 정의)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		makeTree : function(uurl, title, model, option, event) {
			var complete_func = null;
			if (!$.util.isNull(event) && !$.util.isNull(event.loadComplete)) {
				complete_func = event.loadComplete;
			}

			$(this).jqGrid({
				url : uurl,
				//datatype : "xml",
				datatype : "json",
				mtype : 'GET',
				colNames : title,
				colModel : model,
				treeGrid : true, //
				treeGridModel : 'adjacency', //
				ExpandColumn : (!$.util.isNull(option) && !$.util.isNull(option.ExpandColumn)) ? option.ExpandColumn : '', //
				ExpandColClick : true, //
				treeIcons : (!$.util.isNull(option) && !$.util.isNull(option.treeIcons)) ? option.treeIcons : {}, //
				xmlReader : (!$.util.isNull(option) && !$.util.isNull(option.xmlReader)) ? option.xmlReader : {},
				rowNum : 10000,
				width : (!$.util.isNull(option) && !$.util.isNull(option.width)) ? option.width : '500',
				height : (!$.util.isNull(option) && !$.util.isNull(option.height)) ? option.height : '200',
				loadComplete : complete_func,
				pager : false,
				headertitles : false,
				loadui : "disable"
			});

			if (!$.util.isNull(event)) {
				$(this).grid('setGridEvent', event);
			}

		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('setSelection', row);
		 * Desc : Grid 데이타를 선택하는 함수.
		 * Parameter : row (해당 Row를 선택한다.)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		// Grid 데이타를 선택하는 함수.
		setSelection : function(row) {
			return this.each(function() {
				$(this).jqGrid('setSelection', row);
			});
		}, // end setSelection
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('setGridParam', option);
		 * Desc : Grid 속성을 정의하는 함수.
		 * Parameter : option (속성 옵션 값)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		// Grid 속성을 정의하는 함수.
		setGridParam : function(option) {
			return this.each(function() {
				$(this).jqGrid('setGridParam', option).trigger("reloadGrid");

			});
		}, // end setGridParam
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('setGroupHeaders', option, usecol);
		 * Desc : Grid Header의 Grouping을 정의하는 함수.
		 * Parameter : option (속성 옵션 값)
		 * 				usecol (colspan 속성 사용 여부)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		setGroupHeaders : function(option, usecol) {
			return this.each(function() {
				$(this).jqGrid('setGroupHeaders', {
					useColSpanStyle : ($.util.isNull(usecol)) ? true : usecol,
					groupHeaders : option
				});

			});
		}, // end setGroupHeaders
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('setGridEvent', evtOption);
		 * Desc : Grid 이벤트를 정의하는 함수.
		 * Parameter : evtOption (이벤트 속성)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		// Grid 이벤트를 정의하는 함수.
		setGridEvent : function(evtOption) {
			return this.each(function() {

				$(this).jqGrid('setGridParam', evtOption).trigger("reloadGrid");

			});
		}, // end setGridEvent
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('onSelectRow', func);
		 * Desc : Grid 의 선택된 Row를 얻는 함수.
		 * Parameter : func (해당 이벤트시 실행되는 함수 이름)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		// Grid 의 선택된 Row를 얻는 함수.
		onSelectRow : function(func) {
			return this.each(function() {
				$(this).grid('setGridEvent', {
					onSelectRow : func
				});
			});
		}, // end onSelectRow
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('onPaging', action, url);
		 * Desc : 기본적으로 페이징 이벤트를 포함한다.
		 * Parameter : action (페이지 관련 버튼의 이벤트 종류)
		 * 				url (페이징을 조회하기 위한 URL)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		// 기본적으로 페이징 이벤트를 포함한다.
		onPaging : function(action, url) {
			var path = url;
			if (action.indexOf('next') != -1) {
				var nextPage = $(this).grid('getGridParam', 'page');
				$(this).grid('selectData', path + "?spage=" + nextPage);
			} else if (action.indexOf('prev') != -1) {
				var prevPage = $(this).grid('getGridParam', 'page');
				$(this).grid('selectData', path + "?spage=" + prevPage);
			} else if (action.indexOf('last') != -1) {
				var lastPage = $(this).grid('getGridParam', 'page');
				$(this).grid('selectData', path + "?spage=" + lastPage);
			} else if (action.indexOf('first') != -1) {
				var firstPage = $(this).grid('getGridParam', 'page');
				$(this).grid('selectData', path + "?spage=" + firstPage);
			}
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('onSortCol', index, iCol, sortorder, url);
		 * Desc : header 타이틀 클릭시 해당 필드로 정렬이 되게 한다.
		 * Parameter : index (grid 필드 index 이름)
		 * 				iCol (grid 필드 칼럼 인덱스)
		 * 				sortorder (해당 칼럼의 sortorder : desc or asc)
		 * 				url (정렬을 하기 위한 URL)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		// header 타이틀 클릭시 해당 필드로 정렬이 되게 한다.
		onSortCol : function(index, iCol, sortorder, url, func) {
			if (!$.util.isNull(func)) {
				func(index, iCol, sortorder, url);
			}

			// alert('index=' + index + ' iCol=' + iCol + ' sortorder=' +
			// sortorder);

			// sort 하기 전에 다시 서버에서 데이타를 sort하는 필드로
			// 조회해서 보여 준다.
			// sort와 paging에 필요한 파라미터를 넘겨서 다시 재조회한다.
			/*
			 * grid_data2.jsp?sIdx=invdata&order=asc&page=1
			 */
			// alert(url);
			// $(this).grid('selectData', url);
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('getGridParam', pName);
		 * Desc : Grid의 속성 값을 얻는 함수.
		 * Parameter : pName (grid 속성 이름)
		 * Return : grid 속성 값
		 * ----------------------------------------------------------------------------------*/
		// Grid의 속성 값을 얻는 함수.
		getGridParam : function(pName) {

			return $(this).jqGrid('getGridParam', pName);
		}, // end getGridParam
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('getRowData', index);
		 * Desc : Grid의 데이타 값을 얻는 함수.
		 * Parameter : index (grid row 인덱스)
		 * Return : grid row 데이타
		 * ----------------------------------------------------------------------------------*/
		// Grid의 데이타 값을 얻는 함수.
		getRowData : function(index) {

			return $(this).jqGrid('getRowData', index);
		}, // end getRowData
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('clearGridData');
		 * Desc : Grid 데이타를 Clear 시키는 함수.
		 * Parameter :
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		// Grid 데이타를 Clear 시키는 함수.
		clearGridData : function() {
			return this.each(function() {
				$(this).jqGrid('clearGridData');
			});
		}, // end clearGridData
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('gridToForm', formid, rowid);
		 * Desc : 선택된 Row의 데이타를 Form으로 바인딩하는 함수.
		 * Parameter : formid (그리드와 바인딩 되는 Form 아이디)
		 * 				rowid (바인딩 되는 그리드 row 아아디)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		// 선택된 Row의 데이타를 Form으로 바인딩하는 함수.
		gridToForm : function(formid, rowid) {
			return this.each(function() {
				if ($.util.isNull(rowid)) {
					rowid = $(this).grid('getGridParam', 'selrow');
				}
				$(this).jqGrid('GridToForm', rowid, formid);
			});
		}, // end gridToForm
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('editFormToGrid', formid, rowid);
		 * Desc : 바인딩 된 Form의 값이 바뀌면 그리드에 칼럼도 바뀌게 하는 함수.
		 * Parameter : formid (그리드와  바인딩 되는 Form 아이디)
		 * 				rowid (바인딩 되는 그리드 row 아아디)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		// 바인딩 된 Form의 값이 바뀌면 그리드에 칼럼도 바뀌게 하는 함수.
		editFormToGrid : function(formid, rowid) {
			return this.each(function() {
				if ($.util.isNull(rowid)) {
					rowid = $(this).grid('getGridParam', 'selrow');
				}
				$(this).jqGrid('FormToGrid', rowid, formid, 'set');
			});
		}, // end editFormToGrid
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('addFormToGrid', formid, rowid);
		 * Desc : 바인딩 된 Form의 값을 그리드에 add시키는 함수.
		 * Parameter : formid (그리드와 바인딩 되는 Form 아이디)
		 * 				rowid (바인딩 되는 그리드 row 아아디)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		addFormToGrid : function(formid, rowid) {
			return this.each(function() {
				if (!$.util.isNull(rowid)) {
					rowid = $(this).grid('getGridParam', 'selrow');
				}
				$(this).jqGrid('FormToGrid', rowid, formid, 'add');
			});
		}, // end addFormToGrid
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('selectData', uurl, formid);
		 * Desc : grid 데이타를 재조회하는 함수.
		 * Parameter : uurl (조회하는 url)
		 * 				formid (그리드와 바인딩 되는 Form 아이디)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		selectData : function(uurl, formid) {
			return this.each(function() {

				// form값 세팅을 위해서 ..; 초기 한번 호출 되기 때문에 . 처음에는 2번 실행 됨;
				var gridEvents = $(this).grid('getGridParam');
				if ((gridEvents.loadBeforeSend != null)) {
					// console.log(gridEvents.loadBeforeSend);
					gridEvents.loadBeforeSend.apply(this, arguments);
				}

				// 나중에 formid 를 받아서 파라미터로 다 넘기기.
				var params = ($.util.isNull(formid)) ? "" : $("#" + formid).serialize();
				var url = uurl;
				var postDataArr = {};

				if (!$.util.isNull(params)) {
					url = (uurl.indexOf('?') > -1) ? uurl + "&" + params : uurl + "?" + params;
				}

				if (url.indexOf('?') > -1) {
					var getParams = url.substring(url.indexOf('?') + 1, url.length);
					var getParamsArr = getParams.split('&');
					for ( var i = 0; i < getParamsArr.length; i++) {
						// postDataArr[getParamsArr[i].split("=")[0]] =
						// decodeURIComponent(getParamsArr[i].split("=")[1]);
						postDataArr[getParamsArr[i].split("=")[0]] = getParamsArr[i].split("=")[1];
					}
					url = url.substring(0, url.indexOf('?'));
				}

				// if (!$.util.isNull(params)) {
				// url = (uurl.indexOf('?') > 0) ? uurl + "&" + params : uurl +
				// "?" + params;
				//
				// var paramArr = params.split("&");
				// for ( var i = 0; i < paramArr.length; i++) {
				// postDataArr[paramArr[i].split("=")[0]] =
				// paramArr[i].split("=")[1];
				// }
				//
				// if (uurl.indexOf('?') > 0) {
				// var getParams = uurl.substring(uurl.indexOf('?') + 1,
				// uurl.length);
				// var getParamsArr = getParams.split('&');
				// for ( var i = 0; i < getParamsArr.length; i++) {
				// postDataArr[getParamsArr[i].split("=")[0]] =
				// getParamsArr[i].split("=")[1];
				// }
				// }
				//
				// } else {
				// console.log('cccc');
				// if (uurl.indexOf('?') > 0) {
				// var getParams = uurl.substring(uurl.indexOf('?') + 1,
				// uurl.length);
				//
				// var getParamsArr = getParams.split('&');
				// for ( var i = 0; i < getParamsArr.length; i++) {
				// var key = getParamsArr[i].split("=")[0];
				// var value = getParamsArr[i].split("=")[1];
				// console.log(key + " : " + value);
				// postDataArr[key] = value;

				// }
				// }
				// }
				// url = uurl.indexOf('?') > 0 ? uurl.substring(0,
				// uurl.indexOf('?')) : uurl;

				console.log("url : " + url);
				console.log("postData :" + postDataArr);

				// 2013-06-13 URL 복사관련 추가 시작
				var gridCRUDUrl = $(this).grid('getGridParam', 'gridCRUDUrl');

				gridCRUDUrl.lastSelectedUrl = url;
				gridCRUDUrl.lastSelectedPostDataArr = postDataArr;
				// console.log(postDataArr);
				gridCRUDUrl.lastSelectedTargetPage = $(this).grid('getGridParam', 'page'); // 추가되는 부분
				gridCRUDUrl.lastSelectedSortOrder = $(this).grid('getGridParam', 'sord'); // 추가되는 부분
				gridCRUDUrl.lastSelectedSortIndex = $(this).grid('getGridParam', 'sidx'); // 추가되는 부분
				// 2013-06-13 URL 복사관련 추가 종료

				$(this).grid('setGridParam', {
					url : url,
					postData : postDataArr,
					mtype : 'POST',
					//datatype : "xml",
					datatype : "json",
					lastSelRow : 'none',
					originalData : null,
					updateData : null
				// rowEditable : true
				});
			});
		}, // end selectData
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('addRow');
		 * Desc : 그리드의 row을 추가하는 함수.
		 * Parameter :
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		addRow : function() {
			return this.each(function() {
				$(this).jqGrid('addRow');
			});
		}, // end addRow
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('delRowData', rowid, formid);
		 * Desc : grid의 선택된 row을 삭제하는 함수.
		 * Parameter : rowid (삭제하는 그리드 row 아아디)
		 * 				formid (삭제하는 데이타의 값을 가지고 있는 form)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		delRowData : function(rowid, formid) {
			var formStr = $("#" + formid).serialize();
			$(this).jqGrid('delRowData', rowid);

			return formStr;
		}, // end delRowData
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('addRowData', addrowid, data);
		 * Desc : 해당 row에 그리드의 row을 추가하는 함수.
		 * Parameter : addrowid (추가하고자 하는 그리드 row 아아디)
		 * 				data (추가하고자 하는 그리드 데이타)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		addRowData : function(addrowid, data) {
			return this.each(function() {
				$(this).jqGrid('addRowData', addrowid, ($.util.isNull(data)) ? {} : data);

			});
		}, // end addRowData
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('setGridStyle', style);
		 * Desc : Grid를 만들고 나서 그리드 스타일을 지정하는 함수.
		 * Parameter : style (스타일 종류)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		setGridStyle : function(style) {
			var theme = 'A';
			if (typeof gTheme != 'undefined' && gTheme != null && gTheme != '') {
				theme = gTheme;
			}

			var b2cPopupTheme = {
				headerBorderTopCss : {
					A : '2px solid #4d95c9',
					B : '2px solid #4d95c9',
					C : '2px solid #4d95c9',
					D : '2px solid #4d95c9',
					E : '2px solid #4d95c9'
				},
				headerBorderBottomCss : {
					A : '1px solid #c9c9c9',
					B : '1px solid #c9c9c9',
					C : '1px solid #c9c9c9',
					D : '1px solid #c9c9c9',
					E : '1px solid #c9c9c9'
				},
				lastThBorderRightCss : {
					A : '1px solid #f5f5f5',
					B : '1px solid #f5f5f5',
					C : '1px solid #f5f5f5',
					D : '1px solid #f5f5f5',
					E : '1px solid #f5f5f5'
				},
				bodyTdBorderBottomCss : {
					A : '#c9c9c9',
					B : '#c9c9c9',
					C : '#c9c9c9',
					D : '#c9c9c9',
					E : '#c9c9c9'
				},
				bodyTdBorderLeftCss : {
					A : '#c9c9c9',
					B : '#c9c9c9',
					C : '#c9c9c9',
					D : '#c9c9c9',
					E : '#c9c9c9'
				},
				bodyTdBorderRightCss : {
					A : '#c9c9c9',
					B : '#c9c9c9',
					C : '#c9c9c9',
					D : '#c9c9c9',
					E : '#c9c9c9'
				},
				bodyTrMouseoverBackgroundColor : {
					A : '#ffffd9',
					B : '#ffffd9',
					C : '#ffffd9',
					D : '#ffffd9',
					E : '#ffffd9'
				},
				bodyTrMouseoutBackgroundColor : {
					A : '#fff',
					B : '#fff',
					C : '#fff',
					D : '#fff',
					E : '#fff'
				}
			};

			var target = $(this);
			var htable = '#gbox_' + target.attr('id');
			var btable = '#' + target.attr('id');

			// ie 7 버전일 경우.
			if ($.browser.msie) {
				if ($.browser.version == '7.0') {
					$a = $('.ui-jqgrid .ui-jqgrid-bdiv');
					$a.css('padding', '0 0 15px 0');
					$a.css('overflow-y', 'hidden');
				}
			}

			switch (style) {
			case 'b2c_popup':

				// header 부분 스타일 수정
				$(".ui-jqgrid-htable").css('font-size', '11px').css('border-top', (b2cPopupTheme['headerBorderTopCss'])[theme]).css('border-bottom',
						(b2cPopupTheme['headerBorderBottomCss'])[theme]);

				$(".ui-jqgrid-htable th").css('height', '28px').addClass('local-jqgrid-htable');
				$(".ui-jqgrid-htable th:last").css('border-right', (b2cPopupTheme['lastThBorderRightCss'])[theme]);

				// header의 이름들을 middle 정렬 시키기 위해서 강제로 높이 변경.
				$(".ui-jqgrid .ui-jqgrid-htable th div").css('height', '12px');

				// body 부분 스타일 수정
				$(".ui-jqgrid tr.jqgrow").css('font-size', '11px');
				$(".ui-jqgrid tr.jqgrow td").css('height', '28px').css('border-bottom-color', (b2cPopupTheme['bodyTdBorderBottomCss'])[theme]);

				$(".ui-jqgrid tr.ui-row-ltr td").css('border-right-color', (b2cPopupTheme['bodyTdBorderRightCss'])[theme]);
				$(".ui-jqgrid tr.ui-row-rtl td").css('border-left-color', (b2cPopupTheme['bodyTdBorderLeftCss'])[theme]);

				$(".ui-jqgrid tr.jqgrow").hover(function() {
					$(this).css('background', (b2cPopupTheme['bodyTrMouseoverBackgroundColor'])[theme]);
				}, function() {
					$(this).css('background', (b2cPopupTheme['bodyTrMouseoutBackgroundColor'])[theme]);
				});

				var cols = $(this).grid('getGridParam', 'colModel').length;
				for ( var c = 1; c <= cols; c++) {
					var classes = "tar";

					if (c == 1) {
						classes = "first k1_date_b";
					}
					if (c == cols) {
						classes = "last k1_date_b tar";
					}

					$(".ui-jqgrid tr.jqgrow td:nth-child(" + c + ")").addClass(classes);
				}
				break;

			case 'vof_list':
				$(btable).addClass('k1_vof_board');
				$(btable).css('border-top', '1px solid #fff');
				$(btable + ' .jqgfirstrow td').css('border-bottom', '1px solid #fff');
				// header 부분 스타일 수정
				$(".ui-jqgrid-htable").css('font-size', '11px').css('border-bottom', '1px solid #bfbfbf').css('border-top', '2px solid #4272d4');

				// 헤더병합문제 수정
				$(htable + " th:not(.ui-first-th-ltr)").css('height', '27px').css('border-right', '1px solid #d9d9d9').addClass('vof-jqgrid-htable');
				$(htable + " th.ui-th-column-header").css('border-bottom', '1px solid #d9d9d9');

				$(htable + " tr.jqgroup").css('display', 'none');
				$(htable + " tr.jqfoot").css('border-bottom', '1px solid #d9d9d9');
				$(htable + " tr.jqfoot td:last").css('border-right', '1px solid #f1f1f1');
				$(htable + " tr.jqfoot td:last").addClass('vof_last');

				// jquery-ui-1.8.24.custom.css와 충돌 요소 제거 시작
				$(htable + " th").removeClass('ui-state-default');
				$(htable + " .ui-widget-content").removeClass('ui-widget-content');
				$(btable + " tr").removeClass('ui-state-hover');// jqgrid에서 제거해야
				// 함
				// jquery-ui-1.8.24.custom.css와 충돌 요소 제거 종료

				// 헤더병합문제 수정
				// $(htable + " th:last").css('border-right', '1px solid
				// #f1f1f1');
				if ($(htable + " div.ui-state-default.ui-jqgrid-hdiv div table tr").length < 3) {
					$(htable + " div.ui-state-default.ui-jqgrid-hdiv div table th:last").css('border-right', '1px solid #f1f1f1');
				} else {
					if ($(htable + " div.ui-state-default.ui-jqgrid-hdiv div table tr:eq(1) th:last").attr('rowspan') !== undefined) {
						$(htable + " div.ui-state-default.ui-jqgrid-hdiv div table tr:eq(1) th:last").css('border-right', '1px solid #f1f1f1');
					} else {
						$(htable + " div.ui-state-default.ui-jqgrid-hdiv div table tr:eq(1) th:last").css('border-right', '1px solid #f1f1f1');
						$(htable + " div.ui-state-default.ui-jqgrid-hdiv div table tr:eq(2) th:last").css('border-right', '1px solid #f1f1f1');
					}
				}

				// header의 이름들을 middle 정렬 시키기 위해서 강제로 높이 변경.
				$(htable + " th div").css('height', '13px');

				// body 부분 스타일 수정
				$(btable + " tr.jqgrow").css('font-size', '11px');
				$(btable + " tr.jqgrow td").css('height', '23px').css('border-bottom', '1px solid #d9d9d9');

				$(btable + " tr.ui-row-ltr td").css('border-right-color', '#d9d9d9');
				$(btable + " tr.ui-row-rtl td").css('border-left-color', '#d9d9d9');

				// 데이타의 odd 마다 색깔을 틀리게 지정.
				$(btable + " tr.jqgrow").removeClass('bsky');// .addClass('vof-jqgrid-odd');
				$(btable + " tr.jqgrow:odd").removeClass('ui-widget-content').addClass('bsky');// .addClass('vof-jqgrid-odd');

				// frozen grid 추가 시작 (가로 스크롤시 고정 열 기능)
				// header
				$(".frozen-div.ui-state-default.ui-jqgrid-hdiv").css({
					"overflow-y" : "hidden",
					"height" : "30px"
				});

				// body 부분 스타일 수정
				$(".frozen-bdiv.ui-jqgrid-bdiv").css({
					"top" : "30px",
					"height" : $(btable).css("height")
				});

				// footer row
				$('.footrow td').css('border-bottom', '1px solid #d9d9d9').css('border-right', '1px solid #d9d9d9').css('border-top',
						'1px solid #ffffff').css('background-color', '#f1f1f1');
				$('.footrow td:last').css('border-right', '1px solid #ffffff');
				$('.footrow td:last').addClass('vof_last');

				// explorer 7.0버전 css 적용
				if (navigator.appVersion.indexOf("MSIE 7.0") >= 0) {
					$(".frozen-bdiv.ui-jqgrid-bdiv > table").css('border-top', '1px solid #fff');
					$('.frozen-bdiv.ui-jqgrid-bdiv > table .jqgfirstrow td').css('border-bottom', '1px solid #fff');
					$(".frozen-bdiv.ui-jqgrid-bdiv > table").addClass('k1_vof_board');
					$(".frozen-bdiv.ui-jqgrid-bdiv > table").css("height", $(btable).css("height"));
					$(".frozen-bdiv.ui-jqgrid-bdiv > table tr.jqgrow").css('font-size', '11px');
					$(".frozen-bdiv.ui-jqgrid-bdiv > table tr.jqgrow:even").css('background', "#FFFFFF");
					$(".frozen-bdiv.ui-jqgrid-bdiv > table tr.jqgrow").removeClass('bsky');
					$(".frozen-bdiv.ui-jqgrid-bdiv > table tr.jqgrow:odd").addClass('bsky');
					;// .addClass('vof-jqgrid-even');
					$(".frozen-bdiv.ui-jqgrid-bdiv > table tr.jqgrow:odd").removeClass('ui-widget-content');// .addClass('vof-jqgrid-odd');
					$(".frozen-bdiv.ui-jqgrid-bdiv > table tr.ui-row-ltr td").css('border-right-color', '#d9d9d9');
					$(".frozen-bdiv.ui-jqgrid-bdiv > table tr.ui-row-rtl td").css('border-left-color', '#d9d9d9');
					$(".frozen-bdiv.ui-jqgrid-bdiv > table tr.jqgrow td").css('height', '23px').css('border-bottom', '1px solid #d9d9d9');
				} else {
					$(btable + "_frozen").css('border-top', '1px solid #fff');
					$(btable + "_frozen .jqgfirstrow td").css('border-bottom', '1px solid #fff');
					$(btable + "_frozen").addClass('k1_vof_board');
					$(btable + "_frozen" + " tr.jqgrow").css('font-size', '11px');
					$(btable + "_frozen" + " tr.jqgrow td").css('height', '23px').css('border-bottom', '1px solid #d9d9d9');

					$(btable + "_frozen" + " tr.ui-row-ltr td").css('border-right-color', '#d9d9d9');
					$(btable + "_frozen" + " tr.ui-row-rtl td").css('border-left-color', '#d9d9d9');

					// 데이타의 odd 마다 색깔을 틀리게 지정.
					$(btable + "_frozen" + " tr.jqgrow:even").css('background', "#FFFFFF");
					$(btable + "_frozen tr.jqgrow").removeClass('bsky');
					$(btable + "_frozen" + " tr.jqgrow:odd").addClass('bsky');// .addClass('vof-jqgrid-even');
					$(btable + "_frozen" + " tr.jqgrow:odd").removeClass('ui-widget-content');// .addClass('vof-jqgrid-odd');
				}
				// frozen grid 추가 종료

				// 제일 마지막 td의 right-border를 없앤다.
				var cols = $(this).grid('getGridParam', 'colModel').length;
				$(btable + " tr.jqgrow td:nth-child(" + cols + ")").addClass('vof_last');

				break;

			default:
				break;
			}

			// 웹 접근성 때문에 추가함.
			$(this).grid('setWebAccess');
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('headColspan', cols, alignOpt);
		 * Desc : 그리드의 header에 제목 부분을 colspan 해야 하는 경우 사용한다.
		 * Parameter : cols (colspan 하는 제목 이름)
		 * 				alignOpt (colspan 할 때 제목의 정렬을 정의한다. )
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		headColspan : function(cols, alignOpt) {
			// alert($(this).attr('id'));
			if ($.util.isNull(cols) || cols.length == 0) {
				return;
			}

			var target = $(this);
			var colspanCnt = cols.length;
			var backColor = $('#' + target.attr('id') + '_' + cols[0]).css('background-color');

			// colspan 하는 필드들의 border를 숨긴다.
			$.each(cols, function(index) {
				if (index < (colspanCnt - 1)) {
					$('#' + target.attr('id') + '_' + cols[index]).css('border-right', '1px solid ' + backColor);
				}
			});

			// colspan 후 title의 align을 정한다.
			if (!$.util.isNull(alignOpt)) {
				$.each(alignOpt, function(index, value) {
					$('#' + target.attr('id') + '_' + cols[index - 1]).css('text-align', value);
				});
			}
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('dataToString', rowid, editYN);
		 * Desc : 해당 Row의 칼럼별 데이타를 String를 얻는 함수.
		 * Parameter : rowid (선택한 Row 아이디)
		 * 				editYN (edit 상태인지 여부)
		 * Return : 데이타 String
		 * ----------------------------------------------------------------------------------*/
		dataToString : function(rowid, editYN) {
			var $target = $(this);
			var colModel = $target.grid('getGridParam', 'colModel');
			var retVal = '';
			$.each(colModel, function(index, col) {
				if (col.editable) {
					var row = $target.grid('getRowData', rowid);
					var value = row[col.name];
					if (editYN) {
						value = (col.edittype == 'select') ? $('#' + $(row[col.name]).attr('id')).find('option:selected').text() : $(
								'#' + $(row[col.name]).attr('id')).val();
					}
					retVal += value + '/';
				}
			});

			// alert(retVal);
			return retVal;

		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('editDataRow', rowid);
		 * Desc : 해당 Row의 수정된 데이타를 배열로 얻는다.
		 * Parameter : rowid (선택한 Row 아이디)
		 *
		 * Return : 칼럼 이름과 값으로된 배열 값 ex)[colname:value, colname2:value2]
		 * ----------------------------------------------------------------------------------*/
		editDataRow : function(rowid) {
			var $target = $(this);
			var uptData = [];
			var colModel = $target.grid('getGridParam', 'colModel');
			$.each(colModel, function(index, col) {
				var row = null;
				if (col.editable) {
					row = $target.grid('getRowData', rowid);
					// alert()
					var value = $('#' + $(row[col.name]).attr('id')).val();
					uptData[col.name] = value;
				}
			});

			uptData['isUpdate'] = 'Y';
			return uptData;
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('setCombo', rowid);
		 * Desc : 전체 Row 또는 선택된 Row의 edittype = 'select' 이면
		 *         코드값이 아닌 text를 값으로 보이게 한다.
		 * Parameter : rowid (선택한 Row 아이디)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		setCombo : function(rowid) {
			var $target = $(this);
			var colModel = $target.grid('getGridParam', 'colModel');
			$.each(colModel, function(index, col) {
				if (col.edittype === 'select') {
					if ($.util.isNull(rowid)) {
						$.each($target.jqGrid('getDataIDs'), function(index, id) {
							$target.grid('setComboData', id, col);
						});
					} else {
						$target.grid('setComboData', rowid, col);
					}
				}
			});

		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('setComboData', rowid, col);
		 * Desc : 실제 combo의 코드값이 아닌 text 값을 칼럼에 보이게
		 *         setRowData 하는 함수
		 * Parameter : rowid (선택한 Row 아이디)
		 * 				col (칼럼의 정보)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		setComboData : function(rowid, col) {
			var $target = $(this);
			var row = $target.grid('getRowData', rowid);
			var value = row[col.name];
			var editoptions = col.editoptions.value;
			var startText = editoptions.indexOf(value + ':') + (value + ':').length;
			var endText = editoptions.indexOf(';', startText);
			if (endText === -1) {
				endText = editoptions.length;
			}
			var text = editoptions.substring(startText, endText);
			row[col.name] = text;
			$target.jqGrid('setRowData', rowid, row);
			// alert(text+" : "+value);

		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('jsonToString', data);
		 * Desc : 변경된 Row의 모든 데이타를 JSON 형태의 String으로 만드는 함수.
		 *
		 * Parameter : data (json data를 만들기 위한 key)
		 *
		 * Return : JSON 형태의 String
		 * ----------------------------------------------------------------------------------*/
		jsonToString : function(data) {
			var $target = $(this);
			jsonObj = '{ "' + data + '" : [';
			var colModel = $target.grid('getGridParam', 'colModel');
			var rows = $target.jqGrid('getDataIDs');
			var rowc = 0;

			$.each(rows, function(index, id) {
				var row = $target.grid('getRowData', id);
				if (row.isUpdate == 'Y') {
					if (rowc > 0) {
						jsonObj += ', ';
					}

					jsonObj += '{';
					$.each(colModel, function(index, col) {
						var value = row[col.name];
						if (col.edittype === 'select') {
							var text = row[col.name];
							var editoptions = col.editoptions.value;

							$.each(editoptions.split(';'), function(index, opt) {
								if (opt.indexOf(':' + text) > -1) {
									value = opt.substring(0, opt.indexOf(':' + text));
								}
							});
						}
						jsonObj += '"' + col.name + '" : "' + value + '"';
						if (index < (colModel.length - 1)) {
							jsonObj += ', ';
						}

					});
					jsonObj += '}';

					rowc++;
				}
			});

			jsonObj += ']}';

			return jsonObj;

		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('copyData', 복사 대상 grid id);
		 * Desc : 그리드의 체크된 데이터를 복사 대상 그리드에 추가하는 함수
		 *
		 * Parameter : grid id (target grid id)
		 * ----------------------------------------------------------------------------------*/
		dataCopy : function(target) {
			// 선택된 로우 (단건)
			var sel_row = $(this).getGridParam("selrow");
			// 선택된 로우(다건)
			var sel_ids = $(this).getGridParam('selarrrow');
			var rowdata = "";

			if ($(this).getGridParam("multiselect")) { // 다건복사
				if ($.trim(sel_ids)) {
					for ( var i = 0; i < sel_ids.length; i++) {
						rowdata = $(this).getRowData(sel_ids[i]);
						// array 데이터 추가 ======== mapping data 삭제 여부 - 추후 결정
						// =========
						// json_data2.push(rowdata);

						// 복사 데이터 tr id값 만들기
						var ids = $("#" + target).getDataIDs();
						ids.length == 0 ? ids = 0 : ids = ids.sort().pop();
						// 복사 데이터 삽입
						$("#" + target).jqGrid('addRowData', parseInt((ids)) + 1, rowdata);
					}
				} else {
					alert("등록할 행을 선택해 주세요.");
				}
			} else { // 단건 복사
				if ($.trim(sel_row)) {
					rowdata = $(this).getRowData(sel_row);
					// array 데이터 추가 ======== mapping data 삭제 여부 - 추후 결정
					// =========
					// json_data2.push(rowdata);

					// 복사 데이터 tr id값 만들기
					var ids = $("#" + target).getDataIDs();
					ids.length == 0 ? ids = 0 : ids = ids.sort().pop();
					// 복사 데이터 삽입
					$("#" + target).jqGrid('addRowData', parseInt((ids)) + 1, rowdata);
				} else {
					alert("등록할 행을 선택해 주세요.");
				}
			}

			// 선택 row 해제
			$(this).resetSelection();
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('setEditRowToGrid', row id);
		 * Desc : 수정한 row의 값들을 그리드에 적용(저장 안 함)
		 *
		 * Parameter : row id
		 * ----------------------------------------------------------------------------------*/
		setEditRowToGrid : function(rowid) {
			var $target = $(this);
			var colModel = $target.grid('getGridParam', 'colModel');
			var colNames = $target.grid('getGridParam', 'colNames');
			var data = new Array();
			var flag = true;

			$.each(colModel, function(index, col) {
				var value = null;

				if (col.editable && col.name != 'cb') {
					value = $('#' + rowid + '_' + col.name).val();

					// // // 진규
					// if (typeof colModel[index].formatoptions != 'undefined') {
					// if (typeof colModel[index].formatoptions.dateformat != 'undefined') {
					// if (!$.util.isNull(value) && !$.date.isDate(value)) {
					// flag = false;
					// return false;
					// }
					// if (!$.util.isNull(value)) {
					// value = value.replace(/[_-]/gi, "");
					// }
					//
					// }
					// }

					data[col.name] = value;
					if (col.validate) {
						for ( var i = 0; i < col.validate.fnc.length; i++) {
							var ret = col.validate.fnc[i](value, colNames[index], col.validate.limit[i]);
							if (!ret[0]) {
								alert(ret[1]);
								flag = ret[0];
								return false;
							}
						}
					}

				}
				// else if (!col.editable && col.name != 'cb') {
				// value = $('#' + rowid + ' td[aria-describedby="' + $target.attr('id') + '_' + col.name + '"]').text();
				// }
				// if (col.validate) {
				// for ( var i = 0; i < col.validate.fnc.length; i++) {
				// var ret = col.validate.fnc[i](value, colNames[index], col.validate.limit[i]);
				// if (!ret[0]) {
				// alert(ret[1]);
				// flag = ret[0];
				// return false;
				// }
				// }
				// }
				// if (col.name != 'cb') {
				// data[col.name] = value;
				// }

			});
			if (!flag) {
				return flag;
			}

			$target.jqGrid('restoreRow', rowid);
			$target.jqGrid('setRowData', rowid, data);

			var orgData = $target.grid('getGridParam', 'originalData')[rowid];
			var uptData = $target.jqGrid('getRowData', rowid);

			var udata = null;
			var updateData = $target.grid('getGridParam', 'updateData');

			for (key in uptData) {
				if (orgData[key] != uptData[key]) {
					if (udata == null) {
						udata = {};
					}
					udata[key] = uptData[key];
				}
			}
			// console.log('---------udata--------- ');
			// console.log(udata);
			if (udata != null) {
				if (updateData == null) {
					updateData = {};
				}

				updateData[rowid] = udata;
				$target.jqGrid('setGridParam', {
					updateData : updateData
				});
			} else {
				if (updateData != null) {
					if (updateData[rowid] !== undefined) {
						updateData[rowid] = null;
						$target.jqGrid('setGridParam', {
							updateData : updateData
						});
					}
					// console.log('---------updateData--------- ');
					// console.log(updateData);
					// console.log(updateData);
				}
			}

			// console.log('---------final--------- ');
			// console.log($target.grid('getGridParam', 'updateData'));
			// console.log('<<<<<<<<<<<<<<<<>>>>>>>>>>>>');
			return flag;
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('editRow', row id, edit options);
		 * Desc : row id의 row를 수정 가능 입력 폼으로 만든다.
		 *
		 * Parameter : row id, edit options
		 * ----------------------------------------------------------------------------------*/
		editRow : function(rowid, options) {
			return this.each(function() {
				var editparameters = {
					"keys" : false,
					"oneditfunc" : null,
					"successfunc" : null,
					"url" : null,
					"extraparam" : {},
					"aftersavefunc" : null,
					"errorfunc" : null,
					"afterrestorefunc" : null,
					"restoreAfterError" : true,
					"mtype" : "POST"
				};
				if (!$.util.isNull(options)) {
					$.extend(true, editparameters, options);
				}

				if ($.util.isNull($(this).grid('getGridParam', 'originalData'))) {
					var ids = $(this).jqGrid('getDataIDs');
					var orgDataArr = {};
					for ( var i = 0; i < ids.length; i++) {
						var row = $(this).grid('getRowData', ids[i]);
						orgDataArr[ids[i]] = row;
					}
					$(this).jqGrid('setGridParam', {
						originalData : orgDataArr
					});
					// console.log(orgDataArr);
				}
				$(this).jqGrid('editRow', rowid, editparameters);
			});
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('getDataIds');
		 * Desc : 현재 그리드 페이지의 row Id 집합을 구한다.
		 *
		 * Parameter :
		 * Return : row ids array
		 * ----------------------------------------------------------------------------------*/
		getDataIds : function() {
			return $(this).jqGrid('getDataIDs');
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('getColData', colnm, returntype, mathoperation);
		 * Desc : 컬럼단위 데이터의 집합 또는 수치를 구한다.
		 *
		 * Parameter : colnm(컬럼명 또는 컬럼 index)
		 *             returntype(true : array return, false : value return)
		 *             mathoperation(sum, avg, count)
		 * Return : array or value
		 * ----------------------------------------------------------------------------------*/
		getColData : function(colnm, returntype, mathoperation) {
			return $(this).jqGrid('getCol', colnm, returntype, mathoperation);
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('setSummaryFooter', option);
		 * Desc : footer row에 summary 데이터를 채워주는 함수
		 *
		 * Parameter : option(컬럼명과 summary형식의 집합)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		setSummaryFooter : function(option) {
			var footerData = {};
			for ( var i = 0; i < option.col.length; i++) {
				footerData[option.col[i]] = option.cal[i];
			}
			$(this).jqGrid('footerData', 'set', footerData);
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('openRowEdit');
		 * Desc : 그리드의 row를 클릭시 수정 가능한 모드로 변경
		 * Parameter : option(edit option)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		openRowEdit : function(option) {
			var rowEditable = $(this).grid('getGridParam', 'rowEditable');
			var lastsel = $(this).grid('getGridParam', 'lastSelRow');
			var pkeys = $(this).grid('getGridParam', 'constraints')['pkey'];
			var colModel = $(this).grid('getGridParam', 'colModel');

			$.each(colModel, function(index, col) {
				for ( var i = 0; i < pkeys.length; i++) {
					if (col.name == pkeys[i]) {
						(colModel[index]).editable = false;
					}
				}
			});

			// $(this).grid('setGridParamNoReload', {
			// colModel : colModel
			// });

			if (option.rowid && option.rowid !== lastsel && rowEditable) {
				// if (rowEditMode == 'U') {
				if (lastsel !== 'none') {
					var flag = $(this).grid('setEditRowToGrid', lastsel);
					if (!flag) {
						return;
					}
				}
				$(this).grid('editRow', option.rowid, option);
				$(this).jqGrid('setGridParam', {
					lastSelRow : option.rowid
				});
				// } else if (rowEditMode == 'I') {

				// }
			}
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('addRowWithoutUpdate');
		 * Desc : 그리드의 row를 추가. 신규 row외엔 입력 불가
		 * Parameter :
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		addRowWithoutUpdate : function() {
			return this.each(function() {
				var thisid = $(this).attr('id');
				var newRowCnt = $('#' + thisid + ' tr[id*="newrow"]');

				var pkeys = $(this).grid('getGridParam', 'constraints')['pkey'];
				var pkeysEditable = $(this).grid('getGridParam', 'constraints')['editable'];
				var colModel = $(this).grid('getGridParam', 'colModel');

				$.each(colModel, function(index, col) {

					for ( var i = 0; i < pkeys.length; i++) {
						if (col.name == pkeys[i]) {
							if (typeof pkeysEditable != 'undefined' && typeof pkeysEditable[i] == 'boolean') {
								colModel[index].editable = pkeysEditable[i];
							} else {
								colModel[index].editable = false;
							}
						}
					}

				});

				var addRowOption = {
					rowID : "newrow" + newRowCnt.length,
					position : "first"
				// initdata : {},
				// useDefValues : true, //디폴트값 사용 여부
				// useFormatter : false, //포매터 사용 여부
				// addRowParams : {
				// extraparam : {} //editOPtion
				// }
				};
				$(this).jqGrid('addRow', addRowOption);
				$(this).jqGrid('setGridParam', {
					rowEditable : false
				});

			});
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('getUpdateColDataByJsonString');
		 * Desc : 업데이트 되거나 신규 생성된 데이터를 json형태의 문자열로 반환
		 * Parameter :
		 * Return : string
		 * ----------------------------------------------------------------------------------*/
		getUpdateColDataByJsonString : function() {
			var dateChk = true;
			var jsonStr = '[\n';

			if ($(this).grid('getGridParam', 'rowEditable')) { // 업데이트data
				var cnt = 0;
				var updateData = $(this).grid('getGridParam', 'updateData');
				var pkey = $(this).grid('getGridParam', 'constraints')['pkey'];
				var colModel = $(this).grid('getGridParam', 'colModel');

				for (rowid in updateData) {
					var udata = updateData[rowid];
					// var tmpData = $(this).jqGrid('getRowData', rowid);

					if (udata != null) {
						if (cnt == 0) {
							jsonStr += '    {\n';
						} else {
							jsonStr += '  , {\n';
						}

						for ( var i = 0; i < pkey.length; i++) {
							if (i != 0) {
								jsonStr += '      , ';
							} else {
								jsonStr += '        ';
							}
							// jsonStr += '"' + pkey[i] + '" : "' +
							// tmpData[pkey[i]] + '"\n';

							jsonStr += '"' + pkey[i] + '" : "' + $(this).jqGrid('getCell', rowid, pkey[i]) + '"\n';
						}

						var udata = updateData[rowid];
						for (key in udata) {
							if (udata[key] != null) {
								jsonStr += '      , "' + key + '" : "' + udata[key] + '"\n';
							}
						}

						jsonStr += '    }\n';
						cnt++;
					}
				}
			} else { // 인서트data
				var rows = $('#' + $(this).attr('id') + ' tr[id*="newrow"]');
				var colModel = $(this).grid('getGridParam', 'colModel');
				var rowcnt = 0;
				$.each(rows, function(index, row) {
					var rowid = $(row).attr('id');
					var colcnt = 0;

					if (rowcnt == 0) {
						jsonStr += '    {\n';
					} else {
						jsonStr += '  , {\n';
					}
					$.each(colModel, function(idx, col) {
						var val = $('#' + rowid + '_' + col.name).val();

						// if (typeof colModel[idx].formatoptions != 'undefined') {
						// if (typeof colModel[idx].formatoptions.dateformat != 'undefined') {
						// if (!$.util.isNull(val) && !$.date.isDate(val)) {
						// dateChk = false;
						// return false;
						// }
						//
						// if (!$.util.isNull(val)) {
						// val = val.replace(/[_-]/gi, "");
						// }
						//
						// }
						// }

						if (!$.util.isNull(val)) {
							if (colcnt != 0) {
								jsonStr += '      , ';
							} else {
								jsonStr += '        ';
							}
							jsonStr += '"' + col.name + '" : "' + val + '"\n';
							colcnt++;
						}
					});
					jsonStr += '    }\n';
					rowcnt++;
				});
			}

			jsonStr += ']';

			if (dateChk == true) {
				return jsonStr;
			} else {
				return "dateEmpty";
			}

		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('setGridParamNoReload', option);
		 * Desc : Grid 속성을 정의하는 함수.
		 * Parameter : option (속성 옵션 값)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		setGridParamNoReload : function(option) {
			return this.each(function() {
				$(this).jqGrid('setGridParam', option);

			});
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('getCellData', rowid, iCol);
		 * Desc : Grid 특정셀의 값을 구하는 함수.
		 * Parameter : rowid(해당 row의 id)
		 *             iCol(해당 컬럼의 index 또는 컬럼명)
		 * Return : cell data
		 * ----------------------------------------------------------------------------------*/
		getCellData : function(rowid, iCol) {
			return $(this).jqGrid('getCell', rowid, iCol);
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('setPostDataFromForm', formId);
		 * Desc :
		 * Parameter :
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		setPostDataFromForm : function(formId) {
			var postDataArr = {};
			var params = $("#" + formId).serialize();
			var getParamsArr = params.split('&');
			for ( var i = 0; i < getParamsArr.length; i++) {
				// postDataArr[getParamsArr[i].split("=")[0]] =
				// decodeURIComponent(getParamsArr[i].split("=")[1]);
				postDataArr[getParamsArr[i].split("=")[0]] = getParamsArr[i].split("=")[1];
			}
			$(this).jqGrid('setGridParam', {
				postData : postDataArr
			});
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('restoreInputRow');
		 * Desc : 그리드의 inline row edit 상태를 해제
		 * Parameter :
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		restoreInputRow : function() {
			var rowEditable = $(this).grid('getGridParam', 'rowEditable');

			if (rowEditable) {
				var orgData = $(this).jqGrid('getGridParam', 'originalData');
				var uptData = $(this).jqGrid('getGridParam', 'updateData');
				var lastSelRow = $(this).grid('getGridParam', 'lastSelRow');

				for ( var key in uptData) {
					if (key != lastSelRow) {
						var rowData = orgData[key];
						$(this).jqGrid('setRowData', key, rowData);
					}
				}

				$(this).jqGrid('restoreRow', lastSelRow);
				$(this).jqGrid('setGridParam', {
					lastSelRow : 'none',
					updateData : null
				});
			} else {
				var gridId = $(this).attr('id');
				var rows = $('#' + $(this).attr('id') + ' tr[id*="newrow"]');

				$.each(rows, function(index, row) {
					var rowid = $(row).attr('id');
					// $('#' + gridId + ' tr[id="' + rowid + '"]').remove();
					$('#' + gridId).jqGrid('delRowData', rowid);
				});
			}
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('getSelectedRowsPKey2JsonString');
		 * Desc : 그리드에서 선택한 row의 pk키값 집합을 구한다.
		 * Parameter :
		 * Return : string
		 * ----------------------------------------------------------------------------------*/
		getSelectedRowsPKey2JsonString : function() {
			var rowids = $(this).grid('getGridParam', 'selarrrow');
			var pkey = $(this).grid('getGridParam', 'constraints')['pkey'];

			var jsonStr = '[\n';
			for ( var i = 0; i < rowids.length; i++) {
				if (i == 0) {
					jsonStr += '    {\n';
				} else {
					jsonStr += '  , {\n';
				}
				var rowdata = $(this).grid('getRowData', rowids[i]);
				for ( var j = 0; j < pkey.length; j++) {
					if (j == 0) {
						jsonStr += '        "' + pkey[j] + '":"' + rowdata[pkey[j]] + '"\n';
					} else {
						jsonStr += '      , "' + pkey[j] + '":"' + rowdata[pkey[j]] + '"\n';
					}
				}
				jsonStr += '    }\n';
			}
			jsonStr += ']';

			return jsonStr;
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).grid('newDataValidate');
		 * Desc : 그리드 신규입력 데이터를 체크한다.
		 * Parameter :
		 * Return : boolean
		 * ----------------------------------------------------------------------------------*/
		newDataValidate : function() {
			var colModel = $(this).grid('getGridParam', 'colModel');
			var colNames = $(this).grid('getGridParam', 'colNames');

			var coltitle = "";
			var msg;
			var flag = true;
			var newinput = $('select[id*="newrow"], input[id*="newrow"]');

			$.each(newinput, function(idx, input) {
				var colname = input.id.split('_')[1];
				var value = input.value;
				var fncArr = new Array();
				var limitArr = new Array();
				$.each(colModel, function(index, col) {
					if (col.name == colname) {
						coltitle = colNames[index];
						if (typeof col.validate != 'undefined') {
							fncArr = col.validate.fnc;
						}
						if (typeof col.validate != 'undefined') {
							limitArr = col.validate.limit;
						}
						return false;
					}
				});

				for ( var i = 0; i < fncArr.length; i++) {
					if (typeof limitArr != 'undefined' && limitArr.length != 0 && typeof limitArr[i] != 'undefined') {
						msg = fncArr[i](value, coltitle, limitArr[i]);
					} else {
						msg = fncArr[i](value, coltitle);
					}
					if (!msg[0]) {
						alert(msg[1]);
						flag = false;
						input.focus();
						break;
					}
				}
				if (!flag) {
					return false;
				}

			});
			return flag;
		},
		setWebAccess : function() {

			// grid table caption 태그 추가. 웹표준 때문에
			$('.ui-jqgrid-htable > thead').before('<caption>' + $(this).attr('id') + '</caption>');

			// header checkbox 레이블 지정. 웹표준 때문에
			$(".ui-jqgrid-htable").find('input:checkbox').each(function(index) {
				$('.ui-jqgrid-htable').append('<label for="' + $(this).attr('id') + '">' + '</label>');

			});
			// tbody checkbox 레이블 지정. 웹표준 때문에
			$(".ui-jqgrid-btable").find('input:checkbox').each(function(index) {
				$('.ui-jqgrid-btable').append('<label for="' + $(this).attr('id') + '">' + '</label>');

			});
			$(".ui-jqgrid-btable").find('input:text').each(function(index) {
				$('.ui-jqgrid-btable').append('<label for="' + $(this).attr('id') + '">' + '</label>');

			});

			$(".ui-jqgrid-btable").find('select').each(function(index) {
				$('.ui-jqgrid-btable').append('<label for="' + $(this).attr('id') + '">' + '</label>');

			});
			$(".ui-jqgrid-btable").find('textarea').each(function(index) {
				$('.ui-jqgrid-btable').append('<label for="' + $(this).attr('id') + '">' + '</label>');

			});
			$(".ui-jqgrid-btable").find('input:radio').each(function(index) {
				$('.ui-jqgrid-btable').append('<label for="' + $(this).attr('id') + '">' + '</label>');

			});

		}
	};

	$.fn.grid = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method || $.util.isNull(methods[method])) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
	};

})(jQuery);