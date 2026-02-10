import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import QuestionItem from './QuestionItem';

const SubTopicItem = ({
  subTopic,
  topicId,
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
  const [editedName, setEditedName] = useState(subTopic.name);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    name: '',
    difficulty: 'Medium',
    platform: '',
    problemUrl: '',
    resourceLinks: ''
  });

  // keep edit field synced after reload/search/reorder
  useEffect(() => {
    setEditedName(subTopic.name);
  }, [subTopic.name]);

  // auto expand during search
  useEffect(() => {
    if (searchQuery.trim()) setIsExpanded(true);
  }, [searchQuery]);

  const handleSaveEdit = () => {
    if (!editedName.trim()) return;

    onUpdateSubTopic(topicId, subTopic.id, { name: editedName.trim() });
    setIsEditing(false);
  };

  const handleAddQuestion = () => {
    if (!newQuestion.name.trim()) return;

    onAddQuestion(topicId, subTopic.id, {
      ...newQuestion,
      name: newQuestion.name.trim(),
      platform: newQuestion.platform.trim(),
      problemUrl: newQuestion.problemUrl.trim(),
      resourceLinks: newQuestion.resourceLinks.trim()
    });

    setNewQuestion({
      name: '',
      difficulty: 'Medium',
      platform: '',
      problemUrl: '',
      resourceLinks: ''
    });

    setIsAddingQuestion(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${subTopic.name}" and all its questions?`)) {
      onDeleteSubTopic(topicId, subTopic.id);
    }
  };

  return (
    <div
      className="bg-muted/50 border border-border rounded-lg"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, subTopic.id, 'subtopic', topicId)}
    >
      <div className="p-3 md:p-4 lg:p-5">

        <div className="flex items-center gap-3">

          {/* expand */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-muted"
          >
            <Icon name={isExpanded ? 'ChevronDown' : 'ChevronRight'} size={18}/>
          </button>

          {/* drag handle ONLY */}
          <div
            className="cursor-move"
            draggable
            onDragStart={(e) => onDragStart(e, subTopic.id, 'subtopic', topicId)}
          >
            <Icon name="GripVertical" size={18}/>
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
              <Button size="sm" onClick={handleSaveEdit} iconName="Check" />
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)} iconName="X" />
            </div>
          ) : (
            <>
              <div className="flex-1">
                <h4 className="font-medium">{subTopic.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {subTopic.questions.length} questions
                </p>
              </div>

              <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)} iconName="Edit2"/>
              <Button size="icon" variant="ghost" onClick={handleDelete} iconName="Trash2"/>
            </>
          )}
        </div>

        {isExpanded && (
          <div className="mt-4 pl-8">

            {subTopic.questions.length > 0 && (
              <div className="space-y-3 mb-3">
                {subTopic.questions.map((question) => (
                  <QuestionItem
                    key={question.id}
                    question={question}
                    topicId={topicId}
                    subTopicId={subTopic.id}
                    onUpdateQuestion={onUpdateQuestion}
                    onDeleteQuestion={onDeleteQuestion}
                    onToggleComplete={onToggleComplete}
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                  />
                ))}
              </div>
            )}

            {isAddingQuestion ? (
              <div className="bg-card rounded-lg p-4 border border-border space-y-3">

                <Input
                  label="Question Name"
                  value={newQuestion.name}
                  onChange={(e) => setNewQuestion({...newQuestion, name: e.target.value})}
                />

                <select
                  value={newQuestion.difficulty}
                  onChange={(e) => setNewQuestion({...newQuestion, difficulty: e.target.value})}
                  className="w-full h-10 rounded-lg border border-input px-3"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>

                <Input
                  label="Platform"
                  value={newQuestion.platform}
                  onChange={(e) => setNewQuestion({...newQuestion, platform: e.target.value})}
                />

                <Input
                  label="Problem URL"
                  value={newQuestion.problemUrl}
                  onChange={(e) => setNewQuestion({...newQuestion, problemUrl: e.target.value})}
                />

                <Input
                  label="Resource Links"
                  value={newQuestion.resourceLinks}
                  onChange={(e) => setNewQuestion({...newQuestion, resourceLinks: e.target.value})}
                />

                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddQuestion} iconName="Plus">Add</Button>
                  <Button size="sm" variant="ghost" onClick={() => setIsAddingQuestion(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsAddingQuestion(true)} iconName="Plus">
                Add Question
              </Button>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default SubTopicItem;
