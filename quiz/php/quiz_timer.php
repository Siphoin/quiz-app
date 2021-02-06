<?php
session_start();

if (!isset($_SESSION['timer'])) {
    $_SESSION['timer'] = new DateTime();
    $_SESSION['timer'] =  $_SESSION['timer']->setTime(-2, 0, 0);
}

$_SESSION['timer']->add(new DateInterval('PT1S'));
echo $_SESSION['timer']->format('D M d Y H:i:s O');
?>