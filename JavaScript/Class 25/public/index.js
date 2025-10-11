function seeMore() {
  // var morePara = document.getElementById("morePara");
  // morePara.style.display = "block"
  var btn = document.getElementById("btn");
  var morePara = document.getElementById("morePara");

  console.log("morePara ==>", morePara);
  

  if (btn.innerText == "See More") {
    // morePara.style.display = "inline";
    // morePara.style.backgroundColor = "aqua";
    // morePara.style.fontSize = "32px";

    // morePara.className += " show"
    morePara.classList.add("show")

    // console.log("ClassName Before ==>",
    //   morePara.className
    // );
    // morePara.className += " customeClass";
    // console.log("ClassName After ==>",
    //   morePara.className
    // );
    btn.innerText = "See Less";
  } else {
    // morePara.style.display = "none";

    // morePara.
    console.log("classList ==>", morePara.classList);
    morePara.classList.remove("show")


    btn.innerText = "See More";
  }
}
