function openTab(tabName,ele,color) {
    var i, tabpage, tablinks;
    tabpage = document.getElementsByClassName("tabPage");
    for (i = 0; i < tabpage.length; i++) {
      tabpage[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(tabName).style.display = "block";
    ele.style.backgroundColor = color;
  
  }
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();