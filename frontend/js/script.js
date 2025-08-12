document.addEventListener("DOMContentLoaded", function () {

    function decodeJWT(token) {
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        let jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
        return JSON.parse(jsonPayload);
    }

    function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        const responsePayload = decodeJWT(response.credential);
        console.log("Decoded JWT ID token fields:");
        console.log("  Full Name: " + responsePayload.name);
        console.log("  Given Name: " + responsePayload.given_name);
        console.log("  Family Name: " + responsePayload.family_name);
        console.log("  Unique ID: " + responsePayload.sub);
        console.log("  Profile image URL: " + responsePayload.picture);
        console.log("  Email: " + responsePayload.email);
    }

    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        item.addEventListener('click', function () {
            items.forEach(i => i.classList.remove('focused'));
            item.classList.add('focused');
            item.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
        });
    });

    document.addEventListener('click', function (e) {
        const isItem = e.target.closest('.item');
        if (!isItem) {
            document.querySelectorAll('.item.focused').forEach(el => el.classList.remove('focused'));
        }
    });

    const login = document.getElementById('login');

    login.addEventListener('click', function () {
        const clientId = "382639480415-hqvtdsgjidhiml0k20qvghv6t4taqt0d.apps.googleusercontent.com";
        const redirectUri = "https://l1ghtray.github.io/auth/callback";
        const scope = "email profile openid";
        const responseType = "code"; // OAuth code flow

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
            `client_id=${encodeURIComponent(clientId)}` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&response_type=${encodeURIComponent(responseType)}` +
            `&scope=${encodeURIComponent(scope)}` +
            `&access_type=offline`;

        const width = 500;
        const height = 600;
        const left = (screen.width / 2) - (width / 2);
        const top = (screen.height / 2) - (height / 2);

        window.open(
            authUrl,
            "GoogleLogin",
            `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`
        );
    });

    window.addEventListener("message", (event) => {
        if (!event.origin.includes("l1ghtray.github.io")) return;

        const url = new URL(event.data);
        const code = url.searchParams.get("code");
        if (code) {
            console.log("OAuth code received:", code);
        }
    });
});
<<<<<<< HEAD
});


//Asiya
const loginBtn = document.getElementById('login');
const profileDropdown = document.getElementById('profile-dropdown');
const profileBtn = document.getElementById('profile-btn');
const logoutBtn = document.getElementById('logout-btn');

// State
let isLoggedIn = false;
let isDropdownOpen = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// Setup all event listeners
function setupEventListeners() {
    // Login button click
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    // Profile button click (for dropdown toggle)
    profileBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleDropdown();
    });
    
    // Logout button click
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleLogout();
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', handleOutsideClick);
    
    // Prevent dropdown from closing when clicking inside it
    profileDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Handle other dropdown menu item clicks
    const dropdownItems = document.querySelectorAll('.dropdown-item:not(.logout)');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            closeDropdown();
            // Add your navigation logic here if needed
        });
    });
}

// Handle login button click
function handleLogin() {
    isLoggedIn = true;
    updateUIState();
}

// Handle logout button click
function handleLogout() {
    isLoggedIn = false;
    isDropdownOpen = false;
    updateUIState();
}

// Toggle dropdown visibility
function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
    updateDropdownState();
}

// Close dropdown
function closeDropdown() {
    isDropdownOpen = false;
    updateDropdownState();
}

// Handle clicks outside the dropdown
function handleOutsideClick(e) {
    if (isDropdownOpen && !profileDropdown.contains(e.target)) {
        closeDropdown();
    }
}

// Update UI based on login state
function updateUIState() {
    if (isLoggedIn) {
        loginBtn.style.display = 'none';
        profileDropdown.style.display = 'inline-block';
    } else {
        profileDropdown.style.display = 'none';
        loginBtn.style.display = 'inline-block';
    }
}

// Update dropdown state
function updateDropdownState() {
    if (isDropdownOpen) {
        profileDropdown.classList.add('active');
    } else {
        profileDropdown.classList.remove('active');
    }
}

// Close dropdown with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isDropdownOpen) {
        closeDropdown();
    }
});
=======
>>>>>>> 9dcc02c236d605b087b5f197236e04734c455dab
