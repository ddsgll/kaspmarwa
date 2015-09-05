if ( $(window).width() < 720 ) {
    $(".stolp").remove();
}


$(document).ready(function() {



    // Mobile menu actions
        $("#mobile_menu_open").on('click', function() {
            $(".menuList").addClass("opened");
        });

        $(".mobile-close").on('click', function() {
            $(".menuList").removeClass("opened");
        });



    // Main page slider
        $("#main_slider").flickity({
            cellSelector: '.item',
            pageDots: false,
            prevNextButtons: false,
            wrapAround: true,
            setGallerySize: false
        });

        $(".slider .slide_nav").on('click', function() {
            var act = $(this).data("action");
            $("#main_slider").flickity(act);
        });



    // Programs slider
        // if( $(window).width() > 720 ) {
            
            $(".prog_list .row").flickity({
                cellSelector: '.prog_item',
                pageDots: false,
                prevNextButtons: false,
                wrapAround: true,
                setGallerySize: false
            });

            $("#prog_main_prev").on('click', function() {
                $(".prog_list .row").flickity("previous");
            });

            $("#prog_main_next").on('click', function() {
                $(".prog_list .row").flickity("next");
            });

        // }


    // Выбор языка
        $(".top_lang").on('click', function() {
            $(".sub_lang").toggleClass("active");
        });

        $(".sub_lang .lang").on('click', function() {
            var lan = $(this).find("span").text(),
                flg = $(this).find("img").attr("src");

                $(".top_lang  span").text( lan );
                $(".top_lang .flag").attr("src", flg);

        });



    // Скролл главной части
        $(".slider .scroll").on('click', function() {
            var offset = $(window).height();
            $("html, body").animate({scrollTop: offset-80}, 500);
        });



    // Столпы
        var st_row = $(".stolp").find(".row"),
            st_img = $(".stolp").find(".stolp_image img");

        // При клике на цифру
        st_row.find(".act").on('click', function() {
            
            // Получаем фото
            var i = $(this).parent().parent().data("image");

            // Составляем путь
            var string = "img/stolp_photo/" + i + ".png";

            // Затухание -> смена фото -> появление
            st_img.fadeOut(300,function() {
                $(this)
                    .attr("src",string)
                    .fadeIn(600);
            });

            // Переключаем класс "Active"
            st_row.removeClass("active");
            $(this).parent().parent().addClass("active");
        });



    // фикс стилей

        // Выбор языка
        var top_lang_right = $(".top_lang").offset().left + $(".top_lang").width();
        var sub_lang_offset = $(window).width() - top_lang_right - 52;
        $(".sub_lang").css("right",sub_lang_offset);

        // Установка высоты элементов
        var slide_hgh = $(window).height();
        console.log(slide_hgh);
        $(".slider_block").height(slide_hgh);

        var main_prog_hgh = $(".prog_item").height();

        $(".prog_list .row").height(main_prog_hgh + 160);



    // Top + menu
        $(window).scroll(function() {
            var offset = $(this).scrollTop();
            if( offset > 140 )
            {
                $(".main_top").addClass("hidden");
                $(".main_menu").addClass("scrolled");
                $(".main_menu.main_page").addClass("floated");
            }
            else
            {
                $(".main_top").removeClass("hidden");
                $(".main_menu").removeClass("scrolled");
                $(".main_menu.main_page").removeClass("floated");
            }
        });



    // Slider scroll
        $(".slider .scroll").on('click', function() {
            $(window).animate( { scrollTop: $(".greetings").offset().top }, 500 );
        });



    // Термины
        if ( $("#therm_list").length ) {
            var pckry = new Packery( '#therm_list', {
                itemSelector: '.therm',
                gutter: 0
            });
        }



    // Медиа вкладки
        m_tabs = $("#media_tab h2");

        var cur_media_mode,
            media_block = $(".media_item").parent(),

            media_resort = function() {
                media_block.each(function() {
                    if ( $(this).data("type") != cur_media_mode ) {
                        $(this).addClass("hidden");
                    } else {
                        $(this).removeClass("hidden");
                    }
                });
            },

            media_show_all = function() {
                media_block.removeClass("hidden");
            }

        m_tabs.on('click', function() {
            cur_media_mode = $(this).data("type");
            
            m_tabs.removeClass("active");
            $(this).addClass("active");

            cur_media_mode != "all" ? media_resort() : media_show_all() ;
        }); 



    // Вкладки программ
        p_tabs = $("#program_tab h2");

        var cur_program_mode,
            prog_block = $(".prog_item"),

            programs_resort = function() {
                prog_block.each(function() {
                    if ( $(this).data("type") != cur_program_mode ) {
                        $(this).addClass("hidden");
                    } else {
                        $(this).removeClass("hidden");
                    }
                });
            },

            programs_show_all = function() {
                prog_block.removeClass("hidden");
            }

        p_tabs.on('click', function() {
            cur_program_mode = $(this).data("type");

            p_tabs.removeClass("active");
            $(this).addClass("active");

            cur_program_mode != "all" ? programs_resort() : programs_show_all() ;
        });


    // Вертикальное выравнивание
        var fc = $(".flex-center");
        v_mid( fc.parent(), fc );

});


$(window).load(function() {
    $(".preloader").delay(500).fadeOut(300);
});


function v_mid(parent, children) {
    if(parent.length && children.length)
    {
        parent.each(function() {
            var cur_ch = $(this).find(children);
            cur_ch.css("margin-top", parent.height()/2 - cur_ch.height()/2); 
        });
    }
}




///////////////////////////////
// MAP
///////////////////////////////

var map_styles =
[
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "invert_lightness": true
            },
            {
                "saturation": 10
            },
            {
                "lightness": 30
            },
            {
                "gamma": 0.5
            },
            {
                "hue": "#0076ff"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#00a0df"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": "47"
            },
            {
                "lightness": "75"
            },
            {
                "color": "#006bc5"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": "43"
            },
            {
                "lightness": "56"
            },
            {
                "gamma": "6.48"
            },
            {
                "color": "#0051a9"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "33"
            },
            {
                "color": "#7bc2f9"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#7bc2f9"
            },
            {
                "lightness": "-52"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "100"
            },
            {
                "invert_lightness": true
            },
            {
                "lightness": "-43"
            },
            {
                "weight": "1.00"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "color": "#063770"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#0051a9"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#0051a9"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7bc2f9"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": "34"
            },
            {
                "lightness": "18"
            },
            {
                "color": "#0051a9"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#3789e4"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": "98"
            },
            {
                "gamma": "4.20"
            },
            {
                "color": "#7bedf9"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#7bc2f9"
            },
            {
                "lightness": "-55"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#232f3a"
            }
        ]
    }
];

function initializeMap() {
	var mapOptions = {
		zoom: 17,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: new google.maps.LatLng(42.9644937,47.4939926)
	}
	var map = new google.maps.Map(document.getElementById('foot_map'),
	                            mapOptions);

	var image = 'img/icons/map_pointer.png';
	var myLatLng = new google.maps.LatLng(42.9626408,47.4911388);
	var beachMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image
	});

	map.setOptions({styles: map_styles});
}

if ( $(window).width() > 720 ) {
    google.maps.event.addDomListener(window, 'load', initializeMap);
}

///////////////////////////////////////////////////////