import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddTopicForm = ({ onAddTopic, onCancel }) => {
  const [topicName, setTopicName] = useState('');

  const handleSubmit = () => {
    if (topicName?.trim()) {
      onAddTopic(topicName?.trim());
      setTopicName('');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5 lg:p-6 mb-4">
      <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">
        Add New Topic
      </h3>
      <Input
        label="Topic Name"
        type="text"
        value={topicName}
        onChange={(e) => setTopicName(e?.target?.value)}
        placeholder="Enter topic name"
        onKeyDown={(e) => {
          if (e?.key === 'Enter') handleSubmit();
          if (e?.key === 'Escape') onCancel();
        }}
        required
        autoFocus
      />
      <div className="flex gap-2 mt-4">
        <Button
          variant="default"
          size="sm"
          onClick={handleSubmit}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          Add Topic
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddTopicForm;