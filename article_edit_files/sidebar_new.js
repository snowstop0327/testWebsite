ismobile='N';
(function(a){if(/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) ismobile='Y'})(navigator.userAgent||navigator.vendor||window.opera,'http://ezprice.com.tw/');
menudc=0;
$(document).ready(function () {
    $('img.menu_class').mouseenter(function (){
        $('ul.the_menu').slideDown('medium');
        menudc=1;
    });
    $('img.menu_class,ul.the_menu').mouseleave(function (){
        menudc=0;
        setTimeout("if (menudc==0) $('ul.the_menu').slideUp('medium');", 1000);
    });
    $('ul.the_menu').mouseenter(function (){
        menudc=1;
    });
});

function pgo(obj,lnkurl){
    var now = new Date();
    var today = now.getFullYear().toString()+("0"+(now.getMonth()+1)).slice(-2).toString()+("0"+(now.getTime()%86400>31200?now.getDate():now.getDate())).slice(-2).toString();
    if (today < '20151009' && ("http://www.gohappy.com.tw/ec2/product?pid=4908221&cid=56014&sid=1&mid=1" == obj.href || "http://www.gohappy.com.tw/ec2/product?pid=4908156&cid=56014&sid=1&mid=1" == obj.href || location.href == obj.href) ) {
        alert ('10/9 00:00準時開放');
        obj.href=location.href;
    } else {
        obj.href=lnkurl;
    }
    return false;
}
function hideforever(obj){
    if ($(obj).val('checked')){
        document.cookie = "nyhide=1;path=/;";
    }
    $.fancybox.close();
}

	// ===========[s]scroll ====================
	var mini_scroll = {
		_scroll : function() {
			 $(window).scroll(function() {
			 t=sbgetCookie("pushpophide");
			 if (!t){
			    var $BodyHeight = $(document).height();
			    var $ViewportHeight=$(window).height();
			    $ScrollTop=$(this).scrollTop();
				if(($ViewportHeight+$ScrollTop)>$BodyHeight-($ViewportHeight/2)){
					$('.special_salebox_pop:eq(0)').css('display','none');
					$('.special_salebox_pop:eq(1)').css('display','');
				}else{
					$('.special_salebox_pop:eq(0)').css('display','');
					$('.special_salebox_pop:eq(1)').css('display','none');
				}
			}
			});
		},
	};
	function setdock(act){
	    if ("Y"==ismobile) return;
	    if (act==undefined){
	        t=sbgetCookie("sidebar");
	        if (t){
    			$(".Rsidebar_open_v2").css('display','none');
    			$(".Rsidebar_close_v2").show();
    			$('.sbar_foldbox_v2').hide();
    			document.cookie = "sidebar=1;path=/;";
	        }else{
    			$('.sbarbox').css('position:relative');
    			$(".Rsidebar_open_v2").css('display','block');
    			$(".Rsidebar_close_v2").hide();
    			$('.sbar_foldbox_v2').show();
    			document.cookie = "sidebar=;path=/;";
    			showTab((2==sbgetCookie("sidebarvtab"))?2:3);
	        }
    	}else{
    		if($(".Rsidebar_close_v2").css("display") == "none"){
    			$(".Rsidebar_open_v2").css('display','none');
    			$(".Rsidebar_close_v2").show();
    			$('.sbar_foldbox_v2').hide();
    			document.cookie = "sidebar=1;path=/;";
    		}else{
    			$('.sbarbox').css('position:relative');
    			$(".Rsidebar_open_v2").css('display','block');
    			$(".Rsidebar_close_v2").hide();
    			$('.sbar_foldbox_v2').show();
    			document.cookie = "sidebar=;path=/;";
    			showTab((2==sbgetCookie("sidebarvtab"))?2:3);
    		}
    	}
	}
	function showTab(tabIndex, firstFlag){
		tabIndex = parseInt(tabIndex);
	    document.cookie = "sidebarvtab="+tabIndex+";path=/;";
		sidebarvtab = tabIndex;

	    document.cookie = "sidebarvtab="+tabIndex+";path=/;";
		$("#dmzone img").remove();
		$(".sbar_menu li").each(function() {
		    $(this).attr('class', 'sbar_muliz_df');
		});
		$(".sbar_menu li:eq("+tabIndex+")").attr('class', 'sbar_muliz_focus');
		document.getElementById('dmzone').innerHTML='';
		if (tabIndex==3 || tabIndex==2){
        	http_request = false;
        	http_request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        	if (!http_request) {
        		//alert('e1');
        		return false;
        	}

        	http_request.onreadystatechange = function() {
          	siderec_show(tabIndex);
        	};

        	var tmp = 'page=1&zn='+tabIndex;
        	http_request.open('GET', '/siderec_gp.php?ac=view&'+tmp, true);
        	http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        	http_request.send(tmp);
		}
	}
