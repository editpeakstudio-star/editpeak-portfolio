document.addEventListener("DOMContentLoaded", () => {
  const splash = document.createElement("div");
  splash.id = "welcome-splash";

  splash.innerHTML = `
    <div class="reveal-wrap">
      <div class="reveal-text">EDITPEAK</div>
      <div class="reveal-sword">
        <div class="blade"></div>
        <div class="guard"></div>
        <div class="handle"></div>
      </div>
    </div>
  `;

  document.body.prepend(splash);

  setTimeout(() => splash.classList.add("hide"), 2500);
  setTimeout(() => splash.remove(), 3200);
});
