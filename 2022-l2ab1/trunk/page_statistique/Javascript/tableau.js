
const anneeRegionTable=document.getElementById("annee-table-select")
var records=document.getElementsByTagName("td")
const table=document.getElementById("table-region-data")//Contain the chart

var tableRecords=document.createElement("tbody")
tableRecords.id="table-region"


var apiTable="https://data.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime%40public&q=&rows=0&facet=reg_name"

var dataTableList=[] //Contain the chart datas

var inputAnneeTable  //Contain the year

async function getDataTable(){
    await loadTable() //Display the animation

    if(inputAnneeTable && inputAnneeTable !="toutes-les-annees"){ //if inputAnneeTable is already define and different than "toutes-les-annees"
        try{
        
            var res=await fetch(apiTable+"&refine.datetime="+inputAnneeTable)
            var data=await res.json()
            dataTableList=data.facet_groups[0].facets
        }
        catch{
            erreurTable() //Error message

        }
    }
    else{
        try{
            var res=await fetch(apiTable)
            var data=await res.json()
            dataTableList=data.facet_groups[0].facets
        }
        catch{
            erreurTable()       //Error message

        }
    }
    

}

async function DrawTable(){

    
    await getDataTable() //Retrieve datas

        if(tableRecords){  //Reset the chart
            tableRecords.innerHTML=" "
        }
        
    
        for(var i=0;i<dataTableList.length;i++){  //Create the chart
            var ligneTable=document.createElement("tr")
            ligneTable.innerHTML="<td>" +(i+1)+"</td>"+"<td>"+ dataTableList[i].name+"</td>"+"<td>"+ dataTableList[i].count+"</td>"
            tableRecords.appendChild(ligneTable)
        }
        if(table.children[1]){
            table.removeChild(table.children[1])
        }
        table.appendChild(tableRecords)
        workTable()  //Display the chart
        appearText()  //Display texts
        
        


}

function resetTable(){  //Reset the chart



    for(var i=0;i<records.length;i++){
        records[i].style.color='transparent'
    }
}

function appearText(){
    for(var i=0;i<records.length;i++){
        records[i].style.color='#333'
    }
}

function createFirstTbody(){
    if(!table.children[1]){


        for(var i=0;i<20;i++){
            var ligneTable=document.createElement("tr")
            ligneTable.innerHTML="<td>" +(i+1)+"</td>"+"<td>"+ "sssssssssssssssssss"+"</td>"+"<td>"+ "ssssssssssssssssss" +"</td>"
            tableRecords.appendChild(ligneTable)
        }
        table.appendChild(tableRecords)
        resetTable()
    }
    
}




function getAnneeTable(){   //Retrieve the year
    inputAnneeTable=anneeRegionTable.value

    
    resetTable() //Reset the chart

    DrawTable() //Create the chart
}