// const button = document.getElementById('call-btn');
// const status = document.getElementById('status');
// const ringtone = document.getElementById('ringtone');

// button.addEventListener('click', () => {
//   ringtone.currentTime = 0; // rewind the sound
//   ringtone.play();
//   status.textContent = "Dialing... Jess 💔";
// });
const button = document.getElementById('call-btn');
const status = document.getElementById('status');
const ringtone = document.getElementById('ringtone');
const voicemail = document.getElementById('voicemail');

let missedCalls = 0;

const fakeNames = [
  "Jess 💔",
  "Toxic #4",
  "Regret.exe",
  "Your Last Hope",
  "404 Closure Not Found",
  "Mistake #7",
  "Ghosted Again 👻",
  "Blocked Contact",
  "Drama Llama 🦙",
  "Their New Partner"
];

const sadMessages = [
  "Still ringing...",
  "They declined the call.",
  "They laughed and hung up.",
  "They forwarded it to voicemail.",
  "You're still on read.",
  "They’ve moved on. Have you?",
  "You called again? Seriously?",
  "Ouch. Again?",
  "Stop. This is sad.",
  "Try therapy maybe?"
];

button.addEventListener('click', () => {
  ringtone.currentTime = 0;
  ringtone.play();

  // Show initial status
  status.innerHTML = `<strong>Calling...</strong><br>Ringing...`;

  setTimeout(() => {
    missedCalls++;
    
    // If it's the 15th call or more, go into blocked mode
    if (missedCalls >= 5) {
  button.disabled = true;
  button.style.display = 'none';
  document.body.classList.remove('glitchy');
status.classList.remove('glitch');

  // Clear status text
  status.innerHTML = "";

  // 🔇 Stop ringtone
  ringtone.pause();
  ringtone.currentTime = 0;

  // ⌛ Show temporary "Call Attended..." while voicemail plays
  status.innerHTML = `
    <strong style="color: lightgreen;">Call Attended...</strong><br>
    <em>(Listening...)</em>
  `;

  // ▶️ Play voicemail
  voicemail.currentTime = 0;
  voicemail.play();

  // After voicemail ends, show final message
  voicemail.onended = () => {
  status.innerHTML = `
    <strong style="font-size: 1.5rem; color: red;">They’ve blocked your number.</strong><br>
    <em>This is the end.</em>
  `;

  // Show the "Call Yourself" button
   const selfBtn = document.createElement('button');
selfBtn.id = 'call-yourself-btn';
selfBtn.textContent = '📞 Call Yourself';
status.appendChild(selfBtn);

selfBtn.addEventListener('click', () => {
  status.innerHTML = `
    <strong style="color: lightblue;">You answered.</strong><br>
    <em>Sometimes, closure starts within.</em>
  `;
  startWebcam();

  // ⏳ After 2 seconds, show certificate
  setTimeout(() => {
    generateCertificate();
  }, 2000);
});

};

    } else {
      const name = fakeNames[Math.floor(Math.random() * fakeNames.length)];
      const message = sadMessages[Math.floor(Math.random() * sadMessages.length)];

      status.innerHTML = `
        <strong>Calling ${name}</strong><br>
        ${message}<br>
        <span style="font-size: 1.1rem;">Missed Calls: ${missedCalls}</span>
      `;

      // Optional: Add glitch effect after 10 calls
      if (missedCalls >= 3) {
        document.body.classList.add('glitchy');
        status.classList.add('glitch');

        const warning = document.createElement('p');
        warning.textContent = "This is getting unhealthy...";
        warning.style.marginTop = '20px';
        warning.style.color = 'red';
        warning.style.fontWeight = 'bold';
        warning.classList.add('glitch');
        status.appendChild(warning);
      }
    }
  }, 1000); // Delay after ringing
});
// Other existing code...
function startWebcam() {
  const video = document.getElementById('selfCam');
  video.style.display = 'block';

  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((err) => {
      console.error("Camera access denied:", err);
      alert("We couldn't access your webcam. Try refreshing and allow camera access.");
    });
}
function generateCertificate() {
  const canvas = document.getElementById("regret-certificate");
  const ctx = canvas.getContext("2d");

  canvas.style.display = "block";
  document.getElementById("download-certificate").style.display = "inline-block";

  ctx.fillStyle = "#fffbe6";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#222";
  ctx.lineWidth = 6;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  ctx.fillStyle = "#222";
  ctx.font = "bold 24px serif";
  ctx.textAlign = "center";
  ctx.fillText("CERTIFICATE OF REGRET", canvas.width / 2, 60);

  ctx.font = "16px sans-serif";
  ctx.fillText("Outstanding Achievement in Emotional Damage", canvas.width / 2, 100);

  ctx.font = "20px cursive";
  ctx.fillText("Awarded to: You", canvas.width / 2, 170);

  ctx.font = "18px sans-serif";
  ctx.fillText("For: Calling your ex. Again.", canvas.width / 2, 220);

  const today = new Date().toLocaleDateString();
  ctx.font = "16px sans-serif";
  ctx.fillText("Date Issued: " + today, canvas.width / 2, 260);

  ctx.font = "italic 16px serif";
  ctx.fillText("Signed: Your Better Judgment", canvas.width / 2, 320);
}
document.getElementById("download-certificate").addEventListener("click", () => {
  const canvas = document.getElementById("regret-certificate");
  const link = document.createElement("a");
  link.download = "certificate_of_regret.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

// window.onload = () => {
//   generateCertificate(); // just to see if it appears on load
// };