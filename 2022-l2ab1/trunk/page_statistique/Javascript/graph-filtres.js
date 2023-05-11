// Retrieve datas to put in the graph, and also the filters values

const colonneSelect=document.getElementById("graph-select")
const lieuSelect=document.getElementById("lieu-select")
const anneeGraphSelect=document.getElementById("annee-graph-select")


var label=[] //Graphs legends
var datas=[] // Each list represent a type of data : datetime, atm, sex, an-nais, grav, lum 
var chart  //Globals variables that contain the graph, the year, the place, the X-axis  
var inputAnneeGraph
var inputLieu
var typeChart
var inputValueX="datetime"
var listAnneeLieu=[]


var apiGraphLieu="https://data.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime%40public&q=&rows=0&facet=reg_name" //All regions

var apiGraphAnnee="https://data.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime%40public&q=&rows=0&facet=datetime&refine.reg_name=" 

var apiGraphToutesAnnee="https://data.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime%40public&q=&rows=0&facet=datetime"



async function DrawFiltreLieu(){  //Retrieve all regions
    try{
        var res=await fetch(apiGraphLieu)  
        var data=await res.json()
        var listRegion=data.facet_groups[0].facets
    }
    catch{
         console.log("erreur")
    }
    for(var i=0;i<listRegion.length;i++){
        lieuSelect.innerHTML+="<option>"+listRegion[i].name+"</option>"
    }

}

async function DrawFiltreAnnee(){ //Update the secondary filter "année" to display just years where there's atleast one accident in the place chosen.
                                

    if(anneeGraphSelect.childElementCount>0){
        anneeGraphSelect.innerHTML="<select  name='annee' onchange='getAnnee()' id='annee-graph-select'></select>"
        anneeGraphSelect.innerHTML+="<option value='toutes-les-annees'>"+"toutes les années"+"</option>"
    }
    
    if(inputLieu && inputLieu !="tous-les-lieux"){ //Retrieve the years of the selected region
        try{                                              
            var res=await fetch(apiGraphAnnee+inputLieu+excludeYear)
            var data=await res.json()
        }
        catch{
            console.log("erreur")
        }
        listAnneeLieu=data.facet_groups[0].facets


        for(var i=0;i<listAnneeLieu.length;i++){
            
                anneeGraphSelect.innerHTML+="<option value="+listAnneeLieu[i].name+">"+listAnneeLieu[i].name+"</option>"
            
        }
    

    }
    else{
        try{                                              
            var res=await fetch(apiGraphToutesAnnee+excludeYear)
            var data=await res.json()
        }
        catch{
            console.log("erreur")
        }

        listAnneeLieu=data.facet_groups[0].facets


        for(var i=0;i<listAnneeLieu.length;i++){
            if(listAnneeLieu !=2011){
                anneeGraphSelect.innerHTML+="<option value="+listAnneeLieu[i].name+">"+listAnneeLieu[i].name+"</option>"
            }
        }


    }
}



function getValueColonne(){  //Retrieve the graph type chosen
    
    typeChart = colonneSelect.value
    selectColonne()   //Change the graph type
}

function getValueX(){    //Retrieve the data to display

    inputValueX=axeX.value
    
                                          
    if(inputAnneeGraph || inputLieu){  //Initialize secondary filters
        if(inputLieu){
            inputLieu=null
            initLieuSelect()
        }
        if(inputAnneeGraph){
            inputAnneeGraph=null
            initAnneeSelect()
        }
        
    }

    getData()  //Retrieve datas

}

function getAnnee(){
    inputAnneeGraph=anneeGraphSelect.value
    
    getData() //Update datas
}

function getLieu(){
    inputLieu=lieuSelect.value
    inputAnneeGraph="toutes-les-annees" //Reset the filter "année" if we change the filter "lieu"

    DrawFiltreAnnee()  //Display only years when they were accidents in one place.
    


    getData() //Update datas
}


//Retrieve datas and display graph

getData()  
DrawFiltreLieu()





        

