
if(window.console==undefined||window.console.log==undefined)
{var names=["log","debug","info","warn","error","assert","dir","dirxml","group","groupEnd","time","timeEnd","count","trace","profile","profileEnd"];window.console={};for(var i=0;i<names.length;++i)
window.console[names[i]]=function(){};}
if(otp==null)
var otp={};otp.CLASS_NAME="otp";otp.namespace=function(ns,context)
{ns=(typeof ns=='string')?[ns]:ns;context=context||window;var num=ns.length;for(var i=0;i<num;++i)
{var parts=ns[i].split('.');var base=parts.shift();if(typeof context[base]=='undefined'){context[base]={};}
if(parts.length>0){otp.namespace([parts.join('.')],context[base]);}}};otp.defaultMethod=function()
{console.log("NOTE: you're calling a otp.defaultMethod() - please make sure all logic is implemented.");};otp.Class=function(){var Class=function(){this.initialize.apply(this,arguments);};var extended={};var parent;var initialize;var len=arguments.length;for(var i=0;i<len;++i)
{if(typeof arguments[i]=="function")
{if(i==0&&len>1){initialize=arguments[i].prototype.initialize;arguments[i].prototype.initialize=function(){};extended=new arguments[i];arguments[i].prototype.initialize=initialize;}
parent=arguments[i].prototype;}else{parent=arguments[i];}
otp.extend(extended,parent);}
extended.swapElements=otp.swapElements;Class.prototype=extended;return Class;};otp.isLocalHost=function(){try{return document.location.href.indexOf('localhost')>0;}catch(e){}
return false;};otp.swapElements=function(object,elementName){if(object==null||elementName==null)return;try{var tmp=this[elementName];this[elementName]=object[elementName];object[elementName]=tmp;}
catch(e){console.log("EXCEPTION otp.swap(): couldn't swap element values named "+elementName+"\n"+e);}};otp.extend=function(destination,source){destination=destination||{};if(source){for(var property in source){var value=source[property];if(value!==undefined){destination[property]=value;}}
var sourceIsEvt=typeof window.Event=="function"&&source instanceof window.Event;if(!sourceIsEvt&&source.hasOwnProperty&&source.hasOwnProperty('toString')){destination.toString=source.toString;}}
return destination;};otp.override=function(destination,source){destination=destination||{};if(source)
{for(var property in source)
{var v1=source[property];var v2=destination[property];if(v1!==undefined&&v2!==undefined)
{this._copyProp(property,destination,v1);}}}
return destination;};otp.inherit=function(destination,source){destination=destination||{};if(source)
{for(var property in source)
{var v1=source[property];var v2=destination[property];if(v1!==undefined&&v2==null)
{this._copyProp(property,destination,v1);}}
var sourceIsEvt=typeof window.Event=="function"&&source instanceof window.Event;if(!sourceIsEvt&&source.hasOwnProperty&&source.hasOwnProperty('toString'))
{destination.toString=source.toString;}}
return destination;};otp.configure=function(destination,source,getAll){destination=destination||{};if(source)
{for(var property in source)
{if(property=="CLASS_NAME")continue;var value=source[property];var exist=destination[property];if(value!=null&&typeof value!=='function'&&(exist!==undefined||getAll==true))
{destination[property]=value;}
if(value==null&&getAll==true)
{destination[property]=value;}}
var sourceIsEvt=typeof window.Event=="function"&&source instanceof window.Event;if(!sourceIsEvt&&source.hasOwnProperty&&source.hasOwnProperty('toString'))
{destination.toString=source.toString;}}
return destination;};otp.clone=function(obj,dest)
{if(obj==null||typeof(obj)!='object'||obj.contentType=="application/xml")
return obj;var copied=dest||{};var temp=new obj.constructor();copied[obj]=temp;for(var key in obj)
{if(copied[obj[key]])
temp[key]=copied[obj[key]];else{temp[key]=otp.clone(obj[key],copied);copied[obj[key]]=temp[key];}}
return temp;};otp._copyProp=function(property,destination,value)
{if(property=="CLASS_NAME"||property=="CLAZZ_NAME")
{var pre="";if(destination.CLASS_INHERITANCE==null)
destination.CLASS_INHERITANCE="";else
pre=";";destination.CLASS_INHERITANCE+=pre+value;}
else
{destination[property]=value;}};
otp.namespace("otp.util");otp.util.Constants={TP_COOKIE_NAME:"otp_cookie_name",TP_COOKIE_VALUE:"otp_cookie_value",BLANK_LAT_LON:'0.0,0.0',fromFormID:'from.form.id',toFormID:'to.form.id',intermediatFormID:'intermediate.form.id',CLASS_NAME:"otp.util.Constants"};
otp.namespace("otp.util");otp.util.Modes={WALK:'WALK',BICYCLE:'BICYCLE',TRAM:'TRAM',SUBWAY:'SUBWAY',RAIL:'RAIL',BUS:'BUS',CABLE_CAR:'CABLE_CAR',GONDOLA:'GONDOLA',FERRY:'FERRY',FUNICULAR:'FUNICULAR',TRANSIT:'TRANSIT',TRAINISH:'TRAINISH',BUSISH:'BUSISH',getTransitModes:function()
{return[this.TRAM,this.SUBWAY,this.BUS,this.RAIL,this.GONDOLA,this.FERRY,this.CABLE_CAR,this.FUNICULAR,this.TRANSIT,this.TRAINISH,this.BUSISH];},isTransit:function(mode)
{if(mode==null)return false;return otp.util.ObjUtils.isInArray(mode.toUpperCase(),this.getTransitModes());},getTrainModes:function()
{return[this.TRAM,this.SUBWAY,this.RAIL,this.GONDOLA,this.CABLE_CAR,this.FUNICULAR,this.TRAINISH];},isTrain:function(mode)
{if(mode==null)return false;return otp.util.ObjUtils.isInArray(mode.toUpperCase(),this.getTrainModes());},getBusModes:function()
{return[this.BUS,this.BUSISH];},isBus:function(mode)
{if(mode==null)return false;return otp.util.ObjUtils.isInArray(mode.toUpperCase(),this.getBusModes());},getBicycleModes:function()
{return[this.BICYCLE,"BIKE"];},isBikeAndTransit:function(mode)
{if(mode==null)return false;var hasBike=false;var hasTransit=false;var keys=null;if(mode.indexOf(','))
keys=mode.split(',');else
keys=mode.split('_');if(keys)
{for(var i=0;i<array.length;i++)
{var m=array[i];if(otp.util.ObjUtils.isInArray(mode.toUpperCase(),this.getTransitModes()))
hasTransit=true;if(otp.util.ObjUtils.isInArray(mode.toUpperCase(),this.getBicycleModes()))
hasBike=true;}}
var retVal=hasBike&&hasTransit;return retVal;},translate:function(mode,locale)
{if(mode==null)return null;if(locale==null)
locale=otp.config.locale;var retVal=null;try
{retVal=locale.modes[mode.toUpperCase()];}
catch(e)
{}
if(retVal==null)
retVal=mode;return retVal;},CLASS_NAME:"otp.util.Modes"};otp.util.ItineraryModes={itineraryMessages:null,itinerary:null,m_message:null,m_hasWalk:false,m_hasTransit:false,m_hasBike:false,m_hasBus:false,m_hasTrain:false,initialize:function(config,itinerary)
{otp.configure(this,config.planner);this.itinerary=itinerary;this._findModes();this._findMessage();},getMessage:function()
{return this.m_message;},_findModes:function()
{var endIndex=this.itinerary.m_fromStore.getCount();for(var i=0;i<endIndex;i++)
{var from=this.itinerary.m_fromStore.getAt(i);var mode=from.get('mode');if(otp.util.Modes.isTransit(mode))
{this.m_hasTransit=true;if(otp.util.Modes.isBus(mode))
this.m_hasBus=true;else if(otp.util.Modes.isTrain(mode))
this.m_hasTrain=true;}
else if(otp.util.Modes.WALK==mode)
{this.m_hasWalk=true;}
else if(otp.util.Modes.BICYCLE==mode)
{this.m_hasBike=true;}}},_findMessage:function()
{if(this.itineraryMessages)
{if(this.m_hasTransit&&this.m_hasBike&&this.itineraryMessages.bicycle_transit)
this.m_message=this.itineraryMessages.bicycle_transit;else if(this.m_hasBike&&this.itineraryMessages.bicycle)
this.m_message=this.itineraryMessages.bicycle;else if(this.m_hasBike&&this.m_hasWalk)
this.m_message=this.itineraryMessages.bicycle_rental;else if(this.m_hasBike&&this.m_hasWalk&&this.m_hasTransit)
this.m_message=this.itineraryMessages.bicycle_rental_t;else if(this.m_hasTransit&&this.itineraryMessages.transit)
{this.m_message=this.itineraryMessages.transit;if(this.m_hasBus&&this.itineraryMessages.bus)
this.m_message=this.itineraryMessages.bus;else if(this.m_hasTrain&&this.itineraryMessages.train)
this.m_message=this.itineraryMessages.train;}
else if(this.m_hasWalk&&this.itineraryMessages.walk)
this.m_message=this.itineraryMessages.walk;}},CLASS_NAME:"otp.util.ItineraryModes"};otp.util.ItineraryModes=new otp.Class(otp.util.ItineraryModes);
otp.namespace("otp.locale");otp.locale.Dutch={config:{metricsSystem:"international",rightClickMsg:"Klik met de rechtermuisknop op de plattegrond om het begin en einde van je reis aan te geven.",attribution:{title:"License Attribution",content:"Disclaimer"}},contextMenu:{fromHere:"Begin je reis hier",toHere:"Eindig je reis hier",centerHere:"Centreer kaart",zoomInHere:"Inzoomen",zoomOutHere:"Uitzoemen",previous:"Vorige positie",next:"Volgende positie"},bikeTriangle:{safeName:"Veiligst",safeSym:"V",hillName:"Hellingen",hillSym:"H",timeName:"Snelst",timeSym:"S"},service:{weekdays:"Weekdagen",saturday:"Zaterdag",sunday:"Zondag",schedule:"Dienstregeling"},indicators:{ok:"OK",date:"Datum",loading:"Wordt geladen",searching:"Zoeken...",qEmptyText:"Adres, kruising, herkeningspunt, of haltenummer..."},buttons:{reverse:"Terugreis",reverseTip:"<b>Terugreis</b><br/>Plan een terugreis op een later tijdstip.",reverseMiniTip:"Terugreis",edit:"Bewerk",editTip:"<b>Bewerk</b><br/>Ga terug naar het zoekformulier.",clear:"Wis",clearTip:"<b>Wis</b><br/>Wis de plattegrond en gereedschappen.",fullScreen:"Volledig scherm",fullScreenTip:"<b>Volledig scherm</b><br/>Verberg gereedschappen",print:"Print",printTip:"<b>Print</b><br/>Print vriendelijke versie (zonder plattegrond)",link:"Link",linkTip:"<b>Link</b><br/>Toon de URL voor deze reis.",feedback:"Feedback",feedbackTip:"<b>Feedback</b><br/>Stuur je ervaringen en feedback over deze reisplanner",submit:"Submit",clearButton:"Wis",ok:"OK",cancel:"Annuleer",yes:"Ja",no:"Nee",showDetails:"&darr; Toon details &darr;",hideDetails:"&uarr; Verberg details &uarr;"},directions:{southeast:"zuidoost",southwest:"zuidwest",northeast:"noordoost",northwest:"noordwest",north:"noord",west:"west",south:"zuid",east:"oost",bound:"richting",left:"links",right:"rechts",slightly_left:"flauwe bocht links",slightly_right:"flauwe bocht rechts",hard_left:"scherpe bocht links",hard_right:"scherpe bocht rechts",'continue':"ga verder op",to_continue:"om door te gaan op",becomes:"wordt",at:"bij",on:"op",to:"naar",via:"via",circle_counterclockwise:"neem rotonde linksom",circle_clockwise:"neem rotonde rechtsom",elevator:"neem lift naar"},instructions:{walk:"Lopen",walk_toward:"Loop richting",walk_verb:"Loop",bike:"Fietsen",bike_toward:"Fiets",bike_verb:"Fiets",drive:"Auto",drive_toward:"Rij richting",drive_verb:"Rij",move:"Ga",move_toward:"Ga naar",transfer:"Stap over",transfers:"Overstappen",continue_as:"Gaat verder als",stay_aboard:"stap niet uit",depart:"Vertrek",arrive:"Aankomst",start_at:"Begin bij",end_at:"Eindig bij"},labels:{agency_msg:"Uitgevoerd door",agency_msg_tt:"Open website van vervoerder in nieuw venster...",about:"Over",stop_id:"Haltenummer",trip_details:"Reisdetails",fare:"Ritprijs",fare_symbol:"\u20ac",regular_fare:"",student_fare:"",senior_fare:"",travel:"Reis",valid:"Geldig",trip_length:"Tijd",with_a_walk:"met een wandeling van",alert_for_rt:"Melding voor deze route"},modes:{WALK:"Lopen",BICYCLE:"Fietsen",CAR:"Auto",TRAM:"Tram",SUBWAY:"Metro",RAIL:"Trein",BUS:"Bus",FERRY:"Veer",CABLE_CAR:"Kabeltram",GONDOLA:"Cabinelift",FUNICULAR:"Kabelspoorweg"},ordinal_exit:{1:"tot de eerste afslag",2:"tot de tweede afslag",3:"tot de derde afslag",4:"tot de vierde afslag",5:"tot de vijfde afslag",6:"tot de zesde afslag",7:"tot de zevende afslag",8:"tot de achtste afslag",9:"tot de negende afslag",10:"tot de tiende afslag"},time:{hour_abbrev:"hour",hours_abbrev:"hours",hour:"hour",hours:"hours",minute:"minuut",minutes:"minuten",minute_abbrev:"min",minutes_abbrev:"min",second_abbrev:"s",seconds_abbrev:"s",format:"j F Y @ H:i",date_format:"d-m-Y",time_format:"H:i",months:['jan','feb','mar','apr','mei','jun','jul','aug','sep','oct','nov','dec']},systemmap:{labels:{panelTitle:"Lijnenkaart"}},tripPlanner:{labels:{panelTitle:"Reisplanner",tabTitle:"Plan je reis",inputTitle:"Reisdetails",optTitle:"Reisvoorkeuren (optioneel)",submitMsg:"Reis wordt gepland...",optionalTitle:"",date:"Datum",time:"Tijd",when:"Op",from:"Van",fromHere:"Van hier",to:"Naar",toHere:"Naar hier",intermediate:"Tussenstops",minimize:"Toon reis met",maxWalkDistance:"Maximum loopafstand",walkSpeed:"Loopsnelheid",maxBikeDistance:"Maximum fietsafstand",bikeSpeed:"Fietssnelheid",arriveDepart:"Vertrek/Aankomst voor",mode:"Reis per",wheelchair:"Rolstoeltoegankelijk",go:"Ga",planTrip:"Plan je reis",newTrip:"Nieuwe reis"},link:{text:"Link naar deze reis",trip_separator:"Deze reis met andere reisplanners",bike_separator:"Op andere fietsrouteplanners",walk_separator:"Op andere looprouteplanners",google_transit:"Google Transit",google_bikes:"Google Fietsroutes",google_walk:"Google Looproutes",google_domain:"http://www.google.com"},geocoder:{working:"Adres wordt opgezocht ....",error:"Kon geen resultaten vinden",msg_title:"Bekijk reisplanning",msg_content:"Bekijk deze fouten voor het plannen van je reis",select_result_title:"Kies een resultaat",address_header:"Adres"},error:{title:'Reisplanner fout',deadMsg:"De reisplanner reageert momenteel even niet. Wacht een paar minuten, of probeer de tekstversie (zie link hieronder).",geoFromMsg:"Selecteer een vertreklocatie voor je reis: ",geoToMsg:"Selecteer een bestemming voor je reis: "},msgcodes:{200:"Plan OK",500:"Server fout",400:"Reis buiten bekend gebied",404:"Geen route gevonden",406:"Geen OV tijden gevonden",408:"Resultaat niet op tijd gevonden",413:"Ongeldige parameter",440:"Vertrekpunt niet gevonden",450:"Bestemming niet gevonden",460:"Vertekpunt en bestemming niet gevonden",470:"Vertrekpunt of bestemming niet rolstoeltoegankelijk",409:"Te dichtbij",340:"Vertrekpunt onduidelijk",350:"Bestemming onduidelijk",360:"Vertrekpunt en bestemming onduidelijk"},options:[['TRANSFERS','Minste overstappen'],['QUICK','Snelste reis'],['SAFE','Veiligste reis'],['TRIANGLE','Eigen voorkeuren...']],arriveDepart:[['false','Vertrek'],['true','Aankomst']],maxWalkDistance:[['100','100 m'],['250','250 m'],['500','500 m'],['750','750 m'],['1000','1 km'],['2000','2 km'],['3000','3 km'],['4000','4 km'],['5000','5 km'],['10000','10 km'],['15000','15 km'],['20000','20 km'],['30000','30 km']],walkSpeed:[['0.278','1 km/h'],['0.556','2 km/h'],['0.833','3 km/h'],['1.111','4 km/h'],['1.389','5 km/h'],['1.667','6 km/h'],['1.944','7 km/h'],['2.222','8 km/h'],['2.500','9 km/h'],['2.778','10 km/h']],mode:[['TRANSIT,WALK','OV'],['BUSISH,WALK','Alleen bus'],['TRAINISH,WALK','Alleen trein'],['WALK','Alleen lopen'],['BICYCLE','Fiets'],['TRANSIT,BICYCLE','OV & Fiets']],with_bikeshare_mode:[['TRANSIT,WALK','OV'],['BUSISH,WALK','Alleen bus'],['TRAINISH,WALK','Alleen trein'],['WALK','Alleen lopen'],['BICYCLE','Fiets'],['WALK,BICYCLE','Huurfiets'],['TRANSIT,BICYCLE','OV & Fiets'],['TRANSIT,WALK,BICYCLE','OV & OV-fiets']],wheelchair:[['false','Nee'],['true','Ja']]},CLASS_NAME:"otp.locale.Dutch"};
otp.namespace("otp.locale");otp.locale.English={config:{metricsSystem:"english",rightClickMsg:"Right-click on the map to designate the start and end of your trip.",attribution:{title:"License Attribution",content:"Disclaimer goes here"}},contextMenu:{fromHere:"Start a trip here",toHere:"End a trip here",intermediateHere:"Add intermediate point",centerHere:"Center map here",zoomInHere:"Zoom in",zoomOutHere:"Zoom out",previous:"Last map position",next:"Next map position"},bikeTriangle:{safeName:"Bike friendly",safeSym:"B",hillName:"Flat",hillSym:"F",timeName:"Quick",timeSym:"Q"},service:{weekdays:"Weekdays",saturday:"Saturday",sunday:"Sunday",schedule:"Schedule"},indicators:{ok:"OK",date:"Date",loading:"Loading",searching:"Searching...",qEmptyText:"Address, intersection, landmark or Stop ID..."},buttons:{reverse:"Reverse",reverseTip:"<b>Reverse directions</b><br/>Plan a return trip by reversing this trip's start and end points, and adjusting the time forward.",reverseMiniTip:"Reverse directions",edit:"Edit",editTip:"<b>Edit trip</b><br/>Return to the main trip planner input form with the details of this trip.",clear:"Clear",clearTip:"<b>Clear</b><br/>Clear the map and all active tools.",fullScreen:"Full Screen",fullScreenTip:"<b>Full Screen</b><br/>Show -or- hide tool panels",print:"Print",printTip:"<b>Print</b><br/>Print friendly version of the trip plan (without map).",link:"Link",linkTip:"<b>Link</b><br/>Show link url for this trip plan.",feedback:"Feedback",feedbackTip:"<b>Feedback</b><br/>Send your thoughts or experiences with the map",submit:"Submit",clearButton:"Clear",ok:"OK",cancel:"Cancel",yes:"Yes",no:"No",showDetails:"&darr; Show details &darr;",hideDetails:"&uarr; Hide details &uarr;"},directions:{southeast:"southeast",southwest:"southwest",northeast:"northeast",northwest:"northwest",north:"north",west:"west",south:"south",east:"east",bound:"bound",left:"left",right:"right",slightly_left:"slight left",slightly_right:"slight right",hard_left:"hard left",hard_right:"hard right",'continue':"continue on",to_continue:"to continue on",becomes:"becomes",at:"at",on:"on",to:"to",via:"via",circle_counterclockwise:"take roundabout counterclockwise",circle_clockwise:"take roundabout clockwise",elevator:"take elevator to"},instructions:{walk:"Walk",walk_toward:"Walk",walk_verb:"Walk",bike:"Bike",bike_toward:"Bike",bike_verb:"Bike",drive:"Drive",drive_toward:"Drive",drive_verb:"Drive",move:"Proceed",move_toward:"Proceed",transfer:"transfer",transfers:"transfers",continue_as:"Continues as",stay_aboard:"stay on board",depart:"Depart",arrive:"Arrive",start_at:"Start at",end_at:"End at"},labels:{agency_msg:"Service run by",agency_msg_tt:"Open agency website in separate window...",about:"About",stop_id:"Stop ID",trip_details:"Trip details",travel:"Travel",valid:"Valid",trip_length:"Time",with_a_walk:"with a walk of",alert_for_rt:"Alert for route",fare:"Fare",regular_fare:"Regular",student_fare:"Student",senior_fare:"Senior",fare_symbol:"$"},modes:{WALK:"Walk",BICYCLE:"Bicycle",CAR:"Car",TRAM:"Tram",SUBWAY:"Subway",RAIL:"Rail",BUS:"Bus",FERRY:"Ferry",CABLE_CAR:"Cable Car",GONDOLA:"Gondola",FUNICULAR:"Funicular"},ordinal_exit:{1:"to first exit",2:"to second exit",3:"to third exit",4:"to fourth exit",5:"to fifth exit",6:"to sixth exit",7:"to seventh exit",8:"to eighth exit",9:"to ninth exit",10:"to tenth exit"},time:{hour_abbrev:"hour",hours_abbrev:"hours",hour:"hour",hours:"hours",minute:"minute",minutes:"minutes",minute_abbrev:"min",minutes_abbrev:"mins",second_abbrev:"sec",seconds_abbrev:"secs",format:"F jS, Y @ g:ia",date_format:"n/j/Y",time_format:"g:ia",months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']},systemmap:{labels:{panelTitle:"System Map"}},tripPlanner:{labels:{panelTitle:"Trip Planner",tabTitle:"Plan a Trip",inputTitle:"Trip Details",optTitle:"Trip Preferences (optional)",submitMsg:"Planning Your Trip...",optionalTitle:"",date:"Date",time:"Time",when:"When",from:"From",fromHere:"From here",to:"To",toHere:"To here",intermediate:"Intermediate Places",minimize:"Show me the",maxWalkDistance:"Maximum walk",walkSpeed:"Walk speed",maxBikeDistance:"Maximum bike",bikeSpeed:"Bike speed",arriveDepart:"Arrive by/Depart at",mode:"Travel by",wheelchair:"Wheelchair accessible trip",go:"Go",planTrip:"Plan Your Trip",newTrip:"New trip"},link:{text:"Link to this trip (OTP)",trip_separator:"This trip on other transit planners",bike_separator:"On other bike trip planners",walk_separator:"On other walking direction planners",google_transit:"Google Transit",google_bikes:"Google Bike Directions",google_walk:"Google Walking Directions",google_domain:"http://www.google.com"},geocoder:{working:"Looking up address ....",error:"Did not receive any results",msg_title:"Review trip plan",msg_content:"Please correct errors before planning your trip",select_result_title:"Please select a result",address_header:"Address"},error:{title:'Trip Planner Error',deadMsg:"Map Trip Planner is currently not responding. Please wait a few minutes to try again, or try the text trip planner (see link below).",geoFromMsg:"Please select the 'From' location for your trip: ",geoToMsg:"Please select the 'To' location for your trip: "},msgcodes:{200:"Plan OK",500:"Server error",400:"Trip out of bounds",404:"Path not found",406:"No transit times",408:"Request timed out",413:"Invalid parameter",440:"The 'From' place is not found ... please re-enter it.",450:"The 'To' place is not found ... please re-enter it.",460:"Places 'From' and 'To' are not found ... please re-enter them.",470:"Places 'From' or 'To' are not wheelchair accessible",409:"Too close",340:"Geocode 'From' ambiguous",350:"Geocode 'To' ambiguous",360:"Geocodes 'From' and 'To' are ambiguous"},options:[['TRANSFERS','Fewest transfers'],['QUICK','Quick trip'],['SAFE','Bike friendly trip'],['TRIANGLE','Custom trip...']],arriveDepart:[['false','Depart'],['true','Arrive']],maxWalkDistance:[['160','1/10 mile'],['420','1/4 mile'],['840','1/2 mile'],['1260','3/4 mile'],['1609','1 mile'],['3219','2 miles'],['4828','3 miles'],['6437','4 miles'],['8047','5 miles'],['16093','10 miles'],['24140','15 miles'],['32187','20 miles'],['48280','30 miles'],['64374','40 miles'],['80467','50 miles'],['160934','100 miles']],walkSpeed:[['0.447','1 mph'],['0.894','2 mph'],['1.341','3 mph'],['1.788','4 mph'],['2.235','5 mph']],mode:[['TRANSIT,WALK','Transit'],['BUSISH,WALK','Bus only'],['TRAINISH,WALK','Train only'],['WALK','Walk only'],['BICYCLE','Bicycle only'],['TRANSIT,BICYCLE','Transit & Bicycle']],with_bikeshare_mode:[['TRANSIT,WALK','Transit'],['BUSISH,WALK','Bus only'],['TRAINISH,WALK','Train only'],['WALK','Walk only'],['BICYCLE','Bicycle only'],['WALK,BICYCLE','Rented Bicycle'],['TRANSIT,BICYCLE','Transit & Bicycle'],['TRANSIT,WALK,BICYCLE','Transit & Rented Bicycle']],wheelchair:[['false','Not required'],['true','Required']]},CLASS_NAME:"otp.locale.English"};
otp.namespace("otp.locale");otp.locale.English_CA={config:{metricsSystem:"international"},tripPlanner:{maxWalkDistance:[['500','500 metres'],['1000','1 km'],['5000','5 km'],['10000','10 km'],['20000','20 km']],walkSpeed:[['0.278','1 km/h'],['0.556','2 km/h'],['0.833','3 km/h'],['1.111','4 km/h'],['1.389','5 km/h'],['1.667','6 km/h'],['1.944','7 km/h'],['2.222','8 km/h'],['2.500','9 km/h'],['2.778','10 km/h']]},CLASS_NAME:"otp.locale.English_CA"};otp.inherit(otp.locale.English_CA,otp.locale.English);otp.inherit(otp.locale.English_CA.tripPlanner,otp.locale.English.tripPlanner);otp.inherit(otp.locale.English_CA.config,otp.locale.English.config);
otp.namespace("otp.locale");otp.locale.English_UK={time:{format:"d/m/y @ H:i",date_format:"d/m/y",time_format:"H:i"},CLASS_NAME:"otp.locale.English_UK"};otp.inherit(otp.locale.English_UK,otp.locale.English);otp.inherit(otp.locale.English_UK.time,otp.locale.English.time);
otp.namespace("otp.locale");otp.locale.French={config:{metricsSystem:"international",rightClickMsg:"Cliquez avec le bouton droit de la souris sur la carte pour désigner le départ et l'arrivée de votre parcours.",attribution:{title:"Attribution de licence",content:"Disclaimer goes here"}},contextMenu:{fromHere:"Partir d'ici",toHere:"Arriver ici",intermediateHere:"Ajouter un point de passage",centerHere:"Centrer la carte ici",zoomInHere:"Zoomer ici",zoomOutHere:"Dézoomer ici",previous:"position précédente",next:"position suivante"},bikeTriangle:{safeName:"Le plus Sûr",safeSym:"S",hillName:"Le plus Plat",hillSym:"P",timeName:"Le plus Rapide",timeSym:"R"},service:{weekdays:"jours de semaine",saturday:"Samedi",sunday:"Dimanche",schedule:"Horaires"},indicators:{ok:"OK",date:"Date",loading:"Chargement",searching:"Calcul...",qEmptyText:"Adresse, intersection, point de repère ou nom d'arrêt..."},buttons:{reverse:"Inverser",reverseTip:"<b>Inverser l'itinéraire</b><br/>Planifier un itinéraire retour en inversant les points de départs et d'arrivée, et ajuster l'heure de départ.",reverseMiniTip:"Inverser l'itinéraire",edit:"Modifier",editTip:"<b>Modifier l'itinéraire</b><br/>Retourner à la configuration de l'itinéraire pour en modifier des paramètres.",clear:"Effacer",clearTip:"<b>Effacer</b><br/>Effacer la carte et les outils actifs.",fullScreen:"Plein écran",fullScreenTip:"<b>Plein écran</b><br/>Montrer ou cacher le panneau latéral",print:"Imprimer",printTip:"<b>Imprimer</b><br/>Imprimer l'itinéraire (sans carte).",link:"Lien",linkTip:"<b>Lien</b><br/>Voir le lien direct vers cet itinéraire.",feedback:"Commentaires",feedbackTip:"<b>Commentaires</b><br/>Envoyez votre retour d'expérience avec la carte.",submit:"Valider",clearButton:"Effacer",ok:"OK",cancel:"Annuler",yes:"Oui",no:"Non",showDetails:"Montrer les détails...",hideDetails:"Masquer les détails..."},directions:{southeast:"le sud-est",southwest:"le sud-ouest",northeast:"le nord-est",northwest:"le nord-ouest",north:"le nord",west:"l'ouest",south:"le sud",east:"l'est",bound:"en direction",left:"à gauche",right:"à droite",slightly_left:"légèrement à gauche",slightly_right:"légèrement à droite",hard_left:"complètement à gauche",hard_right:"complètement à droite",'continue':"continuer sur",to_continue:"pour continuer sur",becomes:"devenant",at:"à",on:"sur",to:"vers",via:"via",circle_counterclockwise:"prendre le rond-point",circle_clockwise:"prendre le rond-point dans le sens horaire",elevator:"prendre l'ascenseur niveau"},instructions:{walk:"Marche à pied",walk_toward:"Marcher vers",walk_verb:"Marcher",bike:"Trajet à vélo",bike_toward:"Pédaler vers",bike_verb:"Pédaler",drive:"Conduite",drive_toward:"Rouler vers",drive_verb:"Rouler",move:"Continuer",move_toward:"Continuer vers",transfer:"correspondance",transfers:"correspondances",continue_as:"Continuer comme",stay_aboard:"rester à bord",depart:"Départ",arrive:"Arrivée",start_at:"Départ à",end_at:"Arrivée à"},labels:{agency_msg:"Service géré par",about:"Environ",stop_id:"Id arrêt",trip_details:"Détails de l'itinéraire",fare:"Tarif",fare_symbol:"\u20ac",regular_fare:"",student_fare:"",senior_fare:"",travel:"Départ le",valid:"Calculé le",trip_length:"Durée",with_a_walk:"avec une marche de",alert_for_rt:"Alerte sur la ligne"},modes:{WALK:"Marche à pied",BICYCLE:"Vélo",CAR:"Voiture",TRAM:"Tramway",SUBWAY:"Métro",RAIL:"Train",BUS:"Bus",FERRY:"Ferry",CABLE_CAR:"Tramway funiculaire",GONDOLA:"Téléphérique",FUNICULAR:"Funiculaire"},ordinal_exit:{1:"(première sortie)",2:"(deuxième sortie)",3:"(troisième sortie)",4:"(quatrième sortie)",5:"(cinquième sortie)",6:"(sixième sortie)",7:"(septième sortie)",8:"(huitième sortie)",9:"(neuvième sortie)",10:"(dixième sortie)"},time:{hour_abbrev:"hour",hours_abbrev:"hours",hour:"hour",hours:"hours",format:"d.m.Y \\à H:i",date_format:"d-m-Y",time_format:"H:i",minute:"minute",minutes:"minutes",minute_abbrev:"min",minutes_abbrev:"min",second_abbrev:"sec",seconds_abbrev:"sec",months:['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Aoû','Sep','Oct','Nov','Déc']},systemmap:{labels:{panelTitle:"Carte du réseau"}},tripPlanner:{labels:{panelTitle:"Itinéraire",tabTitle:"Planifier un itinéraire",inputTitle:"Détails de l'itinéraire",optTitle:"Préférences de l'itinéraire (facultatif)",submitMsg:"Calcul de l'itinéraire...",optionalTitle:"",date:"Date",time:"Heure",when:"Quand",from:"Départ",fromHere:"Partir d'ici",to:"Arrivée",toHere:"Arriver ici",intermediate:"Point de passage",minimize:"Optimiser pour",maxWalkDistance:"Marche maximum",walkSpeed:"Vitesse de marche",maxBikeDistance:"Parcours à vélo maximum",bikeSpeed:"Vitesse à vélo",arriveDepart:"Arriver à/Partir de",mode:"Voyager par",wheelchair:"Accessible aux fauteuils roulants",go:"Go",planTrip:"Calculer un itinéraire",newTrip:"Nouvel itinéraire"},link:{text:"Lien vers cet itinéraire (OTP)",trip_separator:"Cet itinéraire sur d'autres calculateurs",bike_separator:"Sur d'autres calculateurs 'vélo'",walk_separator:"Sur d'autres calculateurs 'piéton'",google_transit:"Google Maps (transport en commun)",google_bikes:"Google Maps (vélo)",google_walk:"Google Maps (piéton)",google_domain:"http://www.google.fr"},geocoder:{working:"Recherche de l'adresse...",error:"Aucun résultat n'a été trouvé",msg_title:"Recommencer avec une autre adresse",msg_content:"Veuillez corriger les erreurs avant de planifier votre itinéraire",select_result_title:"Veuillez sélectionner un résultat",address_header:"Adresse"},error:{title:"Erreur du planificateur d'itinéraire",deadMsg:"Le planificateur d'itinéraire ne répond pas actuellement. Merci de patienter quelques minutes et de réessayer, ou essayez le planificateur en mode texte (voir le lien ci-dessous).",geoFromMsg:"Merci de sélectionner le lieu de départ de votre itinéraire : ",geoToMsg:"Merci de sélectionner le lieu d'arrivée de votre itinéraire : "},msgcodes:{200:"Calcul OK",500:"Erreur serveur",400:"Voyage en dehors de la zone",404:"Itinéraire non trouvé",406:"Pas d'horaires de transport en commun",408:"Temps d'attente de la demande dépassé",413:"Paramètre invalide",440:"Adresse de départ non trouvée",450:"Adresse de destination non trouvée",460:"Adresses de départ et destination non trouvées",409:"Départ trop proche de l'arrivée",340:"Adresse de départ ambigüe",350:"Adresse de destination ambigüe",360:"Adresses de départ et destination ambigües"},options:[['TRANSFERS','Le plus direct'],['QUICK','Le plus rapide'],['SAFE','Le plus sûr'],['TRIANGLE','Personnalisé...']],arriveDepart:[['false','Départ'],['true','Arriver']],maxWalkDistance:[['200','200 m'],['500','500 m'],['1000','1 km'],['1500','1,5 km'],['5000','5 km'],['10000','10 km']],walkSpeed:[['0.278','1 km/h'],['0.556','2 km/h'],['0.833','3 km/h'],['1.111','4 km/h'],['1.389','5 km/h'],['1.667','6 km/h'],['1.944','7 km/h'],['2.222','8 km/h'],['2.500','9 km/h'],['2.778','10 km/h']],mode:[['TRANSIT,WALK','Transports publics'],['BUSISH,TRAINISH,WALK','Bus & Train'],['BUSISH,WALK','Bus seulement'],['TRAINISH,WALK','Train seulement'],['WALK','Marche seulement'],['BICYCLE','Vélo'],['TRANSIT,BICYCLE','Transports publics & Vélo']],wheelchair:[['false','Non requis'],['true','Requis']]},CLASS_NAME:"otp.locale.French"};
otp.namespace("otp.locale");otp.locale.Gaelic={config:{metricsSystem:"international",rightClickMsg:"TODO - localize me and tripPlanner.link below - Right-click on the map to designate the start and end of your trip.",attribution:{title:"License Attribution",content:"Disclaimer goes here"}},contextMenu:{fromHere:"Tosaigh turas anseo",toHere:"Críochnaigh turas anseo",intermediateHere:"Add intermediate point",centerHere:"Cur lár an léarscáil anseo",zoomInHere:"Zúmáil amach anseo",zoomOutHere:"Zúmáil isteach anseo",previous:"Áit ar an léarscáil níos déanaí",next:"Céad áit eile ar an léarscáil"},bikeTriangle:{safeName:"Bike friendly",safeSym:"B",hillName:"Flat",hillSym:"F",timeName:"Quick",timeSym:"Q"},service:{weekdays:"I rith na seachtaine",saturday:"Satharn",sunday:"Domhnach",schedule:"Sceideal"},indicators:{ok:"OK",date:"Dáta",loading:"Ag luchtach",searching:"Ag cuardach....",qEmptyText:"Seoladh, crosbhealach, sainchomhartha, nó Stop ID..."},buttons:{reverse:"Ar ais",reverseTip:"<b>treoracha ar ais</b><br/>Plean turas fillte ag aisiompú na bpointí tús agus críche an turais seo, agus ag choigeartú an am seo ar aghaidh.",reverseMiniTip:"treoracha ar ais",edit:"Aithrigh",editTip:"<b>Aithrigh turas</b><br/>Fill ar ais go dtí príomhfoirm pleanálaí turais le sonraí an turas seo.",clear:"Glan",clearTip:"<b>Glan</b><br/>Glan an léarscáil agus na huirlisí uile atá gníomhach.",fullScreen:"Scáileán Iomlán",fullScreenTip:"<b>Scáileán Iomlán</b><br/>Teaspáin -nó- cur i bhfolach painéil uirlis.",print:"Priontáil",printTip:"<b>Priontáil</b><br/>Leagan an turasphlean réidh le phriontáil (gan léarscáil).",link:"Nasc",linkTip:"<b>Nasc</b><br/>Teaspain URL an nasc don turasphlean seo.",feedback:"Aiseolas",feedbackTip:"<b>Aiseolas</b><br/>Seol do thuaraim nó faoin léarscáil.",submit:"Cur",clearButton:"Glan",ok:"OK",cancel:"Dúiltaigh",yes:"Ar aghaidh",no:"Ní",showDetails:"Show details...",hideDetails:"Hide details..."},directions:{southeast:"oirdheas",southwest:"iardheas",northeast:"oirthuaidh",northwest:"iarthuaidh",north:"thuaidh",west:"thiar",south:"theas",east:"thoir",bound:"faoi cheangal",left:"Ar chlé",right:"Ar dheis",slightly_left:"beagán ar chlé",slightly_right:"beagán ar dheis",hard_left:"lán ar chlé",hard_right:"lán ar dheis",'continue':"lean ar aghaidh",to_continue:"chun leanúint ar",becomes:"go dti do n-aithríonn sé go",at:"ag",on:"on",to:"to",via:"via",circle_counterclockwise:"take roundabout counterclockwise",circle_clockwise:"take roundabout clockwise"},instructions:{walk:"Walk",walk_toward:"Walk",walk_verb:"Walk",bike:"Bike",bike_toward:"Bike",bike_verb:"Bike",drive:"Drive",drive_toward:"Drive",drive_verb:"Drive",move:"Proceed",move_toward:"Proceed",transfer:"transfer",transfers:"transfers",continue_as:"Continues as",stay_aboard:"stay on board",depart:"Depart",arrive:"Arrive",start_at:"Start at",end_at:"End at"},labels:{agency_msg:"Service run by",about:"About",stop_id:"Stop ID",trip_details:"Weee Trip Details",fare:"Fare",fare_symbol:"\u20ac",regular_fare:"",student_fare:"",senior_fare:"",travel:"Travel",valid:"Valid",trip_length:"Time",with_a_walk:"with a walk of",alert_for_rt:"Alert for route"},modes:{WALK:"WALK",BICYCLE:"BICYCLE",CAR:"CAR",TRAM:"TRAM",SUBWAY:"SUBWAY",RAIL:"RAIL",BUS:"BUS",FERRY:"FERRY",CABLE_CAR:"CABLE CAR",GONDOLA:"GONDOLA",FUNICULAR:"FUNICULAR"},ordinal_exit:{1:"to first exit",2:"to second exit",3:"to third exit",4:"to fourth exit",5:"to fifth exit",6:"to sixth exit",7:"to seventh exit",8:"to eighth exit",9:"to ninth exit",10:"to tenth exit"},time:{hour_abbrev:"hour",hours_abbrev:"hours",hour:"hour",hours:"hours",format:"D, j M H:i",date_format:"d-m-Y",time_format:"H:i",minute:"nóiméad",minutes:"nóiméid",minute_abbrev:"nóiméad",minutes_abbrev:"nóiméid",second_abbrev:"seacaind",seconds_abbrev:"seacaind",months:['Ean','Fea','Máirt','Aib','Beal','Meith','Iúil','Lún','M.Fr','D.Fr','Sam','Nollaig']},systemmap:{labels:{panelTitle:"Sisteam"}},tripPlanner:{labels:{panelTitle:"Pleanálaí Turais",tabTitle:"Pleanáil turas",inputTitle:"Sonraí turais",optTitle:"roghanna turais (roghnach)",submitMsg:"Ag pleanáil do thuras...",optionalTitle:"",date:"Dáta",time:"Am",when:"Cathain",from:"Ó",fromHere:"Ón áit seo",to:"Go",toHere:"Go dtí seo",intermediate:"Intermediate Place",minimize:"Teaspáin dom an",maxWalkDistance:"Súil is faide",walkSpeed:"Siúl luas",maxBikeDistance:"Súil is bike",bikeSpeed:"luas rothar",arriveDepart:"Sroic roimh/Imigh ag",mode:"Iompair ar",wheelchair:"Turas oiriúnach do chathaoireacha rothaí",go:"Imigh",planTrip:"Pleanáil do thuras",newTrip:"Turas nua"},link:{text:"Link to this trip (OTP)",trip_separator:"This trip on other transit planners",bike_separator:"On other bike trip planners",walk_separator:"On other walking direction planners",google_transit:"Google Transit",google_bikes:"Google Bike Directions",google_walk:"Google Walking Directions",google_domain:"http://www.google.ie"},geocoder:{working:"Looking up address ....",error:"Did not receive any results",msg_title:"Wee review trip plan",msg_content:"Wee correct errors before planning your trip",select_result_title:"Please select a result",address_header:"Address"},error:{title:"Thárla earráid sa phleanálaí turais",deadMsg:"Tá pleanálaí léarscáil an dturais gan freagra a thabhairt faoi láthair. Fan ar feadh cúpla nóiméad chun iarracht eile a dhéanamh, nó déan iarracht as an phleanálaí turais téacs (féach an nasc thíos).",geoFromMsg:"Roghnaigh an suíomh 'Ó' do do thurais: ",geoToMsg:"Roghnaigh an suíomh 'Go dtí' do do thurais:"},msgcodes:{200:"Plean OK",500:"Earráid Fhreastalaí",400:"Turas as teorainn",404:"Ní bhfuarthas an tslí",406:"Nil amanna idirthurais ar fáil",408:"Iarratas imithe thar am",413:"Paraiméadar neamhbhailí",440:"Ní bhfuarthas an geocode 'Ó'",450:"Ní bhfuarthas an geocode 'Go dtí'",460:"Ní bhfuarthas na geocodes 'Ó' nó 'Go dtí'",409:"Ró-chóngarach",340:"Geocode 'Ó' débhríoch",350:"Geocode 'Go dtí' débhríoch",360:"Geocode 'Ó' agus geocode 'Go dtí' débhríoch"},options:[['TRANSFERS','Aistrithe is lú'],['QUICK','Turas is tapúla'],['SAFE','Turas is sabháilte'],['TRIANGLE','Custom trip...']],arriveDepart:[['false','Imeacht'],['true','Teacht']],maxWalkDistance:[['200','200 méadar'],['500','500 méadar'],['1000','1 ciliméadar'],['1500','1.5 ciliméadar'],['5000','5 chiliméadar'],['10000','10 chiliméadar']],walkSpeed:[['0.278','1 km/u'],['0.556','2 km/u'],['0.833','3 km/u'],['1.111','4 km/u'],['1.389','5 km/u'],['1.667','6 km/u'],['1.944','7 km/u'],['2.222','8 km/u'],['2.500','9 km/u'],['2.778','10 km/u']],mode:[['TRANSIT,WALK','Idirthurais'],['BUSISH,TRAINISH,WALK','Bus & traen'],['BUSISH,WALK','Bus amháin'],['TRAINISH,WALK','Traen amháin'],['WALK','Súil amháin'],['BICYCLE','Rothar'],['TRANSIT,BICYCLE','Idirthurais & Rothar']],wheelchair:[['false','Ní gá'],['true','Riachtanach']]},CLASS_NAME:"otp.locale.Gaelic"};
otp.namespace("otp.locale");otp.locale.German={config:{metricsSystem:"international",rightClickMsg:"Klicken Sie mit der rechte Maustaste auf die Karte um Startpunkt und Endpunkt auszuwählen",attribution:{title:"Lizenz",content:"Nutzungsbedingungen"}},contextMenu:{fromHere:"Startpunkt",toHere:"Zielpunkt",intermediateHere:"Zwischenstop",centerHere:"hier die Karte zentrieren",zoomInHere:"Karte vergössern",zoomOutHere:"Karte verkleinern",previous:"vorherigen Position auf der Karte",next:"nächste Position auf der Karte"},bikeTriangle:{safeName:"für Fahrradnutzung",safeSym:"B",hillName:"Flach",hillSym:"F",timeName:"Schnell",timeSym:"S"},service:{weekdays:"Wochentage",saturday:"Samstag",sunday:"Sonntag",schedule:"Zeitplan"},indicators:{ok:"OK",date:"Datum",loading:"laden",searching:"Suche...",qEmptyText:"Addresse, Kreuzung, Bezugspunkt oder Haltstellen ID..."},buttons:{reverse:"Umkehren",reverseTip:"<b>umgekehrte Richtung</b><br/>Vertauscht Start- und Zielpunkt, und ändert den Startzeitpunkt",reverseMiniTip:"umgekehrter Richtung",edit:"Ändern",editTip:"<b>Reise ändern</b><br/>Zurück zur Startseite mit den Details der geplanten Reise.",clear:"Löschen",clearTip:"<b>löschen</b><br/>Karte und alle Aktivität löschen.",fullScreen:"Vollansicht",fullScreenTip:"<b>Vollansicht</b><br/>Symbolleiste zeigen oder ausblenden",print:"Drucken",printTip:"<b>Drucken</b><br/>Drucken Sie eine vereinfachte Version der Strecke (ohne Karte).",link:"Links",linkTip:"<b>Link</b><br/>Den Link für die gewählte Strecke zeigen.",feedback:"Rückmeldung",feedbackTip:"<b>Rückmeldung</b><br/>Rückmeldung geben",submit:"bestätigen",clearButton:"löschen",ok:"OK",cancel:"abbrechen",yes:"ja",no:"nein",showDetails:"Zeige Details...",hideDetails:"Verstecke Details..."},directions:{southeast:"Südosten",southwest:"Südwesten",northeast:"Nordosten",northwest:"Nordwest",north:"Norden",west:"Westen",south:"Süden",east:"Osten",bound:"Grenze",left:"Nach Links",right:"Nach Rechts",slightly_left:"links halten,",slightly_right:"rechts halten,",hard_left:"Links Abbiegen",hard_right:"Rechts Abbiegen",'continue':"weiter",to_continue:"weiter über",becomes:"wird",at:"um",on:"entlang der",to:"nach",via:"Straße",circle_counterclockwise:"nehmen Sie den Kreisverkehr gegen den Uhrzeigersinn",circle_clockwise:"nehmen Sie den Kreisverkehr im Uhrzeigersinn",elevator:"Aufzug benutzen, nach"},instructions:{walk:"zu Fuß",walk_toward:"Gehe nach",walk_verb:"gehen",bike:"Fahrrad",bike_toward:"Radfahren",bike_verb:"Radfahren",drive:"Fahren",drive_toward:"fahren in Richtung",drive_verb:"fahren",move:"weiterfahren",move_toward:"weiterfahren",transfer:"Umstiegshalt",transfers:"Umstiegshalte",continue_as:"Weiterfahren",stay_aboard:"an Bord bleiben",depart:"Abfahrt",arrive:"Ankunft",start_at:"Start",end_at:"Ziel"},labels:{agency_msg:"Ein Service von",agency_msg_tt:"Internetseite des Service-Anbieters in neuem Fenster...",about:"Strecke:",stop_id:"Haltstellen-Nummer",trip_details:"Reise Übersicht",fare:"Preis",fare_symbol:"\u20ac",regular_fare:"",student_fare:"",senior_fare:"",travel:"Reise",valid:"Erstellt am",trip_length:"Reisezeit",with_a_walk:"Zu Fuß",alert_for_rt:"Achten Sie auf den Weg!"},modes:{WALK:"zu Fuß",BICYCLE:"Fahrrad",CAR:"Auto",TRAM:"Straßenbahn",SUBWAY:"U-Bahn",RAIL:"Eisenbahn",BUS:"Bus",FERRY:"Fähre",CABLE_CAR:"Standseilbahn",GONDOLA:"Seilbahn",FUNICULAR:"Standseilbahn"},ordinal_exit:{1:"erste Ausfahrt",2:"zweite Ausfahrt",3:"dritte Ausfahrt",4:"vierte Ausfahrt",5:"fünfte Ausfahrt",6:"sechste Ausfahrt",7:"siebte Ausfahrt",8:"achte Ausfahrt",9:"neunte Ausfahrt",10:"zehnte Ausfahrt"},time:{hour_abbrev:"Std.",hours_abbrev:"Std.",hour:"Stunde",hours:"Stunden",minute:"Minute",minutes:"Minuten",minute_abbrev:"min.",minutes_abbrev:"min.",second_abbrev:"s.",seconds_abbrev:"s.",format:"d.m.Y \\u\\m H:i",date_format:"d.m.Y",time_format:"H:i",months:['Jan.','Feb.','Mär.','Apr.','Mai','Juni','Juli','Aug.','Sep.','Okt.','Nov.','Dez.']},systemmap:{labels:{panelTitle:"Strecke(n)"}},tripPlanner:{labels:{panelTitle:"Strecke berechnen",tabTitle:"Neue Strecke",inputTitle:"Strecken Details",optTitle:"Strecken Vorzug (optional)",submitMsg:"Streckenberechnung...",optionalTitle:"",date:"Datum",time:"Zeit",when:"Wann",from:"von",fromHere:"von hier",to:"nach",toHere:"nach hier",intermediate:"Zwischenstop",minimize:"Anzeigen von",maxWalkDistance:"Maximale Gehdistanz",walkSpeed:"Geh-Geschwindigkeit",maxBikeDistance:"Maximale Distanz für Fahrradnutzung ",bikeSpeed:"Fahrrad-Geschwindigkeit",arriveDepart:"Ankunft innerhalb von/Abfahrt um",mode:"Benutzen von",wheelchair:"Rollstuhlfahrer geeignet",go:"gehe nach",planTrip:"Strecken berechnen",newTrip:"Neue Strecke"},link:{text:"Link dieser Reise",trip_separator:"Diese Reise in einem anderen Streckenplaner",bike_separator:"Anderer Fahhrad-Strecken-Planer",walk_separator:"Anderer Geh-Strecken-Planer",google_transit:"Google Transit",google_bikes:"Google Bike Directions",google_walk:"Google Walking Directions",google_domain:"http://www.google.com"},geocoder:{working:"Adresse suchen ....",error:"keine Ergebnisse gefunden",msg_title:"Streckenplanung",msg_content:"Fehler vor Suche korrigieren",select_result_title:"Bitte wählen Sie eine Reiseplan",address_header:"Adresse"},error:{title:'Fehler bei der Planung Ihrer Reise',deadMsg:"Map Trip Planer reagirt nicht. Bitte, warten Sie einige Minute oder verwenden Sie die Text-Funktion (sehen Sie den Link unten).",geoFromMsg:"Wählen Sie die Abfahrt: ",geoToMsg:"Wählen Sie die Ankunft: "},msgcodes:{200:"richtige Planung",500:"Server-Fehler",400:"Strecke außerhalb der Daten-Zone",404:"keine Strecke gefunden",406:"keine Laufzeiten",408:"Anforderung abgelaufen",413:"ungültiger Parameter",440:"Geocode der Abfahrt nicht gefunden",450:"Geocode der Ankuft nicht gefunden",460:"Abfahrt und Ankunft Geocode nicht gefunden",409:"zu nahe",340:"Abfahrt Geocode mehrdeutig",350:"Ankunft Geocode mehrdeutig",360:"Abfahrt und Ankunft geocode mehrdeutig"},options:[['TRANSFERS','wenigste Umstiegshalte'],['QUICK','schnellste Strecke'],['SAFE','sicherste Strecke'],['TRIANGLE','Anpassen...']],arriveDepart:[['false','Abfahrt'],['true','Ankunft']],maxWalkDistance:[['500','500 Meter'],['1000','1 km'],['5000','5 km'],['10000','10 km'],['20000','20 km']],walkSpeed:[['0.278','1 km/h'],['0.556','2 km/h'],['0.833','3 km/h'],['1.111','4 km/h'],['1.389','5 km/h'],['1.667','6 km/h'],['1.944','7 km/h'],['2.222','8 km/h'],['2.500','9 km/h'],['2.778','10 km/h']],mode:[['TRANSIT,WALK','ÖPNV'],['BUSISH,TRAINISH,WALK','Bus und Zug'],['BUSISH,WALK','nur Bus'],['TRAINISH,WALK','nur Zug'],['WALK','nur zu Fuß'],['BICYCLE','Fahrrad'],['TRANSIT,BICYCLE','ÖPNV & Fahrrad']],wheelchair:[['false','nicht erforderlich'],['true','erforderlich']]},CLASS_NAME:"otp.locale.German"};
otp.namespace("otp.locale");otp.locale.Hebrew={config:{metricsSystem:"international",rtl:true,rightClickMsg:"יש ללחוץ על המפה במקש ימני כדי להקצות את נקודות ההתחלה והסיום של המסלול שלך.",attribution:{title:"היקף הרישיון",content:"כאן יופיע כתב הוויתור"}},contextMenu:{fromHere:"להתחיל במסלול מכאן",toHere:"לסיים את המסלול כאן",intermediateHere:"הוספת נקודת ביניים",centerHere:"מרכוז המפה לכאן",zoomInHere:"התקרבות",zoomOutHere:"התרחקות",previous:"המיקום האחרון במפה",next:"המיקום הבא במפה"},bikeTriangle:{safeName:"ידידותי לאופניים",safeSym:"א",hillName:"ישיר",hillSym:"י",timeName:"מהיר",timeSym:"מ"},service:{weekdays:"ימי השבוע",saturday:"שבת",sunday:"ראשון",schedule:"תזמון"},indicators:{ok:"אישור",date:"תאריך",loading:"בטעינה",searching:"מתבצע חיפוש...",qEmptyText:"כתובת, צומת, סימן דרך או מזהה עצירה..."},buttons:{reverse:"היפוך",reverseTip:"<b>היפוך הכיוונים</b><br/>תכנון מסלול חזרה על ידי היפוך מיקומי ההתחלה והסיום של מסלול זה והתאמה לפי פרק הזמן הבא.",reverseMiniTip:"היפוך הכיוונים",edit:"עריכה",editTip:"<b>עריכת המסלול</b><br/>חזרה לקלט תכנון המסלול הראשי עם פרטי מסלול זה.",clear:"מחיקה",clearTip:"<b>מחיקה</b><br/>מחיקת המפה וכל הכלים הפעילים.",fullScreen:"מסך מלא",fullScreenTip:"<b>מסך מלא</b><br/>הצגה -או- הסתרה של סרגלי הכלים",print:"הדפסה",printTip:"<b>הדפסה</b><br/>הדפסת גרסה ידידותית של תכנית המסלול (ללא המפה).",link:"קישור",linkTip:"<b>קישור</b><br/>הצגת כתובת הקישור עבור תכנית מסלול זאת.",feedback:"משוב",feedbackTip:"<b>משוב</b><br/>שליחת הגיגיך ואת ההתנסות שלך עם המפה",submit:"שליחה",clearButton:"מחיקה",ok:"אישור",cancel:"ביטול",yes:"כן",no:"לא",showDetails:"&darr; הצגת הפרטים &darr;",hideDetails:"&uarr; הסתרת הפרטים &uarr;"},directions:{southeast:"דרום־מזרחה",southwest:"דרום־מערבה",northeast:"צפון־מזרחה",northwest:"צפון־מערבה",north:"צפונה",west:"מערבה",south:"דרומה",east:"מזרחה",bound:"גבול",left:"שמאלה",right:"ימינה",slightly_left:"סטייה שמאלה",slightly_right:"סטייה ימינה",hard_left:"פנייה חדה שמאלה",hard_right:"פנייה חדה ימינה",'continue':"להמשיך ישר",to_continue:"להמשיך ישר על",becomes:"הופך ל",at:"ב",on:"ב",to:"אל",via:"דרך",circle_counterclockwise:"להסתובב בכיכר נגד כיוון השעון",circle_clockwise:"להסתובב בכיכר עם כיוון השעון",elevator:"לעלות במעלית לקומה"},instructions:{walk:"הליכה",walk_toward:"ללכת",walk_verb:"הליכה",bike:"אופניים",bike_toward:"לרכב",bike_verb:"רכיבה",drive:"ליסוע",drive_toward:"ליסוע",drive_verb:"נסיעה",move:"להמשיך",move_toward:"להמשיך",transfer:"העברה",transfers:"העברות",continue_as:"מתמזג לדרך",stay_aboard:"להישאר על הסיפון",depart:"יציאה",arrive:"הגעה",start_at:"התחלה ב",end_at:"סיום ב"},labels:{agency_msg:"השירות מופעל על ידי",agency_msg_tt:"פתיחת אתר הסוכנות בחלון נפרד...",about:"בערך",stop_id:"מזהה תחנה",trip_details:"פרטי המסלול",fare:"תשלום",fare_symbol:"₪",regular_fare:"",student_fare:"",senior_fare:"",travel:"מסלול",valid:"נכון ל",trip_length:"זמן",with_a_walk:"עם הליכה של",alert_for_rt:"התראה על מסלול"},modes:{WALK:"הליכה",BICYCLE:"אופניים",CAR:"רכב",TRAM:"רכבת קלה",SUBWAY:"רכבת תחתית",RAIL:"רכבת",BUS:"אוטובוס",FERRY:"מעבורת",CABLE_CAR:"רכבל",GONDOLA:"גונדולה",FUNICULAR:"פוניקולר"},ordinal_exit:{1:"ביציאה הראשונה",2:"ביציאה השנייה",3:"ביציאה השלישית",4:"ביציאה הרביעית",5:"ביציאה החמישית",6:"ביציאה השישית",7:"ביציאה השביעית",8:"ביציאה השמינית",9:"ביציאה התשיעית",10:"ביציאה העשירית"},time:{hour_abbrev:"שעה",hours_abbrev:"שעות",hour:"שעה",hours:"שעות",minute:"דקה",minutes:"דקות",minute_abbrev:"דקה",minutes_abbrev:"דקות",second_abbrev:"שנ׳",seconds_abbrev:"שנ׳",format:"ה־j בF Y @ G:i",date_format:"j/n/Y",time_format:"G:i",months:['ינו','פבר','מרץ','אפר','מאי','יונ','יול','אוג','ספט','אוק','נוב','דצמ']},systemmap:{labels:{panelTitle:"מפת המערכת"}},tripPlanner:{labels:{panelTitle:"מתכנן המסלולים",tabTitle:"תכנון מסלול",inputTitle:"פרטי המסלול",optTitle:"העדפות המסלול (רשות)",submitMsg:"המסלול שלך מתוכנן...",optionalTitle:"",date:"תאריך",time:"שעה",when:"מתי",from:"מהמיקום",fromHere:"מכאן",to:"למיקום",toHere:"לכאן",intermediate:"נקודות ביניים",minimize:"סוג המסלול",maxWalkDistance:"הליכה מרבית",maxWalk:"ללכת במהירות",maxBikeDistance:"רכיבה מרבית",maxBike:"מהירות אופניים",arriveDepart:"הגעה עד/יציאה ב",mode:"אמצעי תחבורה",wheelchair:"מסלול נגיש לכיסא גלגלים",go:"לדרך",planTrip:"תכנון המסלול שלך",newTrip:"מסלול חדש"},link:{text:"קישור למסלול זה (OTP)",trip_separator:"מסלול זה במתכנני תחבורה ציבורית שונים",bike_separator:"במתכנני מסלולי אופניים שונים",walk_separator:"במתכנני מסלולי הליכה שונים",google_transit:"תחבורה ציבורית של Google",google_bikes:"הנחיות רכיבה באופניים של Google",google_walk:"הנחיות הליכה של Google",google_domain:"http://www.google.com"},geocoder:{working:"הכתובת בחיפוש ....",error:"לא התקבלו תוצאות",msg_title:"סקירת תכנית המסלול",msg_content:"נא לתקן את השגיאות לפני תכנון המסלול שלך",select_result_title:"נא לבחור בתוצאה",address_header:"כתובת"},error:{title:'שגיאה במתכנן המסלולים',deadMsg:"תכנון המסלול במפות אינו מגיב כעת. נא להמתין מספר דקות ולנסות שוב, או לנסות את מתכנן המסלולים הטקסטואלי (קישור להלן).",geoFromMsg:"נא לבחור את מיקום ה'מוצא' של המסלול שלך: ",geoToMsg:"נא לבחור את מיקום ה'יעד' של המסלול שלך: "},msgcodes:{200:"המסלול תקין OK",500:"שגיאת שרת",400:"המסלול חורג מהגבולות",404:"הנתיב לא נמצא",406:"אין זמני תחבורה ציבורית",408:"זמן הבקשה פג",413:"פרמטר שגוי",440:"מיקום ה'מוצא' לא נמצא ... נא להזין אותו שוב.",450:"מיקום ה'יעד' לא נמצא ... נא להזין אותו מחדש.",460:"מיקומי ה'מוצא וה'יעד' לא נמצאו ... נא להזין אותם מחדש.",470:"מיקומי ה'מוצא' וה'יעד' אינם נגישים לכיסאות גלגלים",409:"קרוב מדי",340:"קוד הגאו של ה'מוצא' כללי מדי",350:"קוד הגאו של ה'יעד' כללי מדי",360:"הקודים הגאוגרפיים של ה'מוצא' וה'יעד' כלליים מדי"},options:[['TRANSFERS','מספר מזערי של העברות'],['QUICK','מסלול מהיר'],['SAFE','מסלול ידידותי לאופניים'],['TRIANGLE','מסלול בהתאמה אישית...']],arriveDepart:[['false','יציאה'],['true','הגעה']],maxWalkDistance:[['200','200 מ׳'],['500','500 מ׳'],['1000','ק״מ אחד'],['1500','1.5 ק״מ'],['5000','5 ק״מ'],['10000','10 ק״מ']],walkSpeed:[['0.278','1 ק"מ / שעה'],['0.556','2 ק"מ / שעה'],['0.833','3 ק"מ / שעה'],['1.111','4 ק"מ / שעה'],['1.389','5 ק"מ / שעה'],['1.667','6 ק"מ / שעה'],['1.944','7 ק"מ / שעה'],['2.222','8 ק"מ / שעה'],['2.500','9 ק"מ / שעה'],['2.778','10 ק"מ / שעה']],mode:[['TRANSIT,WALK','תחבורה ציבורית'],['BUSISH,WALK','אוטובוס בלבד'],['TRAINISH,WALK','רכבת בלבד'],['WALK','הליכה בלבד'],['BICYCLE','אופניים'],['TRANSIT,BICYCLE','תחבורה ציבורית ואופניים']],with_bikeshare_mode:[['TRANSIT,WALK','תחבורה ציבורית'],['BUSISH,WALK','אוטובוס בלבד'],['TRAINISH,WALK','רכבת בלבד'],['WALK','הליכה בלבד'],['BICYCLE','אופניים'],['WALK,BICYCLE','אופניים שכורים'],['TRANSIT,BICYCLE','תחבורה ציבורית ואופניים'],['TRANSIT,WALK,BICYCLE','תחבורה ציבורית ואופניים שכורים']],wheelchair:[['false','לא הכרחי'],['true','הכרחי']]},CLASS_NAME:"otp.locale.Hebrew"};
otp.namespace("otp.locale");otp.locale.Hungarian={config:{metricsSystem:"international",rightClickMsg:"A jobb gombbal kijelölheted a térképen az utazásod kezdő és végpontját.",attribution:{title:"License Attribution",content:"Disclaimer goes here"}},contextMenu:{fromHere:"Útvonal innen",toHere:"Útvonal ide",intermediateHere:"Közbenső pont hozzáadása",centerHere:"Térkép középre helyezése ide",zoomInHere:"Közelítés ide",zoomOutHere:"Távolítás innen",previous:"Legutóbbi térképpozíció",next:"Következő térképpozíció"},bikeTriangle:{safeName:"Kerékpárbarát",safeSym:"B",hillName:"Lapos",hillSym:"L",timeName:"Gyors",timeSym:"Gy"},service:{weekdays:"Hétköznap",saturday:"Szombat",sunday:"Vasárnap",schedule:"Menetrend"},indicators:{ok:"OK",date:"Dátum",loading:"Betöltés",searching:"Keresés...",qEmptyText:"Cím, útkereszteződés, jellegzetes pont vagy megállókód..."},buttons:{reverse:"Visszafele",reverseTip:"<b>Irány megfordítása</b><br/>Visszaút tervezése a kezdő- és végpont megfordításával, és az idő későbbre állításával.",reverseMiniTip:"Irány megfordítása",edit:"Modosítás",editTip:"<b>Útvonal modosítása</b><br/>Vissza a fő útvonaltervező beviteli űrlaphoz ennek az útvonalnak a részleteivel.",clear:"Törlés",clearTip:"<b>Törlés</b><br/>A térkép és az összes aktív eszköz törlése.",fullScreen:"Teljes képernyő",fullScreenTip:"<b>Teljes képernyő</b><br/>Eszközpanel megjelenítése -vagy- elrejtése",print:"Nyomtatás",printTip:"<b>Nyomtatás</b><br/>Az útvonalterv nyomtatóbarát változata (térkép nélkül).",link:"Hivatkozás",linkTip:"<b>Hivatkozás</b><br/>Hivatkozó URL megjelenítése az útvonaltervhez.",feedback:"Visszajelzés",feedbackTip:"<b>Visszajelzés</b><br/>Küldje el gondolatait vagy tapasztalatait a térképpel kapcsolatban",submit:"Küldés",clearButton:"Törlés",ok:"OK",cancel:"Mégse",yes:"Igen",no:"Nem",showDetails:"&darr; Részletek... &darr;",hideDetails:"&uarr; Elrejtés... &uarr;"},directions:{southeast:"délkelet",southwest:"délnyugat",northeast:"északkelet",northwest:"északnyugat",north:"észak",west:"nyugat",south:"dél",east:"kelet",bound:"határ",left:"balra",right:"jobbra",slightly_left:"enyhén balra",slightly_right:"enyhén jobbra",hard_left:"élesen balra",hard_right:"élesen jobbra",'continue':"haladjon ezen:",to_continue:"haladjon ezen:",becomes:"evvé válik:",at:"ide:",on:"on",to:"to",via:"via",circle_counterclockwise:"a körforgalomban balra",circle_clockwise:"a körforgalomban jobbra",elevator:"take elevator to"},instructions:{walk:"Séta",walk_toward:"Walk",walk_verb:"Walk",bike:"Bike",bike_toward:"Bike",bike_verb:"Bike",drive:"Drive",drive_toward:"Drive",drive_verb:"Drive",move:"Proceed",move_toward:"Proceed",transfer:"átszállás",transfers:"átszállás",continue_as:"Folytatodik mint:",stay_aboard:"Maradjon a fedélzeten",depart:"Indul",arrive:"Érkezik",start_at:"Kezdés",end_at:"Érkezés"},labels:{agency_msg:"Üzemeltető: ",agency_msg_tt:"Honlap megnyítása uj ablakban...",about:"Körülbelül",stop_id:"Megállókód: ",trip_details:"Útvonal részletek",travel:"Utazás",valid:"Érvényes",trip_length:"Hossz",with_a_walk:"Séta",alert_for_rt:"Alert for route",fare:"Ár",regular_fare:"Normál",student_fare:"Diák",senior_fare:"Nyugdíjas",fare_symbol:"HUF"},modes:{WALK:"SÉTA",BICYCLE:"KERÉKPÁR",CAR:"AUTÓ",TRAM:"VILLAMOS",SUBWAY:"METRÓ",RAIL:"VASÚT",BUS:"BUSZ",FERRY:"KOMP",CABLE_CAR:"LIBEGŐ",GONDOLA:"GONDOLA",FUNICULAR:"SIKLÓ"},ordinal_exit:{1:"az első kijáratig",2:"a második kijáratig",3:"a harmadik kijáratig",4:"a negyedik kijáratig",5:"az ötödik kijáratig",6:"a hatodik kijáratig",7:"a hetedik kijáratig",8:"a nyolcadik kijáratig",9:"a kilencedik kijáratig",10:"a tízedik kijáratig"},time:{hour_abbrev:"óra",hours_abbrev:"óra",hour:"óra",hours:"óra",minute:"perc",minutes:"perc",minute_abbrev:"perc",minutes_abbrev:"perc",second_abbrev:"mp",seconds_abbrev:"mp",format:"D, j M H:i",date_format:"Y-m-d",time_format:"H:i",months:['jan','feb','már','ápr','máj','jún','júl','aug','szep','okt','nov','dec']},systemmap:{labels:{panelTitle:"Vonalhálozat"}},tripPlanner:{labels:{panelTitle:"Útazástervező",tabTitle:"Útazástervező",inputTitle:"Útvonal részletek",optTitle:"Útvonal beállításai (opcionális)",submitMsg:"Útvonal tervezése...",optionalTitle:"",date:"Dátum",time:"Idő",when:"Mikor",from:"Honnan",fromHere:"Innen",to:"Hová",toHere:"Ide",intermediate:"Közbenső pont",minimize:"A következő megjelenítése",maxWalkDistance:"Maximális gyaloglás",walkSpeed:"Séta sebessége",maxBikeDistance:"Maximális kerékpározás",bikeDistance:"Lerékpáros sebesség",arriveDepart:"Érkezés/indulás",mode:"Közlekedés",wheelchair:"Kerekesszékkel megtehető útvonal",go:"Menj",planTrip:"Útvonal tervezése",newTrip:"Új útvonal"},link:{text:"Link to this trip (OTP)",trip_separator:"This trip on other transit planners",bike_separator:"On other bike trip planners",walk_separator:"On other walking direction planners",google_transit:"Google Transit",google_bikes:"Google Bike Directions",google_walk:"Google Walking Directions",google_domain:"http://www.google.hu"},geocoder:{working:"Cím keresése ....",error:"Did not receive any results",msg_title:"Kérem review trip plan",msg_content:"Kérem correct errors before planning your trip",select_result_title:"Please select a result",address_header:"Address"},error:{title:'Útvonaltervezési hiba',deadMsg:"A térképes útvonaltervező jelenleg nem válaszol. Kérem, várjon néhány percet, és próbálja újra.",geoFromMsg:"Kérem, válasszon kezdőpontot az útvonalhoz: ",geoToMsg:"Kérem, válasszon végpontot az útvonalhoz: "},msgcodes:{200:"Tervezés OK",500:"Szerverhiba",400:"Az útvonal határon kívül",404:"Nem található útvonal",406:"Nincs közlekedési idő",408:"A kérés túllépte az időt",413:"Érvénytelen paraméter",440:"A kezdőpont geokódja nem található",450:"A végpont geokódja nem található",460:"A kezdő- és végpont geokódja nem található",409:"Túl közel",340:"A kezdőpont geokódja nem egyértelmű",350:"A végpont geokódja nem egyértelmű",360:"A kezdő- és végpont geokódja nem egyértelmű"},options:[['TRANSFERS','Kevés átszállással'],['QUICK','Gyors útvonallal'],['SAFE','Biztonságos útvonallal'],['TRIANGLE','Egyedi...']],arriveDepart:[['false','Indulás'],['true','Érkezés']],maxWalkDistance:[['100','100 m'],['500','500 m'],['1000','1 km'],['5000','5 km'],['10000','10 km'],['50000','50 km'],['100000','100 km']],walkSpeed:[['0.556','2 km/h'],['1.111','4 km/h'],['1.667','6 km/h'],['2.222','8 km/h'],['2.778','10 km/h']],mode:[['TRANSIT,WALK','közösségi közlekedéssel'],['BUSISH,WALK','busszal'],['TRAINISH,WALK','vonattal'],['WALK','gyalog'],['BICYCLE','kerékpárral'],['TRANSIT,BICYCLE','közösségi közlekedéssel és kerékpárral']],with_bikeshare_mode:[['TRANSIT,WALK','közösségi közlekedéssel'],['BUSISH,WALK','busszal'],['TRAINISH,WALK','vonattal'],['WALK','gyalog'],['BICYCLE','kerékpárral'],['WALK,BICYCLE','közbringával (Bubi)'],['TRANSIT,BICYCLE','közösségi közlekedéssel és kerékpárral'],['TRANSIT,WALK,BICYCLE','közösségi közlekedéssel és közbringával']],wheelchair:[['false','Nem szükséges'],['true','Szükséges']]},CLASS_NAME:"otp.locale.Hungarian"};
otp.namespace("otp.locale");otp.locale.Italian={config:{metricsSystem:"international",rightClickMsg:"Utilizza il tasto destro sulla mappa per selezionare la partenza e l'arrivo del tuo viaggio",attribution:{title:"Licenza d'uso",content:"Termini e Condizioni"}},contextMenu:{fromHere:"Punto di partenza",toHere:"Punto di arrivo",intermediateHere:"Aggiungi destinazione",centerHere:"Centra la mappa",zoomInHere:"Zoom",zoomOutHere:"Zoom out",previous:"Posizione precedente sulla mappa",next:"Posizione successiva sulla mappa"},bikeTriangle:{safeName:"Piu\' sicuro",safeSym:"S",hillName:"Pianeggiante",hillSym:"F",timeName:"Piu\' veloce",timeSym:"Q"},service:{weekdays:"Feriali",saturday:"Sabato",sunday:"Domenica",schedule:"Schedule"},indicators:{ok:"OK",date:"Data",loading:"In caricamento",searching:"Ricerca in corso...",qEmptyText:"Indirizzo, incrocio, punto di riferimento o ID della fermata..."},buttons:{reverse:"Inverti",reverseTip:"<b>Direzione inversa</b><br/>Pianifica un viaggio di ritorno invertendo i punti di partenza e arrivo, correggendo i tempi",reverseMiniTip:"Direzione inversa",edit:"Edita",editTip:"<b>Edit trip</b><br/>Ritorna alla form principale di trip planner con i dettagli del viaggio pianificato.",clear:"Svuota",clearTip:"<b>Svuota</b><br/>Svuota la mappa e tutti gli strumenti attivi.",fullScreen:"Schermo intero",fullScreenTip:"<b>Schermo intero</b><br/>Mostra o nascondi il pannello degli strumenti",print:"Stampa",printTip:"<b>Stampa</b><br/>Stampa una versione semplificata del percorso (senza mappa).",link:"Link",linkTip:"<b>Link</b><br/>Mostra il link per il percorso scelto.",feedback:"Feedback",feedbackTip:"<b>Feedback</b><br/>Manda i tuoi commenti sulle mappe",submit:"Conferma",clearButton:"Svuota",ok:"OK",cancel:"Annulla",yes:"Si",no:"No",showDetails:"Mostra dettagli...",hideDetails:"Nascondi dettagli..."},directions:{southeast:"sud est",southwest:"sud ovest",northeast:"nord est",northwest:"nord ovest",north:"nord",west:"ovest",south:"sud",east:"est",bound:"limiti",left:"sinistra",right:"destra",slightly_left:"tenere la sinistra",slightly_right:"tenere la destra",hard_left:"girare a sinistra",hard_right:"girare a destra",'continue':"prosegui su",to_continue:"continuare per",becomes:"diventa",at:"a",on:"su",to:"a",via:"via",circle_counterclockwise:"prendere la rotatoria in senso anti-orario",circle_clockwise:"prendere la rotatoria in senso orario",elevator:"prendi l\'ascensore per"},instructions:{walk:"a piedi",walk_toward:"a piedi",walk_verb:"a piedi",bike:"Bicicletta",bike_toward:"Bicicletta",bike_verb:"Bicicletta",drive:"Guida",drive_toward:"Guida",drive_verb:"Guida",move:"Procedi",move_toward:"Procedi",transfer:"Cambio",transfers:"Cambi",continue_as:"Avanza verso",stay_aboard:"Resta a bordo",depart:"Partenza",arrive:"Arrivo",start_at:"Inizio",end_at:"Fine"},labels:{agency_msg:"Servizio offerto da",agency_msg_tt:"Apri il sito dell'azienda in una nuova finestra...",about:"Informazioni",stop_id:"ID Fermata",trip_details:"Dettagli viaggio",fare:"Tariffa",fare_symbol:"\u20ac",regular_fare:"",student_fare:"",senior_fare:"",travel:"Viaggio",valid:"Valido",trip_length:"Tempo",with_a_walk:"A piedi",alert_for_rt:"Attenzione al percorso"},modes:{WALK:"A PIEDI",BICYCLE:"BICICLETTA",CAR:"AUTO",TRAM:"TRAM",SUBWAY:"METROPOLITANA",RAIL:"FERROVIA",BUS:"BUS",FERRY:"TRAGHETO",CABLE_CAR:"FUNIVIA",GONDOLA:"GONDOLA",FUNICULAR:"FUNICOLARE"},ordinal_exit:{1:"prima uscita",2:"seconda uscita",3:"terza uscita",4:"quarta uscita",5:"quinta uscita",6:"sesta uscita",7:"settima uscita",8:"ottava uscita",9:"nona uscita",10:"decima uscita"},time:{hour_abbrev:"hour",hours_abbrev:"hours",hour:"hour",hours:"hours",minute:"minuto",minutes:"minuti",minute_abbrev:"min",minutes_abbrev:"min",second_abbrev:"sec",seconds_abbrev:"sec",format:"D, j M H:i",date_format:"d-m-Y",time_format:"H:i",months:['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Aug','Set','Ott','Nov','Dic']},systemmap:{labels:{panelTitle:"Mappa di sistema"}},tripPlanner:{labels:{panelTitle:"Pianificazione del percorso",tabTitle:"Nuovo percorso",inputTitle:"Dettagli del percorso",optTitle:"Preferenze per il percorso (opzionale)",submitMsg:"Percorso in elaborazione...",optionalTitle:"",date:"Data",time:"Orario",when:"Quando",from:"Da",fromHere:"Da qui",to:"A",toHere:"A qui",intermediate:"Punto intermedio",minimize:"Mostrami",maxWalkDistance:"Massimo cammino a piedi",walkSpeed:"velocità a piedi",maxBikeDistance:"Massimo distanza in bici",bikeSpeed:"velocità in bici",arriveDepart:"Arriva entro/Parti a",mode:"Passa per",wheelchair:"Percorso accessibile ai portatori di sedia a rotelle",go:"Vai",planTrip:"Pianifica il tuo percorso",newTrip:"Nuovo percorso"},link:{text:"Link a questo percorso",trip_separator:"Link ad un altro sistema",bike_separator:"Link ad un altro sistema basato su bici",walk_separator:"Link ad un altro sistema a piedi",google_transit:"Google Transit",google_bikes:"Google Bike Directions",google_walk:"Google Walking Directions",google_domain:"http://www.google.com"},geocoder:{working:"Cerca indirizzo ....",error:"Nessun risultato trovato",msg_title:"Pianificazione del viaggio",msg_content:"Correggere gli errori prima di avviare la ricerca",select_result_title:"Seleziona un risultato",address_header:"Indirizzo"},error:{title:'Errore Pianificazione Viaggio',deadMsg:"Map Trip Planner non sta rispondendo. preghiamo di attendere qualche minuto e riprovare, oppure provare la funzionalit� testuale (vedi link sottostante).",geoFromMsg:"Selezionare la partenza: ",geoToMsg:"Selezionare l'arrivo: "},msgcodes:{200:"Pianificazione corretta",500:"Server error",400:"Percorso fuori dall'area servita",404:"Percorso non trovato",406:"No transit times",408:"Richiesta scaduta",413:"Parametri non validi",440:"Geocode di partenza non trovato",450:"Geocode di arrivo non trovato",460:"Geocode di partenza e arrivo non trovati",409:"Troppo vicino",340:"Geocode di partenza ambiguo",350:"Geocode di arrivo ambiguo",360:"Geocode di partenza e di arrivo ambigui"},options:[['TRANSFERS','Minori cambi di mezzo'],['QUICK','Percorso piu\' veloce'],['SAFE','Percorso piu\' sicuro'],['TRIANGLE','Personalizzato...']],arriveDepart:[['false','Partenza'],['true','Arrivo']],maxWalkDistance:[['500','500 m'],['1000','1 km'],['5000','5 km'],['10000','10 km'],['20000','20 km']],walkSpeed:[['0.278','1 km/h'],['0.556','2 km/h'],['0.833','3 km/h'],['1.111','4 km/h'],['1.389','5 km/h'],['1.667','6 km/h'],['1.944','7 km/h'],['2.222','8 km/h'],['2.500','9 km/h'],['2.778','10 km/h']],mode:[['TRANSIT,WALK','Passaggio a piedi'],['BUSISH,TRAINISH,WALK','Bus & Treni'],['BUSISH,WALK','Solo Bus'],['TRAINISH,WALK','Solo treni'],['WALK','Solo a piedi'],['BICYCLE','Bici'],['TRANSIT,BICYCLE','Passaggio & Bici']],wheelchair:[['false','Non richiesto'],['true','Richiesto']]},CLASS_NAME:"otp.locale.Italian"};
otp.namespace("otp.locale");otp.locale.Marathi={config:{metricsSystem:"international",rightClickMsg:"प्रवास कुठून कुठपर्यंत करायचा आहे ते स्थान निवडण्याकरिता नकाशावर राईट क्लिक करा.",attribution:{title:"License Attribution",content:"Disclaimer goes here"}},contextMenu:{fromHere:"कुठे बस पकडणार?",toHere:"कुठे ऊतरणार?",intermediateHere:"Add intermediate point",centerHere:"नकाशा बघण्यासाठी",zoomInHere:"जुम इन करण्यासाठी(चित्र मोठे करण्यासाठी)",zoomOutHere:"जुम आउट करण्यासाठी(चित्र लहान करण्यासाठी)",previous:"आधी या ठिकाणी होतात",next:"नंतरची जागा"},bikeTriangle:{safeName:"Bike friendly",safeSym:"S",hillName:"Flat",hillSym:"F",timeName:"Quick",timeSym:"Q"},service:{weekdays:"आठवड्याचे वार",saturday:"शनिवार ",sunday:"रविवार",schedule:"वेळापत्रक"},indicators:{ok:"ओ.के.",date:"दिनांक",loading:"माहिती येत आहे",searching:"शोधत आहे...",qEmptyText:"पत्ता,जवळची खूण,बस थांबा..."},buttons:{reverse:"Reverse",reverseTip:"<b>Reverse directions</b><br/>Plan a return trip by reversing this trip's start and end points, and adjusting the time forward.",reverseMiniTip:"Reverse directions",edit:"Edit",editTip:"<b>Edit trip</b><br/>Return to the main trip planner input form with the details of this trip.",clear:"Clear",clearTip:"<b>Clear</b><br/>Clear the map and all active tools.",fullScreen:"Full Screen",fullScreenTip:"<b>Full Screen</b><br/>Show -or- hide tool panels",print:"Print",printTip:"<b>Print</b><br/>Print friendly version of the trip plan (without map).",link:"Link",linkTip:"<b>Link</b><br/>Show link url for this trip plan.",feedback:"Feedback",feedbackTip:"<b>Feedback</b><br/>Send your thoughts or experiences with the map",submit:"Submit",clearButton:"Clear",ok:"OK",cancel:"Cancel",yes:"Yes",no:"No",showDetails:"Show details...",hideDetails:"Hide details..."},directions:{southeast:"आग्न्येय",southwest:"नैऋत्य",northeast:"ईशान्य",northwest:"वायव्य",north:"उत्तर",west:"पश्चिम",south:"दक्षिण",east:"पूर्व",bound:"वाकडा",left:"डावीकडे",right:"उजवीकडे",slightly_left:"थोड डावीकडे ",slightly_right:"थोड उजवीकडे",hard_left:"अगदी डावीकडे ",hard_right:"अगदी उजवीकडे",'continue':"चालू ठेवा",to_continue:"चालू ठेवा",becomes:"becomes",at:"at",on:"on",to:"to",via:"via",circle_counterclockwise:"take roundabout counterclockwise",circle_clockwise:"take roundabout clockwise"},instructions:{walk:"Walk",walk_toward:"Walk",walk_verb:"Walk",bike:"Bike",bike_toward:"Bike",bike_verb:"Bike",drive:"Drive",drive_toward:"Drive",drive_verb:"Drive",move:"Proceed",move_toward:"Proceed",transfer:"transfer",transfers:"transfers",continue_as:"Continues as",stay_aboard:"stay on board",depart:"Depart",arrive:"Arrive",start_at:"Start at",end_at:"End at"},labels:{agency_msg:"Service run by",agency_msg_tt:"Open agency website in separate window...",about:"About",stop_id:"Stop ID",trip_details:"Le Trip Details",fare:"Fare",fare_symbol:"रुपया ",regular_fare:"",student_fare:"",senior_fare:"",travel:"Travel",valid:"Valid",trip_length:"Time",with_a_walk:"with a walk of",alert_for_rt:"Alert for route"},modes:{WALK:"WALK",BICYCLE:"BICYCLE",CAR:"CAR",TRAM:"TRAM",SUBWAY:"SUBWAY",RAIL:"RAIL",BUS:"BUS",FERRY:"FERRY",CABLE_CAR:"CABLE CAR",GONDOLA:"GONDOLA",FUNICULAR:"FUNICULAR"},ordinal_exit:{1:"to first exit",2:"to second exit",3:"to third exit",4:"to fourth exit",5:"to fifth exit",6:"to sixth exit",7:"to seventh exit",8:"to eighth exit",9:"to ninth exit",10:"to tenth exit"},time:{hour_abbrev:"hour",hours_abbrev:"hours",hour:"hour",hours:"hours",format:"D, j M H:i",date_format:"d-m-Y",time_format:"H:i",minute:"मिनिट",minutes:"मिनिटस",minute_abbrev:"मिनिट",minutes_abbrev:"मिनिटस",second_abbrev:"सेकंद",seconds_abbrev:"सेकंदस",months:['जानेवारी','फेब्रुवारी','मार्च','एप्रिल','मे','जून','जुलै','ऑगस्ट','सप्टेंबर','ऑक्टोबर','नोव्हेंबर','डिसेंबर']},systemmap:{labels:{panelTitle:"System Map"}},tripPlanner:{labels:{panelTitle:"ट्रीप प्लॅनर",tabTitle:"ट्रीप प्लॅन करा ",inputTitle:"ट्रीपची माहिती ",optTitle:"ट्रीप क्रमाने (पर्यायी)",submitMsg:"तुमची ट्रीप नियोजित करीत आहे...",optionalTitle:"",date:"दिनांक",time:"वेळ",when:"कधी?",from:"कुठून?",fromHere:"या इथून",to:"कुठ पर्यंत ",toHere:"या इथपर्यंत ",intermediate:"Intermediate Place",minimize:"दाखवा",maxWalkDistance:"पायी चालण्याचे अंतर ",maxBikeDistance:"पायी चालण्याचे  bike",arriveDepart:"पोहोचण्याचे ठिकाण/निघा",mode:"या मार्गाने जाऊ शकता",wheelchair:"व्हील चेअरचा वापर करता येईल अशी ट्रीप",go:"निघा",planTrip:"तुमचा मार्ग शोधा",newTrip:"नवी ट्रीप"},link:{text:"Link to this trip (OTP)",trip_separator:"This trip on other transit planners",bike_separator:"On other bike trip planners",walk_separator:"On other walking direction planners",google_transit:"Google Transit",google_bikes:"Google Bike Directions",google_walk:"Google Walking Directions",google_domain:"http://www.google.co.in"},geocoder:{working:"Looking up address ....",error:"Did not receive any results",msg_title:"नवी ट्रीप review trip plan",msg_content:"नवी ट्रीप correct errors before planning your trip",select_result_title:"Please select a result",address_header:"Address"},error:{title:'ट्रीप प्लॅनर मध्ये काही गडबड आहे',deadMsg:"ट्रीप प्लॅनर सध्या प्रतिसाद देत नाही,पुन्हा प्रयत्न करण्यासाठी कृपया वाट पहा किंवा दुसरी ट्रीप प्लान करा (खाली दिलेली लिंक पहा)",geoFromMsg:"कृपया तुमच्या ट्रीप करता कुठून जायचे ते ठिकाण निवडा:",geoToMsg:"कृपया जेथे जायचे ते ठिकाण निवडा: "},msgcodes:{200:"प्लॅन ओ.के.",500:"सर्व्हर एरर आहे",400:"ट्रीप कमाल मर्यादे बाहेर",404:"मार्ग सापडत नाही",406:"जायच्या/यायच्या वेळा दिलेल्या नाहीत",408:"क्षमस्व,तुमची वेळ संपली आहे",413:"अपुरी माहिती",440:"जिथून निघायचे त्याचा जीओकोड मिळत नाही ",450:"जिथे जायचे त्याचा जीओकोड मिळत नाही",460:"कुठून कुठे जायचे त्याचा जीओकोड मिळत नाही",409:"खूप जवळचा मार्ग",340:"कुठून जायचे त्याचा जीओकोड सुस्पष्ट नाही",350:"कुठे जायचे त्याचा जीओकोड सुस्पष्ट नाही",360:"कुठून कुठे जायचे त्याचा जीओकोड सुस्पष्ट नाही"},options:[['TRANSFERS','कमीत कमी बस बदलुन'],['QUICK','कमी वेळेत'],['SAFE','सुरक्षित मार्ग'],['TRIANGLE','Custom trip...']],arriveDepart:[['false','प्रस्थान'],['true','आगमन']],maxWalkDistance:[['160','1/10 मैल'],['420','1/4 मैल'],['840','1/2 मैल'],['1260','3/4 मैल'],['1600','1 मैल'],['3200','2 मैल'],['4800','3 मैल'],['6400','4 मैल'],['7600','5 मैल'],['15200','10 मैल'],['22800','15 मैल'],['30400','20 मैल'],['45600','30 मैल'],['60800','40 मैल'],['76000','50 मैल'],],walkSpeed:[['0.278','1 km/h'],['0.556','2 km/h'],['0.833','3 km/h'],['1.111','4 km/h'],['1.389','5 km/h'],['1.667','6 km/h'],['1.944','7 km/h'],['2.222','8 km/h'],['2.500','9 km/h'],['2.778','10 km/h']],mode:[['TRANSIT,WALK','बस आणि पायी'],['BUSISH,WALK','फक्त बस'],['WALK','फक्त पायी']],wheelchair:[['false','गरज नाही'],['true','गरज आहे']]},CLASS_NAME:"otp.locale.Marathi"};
otp.namespace("otp.locale");otp.locale.Polish={config:{metricsSystem:"international",rightClickMsg:"Kliknij prawym przyciskiem myszy i wybierz początke i koniec podróży.",attribution:{title:"License Attribution",content:"Disclaimer goes here"}},contextMenu:{fromHere:"Rozpocznij podróż tutaj",toHere:"Zakończ podróż tutaj",intermediateHere:"Dodaj punkt pośredni",centerHere:"Centruj mapę tutaj",zoomInHere:"Przybliż tutaj",zoomOutHere:"Oddal stąd",previous:"Poprzednia pozycja na mapie",next:"Następna pozycja na mapie"},bikeTriangle:{safeName:"Najbezpieczniejsza",safeSym:"S",hillName:"Najbardziej płaska",hillSym:"F",timeName:"Najszybsza",timeSym:"Q"},service:{weekdays:"Dni robocze",saturday:"Sobota",sunday:"Niedziela",schedule:"Rozkład"},indicators:{ok:"OK",date:"Data",loading:"Ładowanie",searching:"Szukanie...",qEmptyText:"Adres, skrzyżowanie, obiekt lub ID przystanku..."},buttons:{reverse:"Odwróć",reverseTip:"<b>Odwróć kierunki</b><br/>Zaplanuj podróż powrotną poprzez zamianę miejscami punktu startowego i końcowego podróży i przeskok czasu do przodu.",reverseMiniTip:"Odwróć kierunki",edit:"Edytuj",editTip:"<b>Edytuj podróż</b><br/>Powróć do planowania podróży z detalami tej podróży.",clear:"Wyczyść",clearTip:"<b>Wyczyść</b><br/>Wyczyść mapę i wszystkie aktywne narzędzia.",fullScreen:"Pełen ekran",fullScreenTip:"<b>Pełen ekran</b><br/>Pokaż lub ukryj panele narzędzi",print:"Drukuj",printTip:"<b>Drukuj</b><br/>Wydrukuj plan podróży (bez mapy).",link:"Link",linkTip:"<b>Link</b><br/>Pokaż link do tego planu podróży.",feedback:"Opinie",feedbackTip:"<b>Opinie</b><br/>Wyślij swoje uwagi i doświadczenia z narzędzia",submit:"Wyślij",clearButton:"Wyczyść",ok:"OK",cancel:"Anuluj",yes:"Tak",no:"Nie",showDetails:"Show details...",hideDetails:"Hide details..."},directions:{southeast:"południowy wschód",southwest:"południowy zachód",northeast:"północny wschód",northwest:"północny zachód",north:"północ",west:"zachód",south:"południe",east:"wschód",bound:"w kierunku",left:"lewo",right:"prawo",slightly_left:"lekko w lewo",slightly_right:"lekko w prawo",hard_left:"mocno w lewo",hard_right:"mocno w prawo",'continue':"kontynuuj",to_continue:"kontynuować",becomes:"zmienia się w",at:"o",on:"na",to:"do",via:"przez",circle_counterclockwise:"okrąż rondo przeciwnie do kierunku wskazówek zegara",circle_clockwise:"okrąż rondo zgodnie ze wskazówkami zegara"},instructions:{walk:"Idź",walk_toward:"Idż",walk_verb:"Idź",bike:"Jedź",bike_toward:"Jedź",bike_verb:"Jedź",drive:"Jedź",drive_toward:"Jedź",drive_verb:"Jedź",move:"Podążaj",move_toward:"Podążaj",transfer:"przesiadka",transfers:"przesiadek",continue_as:"Kontynuuje jako",stay_aboard:"pozostań w pojeździe",depart:"Odjeżdza",arrive:"Przyjeżdza",start_at:"Rozpocznij",end_at:"Skończ"},labels:{agency_msg:"Linia obsługiwana przez",agency_msg_tt:"Otwórz stronę przewoźnika w nowym oknie...",about:"Informacje",stop_id:"ID Przystanku",trip_details:"Szczegóły trasy",fare:"Opłata",fare_symbol:"zł",regular_fare:"",student_fare:"",senior_fare:"",travel:"Początek podróży",valid:"Ważny",trip_length:"Czasowy",with_a_walk:"wraz z dojściem",alert_for_rt:"Wiadomość dla linii"},modes:{WALK:"WALK",BICYCLE:"BICYCLE",CAR:"CAR",TRAM:"TRAM",SUBWAY:"SUBWAY",RAIL:"RAIL",BUS:"BUS",FERRY:"FERRY",CABLE_CAR:"CABLE CAR",GONDOLA:"GONDOLA",FUNICULAR:"FUNICULAR"},ordinal_exit:{1:"do pierwszego wyjśćia",2:"do drugiego wyjśćia",3:"do trzeciego wyjśćia",4:"do czwartego wyjśćia",5:"do piątego wyjśćia",6:"do szóstego wyjśćia",7:"do siódmego wyjśćia",8:"do ósmego wyjśćia",9:"do dziewiątego wyjśćia",10:"do dziesiątego wyjśćia"},time:{hour_abbrev:"hour",hours_abbrev:"hours",hour:"hour",hours:"hours",format:"D, j M H:i",date_format:"d-m-Y",time_format:"H:i",minute:"minuta",minutes:"minut",minute_abbrev:"min",minutes_abbrev:"minut",second_abbrev:"sek",seconds_abbrev:"sekund",months:['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz','Paz','Lis','Gru']},systemmap:{labels:{panelTitle:"Mapa systemowa"}},tripPlanner:{labels:{panelTitle:"Planer podróży",tabTitle:"Zaplanuj podróż",inputTitle:"Szczegóły podróży",optTitle:"Preferencje podróży (opcjonalne)",submitMsg:"Planuje Twoją podróż...",optionalTitle:"",date:"Data",time:"Godzina",when:"Kiedy",from:"Z",fromHere:"Skąd",to:"Do",toHere:"Dokąd",intermediate:"Intermediate Place",minimize:"Pokaż",maxWalkDistance:"Maksymalny spacer",walkSpeed:"chodzić prędkość",maxBikeDistance:"Maksymalny rower",bikeSpeed:"prędkość rower",arriveDepart:"Dojazd/odjazd o",mode:"Podróżuj",wheelchair:"Podróż dostępna dla niepełnosprawnych",go:"Idź",planTrip:"Planuj swoją podróż",newTrip:"Nowa podróż"},link:{text:"Link do tej podróży (OTP)",trip_separator:"This trip on other transit planners",bike_separator:"On other bike trip planners",walk_separator:"On other walking direction planners",google_transit:"Google Transit",google_bikes:"Google Bike Directions",google_walk:"Google Walking Directions",google_domain:"http://www.google.pl"},geocoder:{working:"Poszukuje adresu ....",error:"Brak pasujących wyników",msg_title:"Czy chciałbyś ocenić zaproponowana podróż",msg_content:"Les correct errors before planning your trip",select_result_title:"Wybierz adres",address_header:"Adres"},error:{title:'Bład planera podróży',deadMsg:"Planer podróży nie odpowiada. Odczekaj kilka minut i spróbuj ponownie, lub spróbuj wersji tekstowej planera (zobacz link poniżej).",geoFromMsg:"Wybierz lokalizację 'Z' dla Twojej podróży: ",geoToMsg:"Wybierz lokalizację 'Do' dla Twojej podróży: "},msgcodes:{200:"Plan OK",500:"Błąd serwera",400:"Podróż poza obsługiwanym obszarem",404:"Trasa nieodnaleziona",406:"Brak czasów w rozkładzie",408:"Limit czasu osiągnięty",413:"Niewłaściwy parametr",440:"Geokod Z nieodnaleziony",450:"Geokod Do nieodnaleziony",460:"Geokody Z i Do nieodnalezione",409:"Zbyt blisko",340:"Geokod Z niejednoznaczny",350:"Geokod Do niejednoznaczny",360:"Geokody Z i Do niejednoznaczne"},options:[['TRANSFERS','Mało przesiadek'],['QUICK','Najszybsza podróż'],['SAFE','Najbezpieczniejsza podróż'],['TRIANGLE','Mieszane preferencje...']],arriveDepart:[['false','Odjazd'],['true','Przyjazd']],maxWalkDistance:[['200','200 m'],['500','500 m'],['1000','1 km'],['1500','1,5 km'],['5000','5 km'],['10000','10 km']],walkSpeed:[['0.278','1 km/h'],['0.556','2 km/h'],['0.833','3 km/h'],['1.111','4 km/h'],['1.389','5 km/h'],['1.667','6 km/h'],['1.944','7 km/h'],['2.222','8 km/h'],['2.500','9 km/h'],['2.778','10 km/h']],mode:[['TRANSIT,WALK','Transport publiczny'],['BUSISH,TRAINISH,WALK','Autobus i tramwaj'],['BUSISH,WALK','Tylko autobus'],['TRAINISH,WALK','Tylko tramwaj'],['WALK','Tylko spacer'],['BICYCLE','Rower'],['TRANSIT,BICYCLE','Transport publiczny i rower']],wheelchair:[['false','Niewymagane'],['true','Wymagane']]},CLASS_NAME:"otp.locale.Polish"};
otp.namespace("otp.locale");otp.locale.Portuguese={config:{metricsSystem:"international",rightClickMsg:"Clique com o botão direito em cima do mapa para escolher os pontos de origem e destino.",attribution:{title:"License Attribution",content:"Disclaimer goes here"}},contextMenu:{fromHere:"Começar uma viagem daqui",toHere:"Acabar uma viagem aqui",intermediateHere:"Adicionar um ponto intermediário",centerHere:"Centralizar o mapa aqui",zoomInHere:"Mais zoom",zoomOutHere:"Menos zoom",previous:"Última posição do mapa",next:"Próxima posição do mapa"},bikeTriangle:{safeName:"Seguro para bicicletas",safeSym:"S",hillName:"Sem Morros",hillSym:"M",timeName:"Rápido",timeSym:"R"},service:{weekdays:"Dias de semana",saturday:"Sábado",sunday:"Domingo",schedule:"Horário"},indicators:{ok:"OK",date:"Data",loading:"Carregando",searching:"Buscando...",qEmptyText:"Endereço, cruzamento, ponto de referência ou ID de Parada..."},buttons:{reverse:"Inverter",reverseTip:"<b>Inverter direções</b><br/>Planejar uma viagem de volta invertendo a origem e o destino desse plano e ajustando o tempo pra frente.",reverseMiniTip:"Direções inversas",edit:"Editar",editTip:"<b>Editar viagem</b><br/>Volta ao original forma de planeajamento com os detalhes dessa viagem.",clear:"Limpar mapa",clearTip:"<b>Limpar mapa</b><br/>Limpar o mapa e todas as ferramentas ativas.",fullScreen:"Tela Cheia",fullScreenTip:"<b>Tela Cheia</b><br/>Mostra -ou- oculta os paneis de ferramentas",print:"Imprimir",printTip:"<b>Imprimir</b><br/>Versão de impressão do plano de viagem (sem mapa).",link:"Link",linkTip:"<b>Link</b><br/>Mostra o endereço url para este plano de viagem",feedback:"Feedback",feedbackTip:"<b>Feedback</b><br/>Mande suas experiências ou problemas com o mapa",submit:"Submeter",clearButton:"Limpar",ok:"OK",cancel:"Cancelar",yes:"Sim",no:"Não",showDetails:"Mostrar detalhes...",hideDetails:"Ocultar detalhes..."},directions:{southeast:"sudeste",southwest:"sudoeste",northeast:"nordeste",northwest:"noroeste",north:"norte",west:"oeste",south:"sul",east:"este",bound:"pelo",left:"esquerda",right:"direito",slightly_left:"curva suave à esquerda",slightly_right:"curva suave à direita",hard_left:"curva acentuada à esquerda",hard_right:"curva acentuada à direita",'continue':"continue",to_continue:"continuar",becomes:"torna-se",at:"a(o)",on:"no(a)",to:"à",via:"pelo(a)",circle_counterclockwise:"entre na rotatória em sentido anti-horário",circle_clockwise:"entre na rotatória em sentido horário"},instructions:{walk:"Andar",walk_toward:"Anda para",walk_verb:"Anda",bike:"Bicicleta",bike_toward:"Bicicleta para",bike_verb:"Anda de bicicleta",drive:"Dirigir",drive_toward:"Dirige para",drive_verb:"Dirige",move:"Segue",move_toward:"Segue em frente",transfer:"transferir",transfers:"transfere",continue_as:"Prosegue como",stay_aboard:"Fica-se a bordo",depart:"Embarcar",arrive:"Chegar",start_at:"Começar a",end_at:"Terminar a"},labels:{agency_msg:"Operado por",agency_msg_tt:"Abre o site da agência numa nova página...",about:"Sobre",stop_id:"ID da parada",trip_details:"Detalhes da Viagem",fare:"Tarifa",fare_symbol:"\u20ac",regular_fare:"",student_fare:"",senior_fare:"",travel:"Viagem",valid:"Válido(a)",trip_length:"Tempo",with_a_walk:"com um andamento de",alert_for_rt:"Aviso pra viagem"},modes:{WALK:"De pé",BICYCLE:"Bicicleta",CAR:"Carro",TRAM:"Bonde",SUBWAY:"Mêtro",RAIL:"Trem",BUS:"Ônibus",FERRY:"Ferry",CABLE_CAR:"Bonde",GONDOLA:"Teleférico",FUNICULAR:"Funicular"},ordinal_exit:{1:"à primeira saída",2:"pra segunda saída",3:"pra terceira saída",4:"pra quarta saída",5:"pra quinta saída",6:"pra saída sexta",7:"pra saída séptimo",8:"pra saída oitavo",9:"pra saída nona",10:"pra saída décimo"},time:{hour_abbrev:"hra",hours_abbrev:"hras",hour:"hora",hours:"horas",minute:"minuto",minutes:"minutos",minute_abbrev:"min",minutes_abbrev:"mins",second_abbrev:"seg",seconds_abbrev:"segs",format:"D, j M H:i",date_format:"d-m-Y",time_format:"H:i",months:['jan','fev','mar','abr','maio','jun','jul','ago','set','out','nov','dez']},systemmap:{labels:{panelTitle:"Mapa do Sistema"}},tripPlanner:{labels:{panelTitle:"Planejador de Viagem",tabTitle:"Planejar uma Viagem",inputTitle:"Detalhes da Viagem",optTitle:"Preferências da Viagem (opcional)",submitMsg:"Planejeando sua viagem...",optionalTitle:"",date:"Data",time:"Tempo",when:"Quando",from:"Desde",fromHere:"Daqui",intermediate:"Lugar intermediario",to:"À",toHere:"Até aqui",minimize:"Me mostra o(a)",maxWalkDistance:"Distância máxima andando",walkSpeed:"velocidade andando",maxBikeDistance:"Distância máxima de bicicleta",bikeSpeed:"velocidade de bicicleta",arriveDepart:"Chegar por/Embarcar à",mode:"Viaga por",wheelchair:"Accessível a cadeira de rodas",go:"Ir",planTrip:"Planeja sua viagem",newTrip:"Nova viagem"},link:{text:"Link para esta viagem (OTP)",trip_separator:"Esta viagem nos outros planejadores de viagem",bike_separator:"Nos outros planejadores de viagem por bicicleta",walk_separator:"Nos outros planejadores de viagem de pé",google_transit:"Google Transit",google_bikes:"Google Bike Directions",google_walk:"Google Walking Directions",google_domain:"http://www.google.com"},geocoder:{working:"Buscando o endereço ....",error:"Não há resultados",msg_title:"Revisar plano da viagem",msg_content:"Favor, corrija os erros antes de planejar sua viagem",select_result_title:"Favor, escolha um resultado",address_header:"Endereço"},error:{title:'Error de Planejador de Viagem',deadMsg:"O Map Trip Planner não está respondendo no momento. Favor, espere uns minutos e tente de novo, ou usa o planejador de texto (veja o link em baixo).",geoFromMsg:"Escolha a 'Origem' da sua viagem: ",geoToMsg:"Escolha o 'Destino' da sua viagem: "},msgcodes:{200:"Plano OK",500:"Erro do servidor",400:"Viagem fora dos limites",404:"Caminho não encontrado",406:"Sem tempos de trânsito disponíveis",408:"Solicitação expirou",413:"Parâmetro inválido",440:"Geocode do destino não encontrado",450:"Geocode do origem não encontrado",460:"Geocodes não encontrados (origem e destino)",470:"Não accesivel por cadeira de rodas",409:"Perto demais",340:"Ambíguo Geocode de origem",350:"Ambíguo Geocode de destino",360:"Amíguo Geocodes (origem e destino)"},options:[['TRANSFERS','Menos transferências'],['QUICK','Viagem curta'],['SAFE','Possível por bicicleta'],['TRIANGLE','Viagem personalizada...']],arriveDepart:[['false','Embarcar'],['true','Chegar']],maxWalkDistance:[['500','500 metros'],['1000','1 km'],['5000','5 km'],['10000','10 km'],['20000','20 km']],walkSpeed:[['0.278','1 km/h'],['0.556','2 km/h'],['0.833','3 km/h'],['1.111','4 km/h'],['1.389','5 km/h'],['1.667','6 km/h'],['1.944','7 km/h'],['2.222','8 km/h'],['2.500','9 km/h'],['2.778','10 km/h']],mode:[['TRANSIT,WALK','Trânsito'],['BUSISH,WALK','Apenas ônibus'],['TRAINISH,WALK','Apenas trem'],['WALK','Apenas caminhando'],['BICYCLE','Bicicleta'],['TRANSIT,BICYCLE','Trânsito & Bicicleta']],wheelchair:[['false','Não exigido'],['true','Exigido']]},CLASS_NAME:"otp.locale.Portuguese"};
otp.namespace("otp.locale");otp.locale.Russian={config:{metricsSystem:"Российская",rightClickMsg:"Щелкните правой кнопкой мыши по карте для задания начального и конечного пунктов маршрута.",attribution:{title:"Лицензионная атрибуция",content:"Отказ от ответственности здесь"}},contextMenu:{fromHere:"Начать маршрут",toHere:"Завершить маршрут",intermediateHere:"Добавить остановочный пункт по маршруту",centerHere:"Центрировать карту",zoomInHere:"Увеличение масштаба",zoomOutHere:"уменьшение масштаба",previous:"Последняя позиция карты",next:"Следующая позиция карты"},bikeTriangle:{safeName:"Велопрогулки",safeSym:"B",hillName:"Размеренно",hillSym:"F",timeName:"Быстро",timeSym:"Q"},service:{weekdays:"Выходные дни",saturday:"Суббота",sunday:"Воскресенье",schedule:"Расписание"},indicators:{ok:"ОК",date:"Дата",loading:"Загрузка",searching:"Идет поиск...",qEmptyText:"Адрес, пересечения, ориентир или координаты остановочного пункта..."},buttons:{reverse:"Обратно",reverseTip:"<b>Обратные направления</b><br/>Планирование обратного маршрута путем автоматизированной замены пунктов отправления и назначения и корректировки времени.",reverseMiniTip:"Проложить обратный маршрут",edit:"Добавить",editTip:"<b>Добавить маршрут</b><br/>Вернуться на главную страницу поиска маршрута с подробностями.",clear:"Очистить маршрут",clearTip:"<b>Очистить</b><br/>Очистить карту и все активные компоненты",fullScreen:"Развернуть",fullScreenTip:"<b>Развернуть</b><br/>Панель инструментов с кнопками свернуть/развернуть",print:"Печать",printTip:"<b>Печать</b><br/>Версия для печати маршрута поезки (без карты).",link:"Ссылка",linkTip:"<b>Ссылка</b><br/>Показать ссылку URL для маршрута",feedback:"Обратная связь",feedbackTip:"<b>Обратная связь</b><br/>Сообщить о своем мнении и об опыте работы с картой",submit:"Отправить",clearButton:"Очистить",ok:"Далее",cancel:"Отменить",yes:"Да",no:"Нет",Показать подробности:"&darr; Показать подробности &darr;",Скрыть подробности:"&uarr; Скрыть подробности &uarr;"},directions:{southeast:"юго-восток",southwest:"юго-запад",northeast:"северо-восток",northwest:"северо-запад",north:"север",west:"запад",south:"юг",east:"восток",bound:"ограничение",left:"налево",right:"направо",slightly_left:"плавный поворот налево",slightly_right:"плавные поворот направо",hard_left:"резкий поворот налево",hard_right:"резкий поворот направо",'continue':"продолжить",to_continue:"продолжить",becomes:"обращение",at:"в",on:"на",to:"к",via:"через",circle_counterclockwise:"принять кольцевой маршрут против часовой стрелки",circle_clockwise:"принять кольцевой маршрут по часовой стрелке",elevator:"указать пересадку"},instructions:{walk:"пешком",walk_toward:"пешком",walk_verb:"пешком",bike:"Велосипед",bike_toward:"Велосипед",bike_verb:"Велосипед",drive:"Автомобиль",drive_toward:"Автомобиль",drive_verb:"Автомобиль",move:"Продолжить",move_toward:"Продолжить",transfer:"трансфер",transfers:"трансфер",continue_as:"Продолжить от",stay_aboard:"борт транспортного средства",depart:"Отправление",arrive:"Прибытие",start_at:"Откуда",end_at:"Куда"},labels:{agency_msg:"Предоставление услуг",agency_msg_tt:"Открыть сайт агенства в отдельном окне...",about:"О компании",stop_id:"Координаты остановочного пункта",trip_details:"Детали маршрута",travel:"Путешествие",valid:"Доступно",trip_length:"Время",with_a_walk:"С прогулкой",alert_for_rt:"Сигнал для маршрута",fare:"Тариф",regular_fare:"Обычный",student_fare:"Студенческий",senior_fare:"Льготный",fare_symbol:"$"},modes:{WALK:"Пешком",BICYCLE:"велосипед",CAR:"Автомобиль",TRAM:"Трамвай",SUBWAY:"Метро",RAIL:"Поезд",BUS:"Автобус",FERRY:"Паром",CABLE_CAR:"Канатная дорога",GONDOLA:"Гондола",FUNICULAR:"Фуникулер"},ordinal_exit:{1:"к первому выходу",2:"ко второму выходу",3:"к третьему выходу",4:"к четвертому выходу",5:"к пятому выходу",6:"к шестому выходу",7:"к седьмому выходу",8:"к восьмому выходу",9:"к девятому выходу",10:"к десятому выходу"},time:{hour_abbrev:"ч",hours_abbrev:"ч",hour:"час",hours:"часов",minute:"минута",minutes:"минут",minute_abbrev:"мин",minutes_abbrev:"мин",second_abbrev:"сек",seconds_abbrev:"сек",format:"F jS, Y @ g:ia",date_format:"j/n/Y",time_format:"g:ia",months:['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']},systemmap:{labels:{panelTitle:"Системная карта"}},tripPlanner:{labels:{panelTitle:"Планировшик маршрутов",tabTitle:"Составить маршрут",inputTitle:"Подробности маршрута",optTitle:"Предпочтения маршрута (опционально)",submitMsg:"Идет поиск Вашего маршрута...",optionalTitle:"Опции",date:"Дата",time:"Время",when:"Когда",from:"Откуда",fromHere:"Отсюда",to:"Куда",toHere:"Сюда",intermediate:"Остановочные пункты на маршруте",minimize:"Показать",maxWalkDistance:"Предпочтительнее пешком",walkSpeed:"Скорость пешехода",maxBikeDistance:"Предпочтительнее на велосипеде",bikeSpeed:"Скорость велосипеда",arriveDepart:"Отправление/Прибытие",mode:"Транспортное средство",wheelchair:"Маршруты для людей с ограниченными способностями",go:"Далее",planTrip:"Проложить маршрут",newTrip:"Новый маршрут"},link:{text:"Ссылка на этот маршрут",trip_separator:"Данный маршрут на других транзитных планировщиках маршрутов",bike_separator:"На других планировщиках велопрогулок",walk_separator:"на других планировщиках пешеходных прогулок",google_transit:"Google Транзит",google_bikes:"Велопрогулки на Google",google_walk:"Пешеходные прогулки на Google",google_domain:"http://www.google.com"},geocoder:{working:"Проверка доступности адреса ....",error:"Поиск не дал результатов",msg_title:"Проверить план маршрута",msg_content:"Пожалуйста, исправьте ошибки до проложения маршрута",select_result_title:"Пожалуйста, выберите результат",address_header:"Адрес"},error:{title:'Ошибка планировщика маршрутов',deadMsg:"В настоящее время карта планировщика маршрутов недоступна. Пожалуйста, попробуйте еще раз через несколько минут или воспользуйтесь планировщиком маршутов в текстовом виде(см ссылку ниже).",geoFromMsg:"Пожалуйста, заполните поле "Откуда" : ",geoToMsg:"Пожалуйста заполните поле "Куда": "},msgcodes:{200:"Проложить маршрут",500:"Ошибка на сервере",400:"Недоступный маршрут",404:"Путь не найден",406:"Недействительное значение времени",408:"Истекло время запроса",413:"Недействительный параметр",440:"Остановочный пункт 'Откуда' не найден ... Пожалуйста, укажите его снова.",450:"Остановочный пункт 'Куда' не найден ... Пожалуйста, укажите его снова.",460:"Остановочные пункты 'Откуда' и 'Куда'не найдены ... Пожалуйста,  укажите их снова.",470:"Остановочные пункты 'Откуда' или 'Куда' не доступны для людей с повышенными потребностями",409:"Слишком близко",340:"Запрос 'Откуда' слишком сложный",350:"Запрос 'Куда' слишком сложный",360:"Запросы 'Откуда' и 'Куда' слишком сложные"},options:[['TRANSFERS','Fewest transfers'],['QUICK','Quick trip'],['SAFE','Bike friendly trip'],['TRIANGLE','Custom trip...']],arriveDepart:[['false','Depart'],['true','Arrive']],maxWalkDistance:[['160','1/10 mile'],['420','1/4 mile'],['840','1/2 mile'],['1260','3/4 mile'],['1609','1 mile'],['3219','2 miles'],['4828','3 miles'],['6437','4 miles'],['8047','5 miles'],['16093','10 miles'],['24140','15 miles'],['32187','20 miles'],['48280','30 miles'],['64374','40 miles'],['80467','50 miles'],['160934','100 miles']],walkSpeed:[['0.447','1 mph'],['0.894','2 mph'],['1.341','3 mph'],['1.788','4 mph'],['2.235','5 mph']],mode:[['TRANSIT,WALK','Transit'],['BUSISH,WALK','Bus only'],['TRAINISH,WALK','Train only'],['WALK','Walk only'],['BICYCLE','Bicycle only'],['TRANSIT,BICYCLE','Transit & Bicycle']],with_bikeshare_mode:[['TRANSIT,WALK','Transit'],['BUSISH,WALK','Bus only'],['TRAINISH,WALK','Train only'],['WALK','Walk only'],['BICYCLE','Bicycle only'],['WALK,BICYCLE','Rented Bicycle'],['TRANSIT,BICYCLE','Transit & Bicycle'],['TRANSIT,WALK,BICYCLE','Transit & Rented Bicycle']],wheelchair:[['false','Not required'],['true','Required']]},CLASS_NAME:"otp.locale.Russian"};
otp.namespace("otp.locale");otp.locale.Spanish={config:{metricsSystem:"international",rightClickMsg:"Haz click con el bot\xF3n derecho sobre el mapa para elegir los puntos de origen y destino.",attribution:{title:"License Attribution",content:"Disclaimer goes here"}},contextMenu:{fromHere:"Salir desde aqu\xED",toHere:"Llegar hasta aqu\xED",intermediateHere:"Add intermediate point",centerHere:"Centrar mapa aqu\xED",zoomInHere:"Acercar",zoomOutHere:"Alejar",previous:"\xDAltimo encuadre",next:"Siguiente encuadre"},bikeTriangle:{safeName:"Bike friendly",safeSym:"B",hillName:"Flat",hillSym:"F",timeName:"Quick",timeSym:"Q"},service:{weekdays:"d\xEDas de la semana",saturday:"S\xE1bado",sunday:"Domingo",schedule:"Horario"},indicators:{ok:"OK",date:"Fecha",loading:"Cargando",searching:"Buscando...",qEmptyText:"Direcci\xF3n, intersecci\xF3n,  punto de inter\xE9s o Identificador de Parada..."},buttons:{reverse:"Cambiar",reverseTip:"<b>Cambiar origen-destino</b><br/>Planifica el viaje de vuelta intercambiando origen y destino, y ajustando la hora de salida.",reverseMiniTip:"Cambiar origen-destino",edit:"Editar",editTip:"<b>Editar el viaje</b><br/>Vuelve a la pantalla principal para cambiar aspectos del viaje.",clear:"Borrar",clearTip:"<b>Clear</b><br/>Borra el mapa y todas las herramientas activas.",fullScreen:"Pantalla completa",fullScreenTip:"<b>Pantalla completa</b><br/>Mostrar - ocultar paneles",print:"Imprimir",printTip:"<b>Imprimir</b><br/>Imprimir este plan de viaje junto con las paradas.",link:"Link",linkTip:"<b>Link</b><br/>Muestra distintas url para este viaje.",feedback:"Feedback",feedbackTip:"<b>Feedback</b><br/>Send your thoughts or experiences with the map",submit:"Enviar",clearButton:"Borrar",ok:"OK",cancel:"Cancelar",yes:"S\xED",no:"No",showDetails:"Mostrar detalles...",hideDetails:"Ocultar detalles..."},directions:{southeast:"sureste",southwest:"sudoeste",northeast:"nordeste",northwest:"noroeste",north:"norte",west:"oeste",south:"sur",east:"este",bound:"l\xEDmite",left:"gira a la izquierda",right:"gira a la derecha",slightly_left:"gira ligeramente a la izquierda",slightly_right:"gira ligeramente a la derecha",hard_left:"gira completamente a la izquierda",hard_right:"gira completamente a la derecha",'continue':"sigue recto por",to_continue:"para continuar en",becomes:"se hace",at:"a",on:"en",to:"hasta",via:"via",circle_counterclockwise:"take roundabout counterclockwise",circle_clockwise:"take roundabout clockwise"},instructions:{walk:"Andar",walk_toward:"Anda hacia el",walk_verb:"Andando",bike:"Bicicleta",bike_toward:"Pedalea hacia el",bike_verb:"En bicicleta",drive:"Coche",drive_toward:"Avanza hacia el",drive_verb:"Coche",move:"Avanza",move_toward:"Avanza hacia el",transfer:"transbordo",transfers:"transbordos",continue_as:"Continues as",stay_aboard:"stay on board",depart:"Salida desde",arrive:"Llegada a",start_at:"Origen:",end_at:"Destino:"},labels:{agency_msg:"Service run by",agency_msg_tt:"Open agency website in separate window...",about:"Alrededor de ",stop_id:"Stop ID",trip_details:"Detalles del viaje",fare:"Tarifa",fare_symbol:"\u20ac",regular_fare:"",student_fare:"",senior_fare:"",travel:"Hora de salida",valid:"Hora actual",trip_length:"Tiempo",with_a_walk:"with a walk of",alert_for_rt:"Alert for route"},modes:{WALK:"A PIE",BICYCLE:"BICICLETA",CAR:"COCHE",TRAM:"TRANV\xCDA",SUBWAY:"METRO",RAIL:"TREN",BUS:"AUTOB\xDAS",FERRY:"BOTE",CABLE_CAR:"PUENTE COLGANTE",GONDOLA:"GONDOLA",FUNICULAR:"FUNICULAR"},ordinal_exit:{1:"to first exit",2:"to second exit",3:"to third exit",4:"to fourth exit",5:"to fifth exit",6:"to sixth exit",7:"to seventh exit",8:"to eighth exit",9:"to ninth exit",10:"to tenth exit"},time:{hour_abbrev:"hour",hours_abbrev:"hours",hour:"hour",hours:"hours",minute:"minuto",minutes:"minutos",minute_abbrev:"min",minutes_abbrev:"mins",second_abbrev:"sec",seconds_abbrev:"secs",format:"D, j M H:i",date_format:"d-m-Y",time_format:"H:i",months:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']},systemmap:{labels:{panelTitle:"System Map"}},tripPlanner:{labels:{panelTitle:"Planificador multimodal",tabTitle:"Planificar un viaje",inputTitle:"Detalles del viaje",optTitle:"Preferencias (opcional)",submitMsg:"Planificando su viaje...",optionalTitle:"",date:"Fecha",time:"Hora",when:"Tiempo",from:"Desde",fromHere:"Desde aqu\xED",to:"Hasta",toHere:"Hasta aqu\xED",intermediate:"Intermediate Place",minimize:"Mostrar el",maxWalkDistance:"M\xE1xima distancia hasta la parada",walkSpeed:"velocidad de caminar",maxBikeDistance:"M\xE1xima distancia hasta la bicicletas",walkSpeed:"velocidad de bicicleta",arriveDepart:"Llegada/Salida a",mode:"Modo de viaje",wheelchair:"Viaje con accesibilidad",go:"Empezar",planTrip:"Planificar el viaje",newTrip:"Nuevo viaje"},link:{text:"Link a este viaje (OTP)",trip_separator:"Este viaje en otros planificadores intermodales",bike_separator:"En otros planificadores de bicicletas",walk_separator:"En otros planificadores pedestres",google_transit:"Google Transit",google_bikes:"Google Bike Directions",google_walk:"Google Walking Directions",google_domain:"http://www.google.es"},geocoder:{working:"Looking up address ....",error:"Did not receive any results",msg_title:"Donde es review trip plan",msg_content:"Donde es correct errors before planning your trip",select_result_title:"Please select a result",address_header:"Address"},error:{title:'Error del planificador',deadMsg:"El planificador no responde. Por favor, int\xE9ntelo m\xE1s tarde",geoFromMsg:"Por favor, elija la direcci\xF3n de salida del viaje: ",geoToMsg:"Por favor, elija la direcci\xF3n de llegada del viaje: "},msgcodes:{200:"Plan OK",500:"Server error",400:"Trip out of bounds",404:"Path not found",406:"No transit times",408:"Request timed out",413:"Invalid parameter",440:"From geocode not found",450:"To geocode not found",460:"Geocode from and to not found",409:"Too close",340:"Geocode from ambiguous",350:"Geocode to ambiguous",360:"Geocode from and to ambiguous"},options:[['TRANSFERS','M\xEDnimo n\xFAmero de transbordos'],['QUICK','Viaje m\xE1s corto'],['SAFE','Viaje m\xE1s seguro'],['TRIANGLE','Custom trip...']],arriveDepart:[['false','Salida'],['true','Llegada']],walkSpeed:[['0.278','1 km/h'],['0.556','2 km/h'],['0.833','3 km/h'],['1.111','4 km/h'],['1.389','5 km/h'],['1.667','6 km/h'],['1.944','7 km/h'],['2.222','8 km/h'],['2.500','9 km/h'],['2.778','10 km/h']],maxWalkDistance:[['500','500 metros'],['1000','1 km'],['5000','5 km'],['10000','10 km'],['20000','20 km']],mode:[['TRANSIT,WALK','Transporte p\xFAblico'],['BUSISH,TRAINISH,WALK','Bus y tren'],['BUSISH,WALK','S\xF3lo bus'],['TRAINISH,WALK','S\xF3lo tren'],['WALK','S\xF3lo a pie'],['BICYCLE','Bicicleta'],['TRANSIT,BICYCLE','Transporte p\xFAblico y bicicleta'],['CAR','Coche']],wheelchair:[['false','No se requiere un viaje con accesibilidad'],['true','S\xED se requiere un viaje con accesibilidad']]},CLASS_NAME:"otp.locale.Spanish"};
otp.namespace("otp.locale");otp.locale.Turkish={config:{metricsSystem:"international",rightClickMsg:"Yolculuğun başlangıç ​​ve bitiş belirlemek için harita üzerine sağ tıklayın.",attribution:{title:"License Attribution",content:"Yasal uyarı buraya eklenecek"}},contextMenu:{fromHere:"Yolculuğu buradan başlat",toHere:"Yolculuğu burada bitir",intermediateHere:"Ara nokta ekle",centerHere:"Haritayı buraya ortala",zoomInHere:"Yaklaştır",zoomOutHere:"Uzaklaştır",previous:"Bir önceki pozisyon",next:"Sonraki pozisyon"},bikeTriangle:{safeName:"En Güvenli",safeSym:"G",hillName:"En Düz",hillSym:"D",timeName:"En Hızlı",timeSym:"H"},service:{weekdays:"Haftaiçi",saturday:"Cumartesi",sunday:"Pazar",schedule:"Zamanla"},indicators:{ok:"Tamam",date:"Tarih",loading:"Yükleniyor",searching:"Aranıyor...",qEmptyText:"Adres, kavşak, dönemeç..."},buttons:{reverse:"Reverse",reverseTip:"<b>Reverse directions</b><br/>Plan a return trip by reversing this trip's start and end points, and adjusting the time forward.",reverseMiniTip:"Reverse directions",edit:"Edit",editTip:"<b>Edit trip</b><br/>Return to the main trip planner input form with the details of this trip.",clear:"Clear",clearTip:"<b>Clear</b><br/>Clear the map and all active tools.",fullScreen:"Full Screen",fullScreenTip:"<b>Full Screen</b><br/>Show -or- hide tool panels",print:"Print",printTip:"<b>Print</b><br/>Print friendly version of the trip plan (without map).",link:"Link",linkTip:"<b>Link</b><br/>Show link url for this trip plan.",feedback:"Feedback",feedbackTip:"<b>Feedback</b><br/>Send your thoughts or experiences with the map",submit:"Submit",clearButton:"Clear",ok:"OK",cancel:"Cancel",yes:"Yes",no:"No",showDetails:"Show details...",hideDetails:"Hide details..."},directions:{southeast:"southeast",southwest:"southwest",northeast:"northeast",northwest:"northwest",north:"north",west:"west",south:"south",east:"east",bound:"bound",left:"left",right:"right",slightly_left:"slight left",slightly_right:"slight right",hard_left:"hard left",hard_right:"hard right",'continue':"continue on",to_continue:"to continue on",becomes:"becomes",at:"at",on:"on",to:"to",via:"via",circle_counterclockwise:"take roundabout counterclockwise",circle_clockwise:"take roundabout clockwise",elevator:"take elevator to"},instructions:{walk:"Walk",walk_toward:"Walk",walk_verb:"Walk",bike:"Bike",bike_toward:"Bike",bike_verb:"Bike",drive:"Drive",drive_toward:"Drive",drive_verb:"Drive",move:"Proceed",move_toward:"Proceed",transfer:"transfer",transfers:"transfers",continue_as:"Continues as",stay_aboard:"stay on board",depart:"Depart",arrive:"Arrive",start_at:"Start at",end_at:"End at"},labels:{agency_msg:"Service run by",agency_msg_tt:"Open agency website in separate window...",about:"Hakkında",stop_id:"Stop ID",trip_details:"Yolculuk detayları",fare:"Ücret",fare_symbol:"$",regular_fare:"",student_fare:"",senior_fare:"",travel:"Seyehat",valid:"Geçerli",trip_length:"Zaman",with_a_walk:"yürüyüş ile",alert_for_rt:"Güzergah için uyar"},modes:{WALK:"Yürüyüş",BICYCLE:"Bisiklet",CAR:"Araba",TRAM:"Tramway",SUBWAY:"Metro",RAIL:"Tren",BUS:"Otobüs",FERRY:"Feribot",CABLE_CAR:"Teleferik",GONDOLA:"Gondol",FUNICULAR:"Funiküler"},ordinal_exit:{1:"to first exit",2:"to second exit",3:"to third exit",4:"to fourth exit",5:"to fifth exit",6:"to sixth exit",7:"to seventh exit",8:"to eighth exit",9:"to ninth exit",10:"to tenth exit"},time:{hour_abbrev:"hour",hours_abbrev:"hours",hour:"hour",hours:"hours",minute:"dakika",minutes:"dakika",minute_abbrev:"dak",minutes_abbrev:"dak",second_abbrev:"san",seconds_abbrev:"san",format:"F jS, Y @ g:ia",date_format:"d-m-Y",time_format:"H:i",months:['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara']},systemmap:{labels:{panelTitle:"Sistem Haritası"}},tripPlanner:{labels:{panelTitle:"Trip Planner",tabTitle:"Bir Yolculuk Planla",inputTitle:"Yolculuk detayları",optTitle:"Yolculuk ayarları (opsiyonel)",submitMsg:"Yolculuğunuz planlanıyor...",optionalTitle:"",date:"Tarih",time:"Saat",when:"When",from:"From",fromHere:"From here",to:"To",toHere:"To here",intermediate:"Intermediate Place",minimize:"Show me the",maxWalkDistance:"Maximum walk",walkSpeed:"Walk speed",maxBikeDistance:"Maximum bike",bikeSpeed:"Bike speed",arriveDepart:"Arrive by/Depart at",mode:"Travel by",wheelchair:"Wheelchair accessible trip",go:"Go",planTrip:"Plan Your Trip",newTrip:"New trip"},link:{text:"Link to this trip (OTP)",trip_separator:"This trip on other transit planners",bike_separator:"On other bike trip planners",walk_separator:"On other walking direction planners",google_transit:"Google Transit",google_bikes:"Google Bike Directions",google_walk:"Google Walking Directions",google_domain:"http://www.google.com"},geocoder:{working:"Looking up address ....",error:"Did not receive any results",msg_title:"Review trip plan",msg_content:"Please correct errors before planning your trip",select_result_title:"Please select a result",address_header:"Address"},error:{title:'Trip Planner Hata',deadMsg:"Map Trip Planner is currently not responding. Please wait a few minutes to try again, or try the text trip planner (see link below).",geoFromMsg:"Please select the 'From' location for your trip: ",geoToMsg:"Please select the 'To' location for your trip: "},msgcodes:{200:"Plan OK",500:"Server error",400:"Trip out of bounds",404:"Path not found",406:"No transit times",408:"Request timed out",413:"Invalid parameter",440:"From geocode not found",450:"To geocode not found",460:"Geocode from and to not found",470:"From or to not wheelchair accessible",409:"Too close",340:"Geocode from ambiguous",350:"Geocode to ambiguous",360:"Geocode from and to ambiguous"},options:[['TRANSFERS','En az transfer'],['QUICK','En hızlı yolculuk'],['SAFE','En Güvenli yolculuk'],['TRIANGLE','Özelleştirilmiş yolculuk...']],arriveDepart:[['false','Depart'],['true','Arrive']],maxWalkDistance:[['160','1/10 mil'],['420','1/4 mil'],['840','1/2 mil'],['1260','3/4 mil'],['1609','1 mil'],['3219','2 mil'],['4828','3 mil'],['6437','4 mil'],['8047','5 mil'],['16093','10 mil'],['24140','15 mil'],['32187','20 mil'],['48280','30 mil'],['64374','40 mil'],['80467','50 mil'],['160934','100 mil']],walkSpeed:[['0.278','1 km/s'],['0.556','2 km/s'],['0.833','3 km/s'],['1.111','4 km/s'],['1.389','5 km/s'],['1.667','6 km/s'],['1.944','7 km/s'],['2.222','8 km/s'],['2.500','9 km/s'],['2.778','10 km/s']],mode:[['TRANSIT,WALK','Transit'],['BUSISH,WALK','Bus only'],['TRAINISH,WALK','Train only'],['WALK','Walk only'],['BICYCLE','Bicycle'],['TRANSIT,BICYCLE','Transit & Bicycle']],wheelchair:[['false','Zorunlu Değil'],['true','Zorunlu']]},CLASS_NAME:"otp.locale.Turkish"};
otp.namespace("otp.util");otp.util.AnalyticsUtils={OTP_TRIP_SUBMIT:"/imap/planner/submit",OTP_TRIP_SUCCESS:"/imap/planner/success",OTP_TRIP_GEO_ERROR:"/imap/planner/error/geocoder",OTP_TRIP_ERROR:"/imap/planner/error/other",OTP_TRIP_PRINT:"/imap/planner/print",OTP_TRIP_EDIT:"/imap/planner/edit",OTP_TRIP_REVERSE:"/imap/planner/reverse",OTP_TRIP_FORM_REVERSE:"/imap/planner/form-reverse",MEASURE:"/imap/measure",DIALOG:"/imap/dialog",gaJsHost:(("https:"==document.location.protocol)?"https://ssl.":"http://www."),pageTracker:null,defaultDomain:"demo.opentripplanner.org",defaultEventName:"unknown event",defaultGoogleId:"UA-11476476-2",importGoogleAnalytics:function(domain,id)
{try
{document.write(unescape("%3Cscript src='"+this.gaJsHost+"google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));}
catch(e)
{console.log("GA EXCEPTION: AnalyticsUtils.importGoogleAnalytics threw exception "+e);}},initGoogleAnalytics:function(domain,id)
{try
{if(domain==null)domain=this.defaultDomain;if(id==null)id=this.defaultGoogleId;this.pageTracker=_gat._getTracker(id);this.pageTracker._setDomainName(domain);this.pageTracker._trackPageview();}
catch(e)
{console.log("GA EXCEPTION: AnalyticsUtils.initGoogleAnalytics threw exception "+e);}},initGoogleAnalyticsExtOnReady:function(domain,id)
{Ext.onReady(function()
{otp.util.Analytics.initGoogleAnalytics(domain,id);});},gaEvent:function(name)
{try
{if(name==null)name=this.defaultEventName;this.pageTracker._trackPageview(name);}
catch(e)
{console.log("GA EXCEPTION: AnalyticsUtils.gaEvent for "+name+", threw this exception:"+e);}},CLASS_NAME:"otp.util.AnalyticsUtils"};otp.util.Analytics=otp.util.AnalyticsUtils;
otp.namespace("otp.util");otp.util.DateUtils={getTimeFormat:function()
{var retVal=null;try{retVal=otp.config.locale.time.time_format;}
catch(e){}
if(retVal==null)
retVal="g:ia";return retVal;},getDateTimeFormat:function()
{var retVal=null;try{retVal=otp.config.locale.time.format;}
catch(e){}
if(retVal==null)
retVal="D, M jS g:ia";return retVal;},getPrettyDate:function(pre,post,date)
{var retVal="";try
{if(date==null)
date=new Date();if(pre==null)
pre="";if(post==null)
post="";retVal=pre+date.toDateString()+' @ '+date.toLocaleTimeString()+post;}
catch(e)
{}
return retVal;},getMinutesAndSeconds:function(m,s,mStr,mmStr,sStr)
{var retVal="";if(mStr==":"){mmStr=":";sStr="";}
if(mStr=="."){mmStr=".";sStr="";}
if(mStr==null)mStr=" "+otp.util.DateUtils.locale.time.minute_abbrev+", ";if(mmStr==null)mmStr=" "+otp.util.DateUtils.locale.time.minutes_abbrev;if(sStr==null)sStr=" "+otp.util.DateUtils.locale.time.seconds_abbrev+" ";if(m&&m>0)
retVal+=m+(m==1?mStr:mmStr);retVal+=(s<10?"0"+s:s)+sStr;return retVal;},getMonthAsInt:function(str,pad)
{var retVal=str;var months=otp.util.DateUtils.locale.time.months;for(var i=0;i<months.length;i++)
{if(str==months[i])
{i++;retVal="";if(pad&&i<10)
retVal="0";retVal+=i;break;}}
return retVal;},getElapsedTime:function(oldDate,min,sec)
{if(min==null)min=0;if(sec==null)sec=0;var retVal={};try
{var tsecs=Math.round(((new Date().getTime()-oldDate.getTime())/1000)+sec);retVal.min=Math.floor(tsecs/60)+min;retVal.sec=tsecs%60;}
catch(e)
{retVal={"min":otp.util.DateUtils.locale.time.minute_abbrev,"sec":otp.util.DateUtils.locale.time.second_abbrev};}
return retVal;},addDays:function(days,date)
{if(date==null)
date=new Date();if(days==null)
days=365;return new Date(date.getTime()+(1000*60*60*24*days));},isoDateStringToDate:function(str)
{var date=null;if(str)
{if(str.lastIndexOf("Z")!=-1){str=str.substring(0,str.length-1);}
var tokens=str.split(/[\-\+T:]/);date=new Date(tokens[0],tokens[1]-1,tokens[2],tokens[3],tokens[4],tokens[5],0);}
return date;},pad:function(n,digits){var string=n.toString();var missingDigits=digits-string.length;if(missingDigits>0){string=('0'*missingDigits)+string;}
return string;},dateToIsoDateString:function(date,defVal)
{var retVal=defVal;try
{retVal=[date.getFullYear(),otp.util.DateUtils.pad(date.getMonth()+1,2),otp.util.DateUtils.pad(date.getDate(),2)].join('-');console.log(retVal);}
catch(e)
{console.log("WARN EXCEPTION in dateToIsoString(): "+e);}
return retVal;},prettyDateTime:function(date)
{if(typeof date=="string"){date=otp.util.DateUtils.isoDateStringToDate(date);}
return date.format(otp.util.DateUtils.getDateTimeFormat());},prettyTime:function(date)
{if(typeof date=="string"){date=otp.util.DateUtils.isoDateStringToDate(date);}
return date.format(otp.util.DateUtils.getTimeFormat());},correctAmPmTimeString:function(time,format)
{if(time==null||time.length<1)return time;time=time.toLowerCase().trim();var ttime=time.match(/(\d+)(?::(\d\d))?\s*([ap]?)/);var h=ttime[1];var m=parseInt(ttime[2],10)||null;var am=ttime[3];if(h&&h.length>2)
{if(m==null)
m=h.substring(h.length-2);h=h.substring(0,h.length-2);}
h=parseInt(h,10)||12;if(h>12)
{h=h%12;if(h==0)
h=12;if(am==null||am=='')
am='p';}
if(m==null||m>59||m<0)
{m="00";}
else if(m.length!=2&&m>=0&&m<=9)
{m="0"+m;}
m=""+m+"";if(m.length!=2)
console.log("ERROR: we have problem with our minutes string:== "+m);if(am)
{if(am=='p')
am="pm"
else
am="am"}
else
{if(h>6&&h<12)
am="am";else
am="pm";}
var space="";if(format&&format.toLowerCase().charAt(format.length-2)==" ")
space=" ";return h+":"+m+space+am;},parseTime:function(time,format)
{var retVal=time;if(format&&format.toLowerCase().charAt(format.length-1)=="a"&&format.toLowerCase().indexOf("g:i")==0)
{retVal=otp.util.DateUtils.correctAmPmTimeString(time,format);}
return retVal;},parseTimeTest:function(t)
{var times=['9:00 pm','1:09 p.m.','100 p','1:08p.m.','1:08p','1 pm','1 p.m.','1 p','1pm','1p.m.','1p','1:pm','13:09','13','944am','1354','12335','1232p'];for(var i=0;i<times.length;i++)
{console.log(otp.util.DateUtils.parseTime(times[i],'g:i a'));console.log(otp.util.DateUtils.parseTime(times[i],'H:i'));}},CLASS_NAME:"otp.util.DateUtils"};
otp.namespace("otp.util");try
{Ext.BLANK_IMAGE_URL='images/ui/s.gif';Ext.form.Field.prototype.msgTarget='side';Ext.QuickTips.init();Ext.Ajax.defaultHeaders={'Accept':'application/xml'};Ext.lib.Event.resolveTextNode=Ext.isGecko?function(node)
{var retVal=null;try
{if(!node){return;}
var s=HTMLElement.prototype.toString.call(node);if(s=='[xpconnect wrapped native prototype]'||s=='[object XULElement]'){return;}
retVal=node.nodeType==3?node.parentNode:node;}
catch(e)
{console.log("ExtUtils exception in Ext.lib.Event.resolveTextNode override for isGecko: "+e);}
return retVal;}:function(node)
{var retVal=null;try
{retVal=node&&node.nodeType==3?node.parentNode:node;}
catch(e)
{console.log("ExtUtils exception in Ext.lib.Event.resolveTextNode override: "+e);}
return retVal;};Ext.form.XmlErrorReader=function(){Ext.form.XmlErrorReader.superclass.constructor.call(this,{record:'field',success:'@success'},['id','msg']);};Ext.extend(Ext.form.XmlErrorReader,Ext.data.XmlReader);otp.util.OPT_ARRAY=['opt','text'];otp.util.OPT_RECORD=new Ext.data.Record.create(otp.util.OPT_ARRAY);Ext.tree.NodeMouseoverPlugin=Ext.extend(Object,{init:function(tree){if(!tree.rendered){tree.on('render',function(){this.init(tree)},this);return;}
this.tree=tree;tree.body.on('mouseover',this.onTreeMouseover,this,{delegate:'div.x-tree-node-el'});tree.body.on('mouseout',this.onTreeMouseout,this,{delegate:'div.x-tree-node-el'});},XfireEvent:function(e,t,event){var nodeEl=Ext.fly(t).up('div.x-tree-node-el');if(nodeEl){var nodeId=nodeEl.getAttributeNS('ext','tree-node-id');if(nodeId){var node=this.tree.getNodeById(nodeId);if(node){node.fireEvent(event,node,e);}}}},fireEvent:function(e,t,event){if(t&&t.attributes)
{var nodeId=t.getAttribute('ext:tree-node-id');if(nodeId){var node=this.tree.getNodeById(nodeId);if(node){node.fireEvent(event,node,e);}}}},onTreeMouseover:function(e,t){this.fireEvent(e,t,'mouseover');},onTreeMouseout:function(e,t){this.fireEvent(e,t,'mouseout');}});}
catch(e)
{console.log("Ext exception can be ignored -- just means you aren't including Ext.js in your app, which is OK");}
otp.util.ExtUtils={MAP_ATTRIBUTION:'<a href="javascript:void(0);" onclick="otp.util.ExtUtils.toggleAboutMap();">Powered by OpenGeo</a>',ABOUT_MAP_WINDOW:null,makeJsonStore:function(url,id,total,root,fields,config)
{var c={proxy:new Ext.data.HttpProxy({method:'GET',url:url}),autoDestroy:true,autoSave:false,autoLoad:false,restful:false,idProperty:id,totalProperty:total,root:root,fields:fields};otp.extend(c,config);var retVal=new Ext.data.JsonStore(c);retVal.proxy.on("exception",function(p,type,action){console.log("EXCEPTION: ExtUtils.makeJsonStore error type:",type,", action:",action);});return retVal;},setCookie:function(name,value,date,path,domain)
{try
{if(date==null)
date=otp.util.DateUtils.addDays(365);if(path==null)
path='/';if(domain==null)
domain='opentripplanner.org';Ext.util.Cookies.set(name,value,date,path,domain);}
catch(e)
{console.log("ExtUtils.setCookie() "+e);}},setTripPlannerCookie:function(date)
{otp.util.ExtUtils.setCookie(otp.util.Constants.TP_COOKIE_NAME,otp.util.Constants.TP_COOKIE_VALUE,date);},clearSplashScreen:function(time,divName,maskName)
{try
{if(time==null)time=500;if(divName==null)divName='loading';if(maskName==null)maskName=divName+'-mask';setTimeout(function(){try{Ext.get(divName).remove();}catch(e){}
try{Ext.get(maskName).fadeOut({remove:true});}catch(e){}},time);}
catch(e)
{console.log("ExtUtils.clearSplashScreen() "+e);}},makePopup:function(inConfig,title,isShow,width,height,closeable,noCloseButton,x,y)
{var c={title:title!=null?title:'About',layout:'auto',closeable:closeable==true?true:false,closeAction:closeable==true?'close':'hide',width:width!=null?width:600,height:height!=null?height:370,plain:true,x:x,y:y,buttonAlign:'center'};otp.extend(c,inConfig);otp.configure(c,inConfig);return otp.util.ExtUtils.makePopupWithConfig(c,isShow,closeable,noCloseButton);},makePopupWithConfig:function(config,isShow,closeable,noCloseButton)
{var retVal=new Ext.Window(config);if(closeable==true&&noCloseButton!=true)
{var b=new Ext.Button({text:'Close',scope:retVal,handler:function(a,b)
{this.close();}});retVal.addButton(b);}
if(isShow===true)
retVal.show(this);if(config.timeout&&config.timeout>0){setTimeout(function(){retVal.close(this);},config.timeout*1000);}
return retVal;},makeHtmlPopup:function(url,title,isShow,width,height,closeable,noCloseButton)
{var c={autoLoad:url,y:100,width:(width!=null?width:600),layout:'auto',buttonAlign:'center'};if(title)c.title=title;if(height)c.height=height;return otp.util.ExtUtils.makePopupWithConfig(c,isShow,closeable,noCloseButton);},formSetRawValue:function(form,value,defValue,dirty)
{try
{var v=defValue;if(value)
v=value;if(v)
form.setRawValue(v);if(dirty&&form.setDirty)
form.setDirty();}
catch(e)
{}},makeFormPopup:function(items,title,isShow,width,height)
{return otp.util.ExtUtils.makePopup({items:items},title,isShow,width,height);},toggleAboutMap:function()
{if(this.ABOUT_MAP_WINDOW==null)
this.ABOUT_MAP_WINDOW=otp.util.ExtUtils.makeHtmlPopup('about.html','About this map');this.togglePopup(this.ABOUT_MAP_WINDOW);},togglePopup:function(pop)
{if(pop&&pop.show&&pop.hide)
{if(pop.isVisible())
pop.hide();else
pop.show();}},makeTextPanel:function(defText)
{if(defText==null)
defText='...';var retVal=new Ext.Panel({title:'Information',xtype:'panel',autoScroll:true,html:defText});return retVal;},makeToolButton:function(handler,id,tip)
{if(id==null)
id='refresh';if(tip==null)
tip='<b>Clear</b><br/>Clears the map of all selections and feature detail windows.';if(handler==null)
handler=function(e,tE,P){P.m_control.clear();};return{id:id,qtip:tip,handler:handler};},setCallback:function(node,event,callback,scopeObj)
{if(node&&event&&callback)
{var e={};e[event]=callback;if(scopeObj)
e['scope']=scopeObj;node.on(e);}},setClickCallback:function(node,callback,scopeObj)
{this.setCallback(node,"click",callback,scopeObj);},setMouseOverCallback:function(node,callback,scopeObj)
{this.setCallback(node,"mouseover",callback,scopeObj);},setMouseOutCallback:function(node,callback,scopeObj)
{this.setCallback(node,"mouseout",callback,scopeObj);},getPixelXY:function(mouseEl,panelEl)
{var mouseXY=mouseEl.getXY();if(panelEl==null)
panelEl=Ext.get(otp.util.OpenLayersUtils.MAP_PANEL);var panelXY=panelEl.getOffsetsTo(document.body);var x=mouseXY[0]-panelXY[0];var y=mouseXY[1]-panelXY[1];return{x:x,y:y};},gridClick:function(grid,rowIndex,props)
{if(props==null)
props={description:'',x:'',y:''};try
{this.m_lastRowIndex=rowIndex;var record=grid.getStore().getAt(rowIndex);for(var p in props)
{var tmp=record.get(p);props[p]=tmp;}}
catch(e)
{}
return props;},makeListView:function(store,cols,config)
{if(cols==null)
cols=[{header:'Description',width:.9,dataIndex:'description'}];var c={layout:'auto',store:store,stripeRows:true,autoShow:true,columns:cols};otp.extend(c,config);otp.configure(c,config);var listView=new Ext.ListView(c);return listView;},makeGridView:function(store,cols,config,isMultiSelect)
{if(cols==null)
cols=[{header:'Description',width:.9,dataIndex:'description'}];var c={layout:'fit',height:150,store:store,stripeRows:true,bodyBorder:false,autoShow:true,autoDestroy:true,sortable:true,sm:new Ext.grid.RowSelectionModel({singleSelect:isMultiSelect==true?false:true}),deferRowRender:true,forceLayout:true,viewConfig:{forceFit:true,enableRowBody:true},columns:cols};otp.extend(c,config);otp.configure(c,config);if(c.height==null)c.autoHeight=true;if(c.width==null)c.autoWidth=true;var retVal=new Ext.grid.GridPanel(c);return retVal;},makeTreeNode:function(treeNodeConfig,clickCallback,scope,overCallback,outCallback)
{var configDefaults={href:"javascript:void(0);",margins:'0 0 0 0',cmargins:'0 2 0 0',expanded:true,collapsible:true};var config=Ext.apply({},treeNodeConfig,configDefaults);var treeNode=new Ext.tree.TreeNode(config);this.setClickCallback(treeNode,clickCallback,scope);this.setMouseOverCallback(treeNode,overCallback,scope);this.setMouseOutCallback(treeNode,outCallback,scope);return treeNode;},clearTreeNode:function(node)
{try
{node.remove();}
catch(err)
{}
try
{node.destroy();}
catch(err)
{}},clearTreeNodes:function(tree)
{try
{var nodes=tree.root.childNodes;for(var i=nodes.length-1;i>=0;i--)
{var c1=nodes[i].childNodes;if(c1)
{for(var j=c1.length-1;j>=0;j--)
{var c2=c1[j].childNodes;if(c2)
{for(var k=c2.length-1;k>=0;k--)
{this.clearTreeNode(c2[k]);}}
this.clearTreeNode(c1[j]);}}
this.clearTreeNode(nodes[i]);}}
catch(err)
{}},copyTreeNodes:function(nodes,clickCallback,scope)
{var retVal=new Array();try
{var len=nodes.length;for(var i=0;i<len;i++)
{retVal[i]=new Ext.tree.TreeNode(Ext.apply({},nodes[i].attributes));this.setClickCallback(retVal[i],clickCallback,scope);}
var chiles=new Array();var children=nodes[1].childNodes;var len=children.length;for(var j=0;j<len;j++)
{chiles[j]=new Ext.tree.TreeNode(Ext.apply({},children[j].attributes));this.setClickCallback(chiles[j],clickCallback,scope);}
retVal[1].appendChild(chiles);}
catch(err)
{}
return retVal;},makeStaticPullDownStore:function(data)
{return new Ext.data.SimpleStore({fields:otp.util.OPT_ARRAY,data:data});},getCoordinateByString:function(key,store,defVal,isLatLon)
{var i=store.find('description',key);var rec=store.getAt(i);return otp.util.ExtUtils.getCoordinate(rec,defVal,isLatLon);},getCoordinateByIndex:function(store,index,defVal,isLatLon)
{var rec=store.getAt(index);return otp.util.ExtUtils.getCoordinate(rec,defVal,isLatLon);},getCoordinate:function(record,defVal)
{var retVal=defVal;try
{var x=record.get('lon');var y=record.get('lat');retVal=x+","+y;}
catch(err)
{retVal=defVal;}
return retVal;},getName:function(record,defVal)
{var name=null;try
{name=record.get('name');}
catch(err)
{name=defVal;}
return name;},getNamedCoordinate:function(record,defVal)
{var coord=this.getCoordinate(record,defVal);var name=this.getName(record);var retVal=coord;if(name)
retVal=name+"::"+coord;return retVal;},makePointRecord:function(typeID)
{var retVal=null;try
{if(typeID==null||typeID=='')
typeID='';else
typeID=typeID+'/';retVal=new Ext.data.Record.create([{name:'id',mapping:'@id'},{name:'mode',mapping:'@mode'},{name:'order',mapping:'@order'},{name:'routeID',mapping:'@route'},{name:'lat',mapping:typeID+'pos/lat'},{name:'lon',mapping:typeID+'pos/lon'},{name:'name',mapping:typeID+'name'},{name:'stopId',mapping:typeID+'stopId'},{name:'areaKey',mapping:typeID+'@areaKey'},{name:'areaValue',mapping:typeID+'@areaValue'},{name:'geometry',mapping:typeID+'geometry',convert:function(n,p){return otp.util.OpenLayersUtils.geo_json_converter(n,p);}},{name:'agencyId',convert:function(val,rec){var node=rec;if(node.nodeName!=='leg'){node=rec.parentNode;}
return node.nodeName==='leg'?node.getAttribute('agencyId'):null;}}]);}
catch(e)
{console.log("EXCEPTION: ExtUtils.makePointRecord() "+e);}
return retVal;},makePointStore:function(nodeID,typeID)
{if(nodeID==null)
nodeID='leg';var rec=this.makePointRecord(typeID);return new Ext.data.Store({fields:rec,data:Ext.state.Manager.get('PointStore',[]),reader:new Ext.data.XmlReader({record:nodeID},rec)});},makeLocationStore:function(store)
{if(store&&store.removeAll)
{store.removeAll();return store;}
return this.makePointStore('location','');},loadPointRecord:function(nodeID,xmlDoc)
{var retVal=null;try
{var store=this.makePointStore(nodeID,'');var nodes=Ext.DomQuery.select('response',xmlDoc);store.loadData(nodes);retVal=store.getAt(0);}
catch(e)
{retVal=this.makePointRecord(nodeID);console.log("EXCEPTION: ExtUtils.loadPointRecord "+e);}
return retVal;},CLASS_NAME:"otp.util.ExtUtils"};
otp.namespace("otp.util");otp.util.HtmlUtils={defaultLogo:'images/ui/logoSmall.png',defaultAlt:'OpenTripPlanner',fixHtml:function(config)
{try
{if(!this.hasLogoLinkImg())
this.drawCustomLogo(config.logo);}
catch(e)
{console.log("GA EXCEPTION: AnalyticsUtils.importGoogleAnalytics threw exception "+e);}},drawCustomLogo:function(logo,alt)
{try
{var logoPath=(typeof logo==='string')?logo:this.defaultLogo;var altStr=(typeof logo==='string')?alt:this.defaultAlt;var logoAnchorWrapper=this.getLogoLink();Ext.DomHelper.append(logoAnchorWrapper,{tag:'img',alt:altStr,src:logoPath});}
catch(e)
{console.log("GA EXCEPTION: AnalyticsUtils.importGoogleAnalytics threw exception "+e);}},getElement:function(el,doc)
{var retVal=null;try
{if(doc==null)
doc=document;retVal=doc.getElementById(el);}
catch(e)
{console.log('HtmlUtils.getElement: no element '+el+' in doc '+doc);}
if(retVal==null)
{try
{retVal=document.getElementById(el);}
catch(e)
{console.log('HtmlUtils.getElement: no element '+el+' in doc '+doc);}}
return retVal;},hideShowElement:function(el,doc,disp)
{try
{var e=this.getElement(el,doc);var s=e.style.display;if(disp==null)
disp='block';if(s&&s=='none')
e.style.display=disp;else
e.style.display='none';}
catch(e)
{}},getLogoLink:function(path)
{if(!path)
path='a';return Ext.get('logo').query(path)[0];},hasLogoLinkImg:function()
{var retVal=false;try
{var x=this.getLogoLink('a/img');if(x)
retVal=true;}
catch(e)
{}
return retVal;},CLASS_NAME:"otp.util.HtmlUtils"};
otp.namespace("otp.util");otp.util.imagePathManager=(function(){var useCustomIconsForAgencies=[];return{addCustomAgencies:function(newCustomAgencies)
{var agencies=typeof newCustomAgencies==='string'?[newCustomAgencies]:newCustomAgencies;Ext.each(agencies,function(agency){useCustomIconsForAgencies.push(agency);});},imagePath:function(options)
{if(typeof options.mode!=='string'){throw"ImagePathManager imagePath: Mode not specified";}
if(useCustomIconsForAgencies.indexOf(options.agencyId)!==-1){if(typeof options.route!=="string"){throw"ImagePathManager imagePath: Route not specified for custom agencyId: "+options.agencyId;}
var path='custom/'+options.agencyId+'/'+options.mode.toUpperCase()+'/'+options.route.toUpperCase();if(typeof options.imageType==='string'){path+='-'+options.imageType;}
path+='.png';return path;}else{var path='images/';path+=options.imageType==='marker'?'map':'ui';var left=options.direction==='left'?'-left':'';path+='/trip/mode/'+options.mode.toLowerCase()+left+'.png';return path;}}};})();otp.util.ImagePathManagerUtils={getStepDirectionIcon:function(dir,path)
{if(path==null)
path="images/ui/trip/directions/";var retVal=path+"clear.png";try
{retVal=path+dir.toLowerCase()+".png";}
catch(e)
{}
return retVal;},CLASS_NAME:"otp.util.ImagePathManagerUtils"};
otp.namespace("otp.util");otp.util.ObjUtils={m_includeNameAlways:false,m_includeNameForSmalls:true,m_smallStringLength:4,m_fixNameSpacing:true,m_capitolize:true,isCoordinate:function(value){var lat,lon;try
{lat=parseFloat(otp.util.ObjUtils.getLat(value));lon=parseFloat(otp.util.ObjUtils.getLon(value));}
catch(e)
{}
return!isNaN(lat)&&!isNaN(lon);},isNumber:function(value)
{var retVal=false;try
{if(value)
retVal=!isNaN(value-111);}
catch(e)
{}
return retVal;},getLon:function(coord){var retVal=null;try
{retVal=coord.substring(coord.indexOf(',')+1);}
catch(e)
{}
return retVal;},getLat:function(coord){var retVal=null;try
{retVal=coord.substring(0,coord.indexOf(','));}
catch(e)
{}
return retVal;},getConfig:function(config)
{var retVal=otp.config;if(config!=null&&config.map!=null)
retVal=config;return retVal;},isInArray:function(str,array)
{var retVal=false;try
{for(var i=0;i<array.length;i++)
{var m=array[i];if(str.indexOf(m)>=0)
{retVal=true;break;}}}
catch(e)
{console.log("isInArray error"+e);}
return retVal;},isArray:function(obj)
{var retVal=false;try
{if(obj.constructor.toString().indexOf("Array")==-1)
retVal=false;else
retVal=true;}
catch(e)
{}
return retVal;},deleteFromArray:function(arr,val,all)
{var retVal=arr;try
{if(this.isArray(arr))
{retVal=new Array();var cullVal=true;for(var i=0;i<arr.length;i++)
{if(arr[i]==val&&cullVal)
{if(!all)
cullVal=false;continue;}
retVal.push(arr[i]);}}}
catch(e)
{}
return retVal;},getBottomArray:function(arr,maxDepth)
{var retVal=null;var depth=10;if(maxDepth)
depth=maxDepth;try
{var az=arr;for(var i=0;i<depth;i++)
{if(!this.isArray(az[0]))
{retVal=az;break;}
az=az[0];}}
catch(e)
{}
return retVal;},defaultController:function(controller)
{if(controller==null)controller={};if(controller.activate==null)controller.activate=function(){};if(controller.deactivate==null)controller.deactivate=function(){};return controller;},fixWord:function(name)
{var retVal=name;try
{var retVal=retVal.trim();if(this.m_fixNameSpacing)
retVal=retVal.replace('_',' ');if(this.m_capitolize)
{var tmp=retVal.charAt(0).toUpperCase();if(retVal.length>1)
tmp+=retVal.slice(1).toLowerCase();retVal=tmp;}}
catch(e)
{}
return retVal;},toFloat:function(num,defVal)
{var retVal=defVal;try
{if(num)
{retVal=num*0.999999999;if(isNaN(retVal))
retVal=defVal;}}
catch(e)
{retVal=defVal;}
return retVal;},getCoordinate:function(coord,defVal)
{var retVal='0.0,0.0';if(defVal!=null)retVal=defVal;try
{var c=coord.split(",");var X=c[0].trim();var Y=c[1].trim();if(X>=-180.0&&X<100000000.0&&Y>=-180.0&&Y<100000000.0)
retVal=X+","+Y;}
catch(e)
{console.log("otp.util.getCoordinate error for "+coord+"; exception "+e);}
return retVal;},fixNameValue:function(nv)
{var retVal=nv.v+"";if(this.m_includeNameAlways||(this.m_includeNameForSmalls&&retVal.length<=this.m_smallStringLength))
{var name=this.fixWord(nv.n);retVal=name+' = '+retVal;}
return retVal;},getFirstAttribute:function(obj,defVal)
{var retVal=defVal;for(var name in obj)
{retVal=this.fixNameValue({n:name,v:obj[name]});if(retVal!=null&&retVal.length>0)
break;}
return retVal;},getNamedAttribute:function(obj,target,defVal)
{var retVal=defVal;for(var name in obj)
{if(name!=null&&name==target)
{var tmp=obj[name];if(tmp!=null&&tmp.length>0)
{tmp=this.fixNameValue({n:name,v:tmp});if(tmp!=null&&tmp.length>0)
retVal=tmp;}
break;}}
return retVal;},getNamedCoordRecord:function(data,isMercator)
{var retVal={};var X='x';var Y='y';retVal.zoom=6;retVal.isMercator=isMercator;if(isMercator)
{X='lon';Y='lat';retVal.zoom=15;}
retVal.coord='';if(data['name']&&data['name'].length>0)
retVal.coord=data['name']+'::';retVal.name=data['name']||'';retVal.x=data[X]
retVal.y=data[Y],retVal.coord+=retVal.x+","+retVal.y;return retVal;},numProperties:function(feature,defVal)
{var i=0;for(var name in properties)
{i++;}
return i;},CLASS_NAME:"otp.util.ObjUtils"};
otp.namespace("otp.util");try
{if(window.OpenLayers==undefined)
{OpenLayers={};var names=["Size","Pixel","Layer","Layer.WMS","Control","Control.SelectFeature","Popup","Popup.FramedCloud"];for(var i=0;i<names.length;++i)
window.OpenLayers[names[i]]=function()
{};}
OpenLayers.IMAGE_RELOAD_ATTEMPTS=5;OpenLayers.Util.onImageLoadErrorColor="";OpenLayers.ImgPath="images/map/controls/";otp.util.WGS_SRS="EPSG:4326";otp.util.GEOGRAPHIC=new OpenLayers.Projection(otp.util.WGS_SRS);otp.util.WEB_MERC_SRS="EPSG:900913";otp.util.WEB_MERCATOR=new OpenLayers.Projection(otp.util.WEB_MERC_SRS);}
catch(e)
{console.log("no worries if this exception is thrown...just means that OpenLayers is not included in your html file (eg: maybe this is not an OL project)");}
otp.util.OpenLayersUtils={MAP_PANEL:'map-panel',yOffsetToTip:30,makeMap:function(div,options)
{return new OpenLayers.Map(div,options);},makeMapBaseLayer:function(map,options)
{options.isBaseLayer=true;var layer=new OpenLayers.Layer.WMS("Map",options.url,{layers:options.layers,format:options.format},options);layer.OTP_LAYER=true;map.addLayer(layer);return layer;},defaultControls:function(map,doZoomWheel,doRightClicks,doPermaLink,doAttribution,doHistory,doLayerSwitch)
{var retVal={pan:new OpenLayers.Control.PanZoomBar({zoomWorldIcon:true,zoomStopHeight:6}),mouse:new OpenLayers.Control.MousePosition({numDigits:4}),scale:new OpenLayers.Control.ScaleLine(),arg:new OpenLayers.Control.ArgParser(),nav:new OpenLayers.Control.Navigation({zoomWheelEnabled:doZoomWheel,handleRightClicks:doRightClicks})};map.addControl(retVal.pan);map.addControl(retVal.mouse);map.addControl(retVal.scale);map.addControl(retVal.arg);map.addControl(retVal.nav);if(doPermaLink)
{var p=new OpenLayers.Control.Permalink();retVal.perma=p;map.addControl(p);}
if(doAttribution)
{var a=new OpenLayers.Control.Attribution();retVal.attrib=a;map.addControl(a);}
if(doHistory)
{var h=new OpenLayers.Control.NavigationHistory();retVal.hist=h;map.addControl(h);}
if(doLayerSwitch)
{var s=new OpenLayers.Control.LayerSwitcher();retVal.layerSwitch=s;map.addControl(s);}
return retVal;},BLACK_STYLE:{strokeColor:"#111111",strokeOpacity:0.5,strokeWidth:5,pointRadius:6,pointerEvents:"visiblePainted"},BLACK_DASH_STYLE:{strokeColor:"#111111",strokeOpacity:0.8,strokeWidth:3,pointRadius:6,strokeDashstyle:"dash",pointerEvents:"visiblePainted"},RED_STYLE:{strokeColor:"#FF0000",strokeOpacity:0.7,strokeWidth:6,pointRadius:6,pointerEvents:"visiblePainted"},RED_DASH_STYLE:{strokeColor:"#FF0000",strokeOpacity:0.7,strokeWidth:6,pointRadius:6,strokeDashstyle:"dash",pointerEvents:"visiblePainted"},makeDefaultPointFeatureStyle:function()
{return new OpenLayers.StyleMap({"default":new OpenLayers.Style({pointRadius:"6",fillColor:"#ffcc66",strokeColor:"#66ccDD",strokeWidth:2}),"select":new OpenLayers.Style({fillColor:"#FE7202",strokeColor:"#3B5A95",strokeWidth:2})});},makeStraightLine:function(from,to,style)
{var retVal=null;try
{if(style==null)
style=otp.util.OpenLayersUtils.BLACK_DASH_STYLE;retVal=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString([new OpenLayers.Geometry.Point(from.get('x'),from.get('y')),new OpenLayers.Geometry.Point(to.get('x'),to.get('y'))]),null,style);}
catch(err)
{}
return retVal;},makeLineFromPoints:function(pointList,style)
{var retVal=null;try
{if(style==null)
style=otp.util.OpenLayersUtils.RED_STYLE;var line=[];for(var i in pointList)
{var x=pointList[i].x;var y=pointList[i].y;if(x==null||y==null||x<=0||y<=0)
continue;var newPoint=new OpenLayers.Geometry.Point(x,y);if(newPoint!=null)
line.push(newPoint);}
if(line!=null&&line.length>1)
{var ls=new OpenLayers.Geometry.LineString(line);retVal=new OpenLayers.Feature.Vector(ls,null,style);}}
catch(err)
{}
return retVal;},drawLinesViaAjax:function(url,vLayer,style,itin)
{try
{OpenLayers.Request.GET({url:url,success:function(xhr)
{var vectors=new Array();var resp=eval('('+xhr.responseText+')');for(var i in resp.results)
{try
{var points=resp.results[i].points;var line=otp.util.OpenLayersUtils.makeLineFromPoints(points,style);if(line!=null)
vectors.push(line);}
catch(Exe)
{}}
if(vectors.length>0)
{if(itin)
itin.concatVectors(vectors);if(vLayer)
vLayer.addFeatures(vectors);}},failure:function(xhr){}});}
catch(Exe)
{}},makePoint:function(x,y,reproject)
{var ll=new OpenLayers.Geometry.Point(x,y)
if(reproject)
ll=ll.transform(otp.util.GEOGRAPHIC,otp.util.WEB_MERCATOR);return ll;},RTE_ICON_SIZE:new OpenLayers.Size(105,34),RTE_ICON_OFFSET:new OpenLayers.Pixel(0,-34),RTE_ICON_OFFSET_LEFT:new OpenLayers.Pixel(-105,-34),ST_END_SIZE:new OpenLayers.Size(21,39),ST_END_OFFSET:new OpenLayers.Pixel(-10,-39),DISK_SIZE:new OpenLayers.Size(10,10),DISK_OFFSET:new OpenLayers.Pixel(-5,-5),useCustomIconsForAgencies:[],markerGraphicMapping:{walkMarker:'images/map/trip/mode/walk.png',walkMarkerLeft:'images/map/trip/mode/walk-left.png',bicycleMarker:'images/map/trip/mode/bicycle.png',fromWalkMarker:'images/map/trip/start-walk.png',fromBicycleMarker:'images/map/trip/start-bicycle.png',toMarker:'images/map/trip/end.png',fromMarker:'images/map/trip/start.png',diskMarker:'images/map/trip/xferdisk.png',routeMarker:function(feature){var imagePathOptions=Ext.apply({},{imageType:'marker'},feature.attributes);return otp.util.imagePathManager.imagePath(imagePathOptions);},routeMarkerLeft:function(feature){var imagePathOptions=Ext.apply({},{imageType:'marker'},feature.attributes);return otp.util.imagePathManager.imagePath(imagePathOptions);}},getMarkerStyle:function(){var template={externalGraphic:"${getExternalGraphic}",graphicOpacity:1};var graphicMapping=otp.util.OpenLayersUtils.markerGraphicMapping;var olutils=this;var context={getExternalGraphic:function(feature){var externalGraphic=graphicMapping[feature.attributes.type];return typeof externalGraphic==='function'?externalGraphic.call(olutils,feature):externalGraphic;}};var style=new OpenLayers.Style(template,{context:context});return style;},getMarkerUniqueValueRules:function(){return{walkMarker:{graphicWidth:this.RTE_ICON_SIZE.w,graphicHeight:this.RTE_ICON_SIZE.h,graphicXOffset:this.RTE_ICON_OFFSET.x,graphicYOffset:this.RTE_ICON_OFFSET.y},walkMarkerLeft:{graphicWidth:this.RTE_ICON_SIZE.w,graphicHeight:this.RTE_ICON_SIZE.h,graphicXOffset:this.RTE_ICON_OFFSET_LEFT.x,graphicYOffset:this.RTE_ICON_OFFSET_LEFT.y},fromWalkMarker:{graphicWidth:this.ST_END_SIZE.w,graphicHeight:this.ST_END_SIZE.h,graphicXOffset:this.ST_END_OFFSET.x,graphicYOffset:this.ST_END_OFFSET.y},fromBicycleMarker:{graphicWidth:this.ST_END_SIZE.w,graphicHeight:this.ST_END_SIZE.h,graphicXOffset:this.ST_END_OFFSET.x,graphicYOffset:this.ST_END_OFFSET.y},toMarker:{graphicWidth:this.ST_END_SIZE.w,graphicHeight:this.ST_END_SIZE.h,graphicXOffset:this.ST_END_OFFSET.x,graphicYOffset:this.ST_END_OFFSET.y},fromMarker:{graphicWidth:this.ST_END_SIZE.w,graphicHeight:this.ST_END_SIZE.h,graphicXOffset:this.ST_END_OFFSET.x,graphicYOffset:this.ST_END_OFFSET.y},diskMarker:{graphicWidth:this.DISK_SIZE.w,graphicHeight:this.DISK_SIZE.h,graphicXOffset:this.DISK_OFFSET.x,graphicYOffset:this.DISK_OFFSET.y},routeMarker:{graphicWidth:this.RTE_ICON_SIZE.w,graphicHeight:this.RTE_ICON_SIZE.h,graphicXOffset:this.RTE_ICON_OFFSET.x,graphicYOffset:this.RTE_ICON_OFFSET.y},routeMarkerLeft:{graphicWidth:this.RTE_ICON_SIZE.w,graphicHeight:this.RTE_ICON_SIZE.h,graphicXOffset:this.RTE_ICON_OFFSET_LEFT.x,graphicYOffset:this.RTE_ICON_OFFSET_LEFT.y}};},makeMarker:function(x,y,attributes)
{var point=new OpenLayers.Geometry.Point(x,y);var marker=new OpenLayers.Feature.Vector(point,attributes);return marker;},panZoomWithLimits:function(map,x,y,z,wideZoomLimit,closeZoomLimit,prj)
{try
{if(z&&z>=wideZoomLimit&&z<=closeZoomLimit)
{map.zoomTo(z);}
else if(map.getZoom()>closeZoomLimit)
{map.zoomTo(closeZoomLimit);}
else if(map.getZoom()<wideZoomLimit)
{map.zoomTo(wideZoomLimit);}
this.pan(map,x,y,prj);}
catch(ex)
{}},pan:function(map,x,y,prj)
{if(x&&y)
{var ll=this.getLonLat(map,x,y,prj);map.setCenter(ll);}},getLonLat:function(map,x,y,prj)
{var retVal=null;try
{if(prj==null)
prj=otp.core.MapStatic.dataProjection;retVal=new OpenLayers.LonLat(x,y).transform(prj,map.getProjectionObject());}
catch(e)
{console.log(e);}
return retVal;},roundCoord:function(coord)
{var retVal=coord;try
{if(retVal.lon&&retVal.lon>180)
{retVal.lon=Math.round(retVal.lon);}
if(retVal.lat&&retVal.lat>180)
{retVal.lat=Math.round(retVal.lat);}}
catch(e)
{console.log('OpenLayersUtils.roundCoord exception '+e);}
return retVal;},getLatLonOfPixel:function(map,pixelX,pixelY,prj)
{try
{if(prj==null)
prj=otp.core.MapStatic.dataProjection;var px=new OpenLayers.Pixel(pixelX,pixelY+this.yOffsetToTip);var lonLat=map.getLonLatFromPixel(px);lonLat.transform(map.getProjectionObject(),prj);return this.roundCoord(lonLat);}
catch(e)
{console.log('OpenLayersUtils.getLatLonOfPixel exception '+e);}},setCenterByPixel:function(center){var px=new OpenLayers.Pixel(center.x,center.y);var lon_lat=this.map.getLonLatFromPixel(px);this.map.setCenter(lon_lat);},zoomToLoadedFeatures:function(map,layer)
{try
{layer.events.on({"loadend":function(o,e)
{var dx=layer.getDataExtent();map.zoomToExtent(dx);}});}
catch(e)
{console.log("ERROR: "+e);}},makeZoomLink:function(inText,outText)
{if(inText==null||inText.length<1)
inText='Zoom in';if(outText==null||outText.length<1)
outText='Zoom out';return'<ul class=links>'+'<li>'+'<a href="#zoomIn" onclick="otp.core.MapSingleton.zoomIn();"   title="'+inText+'">'+inText+'</a>  '+' | '+'<a href="#zoomOut" onclick="otp.core.MapSingleton.zoomOut();" title="'+outText+'">'+outText+'</a>'+'</li>'+'</ul>';},setCenter:function(map,x,y,zoom,prj)
{try
{if(zoom&&(zoom<0||zoom>9))
{zoom=2;}
if(x&&y)
{var ll=this.getLonLat(map,x,y,prj);map.setCenter(ll,zoom);}
else if(zoom)
{map.zoomTo(zoom);}}
catch(e)
{console.log('OpenLayersUtils.setCenter exception '+e);}},hideAllLayers:function(layers)
{try
{for(var i in layers)
{if(layers[i]!=null&&!layers[i].isBaseLayer)
{layers[i].display(false);layers[i].setVisibility(false);}}}
catch(Err)
{}},clearPopups:function(map)
{try
{for(var i=0;i<map.popups.length;i++)
{var p=map.popups[i];if(p)
{p.hide();map.removePopup(p);}}}
catch(e)
{}},geo_json_converter:function(n,p){var formatter=new OpenLayers.Format.GeoJSON();var geoJsonObj=formatter.read(n,'Geometry');return geoJsonObj;},encoded_polyline_converter:function(n,p){var lat=0;var lon=0;var strIndex=0;var points=new Array();while(strIndex<n.length){var rLat=otp.util.OpenLayersUtils.decodeSignedNumberWithIndex(n,strIndex);lat=lat+rLat.number*1e-5;strIndex=rLat.index;var rLon=otp.util.OpenLayersUtils.decodeSignedNumberWithIndex(n,strIndex);lon=lon+rLon.number*1e-5;strIndex=rLon.index;var p=new OpenLayers.Geometry.Point(lon,lat);points.push(p);}
return new OpenLayers.Geometry.LineString(points);},decodeSignedNumber:function(value){var r=otp.util.OpenLayersUtils.decodeSignedNumberWithIndex(value,0);return r.number;},decodeSignedNumberWithIndex:function(value,index){var r=otp.util.OpenLayersUtils.decodeNumberWithIndex(value,index);var sgn_num=r.number;if((sgn_num&0x01)>0){sgn_num=~(sgn_num);}
r.number=sgn_num>>1;return r;},decodeNumber:function(value){var r=otp.util.OpenLayersUtils.decodeNumberWithIndex(value,0);return r.number;},decodeNumberWithIndex:function(value,index){if(value.length==0)
throw"string is empty";var num=0;var v=0;var shift=0;do{v1=value.charCodeAt(index++);v=v1-63;num|=(v&0x1f)<<shift;shift+=5;}while(v>=0x20);return{"number":num,"index":index};},CLASS_NAME:"otp.util.OpenLayersUtils"};
otp.namespace("otp.util");otp.util.ParseUrlParams={staticControl:null,m_params:null,m_arrays:null,m_url:null,initialize:function(config)
{try
{otp.configure(this,config);this.m_url=this.getUrl();this.m_arrays=this.parseQueryStrToArrays(this.m_url);this.m_params=this.arraysToStrings(this.m_arrays,null,true);}
catch(e)
{console.log("ParseUrlParams constructor "+e);}},getParamValue:function(name,defVal)
{var retVal=defVal;try
{if(this.m_params[name])
retVal=this.m_params[name];else if(this.m_params[name.toLowerCase()])
retVal=this.m_params[name.toLowerCase()];}
catch(e)
{console.log("exception: ",e,this);}
return retVal;},setParamValue:function(name,val)
{this.m_params[name]=val;},isDebug:function()
{return this.getParamValue("debug",false);},isFullScreen:function(name,defVal)
{return this.getParamValue("fullScreen",defVal);},hasSubmit:function(name,defVal)
{return this.getParamValue("submit",defVal);},showSatelliteView:function(name,defVal)
{return this.getParamValue("satellite",defVal);},getPoi:function(poi,map)
{var retVal={};try
{var params=this.m_params;retVal.x=params.pLon;retVal.y=params.pLat;retVal.z=params.zoom;retVal.t=params.pText;if(retVal.x==null)
retVal.x=params.lon;if(retVal.y==null)
retVal.y=params.lat;var h=retVal;if(poi&&h.t)
{poi.highlight(h.x,h.y,h.z,h.t);h.exists=(h.t!=null&&h.x!=null&&h.y!=null);}
else if(map)
{otp.util.OpenLayersUtils.setCenter(map,h.x,h.y,h.z);}}
catch(e)
{console.log("EXCEPTION: ParseUrlParams.getPoi "+e);}
return retVal;},parseQueryStrToStrings:function(q)
{var obj=this.parseQueryStrToArrays(q);return otp.util.StringFormattingUtils.arraysToStrings(obj);},parseQueryStrToArrays:function(q)
{var i;var name;var t;var x=q.replace(/;/g,'&').split('&');for(q={},i=0;i<x.length;i++){t=x[i].split('=',2);name=unescape(t[0]);if(!q[name])
q[name]=[];if(t.length>1){q[name][q[name].length]=unescape(t[1]);}
else
q[name][q[name].length]=true;}
return q;},getUrl:function()
{var fromHash='';var fromSubstring='';try{var fromSubstring=location.search.substring(1).replace(/\+/g,' ');}
catch(e){}
try{fromHash=location.hash.substring(2).replace(/\+/g,' ');}
catch(e){}
return fromHash.length!=0?fromHash:fromSubstring;},arraysToStrings:function(arrays,indx,blankVal)
{var retVal=[];var i=0;if(indx!=null&&indx>=0&&indx<=100)
i=indx;for(var p in arrays)
{var v=arrays[p][i];if(v==""&&blankVal)
v=blankVal;retVal[p]=v;}
return retVal;},getPlannerUrl:function(defVal)
{var retVal=defVal;try
{var u=this.getParamValue('purl');if(u!=null)
retVal=u;}
catch(exp)
{}
return retVal;},getGeocoderUrl:function(geoConfig)
{var retVal=null;try
{retVal=this.getParamValue('gurl');geoConfig.enabled=true;}
catch(exp)
{}
finally
{if(retVal==null&&geoConfig!=null&&geoConfig.url!=null)
retVal=geoConfig.url;}
return retVal;},CLASS_NAME:"otp.util.ParseUrlParams"};otp.util.ParseUrlParams=new otp.Class(otp.util.ParseUrlParams);
otp.namespace("otp.util");otp.util.SolrUtils={id:'id',total:'response.numFound',root:'response.docs',fields:[{name:'name'},{name:'address'},{name:'city'},{name:'url'},{name:'lat'},{name:'lon'},{name:'x'},{name:'y'},{name:'bbox'},{name:'bbox_ospn'},{name:'bbox_wgs84'},{name:'type'},{name:'type_name'},{name:'vtype'},{name:'number',type:'string'},{name:'pad_number'},{name:'weekday'},{name:'saturday'},{name:'sunday'},{name:'inbound_name'},{name:'outbound_name'},{name:'frequent'},{name:'id'},{name:'zone_id'},{name:'stop_id'},{name:'landmark_id'},{name:'amenities'},{name:'street_direction'},{name:'providers'},{name:'ada_boundary'},{name:'district_boundary'},{name:'spaces'},{name:'routes'},{name:'notes'},{name:'use'}],solrDataToVectors:function(records,isMercator)
{var retVal=[];for(var i=0;i<records.length;i++)
{var d=records[i].data;var x=d.x;var y=d.y;if(isMercator)
{x=d.lon;y=d.lat;}
var p=otp.util.OpenLayersUtils.makePoint(x,y,isMercator);var v=new OpenLayers.Feature.Vector(p,d);d.feature=v;retVal.push(v);}
return retVal;},solrRecordToObject:function(record)
{var data=[];var el=this.fields;for(var i in el)
{var n=el[i].name;var r=record.get(n);if(n!=null&&r!=null)
data[n]=r;}
return data;},makeSolrStore:function(url,config)
{if(url==null)
{if(otp.isLocalHost())
url='/js/otp/planner/test/solr-geo.json';else
url='/solr/select';}
return otp.util.ExtUtils.makeJsonStore(url,this.id,this.total,this.root,this.fields,config);},CLASS_NAME:"otp.util.SolrUtils"};
otp.namespace("otp.util");otp.util.StringFormattingUtils={currency:function(str)
{var num=str.toString().replace(/\$|\,/g,'');if(isNaN(num))
num="0";var sign=(num==(num=Math.abs(num)));num=Math.floor(num*100+0.50000000001);var cents=num%100;num=Math.floor(num/100).toString();if(cents<10)
cents="0"+cents;for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)
num=num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));return(((sign)?'':'-')+'$'+num+'.'+cents);},timeSpan:function(startTime,endTime,locale,sep)
{var retVal=startTime+sep+endTime;try
{if(sep==null)sep=" - ";if(locale==null)locale=otp.config.locale;var tf=locale.time.time_format;var s=startTime.format(tf);var e=endTime.format(tf);retVal=s+sep+e;}
catch(e)
{}
return retVal;},durationHoursMins:function(durr,locale,sep)
{var retVal=durr;try
{if(sep==null)sep=" ";if(locale==null)locale=otp.config.locale;if(durr>=60.0&&locale.CLASS_NAME==otp.locale.English.CLASS_NAME)
{var hrs=Math.floor(durr/60);var mins=durr%60;var m=(mins==1)?locale.time.minute_abbrev:locale.time.minutes_abbrev;var h=(hrs==1)?locale.time.hour_abbrev:locale.time.hours_abbrev;retVal=hrs+" "+h+sep+mins+" "+m;}
else
{var m=(mins==1)?locale.time.minute_abbrev:locale.time.minutes_abbrev;retVal=durr+" "+m;}}
catch(e)
{}
return retVal;},numSinglePlural:function(numVal,singleStr,pluralStr,sep)
{var retVal="";try
{if(sep==null)sep=" ";if(numVal)
{if(numVal==1)
retVal=numVal+sep+singleStr;else
retVal=numVal+sep+pluralStr;}}
catch(e)
{}
return retVal;},singlePluralNum:function(numVal,singleStr,pluralStr,sep)
{var retVal="";try
{if(sep==null)sep=" ";if(locale==null)locale=otp.config.locale;if(numVal)
{if(numVal==1)
retVal=singleStr+sep+numVal;else
retVal=pluralStr+sep+numVal;}}
catch(e)
{}
return retVal;},percent:function(inStr,symbol)
{var retVal=inStr;try
{if(inStr<=1.0)
{retVal=Math.round(inStr*100);}
if(symbol==true)
symbol="%";if(symbol!=null)
retVal+=symbol;}
catch(e)
{}
return retVal;},formatDate:function(str)
{var retVal=str;if(str.length==6)
retVal=str.substr(4)+' / '+str.substr(0,4);return retVal;},isEmptyValue:function(str,elName)
{if(str===null)return true;if(str==='')return true;var items=['price','year','date'];for(var i in items)
{var n=items[i];if(elName.contains(n))
{if(str===0||str==='0')
return true;break;}}
return false;},getDirectionString:function(dir,directions,preStr,postStr,capitolize,defVal)
{var retVal='';var dirStr=this.getDirection(dir,directions,capitolize,defVal);if(dirStr&&dirStr.length>1)
{if(preStr&&preStr.length>0)
retVal+=preStr;retVal=dirStr;if(postStr&&postStr.length>0)
retVal+=postStr;}
return retVal;},getDirection:function(dir,directions,capitolize,defVal)
{if(directions==null||directions.split!=null)
directions=otp.locale.English.directions;if(defVal==null)
defVal=dir;var retVal=defVal;try
{switch(dir.toLowerCase())
{case'n':retVal=directions.north;break;case's':retVal=directions.south;break;case'e':retVal=directions.east;break;case'w':retVal=directions.west;break;case'se':retVal=directions.southEast;break;case'ne':retVal=directions.northEast;break;case'sw':retVal=directions.southWest;break;case'nw':retVal=directions.northWest;break;default:return defVal;}
if(capitolize)
{retVal=this.capitolize(retVal);}}
catch(Exp)
{}
return retVal;},capitolize:function(inWord)
{var retVal=inWord;if(inWord!=null&&typeof(inWord)=='string'&&inWord.length>1)
{var t=retVal.substring(0,1).toUpperCase();var u=retVal.substring(1);retVal=t+u;}
return retVal;},padRouteID:function(num)
{var retVal=num;if(num.length==1)
retVal='00'+num;else if(num.length==2)
retVal='0'+num;return retVal;},serviceDayString:function(v)
{var retVal="";if(v.weekday&&v.saturday&&v.sunday)
retVal="All Days";else
{if(v.weekday)retVal="Weekdays";if(v.saturday)
{if(retVal.length>0)
retVal+=" / "
retVal+="Saturday";}
if(v.sunday)
{if(retVal.length>0)
retVal+=" / "
retVal+="Sunday";}}
if(retVal.length>0)
retVal='<b>Service Days: </b>'+retVal;else
retVal='<b>Service Note: </b> this route <B>lacks</B> a fixed schedule (it could be a future service preview or a shuttle lacking a formal schedule).';return retVal;},arraysToStrings:function(arrays,indx,blankVal)
{var retVal=[];var i=0;if(indx!=null&&indx>=0&&indx<=100)
i=indx;for(var p in arrays)
{var v=arrays[p][i];if(v==""&&blankVal)
v=blankVal;retVal[p]=v;}
return retVal;},stripNonPrints:function(inStr)
{return inStr.replace(/[^a-zA-Z0-9&@()*_\-\', ]/g,"");},stripCurseWords:function(inStr)
{var retVal=inStr;return retVal;},maxLen:function(inStr,maxSize)
{if(!maxSize)maxSize=100;if(!inStr.length>maxSize)
inStr=inStr.substr(0,maxSize);return inStr;},clean:function(inStr,defStr,maxSize)
{var retVal=inStr;try
{if(!defStr)defStr=inStr;inStr=this.stripNonPrints(inStr);inStr=this.stripCurseWords(inStr);inStr=this.maxLen(inStr,maxSize);retVal=inStr;}
catch(ex)
{retVal=defStr;}
return retVal;},CLASS_NAME:"otp.util.StringFormattingUtils"};
otp.namespace("otp.planner");function millisToMinutes(n,p){return parseInt(n/60000);}
function secondsToMinutes(n,p){return parseInt(n/60);}
try
{otp.planner.Utils={TRIPDETAILS_TREE:'tripdetails-tree',ITINERARIES_TREE:'itineraries-tree',TRIP_TAB:'trip-tab-',DETAILS_CLS:'itinys-node',ITIN_CLS:'itinys-node',FROM_ID:'from',TRIP_ID:'trip',TO_ID:'to',ITIN_RECORD:new Ext.data.Record.create(['id','description',{name:'viaRoute',mapping:'@viaRoute'},{name:'regularFare',mapping:'fare',convert:function(val,rec){return otp.planner.Utils.getFare(rec,'regular');}},{name:'seniorFare',mapping:'fare',convert:function(val,rec){return otp.planner.Utils.getFare(rec,'senior');}},{name:'studentFare',mapping:'fare',convert:function(val,rec){return otp.planner.Utils.getFare(rec,'student');}},{name:'duration',mapping:'duration',convert:millisToMinutes},{name:'startTime',mapping:'startTime',convert:otp.util.DateUtils.isoDateStringToDate},{name:'endTime',mapping:'endTime',convert:otp.util.DateUtils.isoDateStringToDate},{name:'startTimeDisplay',mapping:'startTime',convert:otp.util.DateUtils.prettyDateTime},{name:'endTimeDisplay',mapping:'endTime',convert:otp.util.DateUtils.prettyDateTime},{name:'numTransfers',mapping:'transfers'},{name:'numLegs',mapping:'itinerary/legs',convert:function(val,rec){return otp.planner.Utils.numLegs(val,rec);}},{name:'modes',mapping:'itinerary/legs',convert:function(val,rec){return otp.planner.Utils.getModes(rec);}},{name:'walkDistance',mapping:'walkDistance',convert:function(val,rec){return otp.planner.Utils.prettyDistance(val);}},{name:'walkTime',mapping:'walkTime',convert:secondsToMinutes},{name:'transitTime',mapping:'transitTime',convert:secondsToMinutes},{name:'waitingTime',mapping:'waitingTime',convert:secondsToMinutes}]),LEG_RECORD:new Ext.data.Record.create([{name:'id',mapping:'@id'},{name:'mode',mapping:'@mode'},{name:'agencyId',mapping:'@agencyId'},{name:'agencyName',mapping:'@agencyName'},{name:'agencyUrl',mapping:'@agencyUrl'},{name:'headsign',mapping:'@headsign'},{name:'order',mapping:'@order'},{name:'interline',mapping:'@interlineWithPreviousLeg'},{name:'startTime',mapping:'startTime',convert:otp.util.DateUtils.isoDateStringToDate},{name:'endTime',mapping:'endTime',convert:otp.util.DateUtils.isoDateStringToDate},{name:'startTimeDisplayShort',mapping:'startTime',convert:otp.util.DateUtils.prettyTime},{name:'endTimeDisplayShort',mapping:'endTime',convert:otp.util.DateUtils.prettyTime},{name:'duration',mapping:'duration',convert:millisToMinutes},{name:'distance',mapping:'distance',convert:function(val,rec){return otp.planner.Utils.prettyDistance(val);}},{name:'direction',mapping:'direction'},{name:'key',mapping:'key'},{name:'alerts',mapping:'leg',convert:function(val,rec){return otp.planner.Utils.getAlerts(rec);}},{name:'routeShortName',mapping:'@route'},{name:'routeLongName',mapping:'@routeLongName'},{name:'fromName',mapping:'from/name'},{name:'fromDescription',mapping:'from/description'},{name:'fromStopCode',mapping:'from/stopCode'},{name:'toName',mapping:'to/name'},{name:'toDescription',mapping:'to/description'},{name:'toStopCode',mapping:'to/stopCode'},{name:'steps',mapping:'steps',convert:function(val,rec){return otp.planner.Utils.makeWalkSteps(rec)}},{name:'legGeometry',mapping:'legGeometry/points',convert:function(val,rec){return otp.util.OpenLayersUtils.encoded_polyline_converter(val,rec)}}]),domSelect:function(nodeName,xml)
{return Ext.DomQuery.select(nodeName,xml);},getModes:function(legs)
{var retVal=null;for(var i=0;i<legs.length;i++)
{var node=legs[i];var mode=Ext.DomQuery.selectValue('mode',node);var rte=Ext.DomQuery.selectValue('routeShortName',node);if(rte)
{console.log(rte);}}
return retVal;},numLegs:function(legs)
{return-111;},getAlerts:function(rec)
{var nodes=Ext.DomQuery.select('notes',rec);var alerts=[];for(var i=0;i<nodes.length;i++)
{var node=nodes[i];var x=Ext.DomQuery.selectValue('text',node);if(x)
{alerts.push(x);}}
return alerts;},makeWalkSteps:function(rec)
{var nodes=Ext.DomQuery.select('steps/walkSteps',rec);var steps=[];for(var i=0;i<nodes.length;i++)
{var node=nodes[i];var step={};step.distance=Ext.DomQuery.selectNumber('distance',node);step.streetName=Ext.DomQuery.selectValue('streetName',node);if(!step.streetName)
{step.streetName="unnamed street";}
step.absoluteDirection=Ext.DomQuery.selectValue('absoluteDirection',node);step.relativeDirection=Ext.DomQuery.selectValue('relativeDirection',node);step.stayOn=(Ext.DomQuery.selectValue('stayOn',node).toLowerCase()==='true');step.lon=Ext.DomQuery.selectNumber('lon',node);step.lat=Ext.DomQuery.selectNumber('lat',node);step.elevation=Ext.DomQuery.selectValue('elevation',node);step.exit=Ext.DomQuery.selectValue('exit',node);steps.push(step);}
return steps;},getFare:function(rec,fareType)
{var nodes=Ext.DomQuery.select('fare/entry',rec);var fare=null;for(var i=0;i<nodes.length;i++)
{if(Ext.DomQuery.selectValue('key',rec)===fareType)
{var cents=parseInt(Ext.DomQuery.selectValue('value/cents',rec));fare=this.formatMoney(cents);}}
if(!fare&&otp.config.default_fares&&otp.config.default_fares[fareType])
{var sym='';if(otp.config.default_fares[fareType].indexOf(otp.config.locale.labels.fare_symbol)<0)
sym=otp.config.locale.labels.fare_symbol;fare=sym+otp.config.default_fares[fareType]}
return fare;},formatMoney:function(cents){var retVal=cents;var v=cents/100;v=(Math.round((v-0)*100))/100;v=(v==Math.floor(v))?v+".00":((v*10==Math.floor(v*10))?v+"0":v);v=String(v);var ps=v.split('.'),whole=ps[0],sub=ps[1]?'.'+ps[1]:'.00',r=/(\d+)(\d{3})/;while(r.test(whole)){whole=whole.replace(r,'$1'+','+'$2');}
v=whole+sub;if(v.charAt(0)=='-'){retVal='-'+otp.config.locale.labels.fare_symbol+v.substr(1);}
else{retVal=otp.config.locale.labels.fare_symbol+v;}
return retVal;},makeItinerariesTree:function(id,clickCallback,scope)
{var thisID=this.ITINERARIES_TREE+"-"+id;var root=otp.util.ExtUtils.makeTreeNode({id:'root-'+thisID,text:'<strong>'+id+'</strong>',cls:this.ITIN_CLS,iconCls:this.ITIN_CLS,leaf:false},clickCallback,scope);var retVal=new Ext.tree.TreePanel({root:root,id:thisID,lines:false,collapsible:false,rootVisible:false,margins:'0 0 0 0',cmargins:'0 0 0 0'});return retVal;},makeTripDetailsTree:function(id,clickCallback,scope)
{var thisID=this.TRIPDETAILS_TREE+"-"+id;var root=otp.util.ExtUtils.makeTreeNode({id:'root-'+thisID,text:'<strong>'+id+'</strong>',cls:this.DETAIL_CLS,iconCls:this.DETAIL_CLS,leaf:false},clickCallback,scope);var retVal=new Ext.tree.TreePanel({plugins:new Ext.tree.NodeMouseoverPlugin(),root:root,id:thisID,lines:false,collapsible:false,rootVisible:false,collapseFirst:false,margins:'0 0 0 0',cmargins:'0 0 0 0'});return retVal;},makeTripTab:function(id,title,itinTree,detailsTree,buttons)
{var retVal=new Ext.Panel({id:this.TRIP_TAB+id,title:title,tabTip:title,headerAsText:false,cls:'preview single-preview',closable:true,autoScroll:true,border:false,buttonAlign:'center',buttons:buttons.length>0?buttons:null,items:[itinTree,detailsTree]});return retVal;},makeFromStore:function(){return otp.util.ExtUtils.makePointStore('leg','from');},makeToStore:function(){return otp.util.ExtUtils.makePointStore('leg','to');},makeLegStore:function()
{var retVal=null;try
{retVal=new Ext.data.Store({fields:this.LEG_RECORD,reader:new Ext.data.XmlReader({record:'leg'},this.LEG_RECORD)});}
catch(e)
{console.log("EXCEPTION in planner.Utils.makeLegStore(): "+e);}
return retVal;},makeItinerariesStore:function()
{var retVal=null;try
{retVal=new Ext.data.Store({fields:this.ITIN_RECORD,reader:new Ext.data.XmlReader({record:'itinerary'},this.ITIN_RECORD)});}
catch(e)
{console.log("EXCEPTION in planner.Utils.makeItinerariesStore(): "+e);}
return retVal;},bikeMinimum:function()
{var retVal=5000;try
{if(otp.config.metricsSystem=='english')
retVal=4828;}
catch(e)
{}
return retVal;},prettyDistance:function(meters)
{var retVal="";if(meters==null||typeof meters=='undefined')
{retVal="";}
else if(otp.config.metricsSystem=='english')
{var miles=(meters/1609.344).toFixed(1);if(miles<0.1){retVal=parseInt(meters*3.2808)+" ft";}else{retVal=miles+" mi";}}
else
{var km=meters/1000.0;if(km<1){retVal=parseInt(meters)+" m";}else{retVal=km.toFixed(2)+" km";}}
return retVal;},supportsCanvas:function(){var c=document.createElement('canvas');if(typeof G_vmlCanvasManager!="undefined"){c=G_vmlCanvasManager.initElement(c);}
return!!c.getContext;},CLASS_NAME:"otp.planner.Utils"};}
catch(e)
{console.log("planner.Utils Ext exception can be ignored -- just means you aren't including Ext.js in your app, which is OK:"+e);};
otp.namespace("otp.planner");otp.planner.BikeTriangle={container:null,locale:null,panel:null,cursor_size:19,triangleTimeFactor:null,triangleSlopeFactor:null,triangleSafetyFactor:null,timeFactor:0.0,slopeFactor:0.0,safetyFactor:1.0,colorPanel:'#e6e6e6',colorTriangle:'#ddd',colorSlope:'#47ad4a',colorSafety:'#80bee7',colorTime:'#e59a00',initialize:function(config){otp.configure(this,config);this.panel=new Ext.Panel({id:'trip-bike-triangle',name:'bikeTriangle',title:null});var THIS=this;this.panel.on({render:function(obj){THIS.render(THIS.container.getWidth(),120,THIS.locale);}});},render:function(width,height,locale){var tri_side=2*(height-this.cursor_size)*1/Math.sqrt(3);var margin=this.cursor_size/2;var canvas=Raphael(this.panel.body.id,width,height);var bg=canvas.rect(0,0,width,height).attr({stroke:'none',fill:this.colorPanel});var triangle=canvas.path(["M",margin+tri_side/2,margin,"L",margin+tri_side,height-margin,"L",margin,height-margin,"z"]);triangle.attr({fill:this.colorTriangle,stroke:"none"});var labelSize="18px";var safeFill=this.colorSafety;var safeName=locale.bikeTriangle.safeName;var safeSym=locale.bikeTriangle.safeSym;var hillFill=this.colorSlope;var hillName=locale.bikeTriangle.hillName;var hillSym=locale.bikeTriangle.hillSym;var timeFill=this.colorTime;var timeName=locale.bikeTriangle.timeName;var timeSym=locale.bikeTriangle.timeSym;var labelT=canvas.text(margin+tri_side/2,margin+24,timeSym);labelT.attr({fill:timeFill,"font-size":labelSize,"font-weight":"bold"});var labelH=canvas.text(margin+22,height-margin-14,hillSym);labelH.attr({fill:hillFill,"font-size":labelSize,"font-weight":"bold"});var labelS=canvas.text(margin+tri_side-22,height-margin-14,safeSym);labelS.attr({fill:safeFill,"font-size":labelSize,"font-weight":"bold"});var barLeft=margin*2+tri_side;var barWidth=width-margin*3-tri_side;var barHeight=(height-margin*4)/3;var timeBar=canvas.rect(barLeft,margin,barWidth*.333,barHeight);timeBar.attr({fill:timeFill,stroke:"none"});var topoBar=canvas.rect(barLeft,margin*2+barHeight,barWidth*.333,barHeight);topoBar.attr({fill:hillFill,stroke:"none"});var safetyBar=canvas.rect(barLeft,margin*3+barHeight*2,barWidth*.333,barHeight);safetyBar.attr({fill:safeFill,stroke:"none"});var timeLabel=canvas.text(barLeft+barWidth/2,margin+barHeight/2,timeName+": 33%");timeLabel.attr({"font-size":"16px",opacity:1});var topoLabel=canvas.text(barLeft+barWidth/2,margin*2+barHeight+barHeight/2,hillName+": 33%");topoLabel.attr({"font-size":"16px",opacity:1});var safetyLabel=canvas.text(barLeft+barWidth/2,margin*3+barHeight*2+barHeight/2,safeName+": 33%");safetyLabel.attr({"font-size":"16px",opacity:1});var cx=margin+tri_side/2,cy=height-margin-(1/Math.sqrt(3))*(tri_side/2);var cursorVert=canvas.rect(cx-.5,cy-this.cursor_size/2-2,1,this.cursor_size+4).attr({fill:"rgb(0,0,0)",stroke:"none"});var cursorHoriz=canvas.rect(cx-this.cursor_size/2-2,cy-.5,this.cursor_size+4,1).attr({fill:"rgb(0,0,0)",stroke:"none"});var cursor=canvas.circle(cx,cy,this.cursor_size/2).attr({fill:"rgb(128,128,128)",stroke:"none",opacity:0.25});var time,topo,safety;var thisBT=this;var animTime=250;var start=function(){this.ox=this.attr("cx");this.oy=this.attr("cy");timeBar.animate({opacity:.25},animTime);topoBar.animateWith(timeBar,{opacity:.25},animTime);safetyBar.animateWith(timeBar,{opacity:.25},animTime);},move=function(dx,dy){var nx=this.ox+dx,ny=this.oy+dy;if(ny>height-margin)ny=height-margin;if(ny<margin)ny=margin;var offset=(ny-margin)/(height-margin*2)*tri_side/2;if(nx<margin+(tri_side/2)-offset)nx=margin+(tri_side/2)-offset;if(nx>margin+(tri_side/2)+offset)nx=margin+(tri_side/2)+offset;time=((height-2*margin)-(ny-margin))/(height-2*margin);topo=thisBT.distToSegment(nx,ny,margin+tri_side/2,margin,margin+tri_side,height-margin)/(height-2*margin);safety=1-time-topo;timeBar.attr({width:barWidth*time});topoBar.attr({width:barWidth*topo});safetyBar.attr({width:barWidth*safety});timeLabel.attr("text",timeName+": "+Math.round(time*100)+"%");topoLabel.attr("text",hillName+": "+Math.round(topo*100)+"%");safetyLabel.attr("text",safeName+": "+Math.round(safety*100)+"%");this.attr({cx:nx,cy:ny});cursorVert.attr({x:nx-.5,y:ny-thisBT.cursor_size/2-2});cursorHoriz.attr({x:nx-thisBT.cursor_size/2-2,y:ny-.5});},up=function(){timeBar.animate({opacity:1},animTime);topoBar.animateWith(timeBar,{opacity:1},animTime);safetyBar.animateWith(timeBar,{opacity:1},animTime);if(topo<0.005){topo=0.0;}
thisBT.timeFactor=time;thisBT.slopeFactor=topo;thisBT.safetyFactor=safety;};cursor.drag(move,start,up);cursor.mouseover(function(){this.animate({opacity:0.5},animTime);});cursor.mouseout(function(){this.animate({opacity:0.25},animTime);});},enable:function(){if(this.container.findById('trip-bike-triangle')==null){this.container.add(this.panel);}
this.panel.show();this.container.doLayout();},disable:function(){if(!this.panel.hidden){this.panel.hide();}},distance:function(x1,y1,x2,y2){return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));},distToSegment:function(px,py,x1,y1,x2,y2){var r,dx,dy;dx=x2-x1;dy=y2-y1;r=((px-x1)*dx+(py-y1)*dy)/(dx*dx+dy*dy);return this.distance(px,py,(1-r)*x1+r*x2,(1-r)*y1+r*y2);},setSHT:function(safe,hills,time){this.safetyFactor=otp.util.ObjUtils.toFloat(safe,1.0);this.slopeFactor=otp.util.ObjUtils.toFloat(hills,0.0);this.timeFactor=otp.util.ObjUtils.toFloat(time,0.0);},getFormData:function(){return{triangleTimeFactor:this.timeFactor,triangleSlopeFactor:this.slopeFactor,triangleSafetyFactor:this.safetyFactor}},CLASS_NAME:"otp.planner.BikeTriangle"};otp.planner.BikeTriangle=new otp.Class(otp.planner.BikeTriangle);
otp.namespace("otp.planner");otp.planner.ContextMenu={map:null,forms:null,elements:null,renderTo:null,clickX:null,clickY:null,locale:null,constructor:function(config){otp.configure(this,config);if(this.renderTo==null){this.renderTo=Ext.get(otp.util.OpenLayersUtils.MAP_PANEL);}
var opts={renderTo:this.renderTo,items:this.getElements(),enableScrolling:false};this.renderTo.on('contextmenu',function(event){var x=event.xy[0];var y=event.xy[1];this.clickX=x-this.container.getX();this.clickY=y-this.container.getY();if(y+this.getHeight()>this.container.getHeight()+this.container.getY()){y=y-this.getHeight();}
if(x+this.getWidth()>this.container.getWidth()+this.container.getX()){x=x-this.getWidth();}
this.showAt([x,y]);event.stopEvent();},this);this.renderTo.on('click',function(event){this.hide();},this);this.renderTo.on('blur',function(event){this.hide();},this);Ext.menu.Menu.call(this,opts);},getElements:function()
{if(this.elements)
return this.elements;this.elements=new Array();var fcm=false;if(this.forms)
{this.elements.push(this.forms.getContextMenu(this));fcm=true;}
if(this.map)
{var mcm=this.map.getContextMenu(this);if(mcm!=null&&mcm.length>0)
{if(fcm)
this.elements.push('-');this.elements.push(mcm);}}
return this.elements;},getMapCoordinate:function(){return otp.util.OpenLayersUtils.getLatLonOfPixel(this.map.getMap(),this.clickX,this.clickY);},getYOffsetMapCoordinate:function(){return otp.util.OpenLayersUtils.getLatLonOfPixel(this.map.getMap(),this.clickX,this.clickY-otp.util.OpenLayersUtils.yOffsetToTip);},centerMapFromContextMenuXY:function()
{this.map.centerMapAtPixel(this.clickX,this.clickY);},CLASS_NAME:"otp.planner.ContextMenu"};otp.planner.ContextMenu=Ext.extend(Ext.menu.Menu,otp.planner.ContextMenu);
otp.namespace("otp.planner");otp.planner.StaticForms={FIELD_ANCHOR:'95%',routerId:null,preferredRoutes:'',unpreferredRoutes:'',bannedRoutes:'',bannedStops:'',locale:null,planner:null,contextMenu:null,poi:null,url:'/otp-rest-servlet/ws/plan',fromToOverride:null,geocoder:null,m_panel:null,m_fromForm:null,m_toForm:null,m_intermediatePlaces:null,m_interPlacesPanel:null,m_date:null,m_time:null,m_arriveByStore:null,m_arriveByForm:null,m_maxWalkDistanceStore:null,m_maxWalkDistanceForm:null,m_walkSpeedStore:null,m_walkSpeedForm:null,m_optimizeStore:null,m_optimizeForm:null,m_modeStore:null,m_modeForm:null,m_wheelchairForm:null,m_optionsManager:null,m_bikeTriangle:null,m_bikeTriangleContainer:null,m_submitButton:null,m_xmlRespRecord:null,m_fromToFP:null,THIS:null,initialize:function(config)
{otp.configure(this,config);this.routerId=config.routerId;if(this.m_xmlRespRecord==null)
this.m_xmlRespRecord=new Ext.data.XmlReader({record:'response',success:'@success'},['date','time','from','to','locations','fromList','toList']);config.form=this;this.geocoder=new otp.planner.Geocoder(config);this.makeMainPanel();this.THIS=this;otp.planner.StaticForms.THIS=this;},getPanel:function()
{return this.m_panel;},blurForms:function()
{try
{this.m_fromForm.blur();this.m_toForm.blur();}
catch(e)
{}},checkForSubmitErrorMessage:function()
{var mess=null;if(this.m_fromForm.getComboBox().activeError||this.m_toForm.getComboBox().activeError)
mess=this.locale.tripPlanner.geocoder.msg_content;var f=this.m_fromForm.getNamedCoord()==null;var t=this.m_toForm.getNamedCoord()==null;if(f&&t)
mess=this.locale.tripPlanner.msgcodes['460'];else if(f)
mess=this.locale.tripPlanner.msgcodes['440'];else if(t)
mess=this.locale.tripPlanner.msgcodes['450'];return mess;},submit:function()
{this.blurForms();var mess=this.checkForSubmitErrorMessage();if(mess)
{Ext.Msg.show({title:this.locale.tripPlanner.geocoder.msg_title,msg:mess});setTimeout(function(){Ext.Msg.hide();},4000);return;}
this.collapseComboBoxes();this.hideErrorDialogs();otp.util.ExtUtils.setTripPlannerCookie();var added_params={}
if(this.m_bikeTriangle&&this.m_optimizeForm.getValue()=="TRIANGLE")
added_params=this.m_bikeTriangle.getFormData();var intPlacesItems=this.m_interPlacesPanel.items;if(intPlacesItems!=null)
{var intPlacesArr=[];for(var i=0;i<intPlacesItems.getCount();i++){var comp=intPlacesItems.itemAt(i);intPlacesArr.push(comp.field.getValue());}
if(intPlacesArr.length>0){added_params.intermediatePlaces=intPlacesArr;}}
if(otp.util.ObjUtils.isNumber(this.planner.maxTransfers)&&this.planner.maxTransfers>=0&&this.planner.maxTransfers<=1000)
added_params.maxTransfers=this.planner.maxTransfers;if(this.routerId)
added_params.routerId=this.routerId;if(this.preferredRoutes)
added_params.preferredRoutes=this.preferredRoutes;if(this.unpreferredRoutes)
added_params.unpreferredRoutes=this.unpreferredRoutes;if(this.bannedRoutes)
added_params.bannedRoutes=this.bannedRoutes;if(this.bannedStops)
added_params.bannedStops=this.bannedStops;var data={method:'GET',url:this.url,waitMsg:this.locale.tripPlanner.labels.submitMsg,params:added_params}
this.m_panel.form.submit(data);otp.util.Analytics.gaEvent(otp.util.Analytics.OTP_TRIP_SUBMIT);},preSubmit:function(form,action)
{this.m_fromForm.persist();this.m_toForm.persist();this.collapseComboBoxes();this.hideErrorDialogs();var fromPlace=this.m_fromForm.getNamedCoord();var toPlace=this.m_toForm.getNamedCoord();var time=otp.util.DateUtils.parseTime(this.m_time.getRawValue(),this.locale.time.time_format);var date=otp.util.DateUtils.dateToIsoDateString(this.m_date.getValue(),this.m_date.getRawValue());form.setValues({fromPlace:fromPlace,toPlace:toPlace,date:date,time:time});},submitSuccess:function(form,action)
{var result=this.planner.newTripPlan(action.response.responseXML,this.getFormData());if(!result)
{this.tripRequestError(action.response.responseXML);return;}
if(this.poi)this.poi.clearTrip();otp.util.Analytics.gaEvent(otp.util.Analytics.OTP_TRIP_SUCCESS);},submitFailure:function(form,action)
{var xml=null;if(action&&action.response&&action.response.responseXML)
xml=action.response.responseXML;this.m_submitButton.focus();this.tripRequestError(xml);},tripRequestError:function(xml)
{var message=null;try
{var e=Ext.DomQuery.select('error',xml);var err=Ext.DomQuery.selectNode('error',xml);var code=Ext.DomQuery.selectValue('id',err);message=Ext.DomQuery.selectValue('msg',err);if(!message&&code)
{try
{code=parseInt(code);}
catch(e)
{code=500;}
message=this.locale.tripPlanner.msgcodes[code]||this.locale.tripPlanner.msgcodes[500];}
otp.util.Analytics.gaEvent(otp.util.Analytics.OTP_TRIP_ERROR);}
catch(e)
{console.log("exception with somethingorother: "+e);}
if(message==null||message=='')
message=this.locale.tripPlanner.error.deadMsg;Ext.MessageBox.show({title:this.locale.tripPlanner.error.title,msg:message,buttons:Ext.Msg.OK,icon:Ext.MessageBox.ERROR,animEl:'tp-error-message',minWidth:170,maxWidth:270});setTimeout(function()
{try{Ext.MessageBox.hide();}catch(e){}},5000);},clear:function()
{this.collapseComboBoxes();this.hideErrorDialogs();this.clearFrom(true);this.clearTo(true);this.m_submitButton.enable();this.m_submitButton.focus();},collapseComboBoxes:function()
{try
{this.m_fromForm.collapse();this.m_toForm.collapse();}
catch(e)
{console.log("Forms.collapseComboBox "+e);}},hideErrorDialogs:function()
{try{Ext.MessageBox.hide();}catch(e){}
try{this.m_geoErrorPopup.close();}catch(e){}},focus:function()
{this.THIS.planner.focus();},setFrom:function(fString,lat,lon,moveMap,noPoi)
{this.THIS.focus();this.THIS.m_fromForm.setNameLatLon(fString,lat,lon,null,true);if(!noPoi)
this.THIS.poi.setFrom(lon,lat,null,moveMap);},setTo:function(tString,lat,lon,moveMap,noPoi)
{this.THIS.focus();this.THIS.m_toForm.setNameLatLon(tString,lat,lon,null,true);if(!noPoi)
this.THIS.poi.setTo(lon,lat,null,moveMap);},setDirtyRawInput:function(p,f,d)
{var retVal=false;if(p!=null&&p!==true&&p!="true")
{var dirty=true;otp.util.ExtUtils.formSetRawValue(f,p,d,dirty);retVal=true;}
return retVal;},setFormGeocodeName:function(p,f)
{var retVal=false;if(p!=null&&p!==true&&p!="true"&&p.match('Address, .*Stop ID')==null)
{if(p.indexOf(" @ ")>3)
{p=p.replace(/ @ /," & ")}
f.setNamedCoord(p,null,true);retVal=true;}
return retVal;},parseMode:function(mode)
{var retVal=mode;try
{if(mode=='A')retVal='TRANSIT,WALK';if(mode=='B')retVal='BUSISH,WALK';if(mode=='T')retVal='TRAINISH,WALK';}
catch(e)
{}
return retVal;},parseOptimize:function(opt)
{var retVal=opt;try
{if(opt=='T')retVal='QUICK';if(opt=='X')retVal='TRANSFERS';}
catch(e)
{}
return retVal;},populate:function(params)
{var forms=this;if(params)
{this.clearFrom(true);this.clearTo(true);if(params.from&&params.xo&&params.yo)
{forms.m_fromForm.setNameLatLon(params.from,params.xo,params.yo,null,true);}
else
{this.setFormGeocodeName(params.Orig,forms.m_fromForm);this.setFormGeocodeName(params.Floc,forms.m_fromForm);this.setFormGeocodeName(params.from,forms.m_fromForm);}
this.setFormGeocodeName(params.fromPlace,forms.m_fromForm);if(params.to&&params.xd&&params.yd)
{forms.m_toForm.setNameLatLon(params.to,params.xd,params.yd,null,true);}
else
{this.setFormGeocodeName(params.Dest,forms.m_toForm);this.setFormGeocodeName(params.Tloc,forms.m_toForm);this.setFormGeocodeName(params.to,forms.m_toForm);}
this.setFormGeocodeName(params.toPlace,forms.m_toForm);if(this.THIS.poi)
{this.THIS.poi.setFromCoord(this.THIS.m_fromForm.geocodeCoord);this.THIS.poi.setToCoord(this.THIS.m_toForm.geocodeCoord);}
if(this.m_bikeTriangle)
this.m_bikeTriangle.setSHT(params.triangleSafetyFactor,params.triangleSlopeFactor,params.triangleTimeFactor);var time=false;var date=false;if(params.date)
{forms.m_date.setRawValue(params.date);date=true;}
else if(params.on)
{forms.m_date.setRawValue(params.on);date=true;}
if(params.arrParam&&(params.arrParam.indexOf("rive")>0||params.arrParam=="true"))
forms.m_arriveByForm.setValue('true');if(params.arr&&(params.arr.indexOf("rive")>0||params.arr=="true"))
forms.m_arriveByForm.setValue('true');if(params.Arr&&(params.Arr.indexOf("rive")>0||params.Arr=="true"))
forms.m_arriveByForm.setValue('true');if(params.arrParam&&(params.arrParam.indexOf("part")>0||params.arrParam=="false"))
forms.m_arriveByForm.setValue('false');if(params.arr&&(params.arr.indexOf("part")>0||params.arr=="false"))
forms.m_arriveByForm.setValue('false');if(params.Arr&&(params.Arr.indexOf("part")>0||params.Arr=="false"))
forms.m_arriveByForm.setValue('false');if(params.after)
{time=params.after.replace(/\./g,"");forms.m_time.setRawValue(otp.util.DateUtils.parseTime(time,this.locale.time.time_format));forms.m_arriveByForm.setValue('false');time=true;}
else if(params.by)
{time=params.by.replace(/\./g,"");forms.m_time.setRawValue(otp.util.DateUtils.parseTime(time,this.locale.time.time_format));forms.m_arriveByForm.setValue('true');time=true;}
if(params.arriveBy&&params.arriveBy=="true")
forms.m_arriveByForm.setValue('true');else if(params.arriveBy&&params.arriveBy=="false")
forms.m_arriveByForm.setValue('false');if(params.time)
{time=params.time.replace(/\./g,"");forms.m_time.setRawValue(otp.util.DateUtils.parseTime(time,this.locale.time.time_format));time=true;}
if(params.mode)
{var mode=this.parseMode(params.mode);forms.m_modeForm.setValue(mode);if(this.m_optionsManager)
{this.m_optionsManager.doMode(mode);}}
if(params.min)
params.optimize=params.min;if(params.opt)
params.optimize=params.opt;if(params.optimize)
{var opt=this.parseOptimize(params.optimize);forms.m_optimizeForm.setValue(opt);if(this.m_optionsManager)
{this.m_optionsManager.doOpt(opt);}}
if(params.walk&&params.walk<=1.10)
{if(params.walk<=0.10)forms.m_maxWalkDistanceForm.setValue(160);else if(params.walk<=0.25)forms.m_maxWalkDistanceForm.setValue(420);else if(params.walk<=0.50)forms.m_maxWalkDistanceForm.setValue(840);else if(params.walk<=0.75)forms.m_maxWalkDistanceForm.setValue(1260);else if(params.walk<=1.10)forms.m_maxWalkDistanceForm.setValue(1609);}
if(params.maxWalkDistance)
forms.m_maxWalkDistanceForm.setValue(params.maxWalkDistance);if(params.walkSpeed)
forms.m_walkSpeedForm.setValue(params.walkSpeed);if(params.wheelchair&&this.planner.options.showWheelchairForm)
forms.m_wheelchairForm.setValue(params.wheelchair);if(params.maxTransfers&&params.maxTransfers>=0&&params.maxTransfers<1000)
this.planner.maxTransfers=Number(params.maxTransfers);if(typeof(params.preferredRoutes)=='string')
this.preferredRoutes=params.preferredRoutes;if(typeof(params.unpreferredRoutes)=='string')
this.unpreferredRoutes=params.unpreferredRoutes;if(typeof(params.bannedRoutes)=='string')
this.bannedRoutes=params.bannedRoutes;if(typeof(params.bannedStops)=='string')
this.bannedStops=params.bannedStops;if(params.routerId)
this.routerId=params.routerId;if(!time&&params.Hour&&params.Minute&&params.AmPm)
{time=params.Hour+":"+params.Minute+" "+params.AmPm.toLowerCase();time=time.replace(/\./g,"");forms.m_time.setRawValue(otp.util.DateUtils.parseTime(time,this.locale.time.time_format));time=true;}
if(!date&&params.month&&params.day)
{var d=new Date();var y=d.getFullYear();var n=d.getMonth();var m=otp.util.DateUtils.getMonthAsInt(params.month);if(m<n)
y++;if(params.day.length==1)
params.day="0"+params.day;date=m+"/"+params.day+"/"+y;forms.m_date.setRawValue(date);date=true;}}},getMaxDistance:function()
{var retVal=null;try
{var self=otp.planner.StaticForms.THIS;retVal=self.m_maxWalkDistanceForm.getValue();}
catch(e)
{}
return retVal;},setMaxDistance:function(val)
{try
{var self=otp.planner.StaticForms.THIS;retVal=self.m_maxWalkDistanceForm.setValue(val);}
catch(e)
{}},getWalkSpeed:function()
{var retVal=null;try
{var self=otp.planner.StaticForms.THIS;retVal=self.m_walkSpeedForm.getValue();}
catch(e)
{}
return retVal;},setWalkSpeed:function(val)
{try
{var self=otp.planner.StaticForms.THIS;retVal=self.m_walkSpeedForm.setValue(val);}
catch(e)
{}},getFormData:function(url)
{var retVal={};retVal.url=url;retVal.itinID="1";retVal.fromPlace=this.m_fromForm.getNamedCoord();retVal.toPlace=this.m_toForm.getNamedCoord();retVal.date=this.m_date.getRawValue();retVal.time=otp.util.DateUtils.parseTime(this.m_time.getRawValue(),this.locale.time.time_format);retVal.arriveBy=this.m_arriveByForm.getValue();retVal.opt=this.m_optimizeForm.getValue();retVal.routerId=this.routerId;retVal.preferredRoutes=this.preferredRoutes;retVal.unpreferredRoutes=this.unpreferredRoutes;retVal.bannedRoutes=this.bannedRoutes;retVal.bannedStops=this.bannedStops;retVal.fromLat=otp.util.ObjUtils.getLat(this.m_fromForm.geocodeCoord);retVal.fromLon=otp.util.ObjUtils.getLon(this.m_fromForm.geocodeCoord);retVal.toLat=otp.util.ObjUtils.getLat(this.m_toForm.geocodeCoord);retVal.toLon=otp.util.ObjUtils.getLon(this.m_toForm.geocodeCoord);if(retVal.opt=="TRIANGLE"){var triopts=this.m_bikeTriangle.getFormData();otp.extend(retVal,triopts);}
var d=this.m_maxWalkDistanceForm.getValue();retVal.maxWalkDistance=d*1.0;var s=this.m_walkSpeedForm.getValue();retVal.walkSpeed=s*1.0;retVal.mode=this.m_modeForm.getValue();if(this.planner.options.showWheelchairForm)
retVal.wheelchair=this.m_wheelchairForm.getValue();if(this.planner.options.showIntermediateForms)
retVal.intermediate_places='';try
{retVal.time=retVal.time.replace(/\./g,"");}
catch(e)
{}
return retVal;},clearFrom:function(formToo)
{this.m_fromForm.setGeocodeCoord(null,null);if(formToo&&formToo===true)
{this.m_fromForm.clear();}},clearTo:function(formToo)
{this.m_toForm.setGeocodeCoord(null,null);if(formToo&&formToo===true)
{this.m_toForm.clear();}},selectFrom:function(combo,record,num)
{var coord=otp.util.ExtUtils.getCoordinate(record);this.m_fromForm.setGeocodeCoord(coord,record);},selectTo:function(combo,record,num){var coord=otp.util.ExtUtils.getCoordinate(record);this.m_toForm.setGeocodeCoord(coord,record);},getContextMenu:function(cm){if(cm!=null)
this.contextMenu=cm;var retVal=[{text:this.locale.contextMenu.fromHere,iconCls:'cFromHere',scope:this,handler:function(){var ll=this.contextMenu.getYOffsetMapCoordinate();this.setFrom(null,ll.lat,ll.lon);this.m_fromForm.getComboBox().clearInvalid();}},{text:this.locale.contextMenu.toHere,iconCls:'cToHere',scope:this,handler:function(){var ll=this.contextMenu.getYOffsetMapCoordinate();this.setTo(null,ll.lat,ll.lon);this.m_toForm.getComboBox().clearInvalid();}}];if(this.planner.options.showIntermediateForms)
{var inter={text:this.locale.contextMenu.intermediateHere,scope:this,handler:function(){var ll=this.contextMenu.getYOffsetMapCoordinate();this.addIntermediatePlace(ll);}};retVal.push(inter);}
return retVal;},makeMainPanel:function()
{var fromToForms=this.makeFromToForms();var dateTime=this.makeDateTime();var fromToArray=[fromToForms,dateTime];if(this.fromToOverride&&(this.fromToOverride!=""||this.fromToOverride!=" "))
{fromToArray=[this.fromToOverride,dateTime];}
var fromToFP=new Ext.form.FieldSet({labelWidth:40,border:false,items:fromToArray});this.m_fromToFP=fromToFP;var optForms=this.makeOptionForms();var optFP=new Ext.form.FieldSet({labelWidth:110,border:false,items:optForms});this.m_submitButton=new Ext.Button({text:this.locale.tripPlanner.labels.planTrip,id:'trip-submit',scope:this,style:'background-color:FF0000;',handler:this.submit});this.m_toPlace=new Ext.form.Hidden({name:'toPlace',value:''});this.m_fromPlace=new Ext.form.Hidden({name:'fromPlace',value:''});var dateParam=new Ext.form.Hidden({name:'date',value:''});var forms=[fromToFP,optFP,dateParam,this.m_toPlace,this.m_fromPlace,this.m_submitButton];var conf={title:this.locale.tripPlanner.labels.tabTitle,id:'form-tab',buttonAlign:'center',border:false,keys:{key:[10,13],scope:this,handler:this.submit},items:forms,reader:this.m_xmlRespRecord,errorReader:new Ext.form.XmlErrorReader()};this.m_panel=new Ext.FormPanel(conf);this.m_panel.on({scope:this,beforeaction:this.preSubmit,actionfailed:this.submitFailure,actioncomplete:this.submitSuccess});},panelActivated:function()
{if(this.THIS.poi)
{this.THIS.poi.setFromCoord(this.THIS.m_fromForm.geocodeCoord);this.THIS.poi.setToCoord(this.THIS.m_toForm.geocodeCoord);if(this.THIS.m_fromForm.geocodeCoord&&this.THIS.m_toForm.geocodeCoord)
this.THIS.poi.zoomToExtent();}},makeFromToForms:function()
{Ext.state.Manager.setProvider(new Ext.state.CookieProvider());Ext.state.Manager.getProvider();var comboBoxOptions={layout:'anchor',label:'',cls:'nudgeRight',msgTarget:'under',locale:this.locale,poi:this.poi,appendGeocodeName:this.planner.options.appendGeocodeName};if(this.geocoder&&this.geocoder.url)
comboBoxOptions.url=this.geocoder.url;var fromFormOptions=Ext.apply({},{id:otp.util.Constants.fromFormID,name:'from',emptyText:this.locale.tripPlanner.labels.from},comboBoxOptions);var toFormOptions=Ext.apply({},{id:otp.util.Constants.toFormID,name:'to',emptyText:this.locale.tripPlanner.labels.to},comboBoxOptions);if(this.isSolrGeocoderEnabled())
{this.m_fromForm=new otp.core.SolrComboBox(fromFormOptions);this.m_toForm=new otp.core.SolrComboBox(toFormOptions);}
else
{if(this.geocoderEnabled()){fromFormOptions.changeHandler=this.geocoder.fromChanged.createDelegate(this.geocoder);toFormOptions.changeHandler=this.geocoder.toChanged.createDelegate(this.geocoder);}
this.m_fromForm=new otp.core.ComboBox(fromFormOptions);this.m_toForm=new otp.core.ComboBox(toFormOptions);}
this.m_interPlacesPanel=new Ext.Panel({name:'interPlacesPanel',columnWidth:1.0,layout:'form',style:{padding:'5px'}});var addPlaceBtn=new Ext.Button({text:'Add',scope:this,handler:function(obj){this.addIntermediatePlace(null);}});var clearPlacesBtn=new Ext.Button({text:'Clear',scope:this,handler:function(obj){this.m_interPlacesPanel.removeAll();this.m_interPlacesPanel.doLayout();this.poi.removeAllIntermediates();}});var buttonRow=new Ext.Panel({layout:'hbox',layoutConfig:{pack:'center',align:'middle'},items:[clearPlacesBtn]});var interPlacesController=new Ext.Panel({name:'interPlacesController',title:this.locale.tripPlanner.labels.intermediate,anchor:'95%',layout:'column',collapsible:true,style:{paddingBottom:'4px',marginBottom:'4px',border:'1px solid gray'},items:[this.m_interPlacesPanel],bbar:buttonRow});var rev=new Ext.Button({tooltip:this.locale.buttons.reverseMiniTip,id:"form.reverse.id",iconCls:"reverse-button",cls:'formReverseButton',hideLabel:true,scope:this,tabIndex:-1,handler:function(obj)
{this.m_fromForm.reverse(this.m_toForm);if(this.poi){this.poi.reverseStyles();}
otp.util.Analytics.gaEvent(otp.util.Analytics.OTP_TRIP_FORM_REVERSE);}});if(this.geocoderEnabled()){this.m_fromForm.getComboBox().on({scope:this,select:this.selectFrom});this.m_toForm.getComboBox().on({scope:this,select:this.selectTo});}
var inputForms=[];var revButtonStyle='padding-top:15px';inputForms.push(this.m_fromForm.getComboBox());if(this.planner.options.showIntermediateForms)
{inputForms.push(interPlacesController);revButtonStyle='padding-top:50px';}
inputForms.push(this.m_toForm.getComboBox());var inputPanel={xtype:'panel',border:false,layout:'column',items:[{columnWidth:0.90,layout:'form',border:false,items:inputForms},{bodyStyle:revButtonStyle,columnWidth:0.07,layout:'anchor',border:false,items:[rev]}]};return inputPanel;},addIntermediatePlace:function(ll)
{var intPlaceField=new Ext.form.TextField({text:"hello",columnWidth:0.75});var forms=this;var removeButton=new Ext.Button({text:"X",columnWidth:0.20,handler:function(){forms.m_interPlacesPanel.remove(this.row);forms.poi.removeIntermediate(this.row.marker);}});var intPlaceRow=new Ext.Panel({layout:'column',style:{marginBottom:'4px'},items:[intPlaceField,{xtype:'panel',html:'&nbsp;',columnWidth:0.05},removeButton]});removeButton.row=intPlaceRow;intPlaceRow.field=intPlaceField;this.m_interPlacesPanel.add(intPlaceRow);this.m_interPlacesPanel.doLayout();if(ll!=null){var latlon=ll.lat+","+ll.lon;intPlaceField.setValue(latlon);var marker=this.poi.addIntermediate(ll.lon,ll.lat,latlon);intPlaceRow.marker=marker;}},makeDateTime:function()
{this.m_date=new Ext.form.DateField({id:'trip-date-form',name:'ui_date',fieldLabel:this.locale.tripPlanner.labels.date,format:this.locale.time.date_format,allowBlank:false,msgTarget:'qtip',value:new Date().format(this.locale.time.date_format),anchor:"87%"});this.m_arriveByStore=otp.util.ExtUtils.makeStaticPullDownStore(this.locale.tripPlanner.arriveDepart);this.m_arriveByForm=new Ext.form.ComboBox({id:'trip-arrive-form',name:'arriveBy',hiddenName:'arriveBy',fieldLabel:this.locale.tripPlanner.labels.when,store:this.m_arriveByStore,value:this.m_arriveByStore.getAt(0).get('opt'),displayField:'text',valueField:'opt',anchor:this.FIELD_ANCHOR,mode:'local',triggerAction:'all',editable:false,allowBlank:false,lazyRender:false,typeAhead:true,forceSelection:true,selectOnFocus:true});this.m_time=new Ext.ux.form.Spinner({id:'trip-time-form',name:'time',fieldLabel:this.locale.tripPlanner.labels.when,accelerate:true,msgTarget:'qtip',value:new Date().format(this.locale.time.time_format),strategy:new Ext.ux.form.Spinner.TimeStrategy({format:this.locale.time.time_format}),width:85});var timePanel={xtype:'panel',border:false,layout:'column',autoWidth:true,items:[{columnWidth:0.38,layout:'form',border:false,items:[this.m_arriveByForm]},{columnWidth:0.28,layout:'anchor',border:false,items:[this.m_time]},{columnWidth:0.34,layout:'anchor',border:false,items:[this.m_date]}]};return timePanel;},makeOptionForms:function()
{this.m_maxWalkDistanceStore=otp.util.ExtUtils.makeStaticPullDownStore(this.locale.tripPlanner.maxWalkDistance);this.m_walkSpeedStore=otp.util.ExtUtils.makeStaticPullDownStore(this.locale.tripPlanner.walkSpeed);this.m_optimizeStore=otp.util.ExtUtils.makeStaticPullDownStore(this.locale.tripPlanner.options);this.m_modeStore=otp.util.ExtUtils.makeStaticPullDownStore(this.locale.tripPlanner.mode);this.m_optimizeForm=new Ext.form.ComboBox({id:'trip-optimize-form',name:'optimize',hiddenName:'optimize',fieldLabel:this.locale.tripPlanner.labels.minimize,store:this.m_optimizeStore,value:this.m_optimizeStore.getAt(1).get('opt'),displayField:'text',valueField:'opt',anchor:this.FIELD_ANCHOR,mode:'local',triggerAction:'all',editable:false,allowBlank:false,lazyRender:false,typeAhead:true,forceSelection:true,selectOnFocus:true,lastQuery:''});this.m_maxWalkDistanceForm=new Ext.form.ComboBox({id:'trip-walking-form',name:'maxWalkDistance',hiddenName:'maxWalkDistance',fieldLabel:this.locale.tripPlanner.labels.maxWalkDistance,store:this.m_maxWalkDistanceStore,value:this.m_maxWalkDistanceStore.getAt(2).get('opt'),displayField:'text',valueField:'opt',anchor:this.FIELD_ANCHOR,mode:'local',triggerAction:'all',editable:false,allowBlank:false,lazyRender:false,typeAhead:true,forceSelection:true,selectOnFocus:true});this.m_walkSpeedForm=new Ext.form.ComboBox({id:'trip-walkspeed-form',name:'walkSpeed',hiddenName:'walkSpeed',fieldLabel:this.locale.tripPlanner.labels.walkSpeed,store:this.m_walkSpeedStore,value:this.m_walkSpeedStore.getAt(2).get('opt'),displayField:'text',valueField:'opt',anchor:this.FIELD_ANCHOR,mode:'local',triggerAction:'all',editable:false,allowBlank:false,lazyRender:false,typeAhead:true,forceSelection:true,selectOnFocus:true});this.m_modeForm=new Ext.form.ComboBox({id:'trip-mode-form',name:'mode',hiddenName:'mode',fieldLabel:this.locale.tripPlanner.labels.mode,store:this.m_modeStore,value:this.m_modeStore.getAt(0).get('opt'),displayField:'text',valueField:'opt',anchor:this.FIELD_ANCHOR,mode:'local',triggerAction:'all',editable:false,allowBlank:false,lazyRender:false,typeAhead:true,forceSelection:true,selectOnFocus:true});this.m_wheelchairForm=new Ext.form.Checkbox({id:'trip-wheelchair-form',name:'wheelchair',hiddenName:'wheelchair',fieldLabel:this.locale.tripPlanner.labels.wheelchair,inputValue:'true',displayField:'text',valueField:'opt',anchor:this.FIELD_ANCHOR,mode:'local',triggerAction:'all',editable:false,allowBlank:false,lazyRender:false,typeAhead:true,forceSelection:true,selectOnFocus:true});this.m_bikeTriangleContainer=new Ext.Panel({name:'bikeTriangleContainer'});this.m_bikeTriangle=new otp.planner.BikeTriangle({container:this.m_bikeTriangleContainer,locale:this.locale});var filter=otp.planner.FormsOptionsManagerStatic.getOptimizeFilter(true,false);this.m_optimizeForm.getStore().filterBy(filter);if(this.planner.options.useOptionDependencies){var usecfg={mode:this.m_modeForm,optimize:this.m_optimizeForm,maxWalk:this.m_maxWalkDistanceForm,walkSpeed:this.m_walkSpeedForm,locale:this.locale,bikeTriangle:this.m_bikeTriangle};if(this.planner.options.showWheelchairForm)
usecfg.wheelchair=this.m_wheelchairForm;this.m_optionsManager=new otp.planner.FormsOptionsManager(usecfg);}
var retVal=[this.m_modeForm,this.m_optimizeForm,this.m_bikeTriangleContainer,this.m_maxWalkDistanceForm,this.m_walkSpeedForm];if(this.planner.options.showWheelchairForm)
retVal.push(this.m_wheelchairForm);return retVal;},setFormErrorMessage:function(comboBoxIdentifier,message)
{var errMsg=this.locale.tripPlanner.geocoder.error;if(message)
errMsg=message;if(comboBoxIdentifier==="from"){this.m_fromForm.getComboBox().markInvalid(errMsg);}else if(comboBoxIdentifier==="to"){this.m_toForm.getComboBox().markInvalid(errMsg);}},geocoderEnabled:function()
{return this.geocoder&&this.geocoder.enabled;},isSolrGeocoderEnabled:function()
{return this.geocoderEnabled()&&this.geocoder.isSolr;},isBusyGeocoding:function()
{var retVal=false;try
{if(this.geocoder.m_fromGeocoding||this.geocoder.m_toGeocoding)
retVal=true;}
catch(e){}
return retVal;},CLASS_NAME:"otp.planner.Forms"};otp.planner.Forms=new otp.Class(otp.planner.StaticForms);
otp.namespace("otp.planner");otp.planner.FormsOptionsManagerStatic={mode:null,optimize:null,maxWalk:null,walkSpeed:null,wheelchair:null,locale:null,bikeTriangle:null,bikeDefault:"TRIANGLE",optimizeStore:null,initialize:function(config){otp.configure(this,config);this.optimizeStore=this.optimize.getStore();this.mode.on({scope:this,select:this.modeSelectCB});this.optimize.on({scope:this,select:this.optSelectCB});this.optimizeStore.filterBy(function(record){return record.get("opt")!=="SAFE";});},modeSelectCB:function(comboBox,record,idx){var mode=record.get("opt");this.doMode(mode);},optSelectCB:function(comboBox,record,idx){var opt=record.get("opt");this.doOpt(opt);},doMode:function(mode){if(mode==null)return;this.optimizeStore.clearFilter();var showTransitOptions=false;var showBikeOptions=false;if(this.optimize.hidden){this.showComboBox(this.optimize);}
this.optimize.reset();if(this.maxWalk)this.showComboBox(this.maxWalk);if(this.walkSpeed)this.showComboBox(this.walkSpeed);if(this.wheelchair)this.showComboBox(this.wheelchair);if(this.lastDistance&&!this.isBike(mode)){otp.planner.StaticForms.setMaxDistance(this.lastDistance);this.lastDistance=null;}
if(this.isTransitOrBus(mode)){if(this.isBike(mode)){this.maxWalk.label.update(this.locale.tripPlanner.labels.maxBikeDistance);this.walkSpeed.label.update(this.locale.tripPlanner.labels.bikeSpeed);}else{this.maxWalk.label.update(this.locale.tripPlanner.labels.maxWalkDistance);this.walkSpeed.label.update(this.locale.tripPlanner.labels.walkSpeed);}
showTransitOptions=true;}else if(this.isWalk(mode)){if(this.maxWalk)this.hideComboBox(this.maxWalk,false);}else{if(this.maxWalk)this.hideComboBox(this.maxWalk,false);if(this.walkSpeed)this.hideComboBox(this.walkSpeed,false);if(this.wheelchair)this.hideComboBox(this.wheelchair,true);}
if(this.isBike(mode)){showBikeOptions=true;var min=otp.planner.Utils.bikeMinimum();var oldVal=otp.planner.StaticForms.getMaxDistance();if(oldVal&&oldVal<min)
{this.lastDistance=oldVal;otp.planner.StaticForms.setMaxDistance(min);}}
if(!showTransitOptions&&!showBikeOptions){this.hideComboBox(this.optimize,true);}
this.optimizeStore.filterBy(this.getOptimizeFilter(showTransitOptions,showBikeOptions));this.bikeTriangle.disable();if(showBikeOptions){this.optimize.setValue(this.bikeDefault);if(this.bikeDefault=="TRIANGLE"){this.bikeTriangle.enable();}}},doOpt:function(opt){if(opt==null)return;if(opt=="TRIANGLE")
this.bikeTriangle.enable();else
this.bikeTriangle.disable();},getOptimizeFilter:function(record){var mode=record.get("opt");return this.getOptimizeFilter(this.isTransitOrBus(mode),this.isBike(mode));},getOptimizeFilter:function(showTransitOptions,showBikeOptions){var optimizeFilter;if(showTransitOptions&&showBikeOptions){optimizeFilter=function(record){return true;};}else if(showTransitOptions){optimizeFilter=function(record){var opt=record.get("opt");var val=(opt!=="SAFE"&&opt!=="TRIANGLE");return val;};}else if(showBikeOptions){optimizeFilter=function(record){var opt=record.get("opt");var val=opt!=="TRANSFERS";return val;};}else{optimizeFilter=function(record){var opt=record.get("opt");var val=!(opt==="TRANSFERS"||opt==="SAFE");return val;};}
return optimizeFilter;},showComboBox:function(cb){cb.show();cb.label.show();},hideComboBox:function(cb,reset){if(reset)cb.reset();cb.hide();cb.label.hide();},isTransitOrBus:function(mode){return mode.indexOf("TRANSIT")!==-1||mode.indexOf("TRAINISH")!==-1||mode.indexOf("BUSISH")!==-1;},isBike:function(mode){return mode.indexOf("BICYCLE")!==-1;},isWalk:function(mode){return mode.indexOf("WALK")!==-1;},CLASS_NAME:"otp.planner.FormsOptionsManager"};otp.planner.FormsOptionsManager=new otp.Class(otp.planner.FormsOptionsManagerStatic);
otp.namespace("otp.planner");otp.planner.GeocoderStatic={enabled:false,isSolr:false,form:null,url:null,addressParamName:null,geocoder_cfg:{},m_fromGeocoding:false,m_toGeocoding:false,initialize:function(config)
{otp.configure(this,config);otp.configure(this,config.geocoder_cfg);},fromChanged:function(comboBox,value){if(otp.util.ObjUtils.isCoordinate(value)){var lat=otp.util.ObjUtils.getLat(value);var lng=otp.util.ObjUtils.getLon(value);this.form.setFrom(value,lat,lng,true,false);}else{this._makeGeocoderRequest(value,this.handleGeocoderResponse.createDelegate(this,['from'],true),this.handleGeocoderFailure.createDelegate(this,['from'],true),"from");}},toChanged:function(comboBox,value){if(otp.util.ObjUtils.isCoordinate(value)){var lat=otp.util.ObjUtils.getLat(value);var lng=otp.util.ObjUtils.getLon(value);this.form.setTo(value,lat,lng,true,false);}else{this._makeGeocoderRequest(value,this.handleGeocoderResponse.createDelegate(this,['to'],true),this.handleGeocoderFailure.createDelegate(this,['to'],true),"to");}},_makeGeocoderRequest:function(address,successFn,failureFn,comboBoxIdentifier){if(!address||address.length<1){return;}
var loadMask=new Ext.LoadMask(this.form.m_fromToFP.getEl(),{msg:this.form.locale.tripPlanner.geocoder.working});loadMask.show();if(comboBoxIdentifier==="from"){this.m_fromGeocoding=true;}else if(comboBoxIdentifier==="to"){this.m_toGeocoding=true;}
var params={};params[this.addressParamName]=address;if(this.routerId)
params["routerId"]=this.form.routerId;var self=this;Ext.Ajax.request({url:this.url,method:"GET",success:successFn,failure:failureFn,callback:function(){loadMask.hide();if(comboBoxIdentifier==="from"){self.m_fromGeocoding=false;}else if(comboBoxIdentifier==="to"){self.m_toGeocoding=false;}},params:params});},handleGeocoderResponse:function(response,ajaxOptions,comboBoxIdentifier)
{var self=this;var xml=response.responseXML;var errorNode=Ext.DomQuery.selectNode("error",xml);if(errorNode){console.log("GEOCODE ERROR: "+errorNode.firstChild.nodeValue);this.form.setFormErrorMessage(comboBoxIdentifier);return;}
var countNode=Ext.DomQuery.selectNode("count",xml);if(!countNode){console.log("GEOCODE ERROR: can't seem to parse the retured XML")
this.form.setFormErrorMessage(comboBoxIdentifier);return;}
var count=parseInt(countNode.firstChild.nodeValue);if(isNaN(count)||count<1)
{console.log("GEOCODE ERROR: got ZERO geocodes back in the return");this.form.setFormErrorMessage(comboBoxIdentifier);return;}
if(count>1)
{var icon=null;if(comboBoxIdentifier==="from"){icon='start-icon';}else if(comboBoxIdentifier==="to"){icon='end-icon';}
var xmlNodes=Ext.DomQuery.jsSelect("result",xml);var resultsSelector=new otp.planner.GeocoderResultsSelector({locale:this.form.locale,iconCls:icon,callback:function(lat,lng,description){if(comboBoxIdentifier==="from"){self.form.setFrom(description,lat,lng,true,false);}else if(comboBoxIdentifier==="to"){self.form.setTo(description,lat,lng,true,false);}},geocoderResults:this.parseGeocoderResultXml(xmlNodes)});resultsSelector.displayDialog();}else{var lat=Ext.DomQuery.selectNode("lat",xml).firstChild.nodeValue;var lng=Ext.DomQuery.selectNode("lng",xml).firstChild.nodeValue;var description=Ext.DomQuery.selectNode("description",xml).firstChild.nodeValue;var latlng=lat+","+lng;if(comboBoxIdentifier==="from"){self.form.m_fromForm.getComboBox().clearInvalid();self.form.setFrom(description,lat,lng,true,false);}else if(comboBoxIdentifier==="to"){self.form.m_toForm.getComboBox().clearInvalid();self.form.setTo(description,lat,lng,true,false);}}},handleGeocoderFailure:function(response,ajaxOptions,comboBoxIdentifier){console.log("geocoder failure");console.log(response);console.log("geocoder failure options");console.log(ajaxOptions);console.log("geocoding for combobox: "+comboBoxIdentifier);},parseGeocoderResultXml:function(xmlNodes){var result=[];Ext.each(xmlNodes,function(node){var lat=Ext.DomQuery.selectNode("lat",node).firstChild.nodeValue;var lng=Ext.DomQuery.selectNode("lng",node).firstChild.nodeValue;var description=Ext.DomQuery.selectNode("description",node).firstChild.nodeValue;result.push([lat,lng,description]);});return result;},CLASS_NAME:"otp.planner.Geocoder"};otp.planner.Geocoder=new otp.Class(otp.planner.GeocoderStatic);
otp.namespace("otp.planner");otp.planner.GeocoderResultsSelector={locale:null,callback:null,iconCls:null,geocoderResults:null,store:null,grid:null,initialize:function(config){otp.configure(this,config);var self=this;if(typeof config.callback==="function"){this.callback=config.callback;}
if(!this.store){this.store=new Ext.data.ArrayStore({fields:[{name:"lat"},{name:"lng"},{name:"address"}]});this.store.loadData(this.geocoderResults);}
var selectionModel=new Ext.grid.RowSelectionModel({singleSelect:true});this.grid=new Ext.grid.GridPanel({title:this.locale.tripPlanner.geocoder.select_result_title,iconCls:this.iconCls,store:this.store,columns:[{header:this.locale.tripPlanner.geocoder.address_header,id:"address",dataIndex:"address",width:200}],stripeRows:true,autoExpandColumn:"address",height:150,width:300,selModel:selectionModel});this.grid.on({viewready:function(){selectionModel.selectFirstRow();},rowdblclick:function(g,i,e){self.resultSelected();},rowclick:function(g,i,e){self.previewSelected();}});this.win=new Ext.Window({closable:false,layout:"fit",width:500,height:300,x:50,y:170,items:this.grid,buttons:[{text:this.locale.buttons.ok,handler:this.resultSelected.createDelegate(this)},{text:this.locale.buttons.cancel,handler:this.hideDialog.createDelegate(this)}]});},displayDialog:function(){this.win.show();this.win.focus();},hideDialog:function(){this.win.close();},previewSelected:function(){var record=this.grid.getSelectionModel().getSelected();var lat=record.get("lat");var lng=record.get("lng");var address=record.get("address");this.callback(lat,lng,address);},resultSelected:function(){this.previewSelected();this.win.close();},CLASS_NAME:"otp.planner.GeocoderResultsSelector"};otp.planner.GeocoderResultsSelector=new otp.Class(otp.planner.GeocoderResultsSelector);
otp.namespace("otp.planner");otp.planner.Itinerary={map:null,triptab:null,locale:null,templates:null,planner:null,xml:null,from:null,to:null,id:null,geoURL:'',lineStyle:otp.util.OpenLayersUtils.RED_STYLE,m_legStore:null,m_fromStore:null,m_toStore:null,m_routes:null,m_startTime:null,m_endTime:null,m_vectors:null,m_markers:null,m_extent:null,m_valid:false,m_modes:null,initialize:function(config)
{otp.configure(this,config);this.m_legStore=otp.planner.Utils.makeLegStore();this.m_fromStore=otp.planner.Utils.makeFromStore();this.m_toStore=otp.planner.Utils.makeToStore();this._load();this.m_modes=new otp.util.ItineraryModes(config,this);},_load:function()
{this.m_legStore.loadData(this.xml.node);this.m_fromStore.loadData(this.xml.node);this.m_toStore.loadData(this.xml.node);this.m_valid=false;if(this.m_legStore.getCount()>0)
{if(this.m_fromStore.getCount()==this.m_toStore.getCount()&&this.m_fromStore.getCount()==this.m_legStore.getCount()){this.m_valid=true;}}
this.makeStartEndTime();return this.m_valid;},draw:function(vLayer,mLayer)
{if(vLayer)
{this.getVectors(vLayer.map.getProjection());if(this.m_vectors&&this.m_vectors.length>=1)
{vLayer.addFeatures(this.m_vectors);this.m_extent=vLayer.getDataExtent();}}
if(mLayer)
{this.getMarkers(mLayer.map.getProjection());if(this.m_markers&&this.m_markers.length>=1)
{mLayer.addFeatures(this.m_markers);if(this.m_extent)
this.m_extent.extend(mLayer.getDataExtent());}}},getRoutes:function()
{return this.m_routes;},getExtent:function()
{return this.m_extent;},getVectors:function(proj)
{if(!this.m_vectors||this.m_vectors.length<1||!this.m_vectors[0].geometry)
{console.log("Itinerary.getVectors: rebuilding vector cache for this itinerary");this.m_vectors=new Array();this.makeRouteLines();this.makeWalkLines();}
if(this.m_vectors&&proj&&proj!=this.map.dataProjection)
{for(var i=0;i<this.m_vectors.length;++i)
{if(this.m_vectors[i].geometry&&!this.m_vectors[i].geometry._otp_reprojected)
{try
{if(typeof(proj)=='string')
{proj=new OpenLayers.Projection(proj);if(proj==this.map.dataProjection)
break;}
this.m_vectors[i].geometry.transform(this.map.dataProjection,proj);this.m_vectors[i].geometry._otp_reprojected=true;}
catch(e)
{console.log("EXCEPTION: Itinerary.getVectors() reproject: "+e);}}}}
return this.m_vectors;},getMarkers:function(proj)
{if(!this.m_markers||this.m_markers.length<1||!this.m_markers[0].geometry)
{console.log("Itinerary.getMarkers: rebuilding marker cache for this itinerary");this.m_markers=new Array();this.makeMarkers();}
if(this.m_markers&&proj&&proj!=this.map.dataProjection)
{for(var i=0;i<this.m_markers.length;++i)
{if(this.m_markers[i].geometry&&!this.m_markers[i].geometry._otp_reprojected)
{try
{if(typeof(proj)=='string')
{proj=new OpenLayers.Projection(proj);if(proj==this.map.dataProjection)
break;}
this.m_markers[i].geometry.transform(this.map.dataProjection,proj);this.m_markers[i].geometry._otp_reprojected=true;}
catch(e)
{console.log("EXCEPTION: Itinerary.getMarkers() reproject: "+e);}}}}
return this.m_markers;},pushVector:function(vector)
{if(vector!=null)
this.m_vectors.push(vector);},concatVectors:function(vectors)
{if(vectors&&vectors.length>0)
this.m_vectors=this.m_vectors.concat(vectors);},getFrom:function()
{return this.from;},getTo:function()
{return this.to;},getId:function()
{return this.id;},isValid:function()
{return this.m_valid;},getParams:function()
{var retVal={};this.m_startTime=this.xml.data.startTime;this.m_endTime=this.xml.data.endTime;return retVal;},makeStartEndTime:function()
{this.m_startTime=this.xml.data.startTime;this.m_endTime=this.xml.data.endTime;},makeRouteLines:function(vLayer)
{var vectors=new Array();var endIndex=this.m_fromStore.getCount()-1;for(var i=0;i<=endIndex;i++){var from=this.m_fromStore.getAt(i);var leg=this.m_legStore.getAt(i);var mode=from.get('mode');if(otp.util.Modes.isTransit(mode)){var geoJson=leg.get('legGeometry');var geoLine=new OpenLayers.Feature.Vector(geoJson,null,otp.util.OpenLayersUtils.RED_STYLE);var newLine=otp.util.OpenLayersUtils.makeStraightLine(from,this.m_toStore.getAt(i));vectors.push(geoLine);}}
if(vectors.length>0){this.concatVectors(vectors);if(vLayer){vLayer.addFeatures(vectors);}}},makeWalkLines:function(vLayer)
{var vectors=new Array();var endIndex=this.m_fromStore.getCount()-1;for(var i=0;i<=endIndex;i++){var from=this.m_fromStore.getAt(i);var leg=this.m_legStore.getAt(i);var mode=from.get('mode');if(mode==='WALK'||mode==='BICYCLE'||mode==='TRANSFER'||mode=='CAR'){var geoLine=new OpenLayers.Feature.Vector(leg.get('legGeometry'),null,otp.util.OpenLayersUtils.BLACK_STYLE);var newLine=otp.util.OpenLayersUtils.makeStraightLine(from,this.m_toStore.getAt(i));vectors.push(geoLine);}}
if(vectors.length>0){this.concatVectors(vectors);if(vLayer){vLayer.addFeatures(vectors);}}},createAndAddMarker:function(x,y,options)
{var marker=otp.util.OpenLayersUtils.makeMarker(x,y,options);this.m_markers.push(marker);},makeMarkers:function()
{var startIndex=0;var endIndex=this.m_fromStore.getCount()-1;var markersToAdd=[];var from=this.m_fromStore.getAt(startIndex);var fromP=from.get('geometry');var mode=from.get('mode');if(otp.util.Modes.isTransit(mode)){startIndex=0;this.createAndAddMarker(fromP.x,fromP.y,{type:'fromMarker',mode:mode});}else{startIndex=1;var markerType;if(mode==='WALK'){markerType='fromWalkMarker';}else if(mode==='BICYCLE'){markerType='fromBicycleMarker';}else{markerType='fromMarker';}
this.createAndAddMarker(fromP.x,fromP.y,{type:markerType,mode:mode});}
var walk=this.m_fromStore.getAt(endIndex);var walkP=walk.get('geometry');mode=walk.get('mode');if((mode==='WALK'||mode==='BICYCLE')&&endIndex>0){endIndex--;var markerType=(mode==='BICYCLE')?'bicycleMarker':'walkMarker';markersToAdd.push([walkP.x,walkP.y,{type:markerType,mode:mode}]);}
var doRoutes=false;if(this.m_routes==null){this.m_routes=new Array();doRoutes=true;}
for(var i=startIndex;i<=endIndex;i++){var from=this.m_fromStore.getAt(i);var to=this.m_toStore.getAt(i);var leg=this.m_legStore.getAt(i);var interline=leg.get('interline');var route=from.get('routeID');var mode=from.get('mode');var fromP=from.get('geometry');var toP=to.get('geometry');if(doRoutes&&route!=null&&route.length>0)
this.m_routes.push(route);if(interline==null||(interline!="true"&&interline!==true))
{this.createAndAddMarker(fromP.x,fromP.y,{type:'diskMarker',mode:mode});if(route=="street transit link"||mode=="TRANSFER"){markersToAdd.push([fromP.x,fromP.y,{type:'walkMarker',mode:mode}]);}else{var agencyId=from.get('agencyId');markersToAdd.push([fromP.x,fromP.y,{type:'routeMarker',mode:mode,route:route,agencyId:agencyId}]);}}
this.createAndAddMarker(toP.x,toP.y,{type:'diskMarker'});}
this.assignDirectionToMarkers(markersToAdd);for(var i=0;i<markersToAdd.length;++i){var marker=markersToAdd[i];if(marker[2].direction=='left'){if(marker[2].type==='walkMarker'){marker[2].type='walkMarkerLeft';}else if(marker[2].type==='routeMarker'){marker[2].type='routeMarkerLeft';}}
this.createAndAddMarker(marker[0],marker[1],marker[2]);}
var to=this.m_toStore.getAt(this.m_toStore.getCount()-1);var toP=to.get('geometry');this.createAndAddMarker(toP.x,toP.y,{type:'toMarker'});var bikeTopoMarker=otp.util.OpenLayersUtils.makeMarker(fromP.x,fromP.y,{type:'fromBicycleMarker',mode:'BICYCLE'});bikeTopoMarker.id='bicycle-topo-marker';bikeTopoMarker.style={display:'none'};this.m_markers.push(bikeTopoMarker);var walkTopoMarker=otp.util.OpenLayersUtils.makeMarker(fromP.x,fromP.y,{type:'fromWalkMarker',mode:'WALK'});walkTopoMarker.id='walk-topo-marker';walkTopoMarker.style={display:'none'};this.m_markers.push(walkTopoMarker);},assignDirectionToMarkers:function(markers)
{if(markers.length===0){return;}
bestDistance=1000;bestMarkerIdx=-1;for(var i=0;i<markers.length-1;++i){var x1=markers[i][0];var y1=markers[i][1];var mark1=markers[i][2];var x2=markers[i+1][0];var y2=markers[i+1][1];var mark2=markers[i+1][2];if(undefined===mark1.direction&&undefined===mark2.direction){var distance=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));if(distance<bestDistance){bestDistance=distance;bestMarkerIdx=i;}}}
if(bestMarkerIdx===-1){if(undefined===markers[0][2].direction){if(markers.length===1||markers[0][1]>markers[1][1]){markers[0][2].direction='right';}else{markers[0][2].direction='left';}}
var last=markers.length-1;if(undefined===markers[last][2].direction){if(markers[last][1]>markers[last-1][1]){markers[last][2].direction='right';}else{markers[last][2].direction='left';}}
for(var i=1;i<last;++i){if(undefined!=markers[i].direction){continue;}
var x0=markers[i-1][0];var y0=markers[i-1][1];var mark0=markers[i-1][2];var x1=markers[i][0];var y1=markers[i][1];var mark1=markers[i][2];var x1=markers[i][0];var y1=markers[i][1];var mark1=markers[i][2];var x2=markers[i+1][0];var y2=markers[i+1][1];var mark2=markers[i+1][2];var distance0=Math.sqrt((x1-x0)*(x1-x0)+(y1-y0)*(y1-y0));var distance1=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));if(distance0>distance1){if(x0>x1){markers[1][2].direction='right';}else{markers[1][2].direction='left';}}else{if(x0>x1){markers[1][2].direction='right';}else{markers[1][2].direction='left';}}}}else{if(markers[bestMarkerIdx][0]>markers[bestMarkerIdx+1][0]){markers[bestMarkerIdx][2].direction="right";markers[bestMarkerIdx+1][2].direction="left";}else{markers[bestMarkerIdx][2].direction="left";markers[bestMarkerIdx+1][2].direction="right";}
this.assignDirectionToMarkers(markers);}},LEG_ID:'-leg-',getLegStartPoint:function(id){var nid=id.substring(id.lastIndexOf(this.LEG_ID)+this.LEG_ID.length);var retVal=this.m_fromStore.getAt(nid);return retVal;},getTreeNodes:function(clickCallback,scope)
{return this.makeTreeNodes(clickCallback,scope);},makeTreeNodes:function(clickCallback,scope)
{var retVal=[];var cfg=otp.inherit(null,this);cfg.store=this.m_legStore;cfg.modes=this.m_modes;cfg.details=this.xml;var itin=otp.planner.ItineraryDataFactoryStatic.factory(cfg);retVal.push(otp.util.ExtUtils.makeTreeNode(itin.from,clickCallback,scope));if(itin.steps)
for(var i=0;i<itin.steps.length;i++)
{var step=itin.steps[i];var node;if(!step.leaf&&itin.steps.length>2)
{step.expanded=false;step.singleClickExpand=true;var id='showDetails-'+this.triptab.id+"-"+step.id;step.text+='<div id="'+id+'" class="show-hide-details"> '+this.templates.getShowDetails()+'</div>';node=otp.util.ExtUtils.makeTreeNode(step,clickCallback,scope);node.showDetailsId=id;node.showing=false;}
else
{node=otp.util.ExtUtils.makeTreeNode(step,clickCallback,scope);}
if(!step.leaf)
{var inodes=[];for(var j=0;j<step.instructions.length;j++)
{var inst=step.instructions[j];var inode=otp.util.ExtUtils.makeTreeNode(inst,this.instructionClickCB,this,this.instructionHoverCB,this.instructionOutCB);inode.m_step=inst.originalData;inodes.push(inode);}
node.appendChild(inodes);}
retVal.push(node);}
retVal.push(otp.util.ExtUtils.makeTreeNode(itin.to,clickCallback,scope));if(itin.notes)
{retVal.push(otp.util.ExtUtils.makeTreeNode(itin.notes,clickCallback,scope));}
retVal.push(otp.util.ExtUtils.makeTreeNode(itin.details,clickCallback,scope));return retVal;},outCount:0,clicked:null,instructionClickCB:function(node,m)
{if(node&&node.m_step)
{this.clicked=node;this.outCount=0;this.map.tooltipCleared=false;this.map.pan(node.m_step.lon,node.m_step.lat);this.instructionHoverCB(node,m);}},instructionHoverCB:function(node,m)
{if(node&&node.m_step)
{this.map.tooltip(node.m_step.lon,node.m_step.lat,node.m_step.bubbleHTML,node.m_step.bubbleLen);}},instructionOutCB:function(node,m)
{this.map.tooltipHide();this.map.streetviewHide();if(this.outCount>=5||this.map.tooltipCleared)
{this.clicked=null;}
this.outCount++;if(this.clicked)
{this.instructionHoverCB(this.clicked);}},CLASS_NAME:"otp.planner.Itinerary"};otp.planner.Itinerary=new otp.Class(otp.planner.Itinerary);
otp.namespace("otp.planner");otp.planner.ItineraryData={from:null,to:null,details:null,steps:null,notes:null,initialize:function(config)
{otp.configure(this,config);},CLASS_NAME:"otp.planner.ItineraryData"};otp.planner.ItineraryData=new otp.Class(otp.planner.ItineraryData);otp.planner.StepData={id:null,num:null,instructions:null,originalData:null,text:null,cls:null,iconCls:null,icon:null,leaf:true,initialize:function(config)
{otp.configure(this,config);},makeImg:function(isUnselectable)
{var icon=this.icon?this.icon:'images/ui/s.gif';var cls=this.iconCls?' class="'+this.iconCls+'" ':'';var sel=isUnselectable?' unselectable="on" ':'';return'<img src="'+icon+'" '+cls+sel+'/>';},makeDiv:function(content,dontClose)
{var id=this.id?' id="'+this.id+'" ':' ';var cls=this.cls?' class="'+this.cls+'" ':' ';var retVal='<div '+cls+id+'>';if(content)
{retVal+=content;if(!dontClose)
retVal+='</div>';}
return retVal;},CLASS_NAME:"otp.planner.StepData"};otp.planner.StepData=new otp.Class(otp.planner.StepData);otp.planner.ItineraryDataFactoryStatic={id:null,store:null,templates:null,planner:null,locale:null,from:null,to:null,details:null,modes:null,dontEditStep:false,LEG_ID:'-leg-',data:null,initialize:function(config)
{otp.configure(this,config);this.data=this.makeItineraryData();},factory:function(config)
{var factory=new otp.planner.ItineraryDataFactory(config);return factory.data;},makeItineraryData:function()
{var steps=new Array();var itinData=new otp.planner.ItineraryData({steps:steps});var blankImg='images/ui/s.gif';var num=0;var fmTxt=this.templates.TP_START.applyTemplate(this.from.data);var fmId=this.id+'-'+otp.planner.Utils.FROM_ID;itinData.from=new otp.planner.StepData({id:fmId,cls:'itiny magnify',iconCls:'start-icon',icon:blankImg,text:fmTxt,num:num++,originalData:this.from});var containsBikeMode=false;var containsCarMode=false;var containsTransitMode=false;var numLegs=this.store.getCount();for(var i=0;i<numLegs;i++)
{var leg=this.store.getAt(i);otp.inherit(leg.data,this.planner.options);var text=null;var verb=null;var sched=null;var mode=leg.get('mode').toLowerCase();var agencyId=leg.get('agencyId');var routeId=leg.get('routeShortName');var instructions=null;var isLeaf=true;var legId=this.id+this.LEG_ID+i;if(otp.util.Modes.isTransit(mode))
{var routeName=this.makeRouteName(leg)
leg.set('routeName',routeName);text=this.templates.applyTransitLeg(leg);containsTransitMode=true;}
else
{var template='TP_WALK_LEG';if(mode==='walk'){verb=this.locale.instructions.walk_toward;}
else if(mode==='bicycle'){verb=this.locale.instructions.bike_toward;template='TP_BICYCLE_LEG';containsBikeMode=true;}else if(mode==='drive'){verb=this.locale.instructions.drive_toward;template='TP_CAR_LEG';containsDriveMode=true;}else{verb=this.locale.instructions.move_toward;}
if(!leg.data.formattedSteps)
{instructions=this.makeInstructionStepsNodes(leg.data.steps,verb,legId,this.dontEditStep);if(instructions&&instructions.length>=1)
isLeaf=false;leg.data.formattedSteps="";}
text=this.templates[template].applyTemplate(leg.data);}
var icon=otp.util.imagePathManager.imagePath({mode:mode,agencyId:agencyId,route:routeId});var step=new otp.planner.StepData({id:legId,cls:'itiny magnify',iconCls:'itiny-inline-icon',icon:icon,text:text,num:num++,instructions:instructions,originalData:leg,leaf:isLeaf});steps.push(step);}
var toTxt=this.templates.TP_END.applyTemplate(this.to.data);var toId=this.id+'-'+otp.planner.Utils.TO_ID;itinData.to=new otp.planner.StepData({id:toId,cls:'itiny magnify',iconCls:'end-icon',text:toTxt,num:num++,originalData:this.to});var tripDetailsDistanceVerb=this.locale.instructions.walk_verb;if(containsBikeMode)
tripDetailsDistanceVerb=this.locale.instructions.bike_verb;else if(containsCarMode)
tripDetailsDistanceVerb=this.locale.instructions.car_verb;var tripDetailsData=Ext.apply({},this.planner.options,this.details.data,{distanceVerb:tripDetailsDistanceVerb});if(tripDetailsData.showFareInfo==null)tripDetailsData.showFareInfo=true;var tpId=this.id+'-'+otp.planner.Utils.TRIP_ID;var tpTxt=this.templates.TP_TRIPDETAILS.applyTemplate(tripDetailsData);itinData.details=new otp.planner.StepData({id:tpId,cls:'trip-details-shell',iconCls:'no-icon',text:tpTxt,num:num++});if(this.modes&&this.modes.getMessage())
{var m=this.modes.getMessage();var i="images/ui/trip/caution.gif";if(this.modes.itineraryMessages&&this.modes.itineraryMessages.icon)
i=this.modes.itineraryMessages.icon;itinData.notes=new otp.planner.StepData({id:tpId+'-modeinfo',cls:'itiny-note',iconCls:'itiny-step-icon',icon:i,text:m,num:num++});}
return itinData;},makeRouteName:function(rec)
{var routeName=rec.get('routeShortName');if(this.planner.options.useRouteLongName)
{var routeLongName=rec.get('routeLongName');if(routeName==null||routeName.length<1)
routeName=routeLongName;if(routeLongName&&routeLongName!=routeName)
routeName=routeName+"-"+routeLongName;}
return routeName;},makeInstructionStepsNodes:function(steps,verb,legId)
{var retVal=[];var isFirstStep=true;var stepNum=1;for(var i=0;i<steps.length;i++)
{var step=steps[i];if(step.streetName=="street transit link")
{continue;}
var text=this.addNarrativeToStep(step,verb,stepNum);var cfg={id:legId+"-"+i,text:step.narrative,cls:'itiny-steps',iconCls:'itiny-step-icon',icon:step.iconURL,text:text,num:stepNum++,originalData:step};var node=new otp.planner.StepData(cfg);retVal.push(node);}
return retVal;},addNarrativeToStep:function(step,verb,stepNum,dontEditStep)
{var stepText="<strong>"+stepNum+".</strong> ";var iconURL=null;var relativeDirection=step.relativeDirection;if((relativeDirection==null||stepNum==1)&&step.absoluteDirection!=null)
{var absoluteDirectionText=this.locale.directions[step.absoluteDirection.toLowerCase()];stepText+=verb+' <strong>'+absoluteDirectionText+'</strong> '+this.locale.directions.on;iconURL=otp.util.ImagePathManagerUtils.getStepDirectionIcon();}
else
{relativeDirection=relativeDirection.toLowerCase();iconURL=otp.util.ImagePathManagerUtils.getStepDirectionIcon(relativeDirection);var directionText=otp.util.StringFormattingUtils.capitolize(this.locale.directions[relativeDirection]);if(relativeDirection=="continue")
{stepText+=directionText;}
else if(relativeDirection=="elevator")
{stepText+=directionText;}
else if(step.stayOn==true)
{stepText+=directionText+" "+this.locale.directions['to_continue'];}
else
{stepText+=directionText;if(step.exit!=null){stepText+=" "+this.locale.ordinal_exit[step.exit]+" ";}
stepText+=" "+this.locale.directions['on'];}}
stepText+=' <strong>'+step.streetName+'</strong>';if(step.distance>0){stepText+=' - '+otp.planner.Utils.prettyDistance(step.distance)+'';}
if(!dontEditStep)
{step.narrative=stepText;step.iconURL=iconURL;step.bubbleHTML='<img src="'+iconURL+'"></img> '+' <strong>'+stepNum+'.</strong> '+step.streetName;step.bubbleLen=step.streetName.length+3;}
return stepText;},CLASS_NAME:"otp.planner.ItineraryDataFactory"};otp.planner.ItineraryDataFactory=new otp.Class(otp.planner.ItineraryDataFactoryStatic);
otp.namespace("otp.planner");otp.planner.Planner={locale:null,map:null,planner:null,controller:null,ui:null,url:null,printUrl:null,poi:null,fromToOverride:null,linkTemplates:null,geocoder_cfg:null,templates:null,routerId:null,maxTransfers:null,itineraryMessages:null,options:null,appName:"OpenTripPlanner",m_tabs:null,m_tabPanel:null,m_mainPanel:null,m_activeTabID:0,m_numTabs:0,m_tabCount:0,m_forms:null,m_renderer:null,m_topoRenderer:null,m_hashTemplate:null,initialize:function(config)
{this.planner=this;otp.configure(this,config);if(this.templates==null)
this.templates=new otp.planner.Templates({locale:this.locale});this.controller=otp.util.ObjUtils.defaultController(this.controller);this.m_tabs=new Array();this.m_tabPanel=new Ext.TabPanel({id:'tripplanner-panel',title:this.locale.tripPlanner.labels.panelTitle,activeTab:0,layoutOnTabChange:true,resizeTabs:true,enableTabScroll:true,minTabWidth:75,autoScroll:false,defaults:{autoScroll:true},plugins:new Ext.ux.TabCloseMenu()});this.m_tabPanel.on('tabchange',this.tabChange,this);this.m_mainPanel=new Ext.Panel({layout:'fit',id:'tp-accordion',title:this.locale.tripPlanner.labels.panelTitle,iconCls:'planner-panel',autoShow:true,border:false,items:[this.m_tabPanel],listeners:{'expand':{fn:this.panelExpanded,scope:this}}});this.m_renderer=new otp.planner.Renderer(this);this.m_topoRenderer=new otp.planner.TopoRenderer({map:this.map,panel:this.ui.innerSouth});this.m_forms=new otp.planner.Forms(this);this.addFormPanel(this.m_forms.getPanel());var thisObj=this;this.m_forms.submitSuccess=function(){thisObj.formSuccessCB();};this.m_forms.submitFailure=function(){thisObj.formFailureCB();};m=this.map.getMap();m.events.register('click',m,function(e){});},expand:function(c)
{if(c==null)c=this;if(c&&c.m_mainPanel)
{c.m_mainPanel.bubble(c.m_mainPanel.expand);}},getPanel:function()
{return this.m_mainPanel;},getMainPanel:function()
{return this.m_mainPanel;},getForms:function()
{return this.m_forms;},clearForms:function(){this.m_forms.clear();},showFormTab:function(btn)
{this.m_activeTabID=0;this.m_tabPanel.setActiveTab(0);this.controller.deactivate(this.CLASS_NAME);},populateFormTab:function(data)
{this.m_forms.populate(data);this.showFormTab();},getTabPanel:function()
{return this.m_tabPanel;},clear:function()
{this.showFormTab();this.m_forms.clear();this.m_renderer.clear();this.controller.deactivate(this.CLASS_NAME);this.closeElevation();},focus:function()
{try
{this.showFormTab();this.m_mainPanel.bubble(this.m_mainPanel.expand);}
catch(e)
{console.log("exception in Planner.focus (might be nothing if you're not using the trip planner & extjs): "+e);}},getTripInfo:function(mapURL){var retVal={url:"",txt:"",valid:false};if(mapURL==null){mapURL="http://plan.opentripplanner.org";}
var info=this.getForms().getFormData(mapURL);retVal.txt=this.templates.tripFeedbackDetails.applyTemplate(info);retVal.url=this.templates.tripPrintTemplate.applyTemplate(info);retVal.valid=(info.fromPlace!="0.0,0.0"&&info.toPlace!="0.0,0.0"&&((info.from!=null&&info.from.length>0)||(info.fromPlace!=null&&info.fromPlace.length>0))&&((info.to!=null&&info.to.length>0)||(info.toPlace!=null&&info.toPlace.length>0)));return retVal;},getActiveItinerary:function()
{var retVal=null;var tt=this.m_tabs[this.m_activeTabID];if(tt){retVal=tt.getActiveItinerary();}
return retVal;},getActiveRequest:function()
{var retVal={};var tt=this.m_tabs[this.m_activeTabID];if(tt&&tt.request){retVal=tt.request;}
return retVal;},getSelectedRoutes:function()
{var retVal=[];var ai=this.getActiveItinerary();if(ai)
{retVal=ai.getRoutes();}
return retVal;},newTripPlan:function(xml,request)
{try
{var cfg={planner:this,locale:this.locale,ui:this.ui,renderer:this.m_renderer,topoRenderer:this.m_topoRenderer,templates:this.templates,linkTemplates:this.linkTemplates,itineraryMessages:this.itineraryMessages,xml:xml,id:++this.m_tabCount,request:request};var trip=new otp.planner.TripTab(cfg);var newTab=trip.getPanel();if(newTab&&trip.isValid())
{this.m_activeTabID=newTab.getId();this.m_tabs[this.m_activeTabID]=trip;this.m_tabPanel.add(newTab);this.m_tabPanel.setActiveTab(newTab);}
else if(!newTab)
{return false;}}
catch(e)
{this.m_activeTabID=0;console.log("exception Planner.newTripPlan: exception "+e);console.log(e.stack);}
return true;},printCB:function(button,event)
{otp.planner.PrintStatic.configViaPlanner(this);var url=this.printUrl||'print.html';if(this.getActiveItinerary())
{console.log("Planner.print: clone trip request object");var req=otp.clone(this.getActiveRequest());req.url=url;url=this.templates.tripPrintTemplate.apply(req);}
console.log("Planner.print: url "+url);otp.planner.PrintStatic.print(url);},tabChange:function(tabPanel,activeTab)
{this.m_renderer.clear();var newTab=this.m_tabs[activeTab.id];var oldTab=this.m_tabs[this.m_activeTabID];if(oldTab!=null&&oldTab.topoRenderer!=null)
{this.ui.innerSouth.remove(oldTab.topoRenderer.extWrapper);}
if(newTab!=null)
{this.m_activeTabID=activeTab.id;newTab.draw();}
else
{this.m_activeTabID=0;this.controller.deactivate(this.CLASS_NAME);this.m_forms.panelActivated();}
if(this.ui.innerSouth.isVisible()&&this.ui.innerSouth.items.getCount()==0)
this.closeElevation();if(this.m_activeTabID===0)
{location.hash='#/';document.title=this.appName;}
else
{if(this.m_hashTemplate==null){this.m_hashTemplate=new Ext.XTemplate('#/'+otp.planner.ParamTemplate).compile();}
location.hash=this.m_hashTemplate.apply(newTab.request);document.title=newTab.getTitle()+' - '+this.appName;}},closeElevation:function()
{try
{this.ui.innerSouth.hide();this.ui.viewport.doLayout();}
catch(e)
{}},addFormPanel:function(fp)
{this.m_tabPanel.add(fp);this.m_tabPanel.activate(0);this.m_tabPanel.doLayout();},panelExpanded:function()
{var activeTab=this.m_tabPanel.getActiveTab();this.tabChange(this.m_tabPanel,activeTab);},CLASS_NAME:"otp.planner.Planner"};otp.planner.Planner=new otp.Class(otp.planner.Planner);
otp.namespace("otp.planner");otp.planner.PrintStatic={planner:null,templates:null,locale:null,itinerary:null,options:null,current_map:null,config:null,params:null,print_map:null,dialog:null,MAP_DIV:'map-print',initialize:function(config)
{otp.configure(this,config);this.config=otp.util.ObjUtils.getConfig(config);var p=window.opener.otp.planner.PrintStatic.planner;if(p)
this.configViaPlanner(p);otp.util.HtmlUtils.fixHtml(this.config);if(Ext.isIE)
otp.util.HtmlUtils.hideShowElement(this.MAP_DIV);else
this.safeRenderMap();this.safeWriteItinerary();},configViaPlanner:function(planner)
{this.planner=planner;this.templates=planner.templates;this.locale=planner.locale;this.itinerary=planner.getActiveItinerary();this.options=planner.map.options;this.current_map=planner.map.getMap();},print:function(url)
{console.log("Print.print: open window & bring it to the front");otp.planner.PrintStatic.dialog=window.open(url,'WORKING','width=850,height=630,resizable=1,scrollbars=1,left=100,top=100,screenX=100,screenY=100');otp.planner.PrintStatic.dialog.focus();otp.util.Analytics.gaEvent(otp.util.Analytics.OTP_TRIP_PRINT);},renderMap:function()
{var controls=[];if(otp.isLocalHost())
{var n=new OpenLayers.Control.Navigation({zoomWheelEnabled:true,handleRightClicks:true});controls.push(n);}
var options={};otp.extend(options,this.options);options.div=this.MAP_DIV;options.controls=controls;this.print_map=new OpenLayers.Map(options);var markers=new OpenLayers.Layer.Markers("print-markers");this.print_map.addLayer(markers);markers.setZIndex(400);var lyrs=this.current_map.layers;for(var i=0;i<lyrs.length;i++)
{if(lyrs[i].DONT_PRINT)continue;if(lyrs[i].CLASS_NAME=="OpenLayers.Layer.Markers")
{for(var j=0;j<lyrs[i].markers.length;j++){markers.addMarker(new OpenLayers.Marker(lyrs[i].markers[j].lonlat.clone(),lyrs[i].markers[j].icon.clone()));}
console.log("Print._makeMap Markers: "+lyrs[i].name);}
else
{var lyr=lyrs[i].clone();if(lyrs[i].visibility==true)
lyr.visibility=true;try{this.print_map.addLayer(lyr);}
catch(e){}
console.log("Print._makeMap Layer: "+lyr.name+"  "+lyr.visibility+" "+lyr.getZIndex());}}
try
{console.log('PRINT = map zoom: '+this.current_map.getZoom());if(this.current_map.getZoom()>14)
{this.print_map.setCenter(this.current_map.getCenter(),this.current_map.getZoom());}
else
{this.print_map.zoomToExtent(this.current_map.getExtent());}}
catch(e)
{console.log("EXCEPTION in Print.renderMap: "+e);}},safeRenderMap:function()
{try
{this.renderMap();}
catch(e)
{console.log("EXCEPTION in Print.safeRenderMap: "+e);}},writeItinerary:function()
{console.log('enter writeItinerary');console.log('writeItinerary - step 1: get itinerary data');var cfg={templates:this.templates,planner:this.planner,locale:this.locale,store:this.itinerary.m_legStore,modes:this.itinerary.m_modes,details:this.itinerary.xml,from:this.itinerary.from,to:this.itinerary.to,id:1,dontEditStep:true};var itin=otp.planner.ItineraryDataFactoryStatic.factory(cfg);console.log('writeItinerary - step 2: get divs that we will write into');var headerDIV=otp.util.HtmlUtils.getElement("header");var detailsDIV=otp.util.HtmlUtils.getElement("details");var legsDIV=otp.util.HtmlUtils.getElement("legs");console.log(headerDIV);console.log(detailsDIV);console.log(legsDIV);console.log('writeItinerary - step 3: write the header');var from=itin.from.makeDiv(itin.from.makeImg(true)+' '+itin.from.text);var to=itin.to.makeDiv(itin.to.makeImg(true)+' '+itin.to.text);headerDIV.innerHTML=from+to;var text='';text+=from;if(itin.steps)
for(var i=0;i<itin.steps.length;i++)
{var step=itin.steps[i];text+=step.makeDiv(step.makeImg(true)+step.text);if(step.instructions&&step.instructions.length>0)
{text+='<div class="instructions">';for(var j=0;j<step.instructions.length;j++)
{var inst=step.instructions[j];text+=inst.makeDiv(inst.makeImg(true)+inst.text);}
text+='</div>';}}
text+=to;legsDIV.innerHTML=text;var details="";if(itin.notes)details+=itin.notes.makeDiv(itin.notes.makeImg(true)+itin.notes.text);if(itin.details)details+=itin.details.text;detailsDIV.innerHTML=details;},safeWriteItinerary:function()
{try
{this.writeItinerary();}
catch(e)
{console.log("EXCEPTION in Print.safeWriteItinerary: "+e);}},makeLink:function(linkDiv,xx)
{var linkOpts=Ext.get("link-options");var linkOptions='<span class="span_hide_options" id="linklogo" onclick="showHideMap(\'logo\')">'+loc.buttons.hideBanner+'</span>'
+'<div style="clear:both"></div>';linkOpts.update(linkOptions);},CLASS_NAME:"otp.planner.Print"};otp.planner.Print=new otp.Class(otp.planner.PrintStatic);
otp.namespace("otp.planner");otp.planner.Renderer={map:null,locale:null,templates:null,planner:null,m_markerLayer:null,m_vectorLayer:null,m_markerLayerAlternative:null,m_vectorLayerAlternative:null,m_tree:null,m_itinerary:null,zoomInLegClick:4,zoomInStartClick:2,zoomInEndClick:2,zoomInShowDetailsClick:0,zoomInHideDetailsClick:5,initialize:function(config)
{otp.configure(this,config);},draw:function(itin,tree)
{if(itin!=null)
{this.m_itinerary=itin;this.m_tree=tree;this.drawItineraryOntoMap();}},clear:function()
{this.map.cleanMap();},clearAlternatives:function(itin){if(itin==this.m_itinerary)
return;this.m_vectorLayerAlternative.destroyFeatures(this.m_vectorLayerAlternative.features);},drawItineraryOntoMap:function()
{if(this.m_vectorLayer==null)
{var vectorLayerOptions={isBaseLayer:false,isFixed:false,visibility:true,projection:this.map.dataProjection,displayInLayerSwitcher:false};this.m_vectorLayer=new OpenLayers.Layer.Vector('trip-vector-layer',vectorLayerOptions);this.m_vectorLayer.OTP_LAYER=true;this.map.getMap().addLayer(this.m_vectorLayer);this.m_vectorLayer.setZIndex(222);var style=otp.util.OpenLayersUtils.getMarkerStyle();var styleMap=new OpenLayers.StyleMap(style);var uniqueValueRules=otp.util.OpenLayersUtils.getMarkerUniqueValueRules();styleMap.addUniqueValueRules("default","type",uniqueValueRules);var markerLayerOptions={isBaseLayer:false,rendererOptions:{yOrdering:true},projection:this.map.dataProjection,styleMap:styleMap,displayInLayerSwitcher:false};this.m_markerLayer=new OpenLayers.Layer.Vector('trip-marker-layer',markerLayerOptions);this.m_markerLayer.OTP_LAYER=true;this.map.getMap().addLayer(this.m_markerLayer);this.m_markerLayer.setZIndex(223);}
this.clear();this.m_itinerary.draw(this.m_vectorLayer,this.m_markerLayer);this.map.zoomToExtent(this.m_itinerary.getExtent());otp.util.ExtUtils.clearTreeNodes(this.m_tree);var n=this.m_itinerary.getTreeNodes(this.legClick,this);this.m_tree.root.appendChild(n);},drawItineraryIntoPrinter:function()
{},drawItineraryIntoEmail:function()
{},drawItineraryAlternative:function(itin)
{if(this.m_vectorLayerAlternative==null)
{var vectorLayerOptions={isBaseLayer:false,isFixed:false,visibility:true,projection:this.map.dataProjection};this.m_vectorLayerAlternative=new OpenLayers.Layer.Vector('trip-vector-layer-alternative',vectorLayerOptions);this.m_vectorLayerAlternative.setOpacity(0.5);this.m_vectorLayerAlternative.OTP_LAYER=true;this.map.getMap().addLayer(this.m_vectorLayerAlternative);var style=otp.util.OpenLayersUtils.getMarkerStyle();var styleMap=new OpenLayers.StyleMap(style);var uniqueValueRules=otp.util.OpenLayersUtils.getMarkerUniqueValueRules();styleMap.addUniqueValueRules("default","type",uniqueValueRules);var markerLayerOptions={isBaseLayer:false,rendererOptions:{yOrdering:true},projection:this.map.dataProjection,styleMap:styleMap};this.m_markerLayerAlternative=new OpenLayers.Layer.Vector('trip-marker-layer-alternative',markerLayerOptions);this.m_markerLayerAlternative.setOpacity(0.4);}
this.m_vectorLayerAlternative.destroyFeatures(this.m_vectorLayerAlternative.features);if(itin==this.m_itinerary)
return;itin.draw(this.m_vectorLayerAlternative,null);},legClick:function(node,event)
{if(node.id.indexOf(otp.planner.Utils.TRIP_ID)>=0)
{try
{this.map.zoomToExtent(this.m_markerLayer.getDataExtent());}
catch(e)
{}}
else
{var zInc=null;try
{if(node.showDetailsId)
{var content;if(node.showing)
{content=this.templates.getShowDetails();node.showing=false;zInc=this.zoomInShowDetailsClick;}
else
{content=this.templates.getHideDetails();node.showing=true;showDetails=false;zInc=this.zoomInHideDetailsClick;}
Ext.fly(node.showDetailsId).update(content);}}
catch(e)
{console.log("EXCEPTION leg click callback - expand : "+e);}
try
{var coord=null;if(node.id.indexOf(otp.planner.Utils.FROM_ID)>=0)
{coord=this.m_itinerary.getFrom();zInc=this.zoomInStartClick;}
else if(node.id.indexOf(otp.planner.Utils.TO_ID)>=0)
{coord=this.m_itinerary.getTo();zInc=this.zoomInEndClick;}
else
{coord=this.m_itinerary.getLegStartPoint(node.id);if(zInc===null)
zInc=this.zoomInLegClick;}
coord=coord.get('geometry');this.map.zoomToExtent(this.m_itinerary.getExtent());var z=this.map.getZoom();this.map.zoom(coord.x,coord.y,z+(zInc||0));}
catch(e)
{console.log("EXCEPTION leg click callback - zoom to leg : "+e);}}},CLASS_NAME:"otp.planner.Renderer"};otp.planner.Renderer=new otp.Class(otp.planner.Renderer);
otp.namespace("otp.planner");otp.planner.ParamTemplate='submit'
+'&fromPlace={[values.fromPlace.replace(/&/g,"@")]}'
+'&toPlace={[values.toPlace.replace(/&/g,"@")]}'
+'&mode={mode}'
+'&min={opt}'
+'<tpl if="opt == \'TRIANGLE\'">&triangleTimeFactor={triangleTimeFactor}&triangleSlopeFactor={triangleSlopeFactor}&triangleSafetyFactor={triangleSafetyFactor}</tpl>'
+'&maxWalkDistance={maxWalkDistance}'
+'&walkSpeed={walkSpeed}'
+'&time={time}'
+'&date={date}'
+'&arriveBy={arriveBy}&itinID={itinID}'
+'&wheelchair={wheelchair}'
+'&preferredRoutes={preferredRoutes}'
+'&unpreferredRoutes={unpreferredRoutes}'
+'&bannedRoutes={bannedRoutes}'
+'&bannedStops={bannedStops}';otp.planner.Templates={THIS:null,locale:null,TP_ITINERARY:null,TP_LEG_CONTINUES:null,TP_TRIPDETAILS:null,TP_LEG_BASE_STR:null,TP_LEG_MODE:null,TP_END:null,TP_START:null,TP_BICYCLE_LEG:null,TP_WALK_LEG:null,TP_CAR_LEG:null,tripFeedbackDetails:null,tripPrintTemplate:null,streetviewTemplate:null,initialize:function(config){otp.configure(this,config);otp.planner.Templates.THIS=this;otp.planner.Templates.locale=this.locale;if(this.TP_ITINERARY==null)
this.TP_ITINERARY=new Ext.XTemplate('<div id={id} class="dir-alt-route-inner">','<span class="time-span itinopt">{[otp.util.StringFormattingUtils.timeSpan(values.startTime, values.endTime, otp.planner.Templates.locale)]}</span>','<span class="duration-hours-mins itinopt">{[otp.util.StringFormattingUtils.durationHoursMins(values.duration, otp.planner.Templates.locale)]}</span>','</div>','<tpl if="numTransfers">','<div id={id} class="dir-alt-route-inner">','<span>&nbsp;&nbsp;</span>','<tpl if="numTransfers">','<span class="transfers">{[otp.util.StringFormattingUtils.numSinglePlural(values.numTransfers, otp.planner.Templates.locale.instructions.transfer, otp.planner.Templates.locale.instructions.transfers )]}</span>','</tpl>','</div>','</tpl>').compile();if(this.tripFeedbackDetails==null)
this.tripFeedbackDetails=new Ext.XTemplate(this.locale.labels.trip_details
+' {fromPlace} '+this.locale.directions.to+' {toPlace}'
+' {arriveBy} {time} '+this.locale.directions.on+' {date}, '
+this.locale.directions.via+' {[otp.util.Modes.translate(values["mode"])]}, '
+' {opt}'
+'<tpl if="opt == \'TRIANGLE\'"> (tf={triangleTimeFactor}, sf={triangleSlopeFactor}, hf={triangleSafetyFactor})</tpl>'
+', '
+this.locale.labels.with_a_walk+' {maxWalkDistance}m ').compile();if(this.tripPrintTemplate==null)
this.tripPrintTemplate=new Ext.XTemplate('{url}?'+otp.planner.ParamTemplate).compile();if(this.streetviewTemplate==null)
this.streetviewTemplate=new Ext.XTemplate('<a href="javascript:void(0);" onClick="otp.core.MapStatic.streetview({x}, {y});">{name}</a>').compile();if(this.TP_TRIPDETAILS==null)
this.TP_TRIPDETAILS=new Ext.XTemplate('<div id="trip-details">','<h3>'+this.locale.labels.trip_details+'</h3>','<table cellpadding="3" cellspacing="0" border="0">','<tr><td><strong>'+this.locale.labels.travel+'</strong></td><td>{[otp.planner.Templates.THIS.prettyDateTime(values.startTime)]}</td></tr>','<tr><td><strong>'+this.locale.labels.trip_length+'</strong></td><td>{[otp.util.StringFormattingUtils.durationHoursMins(values.duration, otp.planner.Templates.locale)]}</td></tr>','<tpl if="numTransfers">','<tr><td><strong>'+otp.util.StringFormattingUtils.capitolize(this.locale.instructions.transfers)+'</strong></td>','<td>{[otp.util.StringFormattingUtils.numSinglePlural(values.numTransfers, otp.planner.Templates.locale.instructions.transfer, otp.planner.Templates.locale.instructions.transfers )]}</td></tr>','</tpl>','<tpl if="regularFare != null && showFareInfo == true">','<tr><td><strong>'+this.locale.labels.fare+'</strong></td><td>'+this.locale.labels.regular_fare+' {regularFare}</td></tr>','<tpl if="seniorFare != null"><tr><td></td><td>'+this.locale.labels.senior_fare+' {seniorFare}</td><tr></tpl>','<tpl if="studentFare  != null"><tr><td></td><td>'+this.locale.labels.student_fare+' {studentFare}</td><tr></tpl>','</tpl>','<tr class="valid_date"><td>&nbsp;</td><td>&nbsp;</td></tr>','<tr class="valid_date"><td></td><td>'+this.locale.labels.valid+' {[otp.planner.Templates.THIS.prettyDateTime()]}</td></tr>','</table></div>').compile();if(this.HEADSIGN==null)
this.HEADSIGN='<tpl if="headsign != null && headsign.length &gt; 0"> '+this.locale.directions.to+' {headsign}</tpl>';if(this.TP_LEG_MODE==null)
this.TP_LEG_MODE=''
+'<h4>'
+'<a href="javascript:void(0);">{[otp.util.Modes.translate(values["mode"])]}</a>'
+' {routeName} '
+this.HEADSIGN
+'</h4>';if(this.TP_LEG_CONTINUES==null)
this.TP_LEG_CONTINUES=''
+'<h4>'
+'<a href="javascript:void(0);">'+this.locale.instructions.continue_as+'</a> '
+' {routeName} '
+this.HEADSIGN
+'<span class="transfers">('+this.locale.instructions.stay_aboard+')</span>'
+'</h4>';if(this.TP_LEG_BASE_STR==null)
this.TP_LEG_BASE_STR=''
+'<p class="leg-info">'
+'<span class="time">{startTimeDisplayShort}</span> '+this.locale.instructions.depart+' {fromName}'
+'<tpl if="fromStopCode != null && fromStopCode.length &gt; 0 && showStopCodes == true">'
+'<br/>'
+'<span class="stopid">'+this.locale.labels.stop_id+' {fromStopCode}</span>'
+'</tpl>'
+'</p>'
+'<tpl if="duration != null">'
+'<div class="duration">{duration} '+this.getDurationTemplateString()+'</div>'
+'</tpl>'
+'<p class="leg-info">'
+'<span class="time">{endTimeDisplayShort}</span> '+this.locale.instructions.arrive+' {toName}'
+'<tpl if="toStopCode != null && toStopCode.length &gt; 0 && showStopCodes == true">'
+'<br/>'
+'<span class="stopid">'+this.locale.labels.stop_id+' {toStopCode}</span>'
+'</tpl>'
+'</p>'
+'<tpl if="agencyName != undefined && agencyName != null && agencyName.length &gt; 0 && showAgencyInfo == true">'
+'<p class="agency-leg-info">'
+'<tpl if="agencyUrl != null && agencyUrl.length &gt; 1">'
+'<span>'+this.locale.labels.agency_msg+' <a href="{agencyUrl}" target="#" title="'+this.locale.labels.agency_msg_tt+'">{agencyName}</a>.</span>'
+'</tpl>'
+'<tpl if="agencyUrl == null || agencyUrl.length &lt; 1">'
+'<span>'+this.locale.labels.agency_msg+' {agencyName}.</span>'
+'</tpl>'
+'</p>'
+'</tpl>'
+'<tpl if="alerts != null && alerts.length &gt; 0">'
+'<tpl for="alerts">'
+'<p class="alert"><img src="images/ui/trip/alert.png" align="absmiddle"/> '
+'<b>'+this.locale.labels.alert_for_rt+' {parent.routeShortName}: </b>{.}</p>'
+'</tpl>'
+'</tpl>';if(this.TP_WALK_LEG==null)
this.TP_WALK_LEG=this.makeLegTemplate(this.locale.instructions.walk);if(this.TP_BICYCLE_LEG==null)
this.TP_BICYCLE_LEG=this.makeLegTemplate(this.locale.instructions.bike);if(this.TP_CAR_LEG==null)
this.TP_CAR_LEG=this.makeLegTemplate(this.locale.instructions.drive);if(this.TP_START==null)
this.TP_START=new Ext.XTemplate('<h4><a href="javascript:void(0);">'+this.locale.instructions.start_at+'</a> {name}</h4>').compile();if(this.TP_END==null)
this.TP_END=new Ext.XTemplate('<h4><a href="javascript: void;">'+this.locale.instructions.end_at+'</a> {name}</h4>').compile();},prettyDateTime:function(date)
{var retVal=date;try
{if(!date)
date=new Date();retVal=date.format(this.locale.time.format);}
catch(e)
{}
return retVal;},makeLegTemplate:function(mode)
{return new Ext.XTemplate('<h4><a href="javascript:void(0);">'+mode+' </a>','{[otp.util.StringFormattingUtils.getDirection(values.direction)]} ',this.locale.directions.to+' {toName}','</h4>','<tpl if="toStopCode != null && toStopCode.length &gt; 0 && showStopCodes == true">','<p class="leg-info"><span class="stopid">'+this.locale.labels.stop_id+' {toStopCode}</span></p>','</tpl>','<tpl if="duration != null && duration &gt; 0">','<p class="leg-info transfers">'+this.locale.labels.about+' {duration} '+this.getDurationTemplateString()+' - {distance}</p>','</tpl>','<tpl for="formattedSteps">','{.}','</tpl>').compile();},getDurationTemplateString:function()
{return'<tpl if="duration == 1.0">'+this.locale.time.minute+'</tpl>'+'<tpl if="duration != 1.0">'+this.locale.time.minutes+'</tpl>';},m_transitLeg:null,getTransitLeg:function()
{if(this.m_transitLeg==null)
this.m_transitLeg=new Ext.XTemplate(this.TP_LEG_MODE+this.TP_LEG_BASE_STR).compile();return this.m_transitLeg;},m_interlineLeg:null,getInterlineLeg:function()
{if(this.m_interlineLeg==null)
this.m_interlineLeg=new Ext.XTemplate(this.TP_LEG_CONTINUES+this.TP_LEG_BASE_STR).compile();return this.m_interlineLeg;},applyTransitLeg:function(leg)
{var retVal=null;if(leg)
{var interline=leg.get('interline');if(interline==null||(interline!="true"&&interline!==true))
{retVal=this.getTransitLeg().applyTemplate(leg.data);}
else
{retVal=this.getInterlineLeg().applyTemplate(leg.data);}}
return retVal;},getShowDetails:function()
{return'<span class="show-details">'+this.locale.buttons.showDetails+'</span>';},getHideDetails:function()
{return'<span class="hide-details">'+this.locale.buttons.hideDetails+'</span>';},CLASS_NAME:"otp.planner.Templates"};otp.planner.Templates=new otp.Class(otp.planner.Templates);
otp.namespace("otp.planner");otp.planner.TopoRendererStatic={map:null,panel:null,extWrapper:null,mainContainerDiv:null,axisDiv:null,terrainContainerDiv:null,terrainDiv:null,previewDiv:null,terrainPct:0.8,axisWidth:50,nonBikeLegWidth:150,terrainCursor:null,currentLeft:0,currentMouseRect:null,markerLayer:null,locationPoint:null,locationMarker:null,legInfoArr:null,nonBikeWalkLegCount:null,minElev:null,maxElev:null,totalDistance:null,metricsSystem:null,unitRepresentation:null,elevInterval:null,THIS:null,initialize:function(config)
{otp.configure(this,config);otp.planner.TopoRendererStatic.THIS=this;this.THIS=this;this.metricsSystem=otp.config.metricsSystem;if(this.metricsSystem=='international')
{this.unitRepresentation=' m';this.elevInterval=15;}else
{this.unitRepresentation=" '";this.elevInterval=50;}},processItinerary:function(itin){this.legInfoArr=new Array();this.nonBikeWalkLegCount=0;this.minElev=100000;this.maxElev=-1000;this.totalDistance=0;for(var li=0;li<itin.m_legStore.getTotalCount();li++){var leg=itin.m_legStore.getAt(li);var legInfo=new Array();this.legInfoArr.push(legInfo);legInfo.leg=leg;if(leg.get('mode')!="BICYCLE"&&leg.get('mode')!="WALK"){this.nonBikeWalkLegCount++;continue;}
var steps=leg.data.steps;var firstElev=0,lastElev=0;for(var si=0;si<steps.length;si++){if(leg.get('mode')=="BICYCLE"||leg.get('mode')=="WALK")
this.totalDistance+=steps[si].distance;if(typeof steps[si].elevation=='undefined'){continue;}
var elevArr=steps[si].elevation.split(",");for(var ei=1;ei<elevArr.length;ei+=2){var elev;if(this.metricsSystem=='international')
elev=elevArr[ei];else
elev=elevArr[ei]*3.2808399;if(elev<this.minElev){this.minElev=elev;}
if(elev>this.maxElev){this.maxElev=elev;}
if(firstElev==0&&elev>0)firstElev=elev;if(elev>0)lastElev=elev;}}
legInfo.firstElev=firstElev;legInfo.lastElev=lastElev;}},draw:function(itin,tree){this.processItinerary(itin);var width=this.panel.getWidth();var height=this.panel.getHeight();if(height==0)height=180;if(width==0)width=1074;this.render(width,height);this.extWrapper=new Ext.Panel({contentEl:this.mainContainerDiv,layout:'fit',});},redraw:function(){this.panel.remove(this.extWrapper);var width=this.panel.getWidth();var height=this.panel.getHeight();if(height==0)height=180;if(width==0)width=1074;this.render(width,height);this.extWrapper=new Ext.Panel({contentEl:this.mainContainerDiv,layout:'fit',});this.panel.add(this.extWrapper);this.panel.doLayout();this.postLayout();},postLayout:function()
{var this_=this;this.extWrapper.on('resize',function(el){this_.redraw();});},render:function(width,height){var this_=this;this.currentLeft=0;this.currentMouseRect=null;this.markerLayer=null;this.locationPoint=null;this.locationMarker=null;var terrainWidth,res;if(this.metricsSystem=='international')
{res=this.totalDistance/(width-this.axisWidth-10-this.nonBikeLegWidth*this.nonBikeWalkLegCount);terrainWidth=(this.totalDistance)/res;}
else
{res=(this.totalDistance*3.2808399)/(width-this.axisWidth-10-this.nonBikeLegWidth*this.nonBikeWalkLegCount);terrainWidth=(this.totalDistance*3.2808399)/res;}
var showPreview=(terrainWidth>(width-this.axisWidth));var terrainHeight=showPreview?height*this.terrainPct:height;var previewHeight=height-terrainHeight;this.minElev=this.elevInterval*Math.floor(this.minElev/this.elevInterval);this.maxElev=this.elevInterval*Math.ceil(this.maxElev/this.elevInterval);this.createContainerDivs(width,height,width-this.axisWidth);var axisCanvas=Raphael(this.axisDiv);var terrainCanvas=Raphael(this.terrainDiv,width-this.axisWidth,terrainHeight,showPreview);this.terrainCursor=terrainCanvas.rect(-10,0,1,terrainHeight).attr({fill:'#000',stroke:'none',opacity:.75});terrainCanvas.rect(0,0,width-this.axisWidth,terrainHeight).attr({fill:'90-rgb(135,206,255)-rgb(204,245,255)',stroke:'none'});axisCanvas.rect(0,0,this.axisWidth,terrainHeight).attr({fill:'90-rgb(135,206,255)-rgb(204,245,255)',stroke:'none'});var d,rect;if((this.maxElev-this.minElev)==this.elevInterval)
this.minElev-=this.elevInterval;var subDivisions=(this.maxElev-this.minElev)/this.elevInterval;var subDivHeight=terrainHeight/subDivisions;for(d=0;d<=subDivisions;d++){var textY=subDivHeight*d;axisCanvas.rect(0,textY,this.axisWidth,1).attr({fill:'white',stroke:'none'});terrainCanvas.rect(0,textY,width-this.axisWidth,1).attr({fill:'white',stroke:'none'});if(d==0)textY+=12;if(d==subDivisions)textY-=6;axisCanvas.text(this.axisWidth-3,textY,(this.maxElev-d*this.elevInterval)+this.unitRepresentation).attr({fill:'black','font-size':'12px','font-weight':'bold','text-anchor':'end'});}
var bgLabels=new Array();var fgLabels=new Array();var mouseRects=new Array();var previewXCoords=new Array();var previewYCoords=new Array();var currentX=0,lastTerrainHeight=terrainHeight/2;for(var li=0;li<this.legInfoArr.length;li++){var legInfo=this.legInfoArr[li];var leg=legInfo.leg;leg.topoGraphSpan=0;var legStartX=currentX;if(leg.get('mode')!="BICYCLE"&&leg.get('mode')!="WALK")
{var prevElevY=(li==0)?terrainHeight/2:terrainHeight-terrainHeight*(this.legInfoArr[li-1].lastElev-this.minElev)/(this.maxElev-this.minElev);var nextElevY=(li>=this.legInfoArr.length-1)?terrainHeight/2:terrainHeight-terrainHeight*(this.legInfoArr[li+1].firstElev-this.minElev)/(this.maxElev-this.minElev);if(isNaN(prevElevY)||prevElevY<0||prevElevY>=terrainHeight)prevElevY=terrainHeight/2;if(isNaN(nextElevY)||nextElevY<0||nextElevY>=terrainHeight)nextElevY=terrainHeight/2;var midX=currentX+this.nonBikeLegWidth/2;var midY=(prevElevY+nextElevY)/2;var curve=[["M",currentX+4,prevElevY],["C",midX,prevElevY,midX,prevElevY,midX,midY],["C",midX,nextElevY,midX,nextElevY,currentX+this.nonBikeLegWidth-16,nextElevY]];terrainCanvas.path(curve).attr({stroke:'black','stroke-width':'6',fill:'none'});var mode=leg.get('mode').toLowerCase();var modeStr=otp.util.Modes.translate(mode,this.locale);var imgPath="images/ui/trip/mode/"+mode+".png";terrainCanvas.image(imgPath,midX-10,midY-10,20,20);terrainCanvas.path(["M",currentX+this.nonBikeLegWidth-16,nextElevY-12,"L",currentX+this.nonBikeLegWidth-4,nextElevY,"L",currentX+this.nonBikeLegWidth-16,nextElevY+12,"z"]).attr({fill:'black',stroke:'none'});terrainCanvas.text(currentX+this.nonBikeLegWidth/2,terrainHeight-10,modeStr+" "+leg.get('routeShortName')).attr({fill:'black','font-size':'14px','font-weight':'bold'});previewXCoords.push(legStartX);previewYCoords.push(previewHeight);previewXCoords.push(legStartX+this.nonBikeLegWidth);currentX+=this.nonBikeLegWidth;continue;}
var steps=leg.data.steps;var legXCoords=new Array(),legYCoords=new Array();for(si=0;si<steps.length;si++){var step=steps[si];var segWidth;if(this.metricsSystem=='international')
segWidth=(step.distance)/res;else
segWidth=(step.distance*3.2808399)/res;leg.topoGraphSpan+=segWidth;var xCoords=new Array(),yCoords=new Array();var terrainPoly=null;if(step.elevation!=undefined){var elevArr=step.elevation.split(",");if(elevArr.length>2){var stepLenM=elevArr[elevArr.length-2];for(var j=0;j<elevArr.length-1;j+=2){var posM=elevArr[j];var elev;if(this.metricsSystem=='international')
elev=elevArr[j+1];else
elev=elevArr[j+1]*3.2808399;var x=currentX+(posM/stepLenM)*segWidth;var y=terrainHeight-terrainHeight*(elev-this.minElev)/(this.maxElev-this.minElev);if(j>=elevArr.length-2)x+=1;xCoords.push(x);yCoords.push(y);legXCoords.push(x);legYCoords.push(y);previewXCoords.push((width-this.axisWidth)*x/(width-this.axisWidth));previewYCoords.push(previewHeight*(0.8-0.6*(elev-this.minElev)/(this.maxElev-this.minElev)));}
var pathStr="M "+xCoords[0]+" "+yCoords[0]+" ";for(var p=1;p<xCoords.length;p++){pathStr+="L "+xCoords[p]+" "+yCoords[p]+" ";}
terrainCanvas.path(pathStr).attr({stroke:'rgb(34, 139, 34)','stroke-width':'3',fill:'none'});}
lastTerrainHeight=yCoords[yCoords.length-1];}
var streetLabelBG=terrainCanvas.text(currentX+segWidth/2,terrainHeight/2,step.streetName).attr({stroke:'white','stroke-width':3,opacity:0,'font-size':'16px'});var streetLabelFG=terrainCanvas.text(currentX+segWidth/2,terrainHeight/2,step.streetName).attr({fill:'black',opacity:0,'font-size':'16px'});bgLabels.push(streetLabelBG);fgLabels.push(streetLabelFG);var mouseRect=terrainCanvas.rect(currentX,0,segWidth,terrainHeight).attr({fill:'white','fill-opacity':0,stroke:'none'});mouseRect.poly=terrainPoly;mouseRect.labelBG=streetLabelBG;mouseRect.labelFG=streetLabelFG;mouseRect.leg=leg;mouseRect.legStartX=legStartX;mouseRect.mouseover(function(event){this.animate({'fill-opacity':.25},300);this.labelBG.animate({opacity:1},300);this.labelFG.animate({opacity:1},300);this_.currentMouseRect=this;});mouseRect.mouseout(function(event){this_.terrainCursor.attr({x:-10});this.animate({'fill-opacity':0},300);this.labelBG.animate({opacity:0},300);this.labelFG.animate({opacity:0},300);if(this_.locationMarker!=null){this_.locationMarker.style={display:'none'};this_.markerLayer.redraw();}});mouseRect.mousemove(function(event){var nx=Math.round(event.clientX-this_.panel.getEl().getLeft()-this_.axisWidth-this_.currentLeft);this_.terrainCursor.attr({x:nx});var distAlongLS=this.leg.get('legGeometry').getLength()*(nx-this.legStartX)/this.leg.topoGraphSpan;this_.locationPoint=this_.pointAlongLineString(this.leg.get('legGeometry'),distAlongLS);if(this_.markerLayer==null){this_.markerLayer=this_.map.getMap().getLayersByName('trip-marker-layer')[0];}
if(this_.locationMarker==null||this_.locationMarker.attributes.mode!=this.leg.get('mode')){var topoMarkerID=this.leg.get('mode').toLowerCase()+'-topo-marker';this_.locationMarker=this_.markerLayer.getFeatureById(topoMarkerID);}
this_.locationMarker.style=null;this_.locationMarker.move(new OpenLayers.LonLat(this_.locationPoint.x,this_.locationPoint.y));});mouseRect.click(function(event){if(this_.locationPoint!=null){this_.map.getMap().setCenter(new OpenLayers.LonLat(this_.locationPoint.x,this_.locationPoint.y));}});mouseRects.push(mouseRect);currentX+=segWidth;}
var polyStr="M "+legXCoords[0]+" "+legYCoords[0]+" ";for(var p=1;p<legXCoords.length;p++){polyStr+="L "+legXCoords[p]+" "+legYCoords[p]+" ";}
polyStr+="L "+legXCoords[legXCoords.length-1]+" "+terrainHeight+" ";polyStr+="L "+legXCoords[0]+" "+terrainHeight+" z";terrainPoly=terrainCanvas.path(polyStr).attr({fill:"url(images/ui/topo/bg_"+leg.get("mode").toLowerCase()+".png)",opacity:.5,stroke:'none'});}
this_.terrainCursor.toFront();for(var b=0;b<bgLabels.length;b++){bgLabels[b].toFront();}
for(var f=0;f<fgLabels.length;f++){fgLabels[f].toFront();}
for(var m=0;m<mouseRects.length;m++){mouseRects[m].toFront();}},createContainerDivs:function(width,height,terrainWidth,showPreview){var upperHeight=showPreview?height*this.terrainPct:height;var lowerHeight=height-upperHeight;this.axisDiv=document.createElement('div');this.axisDiv.style.position='absolute';this.axisDiv.style.top='0px';this.axisDiv.style.left='0px';this.axisDiv.style.height=upperHeight+'px';this.axisDiv.style.width=this.axisWidth+'px';this.terrainContainerDiv=document.createElement('div');this.terrainContainerDiv.style.overflow='hidden';this.terrainContainerDiv.style.position='absolute';this.terrainContainerDiv.style.top='0px';this.terrainContainerDiv.style.left=this.axisWidth+'px';this.terrainContainerDiv.style.height=upperHeight+'px';this.terrainContainerDiv.style.width=(width-this.axisWidth)+'px';this.terrainDiv=document.createElement('div');this.terrainDiv.style.position='absolute';this.terrainDiv.style.top='0px';this.terrainDiv.style.left='0px';this.terrainDiv.style.paddingBottom='50px';this.terrainDiv.style.height=upperHeight+'px';this.terrainDiv.style.width=terrainWidth+'px';this.mainContainerDiv=document.createElement('div');this.mainContainerDiv.appendChild(this.axisDiv);this.mainContainerDiv.appendChild(this.terrainContainerDiv);this.terrainContainerDiv.appendChild(this.terrainDiv);},pointAlongLineString:function(ls,d){var points=ls.components;if(d<=0)return points[0];for(var i=0;i<points.length-1;i++){var segLen=points[i].distanceTo(points[i+1]);if(d<=segLen){var x=points[i].x+(d/segLen*(points[i+1].x-points[i].x));var y=points[i].y+(d/segLen*(points[i+1].y-points[i].y));return new OpenLayers.Geometry.Point(x,y);}
d-=segLen;}
return points[points.length-1];},CLASS_NAME:"otp.planner.TopoRenderer"};otp.planner.TopoRenderer=new otp.Class(otp.planner.TopoRendererStatic);
otp.namespace("otp.planner");otp.planner.PrintTripWin=null;otp.planner.TripTab={ui:null,locale:null,templates:null,linkTemplates:null,planner:null,renderer:null,topoRenderer:null,xml:null,request:null,id:0,m_utils:otp.planner.Utils,XML_ITINERARIES_NODE:'itineraries',ITIN_NODE_CSS:'itiny',ITIN_ICON_CSS:'itinys-icon',m_itinerariesXML:null,m_itinerariesStore:null,m_valid:true,m_activeItinerary:null,m_itineraryCache:null,m_title:'',m_from:null,m_to:null,m_panel:null,m_itinerariesTree:null,m_tripDetailsTree:null,m_tripNodePrefix:'tn-',initialize:function(config)
{otp.configure(this,config);this.m_tripNodePrefix='tn-'+this.id+'-';this.m_itinerariesXML=this.m_utils.domSelect(this.XML_ITINERARIES_NODE,this.xml);this.m_itinerariesStore=this.m_utils.makeItinerariesStore();this.m_itineraryCache=new Array();if(this.load())
{}},load:function()
{var store=this.m_itinerariesStore;store.loadData(this.m_itinerariesXML);this.m_from=otp.util.ExtUtils.loadPointRecord('from',this.xml);this.m_to=otp.util.ExtUtils.loadPointRecord('to',this.xml);if(this.m_from&&this.m_from.get('name'))
this.m_title+=this.m_from.get('name');if(this.m_to&&this.m_to.get('name'))
this.m_title+=" to "+this.m_to.get('name');var z=new Array();var treeNodeDefaults={cls:this.ITIN_NODE_CSS,iconCls:this.ITIN_ICON_CSS,leaf:true};for(var i=0;i<store.getCount();i++)
{var id=this.m_tripNodePrefix+(i+1);var itin=store.getAt(i);itin.set('id',(i+1));if(!itin.data||!itin.data.transitTime||itin.data.transitTime<=0)
itin.data.numTransfers=null;var text=this.templates.TP_ITINERARY.applyTemplate(itin.data);var treeNodeConfig=Ext.apply({},{id:id,text:text},treeNodeDefaults);z[i]=otp.util.ExtUtils.makeTreeNode(treeNodeConfig,this.itineraryClick,this);}
if(z.length>0)
{var buttons=[];if(this.planner.options.showReverseButton)
{var r=new Ext.Toolbar.Button({text:this.locale.buttons.reverse,iconCls:'reverse-button',tooltip:this.locale.buttons.reverseTip,scope:this,handler:this.reverseCB});buttons.push(r);}
if(this.planner.options.showEditButton)
{var e=new Ext.Toolbar.Button({text:this.locale.buttons.edit,iconCls:'edit-button',tooltip:this.locale.buttons.editTip,scope:this,handler:this.editCB});buttons.push(e);}
if(this.planner.options.showPrintButton)
{var p=new Ext.Toolbar.Button({text:this.locale.buttons.print,iconCls:'print-button',tooltip:this.locale.buttons.printTip,scope:this.planner,handler:this.planner.printCB});buttons.push(p);}
if(this.planner.options.showLinksButton)
{var l=new Ext.Toolbar.Button({text:this.locale.buttons.link,iconCls:'link-button',tooltip:this.locale.buttons.linkTip,scope:this,handler:this.linkCB});buttons.push(l);}
this.m_itinerariesTree=this.m_utils.makeItinerariesTree(this.id,this.itineraryClick,this);this.m_tripDetailsTree=this.m_utils.makeTripDetailsTree(this.id,null,null);this.m_panel=this.m_utils.makeTripTab(this.id,this.m_title,this.m_itinerariesTree,this.m_tripDetailsTree,buttons);var tree=this.m_itinerariesTree;var root=tree.getRootNode();root.appendChild(z);this.activateItinerary(1);var firstId=z[0].attributes.id;function selectFirstItinerary(node){node.eachChild(function(child){if(child.attributes.id==firstId){child.select();tree.un('expandnode',selectFirstItinerary);}});};tree.on('expandnode',selectFirstItinerary);}
return this.isValid();},mouseOverItineraryFn:function(eventObject,elRef){var newItin=eventObject.getItinerary(elRef.id);eventObject.renderer.drawItineraryAlternative(newItin);},mouseOutItineraryFn:function(eventObject,elRef){var theItin=eventObject.getItinerary(elRef.id);eventObject.renderer.clearAlternatives(theItin);},linkCB:function(b,e)
{if(this.linkTemplates==null||this.linkTemplates.length<=0)return;var win_y=120;var html=this.templates.tripFeedbackDetails.apply(this.request)+"<br/>";for(var i=0;i<this.linkTemplates.length;i++){win_y+=15;if(this.linkTemplates[i].separator==true){html+='<br/>';if(this.linkTemplates[i].name!=null){html+='<h2>'+this.linkTemplates[i].name+'</h2>';win_y+=20;}
continue;}
if(this.linkTemplates[i].template==null){this.linkTemplates[i].template=new Ext.XTemplate(this.linkTemplates[i].url).compile();}
html+='<a target="#" href="'+this.linkTemplates[i].template.apply(this.request)+'">'+this.linkTemplates[i].name+'</a><br/>';}
this.linkDialog=otp.util.ExtUtils.makePopup({'html':html},this.locale.buttons.link,true,300,win_y,true,100,200);},editCB:function(b,e)
{this.planner.clearForms();this.planner.populateFormTab(this.request);otp.util.Analytics.gaEvent(otp.util.Analytics.OTP_TRIP_EDIT);},reverseCB:function(b,e)
{this.planner.clearForms();var rev=otp.clone(this.request);var tmp=rev.from;rev.from=rev.to;rev.to=tmp;tmp=rev.fromPlace;rev.fromPlace=rev.toPlace;rev.toPlace=tmp;tmp=rev.fromCoord;rev.fromCoord=rev.toCoord;rev.toCoord=tmp;if(this.m_activeItinerary&&this.m_activeItinerary.m_endTime)
{rev.time=this.m_activeItinerary.m_endTime.format("g:i a");rev.arriveBy=false;}
this.planner.populateFormTab(rev);otp.util.Analytics.gaEvent(otp.util.Analytics.OTP_TRIP_REVERSE);},draw:function(){this.renderer.clear();this.drawTopography();this.renderer.draw(this.m_activeItinerary,this.m_tripDetailsTree);this.planner.controller.activate(this.CLASS_NAME);var els=Ext.query('.dir-alt-route-inner');for(var i=0;i<els.length;i++){var el=Ext.get(els[i]);el.removeAllListeners();el.on('mouseover',this.mouseOverItineraryFn.createCallback(this,el));el.on('mouseout',this.mouseOutItineraryFn.createCallback(this,el));}},drawTopography:function(){var hasBikeWalkLeg=false;for(var i=0;i<this.m_activeItinerary.m_legStore.getTotalCount();i++){if(this.m_activeItinerary.m_legStore.getAt(i).get("mode")=="BICYCLE"||this.m_activeItinerary.m_legStore.getAt(i).get("mode")=="WALK"){hasBikeWalkLeg=true;break;}}
if(hasBikeWalkLeg&&this.planner.options.showElevationGraph)
{if(this.ui.innerSouth.items.contains(this.topoRenderer.extWrapper)){this.ui.innerSouth.remove(this.topoRenderer.extWrapper);}
this.ui.innerSouth.show();this.ui.viewport.doLayout();this.topoRenderer.draw(this.m_activeItinerary,this.m_tripDetailsTree);this.ui.innerSouth.add(this.topoRenderer.extWrapper);this.ui.viewport.doLayout();this.topoRenderer.postLayout();}},itineraryClick:function(node,event){var tripNum=node.id.substring(node.id.lastIndexOf('-')+1);this.activateItinerary(tripNum);this.draw();},activateItinerary:function(id)
{var newItin=this.getItinerary(id);if(newItin!=null&&newItin.isValid())
{this.m_activeItinerary=newItin;}},getItinerary:function(id)
{var retVal=null;if(id==null){id=1;}
var retVal=this.m_itineraryCache[id];if(retVal==null)
{var itin=this.m_itinerariesStore.getAt(id-1);retVal=new otp.planner.Itinerary({map:this.planner.map,triptab:this,locale:this.locale,templates:this.templates,planner:this.planner,xml:itin,from:this.m_from,to:this.m_to,id:id});if(retVal!=null&&retVal.isValid()){this.m_itineraryCache[id]=retVal;}}
return retVal;},getId:function()
{return this.id;},getTitle:function(){return this.m_title;},getActiveItinerary:function()
{return this.m_activeItinerary;},getPanel:function()
{return this.m_panel;},isValid:function()
{if(this.m_itinerariesStore==undefined||this.m_itinerariesStore.getCount()<=0)
this.m_valid=true;return this.m_valid;},CLASS_NAME:"otp.planner.TripTab"};otp.planner.TripTab=new otp.Class(otp.planner.TripTab);
otp.namespace("otp.planner.poi");otp.planner.poi.Control={name:'POI Layer',layer:null,drag:null,map:null,styleMap:null,visibility:false,width:250,isMercator:true,m_control:null,m_popup:null,m_highlight:null,m_fromTrip:null,m_toTrip:null,m_features:[],m_intermediates:[],initialize:function(config)
{this.styleMap=otp.util.OpenLayersUtils.makeDefaultPointFeatureStyle();otp.configure(this,config);this.layer=new OpenLayers.Layer.Vector(this.name,{projection:otp.core.MapStatic.dataProjection,displayInLayerSwitcher:false});this.layer.OTP_LAYER=true;this.drag=new OpenLayers.Control.DragFeature(this.layer);this.map.addLayer(this.layer);this.map.addControl(this.drag);this.layer.events.on({"featuresremoved":this.destroyPopup,"featureselected":this.clickFeature,"featureunselected":this.clickoutFeature,scope:this});this.drag.onComplete=this.onComplete;},getLayer:function()
{return this.layer;},clickoutFeature:function(selection)
{this.destroyPopup();},clickFeature:function(s)
{try
{this.m_highlight=s.feature;this.popup(s.feature.attributes.m_text);}
catch(e)
{console.log("EXCEPTION clickFeature: "+e);}},zoomToExtent:function()
{try
{var e=this.layer.getDataExtent();this.map.zoomToExtent(e);}
catch(e)
{console.log("EXCEPTION poi.zoomToExtent: "+e);}},destroyPopup:function()
{try
{if(this.m_popup)
this.m_popup.destroy();this.m_popup=null;}
catch(e)
{console.log("EXCEPTION destoryPopup: "+e);}},onComplete:function(f,px)
{try
{var ll=otp.util.OpenLayersUtils.getLatLonOfPixel(this.map,px.x,px.y);var tmp=ll.lon;ll.lon=ll.lat;ll.lat=tmp;f.attributes.m_text=ll.lon+","+ll.lat;if(f.attributes.m_to)
otp.planner.StaticForms.setTo(null,ll.lon,ll.lat,true,true);if(f.attributes.m_from)
otp.planner.StaticForms.setFrom(null,ll.lon,ll.lat,true,true);}
catch(e)
{console.log("EXCEPTION onComplete: "+e);}},highlight:function(x,y,zoom,text,trustedText)
{if(x==null||y==null)return;if(trustedText==null)trustedText="";this.drag.deactivate();this._destroyFeature(this.m_highlight);this.m_highlight=this.makeFeature(x,y,{index:0});this.popup(text,trustedText+otp.util.OpenLayersUtils.makeZoomLink());this.show();otp.util.OpenLayersUtils.setCenter(this.map,x,y,zoom);},setFrom:function(x,y,text,move)
{if(x==null||y==null)return;this._destroyFeature(this.m_fromTrip);this.m_fromTrip=this.makeFeature(x,y,{m_from:true,m_text:text},otp.planner.poi.Style.fromTrip);this.show();if(move)otp.util.OpenLayersUtils.setCenter(this.map,x,y);this.drag.activate();},setFromCoord:function(coord,text,move)
{if(coord)
{var lat=otp.util.ObjUtils.getLat(coord);var lon=otp.util.ObjUtils.getLon(coord);this.setFrom(lon,lat,text,move);}},setTo:function(x,y,text,move)
{if(x==null||y==null)return;this._destroyFeature(this.m_toTrip);this.m_toTrip=this.makeFeature(x,y,{m_to:true,m_text:text},otp.planner.poi.Style.toTrip);this.show();if(move)otp.util.OpenLayersUtils.setCenter(this.map,x,y);this.drag.activate();},setToCoord:function(coord,text,move)
{if(coord)
{var lat=otp.util.ObjUtils.getLat(coord);var lon=otp.util.ObjUtils.getLon(coord);this.setTo(lon,lat,text,move);}},addIntermediate:function(x,y,text,move)
{if(x==null||y==null)return;var inter=this.makeFeature(x,y,{m_text:text},otp.planner.poi.Style.intermediatePlace);this.show();if(move)otp.util.OpenLayersUtils.setCenter(this.map,x,y);this.drag.activate();this.m_intermediates.push(inter);return inter;},removeIntermediate:function(inter)
{if(inter)
{this._destroyFeature(inter);for(var i=0;i<this.m_intermediates.length;i++){if(this.m_intermediates[i]==inter)this.m_intermediates.splice(i,1);}}},removeAllIntermediates:function(){for(var i=0;i<this.m_intermediates.length;i++){this._destroyFeature(this.m_intermediates[i]);}
this.m_intermediates=new Array();},clearTrip:function()
{this._destroyFeature(this.m_toTrip);this._destroyFeature(this.m_fromTrip);this.removeAllIntermediates();},clear:function()
{this._destroyFeatures(this.m_features);this.removeAllIntermediates();this.m_features=new Array();this.hide();this.drag.deactivate();},hide:function()
{this.layer.setVisibility(false);},show:function()
{this.layer.setVisibility(true);},popup:function(text,trustedText)
{this.destroyPopup();this.m_popup=this.makePopup(this.m_highlight,{},text,trustedText);},makeFeature:function(x,y,params,style)
{var retVal=new OpenLayers.Feature.Vector((new OpenLayers.Geometry.Point(x,y)).transform(otp.core.MapStatic.dataProjection,this.layer.map.getProjectionObject()),params,style);this.layer.addFeatures([retVal]);this.m_features.push(retVal);this.show();return retVal;},makePopup:function(feature,config,text,trustedText)
{if(trustedText==null)
{trustedText="";if(feature.attributes.m_trustedText)
trustedText=feature.attributes.m_trustedText;}
if(text==null)
{text="";if(feature.attributes.m_text)
text=feature.attributes.m_text;}
feature.attributes.m_text=text;feature.attributes.m_trustedText=trustedText;var popup=new GeoExt.Popup({title:text,ctCls:'stop-pop',feature:feature,width:this.width,height:this.height,html:'<div class="poi-popup">'+text+" "+trustedText+'</div>',collapsible:false,autoDestory:false,autoScroll:true,unpinnable:false,shadow:true});if(popup.draw==undefined)
{popup.draw=function(p,q,r){var z=p;};}
popup.show();popup.doLayout();popup.doLayout();return popup;},_destroyFeature:function(feature)
{if(feature==null)return;var tmp=new Array();var f=this.m_features;for(var i in f)
{if(feature!=f[i])
{tmp.push(this.m_features[i]);}}
this.m_features=tmp;this._destroyFeatures([feature]);},_destroyFeatures:function(features)
{try
{this.destroyPopup();}
catch(exp)
{}
try
{if(features)
this.layer.destroyFeatures(features);}
catch(exp)
{}},reverseStyles:function(){for(var i=0;i<this.m_features.length;i++){var feature=this.m_features[i];if(feature.style===otp.planner.poi.Style.fromTrip){feature.style=otp.planner.poi.Style.toTrip;}else if(feature.style===otp.planner.poi.Style.toTrip){feature.style=otp.planner.poi.Style.fromTrip;}}
this.layer.redraw();},CLASS_NAME:"otp.planner.poi.Control"};otp.planner.poi.Control=new otp.Class(otp.planner.poi.Control);
otp.namespace("otp.planner.poi");otp.planner.poi.Popup={autoSize:true,minSize:null,size:null,maxSize:null,anchor:{},closeBox:true,overflow:"auto",initialize:function(feature,options,content)
{this.minSize=new OpenLayers.Size(120,70);this.maxSize=new OpenLayers.Size(350,140);this.anchor={size:new OpenLayers.Size(8,8),offset:new OpenLayers.Pixel(-4,-4)}
var id=feature.id+"_popup";var center=feature.geometry.getBounds().getCenterLonLat();OpenLayers.Popup.FramedCloud.prototype.initialize.apply(this,[id,center,this.size,content,this.anchor,this.closeBox]);this.contentDiv.style.overflow=this.overflow;},edit:function(text,x,y,show)
{if(text)
{text=otp.util.StringFormattingUtils.clean(text);if(text&&text.length>0)
this.contentHTML=text;}
if(x&&y)
{this.lonlat.lon=x;this.lonlat.lat=y;}
if(show)
this.show();},CLASS_NAME:"otp.planner.poi.Popup"};try
{otp.planner.poi.Popup=new otp.Class(OpenLayers.Popup.FramedCloud,otp.planner.poi.Popup);}
catch(e)
{console.log("otp.planner.poi.Layer: error creating this type...please ignore this error if you are not using OpenLayers");};
otp.namespace("otp.planner.poi");otp.planner.poi.Style={green:{strokeColor:"#00FF00",strokeWidth:3,strokeDashstyle:"dashdot",pointRadius:6,pointerEvents:"visiblePainted"},fromTrip:{graphicWidth:21,graphicHeight:39,graphicXOffset:-11,graphicYOffset:-39,externalGraphic:"images/map/trip/start.png",cursor:"pointer",fillOpacity:"1.0"},toTrip:{graphicWidth:21,graphicHeight:39,graphicXOffset:-11,graphicYOffset:-39,externalGraphic:"images/map/trip/end.png",cursor:"pointer",fillOpacity:"1.0"},intermediatePlace:{graphicWidth:21,graphicHeight:39,graphicXOffset:-11,graphicYOffset:-39,externalGraphic:"images/map/trip/intermediate.png",cursor:"pointer",fillOpacity:"1.0"},CLASS_NAME:"otp.planner.poi.Style"};
otp.namespace("otp.core");otp.core.ComboBoxStatic={maxNumValues:10,id:'cb.id',name:'cb.name',label:'Form',display:'display',cls:'',changeHandler:null,anchor:'95%',msgTarget:'qtip',emptyText:'...',maxHeight:150,locale:null,poi:null,form:null,m_store:null,m_template:null,m_lastValue:null,m_forceDirty:false,geocodeName:null,geocodeCoord:null,geocodeRec:null,appendGeocodeName:false,initialize:function(config)
{otp.configure(this,config);if(typeof config.changeHandler==="function"){this.changeHandler=config.changeHandler;}
this.m_store=new Ext.data.SimpleStore({fields:[this.display],data:Ext.state.Manager.get(this.id,[])});this.m_template=new Ext.XTemplate('<tpl for=".">','<div class="x-combo-list-item" >','{'+this.display+'}','</div>','</tpl>');var formOptions={id:this.id,cls:this.cls,hiddenName:this.name,fieldLabel:this.label,displayField:this.display,msgTarget:this.msgTarget,tpl:this.m_template,emptyText:this.emptyText,valueNotFoundText:'',store:this.m_store,mode:'local',anchor:this.anchor,triggerAction:'all',allowBlank:false,typeAhead:false,resizable:true,maxHeight:this.maxHeight,lazyRender:false,selectOnFocus:true,hideLabel:true};if(this.changeHandler){formOptions.listeners={change:this.changeHandler};}
this.form=new Ext.form.ComboBox(formOptions);},selectCB:function(combo,record,num)
{console.log("Stub ComboBox.selectCB -- not doing anything...")},isDirty:function()
{var retVal=false;var v=this.form.getRawValue();if(v!=null&&v.length>0)
{retVal=(v!=this.m_lastValue);if(this.m_forceDirty)
{retVal=true;this.m_forceDirty=false;}}
return retVal;},setDirty:function()
{this.m_forceDirty=true;},setGeocodeName:function(name,doUpdate)
{this.geocodeName=name;if(doUpdate)
{this.setRawValue(name);this.setLastValue();}},setGeocodeCoord:function(coord,record)
{this.geocodeCoord=coord;this.geocodeRec=record;if(coord&&coord.indexOf('0.0')==0&&coord.indexOf('0.0')!=coord.lastIndexOf('0.0'))
this.geocodeCoord=null;},getGeocodeCoord:function()
{return otp.util.ObjUtils.getCoordinate(this.geocodeCoord);},getNamedCoord:function()
{return this.makeGeoParam(this.geocodeName,this.geocodeCoord);},setNamedCoord:function(nc,rec,doUpdate)
{var pg=this.parseGeoParam(nc);this.setGeocodeCoord(pg.ll,rec);this.setGeocodeName(pg.name||pg.ll,doUpdate);},setNameLatLon:function(name,lat,lon,rec,doUpdate)
{var ll=(1*lat).toFixed(6)+','+(1*lon).toFixed(6);ll=otp.util.ObjUtils.getCoordinate(ll);this.setGeocodeCoord(ll,rec);this.setGeocodeName(name||ll,doUpdate);},persist:function(text)
{if(this.m_store==null)return;if(Ext.isEmpty(text))
{text=this.getRawValue();if(Ext.isEmpty(text))
return;}
this.m_store.clearFilter(false);var ff=this.m_store.find(this.display,text,0,false,true);if(ff<0)
{var data=[[text]];var count=this.m_store.getTotalCount();var limit=count>this.maxNumValues?this.maxNumValues-1:count;for(var i=0;i<limit;i++)
data.push([this.m_store.getAt(i).get(this.display)]);var p=Ext.state.Manager.getProvider();if(p)
{p.expires=otp.util.DateUtils.addDays(365);Ext.state.Manager.set(this.id,data);}
this.m_store.loadData(data);}
ff=null;},getComboBox:function()
{return this.form;},getRawValue:function()
{return this.form.getRawValue();},setRawValue:function(val)
{this.form.setRawValue(val);this.setLastValue(val);},setLastValue:function(val)
{if(val==null)
val=this.getRawValue();this.m_lastValue=val;},load:function(store,template)
{},clear:function()
{this.form.collapse();this.form.reset();this.clearGeocode();},clearGeocode:function()
{this.geocodeName=null;this.geocodeCoord=null;this.geocodeRec=null;},blur:function()
{if(this.isDirty())
this.form.triggerBlur();},collapse:function()
{this.form.collapse();},reverse:function(combo)
{try
{var tmp=this.getRawValue();this.setRawValue(combo.getRawValue());combo.setRawValue(tmp);this.swapElements(combo,'geocodeName');this.swapElements(combo,'geocodeCoord');this.swapElements(combo,'geocodeRec');}
catch(e)
{}},parseGeoParam:function(p)
{var retVal=null;if(p)
{retVal={};var ll=p;var s=p.indexOf("::");if(s&&s>0)
{retVal.name=p.substr(0,s);ll=p.substr(s+2);}
retVal.ll=ll;retVal.lat=otp.util.ObjUtils.getLat(ll);retVal.lon=otp.util.ObjUtils.getLon(ll);}
return retVal;},makeGeoParam:function(name,coord)
{var retVal=null;if(coord&&coord.indexOf(',')>0)
retVal=coord;if(this.appendGeocodeName&&name&&name.length>0&&!otp.util.ObjUtils.isCoordinate(name))
retVal=name+'::'+retVal;return retVal;},CLASS_NAME:"otp.core.ComboBox"};otp.core.ComboBox=new otp.Class(otp.core.ComboBoxStatic);
otp.namespace("otp.core");otp.core.MapSingleton=null;otp.core.MapStatic={routerId:null,locale:null,map:null,baseLayer:null,mapDiv:"map",metadataUrl:'/otp-rest-servlet/ws/metadata',beforeAllFeaturesRemoved:[],allFeaturesRemoved:[],options:null,baseLayerOptions:null,THIS:null,CLOSE_ZOOM:17,tooltipLinks:true,tooltipCleared:true,defaultExtent:null,attribution:null,zoomWheelEnabled:true,handleRightClicks:false,permaLinkEnabled:false,historyEnabled:true,rightClickZoom:true,plannerOptions:null,cartoLayer:null,orthoLayer:null,dataProjection:new OpenLayers.Projection("EPSG:4326"),initialize:function(config)
{otp.configure(this,config);this.map=otp.util.OpenLayersUtils.makeMap(this.mapDiv,this.options);if(this.baseLayer==null)
{this.baseLayer=otp.util.OpenLayersUtils.makeMapBaseLayer(this.map,this.baseLayerOptions);this.cartoLayer=this.baseLayer;this.orthoLayer=this.baseLayer;}
else
{this.map.addLayers(this.baseLayer);this.cartoLayer=this.map.layers[0];this.orthoLayer=this.map.layers[1];if(this.baseLayer.length>1&&this.plannerOptions&&this.plannerOptions.showLayerSwitcher!==false){this.showLayerSwitcher=true;}else{this.showLayerSwitcher=false;}}
this.map.setBaseLayer(this.baseLayer,true);this.map.events.register('click',this,this.closeAllPopupsCB);otp.core.MapSingleton=this;otp.core.MapStatic.THIS=this;if(this.options.controls!=null&&this.options.controls.length==0)
{this.options.controls=otp.util.OpenLayersUtils.defaultControls(this.map,this.zoomWheelEnabled,this.handleRightClicks,this.permaLinkEnabled,this.attribution,this.historyEnabled,this.showLayerSwitcher);}
var layerLoaded=false;var extentRetrieved=false;var self=this;if(this.defaultExtent!=null&&this.defaultExtent==='automatic')
{var _params={};if(this.routerId)
_params.routerId=this.routerId;OpenLayers.Request.GET({url:self.metadataUrl,params:_params,headers:{Accept:'application/json'},success:function(xhr)
{var metadata=Ext.util.JSON.decode(xhr.responseText);self.defaultExtent=new OpenLayers.Bounds(metadata.minLongitude,metadata.minLatitude,metadata.maxLongitude,metadata.maxLatitude);self.defaultExtent.transform(self.dataProjection,self.map.getProjectionObject());extentRetrieved=true;if(layerLoaded){self.zoomToDefaultExtentSetter();}},failure:function(xhr)
{console.log('failure retrieving default extent');}});}
else if(this.defaultExtent!=null)
{this.defaultExtent.transform(this.dataProjection,this.map.getProjectionObject());this.zoomToDefaultExtentSetter();extentRetrieved=true;}
var zoomOnFirstLoad=function()
{layerLoaded=true;if(extentRetrieved){self.zoomToDefaultExtentSetter();}
self.map.baseLayer.events.un({loadend:zoomOnFirstLoad});};self.map.baseLayer.events.on({loadend:zoomOnFirstLoad});},getContextMenu:function(cm)
{if(cm!=null)
{this.contextMenu=cm;}
var retVal=[];if(this.rightClickZoom)
{retVal.push({text:this.locale.contextMenu.centerHere,iconCls:'cCenterMap',scope:this,handler:function(){this.contextMenu.centerMapFromContextMenuXY();}});retVal.push({text:this.locale.contextMenu.zoomInHere,iconCls:'cZoomIn',scope:this,handler:function(){this.contextMenu.centerMapFromContextMenuXY();this.map.zoomIn();}});retVal.push({text:this.locale.contextMenu.zoomOutHere,iconCls:'cZoomOut',scope:this,handler:function(){this.contextMenu.centerMapFromContextMenuXY();this.map.zoomOut();}});}
if(this.historyEnabled&&this.controls&&this.controls.hist)
{retVal.push({text:this.locale.contextMenu.previous,iconCls:'cPrevious',handler:this.controls.hist.previous.trigger});retVal.push({text:this.locale.contextMenu.next,iconCls:'cNext',handler:this.controls.hist.next.trigger});}
return retVal;},getMap:function()
{return this.map;},updateSize:function()
{this.map.updateSize();},clear:function()
{this.zoomToDefaultExtent();this.cleanMap();},getDefaultExtentFromServer:function()
{if(this.defaultExtent!="automatic"&&this.defaultExtent!=null)
{return this.defaultExtent;}
var self=this;OpenLayers.Request.GET({url:self.metadataUrl,headers:{Accept:'application/json'},success:function(xhr)
{var metadata=Ext.util.JSON.decode(xhr.responseText);self.defaultExtent=new OpenLayers.Bounds(metadata.minLongitude,metadata.minLatitude,metadata.maxLongitude,metadata.maxLatitude);self.defaultExtent.transform(self.dataProjection,self.map.getProjectionObject());otp.core.MapSingleton.defaultExtent=self.defaultExtent;},failure:function(xhr)
{console.log("getRoutingExtent error:");console.log(xhr);}});return null;},centerMapAtPixel:function(x,y)
{var px=new OpenLayers.Pixel(x,y);var ll=this.map.getLonLatFromPixel(px);this.map.panTo(ll);},zoomIn:function()
{var zoom=this.map.getZoom();zoom++;this.map.zoomTo(zoom);},zoomOut:function()
{var self=otp.core.MapStatic.THIS;self.map.zoomOut();},getZoom:function()
{return this.map.getZoom();},zoom:function(x,y,zoom,minZoom,maxZoom)
{if(minZoom==null)
minZoom=Math.floor(this.map.getNumZoomLevels()/2);if(maxZoom==null)
maxZoom=this.map.getNumZoomLevels()-1;otp.util.OpenLayersUtils.panZoomWithLimits(this.map,x,y,zoom,minZoom,maxZoom);},zoomToExtent:function(extent)
{var success=false;try
{if(extent&&extent.containsBounds)
{this.map.zoomToExtent(extent);success=true;}}
catch(e)
{success=false;}
return success;},zoomAllTheWayIn:function(x,y,zoom)
{var self=otp.core.MapStatic.THIS;if(!zoom)
{self.CLOSE_ZOOM=self.map.getNumZoomLevels()-1;zoom=self.CLOSE_ZOOM;}
if(x&&y)
self.pan(x,y);self.map.zoomTo(zoom);},zoomToDefaultExtent:function()
{return otp.core.MapSingleton.zoomToExtent(otp.core.MapSingleton.defaultExtent);},zoomToDefaultExtentSetter:function()
{var success=this.zoomToExtent(this.defaultExtent);if(success&&this.plannerOptions.setMaxExtentToDefault)
{this.map.zoomToMaxExtent=otp.core.MapSingleton.zoomToDefaultExtent;}},pan:function(x,y)
{otp.util.OpenLayersUtils.pan(this.map,x,y);},tooltip:function(x,y,html,contentSize)
{var self=otp.core.MapStatic.THIS;var ll=otp.util.OpenLayersUtils.getLonLat(self.map,x,y);if(!self.tooltipPopup)
{OpenLayers.Popup.ToolTip=OpenLayers.Class(OpenLayers.Popup,{'contentDisplayClass':'mapTooltipPopup'});self.tooltipPopup=new OpenLayers.Popup.ToolTip("mapTooltipPopup",null,new OpenLayers.Size(155,16),null,false);self.tooltipPopup.setOpacity(1.00);self.map.addPopup(self.tooltipPopup);}
if(self.tooltipLinks)
{var zoom="";if(self.map.getZoom()<self.CLOSE_ZOOM)
zoom=' <a href="javascript:void(0);" onClick="otp.core.MapStatic.zoomAllTheWayIn('+x+','+y+');">'+self.locale.contextMenu.zoomInHere+'</a>';else
zoom=' <a href="javascript:void(0);" onClick="otp.core.MapStatic.zoomOut();">'+self.locale.contextMenu.zoomOutHere+'</a>';if(Ext.isIE)
this.noStreetview=true;var streetview=null;if(!this.noStreetview)
{var svConf={name:'sv',x:x,y:y};if(contentSize&&contentSize<=30)
{html+='<br/>';svConf.name='Streetview (&copy; Google)'}
else
{html+=' ';svConf.name='Streetview';}
streetview=otp.planner.Templates.THIS.streetviewTemplate.applyTemplate(svConf);}
html+='<span class="popLinks">'+zoom;if(streetview)
{html+=' | '+streetview}
html+='</span>';}
self.tooltipPopup.setContentHTML(html);self.tooltipPopup.lonlat=ll;self.tooltipPopup.updatePosition();self.tooltipPopup.show();},tooltipHide:function()
{var self=otp.core.MapStatic.THIS;if(self.tooltipPopup)
self.tooltipPopup.hide()},streetview:function(x,y)
{var self=otp.core.MapStatic.THIS;var ll=otp.util.OpenLayersUtils.getLonLat(self.map,x,y);if(!self.streetviewPopup)
{OpenLayers.Popup.StreetView=OpenLayers.Class(OpenLayers.Popup,{'contentDisplayClass':'mapStreetviewPopup','panMapIfOutOfView':true});self.streetviewPopup=new OpenLayers.Popup.StreetView("mapStreetViewPopup",null,new OpenLayers.Size(300,200),null,true,self.streetviewHide);self.map.addPopup(self.streetviewPopup);}
var html='<iframe width="95%" height="90%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" '
+' src="http://maps.google.com/maps?ie=UTF8&t=m&vpsrc=0&layer=c&source=embed&output=svembed&cbp=13,,,,&cbll='+y+','+x+'&ll='+y+','+x+'&z=18"></iframe>';self.streetviewPopup.setContentHTML(html);self.streetviewPopup.lonlat=ll;self.streetviewPopup.updatePosition();self.streetviewPopup.setBackgroundColor('0xFFFFFF');self.streetviewPopup.show();},streetviewHide:function()
{var self=otp.core.MapStatic.THIS;if(self.streetviewPopup)
self.streetviewPopup.hide()},cleanMap:function()
{this.closeAllPopups()
this._removeAllFeatures();},closeAllPopups:function()
{this.tooltipHide();this.streetviewHide();this.tooltipCleared=true;},closeAllPopupsCB:function()
{this.closeAllPopups();},showMapView:function()
{if(this.cartoLayer)
this.map.setBaseLayer(this.cartoLayer,true);},showSatelliteView:function()
{if(this.orthoLayer)
this.map.setBaseLayer(this.orthoLayer,true);},_removeAllFeatures:function()
{Ext.each(this.beforeAllFeaturesRemoved,function(fn){fn.call(this);},this);for(var i=0;i<this.map.layers.length;i++)
{var layer=this.map.layers[i];if(!layer.isBaseLayer&&layer.OTP_LAYER&&layer.removeFeatures)
{layer.removeFeatures(layer.features);}}
Ext.each(this.allFeaturesRemoved,function(fn){fn.call(this);},this);},CLASS_NAME:"otp.core.Map"};otp.core.Map=new otp.Class(otp.core.MapStatic);
otp.namespace("otp.core");otp.core.Measure={map:null,locale:otp.locale.English,outputPanel:null,outputParentDiv:otp.util.OpenLayersUtils.MAP_PANEL,outputMethod:console.log,m_control:null,m_onOff:false,units:'english',sketchSymbolizers:{"Point":{pointRadius:4,graphicName:"square",fillColor:"white",fillOpacity:1,strokeWidth:1,strokeOpacity:1,strokeColor:"#333333"},"Line":{strokeWidth:2,strokeOpacity:1,strokeColor:otp.util.OpenLayersUtils.ORANGE,strokeDashstyle:"dash"},"Polygon":{strokeWidth:2,strokeOpacity:1,strokeColor:"#666666",fillColor:"white",fillOpacity:0.3}},initialize:function(config)
{otp.configure(this,config);var style=new OpenLayers.Style();style.addRules([new OpenLayers.Rule({symbolizer:this.sketchSymbolizers})]);var styleMap=new OpenLayers.StyleMap({"default":style});this.m_control=new OpenLayers.Control.Measure(OpenLayers.Handler.Path,{persist:true,handlerOptions:{layerOptions:{styleMap:styleMap}},callbacks:{modify:function(point,feature){this.measurePartial(point,feature.geometry);}},persist:true});this.m_control.events.on({"measure":this.measureCB,"measurepartial":this.measureCB,"activate":function(){this.map.div.style.cursor="crosshair";},"deactivate":function(){this.map.div.style.cursor="default";this.off();var thisObj=this;window.setTimeout(function(){thisObj.off()},500);},"scope":this});if(this.outputPanel==null)
this.makeExtToolTip();this.map.addControl(this.m_control);this.m_control.displaySystem=this.units;},measureCB:function(event)
{var units=event.units;var measure=event.measure;var prec=3;if(units=="in"||units=="ft")
prec=0;var out="measure: "+measure.toFixed(prec)+" "+units;this.write(out);},geodesic:function(bool)
{if(bool==true);else;},on:function()
{this.m_control.activate();this.toggleOutput(true);this.m_onOff=true;otp.util.Analytics.gaEvent(otp.util.Analytics.MEASURE);},off:function()
{this.m_control.deactivate();this.toggleOutput(false);this.m_onOff=false;},toggle:function()
{if(this.m_onOff==false)
{this.on();this.m_onOff=true;}
else
{this.off();this.m_onOff=false;}},write:function(msg)
{this.outputMethod.call(this.outputPanel,msg);this.outputPanel.show();},makeButton:function(tbar)
{var retVal={};retVal={id:'measure-button',iconCls:'measure-button',text:this.locale.buttons.measure,tooltip:this.locale.buttons.measureTip,enableToggle:true,scope:this,handler:this.toggle};if(tbar!=null){tbar.addButton(retVal);}
return retVal;},toggleOutput:function(bool)
{if(bool==false){this.outputPanel.hide();this.outputPanel.disable();}else{this.outputPanel.enable();this.clearOutput();this.outputPanel.show();}},clearOutput:function(bool)
{this.write(this.locale.buttons.measureInfo);},makeExtToolTip:function()
{this.outputPanel=new Ext.ToolTip({target:this.outputParentDiv,title:this.locale.buttons.measureInfo,width:175,dismissDelay:0,showDelay:0,disabled:true,hidden:true,trackMouse:true});this.outputMethod=this.outputPanel.setTitle;},CLASS_NAME:"otp.core.Measure"};otp.core.Measure=new otp.Class(otp.core.Measure);
otp.namespace("otp.core");otp.core.SolrComboBoxStatic={url:'/solr/select',divID:'search-item',initialize:function(config)
{console.log("enter SolrComboBox constructor");otp.inherit(this,otp.core.ComboBoxStatic);if(otp.isLocalHost())
this.url='/js/otp/planner/test/solr-geo.json';otp.configure(this,config);this.template=this.template||this._makeTemplate();this.store=this._makeStore();this.form=this._makeForm();console.log("exit SolrComboBox constructor");},selectCB:function(record,index)
{try
{console.log("enter SolrComboBox.selectCB "+record+" "+index);var name=record.data['name'];var lat=record.data['lat'];var lon=record.data['lon'];this.PARENT.setNameLatLon(name,lat,lon,record.data,true);this.PARENT.selectPoiCB(lon,lat,name,true);this.collapse();console.log("exit SolrComboBox.selectCB "+record+" "+index);}
catch(e)
{console.log("EXCEPTION: SolrComboBox.selectCB "+e);}},selectPoiCB:function(x,y,text,moveMap)
{try
{this.poi.removeIntermediate(this.m_intermediate);this.m_intermediate=null;if(otp.util.Constants.fromFormID==this.id)
this.poi.setFrom(x,y,text,moveMap);else if(otp.util.Constants.toFormID==this.id)
this.poi.setTo(x,y,text,moveMap);else
this.m_intermediate=this.poi.addIntermediate(x,y,text,moveMap);}
catch(e)
{}},hoverCB:function(record,index)
{try
{var c=otp.util.ObjUtils.getNamedCoordRecord(record.data,this.poi.isMercator);this.hoverPoiCB(c.x,c.y,c.name,false);}
catch(e)
{console.log("EXCEPTION: SolrComboBox.hoverCB "+e);}},hoverPoiCB:function(x,y,text,moveMap)
{this.poi.removeIntermediate(this.m_intermediate);this.m_intermediate=this.poi.addIntermediate(x,y,text,moveMap);},focusCB:function(combo)
{},expandCB:function(combo)
{},_makeStore:function()
{var retVal=otp.util.SolrUtils.makeSolrStore(this.url,{baseParams:{wt:'json',qt:'dismax',rows:this.maxNumValues}});return retVal;},_makeForm:function()
{var sel='div.'+this.divID;var parent=this;var retVal=new Ext.form.ComboBox({id:this.id,cls:this.cls,hiddenName:this.name,fieldLabel:this.label,displayField:this.display,msgTarget:this.msgTarget,tpl:this.template,emptyText:this.emptyText,loadingText:this.locale.indicators.searching,valueNotFoundText:'',anchor:this.anchor,PARENT:parent,store:this.store,itemSelector:sel,onSelect:this.selectCB,queryParam:'q',minChars:1,pageSize:10,editable:true,typeAhead:false,hideTrigger:false,hideLabel:true,selectOnFocus:true,keys:{key:[10,13],handler:function(key){try{this.expand();}catch(Ex){}}}});retVal.on('expand',function(combo){if(combo&&combo.view)
{combo.view.on('dblclick',combo.collapse,this);combo.view.on('contextmenu',combo.collapse,this);this.PARENT.expandCB(combo);}});retVal.on('focus',function(combo){try{combo.expand();this.PARENT.focusCB(combo);}
catch(Ex){}});retVal.origOnViewOver=retVal.onViewOver;retVal.onViewOver=function(e,t){try
{this.origOnViewOver(e,t);var item=this.view.findItemFromChild(t);if(item){var index=this.view.indexOf(item);var rec=this.store.getAt(index);this.PARENT.hoverCB(rec,index);}}
catch(e)
{}}
return retVal;},_makeTemplate:function()
{var placeTypeTpl=''
+'<tpl if="type_name != null && type_name.length &gt; 0">'
+' ({type_name}'
+'<tpl if="stop_id != null && stop_id.length &gt; 0">'
+' {stop_id}'
+'</tpl>'
+')'
+'</tpl>';var cityTpl=''
+'<tpl if="city != undefined && city.length &gt; 0">'
+' {city}'
+'</tpl>';var nameCityType='{name}'+cityTpl+placeTypeTpl;var retVal=new Ext.XTemplate('<tpl for=".">','<div class="'+this.divID+'" >',nameCityType,'</div>','</tpl>');return retVal;},CLASS_NAME:"otp.core.SolrComboBox"};otp.core.SolrComboBox=new otp.Class(otp.core.SolrComboBoxStatic);
otp.namespace("otp.core");otp.core.UI={locale:otp.locale.English,north:null,south:null,east:null,west:null,center:null,accordion:null,innerCenter:null,innerSouth:null,innerEast:null,viewport:null,map:null,alwaysUseDefaultNorthWestCenter:false,centerTitle:'',rtl:false,initialize:function(config)
{otp.configure(this,config);if(config.locale.config.rtl){this.rtl=true;Ext.get(document.body).set({'dir':'rtl'});}
this.viewport=new Ext.Viewport({layout:'border',deferredRender:false,items:this._getSubPanels()});if(this.south==null)this.south=this.innerSouth;if(this.east==null)this.east=this.innerEast;},_getSubPanels:function()
{var retVal=[];if(this.alwaysUseDefaultNorthWestCenter||(this.north==null&&this.south==null&&this.east==null&&this.west==null&&this.center==null))
{var innerCtr={id:'center-inner',region:'center',layout:'fit',html:'this is the (inner) center panel'};if(this.map)
{innerCtr=new GeoExt.MapPanel({id:otp.util.OpenLayersUtils.MAP_PANEL,region:'center',layout:'fit',stateful:false,map:this.map.getMap(),zoom:this.map.getMap().getZoom(),bodyStyle:'background-color:#F7F7F2'});}
var centerConfig={title:this.centerTitle,region:'center',id:'center',layout:'border',margins:'1 0 0 0',hideMode:'offsets',items:[innerCtr,{hidden:true,id:'south',region:'south',html:'this is the (inner) south panel',layout:'fit',style:{overflow:'auto'},height:180,border:false,split:true,useSplitTips:true,collapseMode:'mini'},{hidden:true,id:'east',region:'east',html:'this is the (inner) east panel',layout:'fit',border:false,width:250,split:true,useSplitTips:true,collapseMode:'mini'}]}
this.center=new Ext.Panel(centerConfig);this.innerCenter=this.center.getComponent(0);this.innerSouth=this.center.getComponent(1);this.innerEast=this.center.getComponent(2);this.west=new Ext.Panel({layout:'accordion',region:this.rtl?'east':'west',id:'west-panel',header:false,width:360,minSize:150,maxSize:450,margins:'30 0 1 1',split:true,useSplitTips:true,collapsible:true,collapseMode:'mini',collapsible:true,layoutConfig:{animate:true,collapseFirst:true}});this.accordion=this.west;}
if(this.south)retVal.push(this.south);if(this.east)retVal.push(this.east);if(this.west)retVal.push(this.west);if(this.center)retVal.push(this.center);if(this.north)retVal.push(this.north);return retVal;},doLayout:function()
{this.viewport.doLayout();},fullScreen:function(doFull)
{if(doFull)
{if(this.south)this.south.collapse();if(this.innerSouth&&this.south!=this.innerSouth)this.innerSouth.collapse();if(this.east)this.east.collapse();if(this.innerEast&&this.innerEast!=this.east)this.innerEast.collapse();if(this.west)this.west.collapse();this.isFullScreen=true;}
else
{if(this.south)this.south.expand();if(this.innerSouth&&this.south!=this.innerSouth)this.innerSouth.expand();if(this.east)this.east.expand();if(this.innerEast&&this.innerEast!=this.east)this.innerEast.expand();if(this.west)this.west.expand();this.isFullScreen=false;}
this.doLayout();},clear:function()
{this.doLayout();},CLASS_NAME:"otp.core.UI"}
otp.core.UI=OpenLayers.Class(otp.core.UI);
otp.namespace("otp.systemmap");otp.systemmap.Popup={map:null,doc:null,klass:null,displayDepartures:null,popup:null,xy:null,timeoutId:null,sysmap:null,id:null,initialize:function(config){otp.configure(this,config);var routes=this.doc.routes;var departures=this.doc.departures;if(!departures instanceof Array){departures=[departures];}
if(!routes instanceof Array){routes=[routes];}
var popupTemplate=new Ext.Template(['<h2>{stopName}</h2>','<ul class="routelist">','{routeList}','</ul>']);var routeListTemplate=new Ext.Template('<li><img src="{iconPath}" /></li>');var routeList=[];var routesSeen={};Ext.each(routes,function(route){var shortName=route.shortName;if(shortName in routesSeen){return;}
var iconPath=otp.util.imagePathManager.imagePath({agencyId:route.agencyId,mode:route.mode,route:shortName});routeList.push(routeListTemplate.apply({iconPath:iconPath}));routesSeen[shortName]=iconPath;});routeList=routeList.join('');var html=popupTemplate.apply({stopName:this.doc.name,routeList:routeList});if(this.displayDepartures){var upcomingDeparturesTemplate=new Ext.Template(['<h3>Upcoming departures</h3>','<ul class="departures">','{departureList}','</ul>']);var departuresTemplate=new Ext.Template(['<li class="departure">','<img src="{iconPath}" class="popup-route-icon" />','<strong>{headsign}</strong> - {dateFormatted}','</li>']);departureList=[];Ext.each(departures,function(departure){var headsign=departure.headsign;var date=departure.date;var iconPath=routesSeen[departure.route.shortName];departureList.push(departuresTemplate.apply({iconPath:iconPath,headsign:headsign,dateFormatted:otp.util.DateUtils.prettyTime(date)}));});departureList=departureList.join('');html+=upcomingDeparturesTemplate.apply({departureList:departureList});}
var pixel=new OpenLayers.Pixel(this.xy.x,this.xy.y);var lonlat=this.map.getLonLatFromPixel(pixel);var self=this;var popup=new OpenLayers.Popup(null,lonlat,new OpenLayers.Size(200,200),html,true,function(){self.sysmap.popupClosed(self.id);self.removePopup();});if(this.klass){popup.displayClass=this.klass;popup.div.className=popup.displayClass;}
this.map.addPopup(popup);this.popup=popup;},removePopup:function(){if(this.popup){this.map.removePopup(this.popup);this.popup.destroy();this.popup=null;}},triggerClose:function(timeout){var self=this;this.timeoutId=setTimeout(function(){self.removePopup();},timeout);},CLASS_NAME:'otp.systemmap.Popup'};otp.systemmap.Popup=new otp.Class(otp.systemmap.Popup);
otp.namespace("otp.systemmap");otp.systemmap.Systemmap={locale:otp.locale.English,map:null,layerRoutes:null,layerStops:null,layerRoutesHighlighted:null,layerStopsHighlighted:null,layerUrlRoutes:null,layerUrlStops:null,layerUrlRoutesHighlighted:null,layerUrlStopsHighlighted:null,layerNamesRoute:null,layerNamesStop:null,layerNamesRouteHighlighted:null,layerNamesStopHighlighted:null,controlStopsHover:null,controlStopsClick:null,controlStopsUrl:null,lastClickedPopup:null,lastHoveredPopup:null,highlightedStops:[],initialize:function(config)
{this.systemmap=this;otp.configure(this,config);this.loadSystemMap();},loadSystemMap:function()
{var map=this.map.getMap();if(!this.layerRoutes){this.layerRoutes=new OpenLayers.Layer.WMS('systemmap-wms-layer-routes',this.layerUrlRoutes,{layers:this.layerNamesRoute,isBaseLayer:false,transparent:true});this.layerStops=new OpenLayers.Layer.WMS('systemmap-wms-layer-stops',this.layerUrlStops,{layers:this.layerNamesStop,isBaseLayer:false,transparent:true});this.layerRoutesHighlighted=new OpenLayers.Layer.WMS('systemmap-wms-layer-routes-highlighted',this.layerUrlRoutesHighlighted,{layers:this.layerNamesRouteHighlighted,isBaseLayer:false,transparent:true});this.layerStopsHighlighted=new OpenLayers.Layer.WMS('systemmap-wms-layer-routes-highlighted',this.layerUrlStopsHighlighted,{layers:this.layerNamesStopHighlighted,isBaseLayer:false,transparent:true});map.addLayers([this.layerRoutes,this.layerStops,this.layerRoutesHighlighted,this.layerStopsHighlighted]);this.layerRoutesHighlighted.setVisibility(false);this.layerStopsHighlighted.setVisibility(false);var layerSwitcherControl=new OpenLayers.Control.LayerSwitcher();map.addControl(layerSwitcherControl);layerSwitcherControl.activate();this.loadPopupBehavior();var raiseTripLayers=function(){var layersToRaise=[];Ext.each(map.layers,function(layer){if(typeof layer.name==='string'&&layer.name.indexOf('trip')!==-1){layersToRaise.push(layer);}});Ext.each(layersToRaise,function(layer){map.raiseLayer(layer,1);});};this.layerRoutes.events.on({loadend:raiseTripLayers});this.layerStops.events.on({loadend:raiseTripLayers});}},highlightedStopFeatureIds:function(){var newids=Ext.flatten(arguments);var allids=this.highlightedStops.concat(newids);return allids.join(",");},displayHighlightedLayer:function(layer,featureIdsAsString){if(featureIdsAsString===""){delete layer.params['featureId'];layer.setVisibility(false);}else{layer.mergeNewParams({featureId:featureIdsAsString});layer.setVisibility(true);}},loadPopupBehavior:function(){var map=this.map.getMap();var self=this;if(!this.controlStopsHover){this.controlStopsHover=new OpenLayers.Control.WMSGetFeatureInfo({hover:true,url:this.controlStopsUrl,layerUrls:[this.layerUrlStops],layers:[this.layerStops],eventListeners:{getfeatureinfo:function(event){var nostops=false;try{var doc=Ext.util.JSON.decode(event.text);}catch(err){nostops=true;}
if(!doc||!doc.type||doc.type!=='stop'){nostops=true;}
if(nostops){self.displayHighlightedLayer(self.layerStopsHighlighted,self.highlightedStopFeatureIds());if(self.lastHoveredPopup){self.lastHoveredPopup.triggerClose(500);self.lastHoveredPopup=null;}
return;}
doc=doc.stop;var stopId='stops.'+doc.stopId;if(self.lastHoveredPopup&&self.lastHoveredPopup.id===stopId){return;}else if(self.lastHoveredPopup){self.lastHoveredPopup.triggerClose(500);self.lastHoveredPopup=null;}
if(self.lastClickedPopup&&self.lastClickedPopup.id===stopId){self.displayHighlightedLayer(self.layerStopsHighlighted,self.highlightedStopFeatureIds());return;}
var popup=new otp.systemmap.Popup({map:map,id:stopId,doc:doc,klass:'olHoverPopup',displayDepartures:false,xy:event.xy,sysmap:self});self.lastHoveredPopup=popup;self.displayHighlightedLayer(self.layerStopsHighlighted,self.highlightedStopFeatureIds(stopId));}}});this.controlStopsClick=new OpenLayers.Control.WMSGetFeatureInfo({hover:false,url:this.controlStopsUrl,layerUrls:[this.layerUrlStops],layers:[this.layerRoutes,this.layerStops],eventListeners:{beforegetfeatureinfo:function(event){if(self.lastClickedPopup){self.lastClickedPopup.triggerClose(500);self.lastClickedPopup=null;}
self.layerStopsHighlighted.setVisibility(false);self.layerRoutesHighlighted.setVisibility(false);self.layerStops.setOpacity(1.0);self.layerRoutes.setOpacity(1.0);},getfeatureinfo:function(event){var nodata=false;try{var doc=Ext.util.JSON.decode(event.text);}catch(err){nodata=true;}
if(!doc||!doc.type||!(doc.type==='stop'||doc.type==='routes')){nodata=true;}
if(nodata){self.highlightedStops=[];return;}
if(doc.type==='routes'){var stopIds=[];Ext.each(doc.stopids,function(stopId){stopIds.push("stops."+stopId);});self.highlightedStops=stopIds;self.displayHighlightedLayer(self.layerStopsHighlighted,self.highlightedStopFeatureIds());var routeIds=[];Ext.each(doc.routes,function(route){routeIds.push("routes."+route.routeId);});routeIds=routeIds.join(",");self.displayHighlightedLayer(self.layerRoutesHighlighted,routeIds);}else{doc=doc.stop;var stopId="stops."+doc.stopId;var popup=new otp.systemmap.Popup({map:map,id:stopId,doc:doc,displayDepartures:true,xy:event.xy,sysmap:self});self.lastClickedPopup=popup;if(self.lastHoveredPopup&&self.lastHoveredPopup.id===stopId){self.lastHoveredPopup.removePopup();self.lastHoveredPopup=null;}
self.highlightedStops=[stopId];self.displayHighlightedLayer(self.layerStopsHighlighted,self.highlightedStopFeatureIds());var routes=doc.routes;var routeIds=[];Ext.each(routes,function(route){routeIds.push("routes."+route.routeId);});var featureId=routeIds.join(",");self.displayHighlightedLayer(self.layerRoutesHighlighted,featureId);}
self.layerRoutes.setOpacity(0.1);self.layerStops.setOpacity(0.1);}}});map.addControl(this.controlStopsHover);this.controlStopsHover.activate();map.addControl(this.controlStopsClick);this.controlStopsClick.activate();}},popupClosed:function(popupId){this.layerStops.setOpacity(1.0);this.layerRoutes.setOpacity(1.0);this.layerRoutesHighlighted.setVisibility(false);this.layerStopsHighlighted.setVisibility(false);this.highlightedStops.remove(popupId);},CLASS_NAME:"otp.systemmap.Systemmap"};otp.systemmap.Systemmap=new otp.Class(otp.systemmap.Systemmap);
otp.namespace('otp.application');otp.application.Attribution={attributionHtml:null,panel:null,panelTitle:null,initialize:function(config){otp.configure(this,config);this.panel=new Ext.Panel({html:this.attributionHtml,title:this.panelTitle,layout:'fit'});},getPanel:function(){return this.panel;},CLASS_NAME:"otp.application.Attribution"};otp.application.Attribution=new otp.Class(otp.application.Attribution);
otp.namespace("otp.application");otp.application.Controller={map:null,ui:null,poi:null,cm:null,planner:null,params:null,initialize:function(config)
{this.config=otp.util.ObjUtils.getConfig(config);if(this.config.planner.options.showBikeshareMode)
{otp.locale.English.tripPlanner.mode=otp.locale.English.tripPlanner.with_bikeshare_mode;}
otp.inherit(this.config.map,{cm:this.cm,locale:this.config.locale,routerId:this.config.routerId,attribution:otp.util.ExtUtils.MAP_ATTRIBUTION,plannerOptions:this.config.planner.options,options:{controls:[]}});this.params=new otp.util.ParseUrlParams();this.map=new otp.core.Map(this.config.map);this.ui=new otp.core.UI({map:this.map,locale:this.config.locale});otp.util.HtmlUtils.fixHtml(this.config);otp.util.imagePathManager.addCustomAgencies(this.config.useCustomIconsForAgencies);this.poi=new otp.planner.poi.Control({map:this.map.getMap()});var purl=this.params.getPlannerUrl(this.config.planner.url);var pconfig=this.config.planner;pconfig.url=purl;pconfig.map=this.map;pconfig.poi=this.poi;pconfig.ui=this.ui;pconfig.locale=this.config.locale;pconfig.routerId=this.config.routerId;pconfig.geocoder_cfg=pconfig.geocoder;this.planner=new otp.planner.Planner(pconfig);this.makeContextMenu();this.ui.accordion.add(this.planner.getPanel());if(this.config.systemMap&&this.config.systemMap.enabled){this.sm=new otp.systemmap.Systemmap(Ext.apply({},{map:this.map},config.systemMap));}
if(this.config.attributionPanel&&this.config.attributionPanel.enabled){this.attributionPanel=new otp.application.Attribution(this.config.attributionPanel);this.ui.accordion.add(this.attributionPanel.getPanel());}
this.ui.doLayout();this.load();if(this.config.splashScreen&&this.config.splashScreen.enabled){otp.util.ExtUtils.makePopup(this.config.splashScreen,this.config.splashScreen.title,true,600,300,true);}},load:function()
{var p=this.params.getPoi(this.poi,this.map);if(this.params.isFullScreen())
this.ui.fullScreen(true);var forms=this.planner.getForms();forms.populate(this.params.m_params);if(this.params.hasSubmit()){forms.submit();}},makeContextMenu:function()
{var cmConfig={locale:this.config.locale};if(this.config.plannerContextMenu)
cmConfig.forms=this.planner.getForms();if(this.config.mapContextMenu)
cmConfig.map=this.map;this.cm=new otp.planner.ContextMenu(cmConfig);this.cm.map=this.map;},CLASS_NAME:"otp.application.Controller"};otp.application.Controller=new otp.Class(otp.application.Controller);
if(typeof(otp)=="undefined"||otp==null)otp={};if(typeof(otp.config)=="undefined"||otp.config==null)otp.config={};if(typeof(otp.config.locale)=="undefined"||otp.config.locale==null)otp.config.locale=otp.locale.English;otp.osm_att="Map data © <a href='http://www.openstreetmap.org/' target='_blank'>OpenStreetMap</a> contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/' target='_blank'>CC BY-SA</a>.  ";otp.ol_rez=[156543.03390000000945292413,78271.51695000000472646207,39135.75847500000236323103,19567.87923750000118161552,9783.93961875000059080776,4891.96980937500029540388,2445.98490468750014770194,1222.99245234375007385097,611.49622617187503692548,305.74811308593751846274,152.87405654296875923137,76.43702827148437961569,38.21851413574218980784,19.10925706787109490392,9.55462853393554745196,4.77731426696777372598,2.38865713348388686299,1.19432856674194343150,0.59716428337097171575,0.29858214168548585787,0.14929107084274292894,0.07464553542137146447,0.03732276771068573223,0.01866138385534286612,0.00933069192767143306];otp.config_defaults={routerId:null,locale:otp.config.locale,metricsSystem:otp.config.locale.config.metricsSystem,planner:{url:null,printUrl:"print.html",maxTransfers:null,appName:"OpenTripPlanner Map",options:{showElevationGraph:true,showBikeshareMode:true,showTrainMode:true,showWheelchairForm:true,showIntermediateForms:true,showStopCodes:true,showAgencyInfo:true,showFareInfo:true,showReverseButton:true,showEditButton:true,showPrintButton:true,showLinksButton:true,showLayerSwitcher:true,setMaxExtentToDefault:true,useOptionDependencies:true,useRouteLongName:false,appendGeocodeName:true,OPTIONS_NOTE:"THIS IS A STRUCTURE USED TO CUSTOMIZE THE TRIP FORMS AND OTHER BEHAVIORS"},itineraryMessages:{icon:null,transit:"This is an Itinerary Message test...",transit:null,bus:null,train:null,bicycle:null,bicycle_transit:null,walk:null},linkTemplates:[{name:otp.config.locale.tripPlanner.link.text,url:'index.html#/'+otp.planner.ParamTemplate},{name:otp.config.locale.tripPlanner.link.trip_separator,separator:true},{name:otp.config.locale.tripPlanner.link.google_transit,url:otp.config.locale.tripPlanner.link.google_domain+'/maps?<tpl if="arriveBy == \'Arrive\'">ttype=arr&</tpl>date={date}&time={time}&daddr={toLat},{toLon}&saddr={fromLat},{fromLon}&ie=UTF8&dirflg=r'},{name:otp.config.locale.tripPlanner.link.bike_separator,separator:true},{name:otp.config.locale.tripPlanner.link.google_bikes,url:otp.config.locale.tripPlanner.link.google_domain+'/maps?daddr={toLat},{toLon}&saddr={fromLat},{fromLon}&ie=UTF8&dirflg=b'},{name:otp.config.locale.tripPlanner.link.walk_separator,separator:true},{name:otp.config.locale.tripPlanner.link.google_walk,url:otp.config.locale.tripPlanner.link.google_domain+'/maps?daddr={toLat},{toLon}&saddr={fromLat},{fromLon}&ie=UTF8&dirflg=w'}],geocoder:{enabled:false,url:"/geocoder/geocode",addressParamName:"address"},fromToOverride:new Ext.Template('<div class="mapHelp">'+otp.config.locale.config.rightClickMsg+'</div>')},map:{defaultExtent:"automatic",options:{projection:new OpenLayers.Projection("EPSG:900913"),displayProjection:new OpenLayers.Projection("EPSG:4326"),numZoomLevels:20,controls:[]},baseLayer:[new OpenLayers.Layer.OSM("Open Street Map"),new OpenLayers.Layer.OSM("Mapbox Streets",["http://a.tiles.mapbox.com/v3/mapbox.mapbox-streets/${z}/${x}/${y}.png","http://b.tiles.mapbox.com/v3/mapbox.mapbox-streets/${z}/${x}/${y}.png","http://c.tiles.mapbox.com/v3/mapbox.mapbox-streets/${z}/${x}/${y}.png","http://d.tiles.mapbox.com/v3/mapbox.mapbox-streets/${z}/${x}/${y}.png"],{numZoomLevels:18,attribution:otp.osm_att+"Tiles from<a href='http://mapbox.com/about/maps' target='_blank'> MapBox Streets.</a>"}),new OpenLayers.Layer.OSM("Open Cycle Map",["http://a.tile.opencyclemap.org/cycle/${z}/${x}/${y}.png","http://b.tile.opencyclemap.org/cycle/${z}/${x}/${y}.png","http://c.tile.opencyclemap.org/cycle/${z}/${x}/${y}.png"],{numZoomLevels:17,attribution:otp.osm_att+"and <a href='www.opencyclemap.org' target='_blank'>OpenCycleMap </a>"}),new OpenLayers.Layer.OSM("OSM MapQuest",["http://otile2.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png","http://otile3.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png","http://otile4.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png"],{sphericalMecator:true,isBaseLayer:true,numZoomLevels:19,attribution:otp.osm_att+" Tiles courtesy of <a href='http://open.mapquest.com/' target='_blank'>MapQuest</a>"}),new OpenLayers.Layer.OSM("Limited Zoom Example",["http://otile2.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png","http://otile3.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png","http://otile4.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png"],{serverResolutions:otp.ol_rez,maxResolution:76.43702827148437961569,sphericalMecator:true,isBaseLayer:true,numZoomLevels:8,attribution:otp.osm_att+" Tiles courtesy of <a href='http://open.mapquest.com/' target='_blank'>MapQuest</a>"})],baseLayerOptions:{projection:new OpenLayers.Projection("EPSG:4326"),url:'http://maps.opengeo.org/geowebcache/service/wms',layers:['openstreetmap'],format:'image/png',transitionEffect:'resize'}},attributionPanel:{enabled:false,panelTitle:otp.config.locale.config.attribution.title,attributionHtml:'<p class="disclaimer">'+otp.config.locale.config.attribution.content+'</p>'},splashScreen:{enabled:false,timeout:20,title:'Important: Please read',html:'<p class="splash-screen">'
+'Please note that the trip routing presented here is for demonstration purposes of the <a href="http://opentripplanner.com" target="#">OpenTripPlanner (OTP)</a> only, '
+'and not intended as a travel resource.  You will begin to see improvements in the planned trips as the project matures.  A public beta is scheduled for spring 2011. '
+'</p>'},systemMap:{enabled:false,layerUrlRoutes:'http://localhost:5180/geoserver/wms',layerUrlStops:'http://localhost:5180/geoserver/wms',layerUrlRoutesHighlighted:'http://localhost:5180/geoserver/wms',layerUrlStopsHighlighted:'http://localhost:5180/geoserver/wms',layerNamesRoute:'routes',layerNamesStop:'stops',layerNamesRouteHighlighted:'routes_highlighted',layerNamesStopHighlighted:'stops_highlighted',controlStopsUrl:'/opentripplanner-api-extended/wms'},logo:null,useCustomIconsForAgencies:[],plannerContextMenu:true,mapContextMenu:true,CLASS_NAME:"otp.config"};try{otp.inherit(otp.config,otp.config_defaults);otp.configure(otp.config,otp.config_defaults);console.log("otp.config updated with default items from otp.config_static");}catch(e){console.log("ERROR: was unable to run otp.inherid override in config.js - got this exception: "+e);};