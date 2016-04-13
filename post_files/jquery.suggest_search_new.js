
(function($) {
	$.suggest = function(input, options) {

		var $input = $(input).attr("autocomplete", "off");
		var $results = $(document.createElement("ul"));

		var timeout = false;		// hold timeout ID for suggestion results to appear
		var prevLength = 0;			// last recorded length of $input.val()
		var cache = [];				// cache MRU list
		var cacheSize = 0;			// size of cache in chars (bytes?)
		notchange = false;
		$results.addClass(options.resultsClass).appendTo('body');


		resetPosition();
		$(window)
			.load(resetPosition)		// just in case user is changing size of page while loading
			.resize(resetPosition);

		$input.on('change focus click keyup',function(e){
		
			if(!/38$|40$|13$|37$|39$/.test(e.keyCode)){
				if($(input).val()=='')
					setTimeout(suggest_nokw, options.delay);
				else
					setTimeout(suggest, options.delay);
			}
		});
		$input.blur(function() {
			setTimeout(function() { $results.hide();
			     $('.search_text_suggestion').hide();
			     }, 200);
		});


		// help IE users if possible
		try {
			$results.bgiframe();
		} catch(e) { }


		// I really hate browser detection, but I don't see any other way

        //修改开始
        //下面部分在作者原来代码的基本上针对中文输入的特点做了些修改
		//if ($.browser.mozilla)
		if (navigator.userAgent.match(/mozilla/i)){
		    $input.keydown(processKey2);
			// onkeypress repeats arrow keys in Mozilla/Opera
		}else{
			$input.keydown(processKey2);
		}		// onkeydown repeats arrow keys in IE/Safari*/
		//这里是自己改为keyup事件
		$input.keyup(processKey);
        //修改结束


		function resetPosition() {
			// requires jquery.dimension plugin
			var offset = $input.offset();
			$results.css({
				top: (offset.top + input.offsetHeight) + 'px',
				left: offset.left + 'px'
			});
		}

		function processKey(e) {

			// handling up/down/escape requires results to be visible
			// handling enter/tab requires that AND a result to be selected
			if (/^32$|^9$|^13$/.test(e.keyCode) && getCurrentResult()) {

	            if (e.preventDefault)
	                e.preventDefault();
				if (e.stopPropagation)
	                e.stopPropagation();

                e.cancelBubble = true;
                e.returnValue = false;
				selectCurrentResult();

			} else if ($input.val().length != prevLength) {
        
				if(timeout){
					//console.log("ok");
					clearTimeout(timeout);				
				}
				if(!notchange){
					timeout = setTimeout(suggest, options.delay);
					prevLength = $input.val().length;
				}

			}


		}
//此处针对上面介绍的修改增加的函数
		function processKey2(e) {
			//console.log(e.keyCode);
			//timeout = setTimeout(suggest, options.delay);
			// handling up/down/escape requires results to be visible
			// handling enter/tab requires that AND a result to be selected
			if (/38$|40$|13$|37$|39$/.test(e.keyCode) /*&& $results.is(':visible')*/) {
	            if (e.preventDefault)
	                e.preventDefault();
				if (e.stopPropagation)
	                e.stopPropagation();
					
                e.cancelBubble = true;
                e.returnValue = false;
				switch(e.keyCode) {

					case 38: // up
						notchange = true;
						prevResult();
						//$input.val($currentResult.text());
						//console.log("prev");
						
						break;

					case 40: // down
						notchange = true;
						nextResult();
						//console.log("next");
						//$input.val($currentResult.text());
						
						break;
					case 39: // down
						notchange = true;
						setPos(true);
						rightResult();
						//console.log("next");
						//$input.val($currentResult.text());
						
						break;
					case 37: // down
						notchange = true;
						setPos(false);
						leftResult();
						//console.log("next");
						//$input.val($currentResult.text());
						
						break;
/*					
					case 27: //	escape
						//console.log('escape');
						notchange = false;
						$results.hide();
						$('.search_text_suggestion').hide();
						break;
*/
          case 13: //     enter
                  $currentResult = getCurrentResult();
                  if ($currentResult) {
                  	if(typeof $currentResult.find('.suggest').children('span:eq(0)').attr('setcid') != 'undefined'){
                  		$('#submit').append('<input type="hidden" name="cid" value="'+$currentResult.find('.suggest').children('span:eq(0)').attr('setcid')+'">')
                    	$input.val($currentResult.find('span.suggest').text().split(' 搜 ')[1]);
                    }else{
                    	$currentResult_sub = $currentResult.find('ul.sub_kw_list li.tag_group ul li.selected');
                    	if($currentResult_sub.length){
                    		$input.val($currentResult.find('span.suggest').text()+' '+$currentResult_sub.find('a').text());
                    	}else{
                    		//console.log($currentResult.find('span.suggest').text());
                    		$input.val($currentResult.find('span.suggest').text());
                    	}
                    	
                    }
                  }
                  //checksearch(document.srhform);
                  document.srhform.submit();
                  document.list.submit();

                  break;
				}

			} else if ($input.val().length != prevLength) {
				notchange = false;
				if (timeout)
					clearTimeout(timeout);
				timeout = setTimeout(suggest, options.delay);
				prevLength = $input.val().length;

			} else
				notchange = false;
		}
		
		function setPos(move){ 
			var e = document.getElementById("srhkw1"); 
			var v = $("#srhkw1").val();
			var l = v.length;
			//e.focus();
			var pos = caretPos(e);
			if(move){
				pos +=1;
			}else{
				pos -=1;
			}

			if(pos>l){
				pos = l;
			}
			if(pos<=0){
				pos=0;
			}
			console.log(pos);
			if (e.setSelectionRange) {
	            e.focus();
	            e.setSelectionRange(pos, pos);
	        } else if (e.createTextRange) {
	            var range = e.createTextRange();
	            range.collapse(true);
	            range.moveEnd('character', pos);
	            range.moveStart('character', pos);
	            range.select();
	        }
			//e.setSelectionRange(pos,pos);
		} 

		function caretPos(el)
		{
		    var pos = 0;
		    // IE Support
		    if (document.selection) 
		    {
		    	el.focus ();
		    	var Sel = document.selection.createRange();
		    	var SelLength = document.selection.createRange().text.length;
		    	Sel.moveStart ('character', -el.value.length);
		    	pos = Sel.text.length - SelLength;
		    }
		    // Firefox support
		    else if (el.selectionStart || el.selectionStart == '0')
		    	pos = el.selectionStart;

		    return pos;

		}

		function suggest_nokw() {
			ww=["apple","asus","acer","手機","筆電","電暖器","機車","電腦","玩具"];

      q = ww[Math.floor(Math.random()*ww.length)];

      	
			if (q.length >= options.minchars) {

				cached = checkCache(q);

				if (cached) {

					displayItems(cached['items'],0);

				} else {

					$.get(options.source, {q: q}, function(txt) {
						
						$results.hide();
                        $('.search_text_suggestion').hide();
						var items = parseTxt(txt, q);

						displayItems(items,0);
						addToCache(q, items, txt.length);
                        //alert("sg");
					});

				}

			} else {

				$results.hide();
        $('.search_text_suggestion').hide();
        
			}

		}

		function suggest() {
			var q = $input.val();

			if (q.length >= options.minchars) {

				cached = checkCache(q);

				if (cached) {

					displayItems(cached['items'],1);

				} else {
					if(!notchange){
						
						$.get(options.source, {q: q}, function(txt) {

						//$results.hide();
            //$('.search_text_suggestion').hide();
						var items = parseTxt(txt, q);

						displayItems(items,1);
						addToCache(q, items, txt.length);
                        //alert("sg");
						});

					}
				}
			} else {

				$results.hide();
        $('.search_text_suggestion').hide();
        
			}

		}


		function checkCache(q) {

			for (var i = 0; i < cache.length; i++)
				if (cache[i]['q'] == q) {
					cache.unshift(cache.splice(i, 1)[0]);
					return cache[0];
				}

			return false;

		}

		function addToCache(q, items, size) {

			while (cache.length && (cacheSize + size > options.maxCacheSize)) {
				var cached = cache.pop();
				cacheSize -= cached['size'];
			}

			cache.push({
				q: q,
				size: size,
				items: items
				});

			cacheSize += size;

		}

		function sub_kw_list(q,k) {

			$.get(options.source, {q: q, l: 3}, function(txt) {

				var kw_list = '';
				var items = parseTxt(txt, q);

				for (var i = 0; i < items.length; i++){
					var tmpid = '';
					tmpid = $.trim(items[i].replace(/<strong>/g,"").replace(/<\/strong>/g,"")).replace(/\/ez-skw-level-3\//g,"");

					var split_arr = q.split(' ');
					var split_kw_arr = tmpid.split(' ');

					var split_kw = arr_diff (split_arr, split_kw_arr).join(' ');

					kw_list += "<li><a class='tag_link' href='http://ezprice.com.tw/price_list.php?kw=" + tmpid + "' onmousedown=\"_gaq.push(['_trackEvent', 'suggestKw', 'sKw','"+tmpid+"']);\"><span>"+ split_kw +"</span></a></li>";
				}

				$('#sub_kw_'+k).empty().append(kw_list);
			});
		}
		function arr_diff (a1, a2) {

		    var a = [], diff = [];

		    for (var i = 0; i < a1.length; i++) {
		        a[a1[i]] = true;
		    }

		    for (var i = 0; i < a2.length; i++) {
		        if (a[a2[i]]) {
		            //delete a[a2[i]];
		        } else {
		        	diff.push(a2[i]);
		            //b[a2[i]] = true;
		        }
		    }
		    /*
		    for (var k in b) {
		        diff.push(k);
		    }
			*/
		    return diff;
		};
		function findStringDiff(str1, str2) {
		  var compareString = function(str1, str2) {
		    var a1 = str1.split("");
		    var a2 = str2.split("");
		    var idx2 = 0;
		    a1.forEach(function(val) {
		      if (a2[idx2] === val) {
		        a2.splice(idx2,1);
		      } else {
		        idx2 += 1;
		      }
		    });
		    if (idx2 > 0) {
		      a2.splice(idx2,a2.length);
		    }
		      return a2.join("");
		  }

		  if (str1.length < str2.length) {
		    return compareString(str1, str2);
		  } else {
		    return compareString(str2, str1);
		  }
		}

		function show_sub_kw(){
			var top_ul = $("#dropdown li ul.sub_kw_list:first");
			var top_ul_position = top_ul.position();
			top_ul.show().css('padding-top', top_ul_position.top).prev('a').addClass('active');

			$('#dropdown li').on('mouseover', function(e){
      			
      		  $("#dropdown li ul.sub_kw_list").hide();

      		  //$("#dropdown li a").removeClass('active');

		      $(this).find('a').addClass('active');
		      $(this).find(".fa-arrow-position").addClass('fa-arrow-position-hover');

		      var li_top = $(this).position();
		      $(this).find("ul:first").show().css('padding-top','0px');
		      /*
		      if(li_top.top > 120){
		        $(this).find("ul:first").show().css('padding-top','80px');
		      }else{
		        $(this).find("ul:first").show().css('padding-top',li_top.top);
		      }
			  */
		    }).on('mouseout', function(e){
		      //$(this).find("ul:first").hide();
		      $(this).find('a').removeClass('active');
		      $(this).find(".fa-arrow-position").css('margin-left', '10px').removeClass('fa-arrow-position-hover');
		    });
		}

		function displayItems(items,j) {

			if (!items)
				return;

			if (!items.length) {
				$results.hide();
				$('.search_text_suggestion').hide();
				return;
			}
			//console.log(items);
			var html = '<ul id="dropdown">';
			if(j==1){
				for (var i = 0; i < items.length; i++){
					var tmpidr = items[i].split("fa-arrow-position'");
					var tmpid = '';
					if(typeof tmpidr[1] != 'undefined'){
						
						tmpid = $.trim(items[i].replace(/<strong>/g,"").replace(/<\/strong>/g,""));
						tmpid = tmpid.replace(/<i class='fa fa-angle-right fa-lg fa-arrow-position'><\/i>/g,'');

						sub_kw_list(tmpid,i);
					    sub_kw = "<ul class='sub_kw_list'><h3>"+tmpid+"</h3><li class='tag_group'><ul class='clearfix' id='sub_kw_"+i+"'></ul></li></ul>";
						
						html += '<li><a href="http://ezprice.com.tw/price_list.php?kw=' + tmpid + '" class="suggestion"  onmousedown="_gaq.push([\'_trackEvent\', \'suggestKw\', \'Kw\',\''+tmpid+'\']);"><span class="suggest">' + items[i].replace(/<strong>/g,"<span class=\"input\">").replace(/<\/strong>/g,"</span>") + '</span><div class="clear"></div></a>' + sub_kw + '</li>';
					
					}else{
						tmpid = $.trim(items[i].replace(/<strong>/g,"").replace(/<\/strong>/g,""));
						if(tmpid.match(/\/ez-skw-level-3\//g)){
							tmpid = $.trim(tmpid.replace(/\/ez-skw-level-3\//g,""));
							html += '<li><a href="http://ezprice.com.tw/price_list.php?kw=' + tmpid + '" class="suggestion"  onmousedown="_gaq.push([\'_trackEvent\', \'suggestKw\', \'sKw\',\''+tmpid+'\']);"><span class="suggest">' + items[i].replace(/<strong>/g,"<span class=\"input\">").replace(/<\/strong>/g,"</span>").replace(/\/ez-skw-level-3\//g,"") + '</span><div class="clear"></div></a></li>';
						}else{
							html += '<li><a href="http://ezprice.com.tw/price_list.php?kw=' + tmpid + '" class="suggestion"  onmousedown="_gaq.push([\'_trackEvent\', \'suggestKw\', \'Kw\',\''+tmpid+'\']);"><span class="suggest">' + items[i].replace(/<strong>/g,"<span class=\"input\">").replace(/<\/strong>/g,"</span>") + '</span><div class="clear"></div></a></li>';
						}
						
					}
				}
			}else{
				for (var i = 0; i < 3; i++){
					var tmpidr = items[i].split("fa-arrow-position'");
					var tmpid = '';
					if(typeof tmpidr[1] != 'undefined'){
						
						tmpid = $.trim(items[i].replace(/<strong>/g,"").replace(/<\/strong>/g,""));
						tmpid = tmpid.replace(/<i class='fa fa-angle-right fa-lg fa-arrow-position'><\/i>/g,'');

						sub_kw_list(tmpid,i);
						sub_kw = "<ul class='sub_kw_list'><h3>"+tmpid+"</h3><li class='tag_group'><ul class='clearfix' id='sub_kw_"+i+"'></ul></li></ul>";

						html += '<li><a href="http://ezprice.com.tw/price_list.php?kw=' + tmpid + '" class="suggestion"  onmousedown="_gaq.push([\'_trackEvent\', \'suggestKw\', \'Kw\',\''+tmpid+'\']);"><span class="suggest">' + items[i].replace(/<strong>/g,"<span class=\"input\">").replace(/<\/strong>/g,"</span>") + '</span><div class="clear"></div></a>' + sub_kw + '</li>';
					
					}else{
						tmpid = $.trim(items[i].replace(/<strong>/g,"").replace(/<\/strong>/g,""));
						if(tmpid.match(/\/ez-skw-level-3\//g)){
							tmpid = $.trim(tmpid.replace(/\/ez-skw-level-3\//g,""));
							html += '<li><a href="http://ezprice.com.tw/price_list.php?kw=' + tmpid + '" class="suggestion"  onmousedown="_gaq.push([\'_trackEvent\', \'suggestKw\', \'sKw\',\''+tmpid+'\']);"><span class="suggest">' + items[i].replace(/<strong>/g,"<span class=\"input\">").replace(/<\/strong>/g,"</span>").replace(/\/ez-skw-level-3\//g,"") + '</span><div class="clear"></div></a></li>';
						}else{
							html += '<li><a href="http://ezprice.com.tw/price_list.php?kw=' + tmpid + '" class="suggestion"  onmousedown="_gaq.push([\'_trackEvent\', \'suggestKw\', \'Kw\',\''+tmpid+'\']);"><span class="suggest">' + items[i].replace(/<strong>/g,"<span class=\"input\">").replace(/<\/strong>/g,"</span>") + '</span><div class="clear"></div></a></li>';
						}
						//html += '<li><a href="http://ezprice.com.tw/price_list.php?kw=' + tmpid + '" class="suggestion"  onmousedown="_gaq.push([\'_trackEvent\', \'suggestKw\', \'Kw\',\''+tmpid+'\']);"><span class="suggest">' + items[i].replace(/<strong>/g,"<span class=\"input\">").replace(/<\/strong>/g,"</span>") + '</span><div class="clear"></div></a></li>';
					}
				
                            
			    //html += '<li class="keyw"><a href="http://ezprice.com.tw/price_list.php?kw=' + items[i].replace(/<strong>/g,"").replace(/<\/strong>/g,"") + '">' + items[i] + '</a></li>';			
            	
				}
			}
			html += '</ul>';
            $('.search_text_suggestion').html(html).show();
            //var bottom = $(window).height() - $('#dropdown ul.sub_kw_list:last').height();
            //bottom = offset.top - bottom;
            //console.log(bottom);
            $("#dropdown").css('height','300px');
            show_sub_kw();

			$results
				.children('li')
				.mouseover(function() {
					$results.children('li').removeClass(options.selectClass);
					$(this).addClass(options.selectClass);
				})
				.click(function(e) {
					e.preventDefault();
					e.stopPropagation();
					selectCurrentResult();
					$("#srhform").submit();
				})
				.keypress(function(e) {
					e.preventDefault();
					e.stopPropagation();
					selectCurrentResult();
				});
		}

		function parseTxt(txt, q) {
			var items = [];
			var tokens = txt.split(options.delimiter);
            var strkw = '';
			// parse returned data for non-empty items
			for (var i = 0; i < tokens.length; i++) {
				var token = $.trim(tokens[i]);
				if (token) {

					/*token = token.replace(
						new RegExp(q, 'ig'),
						function(q) { return '<strong>'+ q +'</strong>'}
						);*/

					items[items.length] = token;
				}
			}
            //alert(items);
			return items;
		}

		function getCurrentResult() {
			/*
			if (!$results.is(':visible'))
				return false;
			*/
			var $currentResult = $('.search_text_suggestion').find("ul").children('li.' + options.selectClass);
			//var $currentResult = document.querySelector();
			//var $currentResult = $results.children('li');
			//console.log($currentResult);
			if (!$currentResult.length)
				$currentResult = false;

			

			return $currentResult;

		}

		function selectCurrentResult() {
			$currentResult = getCurrentResult();

			if ($currentResult) {
				$input.val($currentResult.find('span.suggest').text());
				$results.hide();
				$('.search_text_suggestion').hide();

				if (options.onSelect)
					options.onSelect.apply($input[0]);

			}

		}
		function rightResult() {
			$currentResult = getCurrentResult();
			if($currentResult){
				$currentResult_sub = $currentResult.find('ul.sub_kw_list li.tag_group ul li.selected');

				if ($currentResult_sub.length){
					//console.log($currentResult_sub);
					$currentResult_sub.removeClass('selected').children('a').css('background','#fff').css('color','#000');
					$currentResult_sub.next().addClass('selected').children('a').css('background','#ff8e44').css('color','#fff');
					//$input.val($currentResult.find('span.suggest').text()+' '+$currentResult_sub.next().addClass('selected').children('a').text());
				}else{
					
					$currentResult.find('ul.sub_kw_list li.tag_group ul li:first-child').addClass('selected').children('a').css('background','#ff8e44').css('color','#fff');
					//$input.val($currentResult.find('span.suggest').text()+' '+$currentResult.find('ul.sub_kw_list li.tag_group ul li.selected').children('a').text());
				}
			}
		}
		function leftResult() {
			$currentResult = getCurrentResult();
			if($currentResult){
				$currentResult_sub = $currentResult.find('ul.sub_kw_list li.tag_group ul li.selected');

				if ($currentResult_sub.length){
					//console.log($currentResult_sub);
					$currentResult_sub.removeClass('selected').children('a').css('background','#fff').css('color','#000');
					$currentResult_sub.prev().addClass('selected').children('a').css('background','#ff8e44').css('color','#fff');
					//$input.val($currentResult.find('span.suggest').text()+' '+$currentResult_sub.next().addClass('selected').children('a').text());
				}else{
					
					$currentResult.find('ul.sub_kw_list li.tag_group ul li:last-child').addClass('selected').children('a').css('background','#ff8e44').css('color','#fff');
					//$input.val($currentResult.find('span.suggest').text()+' '+$currentResult.find('ul.sub_kw_list li.tag_group ul li.selected').children('a').text());
				}
			}
		}
		function nextResult() {
			$currentResult = getCurrentResult();
			//console.log("next");
			//console.log($currentResult.next().length);
			if ($currentResult){
				//console.log($currentResult.next());

				$currentResult.find('a').removeClass('active');
				$currentResult.find(".fa-arrow-position").css('margin-left', '10px').removeClass('fa-arrow-position-hover');

				$currentResult.removeClass(options.selectClass).next().addClass(options.selectClass).find('a').addClass('active');		
				$currentResult.next().find(".fa-arrow-position").addClass('fa-arrow-position-hover');

				//var li_top = $currentResult.position();
      			$currentResult.find("ul:first").hide();

      			$currentResult.next().find("ul:first").show().css('padding-top','0px').find("ul.clearfix").show();
      			/*
			    if(li_top.top > 120){
			        $currentResult.next().find("ul:first").show().css('padding-top','80px').find("ul.clearfix").show();
			    }else{
			        $currentResult.next().find("ul:first").show().css('padding-top',li_top.top).find("ul.clearfix").show();
			    }
			    */
			    /*
				$currentResult = getCurrentResult();	
				if ($currentResult){
					if(typeof $currentResult.find('.suggest').children('span:eq(0)').attr('setcid') != 'undefined'){
		      			$input.val($currentResult.find('span.suggest').text().split(' 搜 ')[1]);
		        	}else
		        		$input.val($currentResult.find('span.suggest').text());
	        	}
	        	*/
			}else{

				$('.search_text_suggestion').find("ul#dropdown").children('li:first-child').addClass(options.selectClass).find('a').addClass('active');
				$('.search_text_suggestion').find("ul#dropdown").children('li:first-child').find(".fa-arrow-position").addClass('fa-arrow-position-hover');

				//var li_top = $('.search_text_suggestion').find("ul").children('li:first-child').position();
      			$('.search_text_suggestion').find("ul#dropdown").children('li:first-child').find("ul:first").hide();

      			$('.search_text_suggestion').find("ul#dropdown").children('li:first-child').find("ul:first").show().css('padding-top','0px').find("ul.clearfix").show();
      			/*
			    if(li_top.top > 120){
			        $('.search_text_suggestion').find("ul").children('li:first-child').find("ul:first").show().css('padding-top','80px').find("ul.clearfix").show();
			    }else{
			        $('.search_text_suggestion').find("ul").children('li:first-child').find("ul:first").show().css('padding-top',li_top.top).find("ul.clearfix").show();
			    }
			    */
			    /*
				$currentResult = getCurrentResult();	
				if ($currentResult){
					if(typeof $currentResult.find('.suggest').children('span:eq(0)').attr('setcid') != 'undefined'){
		      		$input.val($currentResult.find('span.suggest').text().split(' 搜 ')[1]);
		        }else
		        	$input.val($currentResult.find('span.suggest').text());
	        	}
	        	*/
				//$results.children('li:first-child').addClass(options.selectClass);
			}
		}

		function prevResult() {
			$currentResult = getCurrentResult();
			//console.log("prev");
			//console.log($currentResult.prev().length);
			if ($currentResult){
				//console.log($currentResult.prev());
				$currentResult.find('a').removeClass('active');
				$currentResult.find(".fa-arrow-position").css('margin-left', '10px').removeClass('fa-arrow-position-hover');

				$currentResult.removeClass(options.selectClass).prev().addClass(options.selectClass).find('a').addClass('active');
				$currentResult.prev().find(".fa-arrow-position").addClass('fa-arrow-position-hover');

				//var li_top = $currentResult.position();
      			$currentResult.find("ul:first").hide();

      			$currentResult.prev().find("ul:first").show().css('padding-top','0px').find("ul.clearfix").show();
      			/*
			    if(li_top.top > 120){
			        $currentResult.prev().find("ul:first").show().css('padding-top','80px').find("ul.clearfix").show();
			    }else{
			        $currentResult.prev().find("ul:first").show().css('padding-top',li_top.top).find("ul.clearfix").show();
			    }
			    8?
				/*
				$currentResult = getCurrentResult();
				if ($currentResult){
					if(typeof $currentResult.find('.suggest').children('span:eq(0)').attr('setcid') != 'undefined'){
		      		$input.val($currentResult.find('span.suggest').text().split(' 搜 ')[1]);
		        }else
		        	$input.val($currentResult.find('span.suggest').text());
	        	}
	        	*/
			}else{
				$('.search_text_suggestion').find("ul#dropdown").children('li:last-child').addClass(options.selectClass).find('a').addClass('active');

				$('.search_text_suggestion').find("ul#dropdown").children('li:last-child').addClass(options.selectClass).find('a').addClass('active');
				$('.search_text_suggestion').find("ul#dropdown").children('li:last-child').find(".fa-arrow-position").addClass('fa-arrow-position-hover');

				//var li_top = $('.search_text_suggestion').find("ul").children('li:last-child').position();
      			$('.search_text_suggestion').find("ul#dropdown").children('li:last-child').find("ul:first").hide();

      			$('.search_text_suggestion').find("ul#dropdown").children('li:last-child').find("ul:first").show().css('padding-top','0px').find("ul.clearfix").show()
      			/*
			    if(li_top.top > 120){
			        $('.search_text_suggestion').find("ul").children('li:last-child').find("ul:first").show().css('padding-top','80px').find("ul.clearfix").show();
			    }else{
			        $('.search_text_suggestion').find("ul").children('li:last-child').find("ul:first").show().css('padding-top',li_top.top).find("ul.clearfix").show();
			    }*/
			    /*
				$currentResult = getCurrentResult();	
				if ($currentResult){
					if(typeof $currentResult.find('.suggest').children('span:eq(0)').attr('setcid') != 'undefined'){
		      		$input.val($currentResult.find('span.suggest').text().split(' 搜 ')[1]);
		        }else
		        	$input.val($currentResult.find('span.suggest').text());
	        	}
	        	*/
      		}
		}

	}

	$.fn.suggest = function(source, options) {

		if (!source)
			return;

		options = options || {};
		options.source = source;
		options.delay = options.delay || 100;
		options.resultsClass = options.resultsClass || 'ac_results';
		options.selectClass = options.selectClass || 'ac_over';
		options.matchClass = options.matchClass || 'ac_match';
		options.minchars = options.minchars || 1;
		options.delimiter = options.delimiter || '\n';
		options.onSelect = options.onSelect || false;
		options.maxCacheSize = options.maxCacheSize || 65536;

		this.each(function() {
			new $.suggest(this, options);
		});

		return this;

	};

})(jQuery);