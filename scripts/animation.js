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
    duration: 0.3,
    //translateY: 50,
    opacity: 0,
    delay: 0.3,
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

//code for bubbles page
function animateBubbles() {
  document.body.style.overflow = "hidden";
  let circles = document.querySelectorAll(".circle-move");
  //Floating circles
  function floatUp(yStart, xStart, speed, element) {
    let pos = yStart;
    let posX = xStart;

    var animInterval = setInterval(frame, speed);

    function frame() {
      if (pos > 100) {
        pos = yStart;
        element.style.bottom = pos + "%";
        element.style.display = "inline";
        element.style.opacity = 0.5;
      } else {
        pos += 0.13;

        if (pos < 32) {
          posX += 0.03;
        } else if (pos < 62) {
          posX -= 0.02;
        } else {
          posX += 0.013;
        }
        if (posX > 105) {
          posX = xStart;
        }

        element.style.bottom = pos + "%"; //+ 'px';
        element.style.left = posX / 2 + "%";
      }
    }
  }

  floatUp(-20, 30, 13.4, circles.item(0));
  floatUp(-60, 48, 14.3, circles.item(1));
  floatUp(-90, 77, 18.1, circles.item(2));
  floatUp(-45, 150, 16, circles.item(3));
  floatUp(-55, 150, 15, circles.item(4));
  floatUp(-36, 150, 14, circles.item(5));
  floatUp(-70, 150, 12, circles.item(6));
  floatUp(-66, 150, 11, circles.item(7));
  floatUp(-73, 188, 17.77, circles.item(8));
  floatUp(-82, 175, 13.2, circles.item(9));

  for (let i = 0; i < circles.length; i++) {
    circles.item(i).addEventListener("click", pop);
  }

  function pop(event) {
    fade(event.target);
    spawnDebris(event.target);
  }

  function fade(element) {
    setTimeout(function () {
      element.setAttribute("src", "../svg/frame2.svg");
    }, 30);
    setTimeout(function () {
      element.setAttribute("src", "../svg/frame3.svg");
    }, 95);
    setTimeout(function () {
      element.style.opacity = 0;
      element.style.display = "none";
      element.setAttribute("src", "../svg/moving-circle.svg");
    }, 150);
  }
}

/*
function spawnDebris(element) {

  for (let i = 0; i < 10; i += 0.2) {
    let square = document.createElement("div");
    square.classList.add("debris");

    square.style.bottom = element.style.bottom;
    square.style.left = element.style.left;
    document.body.appendChild(square);
    fallDown(square, 10, square.style.bottom); //make 10 random number to set different speeds
  }
}


function fallDown(element, speed, bottomPos) {

  let newBotPos = bottomPos.replace("%", "");
  //console.log(newBotPos);

  let botPosition = newBotPos;
  var fallInterval = setInterval(frames2, speed);

  function frames2() {


    if (botPosition < -10) {
      clearInterval(fallInterval);

    }
    else {
      botPosition -= 0.1;

      element.style.bottom = botPosition + "%";
    }
  }

}
*/

function resetBody() {
  document.body.style.overflow = "scroll";
}


