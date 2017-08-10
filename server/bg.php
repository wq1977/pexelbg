<?php

    echo("window.bgimages=[");
    date_default_timezone_set('UTC');
    $seed=(new DateTime())->format('Y-m-d+H%3Ai%3As++0000');
    $cnt = file_get_contents("https://www.pexels.com/?format=js&page=1&seed=$seed");
    $pattern = '/<img width=\\\\"([0-9]*)\\\\" height=\\\\"([0-9]*)\\\\" style=\\\\"[^"]*\\\\" alt=\\\\"[^"]*\\\\" data-pin-media=\\\\"[^"]*\\\\" src=\\\\"(https:\/\/images.pexels.com\/photos\/[0-9]*\/[a-zA-Z0-9-]*.jpg)/';
    $count = preg_match_all($pattern, $cnt, $matches, PREG_SET_ORDER);
    $select = $matches[rand() % count($matches)];

    $result = [];
    for ($i=0;$i<count($matches);$i++){
        $item = $matches[$i];
        if (floatval($item[2]) == 0) continue;
        $w_h = floatval($item[1]) / floatval($item[2]);
        $stand = 16.0 / 9;
        $check = abs($w_h - $stand);
        if ($check < 0.3) {
            $url = $item[3];
            array_push($result, "\"${url}?w=1880&auto=compress&cs=tinysrgb\",");
        }
    }

    echo($result[rand() % count($result)]);
    echo("]");

?>
