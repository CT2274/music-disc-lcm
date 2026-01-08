
    let timeLeft = 5; // seconds
    const timerEl = document.getElementById("timer");

    const countdown = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      
      if (timeLeft <= 0) {
        clearInterval(countdown);
        window.location.href = "../index.html"; // change to your target page
      }
    }, 1000);
