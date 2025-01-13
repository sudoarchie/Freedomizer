// Inject disruptive scroll behavior based on user-defined websites
chrome.storage.sync.get("websites", (data) => {
  const websites = data.websites || [];
  const currentURL = window.location.href;
  if (websites.some((site) => currentURL.includes(site))) {
    // Block scroll down and disrupt horizontal scrolling
    document.addEventListener(
      "wheel",
      (event) => {
        if (event.deltaY > 0) {
          // Block downward scroll
          event.preventDefault();
        } else if (event.deltaX !== 0) {
          // Convert horizontal scroll to upward scroll
          window.scrollBy(0, -event.deltaX);
          event.preventDefault();
        }
      },
      { passive: false }
    );
  }
});
