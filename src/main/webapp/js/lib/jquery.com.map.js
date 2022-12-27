(function($) {
	var mapArray = {};
	var hotelArray = {};
	var trafficArray = {};
	var foodArray = {};
	var shopArray = {};
	var sightsArray = {};
	var gmapInfoWindow;
	var gmapTitleBar;

	$.gmap = {
		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.mapInit(String mapDivId, Array option);
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		mapInit : function(mapDivId, option) {
			var position = (option.location !== undefined) ? option.location : (new google.maps.LatLng(option.lat, option.lng));
			var mapOption = {};

			if (option.mapSize == 'normal') {
				mapOption = {
					center : position,
					disableDefaultUI : false,
					zoom : 12,
					mapTypeControl : true,
					mapTypeId : google.maps.MapTypeId.ROADMAP,
					zoomControl : true,
					zoomControlOptions : {
						style : google.maps.ZoomControlStyle.DEFAULT
					}
				};
			} else if (option.mapSize == 'small') {
				mapOption = {
					center : position,
					disableDefaultUI : true,
					draggable : false,
					disableDoubleClickZoom : true,
					scrollwheel : false,
					zoom : 12,
					mapTypeId : google.maps.MapTypeId.ROADMAP,
					zoomControl : false
				};
			}
			$.extend(true, mapOption, option);
			var tmpMap = new google.maps.Map(document.getElementById(mapDivId), mapOption);
			// 한화면에 지도를 여러개 배치할수도 있으므로 지도 div id를 키값으로 각각의 지도객체를 배열로 저장한다.
			mapArray[mapDivId] = tmpMap;

		},

		miniMapAddMarker : function(option) {
			var position = (option.location !== undefined) ? option.location : (new google.maps.LatLng(option.lat, option.lng));
			// 한화면에 지도를 여러개 배치할수도 있으므로 지도 div id를 키값으로 각각의 지도객체를 배열로 저장한다.
			var map = mapArray[option.target];
			// 한화면에 지도를 여러개 배치할수도 있으므로 지도 div id를 키값으로 각각의 마커객체를 배열로 저장한다.
			var markers = hotelArray[option.target];

			if (typeof markers == 'undefined') {
				markers = new Array();
			}

			var markerOption = {
				id : option.id,
				// 마커의 아이콘
				icon : "/htl/wfw/imgs/map/icon_hotel_" + option.type + ".png",
				position : position,
				animation : google.maps.Animation.DROP,
				map : map
			};

			var marker = new google.maps.Marker(markerOption);

			markers.push(marker);
			// 한화면에 지도를 여러개 배치할수도 있으므로 지도 div id를 키값으로 각각의 마커객체를 배열로 저장한다.
			hotelArray[option.target] = markers;
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.addMarker(Array option);
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		addMarker : function(option) {
			var map = mapArray[option.target];
			var markers;

			var iconImg = "/htl/wfw/imgs/map/icon_hotel_g.png";
			switch (option.markerType) {
			case "hotel":
				markers = hotelArray[option.target];
				// 호텔, 랜드마크 아이콘 구분
				if ($.util.isNull(option.type)) {
					iconImg = "/htl/wfw/imgs/map/icon_hotel_H.png";
				} else {
					iconImg = "/htl/wfw/imgs/map/icon_hotel_" + option.type + ".png";
				}
				break;
			case "traffic":
				markers = trafficArray[option.target];
				// 교통아이콘
				iconImg = "/htl/wfw/imgs/map/icon_spot_traffic.png";
				break;
			case "sights":
				markers = sightsArray[option.target];
				// 명소아이콘
				iconImg = "/htl/wfw/imgs/map/icon_spot_photo.png";
				break;
			case "food":
				markers = foodArray[option.target];
				// 맛집아이콘
				iconImg = "/htl/wfw/imgs/map/icon_spot_food.png";
				break;
			case "shop":
				markers = shopArray[option.target];
				// 쇼핑아이콘
				iconImg = "/htl/wfw/imgs/map/icon_spot_shop.png";
				break;
			}

			if (typeof markers == 'undefined') {
				markers = new Array();
			}

			var position = (option.location !== undefined) ? option.location : (new google.maps.LatLng(option.lat, option.lng));

			var markerOption = {
				map : map,
				id : option.id,
				icon : iconImg,
				position : position,
				animation : google.maps.Animation.DROP,
				name : option.name,
				intro : option.intro,
				img : option.img,
				type : option.type
			};
			var marker = new google.maps.Marker(markerOption);

			switch (option.markerType) {
			case "hotel":
				markers.push(marker);
				// 한화면에 지도를 여러개 배치할수도 있으므로 지도 div id를 키값으로 각각의 마커객체를 배열로 저장한다.
				hotelArray[option.target] = markers;
				// 랜트마크 제외 호텔일 경우만 정보창 띄움
				if (option.type == 'H') {
					// var infoWindowOption = {
					// marker : marker,
					// id : option.id,
					// location : position,
					// lat : option.lat,
					// lng : option.lng,
					// name : option.name,
					// intro : option.intro,
					// infoImg : option.img
					// };
					// $.gmap.creatHotelInfoWindow(infoWindowOption);

					// 마커 클릭하면 작은 약식 정보창 띄움
					google.maps.event.addListener(marker, "click", function(e) {
						$.gmap.drawInfoWindow({
							type : option.markerType,
							latlng : marker.getPosition(),
							color : '#cf0c2c',
							width : 200,
							heithg : 100,
							name : option.name,
							intro : option.intro,
							img : option.img,
							action : 'click',
							map : map,
							price : option.price,
							breakfastyn : option.breakfastyn,
							breakfastnm : option.breakfastnm,
							restaurant : option.restaurant,
							parkinglot :  option.parkinglot, 
							pool : option.pool,
							health : option.health,	
							aircon : option.aircon,
							meetingroom : option.meetingroom,
							htlmastrcd : option.htlmastrcd
						});
					});

					// 마커 더블 클릭하면 큰 정보창을 띄움
					/*google.maps.event.addListener(marker, "dblclick", function(e) {
						$.gmap.drawInfoWindow({
							type : option.markerType,
							latlng : marker.getPosition(),
							color : '#cf0c2c',
							width : 400,
							heithg : 200,
							name : option.name,
							intro : option.intro,
							img : option.img,
							action : 'dblclick',
							map : map
						});
					});*/
				}

				// 마커위에 마우스를 올리면 호텔명이 나옴
				google.maps.event.addListener(marker, "mouseover", function(e) {
					marker.setZIndex(1);
					$.gmap.drawTitleBar({
						latlng : marker.getPosition(),
						name : option.name,
						ratio : option.ratio,
						price : option.price,
						width : 300,
						height : 200,
						map : map
					});
				});

				// 마커위에서 마우스를 치우면 호텔명이 사라짐
				google.maps.event.addListener(marker, "mouseout", function(e) {
					$.gmap.drawTitleBar({
						latlng : marker.getPosition(),
						name : option.name,
						ratio : option.ratio,
						price : option.price,
						width : 300,
						height : 200,
						map : map
					});
				});
				break;
			case "traffic":
				markers.push(marker);
				trafficArray[option.target] = markers;
				google.maps.event.addListener(marker, "click", function(e) {
					$.gmap.drawInfoWindow({
						type : option.markerType,
						latlng : marker.getPosition(),
						color : '#1e90ff',
						name : option.name,
						width : 400,
						heithg : 200,
						map : map
					});
				});
				break;
			case "sights":
				markers.push(marker);
				sightsArray[option.target] = markers;
				google.maps.event.addListener(marker, "click", function(e) {
					$.gmap.drawInfoWindow({
						type : option.markerType,
						latlng : marker.getPosition(),
						color : '#32cd32',
						name : option.name,
						width : 400,
						heithg : 200,
						map : map
					});
				});
				break;
			case "food":
				markers.push(marker);
				foodArray[option.target] = markers;
				google.maps.event.addListener(marker, "click", function(e) {
					$.gmap.drawInfoWindow({
						type : option.markerType,
						latlng : marker.getPosition(),
						color : '#ff8c00',
						name : option.name,
						width : 400,
						heithg : 200,
						map : map
					});
				});
				break;
			case "shop":
				markers.push(marker);
				shopArray[option.target] = markers;
				google.maps.event.addListener(marker, "click", function(e) {
					$.gmap.drawInfoWindow({
						type : option.markerType,
						latlng : marker.getPosition(),
						color : '#f08080',
						name : option.name,
						width : 400,
						heithg : 200,
						map : map
					});
				});
				break;
			}
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.removeMarkers(String markerType);
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		removeMarkers : function(target, markerType) {
			switch (markerType) {
			case "hotel":
				if (hotelArray[target]) {
					var markers = hotelArray[target];
					for (i in markers) {
						markers[i].setMap(null);
					}
					delete hotelArray[target];
				}
				break;
			case "traffic":
				if (trafficArray[target]) {
					var markers = trafficArray[target];
					for (i in markers) {
						markers[i].setMap(null);
					}
					delete trafficArray[target];
				}
				break;
			case "sights":
				if (sightsArray[target]) {
					var markers = sightsArray[target];
					for (i in markers) {
						markers[i].setMap(null);
					}
					delete sightsArray[target];
				}
				break;
			case "food":
				if (foodArray[target]) {
					var markers = foodArray[target];
					for (i in markers) {
						markers[i].setMap(null);
					}
					delete foodArray[target];
				}
				break;
			case "shop":
				if (shopArray[target]) {
					var markers = shopArray[target];
					for (i in markers) {
						markers[i].setMap(null);
					}
					delete shopArray[target];
				}
				break;
			}
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.removeAllMarkers();
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		removeAllMarkers : function(target) {
			if (hotelArray[target]) {
				var markers = hotelArray[target];
				for (i in markers) {
					markers[i].setMap(null);
				}
				delete hotelArray[target];
			}
			if (trafficArray[target]) {
				var markers = trafficArray[target];
				for (i in markers) {
					markers[i].setMap(null);
				}
				delete trafficArray[target];
			}
			if (sightsArray[target]) {
				var markers = sightsArray[target];
				for (i in markers) {
					markers[i].setMap(null);
				}
				delete sightsArray[target];
			}
			if (foodArray[target]) {
				var markers = foodArray[target];
				for (i in markers) {
					markers[i].setMap(null);
				}
				delete foodArray[target];
			}
			if (shopArray[target]) {
				var markers = shopArray[target];
				for (i in markers) {
					markers[i].setMap(null);
				}
				delete shopArray[target];
			}
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.creatHotelInfoWindow(Array option);
		 * Desc : 구글 기본 info 윈도우
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		creatHotelInfoWindow : function(option) {
			var map;
			if ($.util.isNull(option.target)) {
				for ( var key in mapArray) {
					map = mapArray[key];
				}
			} else {
				map = mapArray[option.target];
			}
			// console.log(option.location);
			var contentString = '<div id="content">';
			contentString += '<table width="500px">';
			contentString += '<tr>';
			contentString += '<td rowspan="2">';
			contentString += '<img src="' + option.infoImg + '" style="width:157px;height:96px;">';
			contentString += '<span onclick="' + option.streetViewFunc + '(' + option.location.hb + ', ' + option.location.ib
					+ ')" style="cursor:pointer">스트리트뷰</span>';
			// contentString += '<span id="' + option.marker.title + '_info" style="cursor:pointer">스트리트뷰</span>';
			contentString += '</td>';
			contentString += '<td><b>' + option.name + '</b></td>';
			contentString += '</tr>';
			contentString += '<tr>';
			contentString += '<td>' + option.intro + '</td>';
			contentString += '</tr>';
			contentString += '</table>';
			contentString += '</div>';

			var infowindow = new google.maps.InfoWindow({
				content : contentString
			// size: new google.maps.Size(50,50)
			});

			google.maps.event.addListener(option.marker, 'click', function() {
				infowindow.open(map, option.marker);
			});
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.creatTrafficInfoWindow(Array option);
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		creatTrafficInfoWindow : function(option) {
			var map;
			if ($.util.isNull(option.target)) {
				for ( var key in mapArray) {
					map = mapArray[key];
				}
			} else {
				map = mapArray[option.target];
			}
			var contentString = '<div id="content">';
			contentString += "<table>";
			contentString += "<tr>";
			contentString += "<td width='50px'>이름</td>";
			contentString += "<td>";
			if (!$.util.isNull(option.site)) {
				contentString += "<a href='" + option.site + "'>" + option.name + "</a>";
			} else {
				contentString += option.name;
			}
			contentString += "</td>";
			contentString += "</tr>";
			if (!$.util.isNull(option.phone)) {
				contentString += "<tr>";
				contentString += "<td>전화</td>";
				contentString += "<td>";
				contentString += option.phone;
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.addr)) {
				contentString += "<tr>";
				contentString += "<td>주소</td>";
				contentString += "<td>";
				contentString += option.addr;
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.priceLevel)) {
				contentString += "<tr>";
				contentString += "<td>가격수준</td>";
				contentString += "<td>";
				contentString += option.priceLevel;
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.rating)) {
				contentString += "<tr>";
				contentString += "<td>평점</td>";
				contentString += "<td>";
				contentString += option.rating;
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.photos)) {
				contentString += "<tr>";
				contentString += "<td colspan='2'>";
				contentString += "<div style='width:100%;height:100px;'>";
				for ( var i = 0; i < option.photos.length; i++) {
					// console.log(option.photos[i]);
					// console.log(option.photos[i].raw_reference.fife_url);
					contentString += "<img src='" + option.photos[i].raw_reference.fife_url + "' width='100px' height='100px'>&nbsp;"
				}
				contentString += "</div>";
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.reviews)) {
				contentString += "<tr>";
				contentString += "<td rowspan='" + option.reviews.length + "' valign='top'>리뷰</td>";
				for ( var i = 0; i < option.reviews.length; i++) {
					if (i != 0) {
						contentString += "<tr>";
					}
					contentString += "<td>";
					contentString += option.reviews[i].text;
					contentString += "</td>";
					contentString += "</tr>";
				}
			}
			contentString += '</table>';
			contentString += '</div>';

			var infowindow = new google.maps.InfoWindow({
				content : contentString
			});

			google.maps.event.addListener(option.marker, 'click', function() {
				infowindow.open(map, option.marker);
			});
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.creatSightsInfoWindow(Array option);
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		creatSightsInfoWindow : function(option) {
			var map;
			if ($.util.isNull(option.target)) {
				for ( var key in mapArray) {
					map = mapArray[key];
				}
			} else {
				map = mapArray[option.target];
			}
			var contentString = '<div id="content">';
			contentString += "<table>";
			contentString += "<tr>";
			contentString += "<td width='50px'>이름</td>";
			contentString += "<td>";
			if (!$.util.isNull(option.site)) {
				contentString += "<a href='" + option.site + "'>" + option.name + "</a>";
			} else {
				contentString += option.name;
			}
			contentString += "</td>";
			contentString += "</tr>";
			if (!$.util.isNull(option.phone)) {
				contentString += "<tr>";
				contentString += "<td>전화</td>";
				contentString += "<td>";
				contentString += option.phone;
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.addr)) {
				contentString += "<tr>";
				contentString += "<td>주소</td>";
				contentString += "<td>";
				contentString += option.addr;
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.priceLevel)) {
				contentString += "<tr>";
				contentString += "<td>가격수준</td>";
				contentString += "<td>";
				contentString += option.priceLevel;
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.rating)) {
				contentString += "<tr>";
				contentString += "<td>평점</td>";
				contentString += "<td>";
				contentString += option.rating;
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.photos)) {
				contentString += "<tr>";
				contentString += "<td colspan='2'>";
				contentString += "<div style='width:100%;height:100px;'>";
				for ( var i = 0; i < option.photos.length; i++) {
					// console.log(option.photos[i]);
					// console.log(option.photos[i].raw_reference.fife_url);
					contentString += "<img src='" + option.photos[i].raw_reference.fife_url + "' width='100px' height='100px'>&nbsp;"
				}
				contentString += "</div>";
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.reviews)) {
				contentString += "<tr>";
				contentString += "<td rowspan='" + option.reviews.length + "' valign='top'>리뷰</td>";
				for ( var i = 0; i < option.reviews.length; i++) {
					if (i != 0) {
						contentString += "<tr>";
					}
					contentString += "<td>";
					contentString += option.reviews[i].text;
					contentString += "</td>";
					contentString += "</tr>";
				}
			}
			contentString += '</table>';
			contentString += '</div>';

			var infowindow = new google.maps.InfoWindow({
				content : contentString
			});

			google.maps.event.addListener(option.marker, 'click', function() {
				infowindow.open(map, option.marker);
			});
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.creatFoodInfoWindow(Array option);
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		creatFoodInfoWindow : function(option) {
			var map;
			if ($.util.isNull(option.target)) {
				for ( var key in mapArray) {
					map = mapArray[key];
				}
			} else {
				map = mapArray[option.target];
			}
			var contentString = '<div id="content">';
			contentString += "<table>";
			contentString += "<tr>";
			contentString += "<td width='50px'>이름</td>";
			contentString += "<td>";
			if (!$.util.isNull(option.site)) {
				contentString += "<a href='" + option.site + "'>" + option.name + "</a>";
			} else {
				contentString += option.name;
			}
			contentString += "</td>";
			contentString += "</tr>";
			if (!$.util.isNull(option.phone)) {
				contentString += "<tr>";
				contentString += "<td>전화</td>";
				contentString += "<td>";
				contentString += option.phone;
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.addr)) {
				contentString += "<tr>";
				contentString += "<td>주소</td>";
				contentString += "<td>";
				contentString += option.addr;
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.priceLevel)) {
				contentString += "<tr>";
				contentString += "<td>가격수준</td>";
				contentString += "<td>";
				contentString += option.priceLevel;
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.rating)) {
				contentString += "<tr>";
				contentString += "<td>평점</td>";
				contentString += "<td>";
				contentString += option.rating;
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.photos)) {
				contentString += "<tr>";
				contentString += "<td colspan='2'>";
				contentString += "<div style='width:100%;height:100px;'>";
				for ( var i = 0; i < option.photos.length; i++) {
					// console.log(option.photos[i]);
					// console.log(option.photos[i].raw_reference.fife_url);
					contentString += "<img src='" + option.photos[i].raw_reference.fife_url + "' width='100px' height='100px'>&nbsp;"
				}
				contentString += "</div>";
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.reviews)) {
				contentString += "<tr>";
				contentString += "<td rowspan='" + option.reviews.length + "' valign='top'>리뷰</td>";
				for ( var i = 0; i < option.reviews.length; i++) {
					if (i != 0) {
						contentString += "<tr>";
					}
					contentString += "<td>";
					contentString += option.reviews[i].text;
					contentString += "</td>";
					contentString += "</tr>";
				}
			}
			contentString += '</table>';
			contentString += '</div>';
			// console.log(contentString);
			var infowindow = new google.maps.InfoWindow({
				content : contentString
			});

			google.maps.event.addListener(option.marker, 'click', function() {
				infowindow.open(map, option.marker);
			});
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.creatShopInfoWindow(Array option);
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		creatShopInfoWindow : function(option) {
			var map;
			if ($.util.isNull(option.target)) {
				for ( var key in mapArray) {
					map = mapArray[key];
				}
			} else {
				map = mapArray[option.target];
			}
			var contentString = '<div id="content">';
			contentString += "<table>";
			contentString += "<tr>";
			contentString += "<td width='50px'>이름</td>";
			contentString += "<td>";
			if (!$.util.isNull(option.site)) {
				contentString += "<a href='" + option.site + "'>" + option.name + "</a>";
			} else {
				contentString += option.name;
			}
			contentString += "</td>";
			contentString += "</tr>";
			if (!$.util.isNull(option.phone)) {
				contentString += "<tr>";
				contentString += "<td>전화</td>";
				contentString += "<td>";
				contentString += option.phone;
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.addr)) {
				contentString += "<tr>";
				contentString += "<td>주소</td>";
				contentString += "<td>";
				contentString += option.addr;
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.priceLevel)) {
				contentString += "<tr>";
				contentString += "<td>가격수준</td>";
				contentString += "<td>";
				contentString += option.priceLevel;
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.rating)) {
				contentString += "<tr>";
				contentString += "<td>평점</td>";
				contentString += "<td>";
				contentString += option.rating;
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.photos)) {
				contentString += "<tr>";
				contentString += "<td colspan='2'>";
				// contentString += "<div style='width:100%;height:100px;overflow-x:scroll;'>";
				for ( var i = 0; i < option.photos.length; i++) {
					// console.log(option.photos[i]);
					// console.log(option.photos[i].raw_reference.fife_url);
					contentString += "<img src='" + option.photos[i].raw_reference.fife_url + "' width='100px' height='100px'>&nbsp;"
				}
				// contentString += "</div>";
				contentString += "</td>";
				contentString += "</tr>";
			}
			if (!$.util.isNull(option.reviews)) {
				contentString += "<tr>";
				contentString += "<td rowspan='" + option.reviews.length + "' valign='top'>리뷰</td>";
				for ( var i = 0; i < option.reviews.length; i++) {
					if (i != 0) {
						contentString += "<tr>";
					}
					contentString += "<td>";
					contentString += option.reviews[i].text;
					contentString += "</td>";
					contentString += "</tr>";
				}
			}
			contentString += '</table>';
			contentString += '</div>';

			var infowindow = new google.maps.InfoWindow({
				content : contentString
			});

			google.maps.event.addListener(option.marker, 'click', function() {
				infowindow.open(map, option.marker);
			});
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.openStreetView(loc);
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		openStreetView : function(option) {
			// 지도위에 스트리트뷰를 오버레이
			var map = mapArray[option.target];
			var position = (option.location !== undefined) ? option.location : (new google.maps.LatLng(option.lat, option.lng));

			var panorama = map.getStreetView();
			panorama.setPosition(position);
			panorama.setPov({
				heading : 265,
				zoom : 1,
				pitch : 0
			});
			// panorama.enableCloseButton = false;
			panorama.setVisible(false);
			panorama.setVisible(true);
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.setStreetView(loc);
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		setStreetView : function(option) {
			// 지도없이 스트리트뷰만 단독으로 세팅
			var position = (option.location !== undefined) ? option.location : (new google.maps.LatLng(option.lat, option.lng));
			var panoramaOption = {
				position : position,
				pov : {
					heading : 0,
					zoom : 1,
					pitch : 0
				},
				zoom : 1
			};

			var panorama = new google.maps.StreetViewPanorama(document.getElementById(option.target), panoramaOption);
			panorama.setVisible(true);

			new google.maps.Marker({
				position : position,
				// 스트리트뷰에 보일 마커 아이콘
				icon : "/htl/wfw/imgs/map/icon_hotel_H.png",
				map : panorama
			});
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.getPlaceLibrary(String type);
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		getPlaceLibrary : function(target, type) {
			var map = mapArray[target];
			var types = {
				'traffic' : [ 'train_station', 'subway_station' ],
				'sights' : [ 'museum', 'zoo', 'park' ],
				'food' : [ 'restaurant' ],
				'shop' : [ 'department_store', 'shopping_mall' ]
			};

			var request = {
				location : map.getCenter(),
				radius : '1000', // 미터단위
				types : types[type]

			};

			var service = new google.maps.places.PlacesService(map);
			service.search(request, function(results, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					for ( var i = 0; i < results.length; i++) {
						var place = results[i];

						service.getDetails({
							reference : place.reference
						}, function(p, s) {
							if (s == google.maps.places.PlacesServiceStatus.OK) {
								// console.log(p);
								var name = p.name;
								var phoneNumber = p.international_phone_number;
								var address = p.formatted_address;
								var location = p.geometry.location;
								// var lat = p.geometry.location.lat();
								// var lng = p.geometry.location.lng();
								var photosArray = p.photos;// [0].raw_reference.fife_url;
								var website = p.website;
								var reviewsArray = p.reviews;
								var priceLevel = p.price_level;
								var rating = p.rating;
								var icon = p.icon;
								// console.log(reviewsArray);
								var markerOption = {
									markerType : type,
									location : location,
									// lat : lat,
									// lng : lng,
									name : name,
									phoneNumber : phoneNumber,
									addr : address,
									photos : photosArray,
									site : website,
									reviews : reviewsArray,
									priceLevel : priceLevel,
									rating : rating,
									icon : icon,
									target : target
								};
								$.gmap.addMarker(markerOption);
							}
						});
					}
				}
			});
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.geocode(String query);
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		geocode : function(query, callback) {
			new google.maps.Geocoder().geocode({
				'address' : query
			}, callback);
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.setMapType(String type);
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		setMapType : function(target, type) {
			var map = mapArray[target];
			var mapType = {
				'roadmap' : google.maps.MapTypeId.ROADMAP,
				'satellite' : google.maps.MapTypeId.SATELLITE,
				'hybrid' : google.maps.MapTypeId.HYBRID,
				'terrain' : google.maps.MapTypeId.TERRAIN
			};

			map.setMapTypeId(mapType[type]);
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.setMapScale(int value);
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		setMapScale : function(target, value) {
			var map = mapArray[target];
			map.setZoom(value);
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.setMapCenter(lat, lng);
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		setMapCenter : function(target, lat, lng) {
			var map = mapArray[target];
			map.setCenter(new google.maps.LatLng(lat, lng));
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.printMap();
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		printMap : function(target) {
			var map = mapArray[target];
			var center = map.getCenter();
			// var domain = 'http://topasota1.cyberbooking.co.kr';
			var url = 'http://maps.google.com/maps/api/staticmap?' + 'center=' + center.lat() + ',' + center.lng() + '&' + 'zoom=' + map.getZoom()
					+ '&size=642x482&maptype=roadmap&language=ko&region=kr&sensor=false';

			if (hotelArray[target]) {
				var markers = hotelArray[target];
				for (i in markers) {
					// console.log(hotelArray[i].getIcon());
					// url += '&markers=icon:' + domain + hotelArray[i].getIcon() + '%7c' + hotelArray[i].getPosition().lat() + ','
					// + hotelArray[i].getPosition().lng();
					url += '&markers=icon:http://aux.iconpedia.net/uploads/12017270681878234919.png%7c' + markers[i].getPosition().lat() + ','
							+ markers[i].getPosition().lng();
				}
			}

			if (trafficArray[target]) {
				var markers = trafficArray[target];
				for (i in markers) {
					url += '&markers=icon:%7c' + markers[i].getPosition().lat() + ',' + markers[i].getPosition().lng();
				}
			}

			if (sightsArray[target]) {
				var markers = sightsArray[target];
				for (i in markers) {
					url += '&markers=icon:%7c' + markers[i].getPosition().lat() + ',' + markers[i].getPosition().lng();
				}
			}

			if (foodArray[target]) {
				var markers = foodArray[target];
				for (i in markers) {
					url += '&markers=icon:%7c' + markers[i].getPosition().lat() + ',' + markers[i].getPosition().lng();
				}
			}

			if (shopArray[target]) {
				var markers = shopArray[target];
				for (i in markers) {
					url += '&markers=icon:%7c' + markers[i].getPosition().lat() + ',' + markers[i].getPosition().lng();
				}
			}

			objWin = window.open('', 'printMap');
			self.focus();

			objWin.document.open();
			objWin.document.write('<!DOCTYPE html><html><head></head><body>');
			objWin.document.write('<img src="' + url + '"/>');
			objWin.document.write('</body></html>');
			objWin.document.close();

			$('img', objWin.document).load(function() {
				objWin.print();
				objWin.close();
			});

			return url;

		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.drawInfoWindow(Array option);
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		drawInfoWindow : function(opts) {
			var map = opts.map;
			var overlay = new google.maps.OverlayView();
			var offsetVertical = -230;
			var offsetHorizontal = 0;

			// 인포창이 열려있는 상태에서 다른 마커를 클릭해 인포창을 열면 이전의 인포창은 닫는다.
			if (gmapInfoWindow) {
				gmapInfoWindow.setMap(null);
			}
			overlay.setMap(map);
			gmapInfoWindow = overlay;

			// override 인포창의 디자인은 이곳에 입힌다.
			overlay.onAdd = function() {
				var panes = this.getPanes();

				var html1 = '<div style="background-color:'
						+ opts.color
						+ '; color:#fff; padding:4px; font-weight:bold; font-family:arial; border-top-left-radius:4px; border-top-right-radius:4px; font-size:14px;">'
						+ opts.name + '<div style="float:right;"></div></div>';
				// 내용
				var html2 = '';
				switch (opts.type) {
				/*case 'hotel':
					// if(opts.action == 'click') html += '.....';
					// else if(opts.action == 'dblclick') html += '.....';
					html2 += '<table width="100%">';
					html2 += '<tr>';
					html2 += '<td>';
					html2 += '<img src="' + opts.img + '" style="width:100px;">';
					// html2 += '<span onClick="' + opts.streetViewFunc + '(' + opts.latlng.lat() + ', ' + opts.latlng.lng()
					// + ')" style="cursor:pointer">스트리트뷰</span>';
					html2 += '</td>';
					html2 += '<td>' + opts.intro + '</td>';
					html2 += '</tr>';
					html2 += '</table>';
					break;*/
				case 'hotel':
//					html2 += '<table width="100%">';
//					html2 += '<tr>';
//					html2 += '<td>';
					html2 += '<div id="k1_htl_infopop01" class="k1_htl_infopop01" title="호텔 요약 상세 정보" style="left:10px; top:50px; position:absolute">';
					html2 += '<div class="k1_photo">';
					html2 += '<img src="../../../imgs/htlA/thumbs/thumb_hotel02.jpg" alt="'+opts.name+'" />';
					if(opts.breakfastnm != ''){
						html2 += '<p class="k1_mt3 k1_ml5">'+opts.breakfastnm+'</p>';
					}
					html2 += '<div class="k1_htl_ico k1_ml5">';
					if(opts.breakfastyn == 'Y'){
						html2 += '<p><span class="ico01 k1_mr5">식당</span>조식포함</p>';
					}
					html2 += '</div>';
					html2 += '</div>';
					html2 += '<div class="k1_info k1_mt3">';
					html2 += '<p class="k1_star"><span style="width:20%;">20점</span></p>';
					html2 += '<p class="k1_mt5 h30"><strong>'+opts.name+'</strong></p>';
					html2 += '<p class="k1_mt5"><span class="k1_htl_price2">'+opts.price+' ~</span></p>';
					html2 += '<div class="k1_htl_ico k1_mt5">';
					if(opts.restaurant == 'R'){
						html2 += '<span class="ico01">식당</span>&nbsp;';
					}
					if(opts.parkinglot == 'P'){
						html2 += '<span class="ico02">주차장</span>&nbsp;';
					}
					if(opts.pool == 'W'){
						html2 += '<span class="ico03">수영장</span>&nbsp;';
					}
					if(opts.health == 'G'){
						html2 += '<span class="ico04">헬스장</span>&nbsp;';
					}
					if(opts.meetingroom == 'M'){
						html2 += '<span class="ico05">회의실</span>&nbsp;';
					}
					if(opts.aircon == 'A'){
						html2 += '<span class="ico06">에어콘</span>';
					}
					html2 += '</div>';
					html2 += '<p class="k1_hpoint01 k1_t11 k1_mt7">'+$k1.util.substring(opts.intro,0,40)+'...</p>';
					html2 += '<div class="k1_btnarea_r">';
					html2 += '<a href="javascript:void(0)" class="k1_htlsbtn_04" onclick="javascript:window.showModalDialog(\'/htl/b2cpop/HTL/AAA/HTLAAASCH010001003001.k1?htlmastrcd='+opts.htlmastrcd+'\', window,\'dialogHeight=700px;dialogWidth=739px; scroll=no; status=yes; help=no; center=yes\')"><span>자세히보기</span></a>&nbsp;';
					html2 += '<a href="javascript:void(0)" class="k1_htlsbtn_04" onclick="javascript:window.showModalDialog(\'/htl/b2cpop/HTL/AAA/HTLAAASCH010001003001.k1?htlmastrcd='+opts.htlmastrcd+'&tabnumber=3\', window,\'dialogHeight=700px;dialogWidth=739px; scroll=no; status=yes; help=no; center=yes\')"><span>Street View</span></a>';
					html2 += '</div>';
					html2 += '</div>';
					html2 += '<a href="onclick="javascript:$k1.popup.close()" class="k1_htlpop_close03">닫기</a>';
					html2 += '</div>';
//					html2 += '</td>';
//					html2 += '<td>' + opts.intro + '</td>';
//					html2 += '</tr>';
//					html2 += '</table>';
					break;
				case 'traffic':
					html2 = '<div style="padding:5px; font-family:arial; font-size:14px;">디자인입력</div>';
					break;
				case 'sights':
					html2 = '<div style="padding:5px; font-family:arial; font-size:14px;">디자인입력</div>';
					break;
				case 'food':
					html2 = '<div style="padding:5px; font-family:arial; font-size:14px;">디자인입력</div>';
					break;
				case 'shop':
					html2 = '<div style="padding:5px; font-family:arial; font-size:14px;">디자인입력</div>';
					break;
				}
//				html2 = "";
				var div = document.createElement("div");
//				div.style.border = "2px solid " + opts.color;
//				div.style.borderTopLeftRadius = "10px";
//				div.style.borderTopRightRadius = "10px";
//				div.style.borderBottomRightRadius = "10px";
				div.style.position = "absolute";
//				div.style.backgroundColor = "#fff";
//				div.style.width = opts.width + "px";
//				div.style.height = opts.height + "px";
				// div.style.background = "url('http://gmaps-samples.googlecode.com/svn/trunk/images/blueinfowindow.gif')";

				var tituloDiv = document.createElement("div");
				tituloDiv.innerHTML = html1;

				var textoDiv = document.createElement("div");
				textoDiv.innerHTML = html2;
//				textoDiv.style.height = "155px";

				var cerrarDiv = document.createElement("div");
				cerrarDiv.style.textAlign = "right";
				cerrarDiv.style["float"] = "right";

				var closeImg = document.createElement("img");
				closeImg.style.width = "14px";
				closeImg.style.height = "14px";
				closeImg.style.padding = "3px";
				closeImg.style.cursor = "pointer";
				closeImg.src = "/htl/wfw/imgs/map/cerrar.gif";
				//cerrarDiv.appendChild(closeImg);

				//google.maps.event.addDomListener(closeImg, 'click', removeGoogleMapInfoBox(this));
				//alert($("#k1_htl_infopop01").attr('title'));
				google.maps.event.addDomListener(closeImg, 'click', removeGoogleMapInfoBox(this));

				//div.appendChild(tituloDiv);
				div.appendChild(textoDiv);
//				div.appendChild(cerrarDiv);
				div.style.display = 'none';
				panes.floatPane.appendChild(div);
				overlay.div = div;
				panMap();
			};

			// override
			overlay.draw = function() {
				var div = overlay.div;
				if (!div) {
					return;
				}

				var pixPosition = this.getProjection().fromLatLngToDivPixel(opts.latlng);
				if (!pixPosition) {
					return;
				}

				div.style.width = opts.width + "px";
				div.style.left = (pixPosition.x + offsetHorizontal) + "px";
				div.style.height = opts.height + "px";
				div.style.top = (pixPosition.y + offsetVertical) + "px";
				div.style.display = 'block';
			};

			// override
			overlay.onRemove = function() {
				if (overlay.div) {
					overlay.div.parentNode.removeChild(overlay.div);
					overlay.div = null;
				}
			};

			// 인포창이 화면 밖으로 벗어날경우 지도를 적절히 이동시켜 인포창을 화면안에 위치하게 한다.
			function panMap() {
				// var map = _globalGmap;
				var bounds = map.getBounds();
				if (!bounds) {
					return;
				}

				// The position of the infowindow
				var position = opts.latlng;

				// The dimension of the infowindow
				var iwWidth = opts.width;
				var iwHeight = opts.height;

				// The offset position of the infowindow
				var iwOffsetX = offsetHorizontal;
				var iwOffsetY = offsetVertical;

				// Padding on the infowindow
				var padX = 40;
				var padY = 40;

				// The degrees per pixel
				var mapDiv = map.getDiv();
				var mapWidth = mapDiv.offsetWidth;
				var mapHeight = mapDiv.offsetHeight;
				var boundsSpan = bounds.toSpan();
				var longSpan = boundsSpan.lng();
				var latSpan = boundsSpan.lat();
				var degPixelX = longSpan / mapWidth;
				var degPixelY = latSpan / mapHeight;

				// The bounds of the map
				var mapWestLng = bounds.getSouthWest().lng();
				var mapEastLng = bounds.getNorthEast().lng();
				var mapNorthLat = bounds.getNorthEast().lat();
				var mapSouthLat = bounds.getSouthWest().lat();

				// The bounds of the infowindow
				var iwWestLng = position.lng() + (iwOffsetX - padX) * degPixelX;
				var iwEastLng = position.lng() + (iwOffsetX + iwWidth + padX) * degPixelX;
				var iwNorthLat = position.lat() - (iwOffsetY - padY) * degPixelY;
				var iwSouthLat = position.lat() - (iwOffsetY + iwHeight + padY) * degPixelY;

				// calculate center shift
				var shiftLng = (iwWestLng < mapWestLng ? mapWestLng - iwWestLng : 0) + (iwEastLng > mapEastLng ? mapEastLng - iwEastLng : 0);
				var shiftLat = (iwNorthLat > mapNorthLat ? mapNorthLat - iwNorthLat : 0) + (iwSouthLat < mapSouthLat ? mapSouthLat - iwSouthLat : 0);

				// The center of the map
				var center = map.getCenter();

				// The new map center
				var centerX = center.lng() - shiftLng;
				var centerY = center.lat() - shiftLat;

				// center the map to the new shifted center
				map.setCenter(new google.maps.LatLng(centerY, centerX));

				// Remove the listener after panning is complete.
				// google.maps.event.removeListener(this.boundsChangedListener_);
				// this.boundsChangedListener_ = null;
			}

			function removeGoogleMapInfoBox(ib) {
				return function() {
					ib.setMap(null);
				};
			}
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.drawTitleBar(Array option);
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		drawTitleBar : function(opts) {
			var map = opts.map;
			var overlay = new google.maps.OverlayView();

			if (gmapTitleBar) {
				gmapTitleBar.setMap(null);
				gmapTitleBar = null;
			} else {
				overlay.setMap(map);
				gmapTitleBar = overlay;
			}

			// override
			overlay.onAdd = function() {
				var panes = this.getPanes();
				var el = document.createElement("div");
				/*el.style.border = "2px solid #4682B4";
				el.style.borderTopLeftRadius = "5px";
				el.style.borderTopRightRadius = "5px";
				el.style.borderBottomRightRadius = "5px";
				el.style.borderBottomLeftRadius = "5px";
				el.style.position = "absolute";
				el.style.color = "#fff";
				el.style.backgroundColor = "#fff";*/
				el.style.width = opts.width + "px";
				el.style.height = opts.height + "px";

				var titleDiv = document.createElement("div");
				/*titleDiv.innerHTML = '<div style="background-color:#4876FF; color:#fff; padding:4px; font-weight:bold; font-family:arial; border-top-left-radius:4px; border-top-right-radius:4px; font-size:12px;">'
						+ opts.name + '<div style="float:right;"></div></div>';*/
				titleDiv.innerHTML = '<div class="k1_htl_infopop02" title="호텔 요약 정보" style="left:100px; top:300px;">'
					+ '<p class="k1_star"><span style="width:' + opts.ratio*2 + '0%;">20점</span></p>'
					+ '<p class="h30 k1_mt3"><strong>' + opts.name + '</strong></p>'
					+ '<p><span class="k1_htl_price2">' + opts.price + '~</span></p>'
					+ '</div>';
				
				el.appendChild(titleDiv);
				el.style.display = 'none';

				overlay.el = el;

				panes.floatPane.appendChild(el);
			};

			// override
			overlay.draw = function() {
				var el = overlay.el;
				if (!el) {
					return;
				}

				var pixPosition = this.getProjection().fromLatLngToDivPixel(opts.latlng);
				if (!pixPosition) {
					return;
				}

				el.style.width = opts.width + "px";
				el.style.left = pixPosition.x + "px";
				el.style.height = opts.height + "px";
				el.style.top = (pixPosition.y - 50) + "px";
				el.style.display = 'block';
			};

			// override
			overlay.onRemove = function() {
				if (overlay.el) {
					overlay.el.parentNode.removeChild(overlay.el);
					overlay.el = null;
				}
			};
		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $k1.gmap.closeMap(String btnClass, String upDiv, int speed, Array options);
		 * Desc : 
		 * Parameter : 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		closeMap : function(btnClass, upDiv, speed, options) {
			var target = $(btnClass);
			var upHeight = $.util.intSize($(upDiv).css('height'), 'px');
			var inDiv = $(upDiv).find('.map');

			target.toggle(function() {
				$(upDiv).animate({
					height : '18'
				}, speed, null, function() {
					if (!$.util.isNull(options) && !$.util.isNull(options.afterIn)) {
						options.afterIn();
						inDiv.css('display', 'none');
					}
				});
				// inDiv.animate({
				// opacity : 'hide'
				// }, speed);
			}, function() {
				inDiv.css('display', 'block');
				$(upDiv).animate({
					height : upHeight
				}, speed, null, function() {
					if (!$.util.isNull(options) && !$.util.isNull(options.afterOut)) {
						options.afterOut();
					}
				});
				// inDiv.animate({
				// opacity : 'show'
				// }, speed);
			});
		}
	};

})(jQuery);
