// Theme Toggle Logic
let isDarkTheme = true;

function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  document.body.classList.toggle('bright-theme', !isDarkTheme);
}

// Display Profile Popup
function toggleProfilePopup() {
  const popup = document.getElementById('profilePopup');
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

// Display MENU Popup
function toggleMenuPopup() {
  const menu = document.getElementById('menuPopup');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
} 


// Sign Out
function signOut() {
  localStorage.removeItem('userEmail');
  window.location.href = 'index.html';
}

// Sign-In Logic with Visual Feedback
document.getElementById('signInForm')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const message = document.getElementById('message');

  const userDatabase = {
    "user1@example.com": "password1",
    "user2@example.com": "password2",
    "user3@example.com": "password3"
  };

  if (userDatabase[email] && userDatabase[email] === password) {
    message.textContent = "Sign-In Successful!";
    message.className = 'success';
    localStorage.setItem('userEmail', email);

    setTimeout(() => {
      window.location.href = "main.html"; // Redirect after success
    }, 1000); // 1 second delay for visual feedback
  } else {
    message.textContent = "Invalid email or password.";
    message.className = 'error';
  }
});

// Filter Videos based on Search Bar Input
function filterVideos() {
  const query = document.getElementById('searchBar').value.toLowerCase();
  const videos = document.querySelectorAll('.video-card');
  videos.forEach(video => {
    const title = video.getAttribute('data-title').toLowerCase();
    if (title.includes(query)) {
      video.style.display = 'block';
    } else {
      video.style.display = 'none';
    }
  });
}

// Display Email on Profile
window.onload = function() {
  const userEmail = localStorage.getItem('userEmail');
  if (userEmail) {
    const profileEmailElement = document.getElementById('profileEmail');
    if (profileEmailElement) {
      profileEmailElement.textContent = userEmail;
    }
  }
};

const fileListElement = document.getElementById('fileList');
const uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const emailInput = document.getElementById('emailInput');
    const file = fileInput.files[0];
    const email = emailInput.value;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);

    const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        alert('File uploaded successfully');
        loadFiles();
    } else {
        alert('Failed to upload file');
    }
});

async function loadFiles() {
    const response = await fetch('http://localhost:3000/files');
    const files = await response.json();

    fileListElement.innerHTML = '';
    files.forEach((file) => {
        const fileCard = document.createElement('div');
        fileCard.classList.add('file-card');
        fileCard.innerHTML = `
            <p>File: ${file.name}</p>
            <p>Uploaded by: ${file.email}</p>
            <a href="http://localhost:3000/${file.path}" download>Download</a>
        `;
        fileListElement.appendChild(fileCard);
    });
}

loadFiles();


const keepAlive = require('./server');
const Monitor = require('ping-monitor');

keepAlive();
const monitor = new Monitor({
    website: '',
    title: 'NAME',
    interval: 2
});

monitor.on('up', (res) => console.log(`${res.website} its on.`));
monitor.on('down', (res) => console.log(`${res.website} it has died - ${res.statusMessage}`));
monitor.on('stop', (website) => console.log(`${website} has stopped.`) );
monitor.on('error', (error) => console.log(error));