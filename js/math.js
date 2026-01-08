function gcd(a, b) {
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}

function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}

function calculate() {
  const blocks = document.querySelectorAll(".clock");
  const clocks = [];

  blocks.forEach(block => {
    const discVal = block.querySelector(".disc-select").value;
    const offVal = block.querySelector(".off-duration").value;
    const offsetVal = block.querySelector(".offset").value || 0;

    const onDisplay = block.querySelector(".on-display");
    const periodDisplay = block.querySelector(".period-display");

    if (!discVal || !offVal) {
      if (onDisplay) onDisplay.textContent = "—";
      if (periodDisplay) periodDisplay.textContent = "—";
      return;
    }

    const on = BigInt(discVal);
    const off = BigInt(offVal);
    const period = on + off;
    const offset = BigInt(offsetVal);

    if (onDisplay) onDisplay.textContent = on.toString();
    if (periodDisplay) periodDisplay.textContent = period.toString();

    clocks.push({ on, period, offset });
  });

  if (clocks.length === 0) {
    document.getElementById("lcm-result").textContent = "--";
    document.getElementById("silent-result").textContent = "--";
    return;
  }

  // ---- LCM of periods (optional display, shows maximum repeat window) ----
  let periodLCM = clocks[0].period;
  for (let i = 1; i < clocks.length; i++) {
    periodLCM = lcm(periodLCM, clocks[i].period);
  }
  document.getElementById("lcm-result").textContent = periodLCM.toString();

  // ---- Find first simultaneous silence ----
  let silentTick = null;

  for (let t = 0n; t < periodLCM; t++) {
    const allSilent = clocks.every(c => ((t - c.offset + c.period) % c.period) >= c.on);
    if (allSilent) {
      silentTick = t;
      break; // stop at first tick
    }
  }

  document.getElementById("silent-result").textContent =
    silentTick !== null ? silentTick.toString() : "Never";
}

// Listen to any input change
document.addEventListener("input", calculate);
document.addEventListener("change", calculate);