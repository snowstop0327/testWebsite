$(function(){
  //header click events
  var headerClicks = $('.HD_Cate, .HD_Hot_more, .HD_Member, .HD_Search_Cate, .HD_Unit');
  function eventStop(){
    headerClicks.siblings('ul').slideUp('fast').parent().removeClass('_open');
    event.stopPropagation();
  }
  function eventAllStop(){
    event.stopPropagation();
  }
  headerClicks.click(function(){
    if ($(this).parent().hasClass('_open')){
      $(this).siblings('ul').slideUp('fast').parent().removeClass('_open');
    } else {
      eventStop();
      $(this).siblings('ul').slideDown('fast').parent().addClass('_open');
    }
    if ($(this).is($('.HD_Cate'))){
      $('.HD_Cate_list').addClass('_padHide')
    }
  })
  $('.WD_H, .FT').click(function(){
    eventStop();
    $('.HD_Unit_Box').removeClass('_drop')
    $('._unit_more').removeClass('_on')
  })
  headerClicks.siblings('ul').click(function(){
    eventAllStop();
  })
  //header category list event
  $('.HD_Cate_list_pad ._subOpen').click(function(){
    $('.HD_Cate_list').css('display','block').removeClass('_padHide');
    $('.HD_Cate_list_pad').css('display','none');
  })
  $('.HD_Cate_list .HD_btn_back').click(function(){
    $('.HD_Cate_list').css('display','none');
    $('.HD_Cate_list_pad').css('display','block');
  })
   $('._unit_more').click(function(){
    $('.HD_Unit_Box').toggleClass('_drop')
    $('._unit_more').toggleClass('_on')
  })
  var fixtop = 0;
  $(window).scroll(function(){
    if($(document).scrollTop()>40 && fixtop==0){
      $('.HD').addClass('_fix');
      fixtop = 1;
    }
    else if(fixtop==1 && $(document).scrollTop()<=40 ){
       $('.HD').removeClass('_fix');
       fixtop = 0;
    }
  });
})

$(function(){
  $(window).scroll(function(){
    if( $(window).scrollTop() > 150 ){
      $(".img-top").fadeIn("500");    
    }else{
      $(".img-top").fadeOut("500");
    } 
  });
  $(".img-top").click(function goTop(){ 
    $("html,body").animate({scrollTop:0},1000); 
  });    
});

$(function(){
  var user_menu = $('.user_menu_btn');
  var user_menu_list = $('.user_menu_list');
  var listset = 0;

  // header reset
  function hd_reset(){
    event.stopPropagation();
    user_menu.removeClass('is-open');
    user_menu_list.stop().slideUp('fast');
    $(".user_info .notice-count").fadeIn('fast');
  }
  // user menu
  user_menu.click(function(event){
    if (listset == 'u'){
      listset = 0;
    } else {
      $(this).addClass('is-open');
      listset = 'u';
    }
    user_menu_list.stop().slideToggle('fast');
  });
})