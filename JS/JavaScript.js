window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);
window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='FILECHAT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);

// Prevent forms from submitting.
  function preventFormSubmit() {
    var forms = document.querySelectorAll('#myForm');
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', function(event) {
      event.preventDefault()  
      });
    }
  }
  window.addEventListener("load", functionInit, true); 
    
  //INITIALIZE FUNCTIONS ONLOAD
  function functionInit(){  
    preventFormSubmit();
    getAllData();
  }
  
  //HANDLE FORM SUBMISSION
  function handleFormSubmit(formObject) {
    google.script.run.withSuccessHandler(createTable).processForm(formObject);
    closeformbiodata();
  }
  
  //GET LAST 10 ROWS
  function getLastTenRows (){
   google.script.run.withSuccessHandler(createTable).getLastTenRows();
  }
    
  //GET ALL DATA
  function getAllData(){
    google.script.run.withSuccessHandler(createTable).getAllData();
  }
    
  //CREATE THE DATA TABLE
  function createTable(dataArray) {
    if(dataArray){
      var result = "<table class='table table-sm' id='datatablesiswa' style='font-size:12px; border; 1px;'>"+
                   "<thead style='white-space: wrap; color: red; display: none;'>"+
                     "<tr>"+ 
                      "<th scope='col' style='display:none'>Delete</th>"+
                      "<th scope='col'>PILIH</th>"+
                      "<th scope='col' style='display:none'>KEY</th>"+
                      "<th scope='col'>USERNAME</th>"+
                      "<th scope='col' style='display:none'>PASSWORD</th>"+
                      "<th scope='col'>TEMPAT LAHIR</th>"+
                      "<th scope='col'>TGL LAHIR</th>"+
                      "<th scope='col' style='display:none'>INDUK</th>"+
                      "<th scope='col' style='display:none'>NISN</th>"+
                      "<th scope='col' style='display:none'>NIK</th>"+
                      "<th scope='col' style='display:none'>AGAMA</th>"+
                      "<th scope='col' style='display:none'>JK</th>"+
                      "<th scope='col' style='display:none'>NIK</th>"+
                      "<th scope='col' style='display:none'>NO KK</th>"+
                      "<th scope='col' style='display:none'>NAMA BAPAK</th>"+
                      "<th scope='col' style='display:none'>NAMA IBU</th>"+
                      "<th scope='col' style='display:none'>NAMA WALI</th>"+
                      "<th scope='col' style='display:none'>NO REG AKTE</th>"+
                      "<th scope='col' style='display:none'>NO TELP</th>"+
                      "<th scope='col' style='display:none'>ALAMAT</th>"+
                      "<th scope='col' style='display:none'>RT</th>"+
                      "<th scope='col' style='display:none'>RW</th>"+
                      "<th scope='col' style='display:none'>KELURAHAN</th>"+
                      "<th scope='col' style='display:none'>KECAMATAN</th>"+
                      "<th scope='col' style='display:none'>PEKERJAAN BAPAK</th>"+
                      "<th scope='col' style='display:none'>GAJI BAPAK</th>"+
                      "<th scope='col' style='display:none'>PENDIDIKAN BAPAK</th>"+
                      "<th scope='col' style='display:none'>NIK BAPAK</th>"+
                      "<th scope='col' style='display:none'>PEKERJAAN IBU</th>"+
                      "<th scope='col' style='display:none'>GAJI IBU</th>"+
                      "<th scope='col' style='display:none'>PENDIDIKAN IBU</th>"+
                      "<th scope='col' style='display:none'>NIK IBU</th>"+
                      "<th scope='col' style='display:none'>TINGGI BADAN</th>"+
                      "<th scope='col' style='display:none'>BERAT BADAN</th>"+
                      "<th scope='col' style='display:none'>CITA-CITA</th>"+
                      "<th scope='col' style='display:none'>HOBBY</th>"+
                      "<th scope='col' style='display:none'>EKSKUL</th>"+
                      "<th scope='col' style='display:none'>BSM</th>"+
                      "<th scope='col' style='display:none'>PRES1_1</th>"+
                      "<th scope='col' style='display:none'>PRES1_2</th>"+
                      "<th scope='col' style='display:none'>PRES1_3</th>"+
                      "<th scope='col' style='display:none'>PRES1_4</th>"+
                      "<th scope='col' style='display:none'>PRES1_5</th>"+
                      "<th scope='col' style='display:none'>PRES2_1</th>"+
                      "<th scope='col' style='display:none'>PRES2_2</th>"+
                      "<th scope='col' style='display:none'>PRES2_3</th>"+
                      "<th scope='col' style='display:none'>PRES2_4</th>"+
                      "<th scope='col' style='display:none'>PRES2_5</th>"+
                      "<th scope='col' style='display:none'>KELAS</th>"+
                      "<th scope='col' style='display:none'>AVRfoto</th>"+
                      "<th scope='col' style='display:none'>FOTOPROFIL</th>"+
                      "</tr>"+
                  "</thead>";
      for(var i=0; i<dataArray.length; i++) {
          result += "<tr>";
          result += "<td><button type='button' style='display:none'>Delete</button></td>";
          result += "<td><button type='button' style='background-color: transparent; color:#7CFC00; border-color:transparent;font-size: 20px;cursor:pointer;' onclick='editData(this);passwordlogin();pastekey();'><i class='fas fa-check-circle'></i> OK</button></td>";
          for(var j=0; j<dataArray[i].length; j++){
              result += "<td>"+dataArray[i][j]+"</td>";
          }
          result += "</tr>";
      }
      result += "</table>";
      var div = document.getElementById('dataTable');
      div.innerHTML = result;
      document.getElementById("message").innerHTML = "";
    }else{
      var div = document.getElementById('dataTable');
      div.innerHTML = "Data Tidak Ditemukan";
    }
  }

  //DELETE DATA
  function deleteData(el) {
  var result = confirm("Ingin Menghapus?");
  if (result) {
  var recordId = el.parentNode.parentNode.cells[2].innerHTML;
  google.script.run.withSuccessHandler(createTable).deleteData(recordId);
  }
  }
    
  //EDIT DATA
  function editData(el){
  var recordId = el.parentNode.parentNode.cells[2].innerHTML;
  google.script.run.withSuccessHandler(populateForm).getRecordById(recordId);
  passwordlogin();
  pastekey();
  }

  //POPULATE FORM
  function populateForm(records){
  document.getElementById('KEY').value = records[0][0];
  document.getElementById('USERNAME').value = records[0][1];
  document.getElementById('PASSWORD').value = records[0][2];
  document.getElementById('TEMPAT_LAHIR').value = records[0][3];
  document.getElementById('TGL_LAHIR').value = records[0][4];
  document.getElementById('INDUK').value = records[0][5];
  document.getElementById('NISN').value = records[0][6];
  document.getElementById('NIK').value = records[0][7];
  document.getElementById('AGAMA').value = records[0][8];
  document.getElementById('JK').value = records[0][9];
  document.getElementById('NO_KK').value = records[0][10];
  document.getElementById('NAMA_BAPAK').value = records[0][11];
  document.getElementById('NAMA_IBU').value = records[0][12];
  document.getElementById('NAMA_WALI').value = records[0][13];
  document.getElementById('NO_REG_AKTE').value = records[0][14];
  document.getElementById('NO_TELP').value = records[0][15];
  document.getElementById('ALAMAT').value = records[0][16];
  document.getElementById('RT').value = records[0][17];
  document.getElementById('RW').value = records[0][18];
  document.getElementById('KEL').value = records[0][19];
  document.getElementById('KEC').value = records[0][20];
  document.getElementById('PEKERJAAN_BAPAK').value = records[0][21];
  document.getElementById('GAJI_BAPAK').value = records[0][22];
  document.getElementById('PEND_BAPAK').value = records[0][23];
  document.getElementById('NIK_BAPAK').value = records[0][24];
  document.getElementById('PEKERJAAN_IBU').value = records[0][25];
  document.getElementById('GAJI_IBU').value = records[0][26];
  document.getElementById('PEND_IBU').value = records[0][27];
  document.getElementById('NIK_IBU').value = records[0][28];
  document.getElementById('TINGGI_BADAN').value = records[0][29];
  document.getElementById('BERAT_BADAN').value = records[0][30];
  document.getElementById('CITA_CITA').value = records[0][31];
  document.getElementById('HOBBY').value = records[0][32];
  document.getElementById('EKSKUL').value = records[0][33];
  document.getElementById('BSM').value = records[0][34];
  document.getElementById('PRES1_1').value = records[0][35];
  document.getElementById('PRES1_2').value = records[0][36];
  document.getElementById('PRES1_3').value = records[0][37];
  document.getElementById('PRES1_4').value = records[0][38];
  document.getElementById('PRES1_5').value = records[0][39];
  document.getElementById('PRES2_1').value = records[0][40];
  document.getElementById('PRES2_2').value = records[0][41];
  document.getElementById('PRES2_3').value = records[0][42];
  document.getElementById('PRES2_4').value = records[0][43];
  document.getElementById('PRES2_5').value = records[0][44];
  document.getElementById('KLSS').value = records[0][45];
  document.getElementById('AVRfoto').value = records[0][46];
  document.getElementById('FOTOPROFIL').value = records[0][47];
  document.getElementById('message').innerHTML = "<div class='alert alert-warning' role='alert'>Update Record [ID: "+records[0][0]+"]</div>";
  }

