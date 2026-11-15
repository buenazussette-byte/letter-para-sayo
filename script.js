(function () {
  const CRUSH_NAME = "Matt"; 
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

  const dodgeMessage1   = document.getElementById("dodgeMessage1");
  const dodgeMessage2   = document.getElementById("dodgeMessage2");

  const loadingScreen   = document.getElementById("loadingScreen");
  const loadingBar      = document.getElementById("loadingBar");
  const loadingText     = document.getElementById("loadingPercentage");
  const enterBtn        = document.getElementById("enterBtn");
  const mainWrapper     = document.getElementById("mainWrapper");

  crushNameSpan.textContent       = CRUSH_NAME;
  letterCrushNameSpan.textContent = CRUSH_NAME;

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

  let progress = 1;
  
  const loadingInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 5) + 2; 
    
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      
      setTimeout(() => {
        enterBtn.classList.add("show");
      }, 300);
    }
    
    loadingText.textContent = progress + "%";
    loadingBar.style.width = progress + "%";
  }, 80);

  enterBtn.addEventListener("click", () => {
    loadingScreen.classList.add("fade-out");
    
    setTimeout(() => {
      loadingScreen.style.display = "none";
      mainWrapper.classList.add("show");
      document.body.style.overflowY = "auto"; 
    }, 600);
  });

  const messages = [ 
    "oopps...",
    "hala bawal daw mag no...",
    "aray ko...",
    "no, talaga? :<",
    "ayaw mo talaga?",
    "please naman oh :<",
    "sige na... yes na..." 
  ];
  
  let msgIndex1 = 0;
  let msgIndex2 = 0;

  function showMessage(element, index) {
    // Set text and show
    element.textContent = messages[index];
    element.classList.add("show");
    
    // Hide after 1.5 seconds
    setTimeout(() => {
      element.classList.remove("show");
    }, 1500);
  }

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

    showMessage(dodgeMessage1, msgIndex1);
    msgIndex1 = (msgIndex1 + 1) % messages.length;
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

    showMessage(dodgeMessage2, msgIndex2);
    msgIndex2 = (msgIndex2 + 1) % messages.length;
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
