var listAccident=[]

async function getAccident(){
    let res1=await fetch('../new1.txt')
    let res2=await fetch('../new2.txt')
    let res3=await fetch('../new3.txt')
    let res4=await fetch('../new4.txt')
    let res5=await fetch('../new5.txt')
    let res6=await fetch('../new6.txt')
    let res7=await fetch('../new7.txt')
    let res8=await fetch('../new8.txt')
    let res9=await fetch('../new9.txt')
    let data1=await res1.text()
    let data2=await res2.text()
    let data3=await res3.text()
    let data4=await res4.text()
    let data5=await res5.text()
    let data6=await res6.text()
    let data7=await res7.text()
    let data8=await res8.text()
    let data9=await res9.text()
    


    let  data=data1+"\n"+data2+"\n"+data3+"\n"+data4+"\n"+data5+"\n"+data6+"\n"+data7+"\n"+data8+"\n"+data9
    


    let lines=data.split("\n")
    
    for(let i=0;i<lines.length;i++){
        
         listAccident.push(createObjectAccident(lines[i]))
     }
     
    
  }
  
  function createObjectAccident(lineAccident) {
    const listAttribute = lineAccident.split("*");
    const long=listAttribute.pop()
    const lat=listAttribute.pop()
    const objectAccident = {
      fields: {
        num_acc: listAttribute[0],
        dep_name: listAttribute[1],
        reg_name: listAttribute[2],
        nom_com: listAttribute[3],
        jour: listAttribute[4],
        mois: listAttribute[5],
        an: listAttribute[6],
        hrmn: listAttribute[7],
        adr: listAttribute[8],
        atm: listAttribute[9],
        lum: listAttribute[10],
        grav: listAttribute[11],
        an_nais: listAttribute[12],
        datetime: listAttribute[13],
        coordonnees: [lat, long]
      }
    };
  
    return objectAccident;
  }
    


