const topNav = document.getElementById("top_nav");
const xhr = new XMLHttpRequest();

displayAllItems("");


function displayAllItems(searchTerm = ""){
    console.log("displaying");
    let container = document.getElementById("display container");
    xhr.open("GET","http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/search?term="+searchTerm,true);
    xhr.setRequestHeader("Accept","application/json;charset=utf-8");
    xhr.onload = () => {
        let allItems = JSON.parse(xhr.responseText);
        console.log("items = " + allItems);
        let allItemsHtml = allItems.map(displayItem);
        allItemsHtml.forEach( htmlItem => {container.appendChild(htmlItem)});
    }
    xhr.send();
    

}

function displayItem(itemObject){
    let mainDiv = document.createElement("div");
    mainDiv.className = "display item";
    let heading = document.createElement("h3");
    heading.innerHTML = itemObject.Title;
    let desciption = document.createElement("p");
    desciption.innerHTML = itemObject.Description;
    imgurl = "http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/itemimg?id=" + itemObject.ItemId;
    let displayImg = document.createElement("img");
    displayImg.src = imgurl;
    mainDiv.appendChild(heading);
    mainDiv.appendChild(displayImg);
    mainDiv.appendChild(desciption);
    console.log(heading);
    return mainDiv;

}

function hideThis(thing){
    thing.style.display = "none";
}

function switchPage(pageId){
    let pages = Array.from(document.getElementsByClassName("page"));
    pages.forEach(hideThis);
    hideThis(topNav);
    document.getElementById(pageId).style.display = "block";
    if(pageId !== "homepage"){
        topNav.style.display = "block";
    }
    
}