(function () {
  /* ============================================================
     CONFIGURATION – change CRUSH_NAME to your crush's name
     ============================================================ */
  const CRUSH_NAME = "Matt"; // <-- CHANGE THIS

  /* ============================================================
     DOM ELEMENTS
     ============================================================ */
  const crushNameSpan       = document.getElementById("crushName");
  const letterCrushNameSpan = document.getElementById("letterCrushName");
  const noBtn               = document.getElementById("noBtn");
  const yesBtn              = document.getElementById("yesBtn");
  const letterSection       = document.getElementById("letterSection");
  const hintText            = document.getElementById("hintText");
  const buttonGroup         = document.getElementById("buttonGroup");

  const answerYesBtn    = document.getElementById("answerYesBtn");
  const answerNoBtn     = document.getElementById("answerNoBtn");
  const responseMessage = document.getElementById("responseMessage");
  
  const photoSection    = document.getElementById("photoSection");

  /* Set name in both greeting and letter */
  crushNameSpan.textContent       = CRUSH_NAME;
  letterCrushNameSpan.textContent = CRUSH_NAME;

  /* ============================================================
     FLOATING HEARTS BACKGROUND ANIMATION
     ============================================================ */
  const heartsContainer = document.getElementById("floatingHearts");
  
  function createFloatingHeart() {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    
    const size = Math.random() * 20 + 10; 
    const left = Math.random() * 100;     
    const duration = Math.random() * 4 + 6; 
    const delay = Math.random() * 5;        

    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${left}vw`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;
    
    const colors = ["#ffb3c6", "#ffc0cb", "#ff9ebb", "#ffa6c9"];
    heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, (duration + delay) * 1000);
  }

  setInterval(createFloatingHeart, 600);

  /* ============================================================
     "NO" BUTTON DODGE LOGIC (first set)
     ============================================================ */
  let currentX = 0;
  let currentY = 0;

  const MAX_OFFSET_X = 120;
  const MAX_OFFSET_Y = 70;
  const MIN_JUMP     = 80;

  function getNewPosition() {
    let newX, newY, attempts = 0;

    do {
      newX = (Math.random() * 2 - 1) * MAX_OFFSET_X;
      newY = (Math.random() * 2 - 1) * MAX_OFFSET_Y;
      attempts++;
    } while (
      attempts < 30 &&
      Math.hypot(newX - currentX, newY - currentY) < MIN_JUMP
    );

    return { x: newX, y: newY };
  }

  function dodgeNoButton() {
    const { x, y } = getNewPosition();
    currentX = x;
    currentY = y;

    const rotation = Math.random() * 8 - 4;
    noBtn.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

    if (hintText) hintText.style.opacity = "0.5";
  }

  noBtn.addEventListener("click", function (e) {
    e.preventDefault();
    dodgeNoButton();
  });

  noBtn.addEventListener("touchend", function (e) {
    e.preventDefault();
    dodgeNoButton();
  });

  noBtn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      dodgeNoButton();
    }
  });

  /* ============================================================
     SECOND "NO" BUTTON (inside letter)
     ============================================================ */
  let answerCurrentX = 0;
  let answerCurrentY = 0;

  function getAnswerDodgePosition() {
    let newX, newY, attempts = 0;

    do {
      newX = (Math.random() * 2 - 1) * MAX_OFFSET_X;
      newY = (Math.random() * 2 - 1) * MAX_OFFSET_Y;
      attempts++;
    } while (
      attempts < 30 &&
      Math.hypot(newX - answerCurrentX, newY - answerCurrentY) < MIN_JUMP
    );

    return { x: newX, y: newY };
  }

  function dodgeAnswerNoButton() {
    const { x, y } = getAnswerDodgePosition();
    answerCurrentX = x;
    answerCurrentY = y;

    const rotation = Math.random() * 8 - 4;
    answerNoBtn.style.transform =
      `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
  }

  answerNoBtn.addEventListener("click", function (e) {
    e.preventDefault();
    dodgeAnswerNoButton();
  });

  answerNoBtn.addEventListener("touchend", function (e) {
    e.preventDefault();
    dodgeAnswerNoButton();
  });

  answerNoBtn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      dodgeAnswerNoButton();
    }
  });

  /* ============================================================
     FIRST "YES" BUTTON – reveal the letter
     ============================================================ */
  yesBtn.addEventListener("click", function () {
    letterSection.classList.add("show");

    buttonGroup.style.display = "none";
    hintText.style.display    = "none";

    yesBtn.disabled = true;
    noBtn.disabled  = true;

    setTimeout(function () {
      letterSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 250);
  });

  /* ============================================================
     SECOND "YES" BUTTON – show photo & confirmation message
     ============================================================ */
  answerYesBtn.addEventListener("click", function () {
    photoSection.classList.add("show");

    responseMessage.textContent =
      `Please, message me if you're interested in a friendly date hehe`;
    responseMessage.classList.add("show");

    answerYesBtn.style.display = "none";
    answerNoBtn.style.display  = "none";

    setTimeout(function () {
      photoSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 150);
    
    setTimeout(function () {
      responseMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 400);
  });
})(); 