function LoginUser()
{
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
document.getElementById("errorMessage").innerHTML = "";
document.getElementById("btnlogin").style.display = "none";
document.getElementById("errorMessage").innerHTML = "<div id='loadingtext' style='width: 20px; font-size: 20px;'>⌛</div> Tunggu Sebentar";
google.script.run.withSuccessHandler(function(output) 
{
if(output == 'TRUE')
{
document.getElementById("errorMessage").innerHTML = "Password Berhasil";
document.getElementById("loginDisplay").style.display = "none";
document.getElementById("MenuSideDiv").style.display = "block";
paste();
pastetema();  
}
else if(output == 'FALSE')
{
document.getElementById("errorMessage").innerHTML = "Password salah";
document.getElementById("btnlogin").style.display = "block";
}    
}).checkLogin(username, password);
}

function Getusername(kelas) 
{
document.getElementById("errorMessage").innerHTML = "";
document.getElementById("usernames").style.display = "none";
document.getElementById("passwordlogin").style.display = "none";
google.script.run.withSuccessHandler(function(ar) 
{
console.log(ar);
username.length = 0;
let option = document.createElement("option");
option.value = "";
option.text = "";
document.getElementById("usernames").style.display = "none";
username.appendChild(option);
ar.forEach(function(item, index) 
{    
let option = document.createElement("option");
option.value = item;
option.text = item;
document.getElementById("usernames").style.display = "block";
username.appendChild(option);    
});
}).getusernames(kelas);
};

