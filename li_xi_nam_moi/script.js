// SwiperJS slider configuration
new Swiper(".card-wrapper", {
  loop: true,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

// số slider trên khung nhìn ứng với pc hay moblie
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

const buttons = document.querySelectorAll(".badge");
const overlays = document.querySelectorAll(".overlay");

// Lắng nghe sự kiện click trên từng nút
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Ẩn tất cả overlay trước khi hiển thị một overlay ngẫu nhiên
    overlays.forEach((overlay) => {
      overlay.style.display = "none";
    });

    // Chọn ngẫu nhiên một overlay
    const randomIndex = Math.floor(Math.random() * overlays.length);
    const selectedOverlay = overlays[randomIndex];
    selectedOverlay.style.display = "flex"; // Hiển thị overlay ngẫu nhiên

    // Kích hoạt hiệu ứng Typewriter cho overlay ngẫu nhiên
    const textElement = selectedOverlay.querySelector(".overlay-text");
    const imgElement = selectedOverlay.querySelector(".img-overlay");

    if (textElement) {
      const content = textElement.textContent.trim(); // Lấy nội dung từ thẻ div bên trong
      textElement.textContent = ""; // Xóa nội dung ban đầu
      let i = 0;

      function typeEffect() {
        if (i < content.length) {
          textElement.textContent += content[i];
          i++;
          setTimeout(typeEffect, 50); // Điều chỉnh tốc độ gõ chữ (50ms)
        } else {
          // Hiển thị hình ảnh sau khi hiệu ứng Typewriter hoàn tất
          if (imgElement) {
            imgElement.style.display = "block";
          }
        }
      }
      typeEffect();

      // Đảm bảo hình ảnh ẩn đi trước khi hiệu ứng bắt đầu
      if (imgElement) {
        imgElement.style.display = "none";
      }
    }
  });
});

// Lắng nghe sự kiện click trên nút "Đóng"
document.querySelectorAll(".close-overlay").forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    closeButton.closest(".overlay").style.display = "none"; // Ẩn overlay tương ứng
  });
});
