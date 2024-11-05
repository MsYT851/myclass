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
    "admin@myclass.com": "ms17121234567890",
    "jen1@myclass.com": "1jen",
    "kar2@myclass.com": "2kar",
    "ghi3@myclass.com": "3ghi",
    "lou4@myclass.com": "4lou",
    "cha5@myclass.com": "5cha",
    "nou6@myclass.com": "6nou",
    "pet7@myclass.com": "7pet",
    "elenio8@myclass.com": "8elenio",
    "dan9@myclass.com": "9dan",
    "10ant@myclass.com": "10ant",
    "ann11@myclass.com": "11ann",
    "joh12@myclass.com": "12joh",
    "geo13@myclass.com": "13geo",
    "yar14@myclass.com": "14yar",
    "chl15@myclass.com": "15chl",
    "gha16@myclass.com": "16gha",
    "sal17@myclass.com": "17sal",
    "kme18@myclass.com": "18kme",
    "lyn19@myclass.com": "19lyn",
    "ray20@myclass.com": "20ray",
    "elena21@myclass.com": "21elena",
    "sas22@myclass.com": "22sas",
    "eliana23@myclass.com": "23eliana",
    "joey24@myclass.com": "24joey",
    "sab26@myclass.com": "26sab",
    "had27@myclass.com": "27had"
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

function filterVideos() {
  const query = document.getElementById('searchBar').value.toLowerCase();
  const videos = document.querySelectorAll('.video-card');

  videos.forEach(video => {
    const title = video.getAttribute('data-title').toLowerCase();
    if (title.includes(query)) {
      video.classList.remove('hidden'); // Show the video card
    } else {
      video.classList.add('hidden'); // Hide the video card
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