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
  //spawnDebris(event.target);
}

function fade(element) {
  setTimeout(function () {
    element.setAttribute("src", "svg/frame2.svg");
  }, 30);
  setTimeout(function () {
    element.setAttribute("src", "svg/frame3.svg");
  }, 95);
  setTimeout(function () {
    element.style.opacity = 0;
    element.style.display = "none";
    element.setAttribute("src", "svg/moving-circle.svg");
  }, 150);
}
