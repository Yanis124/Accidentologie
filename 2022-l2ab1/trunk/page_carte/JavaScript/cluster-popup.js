const noteSmall = document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-small leaflet-zoom-animated leaflet-interactive ");
const noteMedium=document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive")
const noteLarge=document.getElementsByClassName("leaflet-marker-icon marker-cluster marker-cluster-large leaflet-zoom-animated leaflet-interactive")


function regrouper(){ //clusters style
  
    if(noteSmall.length>0){  
        
        style(noteSmall)
        
    }
    if(noteMedium.length>0){
        
        style(noteMedium)
        
    }
    if(noteLarge.length>0){
        
        style(noteLarge) 
       
    }
}

function style(note){   //Add style to clusters 
    for(var i=0;i<note.length;i++){  //Iterate the chart to style the elements
            var Div=note[i]
            var number=note[i].children[0].children[0]
            var numberDiv=note[i].children[0]
            
            number.style.fontSize="17px"
            number.style.color = 'white' 
            number.style.zIndex="9999"  

            numberDiv.style.display="flex"
            numberDiv.style.justifyContent="center"
        
       

            Div.style.display="flex"
            Div.style.justifyContent="center"
            Div.style.alignItems="center"
            Div.style.backgroundColor="black"
            Div.style.borderWidth="1px"
            Div.style.borderStyle="solid"
            Div.style.borderColor="white"
            Div.style.borderRadius="50px"
            Div.style.zIndex="9999"
            if(number.innerText.length>=5){
                Div.style.padding="12px"
            }

            else if(number.innerText.length>=4){
                Div.style.padding="10px"
            }

            else if(number.innerText.length>=3){
                Div.style.padding="8px"
            }
            else if(number.innerText.length>=2){
                Div.style.padding="6px"
            }
            else{
                Div.style.padding="4px"
            }
            
        
        
        
    }

}  

function popUp(acc){  //Create popups
    //informations of the accident
    
    let idAccident=popUpData(acc.fields.num_acc)
    let day=popUpData(acc.fields.jour)
    let month=popUpData(acc.fields.mois)
    let year=popUpData(acc.fields.an)
    let time=popUpData(acc.fields.hrmn)
    let adress=popUpData(acc.fields.adr)
    let atm=popUpData(acc.fields.atm)
    let lum=popUpData(acc.fields.lum)
    
    



    //popups style
    
    
    
    
    const content=createPopup(idAccident,day,month,year,time,adress,atm,lum)
    const pop = L.popup({content});

    

    return pop
}

function createPopup(idAccident,day,month,year,time,adress,atm,lum){
    
        const content = `
          <h1 class="popup-title">numero d'accident: ${idAccident}</h1>
          <p class="popup-info"><span>${day}/${month}/${year}, ${time}</span></p>
          <ul class="popup-list">
            <li>Adresse: <span>${adress}</span></li>
            <li>Condition atmosphérique: <span>${atm}</span></li>
            <li>Lumiere: <span>${lum}</span></li>
          </ul>
        `;
      
        
        return content;
      
}

function popUpData(data){   //if the data is not available in the API
    var message="Indisponible"
    if(data=="undefined"){
        return message
    }
    else{
        return data
    }
}

function displaydata(data){
    var arr = data.split(','); // split the string by comma delimiter
        var n=arr.length
        
        if(n>3){
            var result=""
            var count=0
            while(count<n){
                var fourth = arr.slice(count,count+3);
                count=count+3

                
                fourth.forEach(element => {
                    if(element !=""){
                        result+=element+","
                    }
                });
                result=result+" "
            }
            data=result
        }

        return data
    

    
}

setInterval(regrouper, 500)  //we call the function regrouper() every 300ms.

