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

// $(".showcase .item").hover(function(){
//   $('.showcase .overlay').css("transform", "scale(1.1)");
// });

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

$(".fixed-icon").click(function() {
    $('html,body').animate({
        scrollTop: $("#nav").offset().top},
        'slow');
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

  //   $('.owl-two').owlCarousel({
  //     loop:true,
  //  margin:10,
  //  items:3,
  //  autoplay:false,
  //  autoplayTimeout:400000,
  //   nav:true,
  //  navigation:true,
  // navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
  //  autoplayHoverPause:true,
  //  responsive:{
  //      0:{
  //        items:1,
       
  //      },
  //      768:{
  //        items:2,   
  //      },
  //      1440:{
  //         items:3, 
        
  //      },
  //      576:{
  //          items:1,
  //          nav:true,
           
  //      }
      
  //  }
  //  });

  

  //    // Custom Navigation Events
  // $(".next").click(function(){
  //   owl.trigger('owl.next');
  // })
  // $(".prev").click(function(){
  //   owl.trigger('owl.prev');
  // })

    

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

// $(".owl-two").slick({
//   dots:true,
//   slidesToShow:1,
//   slidesToScroll:1,
//   autoplay:false,
//   autoplaySpeed: 2000,
//   prevArrow: $('.control .prev'),
//   responsive: [
// 		{
// 			breakpoint:576,
// 			settings: {
// 				slidesToShow:1,
// 				slidesToScroll:1,
// 			}
// 		},
// 		{
// 			breakpoint:1250,
// 			settings: {
// 				slidesToShow:3,
// 				slidesToScroll:3,
// 			}
// 		},
		
		
// 	]
  
// });
















