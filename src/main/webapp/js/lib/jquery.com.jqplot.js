/* 바, 라인 차트
 * param1 : 조회 데이터
 */
(function($) {
	$.fn.barchart = function(arr) {
		// 초기화
		if ($.trim(arr) == "" || $.trim(arr.chartdata) == "") {
			arr = {
				"chartdata" : [ [ 0 ] ]
			};
		}

		var gttitle = "";
		var gbtitle = "";
		var gtitleshow;

		var lglabel = [];
		var lgshow = true;
		var lgplace = "outside";

		var tickformat;
		// var firefox;
		var charttype = $.jqplot.BarRenderer;

		// title
		if ($.trim(arr.title) == "") {
			gtitleshow = false;
		} else {
			gttitle = arr.title[0];
			gbtitle = $.trim(arr.title[1]);
			gtitleshow = true;
		}

		// legend
		if ($.trim(arr.legend) == "" || !arr.legendShow) {
			lgshow = false;
		} else {
			var len;
			$.trim(arr.lePosition) == "" ? (lgplace = "outside") : (lgplace = arr.lePosition), len = arr.legend.length;
			for ( var i = 0; i < len; i++) {
				lglabel.push({
					label : arr.legend[i]
				});
			}
		}
		// tickOptions
		if ($.trim(arr.unit) == "") {
			tickformat = '%d';
		} else {
			if (typeof (arr.unit[0]) == "boolean") {
				if (arr.unit[0]) {
					tickformat = "%'d" + $.trim(arr.unit[1]);
				} else {
					tickformat = "%d" + $.trim(arr.unit[1]);
				}
			} else {
				tickformat = "%d" + $.trim(arr.unit[0]);
			}
		}
		if ($.trim(arr.charttype) == "line" || $.trim(arr.charttype) == "lineOne") {
			charttype = $.jqplot.LineRenderer;
		}
		// 차트 생성
		$.jqplot($(this).attr("id"), arr.chartdata, {
			// The "seriesDefaults" option is an options object that will
			// be applied to all series in the chart.
			seriesColors : $.trim(arr.color) == "" ? "" : arr.color,
			seriesDefaults : {
				renderer : charttype,
				rendererOptions : {
					fillToZero : true,
					varyBarColor : $.trim(arr.charttype) == "barOne" ? true : false
				},
				pointLabels : {
					show : $.trim(arr.pointLabel) == "" ? false : true
				}

			},
			// Custom labels for the series are specified with the "label"
			// option on the series option. Here a series option object
			// is specified for each series.
			series : lglabel,
			grid : {
				backgroundColor : '#FFFFFF'
			},
			// Show the legend and put it outside the grid, but inside the
			// plot container, shrinking the grid to accomodate the legend.
			// A value of "outside" would not shrink the grid and allow
			// the legend to overflow the container.
			legend : {
				show : lgshow,
				placement : lgplace,
				location : $.trim(arr.legendAlign) == "" ? 'ne' : arr.legendAlign
			// compass direction, nw, n, ne, e, se, s, sw, w.
			// outside, outsideGrid, inside, insideGrid
			},
			axes : {
				// Use a category axis on the x axis and use our custom ticks.
				xaxis : {
					renderer : $.jqplot.CategoryAxisRenderer,
					ticks : ($.trim(arr.charttype) == "barOne" || $.trim(arr.charttype) == "lineOne") ? "" : arr.ticks,
					label : gbtitle
				},
				// Pad the y axis just a little so bars can get close to, but
				// not touch, the grid boundaries. 1.2 is the default padding.
				yaxis : {
					// pad : 1.05,
					// tickOptions: {formatString: '$%d'}
					// tickOptions: {formatString: "%'d원"}
					min : 0,
					tickOptions : {
						formatString : tickformat
					}
				}
			},
			title : {
				show : gtitleshow,
				text : gttitle,
				fontSize : 16
			},
			highlighter : {
				show : $.trim(arr.highlighter) == "" ? false : arr.highlighter,
				showLabel : true,
				tooltipAxes : 'y',
				sizeAdjust : 7.5,
				tooltipLocation : 'ne'
			}
		});

		// firefox legendBox 깨짐현상 방지
		var chartId = $(this).attr("id");
		if (lgshow && lgplace == "outside") {
			$("#" + chartId + " table.jqplot-table-legend").addClass("outside");
			$("#" + chartId + " table.jqplot-table-legend.outside").css("position", "relative");
		}
	};
})(jQuery);

