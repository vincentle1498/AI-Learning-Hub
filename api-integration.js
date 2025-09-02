// API Configuration - Compatible with main app
const API_URL = window.AI_HUB_API_URL || 'https://ai-learning-hub-api.onrender.com/api';

// Don't redefine ApiService if it already exists
if (typeof ApiService === 'undefined') {
  // API Helper Functions
  const ApiService = {
    // Generic fetch wrapper
    async request(endpoint, options = {}) {
      try {
        const response = await fetch(`${API_URL}${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          ...options
        });
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('API Request failed:', error);
        // Fallback to localStorage if API fails
        return null;
      }
    },

    // Discussions
    async getDiscussions() {
      const discussions = await this.request('/discussions');
      if (discussions) {
        localStorage.setItem('aiHub_discussions', JSON.stringify(discussions));
        return discussions;
      }
      return JSON.parse(localStorage.getItem('aiHub_discussions') || '[]');
    },

    async createDiscussion(discussionData) {
      const discussion = await this.request('/discussions', {
        method: 'POST',
        body: JSON.stringify(discussionData)
      });
      
      if (discussion) {
        const discussions = JSON.parse(localStorage.getItem('aiHub_discussions') || '[]');
        discussions.unshift(discussion);
        localStorage.setItem('aiHub_discussions', JSON.stringify(discussions));
        return discussion;
      }
      return null;
    },

    async deleteDiscussion(discussionId, userId) {
      const deleted = await this.request(`/discussions/${discussionId}`, {
        method: 'DELETE',
        body: JSON.stringify({ userId })
      });
      
      if (deleted) {
        // Remove from localStorage
        const discussions = JSON.parse(localStorage.getItem('aiHub_discussions') || '[]');
        const updatedDiscussions = discussions.filter(d => d.id !== discussionId);
        localStorage.setItem('aiHub_discussions', JSON.stringify(updatedDiscussions));
        return true;
      }
      return false;
    },

    // Projects
    async getProjects() {
      const projects = await this.request('/projects');
      if (projects) {
        localStorage.setItem('aiHub_projects', JSON.stringify(projects));
        return projects;
      }
      return JSON.parse(localStorage.getItem('aiHub_projects') || '[]');
    },

    async createProject(projectData) {
      const project = await this.request('/projects', {
        method: 'POST',
        body: JSON.stringify(projectData)
      });
      
      if (project) {
        const projects = JSON.parse(localStorage.getItem('aiHub_projects') || '[]');
        projects.unshift(project);
        localStorage.setItem('aiHub_projects', JSON.stringify(projects));
        return project;
      }
      return null;
    },

    // Lessons
    async getLessons() {
      const lessons = await this.request('/lessons');
      if (lessons) {
        localStorage.setItem('aiHub_lessons', JSON.stringify(lessons));
        return lessons;
      }
      return JSON.parse(localStorage.getItem('aiHub_lessons') || '[]');
    },

    async createLesson(lessonData) {
      const lesson = await this.request('/lessons', {
        method: 'POST',
        body: JSON.stringify(lessonData)
      });
      
      if (lesson) {
        const lessons = JSON.parse(localStorage.getItem('aiHub_lessons') || '[]');
        lessons.unshift(lesson);
        localStorage.setItem('aiHub_lessons', JSON.stringify(lessons));
        return lesson;
      }
      return null;
    },

    // Study Rooms
    async getRooms() {
      const rooms = await this.request('/rooms');
      if (rooms) {
        localStorage.setItem('aiHub_rooms', JSON.stringify(rooms));
        return rooms;
      }
      return JSON.parse(localStorage.getItem('aiHub_rooms') || '[]');
    },

    async createRoom(roomData) {
      const room = await this.request('/rooms', {
        method: 'POST',
        body: JSON.stringify(roomData)
      });
      
      if (room) {
        const rooms = JSON.parse(localStorage.getItem('aiHub_rooms') || '[]');
        rooms.unshift(room);
        localStorage.setItem('aiHub_rooms', JSON.stringify(rooms));
        return room;
      }
      return null;
    }
  };

  // Make ApiService globally available
  window.ApiService = ApiService;
} else {
  console.log('ApiService already exists, skipping redefinition');
}