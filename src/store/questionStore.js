import { create } from "zustand";
import { persist } from "zustand/middleware";


function transformApiToTopics(apiData) {
  const questions = apiData?.data?.questions;
  if (!questions) return [];

  const topicMap = {};

  questions.forEach((item) => {
    const topicName = item.topic || "General";
    const subTopicName = item.subTopic || "Problems";

    if (!topicMap[topicName]) {
      topicMap[topicName] = {
        id: "topic-" + topicName,
        name: topicName,
        subTopics: {}
      };
    }

    if (!topicMap[topicName].subTopics[subTopicName]) {
      topicMap[topicName].subTopics[subTopicName] = {
        id: "sub-" + subTopicName,
        name: subTopicName,
        questions: []
      };
    }

    topicMap[topicName].subTopics[subTopicName].questions.push({
      id: item._id,
      name: item.questionId?.name || item.title,
      difficulty: item.questionId?.difficulty || "Medium",
      platform: item.questionId?.platform || "DSA Sheet",
      problemUrl: item.questionId?.problemUrl,
      resourceLinks: item.resource || "",
      completed: false
    });
  });

  return Object.values(topicMap).map((topic) => ({
    ...topic,
    subTopics: Object.values(topic.subTopics)
  }));
}


export const useQuestionStore = create(
  persist(
    (set, get) => ({

      /* STATE */
      topics: [],
      isLoading: false,
      error: null,
      isAddingTopic: false,
      draggedItem: null,
      searchQuery: "",

      setIsAddingTopic: (value) => set({ isAddingTopic: value }),
      setDraggedItem: (item) => set({ draggedItem: item }),
      setSearchQuery: (query) => set({ searchQuery: query }),


      loadMockData: async () => {

        if (get().topics.length > 0) return;

        set({ isLoading: true, error: null });

        try {
          const res = await fetch(
            "https://node.codolio.com/api/question-tracker/v1/sheet/public/get-sheet-by-slug/striver-sde-sheet"
          );

          if (!res.ok) throw new Error("Server error");

          const data = await res.json();
          const formattedTopics = transformApiToTopics(data);

          set({ topics: formattedTopics, isLoading: false });

        } catch (err) {
          console.error(err);
          set({ error: "Failed to load sheet from server.", isLoading: false });
        }
      },


      addTopic: (topicName) =>
        set((state) => ({
          topics: [
            ...state.topics,
            {
              id: `topic-${Date.now()}`,
              name: topicName,
              subTopics: []
            }
          ],
          isAddingTopic: false
        })),

      updateTopic: (topicId, updates) =>
        set((state) => ({
          topics: state.topics.map(t =>
            t.id === topicId ? { ...t, ...updates } : t
          )
        })),

      deleteTopic: (topicId) =>
        set((state) => ({
          topics: state.topics.filter(t => t.id !== topicId)
        })),


      addSubTopic: (topicId, subTopicName) =>
        set((state) => ({
          topics: state.topics.map(topic =>
            topic.id !== topicId ? topic : {
              ...topic,
              subTopics: [
                ...topic.subTopics,
                {
                  id: `subtopic-${Date.now()}`,
                  name: subTopicName,
                  questions: []
                }
              ]
            }
          )
        })),

      updateSubTopic: (topicId, subTopicId, updates) =>
        set((state) => ({
          topics: state.topics.map(topic =>
            topic.id !== topicId ? topic : {
              ...topic,
              subTopics: topic.subTopics.map(sub =>
                sub.id === subTopicId ? { ...sub, ...updates } : sub
              )
            }
          )
        })),

      deleteSubTopic: (topicId, subTopicId) =>
        set((state) => ({
          topics: state.topics.map(topic =>
            topic.id !== topicId ? topic : {
              ...topic,
              subTopics: topic.subTopics.filter(sub => sub.id !== subTopicId)
            }
          )
        })),


      addQuestion: (topicId, subTopicId, questionData) =>
        set((state) => ({
          topics: state.topics.map(topic =>
            topic.id !== topicId ? topic : {
              ...topic,
              subTopics: topic.subTopics.map(sub =>
                sub.id !== subTopicId ? sub : {
                  ...sub,
                  questions: [
                    ...sub.questions,
                    { id: `question-${Date.now()}`, ...questionData, completed: false }
                  ]
                }
              )
            }
          )
        })),

      updateQuestion: (topicId, subTopicId, questionId, updates) =>
        set((state) => ({
          topics: state.topics.map(topic =>
            topic.id !== topicId ? topic : {
              ...topic,
              subTopics: topic.subTopics.map(sub =>
                sub.id !== subTopicId ? sub : {
                  ...sub,
                  questions: sub.questions.map(q =>
                    q.id === questionId ? { ...q, ...updates } : q
                  )
                }
              )
            }
          )
        })),

      deleteQuestion: (topicId, subTopicId, questionId) =>
        set((state) => ({
          topics: state.topics.map(topic =>
            topic.id !== topicId ? topic : {
              ...topic,
              subTopics: topic.subTopics.map(sub =>
                sub.id !== subTopicId ? sub : {
                  ...sub,
                  questions: sub.questions.filter(q => q.id !== questionId)
                }
              )
            }
          )
        })),

      toggleQuestionComplete: (topicId, subTopicId, questionId) =>
        set((state) => ({
          topics: state.topics.map(topic =>
            topic.id !== topicId ? topic : {
              ...topic,
              subTopics: topic.subTopics.map(sub =>
                sub.id !== subTopicId ? sub : {
                  ...sub,
                  questions: sub.questions.map(q =>
                    q.id === questionId ? { ...q, completed: !q.completed } : q
                  )
                }
              )
            }
          )
        })),


      reorderTopics: (draggedId, targetId) =>
        set((state) => {
          const list = [...state.topics];
          const from = list.findIndex(t => t.id === draggedId);
          const to = list.findIndex(t => t.id === targetId);
          if (from === -1 || to === -1) return state;
          const [moved] = list.splice(from, 1);
          list.splice(to, 0, moved);
          return { topics: list };
        })


    }),
    {
      name: "dsa-tracker-storage"
    }
  )
);
