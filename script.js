document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const loginContainer = document.getElementById("loginContainer");
  const mainContent = document.getElementById("mainContent");
  const passwordInput = document.getElementById("passwordInput");
  const loginButton = document.getElementById("loginButton");
  const loginMessage = document.getElementById("loginMessage");
  const successAnimation = document.getElementById("successAnimation");
  const continueButton = document.getElementById("continueButton");
  const gallery = document.getElementById("gallery");
  const heartsContainer = document.getElementById("heartsContainer");
  const imageModal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeModal = document.getElementById("closeModal");
  const audioControl = document.getElementById("audioControl");
  const audioIcon = document.getElementById("audioIcon");
  // const backgroundMusic = document.getElementById("backgroundMusic");
  const wishes = document.getElementById("wishes");
  const wish1 = document.getElementById("wish1");
  const wish2 = document.getElementById("wish2");
  const wish3 = document.getElementById("wish3");
  const typingLoader = document.getElementById("typingLoader");

  // Gallery images
  const images = [
    {
      url: "./uploads/z6387054837121_5fd5ed3a129986d4ce29b7db7287da78.jpg",
      caption: "Vẻ đẹp tự nhiên như những bông hoa",
    },
    {
      url: "./uploads/z6387054837146_cb81b03464f7094f6ee2377bed0f7aaa.jpg",
      caption: "Tỏa sáng trong mọi khoảnh khắc",
    },
    {
      url: "./uploads/z6387054837147_7f9932a17699a227293afb3c57c29868.jpg",
      caption: "Nụ cười rạng rỡ như ánh nắng",
    },
  ];

  // Shuffle gallery images
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Load gallery images with random appearance
  function loadGallery() {
    // Clear existing gallery
    gallery.innerHTML = "";

    // Shuffle the images array
    const shuffledImages = shuffleArray([...images]);

    // Create and append gallery items
    shuffledImages.forEach((image, index) => {
      const galleryItem = document.createElement("div");
      galleryItem.className = "gallery-item";
      galleryItem.innerHTML = `
                    <img src="${image.url}" alt="Beautiful moments ${
        index + 1
      }" class="gallery-image">
                    <div class="gallery-overlay">
                        <h3>${image.caption}</h3>
                    </div>
                `;

      // Open modal on click
      galleryItem.addEventListener("click", function () {
        modalImage.src = image.url;
        imageModal.style.display = "flex";
      });

      gallery.appendChild(galleryItem);

      // Randomly show gallery items with delay
      setTimeout(() => {
        galleryItem.classList.add("visible");
      }, 200 + Math.random() * 2000);
    });
  }

  // Text typing effect for wishes
  function typeWishes() {
    typingLoader.style.display = "inline-block";

    // Show first wish after 1 second
    setTimeout(() => {
      wish1.classList.add("visible");

      // Show second wish after 3 seconds
      setTimeout(() => {
        wish2.classList.add("visible");

        // Show third wish after 3 more seconds
        setTimeout(() => {
          wish3.classList.add("visible");
          typingLoader.style.display = "none";
        }, 3000);
      }, 3000);
    }, 1000);
  }

  // Password validation
  loginButton.addEventListener("click", checkPassword);
  passwordInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      checkPassword();
    }
  });

  function checkPassword() {
    const password = passwordInput.value.trim();

    if (password === "anh Khao" || password === "Anh Khao") {
      // Correct password
      successAnimation.classList.add("show");
    } else if (password === "anh" || password === "Anh") {
      // Close but not exact
      loginMessage.textContent = "Người đẹp đã nhập gần đúng rồi, cố lên!";
      loginMessage.style.color = "#e83e8c";
      passwordInput.focus();
    } else {
      // Wrong password
      loginMessage.textContent =
        "Sai rồi, người đẹp gọi người tạo ra trang web là gì không nhớ nà.";
      loginMessage.style.color = "#e83e8c";
      passwordInput.focus();
    }
  }

  // Continue after success animation
  continueButton.addEventListener("click", function () {
    successAnimation.classList.remove("show");
    loginContainer.style.display = "none";
    mainContent.classList.remove("hidden");
    createFlowers(); // Thêm dòng này

    // // Play background music
    // backgroundMusic.volume = 0.5;
    // backgroundMusic.play().catch((error) => {
    //   console.log("Auto-play prevented by browser");
    // });

    // Create hearts animation
    createHeartsAnimation();

    // Load gallery with random appearance
    loadGallery();

    // Start typing effect for wishes
    typeWishes();

    // Check for IntersectionObserver support
    if ("IntersectionObserver" in window) {
      // Create observer for lazy loading and animations
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // If wishes section is in view, start typing effect
              if (
                entry.target === wishes &&
                !wish1.classList.contains("visible")
              ) {
                typeWishes();
              }
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      // Observe wishes section
      observer.observe(wishes);
    }
  });

  // // Heart animation
  function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    heart.style.fontSize = Math.random() * 15 + 10 + "px";
    heartsContainer.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }

  function createHeartsAnimation() {
    setInterval(createHeart, 500);
  }

  // Modal handling
  closeModal.addEventListener("click", function () {
    imageModal.style.display = "none";
  });

  imageModal.addEventListener("click", function (e) {
    if (e.target === imageModal) {
      imageModal.style.display = "none";
    }
  });

  // // Audio control
  // audioControl.addEventListener("click", function () {
  //   if (backgroundMusic.paused) {
  //     backgroundMusic.play();
  //     audioIcon.textContent = "🔊";
  //   } else {
  //     backgroundMusic.pause();
  //     audioIcon.textContent = "🔇";
  //   }
  // });

  // Add interactive effects to wishes
  wishes.addEventListener("mouseover", function (event) {
    createHeartAt(event.pageX, event.pageY);
  });

  // Touch events for mobile
  wishes.addEventListener("touchstart", function (event) {
    const touch = event.touches[0];
    createHeartAt(touch.pageX, touch.pageY);
  });

  function createHeartAt(x, y) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤";
    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heartsContainer.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }

  // Reset image appearance on window resize for better mobile experience
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      // Get all gallery items
      const galleryItems = document.querySelectorAll(".gallery-item");

      // Remove visible class
      galleryItems.forEach((item) => {
        item.classList.remove("visible");
      });

      // Re-add visible class with delay
      galleryItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("visible");
        }, 100 * (index + 1));
      });
    }, 300);
  });

  // Confetti effect when password is correct
  function startConfetti() {
    const confettiContainer = document.createElement("div");
    confettiContainer.className = "confetti-container";
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.animationDelay = Math.random() * 5 + "s";
      confetti.style.backgroundColor = getRandomColor();
      confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
      confettiContainer.remove();
    }, 10000);
  }

  function getRandomColor() {
    const colors = [
      "#ff7979",
      "#f6e58d",
      "#badc58",
      "#dff9fb",
      "#f9ca24",
      "#f0932b",
      "#eb4d4b",
      "#6ab04c",
      "#e056fd",
      "#686de0",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Add flower petals animation
  function createFlowerPetals() {
    const petalsContainer = document.createElement("div");
    petalsContainer.className = "petals-container";
    document.body.appendChild(petalsContainer);

    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const petal = document.createElement("div");
        petal.className = "petal";
        petal.style.left = Math.random() * 100 + "vw";
        petal.style.animationDuration = Math.random() * 5 + 10 + "s";
        petal.style.animationDelay = Math.random() * 5 + "s";
        petalsContainer.appendChild(petal);
      }, i * 300);
    }
  }

  // Update success animation to include confetti
  continueButton.addEventListener("click", function () {
    startConfetti();
    createFlowerPetals();
  });

  // Add zoom effect to images when hovering
  document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("mouseover", function (e) {
      if (e.target.classList.contains("gallery-image")) {
        e.target.classList.add("hover-effect");
      }
    });

    document.body.addEventListener("mouseout", function (e) {
      if (e.target.classList.contains("gallery-image")) {
        e.target.classList.remove("hover-effect");
      }
    });
  });

  // Add special effect when clicking on wishes
  const wishItems = [wish1, wish2, wish3];
  wishItems.forEach((wish) => {
    wish.addEventListener("click", function () {
      // Create sparkle effect
      createSparkleEffect(wish);

      // Add pulse animation
      wish.classList.add("pulse");
      setTimeout(() => {
        wish.classList.remove("pulse");
      }, 1000);
    });
  });

  function createSparkleEffect(element) {
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = rect.left + Math.random() * rect.width + "px";
      sparkle.style.top = rect.top + Math.random() * rect.height + "px";
      sparkle.style.animationDuration = Math.random() * 1 + 0.5 + "s";
      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1500);
    }
  }

  // Add responsive behavior for different screen sizes
  function adjustLayoutForScreenSize() {
    const isMobile = window.innerWidth < 768;
    const gallery = document.getElementById("gallery");

    if (isMobile) {
      gallery.classList.add("mobile-gallery");
    } else {
      gallery.classList.remove("mobile-gallery");
    }
  }

  // Call once on load and add event listener for resize
  window.addEventListener("load", adjustLayoutForScreenSize);
  window.addEventListener("resize", adjustLayoutForScreenSize);

  // Add special message when user has been on the page for a while
  setTimeout(() => {
    const specialMessage = document.createElement("div");
    specialMessage.className = "special-message";
    specialMessage.innerHTML = `
                <div class="special-message-content">
                    <h3>Cảm ơn bạn đã dành thời gian!</h3>
                    <p>Chúc bạn có một ngày 8/3 thật đặc biệt và tràn đầy niềm vui ❤️</p>
                    <button id="closeSpecialMessage">Đóng</button>
                </div>
            `;
    document.body.appendChild(specialMessage);

    setTimeout(() => {
      specialMessage.classList.add("show");
    }, 500);

    document
      .getElementById("closeSpecialMessage")
      .addEventListener("click", function () {
        specialMessage.classList.remove("show");
        setTimeout(() => {
          specialMessage.remove();
        }, 1000);
      });
  }, 60000); // Show after 1 minute
});

