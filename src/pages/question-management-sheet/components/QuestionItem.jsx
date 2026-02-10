import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuestionItem = ({ 
  question, 
  topicId, 
  subTopicId,
  onUpdateQuestion, 
  onDeleteQuestion,
  onToggleComplete,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState({ ...question });

  const handleSaveEdit = () => {
    if (editedQuestion?.name?.trim()) {
      onUpdateQuestion(topicId, subTopicId, question?.id, {
        ...editedQuestion,
        name: editedQuestion?.name?.trim(),
        platform: editedQuestion?.platform?.trim(),
        problemUrl: editedQuestion?.problemUrl?.trim(),
        resourceLinks: editedQuestion?.resourceLinks?.trim()
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedQuestion({ ...question });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete question "${question?.name}"?`)) {
      onDeleteQuestion(topicId, subTopicId, question?.id);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-success/10 text-success border-success/20';
      case 'Hard':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-warning/10 text-warning border-warning/20';
    }
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg transition-opacity ${
        question?.completed ? 'opacity-60' : 'opacity-100'
      }`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, question?.id, 'question', topicId, subTopicId)}
    >
      <div className="p-3 md:p-4">
        {isEditing ? (
          <div className="space-y-3">

            <Input
              label="Question Name"
              type="text"
              value={editedQuestion?.name}
              onChange={(e) => setEditedQuestion({ ...editedQuestion, name: e?.target?.value })}
              placeholder="Enter question name"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              <Input
                label="Platform"
                type="text"
                value={editedQuestion?.platform}
                onChange={(e) => setEditedQuestion({ ...editedQuestion, platform: e?.target?.value })}
                placeholder="e.g., LeetCode"
              />
            </div>

            <Input
              label="Problem URL"
              type="url"
              value={editedQuestion?.problemUrl}
              onChange={(e) => setEditedQuestion({ ...editedQuestion, problemUrl: e?.target?.value })}
              placeholder="https://example.com/problem"
            />

            <Input
              label="Resource Links"
              type="text"
              value={editedQuestion?.resourceLinks}
              onChange={(e) => setEditedQuestion({ ...editedQuestion, resourceLinks: e?.target?.value })}
              placeholder="Additional resources"
            />

            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveEdit}
                iconName="Check"
                iconSize={14}
              >
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelEdit}
                iconName="X"
                iconSize={14}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">

            <div className="flex items-start gap-3">

              <div
                draggable
                onDragStart={(e) => onDragStart(e, question?.id, 'question', topicId, subTopicId)}
                className="cursor-grab active:cursor-grabbing mt-1 text-muted-foreground hover:text-foreground"
              >
                <Icon name="GripVertical" className="w-4 h-4" />
              </div>

              <button
                onClick={() => onToggleComplete(topicId, subTopicId, question?.id)}
                className="flex-shrink-0 mt-1 w-5 h-5 rounded border-2 border-primary flex items-center justify-center hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={question?.completed ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {question?.completed && (
                  <Icon name="check" className="w-4 h-4 text-primary" />
                )}
              </button>

              <div className="flex-1 min-w-0">

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 group hover:text-primary transition-colors"
                  >
                    <Icon
                      name={isExpanded ? 'chevron-down' : 'chevron-right'}
                      className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors"
                    />
                    <h4 className={`text-sm md:text-base font-medium text-foreground ${
                      question?.completed ? 'line-through' : ''
                    }`}>
                      {question?.name}
                    </h4>
                  </button>
                  
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsEditing(true)}
                      iconName="Edit2"
                      iconSize={14}
                      aria-label="Edit question"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleDelete}
                      iconName="Trash2"
                      iconSize={14}
                      aria-label="Delete question"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                  <span className={`px-2 py-1 rounded-md border font-medium ${getDifficultyColor(question?.difficulty)}`}>
                    {question?.difficulty}
                  </span>
                  {question?.platform && (
                    <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground border border-border">
                      {question?.platform}
                    </span>
                  )}
                </div>

                {isExpanded && (
                  <div className="mt-3 space-y-2 text-xs md:text-sm">
                    {question?.problemUrl && (
                      <div className="flex items-start gap-2">
                        <Icon name="Link" size={14} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
                        <a 
                          href={question?.problemUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline break-all"
                        >
                          {question?.problemUrl}
                        </a>
                      </div>
                    )}
                    
                    {question?.resourceLinks && (
                      <div className="flex items-start gap-2">
                        <Icon name="BookOpen" size={14} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground break-all">
                          {question?.resourceLinks}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionItem;
