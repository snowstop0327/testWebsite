$(document).ready(function() {
        $('.main_category_list ul li a').click(function(){
           $('.main_category_list ul li a').attr('class', '');
           $(this).addClass('option_this');
        });
        /* selector*/
        var srhform = $('#submit');
        var commodities_list = $('.commodities_list');
        var commodities_list_box = $('.commodities_list_box');        
        var search_category_list = $('.search_category_list');       
        var hot = $('.hot_arrow');
        var hot_more_list = $('.hot_more_list');
        var user_menu_btn_open = $('.user_menu_btn');
        var user_menu_list = $('.user_menu_list');
        var headbox_browsing = $('.headboxtech');
        var content_box = $('#content_box');
        var content_box_index = $('#content_box_index');
        var m_arrow = $('div#m_arrow');
        var search_category = $('div#search_category');
        var hot_arrow = $('div#hot_arrow');
        var bank_more = $('li#bank_more');
        var fixtop = 0;
        var listset = 0;
        /*  main menu  */
        commodities_list.click(function(event){
            event.stopPropagation();
            if(listset!='m'){
                commodities_list_box.slideDown('fast');
                m_arrow.attr('class', 'arrowup');
                search_category.attr('class', 'search_category');
                hot_arrow.attr('class', 'hot_arrowdown');                
                listset = 'm';
            }
            else{
                commodities_list_box.slideUp('fast');
                m_arrow.attr('class', 'arrowdown');               
                listset = 0;
            }
            hot_more_list.slideUp('fast');
            search_category_list.slideUp('fast');
            user_menu_list.slideUp('fast');  
            $(".user_info .notice-count").fadeIn('fast');     
        });       
        /*  category menu  */
        search_category.click(function(event){
            event.stopPropagation();
            if(listset!='c'){
                search_category_list.slideDown('fast');
                listset = 'c';
                search_category.attr('class', 'search_category_open');
                m_arrow.attr('class', 'arrowdown');
                hot_arrow.attr('class', 'hot_arrowdown');                
            }
            else{
                search_category_list.slideUp('fast');
                search_category.attr('class', 'search_category');
                listset = 0;
            }            
            commodities_list_box.slideUp('fast');
            hot_more_list.slideUp('fast');
            user_menu_list.slideUp('fast');  
            $(".user_info .notice-count").fadeIn('fast');         
        });
        $('li a.category').click(function(){
            search_category.html($(this).text());
            var cid = $(this).attr('id');
            if(cid == 'ezprice'){
                srhform.attr('action','http://ezprice.com.tw/price_list.php');
                $('#srhkw1').attr('name','kw');
                $('#multisrh').remove();
            }
            else if(cid == 'lady'){
                srhform.attr('action','http://lady.ezprice.com.tw/datalist.php');
                $('#srhkw1').attr('name','kw');
                $('#multisrh').remove();
            }
            /*else if(cid == 'ubook'){
                srhform.attr('action','http://www.urbook.com.tw/book_list.php');
                $('#srhkw1').attr('name','kw');
                $('#multisrh').remove();
            }
            else if(cid == 'hotels'){
                srhform.attr('action','http://hotels.ezprice.com.tw/Search.aspx');
                $('#srhkw1').attr('name','search');
                $('#multisrh').remove();
            }*/
            else if(cid == 'pama'){
                srhform.attr('action','http://ezprice.com.tw/price_list.php');
                $('#srhkw1').attr('name','kw');
                $('#multisrh').remove();
            }
            else if(cid == 'credit'){
                srhform.attr('action','http://ezprice.com.tw/multi/product.php?cate_id=1&cn=%E5%87%BA%E5%9C%8B%E6%97%85%E9%81%8A&pn=%E4%BF%A1%E7%94%A8%E5%8D%A1');
                srhform.append('<div id="multisrh"><input type="radio" name="cate_id" value="1" checked style="display:none;" readonly/><input type="radio" name="cn" value="信用卡" checked style="display:none;" readonly/><input type="radio" name="pn" value="信用卡" checked style="display:none;" readonly/></div>');                           
                $('#srhkw1').attr('name','kw');
            }            
        });
        $('#srh_btn').click(function(){
            srhform.submit();
        });
        /*  hot list  */
        hot.click(function(event){
            event.stopPropagation();
            if(listset!='h'){
                hot_more_list.slideDown('fast');
                hot_arrow.attr('class', 'hot_arrowup');
                m_arrow.attr('class', 'arrowdown');
                search_category.attr('class', 'search_category');               
                listset = 'h';
            }
            else{
                hot_more_list.slideUp('fast');
                hot_arrow.attr('class', 'hot_arrowdown');
                listset = 0;
            }            
            commodities_list_box.slideUp('fast');
            search_category_list.slideUp('fast');
            user_menu_list.slideUp('fast');
            $(".user_info .notice-count").fadeIn('fast');           
        });
        user_menu_btn_open.click(function(event){
            event.stopPropagation();
            if(listset!='u'){
                user_menu_list.slideDown('fast');
                $(".user_info .notice-count").hide();
                listset = 'u';
            }
            else{
            		$(".user_info .notice-count").fadeIn('fast');
                user_menu_list.slideUp('fast');
                listset = 0;
            }            
            commodities_list_box.slideUp('fast');
            hot_more_list.slideUp('fast');
            search_category_list.slideUp('fast');          
        });
        /* click body   */
        $('.screen-height').click(function(event){
            event.stopPropagation();
            listset = 0;
            commodities_list_box.slideUp('fast');
            hot_more_list.slideUp('fast');
            search_category_list.slideUp('fast');
            user_menu_list.slideUp('fast');
            $(".user_info .notice-count").fadeIn('fast');
            m_arrow.attr('class', 'arrowdown');
            search_category.attr('class', 'search_category');
            hot_arrow.attr('class', 'hot_arrowdown');
        });                          
        
        
        $('#filter_list_open').click(function(){
            $('#filter_list_open').remove();
            $('.filter_list_hide').attr('class','filter_list_open');
        });
        
        $('#filter_search').click(function(){
            $('#srhfilter').submit();
        });

        delete commodities_list;
        delete commodities_list_box;        
        delete search_category_list;       
        delete hot;
        delete hot_more_list;
        delete user_menu_btn_open;
        delete user_menu_list;
        delete headbox_browsing;
        delete content_box;
        delete m_arrow;
        delete search_category;
        delete hot_arrow;            
    });

function credit_back(category,level){
    $.get("product_s.php",
            {"category":category,
             "level":level},
                function(txt){
                    alert("ajax "+txt);
                });
    }