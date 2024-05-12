let currentFolder = { photos: [] }; // Initialize with an empty array for photos

// Load the current folder from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function() {
    const currentFolderId = localStorage.getItem("currentFolderId");
    if (currentFolderId !== null) {
        const storedFolder = getFolderFromLocalStorage(currentFolderId);
        if (storedFolder !== null) {
            currentFolder = storedFolder;
            currentFolder.name = localStorage.getItem("currentFolderName"); // Add folder name to currentFolder object

            console.log("Current folder name:", currentFolder.name); // Log the folder name
            console.log("Current folder object:", currentFolder); // Log the entire currentFolder object

            renderFolderView(currentFolder);
        }
    }
});



// Save the current folder to localStorage
function saveFolderToLocalStorage(folderId, folderData) {
    localStorage.setItem("currentFolderId", folderId); // Save current folder ID
    localStorage.setItem("folder_" + folderId, JSON.stringify(folderData)); // Save folder data
}

// Retrieve the folder from localStorage
function getFolderFromLocalStorage(folderId) {
    const storedFolder = localStorage.getItem("folder_" + folderId);
    return storedFolder ? JSON.parse(storedFolder) : null;
}

// Render the folder view
function renderFolderView(currentFolder) {
    const folderTitle = document.querySelector(".navbar h1");
    folderTitle.textContent = "Inside " + currentFolder.name; // Update folder title in navbar

    const folderNameElement = document.querySelector(".folder-view h2");
    folderNameElement.textContent = currentFolder.name; // Update folder name in <h2> element

    renderPhotos();
}



// Upload a photo to the current folder
function uploadPhoto() {
    const photoUrlInput = document.getElementById("photoUrl");
    const photoUrl = photoUrlInput.value.trim();
    if (photoUrl !== "") {
        currentFolder.photos.push(photoUrl);
        saveFolderToLocalStorage(localStorage.getItem("currentFolderId"), currentFolder); // Save updated folder to localStorage
        renderPhotos();
        photoUrlInput.value = ""; // Clear the input field after upload
    }
}

// Render the photos in the current folder
function renderPhotos() {
    const photosContainer = document.getElementById("photosContainer");
    photosContainer.innerHTML = "";

    currentFolder.photos.forEach((photo, index) => {
        const photoElement = document.createElement("div");
        photoElement.classList.add("photo");
        photoElement.innerHTML = `
            <img src="${photo}" alt="Photo">
            <div class="actions">
                <button class = "del" onclick="deletePhoto(${index})">Delete</button>
                <button class = "rename" onclick="renamePhoto(${index})">Rename</button>
            </div>
        `;
        photosContainer.appendChild(photoElement);
    });
}

// Delete a photo from the current folder
function deletePhoto(index) {
    currentFolder.photos.splice(index, 1);
    saveFolderToLocalStorage(localStorage.getItem("currentFolderId"), currentFolder); // Save updated folder to localStorage
    renderPhotos();
}

// Rename a photo in the current folder
function renamePhoto(index) {
    const newPhotoUrl = prompt("Enter new photo URL:");
    if (newPhotoUrl !== null && newPhotoUrl.trim() !== "") {
        currentFolder.photos[index] = newPhotoUrl;
        saveFolderToLocalStorage(localStorage.getItem("currentFolderId"), currentFolder); // Save updated folder to localStorage
        renderPhotos();
    }
}

// Navigate back to the main page
function navigateBack() {
    window.location.href = "index.html"; // Redirect back to main page
}