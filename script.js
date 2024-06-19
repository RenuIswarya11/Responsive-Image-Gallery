document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => item.src);

    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');

    const lightboxContent = document.createElement('div');
    lightboxContent.classList.add('lightbox-content');
    lightbox.appendChild(lightboxContent);

    const img = document.createElement('img');
    img.classList.add('lightbox-img');
    lightboxContent.appendChild(img);

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.innerHTML = '&times;';
    lightboxContent.appendChild(closeBtn);

    const prevBtn = document.createElement('span');
    prevBtn.classList.add('prev');
    prevBtn.innerHTML = '&laquo;';
    lightboxContent.appendChild(prevBtn);

    const nextBtn = document.createElement('span');
    nextBtn.classList.add('next');
    nextBtn.innerHTML = '&raquo;';
    lightboxContent.appendChild(nextBtn);

    document.body.appendChild(lightbox);

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            openLightbox(item.src);
        });
    });

    function openLightbox(src) {
        img.src = src;
        lightbox.classList.add('show');

        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);
        document.addEventListener('keydown', handleKeyDown);
        lightbox.addEventListener('click', handleLightboxClick);
    }

    function closeLightbox() {
        lightbox.classList.remove('show');
        closeBtn.removeEventListener('click', closeLightbox);
        prevBtn.removeEventListener('click', showPrevImage);
        nextBtn.removeEventListener('click', showNextImage);
        document.removeEventListener('keydown', handleKeyDown);
        lightbox.removeEventListener('click', handleLightboxClick);
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        img.src = images[currentIndex];
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        img.src = images[currentIndex];
    }

    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    }

    function handleLightboxClick(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    }

    let startX = 0;
    let endX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    lightbox.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        if (startX - endX > 50) {
            showNextImage();
        } else if (endX - startX > 50) {
            showPrevImage();
        }
    }

    const pageHeading = document.querySelector('.page-heading');
    setInterval(() => {
        pageHeading.classList.toggle('glow');
    }, 1000);
});
