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


// //Asiya
document.addEventListener('DOMContentLoaded', function() {
    const profileDropdown = document.getElementById('profile-dropdown');
    const profileBtn = document.getElementById('profile-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if (!profileDropdown) return; // user is not logged in, no dropdown

    let isDropdownOpen = false;

    // Toggle dropdown
    profileBtn.addEventListener('click', function(e) {
        e.preventDefault();
        isDropdownOpen = !isDropdownOpen;
        updateDropdownState();
    });

    // Stop propagation when clicking inside dropdown
    profileDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (isDropdownOpen && !profileDropdown.contains(e.target)) {
            closeDropdown();
        }
    });

    // Close dropdown with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isDropdownOpen) {
            closeDropdown();
        }
    });

    // Dropdown item clicks (except logout)
    const dropdownItems = document.querySelectorAll('.dropdown-item:not(.logout)');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            closeDropdown();
            window.location.href = item.getAttribute('href');
        });
    });

    // Logout button redirects
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '/logout';
        });
    }

    function closeDropdown() {
        isDropdownOpen = false;
        updateDropdownState();
    }

    function updateDropdownState() {
        if (isDropdownOpen) {
            profileDropdown.classList.add('active');
        } else {
            profileDropdown.classList.remove('active');
        }
    }
});


