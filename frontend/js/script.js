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
// const loginBtn = document.getElementById('login');
// const profileDropdown = document.getElementById('profile-dropdown');
// const profileBtn = document.getElementById('profile-btn');
// const logoutBtn = document.getElementById('logout-btn');

// // State
// let isLoggedIn = false;
// let isDropdownOpen = false;

// document.addEventListener('DOMContentLoaded', function() {
//     setupEventListeners();
// });

// function setupEventListeners() {
//     loginBtn.addEventListener('click', function(e) {
//         e.preventDefault();
//         handleLogin();
//     });
    
//     profileBtn.addEventListener('click', function(e) {
//         e.preventDefault();
//         toggleDropdown();
//     });
    
//     logoutBtn.addEventListener('click', function(e) {
//         e.preventDefault();
//         handleLogout();
//     });
    
//     document.addEventListener('click', handleOutsideClick);
    
//     profileDropdown.addEventListener('click', function(e) {
//         e.stopPropagation();
//     });
    
//     const dropdownItems = document.querySelectorAll('.dropdown-item:not(.logout)');
//     dropdownItems.forEach(item => {
//         item.addEventListener('click', function(e) {
//             e.preventDefault();
//             closeDropdown();

//         });
//     });
// }

// function handleLogin() {
//     isLoggedIn = true;
//     updateUIState();
// }

// function handleLogout() {
//     isLoggedIn = false;
//     isDropdownOpen = false;
//     updateUIState();
// }

// function toggleDropdown() {
//     isDropdownOpen = !isDropdownOpen;
//     updateDropdownState();
// }

// function closeDropdown() {
//     isDropdownOpen = false;
//     updateDropdownState();
// }

// function handleOutsideClick(e) {
//     if (isDropdownOpen && !profileDropdown.contains(e.target)) {
//         closeDropdown();
//     }
// }

// function updateUIState() {
//     if (isLoggedIn) {
//         loginBtn.style.display = 'none';
//         profileDropdown.style.display = 'inline-block';
//     } else {
//         profileDropdown.style.display = 'none';
//         loginBtn.style.display = 'inline-block';
//     }
// }

// function updateDropdownState() {
//     if (isDropdownOpen) {
//         profileDropdown.classList.add('active');
//     } else {
//         profileDropdown.classList.remove('active');
//     }
// }

// document.addEventListener('keydown', function(e) {
//     if (e.key === 'Escape' && isDropdownOpen) {
//         closeDropdown();
//     }
// });

