import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20">
      <div className="relative">
        <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name="FileText" size={24} color="var(--color-primary)" />
        </div>
      </div>
      <p className="text-sm md:text-base text-muted-foreground mt-4">
        Loading question data...
      </p>
    </div>
  );
};

export default LoadingState;