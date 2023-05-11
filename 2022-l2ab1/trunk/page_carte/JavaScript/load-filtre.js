//Block filters during the load of accidents

//Retrieve elements "date" and "luminosité"
var switchTab=document.querySelectorAll("#switch-container")

//Retrieve all others filters
var selectBtn=document.querySelectorAll(".select-btn")

//When an filter is selected, filters become unavailables
function loadFiltre(){
        switchTab.forEach(element=>{
        element.style.pointerEvents="none",
        element.style.cursor="not-allowed",
        
        element.style.opacity="0.5"})

        selectBtn.forEach(element=>{
            element.style.pointerEvents="none",
        element.style.cursor="not-allowed",
        
        element.style.opacity="0.5"
        }) 
}


//When markers are loaded, the user can use filters again
 function workFiltre(){
    switchTab.forEach(element=>{
        element.style.pointerEvents="auto",
        element.style.cursor="pointer",
        
        element.style.opacity="1"})

        selectBtn.forEach(element=>{
        element.style.pointerEvents="auto",
        element.style.cursor="pointer",
        
        element.style.opacity="1"
        })
    
 }
