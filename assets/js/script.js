$('document').ready(function() {
  $('#header').load('./header.php', function() {
    var $header = $(this);
  
    $('.menu > li', $header).animate({opacity: 1}, 800);

    $('.menu > li > a', $header).hover(function() {
      var $this = $(this);
      $this.animate({opacity: 0.7}, 400);
    }, function() {
      var $this = $(this);
      $this.animate({opacity: 1}, 400);
    });
    
    var menu_click = function(href) {
      // clicks on the header menu, does animation and loads page in container
      $('.submenu').fadeOut();
      $('.menu', $header).animate({top: "0%"}, 600, function() {
        var $this = $(this);
        $this.animate({padding: "0px"}, 800);
        
        $('li', $this).animate({margin: "0px"}, 800, function() {
          $('.button_list').fadeIn(800);
          if ($('.submenu.' + href.substr(1)).length > 0) {
            $('.submenu.' + href.substr(1)).fadeIn();
            
            if (href.substr(1) == 'codestuff') {
              $('.project:first').fadeIn();
            }
          }
        });
        $this.parent().css('height', '200px');
      
        if (href.length > 1) {
          var uri = './' + href.substr(1) + '.php';
          if (uri.length > 0) {
            $('#container').fadeOut(function() {
              $(this).load(uri, function() {
                $(this).fadeIn();
                
              });
            });
          }
        }
      });
    }
    
    $('.submenu a').hover(function() {
      $('.submenu .hover_text').html($(this).attr('href'));
    }, function() {
      $('.submenu .hover_text').html('');
    });
    
    var submenu_click = function(href) {      
      $.when($('.project').fadeOut()).done(function() {
        $('.project#' + href).fadeIn();
      });
    };
    
    $('.menu > li > a', $header).click(function() {
      menu_click($(this).attr('href'));
    });
    
    $('.submenu a', $header).click(function(event) {
      event.preventDefault();
      submenu_click($(this).attr('href'));
    });
    
    // loading page
    if (window.location.hash.substr(1).length > 0) {
      menu_click(window.location.hash);
    }
    
  });
});