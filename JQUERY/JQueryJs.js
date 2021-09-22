function EditData() {
$(".edited").removeAttr('disabled')
$(".savedatasiswa").css("display", "block");
}

function LockData() {
$(".edited").attr("disabled","true");
$(".savedatasiswa").css("display", "none");
}

function complete() {
$("#loginDisplay").css("display", "block");
$("#loaddingfirst").css("display", "none");
}

function Sort_KLS() {
$("#kls").append($("#kls option")
.remove().sort(function(a, b) {
var at = $(a).text(),
bt = $(b).text();
return (at > bt) ? 1 : ((at < bt) ? -1 : 0);
}));
}

function Sort_Nama() {
$("#username").append($("#username option")
.remove().sort(function(a, b) {
var at = $(a).text(),
bt = $(b).text();
return (at > bt) ? 1 : ((at < bt) ? -1 : 0);
}));
}// JavaScript Document