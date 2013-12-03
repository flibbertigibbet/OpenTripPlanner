
function Admin(oba){this.oba=oba;this.otp=new Otp(undefined,undefined);};Admin.prototype.gotObaStopResults=function(data){var stop_data=data.data;$('#stopResults').html($.tmpl("stop",stop_data));$('#stopResults').show();$('#routes tr:not(.header)').remove();$('#routesHeader').show();$.each(stop_data.routes,function(index,route){var agencyAndId=parseAgencyAndId(route.id);route.id=agencyAndId.id;route.agency=agencyAndId.agency;$('#routes').append($.tmpl("route",route));});$('#routes').show();$('#noteForm').show();var agencyAndId=parseAgencyAndId(stop_data.id);$('#noteFormStopId').val(agencyAndId.id);$('#noteFormAgencyId').val(agencyAndId.agency);var otp=new Otp(undefined,undefined);otp.getPatchesForStop(agencyAndId.agency,agencyAndId.id,this,this.gotPatchesForStop);};Admin.prototype.gotRouteData=function(route_data){$('#variants tr:not(.header)').remove();$('#variantsHeader').show();$.each(route_data.variants,function(index,variant){$('#variants').append($.tmpl("variant",variant));});$('#variants').show();$('#noteForm').show();$('#noteFormAgencyId').val(route_data.id.@agency);$('#noteFormRouteId').val(route_data.id.@id);options='<option value="">All</option>';$.each(route_data.directions.directions,function(index,direction){options+='<option value="'+direction+'">'+direction+'</option>';});$('#direction').html(options);this.otp.getPatchesForRoute(route_data.id.@agency,route_data.id.@id,this,this.gotPatchesForRoute);};Admin.prototype.gotPatchesForStop=function(data){var patchtable=$('#patches');$('#patches tr:not(.header)').remove();var stopNotePatches=data.patches.StopNotePatch;$.each(stopNotePatches,function(index,patch){patchtable.append("<tr>"
+"<td>"+patch.stop.@id+"</td>"
+"<td>"+patch.notes+"</td>"
+"<td>"+toDate(patch.startTime).f("yyyy-NNN-d HH:mm")+"</td>"
+"<td>"+toDate(patch.endTime).f("yyyy-NNN-d HH:mm")+"</td>"
+"<td>"+toTimeString(patch.startTimeOfDay)+"</td>"
+"<td>"+toTimeString(patch.endTimeOfDay)+"</td>"
+"</tr>");});patchtable.show();};function showNoPatches(){var patchtable=$('#patches');$('#patches tr:not(.header)').remove();patchtable.append('<tr><td colspan="6"><b>no patches</b></td></tr>');patchtable.show();}
function makeList(objectOrList){if(!(objectOrList instanceof Array)){return[objectOrList];}
return objectOrList;}
Admin.prototype.gotPatchesForStop=function(data){if(data==null){showNoPatches();return;}
var patchtable=$('#patches');$('#patches tr:not(.header)').remove();var stopNotePatches=makeList(data.patches.StopNotePatch);$.each(stopNotePatches,function(index,patch){patchtable.append("<tr>"
+"<td>"+patch.stop.@id+"</td>"
+"<td>"+patch.notes+"</td>"
+"<td>"+toDate(patch.startTime).f("yyyy-NNN-d HH:mm")+"</td>"
+"<td>"+toDate(patch.endTime).f("yyyy-NNN-d HH:mm")+"</td>"
+"<td>"+toTimeString(patch.startTimeOfDay)+"</td>"
+"<td>"+toTimeString(patch.endTimeOfDay)+"</td>"
+"</tr>");});patchtable.show();};Admin.prototype.gotPatchesForRoute=function(data){if(data==null){showNoPatches();return;}
var patchtable=$('#patches');$('#patches tr:not(.header)').remove();var patches=makeList(data.patches.RouteNotePatch);$.each(patches,function(index,patch){patchtable.append("<tr>"
+"<td>"+patch.route.@id+"</td>"
+"<td>"+(patch.direction||'all')+"</td>"
+"<td>"+patch.notes+"</td>"
+"<td>"+toDate(patch.startTime).f("yyyy-NNN-d HH:mm")+"</td>"
+"<td>"+toDate(patch.endTime).f("yyyy-NNN-d HH:mm")+"</td>"
+"<td>"+toTimeString(patch.startTimeOfDay)+"</td>"
+"<td>"+toTimeString(patch.endTimeOfDay)+"</td>"
+"</tr>");});patchtable.show();};Admin.prototype.createdStopNote=function(data){this.otp.getPatchesForStop($('#noteFormAgencyId').val(),$('#noteFormStopId').val(),this,this.gotPatchesForStop);$('#message').html("Created note!");$('#message').show();$('#noteForm')[0].reset();};Admin.prototype.createdRouteNote=function(data){this.otp.getPatchesForRoute($('#noteFormAgencyId').val(),$('#noteFormRouteId').val(),this,this.gotPatchesForRoute);$('#message').html("Created note!");$('#message').show();$('#noteForm')[0].reset();};Admin.prototype.init=function(){if($.url.param("agency")){$('#agencyInput').val($.url.param("agency"));}else{if(Config.defaultAgency!=null){$('#agencyInput').val(Config.defaultAgency);}}
$('#idInput').val($.url.param("id"));$('.hidden').hide();$('.datetimepicker').datetimepicker();$('.timepicker').timepicker({});this.initValidator();};Admin.prototype.initStopSearchForm=function(){this.init();$.template("stop",'Stop Name: <span id="stop-name">${id}</span><br/>'+'Lat: <span id="stop-lat">${lat}</span><br/>'+'Lon: <span id="stop-lon">${lon}</span><br/>'+'Code: <span id="stop-code">${code}</span>');$.template("route",'<tr>'+'<td><a href="routes.html?agency=${agency}&id=${id}">${id}</td>'+'<td>${description}</td>'+'<td>${type}</td>'+'</tr>');var admin=this;var searchForm=$('#stopSearchForm');searchForm.submit(function(event){event.preventDefault();var id=$('#idInput').val();var agency=$('#agencyInput').val();admin.oba.getStopById(agency,id,"Admin.prototype.gotObaStopResults");return false;});var noteForm=$('#noteForm');noteForm.submit(function(event){event.preventDefault();if(!$("#noteForm").validate().form()){return;}
var username=$('#username').val();var password=$('#password').val();var otp=new Otp(username,password);otp.createStopNotePatch($('#noteFormAgencyId').val(),$('#noteFormStopId').val(),$('#notes').val(),dateTimeToMillis($('#startTime').val()),dateTimeToMillis($('#endTime').val()),timeToSeconds($('#startTimeOfDay').val()),timeToSeconds($('#endTimeOfDay').val()),admin,admin.createdStopNote);return false;});};Admin.prototype.initRouteSearchForm=function(){this.init();$.template("variant",'<tr>'+'<td>${name}</td>'+'<td>${direction}</td>'+'</tr>');var admin=this;var searchForm=$('#routeSearchForm');searchForm.submit(function(event){event.preventDefault();var id=$('#idInput').val();var agency=$('#agencyInput').val();admin.otp.getRouteData(agency,id,admin,admin.gotRouteData);return false;});var noteForm=$('#noteForm');noteForm.submit(function(event){event.preventDefault();if(!$("#noteForm").validate().form()){return;}
var username=$('#username').val();var password=$('#password').val();var otp=new Otp(username,password);otp.createRouteNotePatch($('#noteFormAgencyId').val(),$('#noteFormRouteId').val(),$('#direction').val(),$('#notes').val(),dateTimeToMillis($('#startTime').val()),dateTimeToMillis($('#endTime').val()),timeToSeconds($('#startTimeOfDay').val()),timeToSeconds($('#endTimeOfDay').val()),admin,admin.createdRouteNote);return false});};jQuery.validator.addMethod("date",function(value,element){return this.optional(element)||!isNaN(Date.parse(value));},"Must be a valid date-time (2011-07-03 15:37)");jQuery.validator.addMethod("time",function(value,element){return this.optional(element)||/^[0-9]{1,2}:[0-9]{2}$/i.test(value);},"Must be a valid time (15:37)");Admin.prototype.initValidator=function(){$(".stopNoteForm").validate({rules:{username:"required",password:"required",startTime:{required:true,date:true},endTime:{required:true,date:true},startTimeOfDay:{required:true,time:true},endTimeOfDay:{required:true,time:true},notes:{required:true,minlength:2}}});$(".routeNoteForm").validate({rules:{username:"required",password:"required",startTime:{required:true,date:true},endTime:{required:true,date:true},startTimeOfDay:{required:true,time:true},endTimeOfDay:{required:true,time:true},notes:{required:true,minlength:2}}});};function dateTimeToMillis(datetime){return Date.parse(datetime);}
function timeToSeconds(time){var parts=time.split(":");var hours=parts[0];var minutes=parts[1];return hours*3600+minutes*60;}
function toDate(millisecondsStr){return new Date(parseInt(millisecondsStr));}
function padWithZeros(number,length){var str=''+number;while(str.length<length){str='0'+str;}
return str;}
function toTimeString(secondsStr){var seconds=parseInt(secondsStr);var hours=Math.floor(seconds/3600);seconds-=hours*3600;var minutes=Math.floor(hours/3600);return padWithZeros(hours,2)+":"+padWithZeros(minutes,2);}
function parseAgencyAndId(agencyAndId){var parts=agencyAndId.split("_",2);return{'agency':parts[0],'id':parts[1]};};
Otp.prototype.sendPatch=function(patch,context,success){var url=this.baseUrl+"patch/patch";$.ajax({url:url,headers:{'X-WSSE':generateWSSEHeader(this.username,this.password),'Authorization':'WSSE profile="UsernameToken"','Content-type':'application/xml'},contentType:"text/xml",data:patch,type:'POST',dataType:'json',context:context,success:success,failure:this.failure});};Otp.prototype.failure=function(data){console.log("failure args are: ");console.log(arguments);};Otp.prototype.createId=function(){var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";var id='';for(var i=0;i<11;++i){id+=tab.charAt(Math.floor(Math.random()*62));}
return id;};Otp.prototype.getPatchesForStop=function(agency,stop_id,context,success){var url=this.baseUrl+"patch/stopPatches?agency="+agency+"&id="+stop_id;$.ajax({url:url,type:'GET',dataType:'json',context:context,success:success,failure:this.failure});};Otp.prototype.getPatchesForRoute=function(agency,route_id,context,success){var url=this.baseUrl+"patch/routePatches?agency="+agency+"&id="+route_id;$.ajax({url:url,type:'GET',dataType:'json',context:context,success:success,failure:this.failure});};Otp.prototype.getRouteData=function(agency,route_id,context,success){var url=this.baseUrl+"transit/routeData?agency="+agency+"&id="+route_id;$.ajax({url:url,type:'GET',dataType:'json',context:context,success:success,failure:this.failure});};Otp.prototype.createStopNotePatch=function(agency,stop_id,note,startTime,endTime,startTimeOfDay,endTimeOfDay,context,success){var id=this.createId();var patch='<PatchSet>'
+'<StopNotePatch>'
+'<id>'+id+'</id>'
+'<stop agency= "'+agency+'" id = "'+stop_id+'" />'
+'<startTime>'+startTime+'</startTime>'
+'<endTime>'+endTime+'</endTime>'
+'<startTimeOfDay>'+startTimeOfDay+'</startTimeOfDay>'
+'<endTimeOfDay>'+endTimeOfDay+'</endTimeOfDay>'
+'<notes>'+note+'</notes>'
+'</StopNotePatch>'
+'</PatchSet>';this.sendPatch(patch,context,success);};Otp.prototype.createRouteNotePatch=function(agency,route_id,direction,note,startTime,endTime,startTimeOfDay,endTimeOfDay,context,success){var id=this.createId();var patch='<PatchSet>'
+'<RouteNotePatch>'
+'<id>'+id+'</id>'
+'<direction>'+direction+'</direction>'
+'<route agency= "'+agency+'" id = "'+route_id+'" />'
+'<startTime>'+startTime+'</startTime>'
+'<endTime>'+endTime+'</endTime>'
+'<startTimeOfDay>'+startTimeOfDay+'</startTimeOfDay>'
+'<endTimeOfDay>'+endTimeOfDay+'</endTimeOfDay>'
+'<notes>'+note+'</notes>'
+'</RouteNotePatch>'
+'</PatchSet>';this.sendPatch(patch,context,success);}
function Otp(username,password){this.username=username;this.password=password;this.baseUrl=Config.otpAPIBaseUrl+'/ws/';};
Oba.prototype.getStopById=function(agency,id,callback){var url=this.baseUrl+'stop/'+agency+"_"+id+".json?key=TEST&callback="+callback;var encoded=encodeURIComponent(url);$.ajax({url:url,type:'GET',dataType:'jsonp',success:Otp.prototype.success,failure:this.failure});};Oba.prototype.success=function(data){console.log("hopefully this will all go via jsonp");console.log(arguments);};Oba.prototype.failure=function(data){console.log("failure args are: ");console.log(arguments);};function Oba(){this.baseUrl=Config.obaAPIBaseUrl;};;
var hexcase=0;var b64pad="=";var chrsz=8;function hex_sha1(s){return binb2hex(core_sha1(str2binb(s),s.length*chrsz));}
function b64_sha1(s){return binb2b64(core_sha1(str2binb(s),s.length*chrsz));}
function str_sha1(s){return binb2str(core_sha1(str2binb(s),s.length*chrsz));}
function hex_hmac_sha1(key,data){return binb2hex(core_hmac_sha1(key,data));}
function b64_hmac_sha1(key,data){return binb2b64(core_hmac_sha1(key,data));}
function str_hmac_sha1(key,data){return binb2str(core_hmac_sha1(key,data));}
function sha1_vm_test()
{return hex_sha1("abc")=="a9993e364706816aba3e25717850c26c9cd0d89d";}
function core_sha1(x,len)
{x[len>>5]|=0x80<<(24-len%32);x[((len+64>>9)<<4)+15]=len;var w=Array(80);var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;var e=-1009589776;for(var i=0;i<x.length;i+=16)
{var olda=a;var oldb=b;var oldc=c;var oldd=d;var olde=e;for(var j=0;j<80;j++)
{if(j<16)w[j]=x[i+j];else w[j]=rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);var t=safe_add(safe_add(rol(a,5),sha1_ft(j,b,c,d)),safe_add(safe_add(e,w[j]),sha1_kt(j)));e=d;d=c;c=rol(b,30);b=a;a=t;}
a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);e=safe_add(e,olde);}
return Array(a,b,c,d,e);}
function sha1_ft(t,b,c,d)
{if(t<20)return(b&c)|((~b)&d);if(t<40)return b^c^d;if(t<60)return(b&c)|(b&d)|(c&d);return b^c^d;}
function sha1_kt(t)
{return(t<20)?1518500249:(t<40)?1859775393:(t<60)?-1894007588:-899497514;}
function core_hmac_sha1(key,data)
{var bkey=str2binb(key);if(bkey.length>16)bkey=core_sha1(bkey,key.length*chrsz);var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++)
{ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C;}
var hash=core_sha1(ipad.concat(str2binb(data)),512+data.length*chrsz);return core_sha1(opad.concat(hash),512+160);}
function safe_add(x,y)
{var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}
function rol(num,cnt)
{return(num<<cnt)|(num>>>(32-cnt));}
function str2binb(str)
{var bin=Array();var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz)
bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(32-chrsz-i%32);return bin;}
function binb2str(bin)
{var str="";var mask=(1<<chrsz)-1;for(var i=0;i<bin.length*32;i+=chrsz)
str+=String.fromCharCode((bin[i>>5]>>>(32-chrsz-i%32))&mask);return str;}
function binb2hex(binarray)
{var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++)
{str+=hex_tab.charAt((binarray[i>>2]>>((3-i%4)*8+4))&0xF)+
hex_tab.charAt((binarray[i>>2]>>((3-i%4)*8))&0xF);}
return str;}
function binb2b64(binarray)
{var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var str="";for(var i=0;i<binarray.length*4;i+=3)
{var triplet=(((binarray[i>>2]>>8*(3-i%4))&0xFF)<<16)|(((binarray[i+1>>2]>>8*(3-(i+1)%4))&0xFF)<<8)|((binarray[i+2>>2]>>8*(3-(i+2)%4))&0xFF);for(var j=0;j<4;j++)
{if(i*8+j*6>binarray.length*32)str+=b64pad;else str+=tab.charAt((triplet>>6*(3-j))&0x3F);}}
return str;};
function W3DTF(d){function pad(n){return n<10?'0'+n:n;}
return d.getUTCFullYear()+'-'
+pad(d.getUTCMonth()+1)+'-'
+pad(d.getUTCDate())+'T'
+pad(d.getUTCHours())+':'
+pad(d.getUTCMinutes())+':'
+pad(d.getUTCSeconds())+'Z';}
function generateWSSEHeader(username,password){var nonce="";var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var i=0;i<20;++i){nonce+=tab.charAt(Math.floor(Math.random()*64));}
var created=W3DTF(new Date());var password_digest=b64_sha1(nonce+created+password);var header='UsernameToken Username="'+username+'", PasswordDigest="'+password_digest+'", Nonce="'+nonce+'", Created="'+created+'"';return header;};