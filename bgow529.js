const topNav = document.getElementById("top_nav");

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