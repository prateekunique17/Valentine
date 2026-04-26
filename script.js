const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const catGif = document.getElementById('cat-gif');
const question = document.getElementById('question');
const teaseToast = document.getElementById('tease-toast');
const mainContainer = document.getElementById('main-container');
const bgMusic = document.getElementById('bg-music');
const musicIcon = document.getElementById('music-icon');
const buttonsContainer = document.querySelector('.buttons');

const noPhrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;("
];

const noGifs = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif", // Original
    "https://media1.tenor.com/m/VxixtsQjIRAAAAAC/chibi-cat-mochi-cat.gif", // Chibi Cat Mochi Cat (User choice)
    "https://media.tenor.com/9C9gUmUZh0sAAAAC/rosy-cheeks-mochi-cat.gif", // Sad
    "https://media.tenor.com/Sn0nQ5dvHm4AAAAC/%EB%AA%A8%EC%B0%8C%EB%83%A5-%EB%88%88%EB%AC%BC.gif", // Crying
    "https://media.tenor.com/BbSkyx3DaEgAAAAC/goma-sad.gif", // Very sad
    "https://media.tenor.com/99sQqbsDt1kAAAAC/sad.gif", // Devastated
    "https://media.tenor.com/Pj81fRIfdk0AAAAC/%EB%AA%A8%EC%B0%8C-%EB%AA%A8%EB%AA%A8%EC%B0%8C.gif" // Maximum sadness
];

let noCount = 0;

function createHearts() {
    const bg = document.getElementById('hearts-bg');
    for (let i = 0; i < 50; i++) {
        let heart = document.createElement('div');
        heart.classList.add('heart');
        const heartEmojis = ['❤️', '💖', '💕', '💗', '💓'];
        heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 15 + 10) + 'px';
        bg.appendChild(heart);
    }
}

createHearts();

// Try to autoplay music on first interaction
document.body.addEventListener('click', () => {
    if (bgMusic && bgMusic.muted) {
        toggleMusic();
    }
}, { once: true });

function toggleMusic() {
    if (!bgMusic) return;
    
    if (bgMusic.muted || bgMusic.paused) {
        bgMusic.muted = false;
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        musicIcon.textContent = '🔊';
    } else {
        bgMusic.pause();
        bgMusic.muted = true;
        musicIcon.textContent = '🔇';
    }
}

function dodgeButton() {
    if (noBtn.parentElement !== document.body) {
        document.body.appendChild(noBtn);
        noBtn.style.zIndex = '1000';
    }

    const maxWidth = window.innerWidth - noBtn.offsetWidth;
    const maxHeight = window.innerHeight - noBtn.offsetHeight;
    
    noBtn.style.position = 'fixed';
    
    const randomX = Math.max(0, Math.floor(Math.random() * maxWidth));
    const randomY = Math.max(0, Math.floor(Math.random() * maxHeight));
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    if (noCount >= 5) {
        noCount++;
        noBtn.textContent = noPhrases[Math.min(noCount, noPhrases.length - 1)];
        catGif.src = noGifs[Math.min(noCount, noGifs.length - 1)];
    }
}

let yesFontSize = 1.2;
let noFontSize = 1.2;

function handleNoClick() {
    if (noCount < 5) {
        noCount++;
        // Update text and GIF immediately
        const phraseIndex = Math.min(noCount, noPhrases.length - 1);
        const gifIndex = Math.min(noCount, noGifs.length - 1);
        
        noBtn.textContent = noPhrases[phraseIndex];
        catGif.src = noGifs[gifIndex];
        
        const isMobile = window.innerWidth <= 500;
        yesFontSize += isMobile ? 0.2 : 0.5;
        yesBtn.style.fontSize = `${yesFontSize}rem`;
        
        noFontSize -= 0.15;
        noBtn.style.fontSize = `${noFontSize}rem`;
    } else {
        if (!noBtn.dataset.dodging) {
            noBtn.dataset.dodging = 'true';
            noBtn.style.fontSize = '1.2rem';
            noFontSize = 1.2;
            
            noBtn.addEventListener('mouseover', dodgeButton);
            noBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                dodgeButton();
            }, { passive: false });
        }
        dodgeButton();
    }
}

