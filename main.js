const isMobile = /Android|Iphone|Ipad|Ipod/i.test(navigator.userAgent);

const blocked_alert = document.getElementById("blocked");
const cps_main = document.getElementById("cps");

document.addEventListener("contextmenu", e => e.preventDefault());

    let totalClicks = 0;
    let clicksThisSecond = 0;
    let startTime = null;
    let rightClick = false;

    const button = document.getElementById("clickButton");
    const result = document.getElementById("result");

    button.addEventListener("contextmenu", e => e.preventDefault());

    button.addEventListener("mousedown", (e) => {
        if (!startTime) startTime = Date.now();

        // CLICK IZQUIERDO
        if (e.button === 0) {
            totalClicks++;
            clicksThisSecond++;
        }

        // CLICK DERECHO
        if (e.button === 2) {
        const elapsed = (Date.now() - startTime) / 1000;
        const cps = totalClicks / elapsed;

        console.log("CPS real:", cps.toFixed(2));

        if (cps > 3 && !rightClick) {
            let enable = confirm("¿Quieres habilitar el clic derecho?");
            if (enable) {
                rightClick = true;
                totalClicks++;
                clicksThisSecond++;
            }
        } else if (rightClick) {
            totalClicks++;
        clicksThisSecond++;
        }
    }
    });

// CPS visual (por segundo)
setInterval(() => {
    result.textContent = `CPS: ${clicksThisSecond}`;
  
    const cps = Math.min(clicksThisSecond, 10);
    const t = cps / 10; // 0 → 1
  
    // INTERPOLACIÓN DE COLOR (RGB)
    const rText = Math.round(255 * (1 - t) + 168 * t);
    const gText = Math.round(255 * (1 - t) + 85 * t);
    const bText = Math.round(255 * (1 - t) + 247 * t);
  
    const rBg = Math.round(17 * (1 - t) + 26 * t);
    const gBg = Math.round(17 * (1 - t) + 15 * t);
    const bBg = Math.round(17 * (1 - t) + 46 * t);
  
    const rGlow = Math.round(0 * (1 - t) + 168 * t);
    const gGlow = Math.round(255 * (1 - t) + 85 * t);
    const bGlow = Math.round(153 * (1 - t) + 247 * t);
  
    result.style.color = `rgb(${rText}, ${gText}, ${bText})`;
    document.body.style.backgroundColor = `rgb(${rBg}, ${gBg}, ${bBg})`;
  
    button.style.backgroundColor = "#00ff99";
    button.style.boxShadow = `0 0 ${10 + cps * 2}px rgb(${rGlow}, ${gGlow}, ${bGlow})`;

    const rBtn = Math.round(0 * (1 - t) + 168 * t);
    const gBtn = Math.round(255 * (1 - t) + 85 * t);
    const bBtn = Math.round(153 * (1 - t) + 247 * t);

    button.style.backgroundColor = `rgb(${rBtn}, ${gBtn}, ${bBtn})`;

    // GLOW ACOMPAÑANTE
    button.style.boxShadow = `0 0 ${10 + cps * 2}px rgb(${rBtn}, ${gBtn}, ${bBtn})`;
  
    clicksThisSecond = 0;
  }, 1000);