//TETRIS CODE
function playTetris() {
  "use strict";

  const width = 10;
  let nextRandom = 0;
  let score = 0;
  let reset = 0;

  let grid = document.querySelector(".grid");
  let minigrid = document.querySelector(".mini-grid");

  //GET HIGHSCORE
  let checkCookies = decode();

  let hsDiv = document.getElementById("highscore");
  hsDiv.innerHTML = "";
  let p = document.createElement("p");
  hsDiv.appendChild(p);

  if (checkCookies.highscore !== undefined) {
    let hsValue = document.createTextNode(
      "Highscore: " + checkCookies.highscore
    );
    p.appendChild(hsValue);
  } else {
    let hsValue = document.createTextNode("Highscore: 0");
    p.appendChild(hsValue);
  }
  //----------------

  for (let i = 0; i < 200; i++) {
    let div = document.createElement("div");
    grid.appendChild(div);
  }

  for (let i = 0; i < 10; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "taken");
    grid.appendChild(div);
  }

  for (let i = 0; i < 16; i++) {
    let div = document.createElement("div");
    minigrid.appendChild(div);
  }

  let squares = Array.from(document.querySelectorAll(".grid div"));

  const scoreDisplay = document.querySelector("#score");
  const startBtn = document.querySelector("#start-button");
  let timerId;

  //Defining the shapes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const tetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  let currentPosition = 4;
  let currentRotation = 0;

  let random = Math.floor(Math.random() * tetrominoes.length); //tetrominoes.length = 5

  //current tilldelas en slumpmässig form och dess rotation
  let current = tetrominoes[random][0];

  //draw

  function draw() {
    //för varje index som formen har (varje koordinat), sätts klassen tetromino
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("tetromino");
    });
  }

  //undraw
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
    });
  }

  //let timerId = setInterval(moveDown, 1000);

  //assign functions to keycodes
  function control(e) {
    e.preventDefault();

    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener("keydown", control);

  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  //some - kollar om det är sant för någon av sakerna i arrayen och utför isåfall if statement
  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      ); //ger klassen "taken" för att även ge dessa block "hit detection"
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * tetrominoes.length); //ny random shape
      current = tetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
      addScore();
      gameOver();
      //den formen som rörde sig nedåt stannar av sig själv eftersom funktionen draw nu har börjat om på pos 4.
    }
    //för varje index => kollar vi om squares för raden under den rad som index är ritad på
    //har klassen taken. Om detta är sant för något av indexen så körs if satsen
  }

  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );

    if (!isAtLeftEdge) {
      currentPosition -= 1;
    }

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }

    draw();
  }

  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );

    if (!isAtRightEdge) {
      currentPosition += 1;
    }

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }

    draw();
  }

  function rotate() {
    undraw();

    currentRotation++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }

    current = tetrominoes[random][currentRotation];

    //rotation fix - makes it so it can't rotate through previous shapes
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentRotation--;
      current = tetrominoes[random][currentRotation];
    }

    draw();
  }

  const displaySquares = document.querySelectorAll(".mini-grid div");
  const displayWidth = 4;
  let displayIndex = 0;

  //Tetrominoes without their rotations
  const nextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], //l
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //z
    [1, displayWidth, displayWidth + 1, displayWidth + 2], //t
    [0, 1, displayWidth, displayWidth + 1], //o
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //i
  ];

  //display shape in mini-grid
  function displayShape() {
    displaySquares.forEach((square) => {
      square.classList.remove("tetromino");
    });

    nextTetrominoes[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("tetromino");
    });
  }

  startBtn.addEventListener("click", function () {
    const soundtrack = document.querySelector("audio");
    soundtrack.play();

    //om timerId inte är null
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, 1000);

      //kollar reset variabeln så att inte nästa form byts varje gång man pausar
      if (reset === 0) {
        nextRandom = Math.floor(Math.random() * tetrominoes.length);
        displayShape();
        reset++;
      }
    }
  });

  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];

      if (row.every((index) => squares[index].classList.contains("taken"))) {
        score += 10;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove("taken");
          squares[index].classList.remove("tetromino");
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

  // game over

  function gameOver() {
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      scoreDisplay.innerHTML = score + ", Game Over!";

      var cookies = decode();

      if (cookies.highscore === undefined) {
        document.cookie = "highscore=" + score;
      }

      if (cookies.highscore !== undefined) {
        if (score > cookies.highscore) {
          document.cookie = "highscore=" + score;
        }
      }

      cookies = decode();
      console.log("high score is" + cookies.highscore);

      let hsDiv = document.getElementById("highscore");
      hsDiv.innerHTML = "";
      let hsValue = document.createTextNode("Highscore: " + cookies.highscore);

      let p = document.createElement("p");
      p.appendChild(hsValue);
      hsDiv.appendChild(p);

      clearInterval(timerId);
      const soundtrack = document.querySelector("audio");
      soundtrack.pause();
    }
  }
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
        await delay(200); //this is the delay before the content fades in
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
