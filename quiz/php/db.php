<?php


require 'rb-mysql.php';


R::setup( 'mysql:host=localhost;dbname=quiz',
'mysql', 'mysql' );

$isConnected = R::testConnection();

if (!$isConnected) {
    http_response_code(500);
    exit();
}

else {
    http_response_code(200);
}

function createQuestrions($data)
{
    try {
        $obj = json_decode($data);
        $params = get_object_vars($obj);
        $quiz_el = R::dispense('questions');
        foreach ($params as $key => $value) {
            if (gettype($value) != 'array') {
                $quiz_el->$key = $value;
            }

            else {
                $array = $value;
                    $quiz_el->$key = json_encode($array);

            }
        }

        R::store($quiz_el);
        http_response_code(201);
    } catch (Throwable $th) {
        echo "Parse error";
        throw $th;
    }
}

function getAllTopics()
{
    $array = R::findAll('questions');
    $result = new stdClass();
    $result->data = $array;
    return json_encode($result);
}

function getTopicByIndex($index)
{
    return R::findOne('questions', 'topic = ?', array($index));
}
?>

