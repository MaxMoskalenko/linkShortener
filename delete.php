<?php
$link = $_GET['link'];
$file=json_decode(file_get_contents('db.json'));
$newfile = $file;
$size = count($file);

unset($file);
$i = 0;
for ($i=0; $i < $size; $i++) {
  if ($newfile[$i]->short != $link) {
    $short = $newfile[$i]->short;
    $long = $newfile[$i]->long;
    echo $short.' '.$long.'  ';
    $file[] = array('short'=>$short, 'long'=>$long);
  }

}

file_put_contents('db.json',json_encode($file));
unset($file);

$count = substr_count($link, '/');

unlink('go/'.$link.'/index.html');

rmdir('go/'.$link.'/');

$rlink = strrev($link);
for ($i=0; $i < $count; $i++) {
  $pos = strrpos($link, '/').' ';
  $link = substr_replace($link, '', $pos);
  rmdir('go/'.$link.'/');
}
 ?>