function Getuserkey(name) 
{
google.script.run.withSuccessHandler(function(ar) 
{
console.log(ar);
userkey.length = 0;
ar.forEach(function(value) 
{ 
let option = document.createElement("input");
option.type = "text";
option.name = "idkeyuser";
option.id = "idkeyuser";
option.value = value;
userkey.appendChild(option);
filterFunction();
});
}).getuserkey(name);
};

function resizable (el, factor) {
var int = Number(factor) || 7.7;
function resize() {el.style.width = ((el.value.length+1) * int) + 'px'}
var e = 'keyup,keypress,focus,blur,change'.split(',');
for (var i in e) el.addEventListener(e[i],resize,false);
resize();
resizable(document.getElementById('upload-Preview'),7);
}


  function filterFunction() {
  document.getElementById('dataverifikasi').style.display = 'none';
  document.getElementById("errorMessage").innerHTML = "";
  var x = document.getElementById("idkeyuser").value;
  var input, filter, table, tr, td, txtValue;
  input = document.getElementById('idkeyuser');
  filter = input.value.toUpperCase();
  table = document.getElementById('datatablesiswa');
  tr = table.getElementsByTagName('tr');
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
        tr[i].innerHTML = "";
        document.getElementById("dataverifikasi").style.display = "block";
        document.getElementById("passwordlogin").style.display = "none";
        document.getElementById('btnlogin').style.display = 'block'
      }
    }      
  }
  }

function passwordlogin() {
document.body.scrollTop = 0; // For Safari
document.documentElement.scrollTop = 0;
document.getElementById("passwordlogin").style.display = "block";
document.getElementById("dataverifikasi").style.display = "none";
}
function formbiodata() {
closeall();
document.getElementById("Formbiodata").style.display = "block";
}
function closeformbiodata() {
closeall();
document.getElementById("hiddenbiosiswa").style.display = "none";
}
function formsetting() {
closeall();
document.getElementById("Formbiodata").style.display = "block";
document.getElementById("hiddenbiosiswa").style.display = "none";
document.getElementById("Setting").style.display = "block";
}

function closeall() {
document.body.scrollTop = 0; // For Safari
document.documentElement.scrollTop = 0;
document.getElementById("passwordlogin").style.display = "none";
document.getElementById("dataverifikasi").style.display = "none";
document.getElementById("hiddenbiosiswa").style.display = "none";
}

