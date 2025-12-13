document.addEventListener("DOMContentLoaded", () => {

  const sidebar = document.getElementById("sidebar");
  const hamburger = document.getElementById("hamburger");
  const closeSidebar = document.getElementById("closeSidebar");
  const overlay = document.getElementById("overlay");
  const list = document.getElementById("notificationList");

  /* =========================
     OPEN SIDEBAR (Animated)
  ========================== */
  hamburger.onclick = () => {
    sidebar.classList.add("open", "slide-in");
    overlay.classList.add("show", "fade-in");
  };

  /* =========================
     CLOSE SIDEBAR (Animated)
  ========================== */
  function closeNav() {
    sidebar.classList.remove("slide-in");
    sidebar.classList.add("slide-out");

    overlay.classList.remove("fade-in");
    overlay.classList.add("fade-out");

    setTimeout(() => {
      sidebar.classList.remove("open", "slide-out");
      overlay.classList.remove("show", "fade-out");
    }, 300);
  }

  closeSidebar.onclick = closeNav;
  overlay.onclick = closeNav;

  /* =========================
     LOAD NOTIFICATIONS
  ========================== */
  const notifications =
    JSON.parse(localStorage.getItem("notifications")) || [];

  if (notifications.length === 0) {
    list.innerHTML = "<li class='empty'>No notifications yet</li>";
    return;
  }

  /* =========================
     STAGGER ANIMATION
  ========================== */
  notifications.forEach((n, index) => {
    const li = document.createElement("li");
    li.classList.add("notify-item");
    li.style.animationDelay = `${index * 0.15}s`;

    li.innerHTML = `
      <span>${n.message}</span>
      <small>${n.time}</small>
    `;

    list.appendChild(li);
  });

});