// 가로 bar chart
(function($) {
	$.fn.wbarchart = function(arr) {
		// 초기화
		if ($.trim(arr) == "" || $.trim(arr.chartdata) == "") {
			arr = {
				"chartdata" : [ [ 0 ] ]
			};
		}

		var lglabel = [];
		var lgshow = true;
		var lgplace = "outside";

		var tickformat;

		var gttitle = "";
		var gbtitle = "";
		var gtitleshow;

		// title
		if ($.trim(arr.title) == "") {
			gtitleshow = false;
		} else {
			gttitle = arr.title[0];
			gbtitle = $.trim(arr.title[1]);
			gtitleshow = true;
		}

		// legend
		if ($.trim(arr.legend) == "" || !arr.legendShow) {
			lgshow = false;
		} else {
			var len;
			$.trim(arr.lePosition) == "" ? (lgplace = "outside") : (lgplace = arr.lePosition), len = arr.legend.length;
			for ( var i = 0; i < len; i++) {
				lglabel.push({
					label : arr.legend[i]
				});
			}
		}
		// tickOptions
		if ($.trim(arr.unit) == "") {
			tickformat = '%d';
		} else {
			if (typeof (arr.unit[0]) == "boolean") {
				if (arr.unit[0]) {
					tickformat = "%'d" + $.trim(arr.unit[1]);
				} else {
					tickformat = "%d" + $.trim(arr.unit[1]);
				}
			} else {
				tickformat = "%d" + $.trim(arr.unit[0]);
			}
		}
		// 차트생성
		$.jqplot($(this).attr("id"), arr.chartdata, {
			seriesColors : $.trim(arr.color) == "" ? "" : arr.color,
			seriesDefaults : {
				renderer : $.jqplot.BarRenderer,
				rendererOptions : {
					barDirection : 'horizontal',
					varyBarColor : $.trim(arr.charttype) == "wbarOne" ? true : false
				},
				pointLabels : {
					show : $.trim(arr.pointLabel) == "" ? false : true,
					location : 'e',
					edgeTolerance : -15
				}

			},
			series : lglabel,
			grid : {
				backgroundColor : '#FFFFFF'
			},
			legend : {
				show : lgshow,
				placement : lgplace,
				location : $.trim(arr.legendAlign) == "" ? 'ne' : arr.legendAlign
			},
			axes : {
				// Use a category axis on the x axis and use our custom ticks.
				xaxis : {
					tickOptions : {
						formatString : tickformat
					},
					label : gbtitle
				},
				// Pad the y axis just a little so bars can get close to, but
				// not touch, the grid boundaries. 1.2 is the default padding.
				yaxis : {
					renderer : $.jqplot.CategoryAxisRenderer
				}
			},
			title : {
				show : gtitleshow,
				text : gttitle,
				fontSize : 16
			}
		});

		// firefox legendBox 깨짐현상 방지
		var chartId = $(this).attr("id");
		if (lgshow && lgplace == "outside") {
			$("#" + chartId + " table.jqplot-table-legend").addClass("outside");
			$("#" + chartId + " table.jqplot-table-legend.outside").css("position", "relative");
		}
	};
})(jQuery);

