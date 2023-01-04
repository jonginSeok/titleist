<%--
  Class Name : EgovLoginLogList.jsp
  Description : 로그인 로그 정보목록 화면(jqGrid 변환)
  Modification Information
 
      수정일         수정자                   수정내용
    -------    --------    ---------------------------
     2009.03.11  이삼섭              최초 생성
     2011.08.31   JJY       경량환경 버전 생성
 
    author   : 공통서비스 개발팀  이삼섭
    since    : 2009.03.11  
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.text.SimpleDateFormat,java.util.Date"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<% String version = "?version=" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()); %>

<link type="text/css" rel="stylesheet" href="/css/jquery-ui-themes-1.13.2/themes/redmond/jquery-ui.min.css">
<link type="text/css" rel="stylesheet" href="/css/jquery-ui-themes-1.13.2/themes/redmond/theme.css">
<link type="text/css" rel="stylesheet" href="/css/ui.jqgrid.css" />

<script type="text/javascript" src="/js/plugin/jquery.jqGrid.min.js<%=version%>"></script>
<script type="text/javascript" src="/js/plugin/grid.locale-kr.js<%=version%>"></script>

<script type="text/javascript" src="/js/lib/jquery.com.datepicker.js<%=version%>"></script>
<script type="text/javascript" src="/js/lib/jquery.com.util.js<%=version%>"></script><!-- $.gridformatter.dateTimeFormat -->

