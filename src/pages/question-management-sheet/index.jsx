import React, { useState, useEffect, useMemo } from 'react';
import WorkspaceContainer from '../../components/ui/WorkspaceContainer';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import TopicItem from './components/TopicItem';
import AddTopicForm from './components/AddTopicForm';
import LoadingState from './components/LoadingState';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';
import { useQuestionStore } from '../../store/questionStore';
import { Search, X } from 'lucide-react';


const QuestionManagementSheet = () => {
  const {
    topics,
    isLoading,
    error,
    isAddingTopic,
    draggedItem,
    searchQuery,
    setIsAddingTopic,
    setDraggedItem,
    setSearchQuery,
    loadMockData,
    addTopic,
    updateTopic,
    deleteTopic,
    addSubTopic,
    updateSubTopic,
    deleteSubTopic,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    toggleQuestionComplete,
    reorderTopics
  } = useQuestionStore();

  const [theme, setTheme] = useState('light');

  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    loadMockData();
  }, [loadMockData]);

  // Filter topics based on search query
  const filteredTopics = React.useMemo(() => {
    if (!searchQuery?.trim()) return topics;

    const query = searchQuery?.toLowerCase();
    
    return topics?.map(topic => {
      const filteredSubTopics = topic?.subTopics?.map(subTopic => {
        const filteredQuestions = subTopic?.questions?.filter(question => 
          question?.name?.toLowerCase()?.includes(query) ||
          question?.difficulty?.toLowerCase()?.includes(query) ||
          question?.platform?.toLowerCase()?.includes(query)
        );
        
        return filteredQuestions?.length > 0 ? { ...subTopic, questions: filteredQuestions } : null;
      })?.filter(Boolean);

      return filteredSubTopics?.length > 0 ? { ...topic, subTopics: filteredSubTopics } : null;
    })?.filter(Boolean);
  }, [topics, searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleDragStart = (e, itemId, itemType, topicId, subTopicId) => {
    setDraggedItem({ itemId, itemType, topicId, subTopicId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetId, targetType, targetTopicId, targetSubTopicId) => {
    e?.preventDefault();
    
    if (!draggedItem || draggedItem?.itemId === targetId) {
      setDraggedItem(null);
      return;
    }

    if (draggedItem?.itemType === 'topic' && targetType === 'topic') {
      reorderTopics(draggedItem?.itemId, targetId);
    }

    setDraggedItem(null);
  };

  return (
    <>
      <WorkspaceContainer>
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8 lg:mb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Question Management Sheet
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  This course is made for people who want to learn DSA from A to Z for free in a well-organized and structured manner. The lecture quality is better than what you get in paid courses, the only thing we don’t provide is doubt support, but trust me our YouTube video comments resolve that as well, we have a wonderful community of 250K+ people who engage in all of the videos.

Note : Due to legal and compliance requirements of TakeUForward (TUF), Codolio has updated the links to mirror the latest official TUF sheets. We made sure that your progress and notes remain fully intact , only the external links are updated
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                {/* <Button
                  variant="outline"
                  onClick={loadMockData}
                  iconName="RefreshCw"
                  iconPosition="left"
                  iconSize={18}
                  disabled={isLoading}
                >
                  Reload Data
                </Button> */}
                
                {!isAddingTopic && topics?.length > 0 && (
                  <Button
                    variant="default"
                    onClick={() => setIsAddingTopic(true)}
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={18}
                  >
                    Add Topic
                  </Button>
                )}
              </div>
            </div>

            {topics?.length > 0 && (
              <div className="mt-6">
                <div className="relative max-w-2xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    type="text"
                    placeholder="Search questions by name, difficulty, or platform..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="pl-10 pr-10 py-2.5 w-full border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Clear search"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {filteredTopics?.reduce((acc, topic) => 
                      acc + topic?.subTopics?.reduce((subAcc, subTopic) => 
                        subAcc + (subTopic?.questions?.length || 0), 0), 0
                    )} question(s) found
                  </p>
                )}
              </div>
            )}
          </div>

          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} onRetry={loadMockData} />
          ) : (
            <>
              {isAddingTopic && (
                <AddTopicForm
                  onAddTopic={addTopic}
                  onCancel={() => setIsAddingTopic(false)}
                />
              )}

              {topics?.length === 0 && !isAddingTopic ? (
                <EmptyState onAddTopic={() => setIsAddingTopic(true)} />
              ) : searchQuery && filteredTopics?.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No questions found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search query</p>
                  <Button variant="outline" onClick={handleClearSearch}>
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 md:space-y-5 lg:space-y-6">
                  {filteredTopics?.map((topic) => (
                    <TopicItem
                      key={topic?.id}
                      topic={topic}
                      onUpdateTopic={updateTopic}
                      onDeleteTopic={deleteTopic}
                      onAddSubTopic={addSubTopic}
                      onUpdateSubTopic={updateSubTopic}
                      onDeleteSubTopic={deleteSubTopic}
                      onAddQuestion={addQuestion}
                      onUpdateQuestion={updateQuestion}
                      onDeleteQuestion={deleteQuestion}
                      onToggleComplete={toggleQuestionComplete}
                      onDragStart={handleDragStart}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      searchQuery={searchQuery}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {topics?.length > 0 && !isAddingTopic && (
            <div className="mt-6 md:mt-8 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setIsAddingTopic(true)}
                iconName="Plus"
                iconPosition="left"
                iconSize={18}
                className="w-full md:w-auto"
              >
                Add Another Topic
              </Button>
            </div>
          )}
        </div>
      </WorkspaceContainer>
    </>
  );
};

export default QuestionManagementSheet;