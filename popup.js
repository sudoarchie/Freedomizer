const form = document.getElementById("website-form");
const input = document.getElementById("website-input");
const websiteList = document.getElementById("website-list");

// Load websites from storage
chrome.storage.sync.get("websites", (data) => {
  const websites = data.websites || [];
  websites.forEach(addWebsiteToList);
});

// Save website to storage and add it to the list
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const website = input.value.trim();
  if (website) {
    chrome.storage.sync.get("websites", (data) => {
      const websites = data.websites || [];
      websites.push(website);
      chrome.storage.sync.set({ websites });
      addWebsiteToList(website);
      input.value = "";
    });
  }
});

// Add a website to the UI list
function addWebsiteToList(website) {
  const li = document.createElement("li");
  li.textContent = website;
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => {
    chrome.storage.sync.get("websites", (data) => {
      const websites = data.websites.filter((w) => w !== website);
      chrome.storage.sync.set({ websites });
      li.remove();
    });
  });
  li.appendChild(removeBtn);
  websiteList.appendChild(li);
}