<script type="text/javascript" src="/js/egovframework/EgovCalPopup.js<%=version%>"></script>
<script type="text/javascript">
	/* ********************************************************
	 * PROTOTYPE JS FUNCTION
	 ******************************************************** */
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "");
	}

	String.prototype.replaceAll = function(src, repl) {
		var str = this;
		if (src == repl) {
			return str;
		}
		while (str.indexOf(src) != -1) {
			str = str.replace(src, repl);
		}
		return str;
	}

	//Grid title
	//var fv_g_title = [ '번호', '로그ID', '발생일자', '로그유형', '상세보기1', '상세보기2', '상세보기3' ]; // label

	//Grid Model
	var fv_g_model = [ {
		label : '번호',
		name : 'no',
		width : 15,
		editable : false,
		hidden : false,
		align : 'center',
		sorttype: 'integer',
	},/*번호*/
	{
		label : '로그ID',
		name : 'logId',
		width : 15,
		editable : false, // must set editable to true if you want to make the field editable
		hidden : false,
		key : true,
		align : 'center',
	}, /*로그ID*/
	{
		label : '발생일자',
		name : 'creatDt',
		width : 15,
		editable : true,
		hidden : false,
		align : 'center',
		formatter : 'date', formatoptions: { srcformat : 'Y-m-d H:i:s', newformat :'ShortDate'}
	},/*발생일자*/
	{
		label : '로그유형',
		name : 'loginMthd',
		width : 15,
		editable : true,
		hidden : false,
		align : 'center',
	},/*로그유형*/
	{
		label : '상세보기1',
		name : 'loginIp',
		width : 15,
		editable : true,
		hidden : false,
		align : 'center',
	},/*상세보기1*/
	{
		label : '상세보기2',
		name : 'loginId',
		width : 15,
		editable : false,
		hidden : true,
		align : 'center',
	},/*상세보기2*/
	{
		label : '상세보기3',
		name : 'loginNm',
		width : 15,
		editable : false,
		hidden : true,
		align : 'center',
	} /*상세보기3*/
	];
	// sorttype is used only if the data is loaded locally or loadonce is set to true

	var fv_g_options = {
		//옵션에 multiselect:true 부분을 추가하면 그리드 목록 전체선택/전체 해제가 가능하다. 
		multiselect : true,
		pager : '#jqGridPager',
		rowNum : 10,
		rowList : [ 10, 20, 30, 40, 50 ],
		jsonReader : {
			root : "resultList",
			page : "paginationInfo>currentPageNo", //현재 페이지
			total : "paginationInfo>totalRecordCount", //
			records : "paginationInfo>recordCountPerPage", //총 row 수
			id : "logId",
			repeatitems : false,
		},
		//합계로우 보여주기
		//footerrow : true
	};

	var fv_g_events = {
		loadComplete : fn_loadComplete,
		onSelectRow : fn_onSelectRow,
		ondblClickRow : fn_ondblClickRow,
		onRightClickRow : fn_onRightClickRow,
		paging : fn_paging,

	};
	
	var fv_g_uurl = "/sym/log/clg/SelectLoginLogListAjax.do";

	/*
	 * 화면로드 이벤트. 지역함수는 fn_ , 전역(grobal, 공통)함수는 gfn_ 으로 작성
	 */
	$(document).ready(function(event) {

		// 조회조건 발생일자
		$("#searchEndDe").datepicker({
			id : 'searchEndDe_datePicker',
			dateFormat : 'yy-mm-dd',
			minDate : new Date(1910, 0, 1),
			maxDate : new Date(2025, 0, 1),
			showOn : 'focus'
		}).datepicker("setDate", new Date());
		//.datepicker({ defaultDate: '01/01/01' });

		$("#searchBgnDe").datepicker({
			id : 'searchBgnDe_datePicker',
			dateFormat : 'yy-mm-dd',
			minDate : new Date(1910, 0, 1),
			maxDate : new Date(2025, 0, 1),
			showOn : 'focus'
		}).datepicker("setDate", $.date.diffDate($("#searchEndDe").val(), -4));
		
		
		// 기본 Grid
		$("#jqGrid").jqGrid({
			url : fv_g_uurl,	
			colModel : fv_g_model,
			mtype: 'post',
			datatype : 'json',
			viewrecords: true, // show the current page, data rang and total records on the toolbar
			onSelectRow: editRow, // the javascript function to call on row click. will ues to to put the row in edit mode
			width : 780,
			height : 230,
			rowNum: 10,
            pager: "#jqGridPager",
            multiselect : true,
            jsonReader : {
    			root : "resultList",
    			page : "paginationInfo>currentPageNo", //현재 페이지
    			total : "paginationInfo>recordCountPerPage", //
    			records : "paginationInfo>totalRecordCount", //총 row 수
    			id : "logId",
    			repeatitems : false,
    		},
    		//direction: "rtl", // instructs the grid to use RTL settings
    		//footerrow: true,
            //userDataOnFooter: true, // use the userData parameter of the JSON response to display data on footer
			//scroll: 1, // set the scroll property to 1 to enable paging with scrollbar - virtual loading of records
			//scrollPopUp:true,
			//scrollLeftOffset: "83%",
			//emptyrecords: 'Scroll to bottom to retrieve new page', // the message will be displayed at the bottom
		});
		
		//fetchGridData();
		
		var lastSelection;

        function editRow(id) {
        	console.log("#editRow("+id+") , lastSelection=" + lastSelection + " , (id !== lastSelection)?"+(id !== lastSelection));
            if (id && id !== lastSelection) {
                var grid = $("#jqGrid");
                grid.jqGrid('restoreRow',lastSelection);
                grid.jqGrid('editRow',id, {
					keys: true,
					onEnter : function(rowid, options, event) {
						console.log("#onEnter("+rowid+","+options+","+event+")");
						if (confirm("Save the row with ID: "+rowid) === true) {
							$(this).jqGrid("saveRow", rowid, options );
						}
					}
				});
                lastSelection = id;
                console.log("- fetchGridData lastSelection:"+lastSelection);
            }
        }

    	function fetchGridData() {
            console.log("- fetchGridData S");
            var gridArrayData = [];
    		// show loading message
    		//$("#jqGrid")[0].grid.beginReq();
            $.ajax({
                url: fv_g_uurl,
                dataType : 'json',
                success: function (result) {
                    
                	console.log("#결과#" + result);
                	//console.log("#결과JSON.stringify#" + JSON.stringify(result));
                	
                	
                	var resultList = result.resultList;
                	//console.log("#resultList#" + resultList.length);
                	
                	for (var i = 0; i < resultList.length; i++) {
                        var item = resultList[i];
                        gridArrayData.push({
                        	no			: item.no,
                        	logId		: item.logId,
                        	creatDt		: item.creatDt,
                        	loginMthd	: item.loginMthd,
                        	loginIp		: item.loginIp,
                        	loginId		: item.loginId,
                        	loginNm		: item.loginNm,
                        });
                        //console.log("#gridArrayData#" + JSON.stringify(gridArrayData));
                    }
    				// set the new data
    				$("#jqGrid").jqGrid('setGridParam', { data: gridArrayData});
    				
    				// hide the show message
    				//$("#jqGrid")[0].grid.endReq(); // blockUI
    				
    				// refresh the grid
    				//$("#jqGrid").trigger('reloadGrid');
                }
            });
            console.log("- fetchGridData E");
        }

		// 조회클릭
		$('#search').bind('click', function() {
			var url = '/sym/log/clg/SelectLoginLogListAjax.do';
			$("#jqGrid").grid('selectData', url, 'frm');
		});
	});
	

	function fn_loadComplete() {
		console.log("-fn_loadComplete s");
		var ids = $("#jqGrid").jqGrid('getDataIDs');

		// button 예제
		for (var i = 0; i < ids.length; i++) {
			var cl = ids[i];
			console.log("# cl:" + cl);
			chgPw = "<input style='height:22px;width:50px;' type='button' value='RESET' onclick=\"fn_rowBtnClick\"  />";
			$("#jqGrid").jqGrid('setRowData', ids[i], {
				loginIp : chgPw
			});
		}

		//Paging 
		var currentPage = $('#jqGrid').grid('getGridParam', 'page'); //현재 페이지
		var pageSize = $('#jqGrid').grid('getGridParam', 'rowNum'); //한 페이지당 보여 주는 row수
		var pageTotal = $('#jqGrid').grid('getGridParam', 'records'); //총 row 수
		var pageBlock = 10; //block으로 보여 주는 page 수
		var url = $('#jqGrid').grid('getGridParam', 'url'); //페이지 이동시 url
		var formid = ''; //페이지 이동시 param으로 넘겨야 하는 form id

		console.log("-fn_loadComplete currentPage:" + currentPage
				+ " pageSize:" + pageSize + " pageTotal:" + pageTotal
				+ " pageBlock:" + pageBlock + " url:" + url);

		console.log("-fn_loadComplete e");
	}

	function fn_rowBtnClick() {
		alert('버튼 클릭');
		return false;
	}

	function fn_onSelectRow(rowId, iRow, iCol) {
		console.log("-fn_onSelectRow rowId:" + rowId + " iRow:" + iRow
				+ " iCol:" + iCol);

		if (rowId) {
			var row = $("#jqGrid").jqGrid('getRowData', rowId);
			console.log("-fn_onSelectRow row:" + row + " row.no:" + row.no
					+ " row.logId:" + row.logId + " row.creatDt:" + row.creatDt
					+ " row.loginMthd:" + row.loginMthd);

		}
	}

	function fn_ondblClickRow() {
		console.log("-fn_ondblClickRow");

	}

	function fn_onRightClickRow() {
		console.log("-fn_onRightClickRow");

	}

	function fn_paging() {
		console.log("-fn_paging");

	}

	function fn_egov_select_loginLog(pageNo) {
		var fromDate = document.frm.searchBgnDe.value;
		var toDate = document.frm.searchEndDe.value;

		fromDate = fromDate.replaceAll('-', '');
		toDate = toDate.replaceAll('-', '');

		if (fromDate > toDate) {
			alert("종료일자는 시작일자보다  이후날짜로 선택하세요.");
			//return false;
		} else {
			/* submit 방식*/
			//document.frm.pageIndex.value = pageNo;
			//document.frm.action = "<c:url value='/sym/log/clg/SelectLoginLogList.do'/>";
			//document.frm.submit();
			/* jqGrid 조회 */
			var url = "/sym/log/clg/SelectLoginLogListAjax.do";
			$("#jqGrid").grid('selectData', url, 'frm');

		}
	}

	function fn_egov_inqire_loginLog(logId) {
		var url = "<c:url value ='/sym/log/clg/InqireLoginLog.do?logId='/>"
				+ logId;

		var openParam = "scrollbars=yes,toolbar=0,location=no,resizable=0,status=0,menubar=0,width=640,height=300,left=0,top=0";
		window.open(url, "p_loginLogInqire", openParam);
	}
