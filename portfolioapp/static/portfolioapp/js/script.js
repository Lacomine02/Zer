document.addEventListener("DOMContentLoaded", () => {

    function activateCurrentLink(links) {
        let currentHash = window.location.hash;
        links.forEach(link => {
            const linkHref = link.getAttribute("href");

            if (linkHref === currentHash) {
                link.classList.add("underline");
                link.style.color = "#ae98eb";
            } else {
                link.classList.remove("underline");
                link.style.color = "#FFF";
            }
        });
    }

    function setupLinkBehavior(links) {
        activateCurrentLink(links);

        links.forEach(link => {
            link.addEventListener("click", () => {
                setTimeout(() => activateCurrentLink(links), 10);
            });

            link.addEventListener("mouseover", () => {
                link.classList.add("underline");
                link.style.color = "#ae98eb";
            });

            link.addEventListener("mouseout", () => {
                activateCurrentLink(links);
            });
        });

        window.addEventListener("hashchange", () => {
            activateCurrentLink(links);
        });
    }

    const desktopLinks = document.querySelectorAll(".list-nav-links a");
    const mobileLinks = document.querySelectorAll(".mobile-nav-links a");

    setupLinkBehavior(desktopLinks);
    setupLinkBehavior(mobileLinks);

});




const modal = document.getElementById('modalContent');
const overlay = document.getElementById('modalOverlay');
const fullImage = document.querySelector(".full-image");
const btnLeft = document.querySelector(".left");
const btnRight = document.querySelector(".right");

let images = [];
let current = 0;

document.querySelectorAll('.img-project').forEach(projectDiv => {
    projectDiv.addEventListener('click', function(event) {
        event.preventDefault();
        const data = projectDiv.getAttribute('data-images');
        images = JSON.parse(data.replace(/'/g, '"'));
        current = 0;
        fullImage.style.backgroundImage = `url('${images[current]}')`;
        modal.style.display = 'block';
        overlay.style.display = 'block';
    });
});

function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

overlay.addEventListener('click', closeModal);

function loadImage() {
    fullImage.style.backgroundImage = `url('${images[current]}')`;
}

function changeLeft(event) {
    event.stopPropagation();
    current = (current - 1 + images.length) % images.length;
    loadImage();
}

function changeRight(event) {
    event.stopPropagation();
    current = (current + 1) % images.length;
    loadImage();
}

btnLeft.addEventListener("click", changeLeft);
btnRight.addEventListener("click", changeRight);

const containerContact = document.querySelector(".container-contact")
containerContact.addEventListener("mouseover", () => {
    containerContact.classList.add("contact-style");
    containerContact.children[0].style.color = "#FFF";
})
containerContact.addEventListener("mouseout", () => {
    containerContact.classList.remove("contact-style");
    containerContact.children[0].style.color = "#ae98eb";
})


document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".section-skills");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const inView = entry.isIntersecting;

        const lines = document.querySelectorAll(".progress-line span");

        lines.forEach(line => {
          if (inView) {
            line.style.animation = "animate 1s 1s cubic-bezier(1, 0, 0.5, 1) forwards";
          } else {
            line.style.animation = "none";
            void line.offsetWidth; 
          }
        });

        const paths = document.querySelectorAll(".path");

        paths.forEach(path => {
          if (inView) {
            path.classList.add("animate");
          } else {
            path.classList.remove("animate");
            void path.offsetWidth;
          }
        });

      });
    },
    { threshold: 0.5 }
  );

  if (section) observer.observe(section);
});



