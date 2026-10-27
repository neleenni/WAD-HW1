// Postituste laadimine
const postsContainer = document.getElementById("posts");

function renderPosts(posts) {
  postsContainer.innerHTML = "";
  posts.forEach(p => {
    const date = new Date(p.date).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric"
    });
    postsContainer.innerHTML += `
      <div class="post">
        <div class="post-header">
          <img src="${p.authorPic}" alt="${p.author}" class="author-pic">
          <span class="post-author">${p.author}</span>
          <span class="post-date">${date}</span>
        </div>
        <div class="post-content">
          ${p.image ? `<img src="${p.image}" alt="post image" class="post-image">` : ""}
          <p class="post-text">${p.text}</p>
        </div>
        <div class="post-footer">
          <button class="like-btn">🩷</button>
        </div>
      </div>`;
  });
}

if (postsContainer) {
  // ÜLESANNE 4: andmed internetist (kommenteerib välja, kui läheb üle ülesandele 5)

  /*fetch("https://gist.githubusercontent.com/neleenni/ddb50858dfce75c6f11f23ab81cdfbca/raw/bddc1edaa03c1e3fe383127994f68bdab68f3464/posts.json") //puudu
    .then(res => res.json())
    .then(renderPosts)
    .catch(err => console.error("Fetch failed:", err));
  
  }*/
  // ÜLESANNE 5: andmed JSON-failist
  fetch("jasonderulo.json")
    .then(res => res.json())
    .then(renderPosts)
    .catch(err => console.error("Fetch failed:", err));
}

// ---- Profiili dropdown ----
const profilePic = document.getElementById("profile-pic");
const dropdown = document.getElementById("dropdown");

if (profilePic && dropdown) {
  profilePic.addEventListener("click", () => dropdown.classList.toggle("show"));
}