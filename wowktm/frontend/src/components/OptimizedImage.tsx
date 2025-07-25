import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder,
  priority = false,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before image comes into view
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    onError?.();
  };

  // Generate responsive image URLs for different screen sizes
  const getResponsiveUrl = (baseUrl: string, size: number) => {
    if (baseUrl.includes('unsplash.com')) {
      // For Unsplash, modify the URL parameters
      const url = new URL(baseUrl);
      url.searchParams.set('w', size.toString());
      url.searchParams.set('h', size.toString());
      url.searchParams.set('q', '75');
      url.searchParams.set('fm', 'webp');
      return url.toString();
    }
    return baseUrl;
  };

  const generateSrcSet = (baseUrl: string) => {
    const sizes = [300, 600, 900];
    return sizes
      .map(size => `${getResponsiveUrl(baseUrl, size)} ${size}w`)
      .join(', ');
  };

  const defaultPlaceholder = `data:image/svg+xml;base64,${btoa(`
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <rect x="50%" y="50%" width="20" height="20" fill="#d1d5db" transform="translate(-10,-10)"/>
      <text x="50%" y="60%" text-anchor="middle" fill="#9ca3af" font-family="Arial" font-size="14">Loading...</text>
    </svg>
  `)}`;

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden bg-gray-100 ${className}`}
      style={{ width, height }}
    >
      {/* Loading placeholder */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 border-2 border-wowktm-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs text-gray-500 font-medium">Loading...</span>
          </div>
        </div>
      )}

      {/* Error placeholder */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center space-y-2 text-gray-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 14.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-xs">Failed to load</span>
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && !isError && (
        <img
          src={src}
          srcSet={generateSrcSet(src)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}

      {/* Blur-up effect overlay */}
      {!isLoaded && isInView && !isError && placeholder && (
        <img
          src={placeholder || defaultPlaceholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110 transition-opacity duration-300"
        />
      )}
    </div>
  );
};

export default OptimizedImage;
