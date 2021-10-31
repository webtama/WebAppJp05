// JavaScript Document Maskibow on PsychoGrapics
       document.getElementById("btn_convert").addEventListener("click", function() {
	   document.getElementById("settingposter").style.display = "none";
	   document.getElementById("backgroundposter").style.marginLeft = "0px";
	   document.getElementById("backgroundposter").style.marginTop = "0px";
	   document.getElementById("previewImg").style.width = "300px";    
	   document.getElementById("html-content-holder").style.height = "300px"; 
	       html2canvas(document.getElementById("html-content-holder"),
			{
				allowTaint: false,
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
document.getElementById("imgposter").style.left = "50px";
document.getElementById("imgposter").style.top  = "50px";
document.getElementById("imgposter").style.width  = "200px";
document.getElementById("imgposter").style.height = "200px";
document.getElementById("imgposter").style.borderRadius = "50%";
};
if(document.getElementById("FrameFoto").value == "frame02") {
document.getElementById("imgposter").style.left = "20px";
document.getElementById("imgposter").style.top  = "0px";
document.getElementById("imgposter").style.width  = "180px";
document.getElementById("imgposter").style.height = "230px";
document.getElementById("imgposter").style.borderRadius = "0% 0% 20px 20px";
};
if(document.getElementById("FrameFoto").value == "frame03") {
document.getElementById("imgposter").style.left = "100px";
document.getElementById("imgposter").style.top  = "0px";
document.getElementById("imgposter").style.width  = "180px";
document.getElementById("imgposter").style.height = "230px";
document.getElementById("imgposter").style.borderRadius = "0% 0% 20px 20px";
};
if(document.getElementById("FrameFoto").value == "frame04") {
document.getElementById("imgposter").style.left = "20px";
document.getElementById("imgposter").style.top  = "70px";
document.getElementById("imgposter").style.width  = "180px";
document.getElementById("imgposter").style.height = "230px";
document.getElementById("imgposter").style.borderRadius = "20px 20px 0% 0%";
};
if(document.getElementById("FrameFoto").value == "frame05") {
document.getElementById("imgposter").style.left = "100px";
document.getElementById("imgposter").style.top  = "70px";
document.getElementById("imgposter").style.width  = "180px";
document.getElementById("imgposter").style.height = "230px";
document.getElementById("imgposter").style.borderRadius = "20px 20px 0% 0%";
};
if(document.getElementById("FrameFoto").value == "frame06") {
document.getElementById("imgposter").style.left = "150px";
document.getElementById("imgposter").style.top  = "0px";
document.getElementById("imgposter").style.width  = "150px";
document.getElementById("imgposter").style.height = "300px";
document.getElementById("imgposter").style.borderRadius = "0% 20px 20px 0%";
};
if(document.getElementById("FrameFoto").value == "frame07") {
document.getElementById("imgposter").style.left = "0px";
document.getElementById("imgposter").style.top  = "0px";
document.getElementById("imgposter").style.width  = "150px";
document.getElementById("imgposter").style.height = "300px";
document.getElementById("imgposter").style.borderRadius = "20px 0% 0% 20px";
};
if(document.getElementById("FrameFoto").value == "frame08") {
document.getElementById("imgposter").style.left = "0px";
document.getElementById("imgposter").style.top  = "80px";
document.getElementById("imgposter").style.width  = "220px";
document.getElementById("imgposter").style.height = "220px";
document.getElementById("imgposter").style.borderRadius = "0px 100% 0% 20px";
};
if(document.getElementById("FrameFoto").value == "frame09") {
document.getElementById("imgposter").style.left = "80px";
document.getElementById("imgposter").style.top  = "80px";
document.getElementById("imgposter").style.width  = "220px";
document.getElementById("imgposter").style.height = "220px";
document.getElementById("imgposter").style.borderRadius = "100% 0% 20px 0%";
};
}

function OptionFrameShadow(){
if(document.getElementById("FrameShadow").value == "Shadow") {
document.getElementById("imgposter").style.border = "10px solid rgb(0, 0, 0, 0.5)";
};
if(document.getElementById("FrameShadow").value == "Non-Shadow") {
document.getElementById("imgposter").style.border = "0px solid rgb(0, 0, 0, 0.5)";
};
}

function OptionFrameColor(){
document.getElementById("imgposter").style.borderColor  = document.getElementById("framecolor").value;
}

