document.addEventListener("DOMContentLoaded", function () {
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