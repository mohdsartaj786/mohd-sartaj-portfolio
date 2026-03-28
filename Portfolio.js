/* ================= NAVBAR TOGGLE ================= */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
});

/* CLOSE MENU ON LINK CLICK */
document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
    });
});

/* ================= SMOOTH SCROLL ================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

/* ================= ACTIVE NAV LINK ================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) current = section.getAttribute("id");
    });

    navLinks.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href") === `#${current}`) a.classList.add("active");
    });

    // NAVBAR SHADOW
    const navbar = document.querySelector(".navbar");
    navbar.style.boxShadow = window.scrollY > 50 ? "0 5px 20px rgba(0,0,0,0.5)" : "none";
});

/* ================= DARK MODE ================= */
const toggle = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "light") document.body.classList.add("light");

toggle.onclick = () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
};

/* ================= TYPING EFFECT ================= */
const words = ["Full Stack Developer", "Web Designer", "React Developer"];
let i = 0, j = 0, currentWord = "", isDeleting = false;

function typeEffect() {
    const el = document.getElementById("typing");
    if (!el) return;

    if (!isDeleting && j <= words[i].length) currentWord = words[i].substring(0, j++);
    else if (isDeleting && j >= 0) currentWord = words[i].substring(0, j--);

    el.innerHTML = currentWord;

    if (j === words[i].length) isDeleting = true;
    if (j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 150);
}
typeEffect();

/* ================= SCROLL ANIMATION ================= */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
}, { threshold: 0.2 });

document.querySelectorAll(".project-card, .about, .skills, .tools, .contact, .education")
    .forEach(el => {
        el.classList.add("hidden");
        observer.observe(el);
    });

/* ================= AI CHATBOT ================= */
function toggleChat() {
    const chat = document.getElementById("chatBody");
    chat.style.display = chat.style.display === "block" ? "none" : "block";
}

function sendMessage() {
    const input = document.getElementById("userInput");
    const msg = input.value.trim().toLowerCase();
    if (!msg) return;

    const box = document.getElementById("chatMessages");
    box.innerHTML += `<div><b>You:</b> ${msg}</div>`;

    let reply = "Sorry, I didn't understand 😅";

    if (msg.includes("name")) reply = "My name is Mohd Sartaj Hashmi.";
    else if (msg.includes("skill")) reply = "I work with HTML, CSS, JavaScript, React, Node.js, and MySQL.";
    else if (msg.includes("project")) reply = "I have built portfolio, todo, weather, blog, ecommerce, and full-stack websites.";
    else if (msg.includes("contact")) reply = "You can contact me via email or LinkedIn.";
    else if (msg.includes("resume")) reply = "You can download my resume from the button above 👆";
    else if (msg.includes("education")) reply = "I completed 10th from Nobel Senior Secondary School, 12th from S.K.B.M Inter College, and currently pursuing BCA from Microtek College of Management and Technology.";

    box.innerHTML += `<div><b>Bot:</b> ${reply}</div>`;

    input.value = "";
    box.scrollTop = box.scrollHeight;
}

document.getElementById("userInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});

/* ================= CONTACT FORM (EmailJS) ================= */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this, 'YOUR_USER_ID')
            .then(() => {
                alert("Message sent successfully! ✅");
                contactForm.reset();
            }, (err) => {
                alert("Failed to send message. ❌ Please try again later.");
                console.error(err);
            });
    });
}