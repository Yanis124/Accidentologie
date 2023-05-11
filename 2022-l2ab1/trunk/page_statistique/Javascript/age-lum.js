function regroupeAge(ageList){ //Regroup age groups and put datas in the list : 0-17 18-30 31-59 +60
    var countsSmall=0
    var countsMedS=0
    var countsMedH=0
    var countsLarg=0
    for(var i=0;i<ageList.length;i++){

        if(ageList[i].name>=2002){    //0-17 
            countsSmall+=ageList[i].count
        }

        else if(ageList[i].name>=1989 && ageList[i].name<=2001){  //18-30
            countsMedS+=ageList[i].count
        }

		else if(ageList[i].name>=1960 && ageList[i].name<=1988){  //31-59
            countsMedH+=ageList[i].count
        }
        
        else if(ageList[i].name<=1959){   //+60
            countsLarg+=ageList[i].count
            
        }

    }
    datas.push(countsSmall)
    label.push("0-17")
                            
    datas.push(countsMedS)
    label.push("18-30")
    
    datas.push(countsMedH)
    label.push("31-59")

    datas.push(countsLarg)
    label.push("+60")

}

function regroupeLum(lumList){  //Regroup datas day/night and put them in the list
    var countsJour=0
    var countsNuit=0
    for(var i=0;i<lumList.length;i++){
        if(lumList[i].name=="Plein jour"){
            countsJour+=lumList[i].count
        }
        else{
            countsNuit+=lumList[i].count
        }
    }
    datas.push(countsJour)
    label.push("Jour")

    datas.push(countsNuit)
    label.push("Nuit")


}
