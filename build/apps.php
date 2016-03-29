<?php
/**
 * Task for generating JSON and readme content for apps
 */
$files = glob($argv[1], GLOB_BRACE);
$readme = '';
foreach ($files as $file) {
    $folder = explode('/', $file);
    $app = json_decode(file_get_contents($file) , true);
    $apps_arr[$folder[count($folder) - 2]] = json_decode(file_get_contents($file) , true);
    $readme.= '|[' . $app['name'] . '](' . $folder[count($folder) - 2] . ')|' . $app['description'] . '|[Restya](http://restya.com/) |' . $app['version'] . '|' . (($app['price'] == 0) ? "Free" : $app['price']) . '|[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/' . $folder[count($folder) - 2] . '-v' . $app['version'] . '.zip)|[Repository](' . $folder[count($folder) - 2] . ')|';
    $readme.= "\n";
}
file_put_contents('apps.json', json_encode($apps_arr, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
file_put_contents('readme.txt', $readme);
