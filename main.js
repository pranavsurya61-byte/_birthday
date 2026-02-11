// Start animation automatically when page loads
window.addEventListener("load", () => {
  animationTimeline();
});

// Enable audio on first user interaction (required by browsers)
let audioEnabled = false;
document.addEventListener('click', function enableAudio() {
  if (!audioEnabled) {
    audioEnabled = true;
    console.log('Audio enabled by user interaction');
  }
}, { once: true });

// Function to animate the date counting
function animateDateCounting() {
  const dayElement = document.getElementById("day");
  const monthElement = document.getElementById("month");
  const yearElement = document.getElementById("year");
  const ageElement = document.getElementById("age");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const targetDay = 12;
  const targetMonthIndex = 1; // February (0-indexed: 0=Jan, 1=Feb, 2=Mar)
  const targetYear = 2026;
  const birthYear = 2007;

  let currentDay = 1;
  let currentMonthIndex = 0;
  let currentYear = birthYear;
  let currentAge = 0;

  const interval = setInterval(() => {
    // Update day, month, year, and age in the DOM
    dayElement.textContent = currentDay;
    monthElement.textContent = months[currentMonthIndex];
    yearElement.textContent = currentYear;
    ageElement.textContent = currentAge;

    // Smoothly increment day, month, year, and age
    if (currentDay < targetDay) {
      currentDay++;
    } else if (currentMonthIndex < targetMonthIndex) {
      currentDay = targetDay; // Fix day
      currentMonthIndex++;
    } else if (currentYear < targetYear) {
      currentMonthIndex = targetMonthIndex; // Fix month
      currentYear++;
      currentAge++;
    } else {
      // Stop animation when target is reached
      clearInterval(interval);
    }
  }, 50); // Faster animation - 50ms instead of 250ms
}

// animation timeline
const animationTimeline = () => {
  // split chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  // timeline
  const tl = new TimelineMax();

  tl.to(".container", 0.6, {
    visibility: "visible",
  })
    .from(".one", 0.9, {
      opacity: 0,
      y: 10,
    })
    .from(".two", 0.9, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=3.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10,
      onStart: animateDateCounting // Start counting animation when this section appears
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10,
      },
      "+=3"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0,
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0,
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.8,
      {
        visibility: "visible",
      },
      0.05
    )
    .to(
      ".fake-btn",
      0.1,
      {
        backgroundColor: "rgb(127, 206, 248)",
      },
      "+=2"
    )
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150,
      },
      "+=1"
    )
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0,
      },
      "+=1.5"
    )
    .to(
      ".idea-5 span",
      0.7,
      {
        rotation: 90,
        x: 8,
      },
      "+=1.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0,
      },
      "+=2"
    )
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut,
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut,
      },
      0.2,
      "+=1.5"
    )
    .from(".video-section", 1, {
      opacity: 0,
      scale: 0.8,
      ease: Expo.easeOut,
      onStart: function() {
        // Auto-play the video with audio when it appears
        const video = document.querySelector(".birthday-video");
        if (video) {
          video.muted = false; // Ensure audio is not muted
          video.play().catch(function(error) {
            console.log("Autoplay with audio failed, trying again:", error);
            // If autoplay fails, try again
            video.play();
          });
        }
        
        // After 18 seconds, fade out video and show final message
        setTimeout(function() {
          gsap.to(".video-section", 0.8, {
            opacity: 0,
            y: 30,
            onComplete: function() {
              // Show final message after video fades out
              gsap.staggerFrom(".nine p", 1, ideaTextTrans, 1.2);
              gsap.to(".last-smile", 0.5, {
                rotation: 90,
                delay: 3
              });
            }
          });
        }, 18000); // 18 seconds
      }
    })
    .to(".video-section", 1, {
      opacity: 1,
    });

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
  });
};
