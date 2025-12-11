// preloader
const preloader = document.getElementById('preloader');
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Scroll Progress Bar 
window.addEventListener("scroll", () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
});

// custom cursor Logic
const cursor = document.querySelector(".cursor");
const cursor2 = document.querySelector(".cursor2");

document.addEventListener("mousemove", function (e) {
    cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
    cursor.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px;";
});

// mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// typing effect for hero section
const typeWriterElement = document.querySelector('.typewriter');
const textArray = ["Full-Stack developer", "Web Developer", "BSCS Student", "Coding Enthusiast", "PHP Developer"];
let textIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textIndex].length) {
        typeWriterElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typeWriterElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex++;
        if (textIndex >= textArray.length) textIndex = 0;
        setTimeout(type, 1000);
    }
}
document.addEventListener("DOMContentLoaded", type);

// scroll animation 
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


// AI assistant chatbot 
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatBody = document.getElementById('chat-body');

chatToggle.addEventListener('click', () => {
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
});

closeChat.addEventListener('click', () => {
    chatWindow.style.display = 'none';
});

const knowledgeBase = {
    "hello": "Hi there! How can I help you learn more about Hashir?",
    "hi": "Hello! Ask me about Hashir's skills or projects.",
    "name": "His name is Hashir Hassan, a web developer from Pakistan.",
    "skills": "Hashir is skilled in HTML, CSS, JavaScript, PHP, MySQL, and currently learning Data Science.",
    "projects": "He has built an E-Commerce Platform with an Admin Panel and various frontend interfaces.",
    "contact": "You can email him at hashirhassan157@gmail.com or call 0337-7068265.",
    "education": "He is currently pursuing a BSCS degree at Government College University, Faisalabad.",
    "location": "He is based in Faisalabad, Punjab, Pakistan.",
    "experience": "He works as a Frontend Developer at CodeAlpha (Nov 2025 - Present)."
};

function sendMessage() {
    const text = userInput.value.trim().toLowerCase();
    if (text === "") return;

    addMessage(userInput.value, 'user-msg');
    userInput.value = '';

    setTimeout(() => {
        const response = getBotResponse(text);
        addMessage(response, 'bot-msg');
    }, 600);
}

function addMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', className);
    msgDiv.innerHTML = `<p>${text}</p>`;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotResponse(input) {
    for (let key in knowledgeBase) {
        if (input.includes(key)) {
            return knowledgeBase[key];
        }
    }
    return "I'm not sure about that, but you can contact Hashir directly via email!";
}
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// 3d vanilla tilt effect animation
VanillaTilt.init(document.querySelectorAll(".service-card, .project-showcase, .about-card, .tech-item, .step-card, .timeline-content "), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
});

// for color switcher
function setTheme(primary, secondary) {
    document.documentElement.style.setProperty('--primary', primary);
    document.documentElement.style.setProperty('--secondary', secondary);
}

// 3D particles background
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#38bdf8" }, /* Matches your Cyan Primary Color */
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": false },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#38bdf8", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 4, "direction": "none", "random": false, "straight": false, "out_mode": "out" }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" } },
        "modes": { "repulse": { "distance": 100, "duration": 0.4 } }
    }
});

// back to top btn 
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
