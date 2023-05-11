//define filter values as global values so we can access them from all files

//define one value per filter to contain all selected values
var selectedDate
var selectedDateStart  
var selectedDateEnd
var selectedRegion
var selectedDepartement
var selectedVille
var selectedValuesAtm=[]
var selectedValuesAge=[]
var selectedValuesGravite=[]
var selectedLum

var textLum=document.querySelectorAll('.lum-container p')

var listClass=[".ville-container",".weather-container",".age-container",".gravite-container",".departement-container",".region-container"]

function getIntervalleDateStart(){

    closeList()
    var textDate=document.querySelectorAll('#date-interval-container span')
    textDate[0].style.color="gray"
    selectedDateStart=dateStart.value
    textDate[0].innerText=selectedDateStart

    setDateLimit()
}

function getIntervalleDateEnd(){

    closeList()
    var textDate=document.querySelectorAll('#date-interval-container span')
    textDate[1].style.color="gray"
    selectedDateEnd=dateEnd.value
    textDate[1].innerText=selectedDateEnd

    setDateLimit()
}

//filter values if we have start and end dates
function getIntervalleDate(){

    selectedDate=null

    if(selectedDateEnd && selectedDateStart){
        getDataFiltre()
    }
}



//get date if it's unique and not an interval
function getDate(){  //recuperer la date 
    closeList()
    selectedDateEnd=selectedDateStart=null //nullify the date interval
    var textDate=document.querySelector('#date-specifique-container span')
    textDate.style.color="gray"
    
    selectedDate=date.value
    textDate.innerText=selectedDate

    getDataFiltre()
}

function setDateLimit(){  //selectedDateStart <= selectedDateEnd
    dateEnd.setAttribute("min",selectedDateStart)
    dateStart.setAttribute("max",selectedDateEnd)

}

//Selected region
function getRegion() { 

    resetVille()

    resetDepartement()
   

    selectedDepartement=selectedVille=null //nullify departements and cities if we select a new region
    
        if(selectedRegion=="toutes les regions"){
            
            
            
            nomDepartements()

            nomVilles()

            resetRegion()
        }
        else{
            // API's URL for departements of the selected region

            
                var apiUrl = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=dep_name&refine.reg_name=" + selectedRegion; // permet encoder un nouvel URL avec la region selectionné
            

            
                fetch(apiUrl)
                    .then(response => response.json()) // turn selected data into json object
                    .then(data => {
                        var departement = data.facet_groups[0].facets; //variable departement carrying the data we just got

                        departement.sort((a, b) => a.name.localeCompare(b.name)); // alphabetical sort
                        //updating the departement list
                        var departementSelect = document.getElementById("departement"); //Variable with id = departement

                        departementSelect.children[1].innerHTML=""; //Deleting previous options
                        departementSelect.children[1].append(createList("tous les departements"))
                        departement.forEach(departement => {
                        var option = createList(departement.name)

                        departementSelect.children[1].append(option); 
                        });
                        addEventDepartement()  //adding events to departements
                    })
                // API's URL for cities of the selected region
                
                var apiUrl1 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=nom_com&refine.reg_name=" +selectedRegion; // permet encoder un nouvel URL avec la region selectionné
                
                fetch(apiUrl1)
                .then(response => response.json()) // turn selected data into json object
                .then(data => {
                    var ville = data.facet_groups[0].facets; //variable villes carrying the data we just got

                    ville.sort((a, b) => a.name.localeCompare(b.name)); // alphabetical sort
                    // Updating list of cities
                    villeSelect.children[1].innerHTML=""; // Deleting previous options
                    villeSelect.children[1].append(createList("toutes les villes"))
                    ville.forEach(ville => {
                        var option = createList(ville.name)

                        villeSelect.children[1].append(option); //adding cities from departement in the "city" filter
                    });

                    addEventVille()  //adding various events to cities
                })
                .catch(departementSelect.children[1].innerHTML="", //Deleting previous options
                villeSelect.children[1].innerHTML="",
                resetVille(),
                resetDepartement())
               
            
           
            
        }

        
        getDataFiltre()  //filter            
}


function getDepartement(){

    resetVille()

    selectedVille=null //nullify city if another departement is selected

    if(selectedDepartement=="tous les departements"){  //if all departements are selected then we show all cities from selected region
        getRegion()
    }

    else{
        //API's URL for cities of the selected departement
        var apiUrl2 = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=0&facet=nom_com&refine.dep_name=" +selectedDepartement; // permet encoder un nouvel URL avec la region selectionné
        //Getting API's departement for selected region
        fetch(apiUrl2)
        .then(response => response.json())
        .then(data => {
            var ville = data.facet_groups[0].facets;

            ville.sort((a, b) => a.name.localeCompare(b.name)); //alphabetical sort
            //updating the cities list
            var villeSelect = document.getElementById("ville"); //Variable with id = ville

            villeSelect.children[1].innerHTML=""; //deleting previous options
            villeSelect.children[1].append(createList("toutes les villes"))
            ville.forEach(ville => {
                var option = createList(ville.name)

                villeSelect.children[1].append(option); //adding cities from the departement
            });
            addEventVille()
        })
        .catch( //Deleting previous options
                villeSelect.children[1].innerHTML="",
                resetVille(),
                )

        getDataFiltre()
    }
}

