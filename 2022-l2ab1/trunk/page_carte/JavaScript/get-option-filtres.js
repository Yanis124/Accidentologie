//Define filters as globals variables to have a complete access from every file

var date=document.getElementById("date")

var dateStart=document.getElementById("date-debut")
var dateEnd=document.getElementById("date-fin")
var regionSelect = document.getElementById("region")
var departementSelect = document.getElementById("departement")
var villeSelect = document.getElementById("ville")
var jourSelect=document.getElementById("jour")
var nuitSelect=document.getElementById("nuit")

function displayDate(inputChoice){
    var dateSpecifiqueContainer=document.getElementById("date-specifique-container")
    var dateIntervalContainer=document.getElementById("date-interval-container")
    var textDate=document.querySelector('.date-specifique-container p')
    var textIntervalDate=document.querySelector('.intervalle-date-container p')
    var textDateValue=document.querySelector("#date-specifique-container span")
    var textDateIntervalValue=document.querySelectorAll("#date-interval-container span")
    

    if(!inputChoice.checked){  //hide date
        dateSpecifiqueContainer.style.display="none"
        textDate.style.color="#333"
        
        date.value = null; 
        textDateValue.innerText="Date"
        textDateValue.style.color="#333"
       
        if(selectedDate){
            selectedDate=null
            getDataFiltre()
        }
        
    }

    else{     //display date
        var inputDateInterval=document.getElementById("interval-date")

        dateSpecifiqueContainer.style.display="flex"
        dateIntervalContainer.style.display="none"
        textDate.style.color='#000'
        textIntervalDate.style.color="#333"
    
        

        if(inputDateInterval.checked){ //hide "intervalle de date"
            inputDateInterval.checked=false
            textDate.style.color='#333'
            textDateIntervalValue[0].innerText="Debut"
            textDateIntervalValue[1].innerText="Fin"
            textDateIntervalValue[0].style.color=textDateIntervalValue[1].style.color="#333"
            dateStart.value=dateEnd.value=null
            selectedDateEnd=selectedDateStart=null

            if(selectedDate){
                getDataFiltre()
            }    
        }
        
    }
}

function displayDateInterval(inputChoice){
    var dateSpecifiqueContainer=document.getElementById("date-specifique-container")
    var dateIntervalContainer=document.getElementById("date-interval-container")
    var textIntervalDate=document.querySelector('.intervalle-date-container p')
    var textDate=document.querySelector('.date-specifique-container p')
    var textDateIntervalValue=document.querySelectorAll("#date-interval-container span")
    var textDateValue=document.querySelector("#date-specifique-container span")
    

    if(!inputChoice.checked){    //hide "intervalle de date"
        dateIntervalContainer.style.display="none"
        textIntervalDate.style.color="#333"
        
        textDateIntervalValue[0]=textDateIntervalValue[1]=""
        textDateIntervalValue[0].innerText="debut"
        textDateIntervalValue[1].innerText="Fin"
        textDateIntervalValue[0].style.color=textDateIntervalValue[1].style.color="#333"
        dateStart.value=dateEnd.value=null // reset  input date

        

   
        if(selectedDateStart && selectedDateEnd){
            selectedDateStart=selectedDataEnd =null
            getDataFiltre()
        }
        

    }
    else{ // display date

        var inputDateSpecifique=document.getElementById("specifique-date")

        dateIntervalContainer.style.display="flex"
        dateSpecifiqueContainer.style.display="none"
        textIntervalDate.style.color="#000"
        textDate.style.color="#333"

        if(inputDateSpecifique.checked){   //  cacher date
            inputDateSpecifique.checked=false
            textDateValue.innerText="Date"
            textDateValue.style.color="#333"
            date.value=null
            selectedDate=null
            if(selectedDateEnd && selectedDateStart){
                getDataFiltre()
            }    
            
        }
        
    }
}

function dateLimit(){  //define a date limit 

    date.setAttribute("min","2012-01-01") 
    date.setAttribute("max","2020-01-01")
    dateStart.setAttribute("min","2012-01-01") 
    dateStart.setAttribute("max","2020-01-01")
    dateEnd.setAttribute("min","2012-01-01") 
    dateEnd.setAttribute("max","2020-01-01")
}

function nomRegions() {
    //API URL to retrieve the regions names
    var apiUrl1 = "https://geo.api.gouv.fr/regions?&fields=nom,code,codesPostaux,departement,region&format=json";

    fetch(apiUrl1)
      .then(response => response.json()) //Convert retrieved datas into JSON objects
      .then(data => {

        var region = data; //contain retrieved datas

        region.sort((a, b) => a.nom.localeCompare(b.nom)); // sort by alphabetical order
        regionSelect.children[1].innerHTML="";
        regionSelect.children[1].append(createList("toutes les regions"))
        region.forEach(region => {

            if (region.nom !== "Mayotte" && region.nom !== "Guadeloupe" && region.nom !== "Martinique" && region.nom !== "Guyane" && region.nom!== "La Réunion"){
                var option = createList(region.nom)

                regionSelect.children[1].append(option);
            }
        });
        addEventRegion()
      })
      .catch(console.log("erreur de fetch")) //Manage errors
}

function nomDepartements(){
    

    //API URL to retrieve departments names
    var apiUrl2 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=dep_name";
        fetch(apiUrl2)
          .then(response => response.json()) //Convert retrieved datas into JSON objects
          .then(data => {

            var departement = data.facet_groups[0].facets; 
            departement.sort((a, b) => a.name.localeCompare(b.name));

            departementSelect.children[1].innerHTML="";
            departementSelect.children[1].append(createList("tous les departements"))
            departement.forEach(departement => {
                if (departement.name !== "Mayotte" && departement.name !== "Guadeloupe" && departement.name !== "Martinique" && departement.name !== "Guyane" && departement.name !== "La Réunion"){ //Enlever les departements d'outre mer

                    var option = createList(departement.name)

                    departementSelect.children[1].append(option);
                }
            });
            addEventDepartement()
          })
          .catch(console.log("erreur de fetch")) //Manage errors
}

function nomVilles(){
    
    //API URL to retrieve cities names
	var apiUrl3 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=nom_com";

	fetch(apiUrl3)
		.then(response => response.json()) //Convert retrieved datas into JSON objects
		.then(data => {
			var ville = data.facet_groups[0].facets; 
			ville.sort((a, b) => a.name.localeCompare(b.name)); //sorted by alphabetical order

            villeSelect.children[1].innerHTML=""
            villeSelect.children[1].append(createList("toutes les villes"))
			ville.forEach(ville => {
				var option = createList(ville.name)

				villeSelect.children[1].append(option);
			})
            addEventVille()
	    })
        .catch(console.log("erreur de fetch")) //Manage errors

        
}


//reset "date/intervalle date"

function resetDate(){
    var resetBtn = document.querySelector('input[type="reset"]');
    resetBtn.addEventListener("click",()=>{
        var dateSpecifiqueContainer=document.getElementById("date-specifique-container")
        var dateIntervalContainer=document.getElementById("date-interval-container")

        dateSpecifiqueContainer.style.display="none"
        dateIntervalContainer.style.display="none"
    })
}
