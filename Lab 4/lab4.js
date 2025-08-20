const container = document.getElementById("container");

for (let i = 1; i <= 100; i++) {
  const box = document.createElement("div");
  box.classList.add("box");

  // Add class based on odd or even
  if (i % 2 === 0) {
    box.classList.add("even");
  } else {
    box.classList.add("odd");
  }

  box.textContent = `Box ${i}`;
  container.appendChild(box);
}

