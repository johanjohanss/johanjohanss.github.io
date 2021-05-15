"use strict";

let screenHeight = window.innerHeight;

window.addEventListener("resize", function () {
  screenHeight = window.innerHeight;
  oncePageTransition(screenHeight);
});

//Decode cookies function
function decode() {
  let cookies = document.cookie
    .split(";")
    .map((cookie) => cookie.split("="))
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key.trim()]: decodeURIComponent(value),
      }),
      {}
    );
  return cookies;
}

//function that makes it wait a certain time before the next step is made
//n is set either to the value that you send in or to 2000 if you do not set a value
function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

//animating the transition
function pageTransition(d1, d2) {
  var tl = gsap.timeline();
  tl.to(".page-transition", {
    duration: 0.5,
    scaleX: 1, //goes to scale 1
    transformOrigin: "bottom" + " " + d1, //from left to right
  });
  tl.to(".page-transition", {
    duration: 0.5,
    delay: 0.35,
    scaleX: 0, //goes from scale 1 ro scale 0
    transformOrigin: "bottom" + " " + d2, //changing transform origin so it goes to other side
  });
}
//---------------------------------------------------------------------------------------
function pageTransitionAbout(d1, d2, element) {
  var tl = gsap.timeline();
  tl.to(element, {
    duration: 0.37,
    scaleY: 1,
    //opacity: 1, //goes to scale 1
    transformOrigin: d1 + " " + "left", //from left to right
  });
  tl.to(element, {
    duration: 0.37,
    scaleY: 0,
    delay: 0.35,
    //opacity: 1, //goes to scale 1
    transformOrigin: d2 + " " + "left", //from left to right
  });
  /*tl.to(".page-transition-about", {
    duration: 0.25,
    //delay: 0.35,
    scaleY: 0, //goes from scale 1 ro scale 0
    opacity: 1,
    transformOrigin: "top right", //changing transform origin so it goes to other side
  });*/
}
/*function animationAboutFade() {
  var tl = gsap.timeline();
  tl.to(".page-transition-about", {
    duration: 0.25,
    opacity: 0,
    //scaleY: 0, //goes to scale 1
    transformOrigin: "bottom left", //from left to right
  });
}*/

//animating the transition for the first time you start page
function oncePageTransition(boxHeight) {
  var tl = gsap.timeline();

  //css scaleY is set to 1 so it starts fully visible
  //I set scaleY to 0 here to make it disappear, taking 1 second
  tl.to(".once-transition", {
    duration: 0.65,
    translateY: - boxHeight, //goes to scale 1
    transformOrigin: "top left", //from left to right
  });

  //WORKING ONE
  /*tl.to(".once-transition", {
    duration: 0.65,
    scaleY: 0, //goes to scale 1
    transformOrigin: "top left", //from left to right
  });*/
}
//---------------------------------------------------------------------------------------

//Animating anything that is on the page
function contentAnimation() {
  var tl = gsap.timeline();
  tl.from(".animation-wrapper", {
    duration: 0.5,
    //translateY: 50,
    opacity: 0,
    //delay: 0.5,
  });
}
function contentAnimationAbout() {
  var tl = gsap.timeline();
  tl.from(".all-content", {
    duration: 0.5,
    //translateY: 50,
    opacity: 0,
    delay: 0.5,
  });
}
//---------------------------------------

//Animating anything that is on the page when leaving page
function leaveAnimation() {
  var tl = gsap.timeline();
  tl.to(".animation-wrapper", {
    duration: 0.25,
    //translateY: 50,
    opacity: 0,
    //delay: 0.5,
  });
}
//---------------------------------------


function resetBody() {
  document.body.style.overflow = "scroll";
}

barba.init({
  views: [
    {
      namespace: "project-bubbles",
      /*beforeEnter() {
    
    },*/
      afterEnter() {
        animateBubbles();
      },
      beforeLeave() {
        resetBody();
        // do something before leaving the current namespace
      },
    },
    {
      namespace: "project-tetris",
      /*beforeEnter() {
       
      },*/
      afterEnter() {
        playTetris();
      },
    },
  ],

  sync: true,

  transitions: [
    {
      //Defines what happens when leaving a page
      name: "default-transition",
      async leave(data) {
        const done = this.async();

        let d1 = "left";
        let d2 = "right";
        //first we tell it to make the page transition
        pageTransition(d1, d2);
        //await delay(2000); //this would insert a 2 second delay before the new page is loaded

        //like content animation but this function will make my elements fade out when I leave the page
        leaveAnimation();

        //here it will wait 150 seconds before it's done
        await delay(150);
        done();
      },

      //defines what happens when entering a page
      async enter(data) {
        await delay(600); //this is the delay before the content fades in
        contentAnimation();
      },

      //defines what happens when you come to the start page
      async once(data) {
        //contentAnimation();

        //setting up a new animation that only happens first time you go to page

        //makes it wait 250 ms so that you only see black screen for that time
        await delay(1000);
        oncePageTransition(screenHeight);
        //await delay(250);
        contentAnimation();
      },
    },
    {
      name: "to-about-transition",
      from: {
        namespace: ["home"],
      },
      to: {
        namespace: ["about"],
      },

      async enter(data) {
        await delay(300); //this is the delay before the content fades in
        contentAnimationAbout();
        //await delay(100);
        //animationAboutFade();
      },
      async leave(data) {
        const done = this.async();

        let d1 = "bottom";
        let d2 = "top";
        let element = ".page-transition-about";
        //first we tell it to make the page transition
        pageTransitionAbout(d1, d2, element);

        //like content animation but this function will make my elements fade out when I leave the page
        //leaveAnimation();

        //here it will wait 150 seconds before it's done
        await delay(100);
        done();
      },
    },
    {
      name: "to-home-transition",
      to: {
        namespace: ["home"],
      },
      async leave(data) {
        const done = this.async();

        let d1 = "right";
        let d2 = "left";

        pageTransition(d1, d2);

        leaveAnimation();

        await delay(150);
        done();
      },

      async enter(data) {
        await delay(600);
        contentAnimation();
      },
    },
    {
      name: "about-to-home-transition",
      from: {
        namespace: ["about"],
      },
      to: {
        namespace: ["home"],
      },
      async leave(data) {
        const done = this.async();

        let d1 = "top";
        let d2 = "bottom";
        let element = ".page-transition-about-2";

        pageTransitionAbout(d1, d2, element);

        leaveAnimation();

        await delay(150);
        done();
      },

      async enter(data) {
        await delay(600);
        contentAnimation();
      },
    },
  ],
});
