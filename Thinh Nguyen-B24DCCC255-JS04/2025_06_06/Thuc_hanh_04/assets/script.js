class ImageSlider {
    constructor() {
        this.autoPlayInterval = 5000;
        this.currentIndex = 0;
        this.isAutoPlay = true;
        this.isTransitioning = false;
        
        this.images = [
            {
                src: './assets/img/bien.jpg',
                alt: 'Biển'
            },
            {
                src: './assets/img/nuinon.jpg',
                alt: 'Núi non'
            },
            {
                src: './assets/img/rungcay.jpg',
                alt: 'Rừng cây'
            },
            {
                src: './assets/img/thanhpho.jpg',
                alt: 'Thành phố'
            }
        ];

        this.mainImage = document.getElementById('mainImage');
        this.prevBtn = document.getElementById('prev-button');
        this.nextBtn = document.getElementById('next-button');
        this.dotsContainer = document.getElementById('dotsContainer');
        this.autoBtn = document.getElementById('autoBtn');
        this.progressFill = document.getElementById('progressFill');
        this.timeLeft = document.getElementById('timeLeft');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.preloadContainer = document.getElementById('preloadContainer');

        this.autoPlayTimer = null;
        this.progressTimer = null;
        this.progressStartTime = null;

        this.init();
    }

    init() {
        this.preloadImages();
        this.createDots();
        this.bindEvents();
        this.updateImage();
        this.startAutoPlay();
    }

    preloadImages() {
        this.preloadContainer.innerHTML = '';
        this.images.forEach(image => {
            const img = document.createElement('img');
            img.src = image.src;
            img.style.position = 'absolute';
            img.style.width = '1px';
            img.style.height = '1px';
            img.style.opacity = '0';
            this.preloadContainer.appendChild(img);
        });
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        this.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === this.currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.showPrevImage());
        this.nextBtn.addEventListener('click', () => this.showNextImage());
        this.autoBtn.addEventListener('click', () => this.toggleAutoPlay());

        this.mainImage.addEventListener('load', () => {
            this.hideLoading();
        });

        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    this.showPrevImage();
                    break;
                case 'ArrowRight':
                    this.showNextImage();
                    break;
                case ' ':
                    e.preventDefault();
                    this.toggleAutoPlay();
                    break;
            }
        });
    }

    updateImage() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.showLoading();
        
        const currentImg = this.images[this.currentIndex];
        
        const newImage = new Image();
        newImage.src = currentImg.src;
        
        newImage.onload = () => {
            this.mainImage.src = currentImg.src;
            this.mainImage.alt = currentImg.alt;
            this.updateDots();
            this.hideLoading();
            
            setTimeout(() => {
                this.isTransitioning = false;
            }, 300);
        };
        
        newImage.onerror = () => {
            console.error('Không thể tải ảnh:', currentImg.src);
            this.hideLoading();
            this.isTransitioning = false;
        };
    }

    showLoading() {
        this.loadingOverlay.classList.add('active');
    }

    hideLoading() {
        this.loadingOverlay.classList.remove('active');
    }

    updateDots() {
        const dots = this.dotsContainer.children;
        Array.from(dots).forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    showPrevImage() {
        if (this.isTransitioning) return;
        
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.images.length - 1;
        }
        this.updateImage();
        this.resetAutoPlay();
    }

    showNextImage() {
        if (this.isTransitioning) return;
        
        this.currentIndex++;
        if (this.currentIndex >= this.images.length) {
            this.currentIndex = 0;
        }
        this.updateImage();
        this.resetAutoPlay();
    }

    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex) return;
        
        this.currentIndex = index;
        this.updateImage();
        this.resetAutoPlay();
    }

    startAutoPlay() {
        if (!this.isAutoPlay) return;
        
        this.stopAutoPlay(); 

        this.autoPlayTimer = setTimeout(() => {
            this.showNextImage();
        }, this.autoPlayInterval);

        this.startProgress();
    }

    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearTimeout(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
        this.stopProgress();
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        if (this.isAutoPlay) {
            this.startAutoPlay();
        }
    }

    toggleAutoPlay() {
        this.isAutoPlay = !this.isAutoPlay;
        
        if (this.isAutoPlay) {
            this.autoBtn.textContent = 'Auto: ON';
            this.autoBtn.classList.add('active');
            this.startAutoPlay();
        } else {
            this.autoBtn.textContent = 'Auto: OFF';
            this.autoBtn.classList.remove('active');
            this.stopAutoPlay();
        }
    }

    startProgress() {
        this.progressStartTime = Date.now();
        this.progressFill.style.transition = 'none';
        this.progressFill.style.width = '0%';
        this.timeLeft.textContent = `${this.autoPlayInterval / 1000}s`;
        this.progressTimer = requestAnimationFrame(() => this.updateProgress());
    }

    updateProgress() {
        if (!this.isAutoPlay) return;
        
        const elapsed = Date.now() - this.progressStartTime;
        const progress = (elapsed / this.autoPlayInterval) * 100;
        const timeRemaining = Math.ceil((this.autoPlayInterval - elapsed) / 1000);
        
        this.progressFill.style.transition = 'width 0.1s linear';
        this.progressFill.style.width = `${Math.min(progress, 100)}%`;
        this.timeLeft.textContent = `${Math.max(timeRemaining, 0)}s`;
        
        if (progress < 100) {
            this.progressTimer = requestAnimationFrame(() => this.updateProgress());
        }
    }

    stopProgress() {
        if (this.progressTimer) {
            cancelAnimationFrame(this.progressTimer);
            this.progressTimer = null;
        }
        this.progressFill.style.width = '0%';
        this.timeLeft.textContent = '0s';
        this.progressFill.style.transition = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider();
});