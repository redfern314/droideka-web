var data = function(){
    var dir = parseInt($('#direction').val());
    if (dir==2) {
        dir=1;
    } else if (dir==1) {
        dir=2;
    }
    var b = String.fromCharCode(parseInt($('#speed').val()))+String.fromCharCode(dir)+String.fromCharCode(parseInt($("#reverse").val()));
    $.post('/', {bytes: b});
  }

$(document).ready(function(){
  $('#speed').change(sendData);
  $('#direction').change(sendData);
  $('#reverse').change(sendData);
});