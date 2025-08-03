const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Thiết lập kích thước canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", () => {
  resizeCanvas();
  updateAllFontSize();
});

// Mảng các câu chữ
const texts = [
  "Phạm Vũ Linh ♡",
  "đẹp trai nhất vũ trụ ",
  "học siêu giỏi",
  "trầm ôn, ga lăng",
  "nói ít, làm nhiều",
  "đáng yêu cực độ",
  "tài giỏi hiếm có",
  "tư duy sắc sảo",
  "sống chậm, nghĩ sâu",
  "hoàn hảo không kẽ nứt",
];

// Thêm vào đầu lớp TextObject
const colorList = ["#fff", "#ff69b4", "#00ffff", "#ff00ff"]; // trắng, hồng, xanh, tím nhạt
let colorIndex = 0;
let colorChangeFrame = 0;
let colorTransitionTime = 400; // Chuyển màu chậm hơn, mượt hơn
let currentColor = colorList[0];

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3)
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  const num = parseInt(hex, 16);
  return [num >> 16, (num >> 8) & 255, num & 255];
}
function rgbToHex([r, g, b]) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}
function interpolateColor(a, b, t) {
  const c1 = hexToRgb(a),
    c2 = hexToRgb(b);
  return rgbToHex([
    Math.round(c1[0] + (c2[0] - c1[0]) * t),
    Math.round(c1[1] + (c2[1] - c1[1]) * t),
    Math.round(c1[2] + (c2[2] - c1[2]) * t),
  ]);
}

// Thêm hàm tính toán font size
function calculateFontSize(baseSize) {
  const minWidth = 320; // Kích thước màn hình nhỏ nhất
  const maxWidth = 1920; // Kích thước màn hình lớn nhất
  const minFontSize = baseSize * 0.6; // Font size nhỏ nhất
  const maxFontSize = baseSize * 1.2; // Font size lớn nhất

  const width = canvas.width;
  const scale = (width - minWidth) / (maxWidth - minWidth);
  return (
    minFontSize + (maxFontSize - minFontSize) * Math.min(Math.max(scale, 0), 1)
  );
}

// Lớp cho Văn bản
class TextObject {
  constructor(text) {
    this.text = text;
    this.reset();
  }

  reset() {
    this.x = canvas.width * (0.1 + 0.1 * Math.random());
    this.y = -Math.random() * canvas.height;
    this.speedX = 0;
    this.speedY = Math.random() * 1 + 0.5;
    this.opacity = 0.5;
    this.baseFontSize =
      Math.random() * 0.025 * canvas.height + 0.018 * canvas.height;
    this.fontSize = calculateFontSize(this.baseFontSize);
  }

  update() {
    this.y += this.speedY;
    if (this.y > canvas.height) {
      this.reset();
      this.y = -this.fontSize;
    }
    // Cập nhật font size mỗi frame để đảm bảo responsive
    this.fontSize = calculateFontSize(this.baseFontSize);
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.fillStyle = currentColor;
    ctx.textBaseline = "top";
    // Sử dụng font size đã được tính toán
    ctx.font = `${this.fontSize}px 'Parisienne', cursive`;
    ctx.shadowBlur = 40;
    ctx.shadowColor = currentColor;
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}

// Lớp Heart (cập nhật lại)
class Heart {
  constructor() {
    this.reset();
    this.glowPhase = Math.random() * Math.PI * 2;
    this.glowSpeed = Math.random() * 0.08 + 0.04;
    this.fontSize =
      Math.random() * 0.025 * canvas.height + 0.012 * canvas.height;
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 10 + 5;
    this.speedX = (Math.random() - 0.5) * 1;
    this.speedY = (Math.random() - 0.5) * 1;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.01;
    this.glowPhase = Math.random() * Math.PI * 2;
    this.glowSpeed = Math.random() * 0.08 + 0.04;
    this.fontSize =
      Math.random() * 0.025 * canvas.height + 0.012 * canvas.height;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
    this.glowPhase += this.glowSpeed;
    if (this.x < -this.size) this.x = canvas.width + this.size;
    if (this.x > canvas.width + this.size) this.x = -this.size;
    if (this.y < -this.size) this.y = canvas.height + this.size;
    if (this.y > canvas.height + this.size) this.y = -this.size;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    // Hiệu ứng phát sáng nhấp nháy màu trắng
    const glow = 15 + Math.abs(Math.sin(this.glowPhase)) * 25;
    ctx.font = `${this.fontSize}px 'Dancing Script', cursive`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowBlur = glow;
    ctx.shadowColor = "#fff";
    ctx.fillStyle = "#fff";
    ctx.fillText("♡", 0, 0);
    ctx.restore();
  }
}

// Lớp cho Sao
class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2;
    this.opacity = Math.random();
    this.speed = Math.random() * 0.1 + 0.05; // Tốc độ nhấp nháy
    this.direction = Math.random() > 0.5 ? 1 : -1;
  }

  update() {
    this.opacity += this.speed * this.direction;
    if (this.opacity > 1 || this.opacity < 0) {
      this.direction *= -1;
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Tạo mảng đối tượng
const hearts = Array.from({ length: 70 }, () => new Heart()); // Tăng số lượng trái tim
// Giảm số lượng chữ xuất hiện trên màn hình
const textObjects = Array.from({ length: 3 }, (_, i) =>
  texts.map((text) => new TextObject(text))
).flat(); // Tạo gấp 3 lần số lượng câu chữ ban đầu
const stars = Array.from({ length: 200 }, () => new Star()); // Tăng số lượng ngôi sao

// Cập nhật hàm updateAllFontSize
function updateAllFontSize() {
  textObjects.forEach((obj) => {
    obj.baseFontSize =
      Math.random() * 0.025 * canvas.height + 0.018 * canvas.height;
    obj.fontSize = calculateFontSize(obj.baseFontSize);
  });
}

// Animation loop (cập nhật)
function animate() {
  ctx.fillStyle = "#000"; // Xóa nền hoàn toàn, không còn vệt mờ
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    star.update();
    star.draw();
  });

  hearts.forEach((heart) => {
    heart.update();
    heart.draw();
  });

  textObjects.forEach((textObj) => {
    textObj.update();
    textObj.draw();
  });

  // Chuyển màu mượt mà
  colorChangeFrame++;
  let t = colorChangeFrame / colorTransitionTime;
  let nextIndex = (colorIndex + 1) % colorList.length;
  currentColor = interpolateColor(
    colorList[colorIndex],
    colorList[nextIndex],
    t
  );

  if (colorChangeFrame >= colorTransitionTime) {
    colorIndex = nextIndex;
    colorChangeFrame = 0;
  }

  requestAnimationFrame(animate);
}

animate();