</script>
<title>로그인 로그 목록</title>
<!-- 현재위치 네비게이션 시작 -->
<div id="content">
	<form name="frm" id="frm"
		action="<c:url value='/sym/log/SelectLoginLogList.do'/>" method="post">
		<input type="submit" id="invisible" class="invisible">
		<div id="cur_loc">
			<div id="cur_loc_align">
				<ul>
					<li>HOME</li>
					<li>&gt;</li>
					<li>내부서비스관리</li>
					<li>&gt;</li>
					<li>사용현황관리</li>
					<li>&gt;</li>
					<li><strong>접속로그관리</strong></li>
				</ul>
			</div>
		</div>

		<!-- 검색 필드 박스 시작 -->
		<div id="search_field">
			<div id="search_field_loc">
				<h2>
					<strong>로그인 로그조회</strong>
				</h2>
			</div>

			<input type="hidden" name="cal_url"
				value="<c:url value='/sym/cmm/EgovNormalCalPopup.do'/>" />
			<fieldset>
				<legend>조건정보 영역</legend>
				<div class="sf_start">
					<ul id="search_first_ul">
						<li>발생일자 <!-- input name="searchBgnDe" type="hidden"  value="<c:out value='${searchVO.searchBgnDe}'/>" -->

							<%-- <input name="searchBgnDe" type="text" size="10" value="${searchVO.searchBgnDe}" readonly="readonly" onclick="javascript:fn_egov_NormalCalendar(document.frm, document.frm.searchBgnDe);" title="시작일자입력">
							<a href="javascript:fn_egov_NormalCalendar(document.frm, document.frm.searchBgnDe);" style="selector-dummy: expression(this.hideFocus = false);">
								<img src="<c:url value='/images/egovframework/com/cmm/icon/bu_icon_carlendar.gif' />" alt="달력창팝업버튼이미지" width="15" height="15"></a> ~ 
							<input name="searchEndDe" type="text" size="10" value="${searchVO.searchEndDe}" readonly="readonly" onclick="javascript:fn_egov_NormalCalendar(document.frm, document.frm.searchEndDe);" title="종료일자입력">
							<a href="javascript:fn_egov_NormalCalendar(document.frm, document.frm.searchEndDe);" style="selector-dummy: expression(this.hideFocus = false);">
								<img src="<c:url value='/images/egovframework/com/cmm/icon/bu_icon_carlendar.gif' />" alt="달력창팝업버튼이미지" width="15" height="15"></a> --%>

							<input type="text" name="searchBgnDe" id="searchBgnDe" size="10"
							value="${searchVO.searchBgnDe}" readonly="readonly"
							title="시작일자입력"> ~ <input type="text" name="searchEndDe"
							id="searchEndDe" size="10" value="${searchVO.searchEndDe}"
							readonly="readonly" title="종료일자입력">
						</li>
					</ul>
					<ul id="search_second_ul">
						<li>
							<div class="buttons" style="float: right;">
								<%-- <a href="<c:url value='/sym/log/SelectLoginLogList.do'/>" onclick="javascript:fn_egov_select_loginLog('1'); return false;">
									<img src="<c:url value='/images/img_search.gif' />" alt="search">조회</a> --%>

								<button type="button" id="search" title="조회"
									style="background-repeat: no-repeat; overflow: hidden; margin-left: 8px; width: 70px; background-image: url('/images/img_search.gif');">조회</button>

								<a href="#LINK"
									onclick="document.frm.searchBgnDe.value=''; document.frm.searchEndDe.value=''; return false;">초기화</a>
							</div>
						</li>
					</ul>
				</div>
			</fieldset>
		</div>
		<!-- //검색 필드 박스 끝 -->
		<div id="page_info">
			<div id="page_info_align"></div>
		</div>
		<!-- table add start -->
		<div class="default_tablestyle">
			<table id="jqGrid">
				<!--  cellpadding="0" cellspacing="0" -->
				<%-- <caption>로그인 로그조회</caption>
				<colgroup>
					<col width="10%">
					<col width="20%">
					<col width="20%">
					<col width="20%">
					<col width="20%">
				</colgroup>
				<thead>
					<tr>
						<th scope="col" class="f_field" nowrap="nowrap">번호</th>
						<th scope="col" nowrap="nowrap">로그ID</th>
						<th scope="col" nowrap="nowrap">발생일자</th>
						<th scope="col" nowrap="nowrap">로그유형</th>
						<th scope="col" nowrap="nowrap">상세보기</th>
					</tr>
				</thead>
				<tbody>

					<c:forEach var="result" items="${resultList}" varStatus="status">
						<!-- loop 시작 -->
						<tr>
							<td nowrap="nowrap"><strong><c:out value="${(searchVO.pageIndex-1) * searchVO.pageSize + status.count}" /></strong></td>
							<td nowrap="nowrap"><c:out value="${result.logId}" /></td>
							<td nowrap="nowrap"><c:out value="${result.creatDt}" /></td>
							<td nowrap="nowrap"><c:out value="${result.loginMthd}" /></td>
							<td nowrap="nowrap"><a href="#LINK" onclick="javascript:fn_egov_inqire_loginLog('<c:out value="${result.logId}"/>'); return false;" style="selector-dummy: expression(this.hideFocus = false);">
								<img src="<c:url value='/images/search.gif'/>" alt="상세보기" width="15" height="15" align="middle"></a></td>
						</tr>
					</c:forEach>
				</tbody> --%>
			</table>
			<div id="jqGridPager"></div>
		</div>

		<!-- 페이지 네비게이션 시작 -->
		<%-- <div id="paging_div">
			<ul class="paging_align">
				<ui:pagination paginationInfo="${paginationInfo}" type="image" jsFunction="fn_egov_select_loginLog" />
			</ul>
		</div> --%>
		<!-- //페이지 네비게이션 끝 -->

		<input name="pageIndex" type="hidden"
			value="<c:out value='${searchVO.pageIndex}'/>" />
	</form>
</div>
<!-- //content 끝 -->