// line - bar chart
(function($) {
	$.fn.lineBarchart = function(arr) {
		// 초기화
		if ($.trim(arr) == "" || $.trim(arr.chartdata) == "") {
			arr = {
				"chartdata" : [ [ 0 ] ]
			};
		}

		var lglabel = [];
		var lgshow = true;
		var lgplace = "outside";

		var tickformat;
		var tickformat2;
		var tickformat3;

		var gttitle = "";
		var gbtitle = "";
		var gtitleshow;

		// title
		if ($.trim(arr.title) == "") {
			gtitleshow = false;
		} else {
			gttitle = arr.title[0];
			gbtitle = $.trim(arr.title[1]);
			gtitleshow = true;
		}

		// legend
		if ($.trim(arr.legend) == "" || !arr.legendShow) {
			lgshow = false;
		} else {
			var len;
			$.trim(arr.lePosition) == "" ? (lgplace = "outside") : (lgplace = arr.lePosition), len = arr.legend.length;
			for ( var i = 0; i < len; i++) {
				lglabel.push(arr.legend[i]);
			}
		}
		// tickOptions
		if ($.trim(arr.unit) == "") {
			tickformat = '%d';
		} else {
			if (typeof (arr.unit[0]) == "boolean") {
				if (arr.unit[0]) {
					tickformat = "%'d" + $.trim(arr.unit[1]);
				} else {
					tickformat = "%d" + $.trim(arr.unit[1]);
				}
			} else {
				tickformat = "%d" + $.trim(arr.unit[0]);
			}
		}
		// tickOptions2
		if ($.trim(arr.unit2) == "") {
			tickformat2 = '%d';
		} else {
			if (typeof (arr.unit2[0]) == "boolean") {
				if (arr.unit2[0]) {
					tickformat2 = "%'d" + $.trim(arr.unit2[1]);
				} else {
					tickformat2 = "%d" + $.trim(arr.unit2[1]);
				}
			} else {
				tickformat2 = "%d" + $.trim(arr.unit2[0]);
			}
		}
		// tickOptions3
		if ($.trim(arr.unit3) == "") {
			tickformat3 = '%d';
		} else {
			if (typeof (arr.unit3[0]) == "boolean") {
				if (arr.unit3[0]) {
					tickformat3 = "%'d" + $.trim(arr.unit3[1]);
				} else {
					tickformat3 = "%d" + $.trim(arr.unit3[1]);
				}
			} else {
				tickformat3 = "%d" + $.trim(arr.unit3[0]);
			}
		}
		// 차트생성
		$.jqplot($(this).attr("id"), [ arr.chartdata, arr.chartdata2 ], {
			seriesColors : $.trim(arr.color) == "" ? "" : arr.color,
			cursor : {
				show : true
			},
			series : [ {
				pointLabels : {
					show : $.trim(arr.pointLabel) == "" ? false : arr.pointLabel
				},
				renderer : $.jqplot.BarRenderer,
				showHighlight : false,
				yaxis : 'y2axis',
				rendererOptions : {
					barWidth : 15,
					barPadding : -15,
					barMargin : 0,
					highlightMouseOver : false
				},
				label : lglabel[0]
			}, {
				label : lglabel[1]
			} ],
			grid : {
				backgroundColor : '#FFFFFF'
			},
			legend : {
				show : lgshow,
				placement : lgplace,
				location : $.trim(arr.legendAlign) == "" ? 'ne' : arr.legendAlign
			// outside, outsideGrid, inside, insideGrid
			},
			axesDefaults : {
				pad : 0
			},
			axes : {
				// These options will set up the x axis like a category axis.
				xaxis : {
					tickInterval : 1,
					tickOptions : {
						formatString : tickformat3
					},
					drawMajorGridlines : false,
					drawMinorGridlines : true,
					drawMajorTickMarks : false,
					rendererOptions : {
						tickInset : 0.5,
						minorTicks : 1
					},
					label : gbtitle
				},
				yaxis : {
					tickOptions : {
						formatString : tickformat
					},
					rendererOptions : {
						forceTickAt0 : true
					}
				},
				y2axis : {
					tickOptions : {
						formatString : tickformat2
					},
					rendererOptions : {
						// align the ticks on the y2 axis with the y axis.
						alignTicks : true,
						forceTickAt0 : true
					}
				}
			},
			highlighter : {
				show : $.trim(arr.highlighter) == "" ? false : arr.highlighter,
				showLabel : true,
				tooltipAxes : 'y',
				sizeAdjust : 7.5,
				tooltipLocation : 'ne'
			},
			title : {
				show : gtitleshow,
				text : gttitle,
				fontSize : 16
			}
		});

		// firefox legendBox 깨짐현상 방지
		var chartId = $(this).attr("id");
		if (lgshow && lgplace == "outside") {
			$("#" + chartId + " table.jqplot-table-legend").addClass("outside");
			$("#" + chartId + " table.jqplot-table-legend.outside").css("position", "relative");
		}
		if (lgplace == "outside") {
			// alert($("#" + chartId).width());
			$("#" + chartId + " table.jqplot-table-legend").css("left", $("#" + chartId).width());
		}
	};
})(jQuery);

