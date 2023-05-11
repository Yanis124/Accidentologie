function resetVille(){    //Reset the filter "ville"

    var textChoix=document.querySelector("#ville-choice")
    var villeText=document.querySelector(".ville-text")

    textChoix.innerHTML=""
    villeText.style.top="15px"                 
    
}

function resetDepartement(){    //Reset the filter "departement"

    var textChoix=document.querySelector("#departement-choice")
    var departementText=document.querySelector(".departement-text")

    textChoix.innerHTML=""  
    departementText.style.top="15px"               
    
}

function resetRegion(){
    var textChoix=document.querySelector("#region-choice")
    var regionText=document.querySelector(".region-text")

    textChoix.innerHTML=""                 
    regionText.style.top="15px"
    
}

function addEventVille(){  //Checklist for the filter "ville"

    var textChoix=document.querySelector("#ville-choice")
    var villeText=document.querySelector(".ville-text")
    var items = document.querySelectorAll(".ville-container .item")
    var resetBtn = document.querySelector('input[type="reset"]');
    var listItem=document.querySelector(".ville-container .select-btn")

    listItem.addEventListener("click",()=>{
        closeListsOpened(listItem)
    })

    items.forEach(item => {
    item.addEventListener("click", () => {

        selectedVille=item.innerText     //Retrieve the value
        item.classList.toggle("checked");
        closeList()

        if(selectedVille=="toutes les villes"){  // Don't display the value of "ville" if the user choose "toutes les villes"
            resetVille()
        }

        else{
            textChoix.innerHTML=selectedVille
            villeText.style.position="absolute"

            villeText.style.top="0"
        }

        getDataFiltre() 
        });

        item.addEventListener("mouseover", () => {

            item.style.backgroundColor="#b4dbd6"
        });

        item.addEventListener("mouseleave", () => {

            item.style.backgroundColor="#f5f5f5"
        });

        resetBtn.addEventListener("click", () => {   //reset filter "ville"
            
            if(init){
                villeSelect.children[1].innerHTML="";
                
                textChoix.innerHTML=""
            }
            
        });
    }); 
}

function addEventDepartement(){  //Checklist for the filter "departement"

    var textChoix=document.querySelector("#departement-choice")
    var departementText=document.querySelector(".departement-text")
    var items = document.querySelectorAll(".departement-container .item")
    var resetBtn = document.querySelector('input[type="reset"]');
    var listItem=document.querySelector(".departement-container .select-btn")

    listItem.addEventListener("click",()=>{
        closeListsOpened(listItem)
    })

    items.forEach(item => {
    item.addEventListener("click", () => {

        selectedDepartement=item.innerText     //retrieve the value
        item.classList.toggle("checked");

        closeList()

        textChoix.innerHTML=selectedDepartement
        departementText.style.position="absolute"
        
        departementText.style.top="0"

        getDepartement()
        });

        item.addEventListener("mouseover", () => {

            item.style.backgroundColor="#b4dbd6"
        });

        item.addEventListener("mouseleave", () => {

            item.style.backgroundColor="#f5f5f5"
        });

        resetBtn.addEventListener("click", () => {   //reset filter "ville"
            
            if(init){
                departementSelect.children[1].innerHTML="";
                
                textChoix.innerHTML=""
            }
            
        });
    }); 


}

function addEventRegion(){

    var textChoix=document.querySelector("#region-choice")
    var regionText=document.querySelector(".region-text")
    var items = document.querySelectorAll(".region-container .item")
    var resetBtn = document.querySelector('input[type="reset"]');
    var listItem=document.querySelector(".region-container .select-btn")

    listItem.addEventListener("click",()=>{
        closeListsOpened(listItem)
    })

    items.forEach(item => {
    item.addEventListener("click", () => {

        selectedRegion=item.innerText     //Retrieve the value
        item.classList.toggle("checked");

        closeList()

        textChoix.innerHTML=selectedRegion
        regionText.style.position="absolute"
        
        regionText.style.top="0"
       

        getRegion()

        });
        item.addEventListener("mouseover", () => {

            item.style.backgroundColor="#b4dbd6"
        });

        item.addEventListener("mouseleave", () => {
            
            item.style.backgroundColor="#f5f5f5"
        });

        resetBtn.addEventListener("click", () => {   //reset filter ville

            regionSelect=null
            
            textChoix.innerHTML=""
        });
    }); 


}



function createList(valueList){  //create checklist options

    var list=document.createElement("li")
    var span2=document.createElement("span")

    list.className="item"
    list.value=valueList
    span2.className="item-text"
    span2.innerText=valueList
    list.append(span2)

    return list

}

