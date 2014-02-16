var data = function(){
    var speed = String.fromCharCode(parseInt($('#speed').val()));
    var dir = String.fromCharCode(parseInt($("input:radio[name ='direction']:checked").val()));
    console.log(parseInt($("input:radio[name ='direction']:checked")));
    var rev = String.fromCharCode(parseInt($("input:radio[name ='reverse']:checked").val()));
    var b = speed+dir+rev;
    $.post('/', {bytes: b});
    console.log(b);
  }

$(document).ready(function(){
  $('#speed').change(data);
  $("input:radio[name ='direction']:checked").change(data);
  $("input:radio[name ='reverse']:checked").change(data);
});