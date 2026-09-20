(function () {
  const API = "https://player.vimeo.com/api/player.js";

  function loadVimeo(done) {
    if (window.Vimeo) return done();

    const script = document.createElement("script");
    script.src = API;
    script.onload = done;
    document.head.appendChild(script);
  }

  function formatTime(seconds) {
    seconds = Math.floor(seconds || 0);
    const m = Math.floor(seconds / 60);
    const s = String(seconds % 60).padStart(2, "0");
    return `${String(m).padStart(2, "0")}:${s}`;
  }

  function setupPlayers() {
    document.querySelectorAll('iframe[src*="player.vimeo.com"]').forEach((iframe) => {
      if (iframe.dataset.epReady) return;
      iframe.dataset.epReady = "1";

      const wrapper = document.createElement("div");
      wrapper.className = "ep-video-player";

      iframe.parentNode.insertBefore(wrapper, iframe);
      wrapper.appendChild(iframe);

      const center = document.createElement("button");
      center.className = "ep-center-play";
      center.innerHTML = "▶";
      center.setAttribute("aria-label", "Play video");
      wrapper.appendChild(center);

      const tapArea = document.createElement("div");
      tapArea.className = "ep-video-tap";
      wrapper.appendChild(tapArea);

      const controls = document.createElement("div");
      controls.className = "ep-controls";

      controls.innerHTML = `
        <button class="ep-btn ep-play">▶</button>
        <button class="ep-btn ep-back">↶ 10</button>
        <button class="ep-btn ep-forward">10 ↷</button>
        <div class="ep-progress">
          <div class="ep-progress-fill"></div>
        </div>
        <span class="ep-time">00:00 / 00:00</span>
        <button class="ep-btn ep-mute">🔊</button>
        <input class="ep-volume" type="range" min="0" max="1" step="0.05" value="1">
        <select class="ep-speed">
          <option value="0.5">0.5×</option>
          <option value="0.75">0.75×</option>
          <option value="1" selected>1×</option>
          <option value="1.25">1.25×</option>
          <option value="1.5">1.5×</option>
          <option value="2">2×</option>
        </select>
        <button class="ep-btn ep-full">⛶</button>
      `;

      wrapper.appendChild(controls);

      const player = new Vimeo.Player(iframe);

      const playBtn = controls.querySelector(".ep-play");
      const backBtn = controls.querySelector(".ep-back");
      const forwardBtn = controls.querySelector(".ep-forward");
      const muteBtn = controls.querySelector(".ep-mute");
      const volume = controls.querySelector(".ep-volume");
      const speed = controls.querySelector(".ep-speed");
      const fullBtn = controls.querySelector(".ep-full");
      const progress = controls.querySelector(".ep-progress");
      const fill = controls.querySelector(".ep-progress-fill");
      const time = controls.querySelector(".ep-time");

      let hideTimer;

      function showCenterTemporarily() {
        clearTimeout(hideTimer);

        center.classList.remove("hidden");

        hideTimer = setTimeout(async () => {
          const paused = await player.getPaused();

          if (!paused) {
            center.classList.add("hidden");
          }
        }, 1000);
      }

      function showCenterPermanent() {
        clearTimeout(hideTimer);
        center.classList.remove("hidden");
      }

      function hideCenter() {
        clearTimeout(hideTimer);
        center.classList.add("hidden");
      }

      center.addEventListener("click", async (e) => {
        e.stopPropagation();

        const paused = await player.getPaused();

        if (paused) {
          await player.play();
        } else {
          await player.pause();
        }
      });

      tapArea.addEventListener("click", () => {
        player.getPaused().then((paused) => {
          if (!paused) showCenterTemporarily();
        });
      });

      playBtn.addEventListener("click", async () => {
        const paused = await player.getPaused();

        if (paused) {
          await player.play();
        } else {
          await player.pause();
        }
      });

      backBtn.addEventListener("click", async () => {
        const current = await player.getCurrentTime();
        await player.setCurrentTime(Math.max(0, current - 10));
      });

      forwardBtn.addEventListener("click", async () => {
        const current = await player.getCurrentTime();
        const duration = await player.getDuration();
        await player.setCurrentTime(Math.min(duration, current + 10));
      });

      muteBtn.addEventListener("click", async () => {
        const muted = await player.getMuted();
        await player.setMuted(!muted);
      });

      volume.addEventListener("input", async () => {
        await player.setVolume(Number(volume.value));
        await player.setMuted(false);
      });

      speed.addEventListener("change", async () => {
        await player.setPlaybackRate(Number(speed.value));
      });

      progress.addEventListener("click", async (e) => {
        const rect = progress.getBoundingClientRect();
        const percent = Math.max(
          0,
          Math.min(1, (e.clientX - rect.left) / rect.width)
        );

        const duration = await player.getDuration();
        await player.setCurrentTime(duration * percent);
      });

      fullBtn.addEventListener("click", () => {
        player.requestFullscreen();
      });

      player.on("play", () => {
        playBtn.textContent = "⏸";
        center.innerHTML = "";
        center.classList.add("is-playing");
        hideCenter();
      });

      player.on("pause", () => {
        playBtn.textContent = "▶";
        center.innerHTML = "";
        center.classList.remove("is-playing");
        showCenterPermanent();
      });

      player.on("ended", () => {
        playBtn.textContent = "▶";
        center.innerHTML = "";
        center.classList.remove("is-playing");
        showCenterPermanent();
      });

      player.on("timeupdate", (data) => {
        if (!data.duration) return;

        fill.style.width = `${(data.seconds / data.duration) * 100}%`;
        time.textContent =
          `${formatTime(data.seconds)} / ${formatTime(data.duration)}`;
      });

      player.on("volumechange", (data) => {
        volume.value = data.volume;

        if (data.muted || data.volume === 0) {
          muteBtn.textContent = "🔇";
        } else {
          muteBtn.textContent = "🔊";
        }
      });
    });
  }

  loadVimeo(() => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setupPlayers);
    } else {
      setupPlayers();
    }
  });
})();
