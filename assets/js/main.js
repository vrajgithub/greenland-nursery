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
    filterPlants(); 
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
                <img src="${plant.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="${plant.name}">
                <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-nursery-800 shadow-sm">${plant.difficulty}</span>
            </div>
            <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div>
                    <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">${plant.category}</span>
                    <h3 class="font-bold text-slate-900 text-lg group-hover:text-nursery-700 transition-colors">${plant.name}</h3>
                </div>
                <div class="flex flex-col gap-1 pt-2 border-t border-slate-100">
                    <span class="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Starting from</span>
                    <div class="flex items-center justify-between">
                        <span class="font-serif text-xl font-bold text-nursery-950">${plant.price}</span>
                        <button onclick="openModal('${plant.id}')" class="px-4 py-2 rounded-xl bg-nursery-50 hover:bg-nursery-700 text-nursery-800 hover:text-white font-semibold text-xs transition-colors">View</button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    lucide.createIcons();
}

function renderServices() {
    const sGrid = document.getElementById('services-grid');
    if(!sGrid) return;
    sGrid.innerHTML = '';
    servicesData.forEach(service => {
        sGrid.innerHTML += `
            <div class="p-8 rounded-3xl bg-earth-100 border border-earth-200 hover:-translate-y-2 transition-all group">
                <div class="w-14 h-14 rounded-2xl bg-nursery-700 text-white flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <i data-lucide="${service.icon}"></i>
                </div>
                <h3 class="text-xl font-bold mb-2">${service.title}</h3>
                <p class="text-slate-600 text-sm mb-4">${service.desc}</p>
                <div class="pt-4 border-t border-earth-300">
                    <span class="text-[9px] font-bold text-slate-400 uppercase block">Starting from</span>
                    <span class="text-lg font-bold text-nursery-900">${service.price}</span>
                </div>
            </div>
        `;
    });
    lucide.createIcons();
}

function filterPlants() {
    const searchInput = document.getElementById('plant-search');
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const filtered = plantsData.filter(plant => {
        const matchesCat = activeCategory === 'all' || plant.category === activeCategory;
        const matchesQuery = plant.name.toLowerCase().includes(query);
        return matchesCat && matchesQuery;
    });
    renderPlants(filtered);
}

function setCategory(cat) {
    activeCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('bg-nursery-700', 'text-white', 'shadow-md');
        btn.classList.add('bg-white', 'text-slate-600');
    });
    event.currentTarget.classList.remove('bg-white', 'text-slate-600');
    event.currentTarget.classList.add('bg-nursery-700', 'text-white', 'shadow-md');
    filterPlants();
}

// 3. Quiz Engine
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
        const recommended = plantsData[0]; 
        document.getElementById('quiz-recommendation-card').innerHTML = `
            <img src="${recommended.image}" class="w-full h-40 object-cover rounded-xl mb-3">
            <h4 class="font-bold text-slate-900 text-sm">${recommended.name}</h4>
            <span class="text-lg font-bold text-nursery-900">${recommended.price}</span>
            <button onclick="openModal('${recommended.id}')" class="w-full mt-3 py-2 rounded-lg bg-nursery-700 text-white font-bold text-xs">Details</button>
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

// 4. Modals
function openModal(id) {
    const plant = plantsData.find(p => p.id === id);
    document.getElementById('modal-content').innerHTML = `
        <div class="grid md:grid-cols-2 gap-8 text-left">
            <img src="${plant.image}" class="rounded-2xl h-72 w-full object-cover">
            <div class="space-y-4">
                <h2 class="font-serif text-3xl font-bold">${plant.name}</h2>
                <p class="text-slate-600 text-sm">${plant.description}</p>
                <div class="pt-4 border-t flex flex-col">
                    <span class="text-[10px] font-bold text-slate-400 uppercase">Starting from</span>
                    <span class="text-2xl font-serif font-bold text-nursery-900">${plant.price}</span>
                </div>
                <button class="w-full py-3 rounded-xl bg-nursery-700 text-white font-bold">Inquire via Whatsapp</button>
            </div>
        </div>
    `;
    document.getElementById('plant-modal').classList.remove('hidden');
    lucide.createIcons();
}

function closeModal() { document.getElementById('plant-modal').classList.add('hidden'); }

// 5. Initial Execution
document.addEventListener('DOMContentLoaded', () => {
    filterPlants();
    renderServices();
    lucide.createIcons();
});