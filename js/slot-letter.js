/*This is a project made by Gabriel De Ioannes Becker from the University of talca
The project is just a letter visualizer with a slot machine animation in it, it's the fist try
in maka a JS library so, be patient with me. 
Thanks!
*/
$(window).ready(function(){
var name2={names:["Gabriel De Ioannes Becker","Felipe Besoain","Pablo Rojas"]}

var slotRowNum=12 ;
var slotColumnNum=3;
var slotMargin=5;
createSlots();
var slots=$(".slot");

var nameJson={"data":[{"NOMBRE_PILA":"EDISON LEANDRO"
,"APELLIDO_MATERNO":"VARELA"
,"APELLIDO_PATERNO":"SALINAS"
}]}

function createSlots(){
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
    putName(nameJson.names);
});

function getLongestLength(someArray){
    var maxLength=0;
    for(var num=0;num<someArray.length;num++){
        var someString=someArray[num];
        if(maxLength<someString.length){
            maxLength=someString.length;
        }
    }
    console.log("MAX LENGTH:"+maxLength);
    return maxLength;
    
}

function putName(nameArray){
    for(var slotColumNumArray=0;slotColumNumArray<slotColumnNum;slotColumNumArray++){
        for(var slotRowNumArray=0;slotRowNumArray<slotRowNum;slotRowNumArray++){
            var selectSlot=$(".slot-row-container")[slotColumNumArray].children[slotRowNumArray];
            console.log(selectSlot);
        }
        console.log("CHANGE COLUM");
    }
}
    
function centerStringInSlot(someName){
 for(var slotRowNumArray=0;slotRowNumArray<slotRowNum;slotRowNumArray++){
     var nameDiference=Math.round((slotRowNum-someName.length)/2);
     var newName=new Array(nameDiference).join(' ')+someName;
 }
    return newName;
}
       
$.get("http://condor2.utalca.cl/pls/sap_test/pkg_integra_utal.Get_ganador_aniversario",function(data,status){console.log(data);})

console.log(nameJson.data[0].NOMBRE_PILA+" "+nameJson.data[0].APELLIDO_PATERNO+" "+nameJson.data[0].APELLIDO_MATERNO);
    
console.log($(".slot-row-container")[0].children[0]);
});