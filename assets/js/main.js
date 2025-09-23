// Header typing text animation
const texts = [
        "<Full-Stack Developer • Designer • Creator>",
        "<Code • Design • Create>",
        "<My Work • My Links • My Space>",
        "<Let's Connect :) >"
];

const typingElement = document.getElementById("typing");
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 50; // ms per character
let delayBetween = 1500; // 3 seconds before deleting

function type() {
        let currentText = texts[textIndex];

        if (!isDeleting) {
                // Typing forward
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentText.length) {
                        // Pause at full text
                        setTimeout(() => {
                                isDeleting = true;
                                type();
                        }, delayBetween);
                        return;
                }
        } else {
                // Deleting
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                        isDeleting = false;
                        textIndex = (textIndex + 1) % texts.length; // move to next text
                }
        }

        setTimeout(type, isDeleting ? 50 : typingSpeed);
}

type();

// Cover image transition
document.addEventListener('DOMContentLoaded', () => {
        const images = document.querySelectorAll('.cover-img');
        if (!images.length) return;

        let index = 0;
        const transitionMs = 1000; // must match CSS transition duration (1s)

        // show the first image immediately
        images[index].classList.add('active');
        index = (index + 1) % images.length;

        // each tick: fade in the next image and remove previous after the transition
        setInterval(() => {
                const nextIndex = index;
                const prevIndex = (index - 1 + images.length) % images.length;

                // make next visible (it will transition in)
                images[nextIndex].classList.add('active');

                // after transition duration, hide previous (so they overlap during transition)
                setTimeout(() => {
                        images[prevIndex].classList.remove('active');
                }, transitionMs);

                index = (index + 1) % images.length;
        }, 3000); // 3s per slide
});

// QR code generator
new QRCode(document.getElementById("qrcode"), {
        text: "https://irobbott.github.io",  // put your link or text here
        width: 200,
        height: 200,
        correctLevel: QRCode.CorrectLevel.H // high error correction
});