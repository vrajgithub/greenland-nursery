// Global Wishlist Logic
let wishlist = JSON.parse(localStorage.getItem('greenland_wishlist')) || [];

function updateWishlistBadge() {
    const badge = document.getElementById('wishlist-badge');
    if (badge) {
        badge.innerText = wishlist.length;
        badge.classList.toggle('hidden', wishlist.length === 0);
    }
}

function toggleWishlist(id) {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
    } else {
        wishlist.push(id);
    }
    localStorage.setItem('greenland_wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
    
    // If we are on the home page, refresh the plant grid to show red hearts
    if (typeof renderPlants === 'function') {
        filterPlants(); 
    }
}

// Initialize Lucide Icons on every page
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        lucide.createIcons();
    }
    updateWishlistBadge();
});