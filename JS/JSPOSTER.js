// JavaScript Document Maskibow on PsychoGrapics
       document.getElementById("btn_convert").addEventListener("click", function() {
	   document.getElementById("settingposter").style.display = "none";
	   document.getElementById("logomaskibow").style.display = "block";
	   document.getElementById("backgroundposter").style.marginLeft = "0px";
	   document.getElementById("backgroundposter").style.marginTop = "0px";
	   document.getElementById("previewImg").style.width = "300px";    
	   document.getElementById("html-content-holder").style.height = "300px"; 
	   html2canvas(document.getElementById("html-content-holder"),
			{
				scale: 3,
				dpi: 240,
				allowTaint: true,
				useCORS: true,
			}).then(function (canvas) {
				var anchorTag = document.createElement("a");
				document.body.appendChild(anchorTag);
				document.getElementById("previewImg").appendChild(canvas);
				anchorTag.download = "PosterHariIni.jpg";
				anchorTag.href = canvas.toDataURL();
				anchorTag.target = '_blank';
				anchorTag.click();
			});
	  document.getElementById("backgroundposter").style.marginLeft = "0px";
	  document.getElementById("backgroundposter").style.marginTop = "0px"; 
	   document.getElementById("previewImg").style.width = "300px";    
	   document.getElementById("html-content-holder").style.height = "300px";
	   document.getElementById("logomaskibow").style.display = "none";
       });

function GetFotoPoster(event){
		 var getImagePath = URL.createObjectURL(event.target.files[0]);
		 $('#imgposter').css('background-image', 'url(' + getImagePath + ')');
		}

function GettextPoster(){
document.getElementById("textposter").innerHTML = document.getElementById("textchatposter").value;
}

function GettcolorPoster(){
document.getElementById("textposter").style.color = document.getElementById("colortext").value;
}

function OptionTextSize(){
if(document.getElementById("UkuranHuruf").value == "Normal") {
document.getElementById("textposter").style.fontSize = "20px";
};
if(document.getElementById("UkuranHuruf").value == "Kecil") {
document.getElementById("textposter").style.fontSize = "18px";
};
if(document.getElementById("UkuranHuruf").value == "Besar") {
document.getElementById("textposter").style.fontSize = "30px";
};
}

function OptionPosisiHuruf(){
if(document.getElementById("PosisiHuruf").value == "Bawah") {
document.getElementById("textposter").style.left = "";
document.getElementById("textposter").style.top  = "";
document.getElementById("textposter").style.bottom  = "20px";
document.getElementById("textposter").style.transform = "rotate(0deg)";
};
if(document.getElementById("PosisiHuruf").value == "Atas") {
document.getElementById("textposter").style.left = "";
document.getElementById("textposter").style.bottom  = "";
document.getElementById("textposter").style.top  = "20px";
document.getElementById("textposter").style.transform = "rotate(0deg)";
};
if(document.getElementById("PosisiHuruf").value == "Kiri") {
document.getElementById("textposter").style.top  = "100px";
document.getElementById("textposter").style.bottom  = "";
document.getElementById("textposter").style.left = "-80px";
document.getElementById("textposter").style.transform = "rotate(-90deg)";
};
if(document.getElementById("PosisiHuruf").value == "Kanan") {
document.getElementById("textposter").style.top  = "100px";
document.getElementById("textposter").style.bottom  = "";
document.getElementById("textposter").style.left = "100px";
document.getElementById("textposter").style.transform = "rotate(90deg)";
};
}
function pengaturanon() {
document.getElementById("settingposter").style.display = "block";
document.getElementById("getval").value = "";
document.getElementById("temapilih").value = "";
document.getElementById("textchatposter").value = "";
document.getElementById("UkuranHuruf").value = "";
document.getElementById("PosisiHuruf").value = "";
document.getElementById("PosisiHurufAlign").value = "";
document.getElementById("logopilih").value = "";
document.getElementById("Bingkaipilih").value = "";
document.getElementById("FrameFoto").value = "";
document.getElementById("checkshadowatas").value = "";
document.getElementById("checkshadowbawah").value = "";
document.getElementById("checkshadowkiri").value = "";
document.getElementById("checkshadowkanan").value = "";
document.getElementById("framecolor").value = "";
document.getElementById("PosisiHurufJudul").value = "";
document.getElementById("PosisiHurufAlignJudul").value = "";
document.getElementById("GayaHurufJudul").value = "";
document.getElementById("colortextJudul").value = "";
document.getElementById("GayaHuruf").value = "";
document.getElementById("WeightHuruf").value = "";
document.getElementById("colortext").value = "";
uncheckAll1;
}
function uncheckAll1() {
  var inputs = document.querySelectorAll('.checkin');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].checked = false;
  }
}
function OptionPosisiAlign(){
if(document.getElementById("PosisiHurufAlign").value == "Tengah") {
document.getElementById("textposter").style.textAlign = "center";
};
if(document.getElementById("PosisiHurufAlign").value == "Kanan") {
document.getElementById("textposter").style.textAlign = "right";
};
if(document.getElementById("PosisiHurufAlign").value == "Kiri") {
document.getElementById("textposter").style.textAlign = "left";
};
}
function OptionFonts(selectTag){
  var listValue = selectTag.options[selectTag.selectedIndex].text;
  document.getElementById("textposter").style.fontFamily = listValue;
}
function OptionWeightFonts(selectTag){
  var listValue = selectTag.options[selectTag.selectedIndex].text;
  document.getElementById("textposter").style.fontWeight = listValue;
}

