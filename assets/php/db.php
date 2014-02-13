<?php
  session_start();
  $_SESSION['db'] = new mysqli('localhost', 'root', 'root', 'lift_tracker');
  
  function login($username, $password) {
    if (!$_SESSION['db'])
      $_SESSION['db'] = new mysqli('localhost', 'root', 'root', 'lift_tracker');
  
    $_SESSION['user'] = $_SESSION['db']->query(
      "SELECT * FROM `users` 
      WHERE `username` = '".$username."' 
      AND `password` = md5('".$password."')")
      ->fetch_array();
    
    $_SESSION['types'] = $_SESSION['db']
      ->query("SELECT * FROM `lift_type`")->fetch_all(MYSQLI_ASSOC);
  }
  
  function logout() {
    $_SESSION['db']->close();
    $_SESSION = array();
    if (isset($_COOKIE[session_name()]))
    {
       $cookie_expires  = time() - date('Z') - 3600;
       setcookie(session_name(), '', $cookie_expires, '/');
    }
    session_unset();
    session_destroy();
  }
  
  function get_recent_workout($user_id) {
    return $_SESSION['db']->query("
            SELECT * FROM `workouts` 
            LEFT JOIN `lifts` 
            ON `workouts`.`id` = `lifts`.`workout_id` 
            WHERE `workouts`.`user_id` = '".$user_id."'
            AND `workouts`.`date` = (
              SELECT Max(`workouts`.`date`) as 'MaxDate'
              FROM `workouts`
              WHERE `workouts`.`user_id` = '".$user_id."')
            ORDER BY `lifts`.`lift_type`")
            ->fetch_all(MYSQLI_ASSOC);
  }
  
  function get_recent_lift($user_id, $lift_type) {
    return $_SESSION['db']->query("
            SELECT * FROM `lifts` 
            WHERE `lifts`.`user_id` = '".$user_id."'
            AND `lifts`.`date` = (
              SELECT Max(`lifts`.`date`) as 'MaxDate'
              FROM `lifts`
              WHERE `lifts`.`user_id` = '".$user_id."')
            AND `lifts`.`lift_type` = '".$lift_type."'")
            ->fetch_all(MYSQLI_ASSOC);
  }
  
  function get_lift($user_id, $lift_type) {
    return $_SESSION['db']->query("
            SELECT * FROM `lifts` 
            WHERE `lifts`.`user_id` = '".$user_id."'
            AND `lifts`.`lift_type` = '".$lift_type."'")
            ->fetch_all(MYSQLI_ASSOC);
  }
  
  function get_workout($user_id, $workout_id) {
    return $_SESSION['db']->query("
            SELECT * FROM `workouts` 
            LEFT JOIN `lifts` 
            ON `workouts`.`id` = `lifts`.`workout_id` 
            WHERE `workouts`.`user_id` = '".$user_id."'
            AND `workouts`.`id` = '".$workout_id."'")
            ->fetch_all(MYSQLI_ASSOC);
  }
  
?>