/*
 * 파이차트 param1 : [[항목], [데이터]]
 */
(function($) {
	$.fn.piechart = function(data, chartdata) {
		var piedata = [];
		var titleshow = false;
		var titletext = "";

		if ($.trim(data) == "") {
			// piedata 초기화
			piedata = [ '' ];
		} else {
			for ( var i = 0; i < data[1].length; i++) {
				if ($.trim(data[0]) == "") {
					piedata[i] = [ "", data[1][i] ];
				} else {
					piedata[i] = [ data[0][i], data[1][i] ];
				}
			}
		}
		if ($.trim(chartdata.title) != "") {
			titleshow = true;
			titletext = chartdata.title[0];
		}
		// 차트생성
		$.jqplot($(this).attr("id"), [ piedata ], {
			seriesColors : $.trim(chartdata.color) == "" ? "" : chartdata.color,
			seriesDefaults : {
				// Make this a pie chart.
				renderer : jQuery.jqplot.PieRenderer,
				rendererOptions : {
					// Put data labels on the pie slices.
					// By default, labels show the percentage of the slice.
					showDataLabels : true
				}
			},
			grid : {
				backgroundColor : '#FFFFFF'
			},
			legend : {
				show : $.trim(data[0]) == "" ? false : true,
				location : $.trim(chartdata.legendAlign) == "" ? 'e' : chartdata.legendAlign,
				rendererOptions : {
					numberRows : $.trim(chartdata.legendRow) == "" ? "" : chartdata.legendRow
				},
				placement : $.trim(chartdata.lePosition) == "" ? 'inside' : chartdata.lePosition
			},
			title : {
				show : titleshow,
				text : titletext,
				fontSize : 16
			}
		});
	};
})(jQuery);

/*----------------------------------------------------------------------------------* 
 * Function : $(selector).ajaxchart({ajax param}, {chart param}); 
 * Desc : xml데이터를 호출 후 var, line, pie차트를 생성한다. 
 * Parameter : { 
 * 				type : "post" or "get" (default:get) , 
 * 				url : xml데이터 경로,
 * 				datatype : 전송받을 데이터 타입 ("xml", "html", "script", "json"등) default:xml,
 * 				data : 전송할 param 
 * 				}, 
 * 				{
 * 				charttype:차트 종류 (lineOne, barOne, wbarOne, line, bar, wbar, pie, lineBar)
 *				pointLabel:차트에 값 표시여부 (default:false)
 *				unit:[콤마여부(default:false), '단위'] 
 *				lePosition:범례 위치 (inside:그래프 안쪽, outside : 그래프 밖, default : outside)
 *				legendAlign:범례 방향 (nw, n, ne, e, se, s, sw, w)
 *				legendRow : 범례 line
 *				color : 색상 변경['#ffffff', '#dddddd']
 *				unit2:[콤마여부(default:false), '단위'] (line 차트 전용)
 *				highlighter : 데이터 포인트에 마우스 오버시 값 표시여부(line 차트 전용)
 * 				}
 * 	Return :
 *----------------------------------------------------------------------------------*/