function handleYesClick() {
    question.textContent = "Yay! I knew you would say YES! 💖💖💖";
    catGif.src = "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif";
    
    buttonsContainer.style.display = "none";
    teaseToast.style.opacity = "0";
    noBtn.style.display = "none";
    
    // Create fireworks
    createFireworks();

    // Add Surprise Button
    const surpriseBtn = document.createElement('button');
    surpriseBtn.className = 'btn surprise-btn';
    surpriseBtn.innerHTML = 'Click for a surprise! ✨';
    surpriseBtn.onclick = showSurprise;
    mainContainer.appendChild(surpriseBtn);

    // Add Love Letter Envelope
    const letters = [
        `
        <p>My Dearest Valentine,</p>
        <p>From the moment I met you, my world became so much brighter.</p>
        <p>Your laugh is my favorite song, and your smile is my sunshine.</p>
        <p>I feel so lucky to have you in my life. You are kind, beautiful, and absolutely amazing in every way.</p>
        <p>Thank you for being you, and for saying YES!</p>
        <p>I love you more than words can say. ❤️</p>
        <p>Forever Yours,</p>
        <p>Your Valentine ❤️</p>
        `,
        `
        <p>To My Favorite Person,</p>
        <p>I was so nervous asking you this, but seeing you say "Yes" made my whole year!</p>
        <p>You make every day feel like a dream. Whether we're out on an adventure or just chilling, everything is better with you.</p>
        <p>You're not just my girlfriend, you're my best friend.</p>
        <p>I promise to always make you laugh and keep you happy.</p>
        <p>Happy Valentine's Day, beautiful! 💖</p>
        <p>With all my love,</p>
        <p>Your Valentine ❤️</p>
        `,
        `
        <p>Hey Love,</p>
        <p>I knew you'd click that big "Yes" button eventually! 😉</p>
        <p>Every moment spent with you is a treasure. I love how you always know how to make me smile, even on my toughest days.</p>
        <p>You are my home and my heart. I can't wait for all the memories we're going to make together.</p>
        <p>You're the best thing that ever happened to me.</p>
        <p>I'm yours forever. 💕</p>
        <p>Love always,</p>
        <p>Your Valentine ❤️</p>
        `
    ];

    const randomLetter = letters[Math.floor(Math.random() * letters.length)];

    const envelopeWrapper = document.createElement('div');
    envelopeWrapper.className = 'envelope-wrapper';
    envelopeWrapper.innerHTML = `
        <div class="envelope-flap"></div>
        <div class="letter-paper">
            ${randomLetter}
        </div>
        <span style="z-index:4; color: white; font-weight: bold;">Tap to open 💌</span>
    `;
    
    envelopeWrapper.onclick = function(e) {
        e.stopPropagation(); // Prevent document click from firing
        this.classList.toggle('open');
        const hint = this.querySelector('span');
        if (hint) hint.style.display = 'none';
    };
    
    // Close envelope when clicking anywhere else
    document.addEventListener('click', () => {
        if (envelopeWrapper.classList.contains('open')) {
            envelopeWrapper.classList.remove('open');
        }
    });
    
    mainContainer.appendChild(envelopeWrapper);
}

const reasons = [
    "Your beautiful smile 😊",
    "How kind you are to everyone ❤️",
    "The way you make me laugh 😂",
    "Your sparkling eyes ✨",
    "How supportive you are 🤝",
    "Your brilliant mind 🧠",
    "Your wonderful sense of humor 🎭",
    "The way you care for me 🥰",
    "Your warm heart 💖",
    "Your amazing energy ⚡"
];

function showSurprise() {
    const popperContainer = document.getElementById('popper-container');
    // Spam 20 reasons for full screen coverage
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const reason = reasons[Math.floor(Math.random() * reasons.length)];
            const popper = document.createElement('div');
            popper.className = 'reason-popper';
            popper.textContent = reason;

            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // On mobile, use a fixed width for the bubble to make math 100% predictable
            const popperWidth = width < 600 ? 180 : 250;
            
            // x is the LEFT position. We ensure it's between 10px and (Screen Width - Bubble Width - 10px)
            const maxX = width - popperWidth - 20;
            const x = Math.random() * Math.max(0, maxX) + 10;
            
            // y is the TOP position.
            const y = Math.random() * (height - 150) + 50;
            
            popper.style.left = x + 'px';
            popper.style.top = y + 'px';
            popper.style.width = popperWidth + 'px';
            
            const rotation = (Math.random() - 0.5) * 30;
            popper.style.transform = `rotate(${rotation}deg)`;
            
            popperContainer.appendChild(popper);
            
            setTimeout(() => {
                popper.remove();
            }, 2000);
        }, i * 150);
    }
}

function createFireworks() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            let firework = document.createElement('div');
            firework.classList.add('firework');
            firework.style.left = Math.random() * 100 + 'vw';
            firework.style.top = Math.random() * 100 + 'vh';
            
            // Random vibrant colors
            const colors = ['#ff4b72', '#ff6b81', '#ff9a9e', '#fecfef', '#ffffff', '#ffd700'];
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.boxShadow = `0 0 15px 3px ${firework.style.backgroundColor}`;
            
            document.body.appendChild(firework);
            
            setTimeout(() => {
                firework.remove();
            }, 1000);
        }, i * 50);
    }
}

// Sparkle and Tilt Effect
document.addEventListener('mousemove', (e) => {
    // Sparkle logic
    if (Math.random() > 0.8) { 
        createSparkle(e.clientX, e.clientY);
    }

    // 3D Tilt logic
    if (mainContainer) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const yRotation = ((clientX - innerWidth / 2) / innerWidth) * 30;
        const xRotation = ((clientY - innerHeight / 2) / innerHeight) * -30;
        
        mainContainer.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    }
});

document.addEventListener('touchmove', (e) => {
    if (Math.random() > 0.8) {
        createSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }
});

// Tilt for mobile (Device Orientation)
window.addEventListener('deviceorientation', (e) => {
    if (mainContainer && e.beta !== null) {
        const xRotation = (e.beta / 10);
        const yRotation = (e.gamma / 10);
        mainContainer.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    
    const items = ['✨', '💖', '❤️', '💕', '🌸'];
    sparkle.innerHTML = items[Math.floor(Math.random() * items.length)];
    
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    // Add slight random offset
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    sparkle.style.marginLeft = offsetX + 'px';
    sparkle.style.marginTop = offsetY + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 800);
}
