"use strict";

//Cookie stuff
/*let cookieBanner = document.getElementById("cookie");
let acceptCookies = document.getElementById("accept-cookies");
acceptCookies.addEventListener("click", hideElement);

function hideElement() {
  console.log("works");
  cookieBanner.classList.add("hide");
}*/

//project divs
/*let projects = document.querySelectorAll(".project-content");
console.log(projects);
projects.item(0).style.backgroundImage = "url('img/thera-bg.jpg')";
projects.item(1).style.backgroundImage = "url('img/bubbles-bg.svg')";
projects.item(2).style.backgroundImage = "url('img/lango-bg.svg')";
projects.item(3).style.backgroundImage = "url('img/tattoo-bg.svg')";
projects.item(4).style.backgroundImage = "url('img/tetris-bg.svg')";*/

//Need to check on resize and replace images if screen goes below certain amounts
//window.addEventListener("resize");

//STEP 3
window.addEventListener("load", function(){
	var hover = {"index":0, "originalText": null, "interval":null, "node": null};
	var nodes = document.querySelectorAll(".sequenceRollover");
	nodes.forEach(function(item){
		item.addEventListener("mouseover",function(){

			//STEP 4
			if(hover.interval == null){
				hover.node = this;
				hover.originalText = this.innerText;
				hover.index = 0;
				hover.interval = setInterval(function(){
					//STEP 5
					if(hover.index < hover.originalText.length){
						//STEP 6
						var chars = ["|"];//["@","!","#","?"];
						hover.index++;
						var str = hover.originalText.substr(0,hover.index)
									+ chars[ Math.floor(Math.random()*chars.length) ]
									+ hover.originalText.substr(hover.index+1);
						hover.node.innerText = str;
					}else{
						//STEP 7
						hover.node.innerText = hover.originalText;
						clearInterval(hover.interval)
						hover.node = null;
						hover.originalText = null;
						hover.interval = null;
					}
				},60);
			}

		});
	});


	window.addEventListener("scroll", scrollCalculation)


});

function scrollCalculation(){

	let scrollY = window.scrollY;
	console.log(scrollY)


	let pageTitle = document.getElementById("page-title");
	let pageUnderTitle = document.getElementById("page-undertitle");

	let blob1 = document.getElementById("blob1");
	let blob2 = document.getElementById("blob2");
	let blob3 = document.getElementById("blob3");
	let blob4 = document.getElementById("blob4");
	let blob5 = document.getElementById("blob5");


	/*if(scrollY > 120 && scrollY < 400){
		pageTitle.style.top = scrollY - scrollY * 2 + "px";
	}else if(scrollY < 250){
		pageTitle.style.top = 0;
	}*/

	if(scrollY > 250 && scrollY < 400){
		blob1.style.top = scrollY / 1.4 + "px";
		blob2.style.top = scrollY / 3 + "px";
	}

	if(scrollY > 350 && scrollY < 450){
		blob3.style.top = scrollY * 1.23 + "px";
		blob4.style.top = scrollY / 15 + "px";
		blob5.style.top = scrollY * 2.1 + "px";
	}else if(scrollY < 350){
		blob3.style.top = 30 + "rem";
		blob4.style.top = 6 + "rem";
		blob5.style.top = 47 + "rem";
	}
}