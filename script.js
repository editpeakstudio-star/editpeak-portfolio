document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     3D PHONE MOUSE PARALLAX
  ========================= */

  const phone = document.getElementById("phone");

  if (phone && window.innerWidth > 850) {

    window.addEventListener("mousemove", (event) => {

      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;

      const rotateY = x * 8;
      const rotateX = y * -6;

      phone.style.transform =
        `translate3d(${x * 8}px, ${y * 8}px, 0)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)`;

    });

  }


  /* =========================
     PORTFOLIO VIDEO PLAY
  ========================= */

  const videos = document.querySelectorAll(".portfolio-video");

  videos.forEach((video) => {

    const button = video.parentElement.querySelector(".video-play");

    if (!button) return;

    button.addEventListener("click", async () => {

      try {

        if (video.paused) {

          await video.play();

          button.textContent = "Ⅱ";
          button.style.opacity = "0";

        } else {

          video.pause();

          button.textContent = "▶";
          button.style.opacity = "1";

        }

      } catch (error) {

        console.log("Video playback error:", error);

      }

    });


    video.addEventListener("click", () => {

      if (video.paused) {

        video.play();
        button.textContent = "Ⅱ";
        button.style.opacity = "0";

      } else {

        video.pause();
        button.textContent = "▶";
        button.style.opacity = "1";

      }

    });


    video.addEventListener("ended", () => {

      button.textContent = "▶";
      button.style.opacity = "1";

    });

  });


  /* =========================
     AUTOPLAY VIDEOS WHEN VISIBLE
  ========================= */

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        const video = entry.target;
        const button = video.parentElement.querySelector(".video-play");

        if (entry.isIntersecting) {

          video.play()
            .then(() => {

              if (button) {
                button.style.opacity = "0";
              }

            })
            .catch(() => {});

        } else {

          video.pause();

          if (button) {
            button.textContent = "▶";
            button.style.opacity = "1";
          }

        }

      });

    },
    {
      threshold: 0.55
    }
  );


  videos.forEach((video) => {
    observer.observe(video);
  });


  /* =========================
     REVEAL ANIMATION
  ========================= */

  const revealItems = document.querySelectorAll(
    ".work-card, .service, .section-heading, .contact-section"
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.08
    }
  );


  revealItems.forEach((item) => {

    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition =
      "opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1)";

    revealObserver.observe(item);

  });


  /* =========================
     ADD VISIBLE STYLE
  ========================= */

  const revealStyle = document.createElement("style");

  revealStyle.textContent = `
    .work-card.visible,
    .service.visible,
    .section-heading.visible,
    .contact-section.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;

  document.head.appendChild(revealStyle);


  /* =========================
     SMOOTH ANCHOR SCROLL
  ========================= */

  document.querySelectorAll('a[href^="#"]:not(.contact-btn)').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =========================
     CONTACT LINK HOVER
  ========================= */

  document.querySelectorAll(".contact-links a").forEach((link) => {

    link.addEventListener("mouseenter", () => {
      link.style.transform = "translateY(-3px)";
    });

    link.addEventListener("mouseleave", () => {
      link.style.transform = "translateY(0)";
    });

  });


  /* =========================
     PHONE TILT RESET
  ========================= */

  window.addEventListener("mouseleave", () => {

    if (phone && window.innerWidth > 850) {

      phone.style.transform =
        "translate3d(0,0,0) rotateX(0deg) rotateY(0deg)";

    }

  });

});
