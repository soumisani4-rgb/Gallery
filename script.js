const gallery = document.getElementById("gallery");

const cards = document.querySelectorAll(".card");

const leftBtn = document.getElementById("leftBtn");

const rightBtn = document.getElementById("rightBtn");

const viewer = document.getElementById("viewer");

const viewerWrapper =
  document.getElementById("viewerWrapper");

const viewerImage =
  document.getElementById("viewerImage");

const closeViewer =
  document.getElementById("closeViewer");


/* =====================================================
   3D ROTATION
===================================================== */

let rotation = 0;

let autoRotate = true;

let isDragging = false;

let startX = 0;


/* =====================================================
   AUTOMATIC ROTATION
===================================================== */

function animate() {

  if (autoRotate && !viewer.classList.contains("active")) {

    rotation += 0.06;

    gallery.style.transform =
      `rotateY(${rotation}deg)`;

  }

  requestAnimationFrame(animate);
}

animate();


/* =====================================================
   RIGHT BUTTON
===================================================== */

rightBtn.addEventListener("click", () => {

  if (viewer.classList.contains("active")) return;

  autoRotate = false;

  rotation += 35;

  gallery.style.transform =
    `rotateY(${rotation}deg)`;

});


/* =====================================================
   LEFT BUTTON
===================================================== */

leftBtn.addEventListener("click", () => {

  if (viewer.classList.contains("active")) return;

  autoRotate = false;

  rotation -= 35;

  gallery.style.transform =
    `rotateY(${rotation}deg)`;

});


/* =====================================================
   CLICK PHOTO
===================================================== */

cards.forEach(card => {

  card.addEventListener("click", () => {

    openPhoto(card);

  });

});


/* =====================================================
   OPEN PHOTO
===================================================== */

function openPhoto(card) {

  autoRotate = false;

  document.body.classList.add("viewing");


  const image =
    card.querySelector("img");


  /*
    Use the exact same image that was
    clicked.
  */

  viewerImage.src = image.src;


  /*
    Reset viewer first.
  */

  viewer.classList.remove("active");

  viewerWrapper.style.width = "";

  viewerWrapper.style.height = "";


  /*
    Force browser to process the initial state.
  */

  void viewer.offsetWidth;


  /*
    Open viewer.

    The small 125x165 image expands
    into the large fullscreen image.
  */

  viewer.classList.add("active");

}


/* =====================================================
   CLOSE PHOTO
===================================================== */

closeViewer.addEventListener("click", closePhoto);


viewer.addEventListener("click", (event) => {

  if (event.target === viewer) {

    closePhoto();

  }

});


/* =====================================================
   CLOSE FUNCTION
===================================================== */

function closePhoto() {

  viewer.classList.remove("active");

  document.body.classList.remove("viewing");


  /*
    Wait until the zoom-out animation
    finishes before clearing the image.
  */

  setTimeout(() => {

    viewerImage.src = "";

    autoRotate = true;

  }, 800);

}


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    closePhoto();

  }

});


/* =====================================================
   MOUSE DRAG
===================================================== */

gallery.addEventListener("mousedown", (event) => {

  if (viewer.classList.contains("active")) return;

  isDragging = true;

  autoRotate = false;

  startX = event.clientX;

});


window.addEventListener("mousemove", (event) => {

  if (!isDragging) return;

  const movement =
    event.clientX - startX;


  rotation += movement * .25;


  gallery.style.transform =
    `rotateY(${rotation}deg)`;


  startX = event.clientX;

});


window.addEventListener("mouseup", () => {

  isDragging = false;

});


/* =====================================================
   TOUCH DRAG
===================================================== */

gallery.addEventListener("touchstart", (event) => {

  if (viewer.classList.contains("active")) return;

  isDragging = true;

  autoRotate = false;

  startX =
    event.touches[0].clientX;

});


gallery.addEventListener("touchmove", (event) => {

  if (!isDragging) return;

  const movement =
    event.touches[0].clientX - startX;


  rotation += movement * .25;


  gallery.style.transform =
    `rotateY(${rotation}deg)`;


  startX =
    event.touches[0].clientX;

});


gallery.addEventListener("touchend", () => {

  isDragging = false;

});