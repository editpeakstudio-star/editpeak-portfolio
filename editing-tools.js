(() => {
  const marquee = document.querySelector(".marquee-section");
  if (!marquee || document.querySelector(".editing-tools")) return;

  const section = document.createElement("section");
  section.className = "editing-tools";

  section.innerHTML = `
    <div class="editing-tools-head">
      <div class="editing-tools-kicker">
        <i></i>
        OUR TOOLKIT
      </div>

      <h2>Built with <em>powerful tools.</em></h2>

      <p>
        Professional editing, motion design, color grading and AI-powered
        workflows for high-quality content.
      </p>
    </div>

    <div class="tools-grid">
      <div class="tool-card">
        <div class="tool-icon">Pr</div>
        <h3>Premiere Pro</h3>
        <p>Professional video editing</p>
        <span class="tool-number">01</span>
      </div>

      <div class="tool-card">
        <div class="tool-icon">Ae</div>
        <h3>After Effects</h3>
        <p>Motion graphics & VFX</p>
        <span class="tool-number">02</span>
      </div>

      <div class="tool-card">
        <div class="tool-icon">AM</div>
        <h3>Alight Motion</h3>
        <p>Mobile motion design</p>
        <span class="tool-number">03</span>
      </div>

      <div class="tool-card">
        <div class="tool-icon">CC</div>
        <h3>CapCut</h3>
        <p>Fast social content editing</p>
        <span class="tool-number">04</span>
      </div>

      <div class="tool-card">
        <div class="tool-icon">DR</div>
        <h3>DaVinci Resolve</h3>
        <p>Color grading & finishing</p>
        <span class="tool-number">05</span>
      </div>

      <div class="tool-card">
        <div class="tool-icon">AI</div>
        <h3>AI Tools</h3>
        <p>AI-powered creative workflow</p>
        <span class="tool-number">06</span>
      </div>
    </div>
  `;

  marquee.parentNode.insertBefore(section, marquee);
})();
