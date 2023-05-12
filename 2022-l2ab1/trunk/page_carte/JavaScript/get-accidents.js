var listAccident=[]

async function getAccident(){
    var res1=await fetch('../new1.txt')
    var res2=await fetch('../new2.txt')
    var res3=await fetch('../new3.txt')
    var res4=await fetch('../new4.txt')
    var res5=await fetch('../new5.txt')
    var res6=await fetch('../new6.txt')
    var res7=await fetch('../new7.txt')
    var res8=await fetch('../new8.txt')
    var res9=await fetch('../new9.txt')
    var data1=await res1.text()
    var data2=await res2.text()
    var data3=await res3.text()
    var data4=await res4.text()
    var data5=await res5.text()
    var data6=await res6.text()
    var data7=await res7.text()
    var data8=await res8.text()
    var data9=await res9.text()
    res1=res2=res3=res4=res5=res6=res7=res8=res9=0


    var data=data1+"\n"+data2+"\n"+data3+"\n"+data4+"\n"+data5+"\n"+data6+"\n"+data7+"\n"+data8+"\n"+data9
    data1=data2=data3=data4=data5=data6=data7=data8=data9


    let lines=data.split("\n")
    data=0
    for(let i=0;i<lines.length;i++){
        
        listAccident.push(createObjectAccident(lines[i]))
    }
    lines=0
}   

function createObjectAccident(lineAccient){
    const listAttribute=lineAccient.split("*")
    const objectAccident={fields:
        {num_acc:listAttribute[0],
        dep_name:listAttribute[1],
        reg_name:listAttribute[2],
        nom_com:listAttribute[3],
        jour:listAttribute[4],
        mois:listAttribute[5],
        an:listAttribute[6],
        hrmn:listAttribute[7],
        adr:listAttribute[8],
        atm:listAttribute[9],
        lum:listAttribute[10],
        grav:listAttribute[11],
        an_nais:listAttribute[12],
        datetime:listAttribute[13],
        coordonnees:[listAttribute[14],listAttribute[15]],
        }
    }
    
    return objectAccident
}
    


