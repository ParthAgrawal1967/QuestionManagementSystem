import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onAddTopic }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 text-center">
      <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-muted flex items-center justify-center mb-4 md:mb-6">
        <Icon name="FolderOpen" size={32} color="var(--color-muted-foreground)" />
      </div>
      
      <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2">
        No Topics Yet
      </h3>
      
      <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-md px-4">
        Get started by creating your first topic to organize your coding questions
      </p>
      
      <Button
        variant="default"
        onClick={onAddTopic}
        iconName="Plus"
        iconPosition="left"
        iconSize={18}
      >
        Create First Topic
      </Button>
    </div>
  );
};

export default EmptyState;