(function($) {
	$.fn.ajaxchart = function(ajaxdata, chartdata) {
		var chartid = $(this).attr("id");
		// 차트 초기화
		$("#" + chartid).html("");
		$.ajax({
			type : $.trim(ajaxdata.type) == "" ? "POST" : ajaxdata.type,
			url : ajaxdata.url,
			dataType : $.trim(ajaxdata.datatype) == "" ? "xml" : ajaxdata.datatype,
			data : $.trim(ajaxdata.data) == "" ? {
				"" : ""
			} : ajaxdata.data,
			success : function(xml) {
				var data = new Array();
				var data2 = new Array();
				if ($(xml).find("graphs").find("graph").length > 0) {
					// 차트 범례
					var legend = new Array();
					if ($(xml).find("graphs").find("legend").length > 0) {
						$(xml).find("graphs").find("legend").find("data").each(function() {
							legend.push($.trim($(this).text()));
						});
						if (chartdata.charttype == "pie") {
							data[0] = legend;
						} else {
							chartdata.legend = legend;
						}
					}
					// 차트 x좌표 (line, bar chart)
					var ticks = new Array();
					if ($(xml).find("graphs").find("ticks").length > 0) {
						$(xml).find("graphs").find("ticks").find("data").each(function() {
							ticks.push($.trim($(this).text()));
						});
						chartdata.ticks = ticks;
					}
					// 차트 데이터
					$(xml).find("graphs").find("graph").each(function(index) {
						var points = new Array();
						if (chartdata.charttype == "lineBar") { // line-bar chart
							$(this).find("data").each(function(i) {
								var pointTick = new Array();
								pointTick.push(parseInt(chartdata.ticks[i]));
								pointTick.push(parseInt($.trim($(this).text())));
								points.push(pointTick);
							});
						} else if (chartdata.charttype == "wbar") { // 다중 가로 바 chart
							$(this).find("data").each(function(i) {
								var pointTick = new Array();
								pointTick.push(parseInt($.trim($(this).text())));
								pointTick.push(chartdata.ticks[i]);
								points.push(pointTick);
							});
						} else if (chartdata.charttype == "wbarOne") { // 가로 바 chart
							$(this).find("data").each(function(i) {
								var pointTick = new Array();
								pointTick.push(parseInt($.trim($(this).text())));
								pointTick.push(chartdata.ticks[i]);
								points.push(pointTick);
							});
						} else if (chartdata.charttype == "barOne" || chartdata.charttype == "lineOne") { // 바, 라인 바 chart
							$(this).find("data").each(function(i) {
								var pointTick = new Array();
								pointTick.push(chartdata.ticks[i]);
								pointTick.push(parseInt($.trim($(this).text())));
								points.push(pointTick);
							});
						} else { // line, point chart
							$(this).find("data").each(function() {
								points.push(parseInt($.trim($(this).text())));
							});
						}
						if (chartdata.charttype == "pie") { // 파이 데이터
							data[1] = points;
						} else if (chartdata.charttype == "lineBar") {
							data = points;
						} else { // bar, line 데이터
							data.push(points);
						}
					});
					// line-bar chart
					if (chartdata.charttype == "lineBar") { // line-bar chart
						var points = new Array();
						$(xml).find("graphs").find("graph2").each(function(index) {
							$(this).find("data").each(function(i) {
								var pointTick = new Array();
								pointTick.push(parseInt(chartdata.ticks[i]));
								pointTick.push(parseInt($.trim($(this).text())));
								points.push(pointTick);
							});
						});
						data2 = points;
					}
				} else {
					alert("조회된 데이터가 없습니다.");
					return;
				}
				chartdata.chartdata = data;
				if (chartdata.charttype == "pie") {
					$("#" + chartid).piechart(data, chartdata);
				} else if (chartdata.charttype == "wbar" || chartdata.charttype == "wbarOne") {
					$("#" + chartid).wbarchart(chartdata);
				} else if (chartdata.charttype == "lineBar") {
					chartdata.chartdata2 = data2;
					$("#" + chartid).lineBarchart(chartdata);
				} else {
					$("#" + chartid).barchart(chartdata);
				}
			},
			error : function(xhr, option, error) {
				alert(xhr.status); // 오류코드
				alert(error); // 오류내용
			}
		});
	};
})(jQuery);