// Lấy phần tử canvas
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

// Các biến cố định cho hình trái tim pixel
const size = 512;
const pixel = 2.6;
const radius = 128;
const centerY = 180;
const circleLeftX = 152;
const circleRightX = 360;
const diamondCenterX = 256;
const diamondCenterY = 284;

// Ảnh nền nếu người dùng chọn sử dụng
let backgroundImage = new Image();
backgroundImage.src = "./assets/loves.png";
backgroundImage.onload = draw;

document.getElementById("useBackground").addEventListener("change", draw);

/* ---- HÀM VẼ HÌNH TRÁI TIM PIXEL ---- */
function drawHeartBackground(color) {
  ctx.clearRect(0, 0, size, size);

  const useBg = document.getElementById("useBackground").checked;
  const bgColor = document.getElementById("bgColorPicker").value;

  // Nếu không dùng ảnh nền hiển thị màu đã chọn
  if (!useBg) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);
  }
  // Nếu dùng ảnh nền, vẽ ảnh lên canvas
  else if (backgroundImage.complete) {
    ctx.drawImage(backgroundImage, 0, 0, size, size);
  }

  for (let y = 0; y < size; y += pixel) {
    for (let x = 0; x < size; x += pixel) {
      const cx = x + pixel / 2;
      const cy = y + pixel / 2;

      let inCircleLeft =
        Math.pow(cx - circleLeftX, 2) + Math.pow(cy - centerY, 2) <=
        radius * radius;
      let inCircleRight =
        Math.pow(cx - circleRightX, 2) + Math.pow(cy - centerY, 2) <=
        radius * radius;

      let dx = cx - diamondCenterX;
      let dy = cy - diamondCenterY;
      let rotatedX = dx * Math.cos(-Math.PI / 4) - dy * Math.sin(-Math.PI / 4);
      let rotatedY = dx * Math.sin(-Math.PI / 4) + dy * Math.cos(-Math.PI / 4);
      let inDiamond = Math.abs(rotatedX) < 128 && Math.abs(rotatedY) < 128;

      if (inCircleLeft || inCircleRight || inDiamond) {
        ctx.fillStyle = Math.random() < 0.5 ? color : "rgba(255,255,255,0)";
        ctx.fillRect(x, y, pixel, pixel);
      }
    }
  }
}

/* ---- HÀM VẼ QR CODE LÊN TRÁI TIM ---- */
function drawQRCode(text, color) {
  const qr = qrcode(0, "M");
  qr.addData(text);
  qr.make();

  const moduleCount = qr.getModuleCount();
  const qrSize = 180;
  const scale = qrSize / moduleCount;
  const offsetX = (canvas.width - qrSize) / 2;
  const offsetY = (canvas.height - qrSize) / 2 - 32;

  const bgColor = document.getElementById("bgColorPicker").value;
  ctx.fillStyle = bgColor;
  ctx.fillRect(offsetX, offsetY, qrSize, qrSize);

  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (qr.isDark(row, col)) {
        ctx.fillStyle = color;
        ctx.fillRect(
          offsetX + col * scale,
          offsetY + row * scale,
          scale,
          scale
        );
      }
    }
  }
}

/* ---- HÀM TỔNG GỌI VẼ TRÁI TIM + QR CODE ---- */
function draw(callback) {
  const text = document.getElementById("qrInput").value.trim();
  const color = document.getElementById("colorPicker").value;
  const useBg = document.getElementById("useBackground").checked;
  const errorText = document.getElementById("errorText");

  // Hiển thị thông báo khi chưa nhập nội dung
  if (!text) {
    errorText.style.display = "block";
    return;
  } else {
    errorText.style.display = "none";
  }

  // Chờ vẽ ảnh nền
  if (useBg && !backgroundImage.complete) {
    backgroundImage.onload = () => {
      drawHeartBackground(color);
      if (text) drawQRCode(text, color);
      if (callback) callback();
      document.getElementById("downloadBtn").style.display = "inline-block";
    };
    return;
  }

  // Vẽ trái tim + QR code
  drawHeartBackground(color);
  if (text) drawQRCode(text, color);
  if (callback) callback();

  document.getElementById("downloadBtn").style.display = "inline-block";
}

/* ---- HÀM TẢI ẢNH TỪ CANVAS ---- */
function downloadCanvas() {
  const text = document.getElementById("qrInput").value.trim();
  const filename = text ? `qr.png` : "pixel-heart-qr.png";

  draw(() => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

/* ---- KHI LOAD TRANG ---- */
window.onload = () => {
  const text = document.getElementById("qrInput").value.trim();

  if (text) {
    draw();
    document.getElementById("downloadBtn").style.display = "inline-block";
  } else {
    document.getElementById("errorText").style.display = "none";
    document.getElementById("downloadBtn").style.display = "none";
  }
};
