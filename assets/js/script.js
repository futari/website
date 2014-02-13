$('document').ready(function() {
  $('#header').load('./header.php', function() {

    $('.menu ul li').animate({opacity: 0.7}, 800);
    $('.submenu .codestuff').fadeIn();

    $('.menu > ul > li').hover(function() {
      var $this = $(this);
      $this.animate({opacity: 1}, 400);
      var submenu = $('a', $this).attr('href').substr(1);
      if (submenu.length > 1) {
        $('.submenu ul').fadeOut();
        switch(submenu) {
          case 'characters':
          case 'rmp':
            $('.submenu .characters').fadeIn();
            break;
          case 'codestuff':
          case 'cpp':
          case 'java':
          case 'webstuff':
          default:
            $('.submenu .codestuff').fadeIn();
            break;
        }
      }
    }, function() {
      var $this = $(this);
      $this.animate({opacity: 0.7}, 400);
    });
    
    var menu_click = function() {
      if ($(this).attr('href').length > 1) {
        var uri = './' + $(this).attr('href').substr(1) + '.php';
        if (uri.length > 0) {
          $('#container').fadeOut(function() {
            $(this).load(uri, function() {
              $(this).fadeIn();
            });
          });
        }
      }
    }
    
    $('.menu a').click(menu_click);
    $('.submenu a').click(menu_click);
  });
  
  $('#footer').load('./footer.php');
  
  if (window.location.hash.substr(1).length > 0) {
    $('#container').load('./' + window.location.hash.substr(1) + '.php');
  }
});