// Flower emojis array
const flowerEmojis = ["🌸", "🌹", "🌺", "🌷", "🌻", "🌼", "💐", "🌿", "🍀"];

// Create falling flowers animation
function createFlowers() {
  setInterval(() => {
    const flower = document.createElement("div");
    flower.className = "flower";
    flower.textContent =
      flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = Math.random() * 5 + 5 + "s"; // 5-10s
    flowersContainer.appendChild(flower);

    // Remove flower after animation completes
    setTimeout(() => {
      flower.remove();
    }, 10000);
  }, 300);
}

let player;
let isPlaying = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "0", // Ẩn video
    width: "0",
    videoId: "5pLNfVb_6JQ", // ID của video YouTube
    playerVars: {
      autoplay: 1, // Tự động phát
      mute: 1, // Tắt tiếng để tránh bị chặn
      loop: 1,
      playlist: "5pLNfVb_6JQ",
    },
    events: {
      onReady: function (event) {
        event.target.setVolume(50); // Giảm âm lượng (0 - 100)
        event.target.unMute(); // Bật lại âm thanh sau khi trang đã load
      },
    },
  });
}

document.getElementById("audioControl").addEventListener("click", function () {
  if (isPlaying) {
    player.pauseVideo();
    this.textContent = "🔇";
  } else {
    player.playVideo();
    this.textContent = "🔊";
  }
  isPlaying = !isPlaying;
});
