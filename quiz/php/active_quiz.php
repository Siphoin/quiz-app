<?php
  session_start(['cookie_path' => '/']); 
echo $_SESSION['data'];
?>