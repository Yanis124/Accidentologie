const graphContainer=document.getElementById("graph-container")//Contain the graph, the spinner animation and the error message
const canvas=document.getElementById("canvas")//The graph

const axeX = document.getElementById("axe-x");//Contain the filter X axis.
const filtreLieu = document.querySelector(".filtre-lieu-container");
const filtreAnnee = document.querySelector(".filtre-annee-container");


function afficherFiltres() {

    filtreLieu.style.display = "flex"
    filtreAnnee.style.display = "flex"

    // Display the corresponding filter
    if (axeX.value === "reg_name" || axeX.value === "dep_name") { //Hide the secondary filter "lieu" if we chose region or dep as the X-axis
        filtreLieu.style.display = "none"

    }
    else if (axeX.value === "datetime") { //Hide secondary filter "année" if we chose "année" as the X-axis
        filtreAnnee.style.display = "none"
    }

}