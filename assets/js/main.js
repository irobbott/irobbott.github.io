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

// Copy link - 1
document.addEventListener("DOMContentLoaded", () => {
        const copyBtns = document.querySelectorAll(".btn-copy-link");
        const popup = document.getElementById("copy-popup");

        if (copyBtns.length) {
                copyBtns.forEach(btn => {
                        btn.addEventListener("click", (event) => {
                                event.preventDefault(); // stop anchor from opening
                                event.stopPropagation(); // stop bubbling to <a>

                                const link = btn.getAttribute("data-link");

                                if (link) {
                                        navigator.clipboard.writeText(link)
                                        .then(() => {
                                                // Show popup
                                                popup.classList.add("show");
                                                setTimeout(() => {
                                                        popup.classList.remove("show");
                                                }, 3000); // fade out after 3s
                                        })
                                        .catch(err => {
                                                console.error("Failed to copy:", err);
                                        });
                                }
                        });
                });
        }
});

// Copy link - 2
document.addEventListener("DOMContentLoaded", () => {
        const copyBtns = document.querySelectorAll(".copy-share-link");
        const popup = document.getElementById("copy-popup");

        if (copyBtns.length) {
                copyBtns.forEach(btn => {
                        btn.addEventListener("click", (event) => {
                                event.preventDefault(); // stop anchor from opening
                                event.stopPropagation(); // stop bubbling to <a>

                                const link = btn.getAttribute("data-link");

                                if (link) {
                                        navigator.clipboard.writeText(link)
                                        .then(() => {
                                                // Show popup
                                                popup.classList.add("show");
                                                setTimeout(() => {
                                                        popup.classList.remove("show");
                                                }, 3000); // fade out after 3s
                                        })
                                        .catch(err => {
                                                console.error("Failed to copy:", err);
                                        });
                                }
                        });
                });
        }
});

// Share modal
document.addEventListener("DOMContentLoaded", () => {
        const shareBtn = document.querySelector(".share-icon");
        const shareBlur = document.querySelector(".share-blur");
        const cancelBtn = document.querySelector(".share-cancel");

        // Open modal
        shareBtn.addEventListener("click", () => {
                shareBlur.classList.add("active");
        });

        // Function to close with transition
        function closeModal() {
                shareBlur.style.opacity = "0"; // start fade out
                shareBlur.querySelector(".share-box").style.transform = "translateY(-20px)";

                // Wait for transition to finish before hiding
                setTimeout(() => {
                        shareBlur.classList.remove("active");
                        shareBlur.style.opacity = "";
                        shareBlur.querySelector(".share-box").style.transform = "";
                }, 300); // must match CSS transition time
        }

        // Close modal on cancel button
        cancelBtn.addEventListener("click", closeModal);

        // Close modal if clicking outside share-box
        shareBlur.addEventListener("click", (e) => {
                if (e.target === shareBlur) {
                        closeModal();
                }
        });
});

// QR code generator
new QRCode(document.getElementById("qrcode"), {
        text: "https://irobbott.github.io",  // put your link or text here
        width: 200,
        height: 200,
        correctLevel: QRCode.CorrectLevel.H // high error correction
});