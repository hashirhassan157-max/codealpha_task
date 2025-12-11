// Image Data Array
const images = [
    { id: 1, src: 'https://picsum.photos/id/1015/600/600', category: 'nature', text: 'River Valley' },
    { id: 2, src: 'https://picsum.photos/id/1019/600/600', category: 'nature', text: 'Mountain View' },
    { id: 3, src: 'https://picsum.photos/id/0/600/600', category: 'tech', text: 'Laptop Work' },
    { id: 4, src: 'https://picsum.photos/id/60/600/600', category: 'tech', text: 'Office Setup' },
    { id: 5, src: 'https://picsum.photos/id/1076/600/600', category: 'architecture', text: 'Modern Arch'},
    { id: 6, src: 'https://picsum.photos/id/1033/600/600', category: 'architecture', text: 'Forest Path' },
    { id: 7, src: 'https://picsum.photos/id/48/600/600', category: 'tech', text: 'Coding Screen' },
    { id: 8, src: 'https://picsum.photos/id/237/600/600', category: 'animal', text: 'Cute Dog' },
    { id: 9, src: 'images/cat.jpg', category: 'animal', text: 'Cute cat' },
    { id: 10, src: 'images/tiger.jpg', category: 'animal', text: 'Tiger' },
    { id: 11, src: 'images/nature1.jpg', category: 'nature', text: 'River mountain'},
    { id: 12, src: 'images/nature2.jpg', category: 'nature', text: 'Greenery'},
    { id: 13, src: 'images/nature3.jpg', category: 'nature', text: 'Mountains'},
    { id: 13, src: 'images/code.jpg', category: 'tech', text: 'Code'},
    { id: 13, src: 'images/code1.jpg', category: 'tech', text: 'python code'},
    { id: 13, src: 'images/robot.jpg', category: 'tech', text: 'Robot'},
    { id: 13, src: 'images/tech.jpg', category: 'tech', text: 'Technology'},
];


const galleryGrid = document.getElementById('gallery-grid');
const filterBtns = document.querySelectorAll('.btn');
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle'); 


const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCat = document.getElementById('lightbox-category');
const lightboxText = document.getElementById('lightbox-caption');
const imageCounter = document.getElementById('image-counter');
const thumbnailStrip = document.getElementById('thumbnail-strip');

const closeBtn = document.getElementById('close-lightbox');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const downloadBtn = document.getElementById('btn-download');
const fullscreenBtn = document.getElementById('btn-fullscreen');

let currentImageIndex = 0;
let currentImages = [...images];

//  THEME  (Dark Mode)
const themeIcon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    
    if (isDark) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

function renderGallery(items) {
    galleryGrid.innerHTML = ''; 
    if (items.length === 0) {
        galleryGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-color);">No images found.</p>`;
        return;
    }
    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        div.innerHTML = `<img src="${item.src}" alt="${item.text}">`;
        // Pass the index relative to the CURRENT filtered list
        div.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(div);
    });
}

// Category Filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        searchInput.value = '';

        const filterValue = btn.getAttribute('data-filter');
        if (filterValue === 'all') {
            currentImages = images;
        } else {
            currentImages = images.filter(img => img.category === filterValue);
        }
        renderGallery(currentImages);
    });
});

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    filterBtns.forEach(btn => btn.classList.remove('active'));

    currentImages = images.filter(img => 
        img.category.toLowerCase().includes(searchTerm) || 
        img.text.toLowerCase().includes(searchTerm)
    );
    renderGallery(currentImages);
});

// for lightbox

function openLightbox(index) {
    currentImageIndex = index;
    lightbox.classList.add('active');
    updateLightboxContent();
    generateThumbnails();
}

function updateLightboxContent() {
    const item = currentImages[currentImageIndex];
    
    lightboxImg.src = item.src;
    lightboxCat.textContent = item.category.toUpperCase();
    lightboxText.textContent = item.text;
    imageCounter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;

    document.querySelectorAll('.thumb').forEach((thumb, idx) => {
        if(idx === currentImageIndex) {
            thumb.classList.add('active');
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            thumb.classList.remove('active');
        }
    });
}

function generateThumbnails() {
    thumbnailStrip.innerHTML = ''; 
    currentImages.forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.src = img.src;
        thumb.classList.add('thumb');
        thumb.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightboxContent();
        });
        thumbnailStrip.appendChild(thumb);
    });
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    updateLightboxContent();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxContent();
}


closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// for download feature
downloadBtn.addEventListener('click', async () => {
    const imgURL = currentImages[currentImageIndex].src;
    try {
        const response = await fetch(imgURL);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `image-${currentImageIndex + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Download failed", error);
    }
});

// fullscreen
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        lightbox.requestFullscreen().catch(err => alert(`Error: ${err.message}`));
    } else {
        document.exitFullscreen();
    }
});


renderGallery(images);
