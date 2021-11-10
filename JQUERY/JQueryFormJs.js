    $(document).ready(function() {
        $('select').material_select();
        $("select[required]").css({
          display: "inline",
          height: 0,
          padding: 0,
          width: 0
        });
        window.picker = $('.datepicker').pickadate({
            selectYears: 16, // Creates a dropdown of 15 years to control year
            format: 'yyyy-mm-dd'
        });
    });
    var finalFilesData=[]; 
    var reader = new FileReader();
    var fileArr = [], nameArr=[];
    var formObj = {};
    var fileName,inputName;
    var flag = false;
    // Upload the file to Google Drive
    reader.onloadend = function(e) {
      finalFilesData.push({inputName: inputName, fileName: fileName, data: e.target.result});
      flag = false;
    };
    

    // Read the file on form submit
    function kirimchat(event) {
      //event.preventDefault();
      $('#USERNAME,#TEXTCHAT,#FILECHAT,#KLSS,#INDUK').not(':input[type=button],:input[type=submit], :input[type=reset],.file-path,.select-dropdown,.picker__select--year').each(function(index, item){
          if(nameArr.indexOf($(item).attr('name'))<0){
             nameArr.push({name: $(item).attr('name'), type: $(item).attr('type')});
          }
      });
      $('#USERNAME,#TEXTCHAT,#FILECHAT,#KLSS,#INDUK').not(':input[type=button],:input[type=submit], :input[type=reset],:input[type=file],.file-path,.select-dropdown,.picker__select--year').each(function(index, item){
          if($(item).attr('type')=='radio'){
            if($(item).is(":checked")){
              formObj[$(item).attr('name')]=$(item).val();
            }
          }else if($(item).attr('type')=='checkbox'){
            if($(item).is(":checked")){
              if(formObj[$(item).attr('name')]){
                 formObj[$(item).attr('name')] += ","+$(item).val();
              }else{
                 formObj[$(item).attr('name')]=$(item).val();
              }
            }
          }else{
             formObj[$(item).attr('name')]=$(item).val();
          }
      });
      $('input[type=file]').each(function( index, item ) {
        fileArr.push({inputName: $(item).attr("name"), file: $(item)[0].files[0]});
      });
      
      var isValid = true;
      for(var i=0; i<nameArr.length; i++){
        $("[name='"+nameArr[i].name+"']").closest(".row").find(".error").remove();
        if(nameArr[i].type!="file"){
          if(formObj[nameArr[i].name]==undefined || formObj[nameArr[i].name]=="" || formObj[nameArr[i].name]==null){
            if($("[name='"+nameArr[i].name+"']").first().prop("required")){
              isValid = false;
              $("[name='"+nameArr[i].name+"']").first().closest(".row").append("<div class='error col s12'>Wajib Di Isi</div>");
            }
          }
        }
        else{
          if(!isFileSelected(nameArr[i].name)){
            if($("[name='"+nameArr[i].name+"']").first().prop("required")){
              isValid = false;
              $("[name='"+nameArr[i].name+"']").first().closest(".row").append("<div class='error col s12'>Wajib Di Isi</div>");
            }
          }
        }
      }
      if(!isValid){
        return false;
      }
      kirim();
      $('#FormChat')[0].reset();
      document.getElementById("FILECHAT").value = "";
    
      var repeatInterval = setInterval(function(){ 
        if(!flag){
          if(fileArr.length>0){
            var file = fileArr.pop();
            if(file.file!=undefined){
                fileName = file.file.name;
                inputName = file.inputName;
                flag = true;
                reader.readAsDataURL(file.file);
            }
          }else{
            window.clearInterval(repeatInterval);
            google.script.run
            .withSuccessHandler(showMessage)
            .uploadFileToGoogleDrive(
               finalFilesData,formObj
            );
          }
        }
      }, 200);
      return false;
    }
    
    function isFileSelected(name){
      for(var j=0; j<fileArr.length; j++){
        if(fileArr[j].inputName==name){
          if(fileArr[j].file){
            return true;
          }
        }
      }
      return false;
    }
    
    function showMessage(e) {
       $('input:checkbox').removeAttr('checked');
       $('#FormChat')[0].reset();
      }
    
    function openForm(){
      
    }
    
    function kirim(){

    }
