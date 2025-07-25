// Optimized image handling utilities
export const createPlaceholderImage = (width: number, height: number, text: string, bgColor = '#f3f4f6'): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    // Text
    ctx.fillStyle = '#6b7280';
    ctx.font = `${Math.min(width, height) / 8}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
  }
  
  return canvas.toDataURL('image/jpeg', 0.8);
};

// Optimized product images - local data URLs to avoid external requests
export const optimizedImages = {
  jewelry1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iNTAiIHN0cm9rZT0iI0Q5RDBFNCIHL2VpZ2h0PSIyIiBmaWxsPSJub25lIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LXNpemU9IjE0Ij5KZXdlbHJ5PC90ZXh0Pgo8L3N2Zz4K',
  vintage1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkVGM0UyIi8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIHN0cm9rZT0iI0Q5RDBFNCIGL2vGllaHQ9IjIiIGZpbGw9Im5vbmUiLz4KPHR4dCB4PSIxNTAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1zaXplPSIxNCI+VmludGFnZTwvdGV4dD4KPC9zdmc+Cg==',
  homeDecor1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjBGREY0Ii8+Cjxwb2x5Z29uIHBvaW50cz0iMTUwLDUwIDI1MCwyMDAgNTAsMjAwIiBzdHJva2U9IiNEOUQwRTQiLCBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KPHR4dCB4PSIxNTAiIHk9IjIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1zaXplPSIxNCI+SG9tZSBEZWNvcjwvdGV4dD4KPC9zdmc+Cg==',
  pottery1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkJGNUYzIi8+CjxlbGxpcHNlIGN4PSIxNTAiIGN5PSIxNTAiIHJ4PSI2MCIgcnk9IjgwIiBzdHJva2U9IiNEOUQwRTQiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8dGV4dCB4PSIxNTAiIHk9IjI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1zaXplPSIxNCI+UG90dGVyeTwvdGV4dD4KPC9zdmc+Cg==',
  leather1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkVGOEY1Ii8+CjxyZWN0IHg9IjcwIiB5PSI3MCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIHJ4PSIxMCIgc3Ryb2tlPSIjRDlEMEU0IiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiLz4KPHR4dCB4PSIxNTAiIHk9IjI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1zaXplPSIxNCI+TGVhdGhlcjwvdGV4dD4KPC9zdmc+Cg==',
  art1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkVGNUY5Ii8+Cjxwb2x5Z29uIHBvaW50cz0iMTUwLDgwIDIyMCwxNDAg MTgwLDIyMCAxMjAsMjIwIDgwLDE0MCIgc3Ryb2tlPSIjRDlEMEU0IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KPHR4dCB4PSIxNTAiIHk9IjI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1zaXplPSIxNCI+QXJ0PC90ZXh0Pgo8L3N2Zz4K',
};

// Preload critical images
export const preloadCriticalImages = () => {
  const criticalImages = [
    optimizedImages.jewelry1,
    optimizedImages.vintage1,
    optimizedImages.homeDecor1,
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

// Lazy loading intersection observer
export const createLazyImageObserver = (): IntersectionObserver => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('blur-sm');
          img.classList.add('transition-opacity', 'duration-300');
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01,
  });
  
  return imageObserver;
};
