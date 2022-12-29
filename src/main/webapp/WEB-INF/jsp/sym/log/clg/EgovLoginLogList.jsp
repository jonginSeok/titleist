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
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!-- jqGrid -->
<link type="text/css" rel="stylesheet" href="/css/jquery-ui-themes-1.13.2/themes/base/jquery-ui.min.css">
<link type="text/css" rel="stylesheet" href="/css/jquery-ui-themes-1.13.2/themes/base/theme.css">
<link type="text/css" rel="stylesheet" href="/css/ui.jqgrid.css" />
<script type="text/javascript" src="<c:url value='/js/plugin/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/plugin/grid.locale-kr.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/egovframework/EgovCalPopup.js'/>"></script>
<script type="text/javascript">

	/* ********************************************************
	 * PROTOTYPE JS FUNCTION
	 ******************************************************** */
	String.prototype.trim = function(){
	    return this.replace(/^\s+|\s+$/g, "");
	}
	
	String.prototype.replaceAll = function(src, repl){
	     var str = this;
	     if(src == repl){return str;}
	     while(str.indexOf(src) != -1) {
	        str = str.replace(src, repl);
	     }
	     return str;
	}
	
	/*
	 * 화면로드 이벤트. 지역함수는 fn_ , 전역(grobal, 공통)함수는 gfn_ 으로 작성
	 */
	$(document).ready(function(event) {

		$("#searchEndDe").datepicker({
            id: 'searchEndDe_datePicker',
            dateFormat: 'yy-mm-dd',
            minDate: new Date(1910, 0, 1),
            maxDate: new Date(2025, 0, 1),
            showOn: 'focus'
        }).datepicker( "setDate" , new Date() );
        //.datepicker({ defaultDate: '01/01/01' });
        		
		// 조회조건 발생일자
		$("#searchBgnDe").datepicker({
            id: 'searchBgnDe_datePicker',
            dateFormat: 'yy-mm-dd',
            minDate: new Date(1910, 0, 1),
            maxDate: new Date(2025, 0, 1),
            showOn: 'focus'
        }).datepicker( "setDate" , $.date.diffDate($("#searchEndDe").val(), -4) );
		
		
		
		var uurl = "/sym/log/clg/SelectLoginLogListAjax.do";
		//1. 기본적인 Grid을 만든다. : 화면 로딩시 바로 데이타 조회
		$("#jqGrid").grid('init', uurl, title, model, options, events);
		
		// call the sortable method
		jQuery("#jqGrid").jqGrid('gridResize',{minWidth:350,maxWidth:850,minHeight:80, maxHeight:350});
		
		// Click on the Tabs below the see the relevant code for the example:
		$('#jqGrid').navGrid("#jqGridPager", {edit: false, add: false, del: false, refresh: false, view: false});
		
		$('#search').bind('click', function() {
			var url = '/sym/log/clg/SelectLoginLogListAjax.do';
			$("#jqGrid").grid('selectData', url, 'frm');
		});
	});
	
	//Grid title 
	var title = ['번호', '로그ID', '발생일자', '로그유형', '상세보기1', '상세보기2', '상세보기3'];
	
	//Grid Model
	var model = [
		/*번호*/		{name:'no'		 ,index:'no'       , align:'center', width:15},
		/*로그ID*/	{name:'logId'	 ,index:'logId'    , align:'center', width:15 , key:true} ,
		/*발생일자*/	{
					 name:'creatDt',
					 index:'creatDt',
					 align:'center',
					 width:15,
					 editable :true,
					 edittype:'text',
					 editoptions:{
						 // dataInit is the client-side event that fires upon initializing the toolbar search field for a column
                         // use it to place a third party control to customize the toolbar
                         dataInit: function (element) {
                                $(element).datepicker({
                                    id: 'creatDt_datePicker',
                                    dateFormat: 'M/d/yy',
                                    minDate: new Date(1910, 0, 1),
                                    maxDate: new Date(2025, 0, 1),
                                    showOn: 'focus'
                                });
                            }
						 
					 }
					 
					},
		/*로그유형*/	{name:'loginMthd',index:'loginMthd', align:'center', width:15 , editable :true },
		/*상세보기1*/{name:'loginIp'	 ,index:'loginIp'  , align:'center', width:15 , hidden:false,formatter: "actions",
            formatoptions: {
                keys: true,
                editOptions: {},
                addOptions: {},
                delOptions: {}
            }       },
		/*상세보기2*/{name:'loginId'	 ,index:'loginId'  , align:'center', width:15 , hidden:true},
		/*상세보기3*/{name:'loginNm'	 ,index:'loginNm'  , align:'center', width:15 , hidden:true}
	];

	var options = 	{
		//옵션에 multiselect:true 부분을 추가하면 그리드 목록 전체선택/전체 해제가 가능하다. 
		multiselect:true,	
		pager: '#jqGridPager', 	
		rowNum:10,
	   	rowList:[10,20,30,40,50],
        jsonReader : {
			root : "resultList",
			page : "paginationInfo>currentPageNo", //현재 페이지
			total : "paginationInfo>recordCountPerPage", //
			records : "paginationInfo>totalRecordCount", //총 row 수
			id : "logId",
			repeatitems : false,
		},
		//합계로우 보여주기
		//footerrow : true
	};
	
	var events = {
		loadComplete : fn_loadComplete,
		ondblClickRow : fn_ondblClickRow,
		onRightClickRow : fn_onRightClickRow
	};
	
	function fn_loadComplete() {
		console.log("-fn_loadComplete");

	}

	function fn_ondblClickRow() {
		console.log("-fn_ondblClickRow");

	}

	function fn_onRightClickRow() {
		console.log("-fn_onRightClickRow");

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
	<form name="frm" id="frm" action="<c:url value='/sym/log/SelectLoginLogList.do'/>" method="post">
		<input type="submit" id="invisible" class="invisible" >
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

			<input type="hidden" name="cal_url" value="<c:url value='/sym/cmm/EgovNormalCalPopup.do'/>" />
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
								
							<input type="text" name="searchBgnDe" id="searchBgnDe" size="10" value="${searchVO.searchBgnDe}" readonly="readonly" title="시작일자입력"> ~
							<input type="text" name="searchEndDe" id="searchEndDe" size="10" value="${searchVO.searchEndDe}" readonly="readonly" title="종료일자입력">
						</li>
					</ul>
					<ul id="search_second_ul">
						<li>
							<div class="buttons" style="float: right;">
								<%-- <a href="<c:url value='/sym/log/SelectLoginLogList.do'/>" onclick="javascript:fn_egov_select_loginLog('1'); return false;">
									<img src="<c:url value='/images/img_search.gif' />" alt="search">조회</a> --%>
								
								<button type="button" id="search" title="조회" style="background-repeat:no-repeat; overflow: hidden; margin-left: 8px; width: 70px; background-image: url('/images/img_search.gif');">조회</button>
								
								<a href="#LINK" onclick="document.frm.searchBgnDe.value=''; document.frm.searchEndDe.value=''; return false;">초기화</a>
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
			<table id="jqGrid"> <!--  cellpadding="0" cellspacing="0" -->
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
		
		<input name="pageIndex" type="hidden" value="<c:out value='${searchVO.pageIndex}'/>" />
	</form>
</div>
<!-- //content 끝 -->