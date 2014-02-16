var data = function(){
    var dir = parseInt($('#direction').val());
    if (dir==2) {
        dir=1;
    } else if (dir==1) {
        dir=2;
    }
    var b = String.fromCharCode(parseInt($('#speed').val()))+String.fromCharCode(dir)+String.fromCharCode(parseInt($("#reverse").val()));
    if (b.length > 3) {
        b=b.substring(1,4);
    }
    $.post('/', {bytes: b});
    console.log(b);
  }

$(document).ready(function(){
  $('#speed').change(data);
  $('#direction').change(data);
  $('#reverse').change(data);
});