function OptionFrameFoto(){
if(document.getElementById("FrameFoto").value == "frame01") {
document.getElementById("imgposter").style.left = "45px";
document.getElementById("imgposter").style.top  = "45px";
document.getElementById("imgposter").style.width  = "210px";
document.getElementById("imgposter").style.height = "210px";
document.getElementById("imgposter").style.borderRadius = "50%";
};
if(document.getElementById("FrameFoto").value == "frame02") {
document.getElementById("imgposter").style.left = "20px";
document.getElementById("imgposter").style.top  = "0px";
document.getElementById("imgposter").style.width  = "190px";
document.getElementById("imgposter").style.height = "220px";
document.getElementById("imgposter").style.borderRadius = "0% 0% 20px 20px";
};
if(document.getElementById("FrameFoto").value == "frame03") {
document.getElementById("imgposter").style.left = "90px";
document.getElementById("imgposter").style.top  = "0px";
document.getElementById("imgposter").style.width  = "190px";
document.getElementById("imgposter").style.height = "220px";
document.getElementById("imgposter").style.borderRadius = "0% 0% 20px 20px";
};
if(document.getElementById("FrameFoto").value == "frame04") {
document.getElementById("imgposter").style.left = "20px";
document.getElementById("imgposter").style.top  = "80px";
document.getElementById("imgposter").style.width  = "190px";
document.getElementById("imgposter").style.height = "220px";
document.getElementById("imgposter").style.borderRadius = "20px 20px 0% 0%";
};
if(document.getElementById("FrameFoto").value == "frame05") {
document.getElementById("imgposter").style.left = "90px";
document.getElementById("imgposter").style.top  = "80px";
document.getElementById("imgposter").style.width  = "190px";
document.getElementById("imgposter").style.height = "220px";
document.getElementById("imgposter").style.borderRadius = "20px 20px 0% 0%";
};
if(document.getElementById("FrameFoto").value == "frame06") {
document.getElementById("imgposter").style.left = "140px";
document.getElementById("imgposter").style.top  = "0px";
document.getElementById("imgposter").style.width  = "160px";
document.getElementById("imgposter").style.height = "300px";
document.getElementById("imgposter").style.borderRadius = "0% 20px 20px 0%";
};
if(document.getElementById("FrameFoto").value == "frame07") {
document.getElementById("imgposter").style.left = "0px";
document.getElementById("imgposter").style.top  = "0px";
document.getElementById("imgposter").style.width  = "160px";
document.getElementById("imgposter").style.height = "300px";
document.getElementById("imgposter").style.borderRadius = "20px 0% 0% 20px";
};
if(document.getElementById("FrameFoto").value == "frame08") {
document.getElementById("imgposter").style.left = "0px";
document.getElementById("imgposter").style.top  = "70px";
document.getElementById("imgposter").style.width  = "230px";
document.getElementById("imgposter").style.height = "230px";
document.getElementById("imgposter").style.borderRadius = "0px 100% 0% 20px";
};
if(document.getElementById("FrameFoto").value == "frame09") {
document.getElementById("imgposter").style.left = "70px";
document.getElementById("imgposter").style.top  = "70px";
document.getElementById("imgposter").style.width  = "230px";
document.getElementById("imgposter").style.height = "230px";
document.getElementById("imgposter").style.borderRadius = "100% 0% 20px 0%";
};
}

function OptionFrameShadowatas(){
  var text = document.getElementById("imgposter");
  if (document.getElementById("checkshadowatas").checked == true){
    text.style.borderTop = "15px solid rgba(255,255,255,.4)";
  } else {
     text.style.borderTop = "";
  }
}

function OptionFrameShadowbawah() {
  var text = document.getElementById("imgposter");
  if (document.getElementById("checkshadowbawah").checked == true){
    text.style.borderBottom = "15px solid rgba(255,255,255,.4)";
  } else {
     text.style.borderBottom = "";
  }
}

function OptionFrameShadowkanan() {
  var text = document.getElementById("imgposter");
  if (document.getElementById("checkshadowkanan").checked == true){
    text.style.borderRight = "15px solid rgba(255,255,255,.4)";
  } else {
     text.style.borderRight = "";
  }
}

function OptionFrameShadowkiri() {
  var text = document.getElementById("imgposter");
  if (document.getElementById("checkshadowkiri").checked == true){
    text.style.borderLeft = "15px solid rgba(255,255,255,.4)";
  } else {
     text.style.borderLeft = "";
  }
}

function OptionPosisiAlignJudul(){
if(document.getElementById("PosisiHurufAlignJudul").value == "Tengah") {
document.getElementById("judultposter").style.textAlign = "center";
};
if(document.getElementById("PosisiHurufAlignJudul").value == "Kanan") {
document.getElementById("judultposter").style.textAlign = "right";
};
if(document.getElementById("PosisiHurufAlignJudul").value == "Kiri") {
document.getElementById("judultposter").style.textAlign = "left";
};
}
function OptionFontsJudul(selectTag){
  var listValue = selectTag.options[selectTag.selectedIndex].text;
  document.getElementById("judultposter").style.fontFamily = listValue;
}

function OptionPosisiHurufJudul(){
if(document.getElementById("PosisiHurufJudul").value == "Bawah") {
document.getElementById("judultposter").style.left = "";
document.getElementById("judultposter").style.top  = "220px";
document.getElementById("judultposter").style.bottom  = "";
};
if(document.getElementById("PosisiHurufJudul").value == "Atas") {
document.getElementById("judultposter").style.left = "";
document.getElementById("judultposter").style.bottom  = "";
document.getElementById("judultposter").style.top  = "0px";
};
}

function GettcolorPosterJudul(){
document.getElementById("judultposter").style.color = document.getElementById("colortextJudul").value;
}

function GettextjudulPoster(){
document.getElementById("judul").innerHTML = document.getElementById("judulposter").value;
}

function GettextdescPoster(){
document.getElementById("deskripsi").innerHTML = document.getElementById("descposter").value;
}