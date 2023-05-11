

var apiGraphX="https://data.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime%40public&q=&rows=0&facet="
var excludeYear="&exclude.datetime=2011"


async function getData(){  // Retrieve differents datas: datetime, atm, an-nais, sexe, grav and create the graph

    loadGraph() //Display the animation

    if(inputLieu && inputAnneeGraph && inputAnneeGraph!="toutes-les-annees" && inputLieu!="tous-les-lieux"){ //if the user enter a "année"
        try{
            var res=await fetch(apiGraphX+inputValueX+"&refine.datetime="+inputAnneeGraph+"&refine.reg_name="+inputLieu) //Add the filter "année" to the API
        
            var data=await res.json()
        }
        catch(error){
            erreurGraph() //Display an error

        }
    }

    else if(inputLieu && (!inputAnneeGraph || inputAnneeGraph=="toutes-les-annees") && inputLieu!="tous-les-lieux"){ //if the user enter a "année"
        try{
            var res=await fetch(apiGraphX+inputValueX+"&refine.reg_name="+inputLieu+excludeYear) //Add the filter "lieu" to the API
        
            var data=await res.json()
            
        }
        catch(error){
            erreurGraph() //Display an error

        }
    }
    
    else if(inputAnneeGraph &&(!inputLieu || inputLieu=="tous-les-lieux") && inputAnneeGraph!="toutes-les-annees"){ //fi the user enter a "année"
        try{
            var res=await fetch(apiGraphX+inputValueX+"&refine.datetime="+inputAnneeGraph) //Add the filter "année" to the API
        
            var data=await res.json()
        }
        catch(error){
            erreurGraph() //Display an error

        } 
    }

    else{ // If the user didn't choose nor a "année" neither a "lieu" or "toutes les années et tous les lieux"
        try{
            var res=await fetch(apiGraphX+inputValueX+excludeYear)
        
            var data=await res.json()
        }
        catch(error){
            erreurGraph() //Display an error
        }
    }


    
    workGraph() // Datas have been retrieved


        datas=[] // Reset the lists datas and label
        label=[]

        if(data.facet_groups[0].name=="an_nais"){
            regroupeAge(data.facet_groups[0].facets) //Regroup age groups
        }
        else if(data.facet_groups[0].name=="lum"){
            regroupeLum(data.facet_groups[0].facets) 
        }
        else{
            for(var i=0;i<data.facet_groups[0].facets.length;i++){
                datas.push(data.facet_groups[0].facets[i].count)
                label.push(data.facet_groups[0].facets[i].name)
            }
        }

    updateTitles() //Update graphs titles


    if(!chart){
        chart=courbe() //if there's no graph, create one
    }

    selectData()  //Put the datas in the graph

    selectX()    //Select the default type of graph 
        
}


function selectX(){  //Select the graph type (by default date=>courbe sexe=>camembert ...) and datas
    if(inputValueX==facets[0]){
        if(!typeChart){ //If the user didn't choose any graph type, we use the default type
            selectColonne("courbe")

        } 
        else{
            selectColonne()
        }
        
    }
    else if(inputValueX==facets[1]|| inputValueX==facets[2]){

        

        if(!typeChart){
            selectColonne("colonne")
            
        }
        else{
            selectColonne()
        } 
    }

    else if(inputValueX==facets[3]|| inputValueX==facets[4] || inputValueX==facets[5]|| inputValueX==facets[6] || inputValueX==facets[7]|| inputValueX==facets[8]){
        if(!typeChart){
            selectColonne("camembert") 
             
        }        
        else{
            selectColonne()
        }

    }
}
    
