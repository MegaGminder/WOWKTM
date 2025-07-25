import React from 'react';

interface ProductGridSkeletonProps {
  count?: number;
}

const ProductGridSkeleton: React.FC<ProductGridSkeletonProps> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
          {/* Image skeleton */}
          <div className="w-full h-48 sm:h-56 md:h-48 lg:h-56 bg-gray-200 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
          </div>
          
          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            {/* Title skeleton */}
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            
            {/* Rating skeleton */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-gray-200 rounded-full"></div>
                ))}
              </div>
              <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>
            
            {/* Price skeleton */}
            <div className="flex items-center justify-between">
              <div className="h-5 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>
            
            {/* Button skeleton */}
            <div className="h-8 bg-gray-200 rounded w-full mt-3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
