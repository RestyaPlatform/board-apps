<?php
/**
 * Task for generating JSON and readme content for apps
 */
$files = array();
function _traverse_directory($dir, $dir_count)
{
    global $files;
    $handle = opendir($dir);
    while (false !== ($readdir = readdir($handle))) {
        if ($readdir != '.' && $readdir != '..' && $readdir != 'node_modules' && $readdir != 'build' && $readdir != '.git') {
            $path = $dir . '/' . $readdir;
            if (is_dir($path)) {
                ++$dir_count;
                _traverse_directory($path, $dir_count);
            }
            if (is_file($path) && preg_match('/r_[0-9a-zA-Z_]*\/app.json/', $path)) {
                $files[] = $path;
            }
        }
    }
    closedir($handle);
    return false;
}
_traverse_directory('/usr/share/nginx/html/RestyaPlatform/board-apps', 0);
$readme = '';
asort($files);
foreach ($files as $file) {
    $folder = explode('/', $file);
    $app = json_decode(file_get_contents($file) , true);
    $apps_arr[$folder[count($folder) - 2]] = json_decode(file_get_contents($file) , true);
    if ($app['price'] == "Free") {
        $download = '[Download](https://github.com/RestyaPlatform/board-apps/releases/download/v1/' . $folder[count($folder) - 2] . '-v' . $app['version'] . '.zip)';
        $app_name = '[' . $app['name'] . '](' . $folder[count($folder) - 2] . ')';
    } else {
        $download = '[Visit](http://restya.com/board/apps/' . $app['id'] . ')';
        $app_name = $app['name'];
    }
    $readme.= '|' . $app_name . '|' . $app['description'] . '|[Restya](http://restya.com/) |' . $app['version'] . '|' . $app['price'] . '|' . $download . '|';
    $readme.= "\n";
}
file_put_contents('apps.json', json_encode($apps_arr, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
file_put_contents('readme.txt', $readme);
