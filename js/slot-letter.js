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
var goldCoinArray=[];
var goldCoinNum=100;
var goldCoinNumCount=0;
var goldCoinMinSize=40;
var goldCoinMaxSize=100;
var goldCreationVelocity=100;
var goldAnimationVelocity=10;
var golCoinAnimInterval;
var golCoinCreateInterval;

    
var sndLoop = document.getElementById("loop");
sndLoop.loop=true;
var sndFinish = document.getElementById("finish");
var sndPress = document.getElementById("press");
var sndSlot1= document.getElementById("slot-stop-1");
var sndSlot2= document.getElementById("slot-stop-2");
var sndSlot3= document.getElementById("slot-stop-3");
var sndSlot4= document.getElementById("slot-stop-4");
sndLoop.play();
    
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
        sndLoop.play();
    }else{
        if(slotAnimationFinishFlag){
            personName=centerStringInSlot(nameJson.data[0].NOMBRE_PILA);
            personLastName=centerStringInSlot(nameJson.data[0].APELLIDO_PATERNO);
            personSecondLastName=centerStringInSlot(nameJson.data[0].APELLIDO_MATERNO);

            slotData=[personName,personLastName,personSecondLastName];
            //putName();
            interval=setInterval(putNameOneLetterAtTime,30);
            slotAnimationFinishFlag=false;
            sndPress.play();
        }else{
            timeDelaySlotAnim=TIMEDELAYSHORT;
        }
    }
  
        ;

});

function putNameOneLetterAtTime(){
    if(timerCount%timeDelaySlotAnim==0){
        if(rowCount<slotRowNum){
            var selectSlot=$(".slot-row-container")[columnCount].children[rowCount];
                if(slotData[columnCount][0]!=undefined){
                    playRandomSlotSound();
                    selectSlot.innerHTML="<div class='letter-anim'>"+slotData[columnCount][0]+"</div>";
                    slotData[columnCount]=slotData[columnCount].slice(1,slotData[columnCount].length);
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
                sndLoop.pause();
                sndFinish.play();
                golCoinCreateInterval=setInterval(createGoldCoins,goldCreationVelocity);
            }
        }
    }
    timerCount++;
}

    function playRandomSlotSound(){
        var pichSound=Math.round(Math.random()*4)
        console.log("SLOT SOUND");
        switch(pichSound){
                case 1:
                sndSlot1.play();
                break;
                
                case 2:
                sndSlot2.play();
                break;
                
                case 3:
                sndSlot3.play();
                break;
                
                case 4:
                sndSlot4.play();
                break;
        }
        
        
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
    

    
function createGoldCoins(){
    var goldCoinContainer=$(".gold-coin-container");
    if(goldCoinContainer.children().length==0){
        golCoinAnimInterval=setInterval(animateGoldCoins,30);
    }

    var goldPosx=Math.random()*window.innerWidth;
    var goldSize=goldCoinMinSize+(Math.random()*(goldCoinMaxSize-goldCoinMinSize));
    var goldPosy=100;
    goldCoinContainer.prepend("<div class='gold-coin'></div>");
    var newGold=goldCoinContainer.children()[0];
    $(newGold).css("width",goldSize);
    $(newGold).css("height",goldSize);
    $(newGold).css("left",goldPosx);
    $(newGold).css("top",-goldSize);
    
    goldCoinNumCount++;
    
    if(goldCoinNumCount>=goldCoinNum){
        clearInterval(golCoinCreateInterval);
        goldCoinNumCount=0;
    }
    
}
    
function animateGoldCoins(){
    for(var goldCoinAnimNum=0;goldCoinAnimNum<$(".gold-coin-container").children().length;goldCoinAnimNum++){
        var goldCoinAnim=$(".gold-coin-container").children()[goldCoinAnimNum];
        var endVelocity=goldAnimationVelocity/((parseInt($(goldCoinAnim).css("width")))*0.01);
        $(goldCoinAnim).css("top",parseInt($(goldCoinAnim).css("top"))+endVelocity);
        if(parseInt($(goldCoinAnim).css("top"))>window.innerHeight){
            goldCoinAnim.remove();
            break;
        }
    }
   
}
       
$.get("http://condor2.utalca.cl/pls/sap_test/pkg_integra_utal.Get_ganador_aniversario",function(data,status){console.log(data);})

console.log(nameJson.data[0].NOMBRE_PILA+" "+nameJson.data[0].APELLIDO_PATERNO+" "+nameJson.data[0].APELLIDO_MATERNO);
    
});