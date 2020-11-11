$('.showcase .item').hover(function (){
    $(this).addClass('hover');
    $(this).find('.overlay').hide().delay(1000).fadeIn(3000);
}).mouseleave(function (){
    $(this).find('.overlay').show();
});

$('.you i,.select-selected').on('click',function (){
   $('.select-items').slideToggle();
});


 $('.currency-container').hide();
$(".dollar").click(function(){
    $(".currency-container").slideToggle();
  });

$(".btnn").click(function() {
  $(".drop-menu").toggle();  
});



$('.carousel').carousel({
    interval: false,
  });

window.onload = function() {
  $(".currency-container").hide();
};

document.onscroll = function() {
        if (window.innerHeight + window.scrollY > document.body.clientHeight) {
          $(".fixed-icon").show();
        }
        else{
          $(".fixed-icon").hide();
        }
    }

// $(".fixed-icon").click(function() {
//     $('html,body').animate({
//         scrollTop: $("#nav").offset().top},
//         'slow');
// });

$('a.fixed-icon[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (t) {
  if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
      var e = $(this.hash);
      e = e.length ? e : $("[name=" + this.hash.slice(1) + "]"), e.length && (t.preventDefault(), $("html, body").animate({
          scrollTop: e.offset().top
      }, 600, function () {
          var t = $(e);
          if (t.focus(), t.is(":focus")) return !1;
          t.attr("tabindex", "-1"), t.focus()
      }))
  }
});



$('.carousel').carousel();

$(document).ready(function(){
    $('.owl-one').owlCarousel({
       loop:true,
    margin:10,
    autoplay:false,
    autoplayTimeout:400000,
       nav:true,
    navigation:true,
    navText: ['<span class="fa fa-angle-left"></span>','<span class="fa fa-angle-right"></span>'],
    autoplayHoverPause:true,
    responsive:{
        0:{
          items:4,
        
        },
        768:{
          items:5,   
        },
        1440:{
           items:6, 
         
        },
        576:{
            items:3,
            nav:true,
            
        }
       
    }
    });

    

});

$(document).ready(function(){
  var owl = $('.owl-two');
  owl.owlCarousel({
    loop:true,
    margin:10,
    items:3,
    autoplay:false,
    autoplayTimeout:400000,
     nav:true,
    navigation:true,
    autoplayHoverPause:true,
    responsive:{
        0:{
          items:1,
        
        },
        768:{
          items:2,   
        },
        1440:{
           items:3, 
         
        },
        576:{
            items:1,
            nav:true,
            
        }
       
    }
  });
  
  // Custom Button
  $('.controls mb-3 owl-prev .prev').click(function() {
    owl.trigger('next.owl.carousel');
  });
  $('.controls mb-3 owl-prev .next').click(function() {
    owl.trigger('prev.owl.carousel');
  });
  
});

// 

$(".dropdown a").click(function(){

  $(this).parents(".dropdown").find('.dropdown-toggle').text($(this).text());
  $(this).parents(".dropdown").find('.dropdown-toggle').val($(this).text());

});

