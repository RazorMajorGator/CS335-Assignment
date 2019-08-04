const topNav = document.getElementById("top_nav");
switchPage("homepage");

displayAllItems("");
displayNews();


function displayAllItems(searchTerm = ""){
    let xhr = new XMLHttpRequest();
    console.log("displaying");
    let container = document.getElementById("display container");
    container.innerHTML = "";
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

function displayNews(){
    let xhr = new XMLHttpRequest();
    let newsContainer = document.getElementById("news display");
    xhr.open("GET","http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/news",true);
    xhr.setRequestHeader("Accept","application/json;charset=utf-8");
    xhr.onload = () => {
        let allNews = JSON.parse(xhr.responseText);
        let allNewsItems = allNews.map(getNewsItem);
        allNewsItems.forEach((item) => {
            newsContainer.appendChild(item);
        })

    }
    xhr.send();

}

function getNewsItem(newsObject){
    let newsItem = document.createElement("div");
    let newsTitle = document.createElement("h2");
    let newsLink = document.createElement("a");
    newsLink.href = newsObject.linkField;
    newsLink.innerHTML = newsObject.titleField;
    newsTitle.appendChild(newsLink);
    let newsDescription = document.createElement("p");
    newsDescription.innerHTML = newsObject.descriptionField;
    let newsDate = document.createElement("p");
    newsDate.innerHTML = newsObject.pubDateField;
    newsDate.className = "news date";
    let newsImg = document.createElement("img");
    newsImg.src = newsObject.enclosureField.urlField;
    newsItem.appendChild(newsTitle);
    newsItem.appendChild(newsImg);
    newsItem.appendChild(newsDescription);
    newsItem.appendChild(newsDate);
    return newsItem;


}

function submitComment(){
    let commentBox = document.getElementById("comment box");
    let commentName = document.getElementById("comment name");
    if(commentBox.value === ""){
        commentBox.placeholder = "Please enter comment first";
        return;
    }
    let name = ""
    if(commentName.value === ""){
        name = "Anonymous";
    }else{
        name = commentName.value;
    }
    let comment = commentBox.value;
    commentBox.value = "Submitting Comment";
    xhr = new XMLHttpRequest()
    xhr.open("POST"," http://redsox.uoa.auckland.ac.nz/ms/MuseumService.svc/comment?name="+name,true);
    xhr.setRequestHeader("Content-Type", "application/json","Content-Length", commentBox.value.length+2);
    xhr.onload = () => {
        commentBox.value = "";
        commentBox.placeholder = "Comment submitted";
        document.getElementById("comment frame").src += "";
    }
    xhr.send(JSON.stringify(comment));
    


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