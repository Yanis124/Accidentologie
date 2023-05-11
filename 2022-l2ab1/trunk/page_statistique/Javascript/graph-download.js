//Download the graph

function download(){
    const imageLink=document.createElement("a")
    imageLink.download= titles+".png"
    imageLink.href=canvas.toDataURL("image/png",1)

    imageLink.click()
}
