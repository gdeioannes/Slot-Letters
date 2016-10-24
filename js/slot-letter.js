/*This is a project made by Gabriel De Ioannes Becker from the University of talca
The project is just a letter visualizer with a slot machine animation in it, it's the fist try
in maka a JS library so, be patient with me. 
Thanks!
*/
$(window).ready(function(){
var name2={names:["Gabriel De Ioannes Becker","Felipe Besoain","Pablo Rojas"]}

var slotRowNum=14 ;
var slotColumnNum=3;
var slotMargin=5;
createSlots();
var slots=$(".slot");
var slotFinishFlag=false;
var slotAnimationFinishFlag=true;
var interval;
var timerCount=0;
var rowCount=0;
var columnCount=0;
var personName;
var personLastName;
var personSecondLastName;
var slotData;
var TIMEDELAYLONG=10;
var TIMEDELAYSHORT=1;
var timeDelaySlotAnim=TIMEDELAYLONG;

var nameJson={"data":[{"NOMBRE_PILA":"PEDRO JUAN"
,"APELLIDO_MATERNO":"GONZALES"
,"APELLIDO_PATERNO":"WOYWOOD"
}]}

slotsCSS();

function createSlots(){
    $(".slot-Container").html("");
    for(var slotColumCount=0;slotColumCount<slotColumnNum;slotColumCount++){
        $(".slot-Container").append('<div class="slot-row-container"></div>');
        for(var slotCount=0;slotCount<slotRowNum;slotCount++){
            var slotRowContainer=$('.slot-row-container')[slotColumCount];
            $(slotRowContainer).append('<div class="slot"><img src="img/slot-anim.gif"></div>');
           
        }
    }
    slotsCSS();
}

function slotsCSS(){
        var slotSize=($('.slot-container').width()/slotRowNum)-slotMargin;
            $(".slot").css("width",slotSize-slotSize*0.25);
            $(".slot").css("height",((slotSize-slotSize*0.25)/150)*200);
            $(".slot").css("margin",slotMargin);
            $(".slot").css("font-size",slotSize*0.9);
            $('.slot-container').css("padding",slotSize*0.2);
            $('.slot-row-container').css("padding",slotSize*0.15);
            $('.slot-row-container').css("margin",slotSize*0.15);
}

$(window).resize(function(){
    slotsCSS();    
});

$(window).keydown  (function(){
    if(slotFinishFlag){
        createSlots();
        slotFinishFlag=false
    }else{
        if(slotAnimationFinishFlag){
        personName=centerStringInSlot(nameJson.data[0].NOMBRE_PILA);
        personLastName=centerStringInSlot(nameJson.data[0].APELLIDO_PATERNO);
        personSecondLastName=centerStringInSlot(nameJson.data[0].APELLIDO_MATERNO);
            
        slotData=[personName,personLastName,personSecondLastName];
        //putName();
        interval=setInterval(putNameOneLetterAtTime,30);
        slotAnimationFinishFlag=false;
        }else{
            timeDelaySlotAnim=TIMEDELAYSHORT;
        }
    }
  
        ;

});

function putNameOneLetterAtTime(){
    if(timerCount%timeDelaySlotAnim==0){
        if(rowCount<slotRowNum){
            console.log("Column Count "+columnCount);
            var selectSlot=$(".slot-row-container")[columnCount].children[rowCount];
                console.log(selectSlot);
                if(slotData[columnCount][0]!=undefined){
                    selectSlot.innerHTML="<div class='letter-anim'>"+slotData[columnCount][0]+"</div>";
                    slotData[columnCount]=slotData[columnCount].slice(1,slotData[columnCount].length);
                    console.log(slotData[columnCount]);
                }else{
                    selectSlot.innerHTML=" ";
                }
            rowCount++;
        }else{
            if(columnCount<slotColumnNum-1){
                columnCount++;
                rowCount=0;
            }else{
                console.log("Slot Finish");
                clearInterval(interval);
                timerCount=0;
                rowCount=0;
                columnCount=0;
                slotAnimationFinishFlag=true;
                slotFinishFlag=true;
                timeDelaySlotAnim=TIMEDELAYLONG;
            }
        }
    }
    timerCount++;
}
    
    
function putName(){
    for(var slotColumNumArray=0;slotColumNumArray<slotColumnNum;slotColumNumArray++){
        for(var slotRowNumArray=0;slotRowNumArray<slotRowNum;slotRowNumArray++){
            var selectSlot=$(".slot-row-container")[slotColumNumArray].children[slotRowNumArray];
            console.log(selectSlot);
            if(slotData[slotColumNumArray][0]!=undefined){
                selectSlot.innerHTML="<div class='letter-anim'>"+slotData[slotColumNumArray][0]+"</div>";
                slotData[slotColumNumArray]=slotData[slotColumNumArray].slice(1,slotData[slotColumNumArray].length);
                console.log(slotData[slotColumNumArray]);
            }else{
                selectSlot.innerHTML=" ";
            }
        }
        console.log("CHANGE COLUM");
    }
    slotFinishFlag=true;
}

    
    
function centerStringInSlot(someName){
    if(someName.length>slotRowNum){
     someName=someName.substring(0, someName.indexOf(' '));
    }
 for(var slotRowNumArray=0;slotRowNumArray<slotRowNum;slotRowNumArray++){
     var nameDiference=Math.round((slotRowNum-someName.length)/2);
     var newName=new Array(nameDiference+1).join(' ')+someName;
 }
    return newName;
}
       
$.get("http://condor2.utalca.cl/pls/sap_test/pkg_integra_utal.Get_ganador_aniversario",function(data,status){console.log(data);})

console.log(nameJson.data[0].NOMBRE_PILA+" "+nameJson.data[0].APELLIDO_PATERNO+" "+nameJson.data[0].APELLIDO_MATERNO);
    
console.log($(".slot-row-container")[0].children[0]);
});