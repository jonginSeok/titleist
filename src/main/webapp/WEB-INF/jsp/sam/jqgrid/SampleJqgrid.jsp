<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Language" content="ko" >
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Insert title here</title>
<link href="<c:url value='/'/>css/egovframework/common.css" rel="stylesheet" type="text/css" >
<link href="<c:url value='/'/>css/jqueryui/1.11.4/themes/redmond/jquery-ui.min.css" rel="stylesheet" type="text/css" >
<link href="<c:url value='/'/>css/jqgrid/4.15.5/ui.jqgrid.min.css" rel="stylesheet" type="text/css" >
<script type="text/javascript" src="<c:url value="/js/jquery/1.12.4/jquery.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/jqgrid/4.15.5/jquery.jqgrid.min.js"/>"></script>
<script type="text/javascript">
//<![CDATA[
$(function () {
    "use strict";
    $("#grid").jqGrid({
        colModel: [
            { name: "firstName" },
            { name: "lastName" }
        ],
        data: [
            { id: 10, firstName: "Angela", lastName: "Merkel" },
            { id: 20, firstName: "Vladimir", lastName: "Putin" },
            { id: 30, firstName: "David", lastName: "Cameron" },
            { id: 40, firstName: "Barack", lastName: "Obama" },
            { id: 50, firstName: "François", lastName: "Hollande" }
        ]
    });
});
//]]>

</script>
</head>
<body>
<table id="grid"></table>
</body>
</html>