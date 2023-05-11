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
    
    var idAccident=popUpData(acc.fields.num_acc)
    var day=popUpData(acc.fields.jour)
    var month=popUpData(acc.fields.mois)
    var year=popUpData(acc.fields.an)
    var time=popUpData(acc.fields.hrmn)
    var adress=popUpData(acc.fields.adr)
    var atm=popUpData(acc.fields.atm)
    var lum=popUpData(acc.fields.lum)
    var grav=popUpData(acc.fields.grav)
    



    //popups style
    var colorText="#1b6698"
    var fontSize="15px"
    var fontSizeTitle="17px"
    var fontWeigth="700"
    
    var pop=L.popup({content:"<h1 style='font-size:"+fontSizeTitle+";'>"+"numero d'accident: "+idAccident+"</h1>"//accident number
    +"<p style='font-size:"+fontSize +";color:"+colorText+"'>"+"<span style='font-size:"+fontSize +";font-weight:"+fontWeigth+";'>"+day+"/"+month+"/"+year+", " //date
    +time+"</span>"+"</p>"
    +"<ul style='display:flex;flex-direction:column; padding:0;align-items:start;'>"
    +"<li style='font-size:"+fontSize+";color:"+colorText+";'>"+"Adresse: "+"<span style='font-size:"+fontSize+";font-weight:"+fontWeigth+";'>"+adress+"</span>"+"</li>"
    +"<li style='font-size:"+fontSize+";color:"+colorText+";'>"+"Condition atmosphérique: "+"<span style='font-size:+"+fontSize+";font-weight:"+fontWeigth+";'>"+atm+"</span>"+"</li>"
    +"<li style='font-size:"+fontSize+";color:"+colorText+";'>"+"Lumiere: "+"<span style='font-size:"+fontSize+";font-weight:"+fontWeigth+";'>"+lum+"</span>"+"</li>"
    +"<li style='font-size:"+fontSize+";color:"+colorText+";'>"+"Gravité: "+"<span style='font-size:"+fontSize+";font-weight:"+fontWeigth+";'>"+displaydata(grav)+"</span> </li>"
    +"</ul>"
    }) 

    

    return pop
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