function getJour(inputJour){  //get value of filter "jour"

    if(!inputJour.checked){
        selectedLum=null
        textLum[0].style.color="#333"
    }

    else{
        console.log(textLum)
        textLum[0].style.color="#000"
        textLum[1].style.color="#333"
        selectedLum=jourSelect.value
        var inputNuit=document.getElementById("nuit")  //nullify the "nuit" button
        if(inputNuit.checked){
            inputNuit.checked = false;
        }
    }
    getDataFiltre()
}

function getNuit(inputNuit){ //get "nuit" filter value

    if(!inputNuit.checked){
        selectedLum=null
        textLum[1].style.color="#333"
    }

    else{
        textLum[1].style.color="#000"
        textLum[0].style.color="#333"
        selectedLum=nuitSelect.value
        var inputJour=document.getElementById("jour") //nullify "jour" button
        if(inputJour.checked){
            inputJour.checked = false;
        }
    }
    getDataFiltre()
}

function getAtm(){  //get values from meteo filter

    var textChoix=document.querySelector("#weather-choice")
    var weatherText=document.querySelector(".weather-text")
    var items = document.querySelectorAll(".weather-container .item")
    var listItem=document.querySelector(".weather-container .select-btn")

    listItem.addEventListener("click",()=>{
        closeListsOpened(listItem)
    })

    items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
        closeList()

        const selectedItems = document.querySelectorAll("#weather .checked"); // get all class "checked" elements

        selectedValuesAtm = Array.from(selectedItems).map(item => item.getAttribute("value")); //Get values of the attribute "value" from selected elements

        textChoix.innerHTML=""
        for(var i=0;i<selectedValuesAtm.length;i++){
            if(i>=2){                                                      
                textChoix.innerHTML+=" ..."
                break;
            }
            textChoix.innerHTML+=selectedValuesAtm[i]+" "
        }

        if(selectedValuesAtm.length>0){
            weatherText.style.position="absolute"
            weatherText.style.top="0"
        }

        else{
            weatherText.style.position="relative"
        }
        filterList();    
        });

        resetBtn.addEventListener("click", () => {
            item.classList.remove('checked');
            textChoix.innerHTML=""
            weatherText.style.position="relative"
        });
    }); 
}

function getAge(){

    var textChoix=document.querySelector("#age-choice")
    var ageText=document.querySelector(".age-text")
    var items = document.querySelectorAll(".age-container .item")
    var listItem=document.querySelector(".age-container .select-btn")

    listItem.addEventListener("click",()=>{
        closeListsOpened(listItem)
    })

    items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
        closeList()

        const selectedItems = document.querySelectorAll(".age-container .checked"); //get all class "checked" elements

        selectedValuesAge = Array.from(selectedItems).map(item => item.getAttribute("value")); //Get values of the attribute "value" from selected elements

        filterList(); 

        textChoix.innerHTML=""
        for(var i=0;i<selectedValuesAge.length;i++){
            if(i>=2){                                                      
                textChoix.innerHTML+=" ..."
                break;
            }

            textChoix.innerHTML+=selectedValuesAge[i]+" "
        }

        if(selectedValuesAge.length>0){
            ageText.style.position="absolute"
            ageText.style.top="0"
        }

        else{
            ageText.style.position="relative"
        }
    });

        resetBtn.addEventListener("click", () => {
            item.classList.remove('checked');
            textChoix.innerHTML=""
            ageText.style.position="relative"
        });

    }); 
}

function getGravite(){

    var textChoix=document.querySelector("#gravite-choice")
    var graviteText=document.querySelector(".gravite-text")
    var items = document.querySelectorAll(".gravite-container .item")
    var listItem=document.querySelector(".gravite-container .select-btn")
    

    listItem.addEventListener("click",()=>{
            closeListsOpened(listItem)
    })

    items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
        closeList()

        const selectedItems = document.querySelectorAll(".gravite-container .checked"); //get all class "checked" elements

        selectedValuesGravite = Array.from(selectedItems).map(item => item.getAttribute("value")); //Get values of the attribute "value" from selected elements

        filterList(); 

        textChoix.innerHTML=""
        for(var i=0;i<selectedValuesGravite.length;i++){
            if(i>=2){                                                      
                textChoix.innerHTML+=" ..."
                break;
            }
            textChoix.innerHTML+=selectedValuesGravite[i]+" "
        }

        if(selectedValuesGravite.length>0){
            graviteText.style.position="absolute"
            graviteText.style.top="0"
        }

        else{
            graviteText.style.position="relative"
        }
    });

        resetBtn.addEventListener("click", () => {
            item.classList.remove('checked');
            textChoix.innerHTML=""
            graviteText.style.position="relative"
        });
    }); 
}

function openFiltreList(){   //Open filter lists

    for(var i=0;i<listClass.length;i++){

        const selectBtn = document.querySelectorAll(listClass[i]+" .select-btn")

        items = document.querySelectorAll(listClass[i]+" .item"),

        resetBtn = document.querySelector('input[type="reset"]');

        selectBtn.forEach(selectBtn => {
            selectBtn.addEventListener("click", () => {
                selectBtn.classList.toggle("open");
            }); 
        });
    }
}

function closeList(){   //Close list once city, departement & region is chosen

    const selectBtns = document.querySelectorAll(".select-btn")
    

    selectBtns.forEach(selectBtn => {selectBtn.classList.value="select-btn"} )
}

function closeListsOpened(list){
    const selectBtns = document.querySelectorAll(".select-btn")
    
    selectBtns.forEach(selectBtn => {
        if(selectBtn !=list){
            selectBtn.classList.value="select-btn"
            }
        } )
    
}
