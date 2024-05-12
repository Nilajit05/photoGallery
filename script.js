let folders = [];

document.addEventListener("DOMContentLoaded", function() {
    loadFoldersFromLocalStorage();
    renderFolders();
});

function renderFolders() {
    const foldersContainers = document.getElementsByName("foldersContainer");
    
    if (foldersContainers.length === 0) {
        console.error("Error: No element found with the name 'foldersContainer'");
        return;
    }
    
    const foldersContainer = foldersContainers[0];
    foldersContainer.innerHTML = "";

    folders.forEach((folder, index) => {
        const folderElement = document.createElement("div");
        folderElement.classList.add("folder");
        
        const folderNameSpan = document.createElement("span");
        folderNameSpan.classList.add("folder-name");
        folderNameSpan.textContent = folder.name;
        folderElement.appendChild(folderNameSpan);
        
        const folderButtonsDiv = document.createElement("div");
        folderButtonsDiv.classList.add("folder-buttons");

        const renameButton = document.createElement("button");
        renameButton.textContent = "Rename";
        renameButton.classList.add("rename-button"); // Add class for styling
        renameButton.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent propagation
            renameFolder(index);
        });
        folderButtonsDiv.appendChild(renameButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button"); // Add class for styling
        deleteButton.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent propagation
            deleteFolder(index);
        });
        folderButtonsDiv.appendChild(deleteButton);

        folderElement.appendChild(folderButtonsDiv);

        folderElement.addEventListener("click", function(event) {
            navigateToInsideFolder(index);
        });

        foldersContainer.appendChild(folderElement);
    });
}

function createFolder() {
    const folderNameInput = document.getElementById("folderName");
    const folderName = folderNameInput.value.trim();
    if (folderName !== "") {
        folders.push({ name: folderName, photos: [] });
        folderNameInput.value = "";
        saveFoldersToLocalStorage();
        renderFolders();
    }
}

function renameFolder(index) {
    const newFolderName = prompt("Enter new folder name:");
    if (newFolderName !== null && newFolderName.trim() !== "") {
        folders[index].name = newFolderName;
        saveFoldersToLocalStorage();
        renderFolders();
    }
}

function deleteFolder(index) {
    const folderToDelete = folders[index];

    // Delete each photo in the folder from local storage
    folderToDelete.photos.forEach(photoUrl => {
        console.log('Deleting photo:', photoUrl);
        localStorage.removeItem(photoUrl);
    });

    // Remove folder from array
    folders.splice(index, 1);

    // Save updated folders to local storage
    saveFoldersToLocalStorage();

    // Re-render the folders
    renderFolders();
}


function navigateToInsideFolder(index) {
    const folderName = folders[index].name; // Retrieve folder name from the folders array
    localStorage.setItem("currentFolderId", index);
    localStorage.setItem("currentFolderName", folderName); // Store folder name
    window.location.href = "inside-folder.html"; // Redirect to inside folder page
}


function saveFoldersToLocalStorage() {
    localStorage.setItem("folders", JSON.stringify(folders));
}

function loadFoldersFromLocalStorage() {
    const storedFolders = localStorage.getItem("folders");
    if (storedFolders !== null) {
        folders = JSON.parse(storedFolders);
    }
}