$(document).ready(function(){
	if ($('.Rsidebar_open_v2').css('display') == 'block') {
		$('.sbarbox').css('position:relative');
	}
	if (navigator.userAgent.match('iPad') != null || navigator.userAgent.match('iPhone') != null){
        $("#ezrsidemenu").css("right",-25);
        $("#ezrsidemenu .sbarbox").css("right",-25);
        $("#ezrsidemenu .minibox").css("right",-25);
        $("#ezrsidemenu .Rsidebar_open_v2").css("right",-25);
        $("#ezrsidemenu .Rsidebar_close_v2").css("right",-25);
	}
});

function siderec_show(t) {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			RTNarr_status = http_request.responseText.substring(0, 2);
			RTNarr_text = http_request.responseText;
		} else {
			//alert('e2');
			return false;
		}
		document.getElementById("dmzone").innerHTML="";
		var mt=RTNarr_text.match(/<div class="viewed_pd_count"[^>]+>(\d+)<\/div>/);
        document.getElementById("dmzone").innerHTML = RTNarr_text.replace(/<div class="viewed_pd_count"[^>]+>\d+<\/div>/g,'');
        if (mt[1]>0){
            $("#tab"+t+"cnt").html(mt[1]);
            $("#tab"+t+"cnt").css("display","");
            $("#tab"+t+"cnt_dis").html(mt[1]);
            $("#tab"+t+"cnt_dis").css("display","");
            $(".trgimgs").mouseover(function (){
                $("#itemname").html(decodeURIComponent($(this).attr("itemname")));
                $("#itemprice").html('$'+$(this).attr("itemprice"));
                $("#infobox").css("display","");
                $("#infobox").css("top",$(this).offset().top-$(window).scrollTop()-30);
            }).mouseout(function(){
                $("#infobox").css('display','none');
            });
        }
	}
}
function sbgetCookie(theName){
    theName += "=";
    theCookie = document.cookie+";";
    start = theCookie.indexOf(theName);
    if (start != -1)
    {
       end = theCookie.indexOf(";",start);
       return unescape(theCookie.substring(start+theName.length,end));
    }
    return 0;
}
function gotohisrec(pgnum,tabIndex){
	http_request = false;
	http_request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	if (!http_request) {
		//alert('e1');
		return false;
	}

	http_request.onreadystatechange = function() {
  	siderec_show((2==tabIndex?2:3));
	};

	var tmp = 'page='+pgnum+'&zn='+tabIndex;
	http_request.open('GET', '/siderec_gp.php?ac=view&'+tmp, true);
	http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	http_request.send(tmp);
}
function hisrm(p){
    http_request = false;
	http_request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	if (!http_request) {
		//alert('e1');
		return false;
	}

	http_request.onreadystatechange = function() {
  	siderec_show(3);
	};

	var tmp = 'page='+document.getElementById('hcurr').innerHTML;
	http_request.open('GET', '/siderec_gp.php?ac=ckmod&pid='+p+'&'+tmp, true);

	http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	http_request.send(tmp);
}
function splrm(p){
    http_request = false;
	http_request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	if (!http_request) {
		//alert('e1');
		return false;
	}

	http_request.onreadystatechange = function() {
  	siderec_show(2);
	};

	var tmp = 'page='+document.getElementById('hcurr').innerHTML+'&zn=2';
	http_request.open('GET', '/siderec_gp.php?ac=ckmod&pid='+p+'&'+tmp, true);

	http_request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	http_request.send(tmp);
}

function ezpushac(ac){
    if (ac){
        t=sbgetCookie("pushpophide");
        if (!t){
            $(".special_salebox_pop:eq(0)").css('display','none');
            $(".special_salebox_pop:eq(1)").css('display','');
        }
    }else{
        $(".special_salebox_pop:eq(0)").css('display','none');
        $(".special_salebox_pop:eq(1)").css('display','none');
        document.cookie = "pushpophide=1;path=/;";
    }
}