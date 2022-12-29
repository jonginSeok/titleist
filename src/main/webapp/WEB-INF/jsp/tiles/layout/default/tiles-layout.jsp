<%--
  Class Name : tiles-layout.jsp
  Description : tiles 화면구성 화면
  Modification Information
 
    수정일         		수정자                수정내용
  -------    	--------    ---------------------------
  2022.12.16    ngins7512   최초 생성
 
  author   : 다임정보 개발팀  석종인
  since    : 2022.12.16
--%>
<%@
	page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@
	taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%><%@
	taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%><%@
	taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%><%@
	taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%><%@
	taglib prefix="form" uri="http://www.springframework.org/tags/form"%><!-- 공통변수 처리 -->
<c:set var="CONTEXT_PATH" value="${pageContext.request.contextPath}" scope="application" />
<c:set var="RESOURCES_PATH" value="${CONTEXT_PATH}/resources" scope="application" />
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>

<%
SimpleDateFormat dtFormat = new SimpleDateFormat("yyyyMMddHHmmss");
// String 타입을 Date 타입으로 변환
Date date =  new Date();
String version = dtFormat.format(date);
%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Content-Language" content="ko">
<link rel="shortcut icon" href="//localhost/favicon.ico" />

<link type="text/css" rel="stylesheet" href="/css/egovframework/common.css?version<%=version%>" />


<script type="text/javascript" src="<c:url value='/'/>js/plugin/jquery-1.7.2.js?version<%=version%>"></script>
<script type="text/javascript" src="/js/plugin/jquery-ui-1.8.24.custom.js?version<%=version%>"></script>
<script type="text/javascript" src="/js/plugin/jquery.simplemodal.js?version<%=version%>"></script>
<script type="text/javascript" src="/js/plugin/jquery.validate.js?version<%=version%>"></script>
<script type="text/javascript" src="/js/plugin/jquery.blockUI.js?version<%=version%>"></script>
<script type="text/javascript" src="/js/plugin/XSLTransform.js?version<%=version%>"></script>
<script type="text/javascript" src="/js/lib/jquery.com.toxslt.js?version<%=version%>"></script>
<script type="text/javascript" src="/js/lib/jquery.com.datepicker.js?version<%=version%>"></script>
<script type="text/javascript" src="/js/lib/jquery.com.form.js?version<%=version%>"></script>
<script type="text/javascript" src="/js/lib/jquery.com.grid.js?version<%=version%>"></script>
<script type="text/javascript" src="/js/lib/jquery.com.util.js?version<%=version%>"></script>
<script type="text/javascript" src="/js/lib/jquery.com.uitab.js?version<%=version%>"></script>
<script type="text/javascript" src="/js/lib/jquery.com.pager.js?version<%=version%>"></script>
<script type="text/javascript" src="/js/common.js?version<%=version%>"></script>
<script type="text/javascript" src="/js/local_js.js?version<%=version%>"></script>
<script type="text/javascript" src="/js/lib/jquery.com.js?version<%=version%>"></script>

<script type="text/javascript">
	console.log('default:tiles-layout.jsp');
	var CONTEXT_PATH = "${CONTEXT_PATH}";
	var RESOURCES_PATH = "${RESOURCES_PATH}";
</script>
</head>
<body>
	<noscript>자바스크립트를 지원하지 않는 브라우저에서는 일부 기능을 사용하실 수 없습니다.</noscript>
	<!-- 전체 레이어 시작 -->
	<div id='wrap'>
		<!-- header 시작 -->
		<div id="header">
			<tiles:insertAttribute name="header" />
		</div>
		<div id="topnavi">
			<c:import url="/sym/mms/EgovMainMenuHead.do" />
		</div>
		<!-- //header 끝 -->
		<!-- container 시작 -->
		<div id="container">
			<!-- 좌측메뉴 시작 -->
			<div id="leftmenu">
				<c:import url="/sym/mms/EgovMainMenuLeft.do" />
			</div>
			<!-- //좌측메뉴 끝 -->
			<tiles:insertAttribute name="body" />
		</div>
		<!-- //container 끝 -->
		<!-- footer 시작 -->
		<div id="footer">
			<tiles:insertAttribute name="foot" />
		</div>
		<!-- //footer 끝 -->
	</div>
</body>
<!-- //전체 레이어 끝 -->
</html>