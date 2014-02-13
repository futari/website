$(function() {  
  $('#login').click(function() {
    $('#container').fadeOut(function() {
      var uri = './' + window.location.hash.substr(1) + '.php';
      var data = {'username': $('#username').val(), 'password': $('#password').val()};
      $(this).load(uri, data, function() {
        $(this).fadeIn();
      });
    });
  });
  
  $('#logout').click(function() {
    $('#container').fadeOut(function() {
      var uri = './' + window.location.hash.substr(1) + '.php';
      var data = {'logout': true};
      $(this).load(uri, data, function() {
        location.reload();
      });
    });
  });
  
  $('a.button').click(function() {
    var uri = './' + window.location.hash.substr(1) + '.php';
    var data = {'lift_type': parseInt($(this).attr('value')), 'lift_name': $(this).html()};
    $('#container').fadeOut(function() {
      $(this).load(uri, data, function() {
        $(this).fadeIn();
      });
    });
  });
  
/*

    var create_tree = function(lift_data, color) {
      var trees = [];
      
      $.each(lift_data, function(key, item) {
        var children = [];
        var grandchildren = [];
        
        for (var i = 0; i < item['rep']; i++) {
          grandchildren.push({color: color[2]});
        }
        
        for (i = 0; i < item['set']; i++) {
          children.push({
            color: color[1],
            value: item['rep'] + ' REPS',
            children: grandchildren
          });
        }
      
        var tree = {
          color: color[0],
          value: item['weight'] + ' LBS',
          children: children
        };
        
        trees.push(tree);
      });
      return trees;
    };
    
    var workout_summary = function(stats) {
      var $container = $('#test');
      
      $.each(lift_types, function(key, lift) {
        var lift_data = $.grep(stats, function(n, i) {
          return n['lift_type'] == lift['id'];
        });
        
        var $lift = $('<div id="' + lift['name'] + '">');
        $lift.appendTo($container);
        var trees = create_tree(lift_data, ['#69D2E7', '#E0E4CC', '#A7DBD8']);
        
        for (var i = 0; i < trees.length; i++) {
          var tree = $('<div class="tree">');
          $lift.append(tree);
          tree.tree_circle({tree: trees[i], radius: 50});
        }
      });
    };
    
*/
  
});