function openCity(cityName) {
  var i;
  var x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  document.getElementById(cityName).style.display = "block";  
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
  setTimeout(function(){ closeNav(); }, 8000);
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}


  //GET ALL DATA CHAT
  function getAllDatacHAT(){
  document.getElementById("loaddingchat").style.display = "block";
  google.script.run.withSuccessHandler(createTablecHAT).getAllDataChat();
    FILTERSISWABP();
  BottomFunction();
  scrolltextchat();
  }
    //CREATE THE DATA TABLE
  function createTablecHAT(dataArray) {
    if(dataArray){
      var result = "<div class='table table-sm' id='datatablesiswacHAT' style='margin-bottom:20px; font-size:12px; border; 1px;background-color:white; width:100%; background-color: transparent;'>";

      for(var i=0; i<dataArray.length; i++) {
          result += "<div class='chatboxtab'>";
          for(var j=0; j<dataArray[i].length; j++){
              result += "<div class='chatbox'>"+dataArray[i][j]+"</div>";
          }
          result += "</div>";
      }
      result += "</div>";
      var div = document.getElementById('dataTablecHAT');
      div.innerHTML = result;
      document.getElementById("loaddingchat").style.display = "none";
    }else{
      var div = document.getElementById('dataTablecHAT');
      div.innerHTML = "Chat Tidak Ada!";
      document.getElementById("loaddingchat").style.display = "none";
    }
    FILTERSISWABP();
    }

function pastethemes() {
document.getElementById('stylethemes').innerHTML = document.getElementById('FOTOPROFIL').value;
document.getElementById('applystylethemes1').innerHTML = document.getElementById('FOTOPROFIL').value;
}

function pastefoto() {
EditData();
document.getElementById('AVRfoto').value = "";
document.getElementById('AVRfoto').value = document.getElementById('copy_img').value;
document.getElementById('upload-Preview').getAttribute("src") = document.getElementById('AVRfoto').value;
}

function getfoto(address) {
document.getElementById('copy_img').value =  "<img id='fotoprofil' src='" + address.src + "'> "
}
function paste() {
var x = document.getElementById("USERNAME").value;
document.getElementById("namapesdik").innerHTML = x;
document.getElementById("absennama").innerHTML = x;
var y = document.getElementById("KEY").value;
document.getElementById("keypesdik").innerHTML = y;
var z = document.getElementById("KLSS").value;
document.getElementById("kelaspesdik").innerHTML = z;
document.getElementById("absenkelas").innerHTML = z;
var a = document.getElementById("AVRfoto").value;
document.getElementById("avatarfoto").innerHTML = a;
document.getElementById("avatarfoto2").innerHTML = a;  
document.getElementById("namapesdik2").innerHTML = x;
}
function pastetema() {
var b = document.getElementById("FOTOPROFIL").value;
document.getElementById("TEMAANDA").innerHTML = b;
}
  

  //GET ALL DATA
  //document.getElementById('dataTable').innerHTML = "";
    function getAllDataBUKUSISWA(){
      google.script.run.withSuccessHandler(createTableBUKUSISWA).getAllDataBUKUSISWA();
    }

  //CREATE THE DATA TABLE
  function createTableBUKUSISWA(dataArrayBUKUSISWA) {

     if(dataArrayBUKUSISWA){
      var resultBUKUSISWA = "<div class='table table-sm' id='myTableBUKUSISWA' style='display: none; margin: auto; text-align: center;'>";
                  
      for(var i=0; i<dataArrayBUKUSISWA.length; i++) {
          resultBUKUSISWA += "<div class='isiBUKUSISWA' style='display: inline-block;padding:10px'>";
          for(var j=0; j<dataArrayBUKUSISWA[i].length; j++){
              resultBUKUSISWA += "<div class='tabelBUKUSISWA' style='display: inline-block;'>"+dataArrayBUKUSISWA[i][j]+"</div>";
          }
          resultBUKUSISWA += "</div>";
      }
      resultBUKUSISWA += "</div>";
      var div = document.getElementById('dataTableBUKUSISWA');
      div.innerHTML = resultBUKUSISWA;
      document.getElementById("messageBUKUSISWA").innerHTML = "";
      }else{
      var div = document.getElementById('dataTableBUKUSISWA');
      div.innerHTML = "Data Tidak Ada!";
    }
  }
  
  function myFunctionnBUKUSISWA() {
  var input, filter, div, span, txtValue, table, tr, td;
  input = document.getElementById('myBUKUSISWA');
  filter = input.value.toUpperCase();
  table = document.getElementById('myTableBUKUSISWA');
  tr = table.getElementsByTagName('div');
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('div')[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = 'inline-block';
      } else {
        tr[i].style.display = 'none';
      }
    }       
  }
  document.getElementById("myTableBUKUSISWA").style.display = "block";
  document.getElementById("dataTableBUKUSISWA").style.display = "inline-block";
  }

window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);

function hidedataverifikasi() {
document.getElementById("dataverifikasi").style.display = "none";
document.getElementById("passwordlogin").style.display = "none";
}

function clearidkey() {
document.getElementById("errorMessage").innerHTML = "";
document.getElementById("idkeyuser").remove();
document.getElementById("userkey").innerHTML="";
}
