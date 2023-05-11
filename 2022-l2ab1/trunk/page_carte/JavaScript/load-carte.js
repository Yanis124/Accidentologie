var carte=document.getElementById("map")
var spinner=document.getElementById("spinner-carte")


//start loading animation
async function loadCarte(){
    spinner.style.display="block"
    carte.style.opacity="0.3"
    await new Promise(r => setTimeout(r, 400));   
}

//stop the loading animation
function workCarte(){
    carte.style.opacity="1"
    spinner.style.display="none"
}
