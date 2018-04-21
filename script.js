function send() {
  var long = document.getElementById('long').value;
  var short = document.getElementById('short').value;
  if (long != '' && short != '') {
  long = long.replace("#", "%23"); //# дурно влияет на query запрос
  document.getElementById('long').value = '';
  document.getElementById('short').value = '';

  var xhttp = new XMLHttpRequest();
  var query = "?l=" + long + "&s=" + short;

  xhttp.open("GET", "add.php" + query, true);
  xhttp.send();
  xhttp.onload = tryto;
  function tryto() {
    if (this.responseText != '') {
      // alert(this.responseText);
      // console.log(this.responseText);
    }
    document.getElementById('links').innerHTML = '';
    addLinks();
  }
}
else {
    alert('Paste long link and Enter short link');
}
}

function addLinks() {
  var xhttp = new XMLHttpRequest();
  xhttp.onload = tryto;
  xhttp.open("GET", "show-link.php", true);
  xhttp.send();
  function tryto() {
    var ans = this.responseText;
      ans = JSON.parse(ans);
      for (var i = 0; i < ans.length; i++) {  //создает елементики с подсказками
        var box = document.createElement('DIV');
        var text1 = document.createElement('P');
        var text2 = document.createElement('P');
        var shortBox = document.createElement('P');
        var longBox = document.createElement('P');
        var butDelete = document.createElement('BUTTON');
        var butEdit = document.createElement('BUTTON');
        box.classList = 'row linkBox';

        shortBox.innerHTML = ans[i].short;                //создание бокса короткой ссылки
        shortBox.id = ans[i].short + '_' + 'short';
        shortBox.addEventListener("click", editLink);

        longBox.innerHTML = ans[i].long;                  //создание бокса длинной ссылки
        longBox.id = ans[i].short + '_' + 'long';
        longBox.addEventListener("click", editLink);

        text1.innerHTML = 'https://shpp.me/go/';          //воспомагательные строки
        text2.innerHTML = ' ---> ';

        butDelete.id = ans[i].short;                      //кнопка DELETE
        butDelete.classList = 'butLink fa fa-trash';
        butDelete.addEventListener("click", deleteLink);

        butEdit.id = ans[i].short;                       //кнопка EDIT
        butEdit.classList = 'butLink fa fa-pencil';
        butEdit.addEventListener("click", newEditLink);

        box.appendChild(butEdit);
        box.appendChild(butDelete);
        box.appendChild(text1);
        box.appendChild(shortBox);
        box.appendChild(text2);
        box.appendChild(longBox);
        document.getElementById('links').appendChild(box);
      }
  }
}
function deleteLink() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "delete.php?link=" + this.id, true);
  xhttp.send();
  xhttp.onload = tryto;
  function tryto() {
    document.getElementById('links').innerHTML = '';
    addLinks();
  }

}
function editLink() {
  var person = prompt('Edit link', this.innerHTML);
  if (person == '') {
    prompt('Link can\'t be null', this.innerHTML);
  }
  this.innerHTML = person;
}
function newEditLink() {
  var short = document.getElementById(this.id + '_short').innerHTML;
  var long = document.getElementById(this.id + '_long').innerHTML;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "delete.php?link=" + this.id, true);
  xhttp.send();
  xhttp.onload = tryto;
  function tryto() {
    var xhttp = new XMLHttpRequest();
    var query = "?l=" + long + "&s=" + short;

    xhttp.open("GET", "add.php" + query, true);
    xhttp.send();
    xhttp.onload = tryto;
    function tryto() {

      document.getElementById('links').innerHTML = '';
      addLinks();
    }
  }

}
