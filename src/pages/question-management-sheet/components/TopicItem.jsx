import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import SubTopicItem from './SubTopicItem';

const TopicItem = ({
  topic,
  onUpdateTopic,
  onDeleteTopic,
  onAddSubTopic,
  onUpdateSubTopic,
  onDeleteSubTopic,
  onAddQuestion,
  onUpdateQuestion,
  onDeleteQuestion,
  onToggleComplete,
  onDragStart,
  onDragOver,
  onDrop,
  searchQuery
}) => {

  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(topic.name);
  const [isAddingSubTopic, setIsAddingSubTopic] = useState(false);
  const [newSubTopicName, setNewSubTopicName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setEditedName(topic.name);
  }, [topic.name]);

  useEffect(() => {
    if (searchQuery.trim()) setIsExpanded(true);
  }, [searchQuery]);

  const handleSaveEdit = () => {
    if (!editedName.trim()) return;
    onUpdateTopic(topic.id, { name: editedName.trim() });
    setIsEditing(false);
  };

  const handleAddSubTopic = () => {
    if (!newSubTopicName.trim()) return;
    onAddSubTopic(topic.id, newSubTopicName.trim());
    setNewSubTopicName('');
    setIsAddingSubTopic(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${topic.name}" and all its contents?`)) {
      onDeleteTopic(topic.id);
    }
  };

  return (
    <div
      className={`bg-card border border-border rounded-lg mb-4 transition-all ${
        isDragging ? 'opacity-50 scale-[0.98]' : ''
      }`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, topic.id, 'topic')}
    >
      <div className="p-4 md:p-5 lg:p-6">

        <div className="flex items-center gap-4">

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted"
          >
            <Icon name={isExpanded ? 'ChevronDown' : 'ChevronRight'} size={20}/>
          </button>

          <div
            className="cursor-move"
            draggable
            onDragStart={(e) => {
              setIsDragging(true);
              onDragStart(e, topic.id, 'topic');
            }}
            onDragEnd={() => setIsDragging(false)}
          >
            <Icon name="GripVertical" size={20}/>
          </div>

          {isEditing ? (
            <div className="flex-1 flex items-center gap-2">
              <Input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSaveEdit();
                  }
                  if (e.key === 'Escape') setIsEditing(false);
                }}
              />
              <Button size="sm" onClick={handleSaveEdit} iconName="Check"/>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)} iconName="X"/>
            </div>
          ) : (
            <>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold truncate">
                  {topic.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {topic.subTopics.length} sub-topics
                </p>
              </div>

              <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)} iconName="Edit2"/>
              <Button size="icon" variant="ghost" onClick={handleDelete} iconName="Trash2"/>
            </>
          )}
        </div>

        {isExpanded && (
          <div className="mt-6 pl-10">

            {topic.subTopics.length > 0 && (
              <div className="space-y-4 mb-4">
                {topic.subTopics.map((subTopic) => (
                  <SubTopicItem
                    key={subTopic.id}
                    subTopic={subTopic}
                    topicId={topic.id}
                    onUpdateSubTopic={onUpdateSubTopic}
                    onDeleteSubTopic={onDeleteSubTopic}
                    onAddQuestion={onAddQuestion}
                    onUpdateQuestion={onUpdateQuestion}
                    onDeleteQuestion={onDeleteQuestion}
                    onToggleComplete={onToggleComplete}
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
            )}

            {isAddingSubTopic ? (
              <div className="bg-muted rounded-lg p-4">
                <Input
                  label="Sub-topic Name"
                  value={newSubTopicName}
                  onChange={(e) => setNewSubTopicName(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddSubTopic();
                    if (e.key === 'Escape') {
                      setIsAddingSubTopic(false);
                      setNewSubTopicName('');
                    }
                  }}
                />
                <div className="flex gap-2 mt-3">
                  <Button size="sm" onClick={handleAddSubTopic} iconName="Plus">
                    Add
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setIsAddingSubTopic(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsAddingSubTopic(true)} iconName="Plus">
                Add Sub-topic
              </Button>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default TopicItem;
