<?php
  include "./assets/php/db.php";
    
  if ($_POST['username'] && $_POST['password'])
    login($_POST['username'], $_POST['password']);
  if ($_SESSION['user']) {
    $recent = get_recent_workout($_SESSION['user']['id']);
    $stats = [];
    foreach($_SESSION['types'] as $type)
      $stats[$type['name']] = get_lift($_SESSION['user']['id'], $type['id']);    
  }
  if ($_POST['logout']) 
    logout();
?>

<script type="text/javascript" src="./assets/js/lifts.js"></script>

<script type="text/javascript">
  $(function() {
    var lift_types = <?php echo json_encode($_SESSION['types']); ?>;
    var stats = <?php echo json_encode($result); ?>;
    
    var workout_summary = function(stats) {
      var $container = $('#test');
      
      $.each(lift_types, function(key, lift) {
        var lift_data = $.grep(stats, function(n, i) {
          return n['lift_type'] == lift['id'];
        });
        /*
        var total = 0;
        $.each(lift_data, function(key, data) {
          total += data['weight'] * data['rep'] * data['set'];
        });
        
        var $lift = $('<div id="' + lift['name'] + '">');
        var $title = $('<div class="title-container">');
        $title.append($('<div class="title">').append($('<h2>' + lift['name'] + '</h2>')));
        $container.append($lift.append($title));
        
        var $content = $('<div class="stats">').appendTo($lift);
        var $total = $('<span>total weight lifted: ' + total + ' lbs</span>');
        var $table = $('<table>');
        $table.append($('<th>sets</th>')).append($('<th>reps</th>')).append($('<th>weight</th>'));
        
        $table.append($('<tr>'));
        $content.append($total);
        */
      });
    };
    
    if (stats) {
      workout_summary(stats);
    }
    
  });
</script>

<div id="subheader">
  <h1>Lift Tracker</h1>
  <div id="login_box">
    <?php if (!$_SESSION['user']): ?>
      <input type="text" id="username" name="username"/>
      <input type="text" id="password" name="password"/>
      <a href="#webstuff" id="login" class="button">Login</a>
    <?php else: ?>
      <a href="#webstuff" id="logout" class="button">Logout</a>
    <?php endif; ?>
  </div>
</div>

<div id="stats">

  <?php if (sizeof($recent) > 0): ?>
    <div>  
      <div class='title-container'>
        <div class='title'>
          <h2>Most recent</h2>
        </div>
      </div>
      <div class='date'>
        Date: <?php echo $recent[0]['date']; ?>
      </div>
      <table>
        <thead>
          <tr>
            <th>Lift</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Weight</th>
          </tr>
        </thead>
        <?php foreach($recent as $data): ?>
          <tr>
            <td><?php echo $_SESSION['types'][$data['lift_type']]['name']; ?></td>
            <td><?php echo $data['set']; ?></td>
            <td><?php echo $data['rep']; ?></td>
            <td><?php echo $data['weight']; ?> lbs</td>
          </tr>
        <?php endforeach; ?>
      </table>
    </div>
  <?php endif; ?>
    
</div>