// assets/js/main.js

// 1. Wishlist Logic
let wishlist = JSON.parse(localStorage.getItem('greenland_wishlist')) || [];

function toggleWishlist(id) {
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
    } else {
        wishlist.push(id);
    }
    localStorage.setItem('greenland_wishlist', JSON.stringify(wishlist));
    filterPlants(); // Refresh catalog
}

// 2. Catalog Rendering
let activeCategory = 'all';

function renderPlants(data) {
    const grid = document.getElementById('plants-grid');
    const noResults = document.getElementById('no-results');
    if(!grid) return;
    grid.innerHTML = '';

    if (data.length === 0) {
        noResults.classList.remove('hidden');
        return;
    } else {
        noResults.classList.add('hidden');
    }

    data.forEach(plant => {
        const isSaved = wishlist.includes(plant.id);
        const card = document.createElement('div');
        card.className = "bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative";
        card.innerHTML = `
            <button onclick="toggleWishlist('${plant.id}')" class="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                <i data-lucide="heart" class="w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : ''}"></i>
            </button>
            <div class="relative h-56 overflow-hidden bg-slate-100">
                <img src="${plant.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-nursery-800 shadow-sm">${plant.difficulty}</span>
            </div>
            <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div>
                    <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">${plant.category}</span>
                    <h3 class="font-bold text-slate-900 text-lg group-hover:text-nursery-700">${plant.name}</h3>
                </div>
                <div class="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span class="font-serif text-xl font-bold text-nursery-950">${plant.price}</span>
                    <button onclick="openModal('${plant.id}')" class="px-4 py-2 rounded-xl bg-nursery-50 hover:bg-nursery-700 text-nursery-800 hover:text-white font-semibold text-xs transition-colors">Quick View</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    lucide.createIcons();
}

function setCategory(cat) {
    activeCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('bg-nursery-700', 'text-white', 'shadow-md');
        btn.classList.add('bg-white', 'text-slate-600');
    });
    event.target.classList.add('bg-nursery-700', 'text-white', 'shadow-md');
    filterPlants();
}

function filterPlants() {
    const query = document.getElementById('plant-search').value.toLowerCase();
    const filtered = plantsData.filter(plant => {
        const matchesCat = activeCategory === 'all' || plant.category === activeCategory;
        const matchesQuery = plant.name.toLowerCase().includes(query);
        return matchesCat && matchesQuery;
    });
    renderPlants(filtered);
}

// 3. Quiz Logic
let quizAnswers = { light: '', care: '', space: '' };
function selectQuizOption(type, val) {
    quizAnswers[type] = val;
    if (type === 'light') {
        document.getElementById('quiz-step-1').classList.add('hidden');
        document.getElementById('quiz-step-2').classList.remove('hidden');
        document.getElementById('quiz-progress').style.width = '66%';
    } else if (type === 'care') {
        document.getElementById('quiz-step-2').classList.add('hidden');
        document.getElementById('quiz-step-3').classList.remove('hidden');
        document.getElementById('quiz-progress').style.width = '100%';
    } else if (type === 'space') {
        document.getElementById('quiz-step-3').classList.add('hidden');
        document.getElementById('quiz-result').classList.remove('hidden');
        // Simple logic for recommendation
        const recommended = plantsData[0]; 
        document.getElementById('quiz-recommendation-card').innerHTML = `
            <img src="${recommended.image}" class="w-full h-40 object-cover rounded-xl mb-3">
            <h4 class="font-bold text-slate-900">${recommended.name}</h4>
            <p class="text-xs text-slate-500 mb-3">${recommended.description}</p>
            <button onclick="openModal('${recommended.id}')" class="w-full py-2 rounded-lg bg-nursery-700 text-white font-bold text-xs">View Details</button>
        `;
    }
    lucide.createIcons();
}

function resetQuiz() {
    quizAnswers = { light: '', care: '', space: '' };
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.add('hidden'));
    document.getElementById('quiz-step-1').classList.remove('hidden');
    document.getElementById('quiz-progress').style.width = '33%';
}

// 4. UI Helpers
function toggleFaq(id) {
    const elem = document.getElementById(id);
    elem.classList.toggle('hidden');
}

function openModal(id) {
    const plant = plantsData.find(p => p.id === id);
    document.getElementById('modal-content').innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <img src="${plant.image}" class="rounded-2xl h-64 w-full object-cover">
            <div>
                <h2 class="font-serif text-2xl font-bold">${plant.name}</h2>
                <p class="text-slate-600 my-4 text-sm">${plant.description}</p>
                <div class="text-xl font-bold text-nursery-900">${plant.price}</div>
            </div>
        </div>
    `;
    document.getElementById('plant-modal').classList.remove('hidden');
    lucide.createIcons();
}

function closeModal() { document.getElementById('plant-modal').classList.add('hidden'); }

// 5. Init
window.onload = () => {
    filterPlants();
    lucide.createIcons();
};