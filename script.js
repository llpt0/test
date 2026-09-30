function changeCake(flavor) {
  const cakeImg = document.getElementById('cake-img');
  const litCakeImg = document.getElementById('lit-cake-img');
  if (cakeImg) cakeImg.src = `pixel/${flavor}.png`;
  if (litCakeImg) litCakeImg.src = `pixel/${flavor}.png`;
}

const bgMusic = document.getElementById('bg-music');

function playBackgroundMusic() {
  if (bgMusic) {
    bgMusic.volume = 0.5;
    bgMusic.play().catch(error => {
      console.log("Autoplay prevented:", error);
    });
  }
}

function fadeTransition(fromScreen, toScreen, isWhite = false, callback) {
  const overlay = document.getElementById('fade-overlay');

  if (isWhite) {
    overlay.classList.add('white');
  } else {
    overlay.classList.remove('white');
  }

  overlay.classList.add('active');

  setTimeout(() => {
    fromScreen.classList.remove('active');
    toScreen.classList.add('active');

    setTimeout(() => {
      overlay.classList.remove('active');
      overlay.classList.remove('white'); // reset back to default
      if (typeof callback === 'function') callback();
    }, 500);
  }, 500);
}

function setupWishScreen() {
  const wishPrompt = document.getElementById('wish-prompt');
  const wishActions = document.getElementById('wish-actions');
  const btnWish = document.getElementById('btn-wish');
  const btnBlow = document.getElementById('btn-blow');
  const flame = document.getElementById('candle-flame');

  if (!wishPrompt || !wishActions || !btnWish || !btnBlow || !flame) return;

  flame.classList.remove('out');
  wishPrompt.textContent = 'Did you make a wish yet?';
  btnWish.style.display = 'inline-block';
  btnBlow.style.display = 'none';

  wishPrompt.classList.add('show');
  wishActions.classList.add('show');

  btnWish.onclick = () => {
    btnWish.style.display = 'none';
    btnBlow.style.display = 'inline-block';
    wishPrompt.textContent = 'Now blow out the candle!';
  };

  btnBlow.onclick = () => {
    flame.classList.add('out');

    setTimeout(() => {
      const screen6 = document.getElementById('screen-wish');
      const screen7 = document.getElementById('screen-envelope');
      fadeTransition(screen6, screen7);
    }, 1000);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const btnUsername = document.getElementById('btn-username');
  const usernameInput = document.getElementById('username-input');
  const welcomeHeading = document.getElementById('welcome-heading');
  const screen1 = document.getElementById('screen-username');
  const screen2 = document.getElementById('screen-dob');

  if (btnUsername && usernameInput && screen1 && screen2) {
    btnUsername.onclick = () => {
      const name = usernameInput.value.trim() || 'Wendy';
      if (welcomeHeading) welcomeHeading.textContent = `Welcome, ${name}!`;
      fadeTransition(screen1, screen2);
    };
  }

  const btnDob = document.getElementById('btn-dob');
  const dobInput = document.getElementById('dob-input');
  const dobError = document.getElementById('dob-error');
  const screen3 = document.getElementById('screen-surprise');

  if (btnDob && dobInput && screen2 && screen3) {
    btnDob.onclick = () => {
      if (dobInput.value === '2009-09-30') {
        if (dobError) dobError.textContent = '';
        fadeTransition(screen2, screen3);
      } else {
        if (dobError) {
          dobError.textContent = 'Hmm... That doesn\'t seem right. Try again!';
          dobError.style.color = '#d90429';
          dobError.style.marginTop = '10px';
        }
      }
    };
  }

  const btnSurprise = document.getElementById('btn-surprise');
  const screen4 = document.getElementById('screen-gift');

if (btnSurprise && screen3 && screen4) {
  btnSurprise.onclick = () => {
    document.body.classList.add('sky-mode');
    fadeTransition(screen3, screen4, true); 
  };
}

  const btnGift = document.getElementById('btn-gift');
  const giftBox = document.getElementById('gift-box');
  const screen5 = document.getElementById('screen-cake');

  const handleGiftOpen = () => {
  document.body.classList.add('sky-mode');
  fadeTransition(screen4, screen5);
  playBackgroundMusic();
};

  if (btnGift) btnGift.onclick = handleGiftOpen;
  if (giftBox) giftBox.onclick = handleGiftOpen;

  const flavorBtns = document.querySelectorAll('.flavors button');
  const btnConCake = document.getElementById('btn-concake');
  const screen6 = document.getElementById('screen-wish');

  if (btnConCake) {
    btnConCake.disabled = true;
  }

if (flavorBtns.length > 0) {
    flavorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        flavorBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        const flavor = btn.getAttribute('data-flavor');
        if (flavor) {
          changeCake(flavor); 
        }

        if (btnConCake) btnConCake.disabled = false;
      });
    });
  }

  if (btnConCake && screen5 && screen6) {
    btnConCake.onclick = () => {
      fadeTransition(screen5, screen6, false, setupWishScreen);
    };
  }

  if (screen6 && screen6.classList.contains('active')) {
    setupWishScreen();
  }

  const btnEnvelope = document.getElementById('btn-envelope');
  const letterModal = document.getElementById('letter-modal');

  if (btnEnvelope && letterModal) {
    btnEnvelope.onclick = () => {
      letterModal.classList.add('active');
    };
  }
});