<?php
$short = $_GET['s'];
$long = $_GET['l'];
$switch = 1;
$file = json_decode(file_get_contents('db.json'));
if ($file != NULL) {
  for ($i=0; $i < count($file); $i++) {
      if($file[$i]->short == $short){
        $switch = 0;
      }
  }
}

if ($switch) {
  $file[] = array('short'=>$short, 'long'=>$long);
  $dir = 'go/'.$short;
  mkdir($dir, 0700, true);
  $indx = $dir.'/'.'index.html';

  $htmlStr = '<html>
    <head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="refresh" content="0; url='.$long.'"
    </head><body>redirecting...
    </body></html>';
  $fp = fopen($indx, 'a');
  fwrite($fp, '');
  fwrite($fp, $htmlStr);
  fclose($fp);
}
else {
  echo "Short link already exist (try to edit)";
}
file_put_contents('db.json',json_encode($file));
unset($file);

 ?>
