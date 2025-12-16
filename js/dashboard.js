document.addEventListener("DOMContentLoaded", () => {

  const sidebar = document.getElementById("sidebar");
  const hamburger = document.getElementById("hamburger");
  const closeSidebar = document.getElementById("closeSidebar");
  const overlay = document.getElementById("overlay");
  const list = document.getElementById("notificationList");

  // Open sidebar
  hamburger.onclick = () => {
    sidebar.classList.add("open");
    overlay.classList.add("show");
  };

  // Close sidebar
  function closeNav() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  }

  closeSidebar.onclick = closeNav;
  overlay.onclick = closeNav;

  // Load notifications
  const notifications = JSON.parse(localStorage.getItem("notifications")) || [];

  if (notifications.length === 0) {
    list.innerHTML = "<li>No notifications yet</li>";
    return;
  }

  notifications.forEach(n => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${n.message}
      <small>${n.time}</small>
    `;
    list.appendChild(li);
  });

});
