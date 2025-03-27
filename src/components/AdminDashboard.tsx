import React, { useState } from 'react';
import { PlusCircle, Video, Users, MessageSquare, Upload, X, Edit, Pencil, Check, BookOpen, ThumbsUp, Flag } from 'lucide-react';
import RichTextEditor from './RichTextEditor';

type Tab = 'add-video' | 'manage-videos' | 'manage-users' | 'feedback';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  url: string;
  order: number;
  section: string;
  status: 'ready' | 'processing' | 'error';
  instructorNotes?: string;
}

interface EditableVideo extends Video {
  isEditing: boolean;
}

interface Feedback {
  id: string;
  videoId: string;
  videoTitle: string;
  content: string;
  author: string;
  date: string;
  isAnonymous: boolean;
  likes: number;
  flags: number;
  status: 'new' | 'reviewed' | 'archived';
}

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Getting Familiar with Bolt',
    description: 'Learn how to navigate and use Bolt effectively',
    duration: '3:45',
    url: 'https://example.com/video1',
    order: 1,
    section: 'Getting Started with Bolt',
    status: 'ready',
    instructorNotes: `
      <h3>Key Learning Objectives:</h3>
      <ul>
        <li>Understanding the Bolt interface</li>
        <li>Basic navigation and features</li>
        <li>Best practices for usage</li>
      </ul>
      <h3>Additional Resources:</h3>
      <ul>
        <li>Quick start guide</li>
        <li>Keyboard shortcuts</li>
        <li>Troubleshooting tips</li>
      </ul>
    `
  }
];

const mockFeedback: Feedback[] = [
  {
    id: '1',
    videoId: '1',
    videoTitle: 'Getting Familiar with Bolt',
    content: "I didn't understand the inspector part. Could you provide more examples?",
    author: 'Anonymous',
    date: '3/17/2025',
    isAnonymous: true,
    likes: 3,
    flags: 0,
    status: 'new'
  },
  {
    id: '2',
    videoId: '1',
    videoTitle: 'Getting Familiar with Bolt',
    content: "The explanation was clear and helpful. Looking forward to the next lesson!",
    author: 'Sarah M.',
    date: '3/16/2025',
    isAnonymous: false,
    likes: 5,
    flags: 0,
    status: 'reviewed'
  },
  {
    id: '3',
    videoId: '1',
    videoTitle: 'Getting Familiar with Bolt',
    content: "Could we get more hands-on exercises in the next session?",
    author: 'Anonymous',
    date: '3/15/2025',
    isAnonymous: true,
    likes: 8,
    flags: 0,
    status: 'new'
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('feedback');
  const [videos, setVideos] = useState<EditableVideo[]>(
    mockVideos.map(video => ({ ...video, isEditing: false }))
  );
  const [selectedVideo, setSelectedVideo] = useState<EditableVideo | null>(null);
  const [editingNotes, setEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState('');
  const [feedbackFilter, setFeedbackFilter] = useState<'all' | 'new' | 'reviewed' | 'archived'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'add-video', label: 'Add New Video', icon: PlusCircle },
    { id: 'manage-videos', label: 'Manage Videos', icon: Video },
    { id: 'manage-users', label: 'Manage Users', icon: Users },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare }
  ];

  const handleEditVideo = (video: EditableVideo) => {
    setSelectedVideo(video);
    setTempNotes(video.instructorNotes || '');
    setEditingNotes(false);
  };

  const handleSaveNotes = () => {
    if (selectedVideo) {
      setVideos(videos.map(v => 
        v.id === selectedVideo.id 
          ? { ...v, instructorNotes: tempNotes }
          : v
      ));
      setEditingNotes(false);
    }
  };

  const filteredFeedback = mockFeedback
    .filter(feedback => 
      feedbackFilter === 'all' || feedback.status === feedbackFilter
    )
    .filter(feedback =>
      feedback.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.videoTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-yhb-navy mb-8">Admin Dashboard</h1>

        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b">
            <nav className="flex gap-1 px-4" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`
                    flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors
                    ${
                      activeTab === tab.id
                        ? 'border-yhb-blue text-yhb-blue'
                        : 'border-transparent text-yhb-gray hover:text-yhb-navy hover:border-yhb-gray'
                    }
                  `}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'feedback' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-yhb-navy">Student Feedback</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex rounded-lg border border-yhb-medium-gray overflow-hidden">
                      <button
                        onClick={() => setFeedbackFilter('all')}
                        className={`px-4 py-2 text-sm font-medium ${
                          feedbackFilter === 'all'
                            ? 'bg-yhb-blue text-white'
                            : 'text-yhb-gray hover:text-yhb-navy'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setFeedbackFilter('new')}
                        className={`px-4 py-2 text-sm font-medium border-l ${
                          feedbackFilter === 'new'
                            ? 'bg-yhb-blue text-white'
                            : 'text-yhb-gray hover:text-yhb-navy'
                        }`}
                      >
                        New
                      </button>
                      <button
                        onClick={() => setFeedbackFilter('reviewed')}
                        className={`px-4 py-2 text-sm font-medium border-l ${
                          feedbackFilter === 'reviewed'
                            ? 'bg-yhb-blue text-white'
                            : 'text-yhb-gray hover:text-yhb-navy'
                        }`}
                      >
                        Reviewed
                      </button>
                      <button
                        onClick={() => setFeedbackFilter('archived')}
                        className={`px-4 py-2 text-sm font-medium border-l ${
                          feedbackFilter === 'archived'
                            ? 'bg-yhb-blue text-white'
                            : 'text-yhb-gray hover:text-yhb-navy'
                        }`}
                      >
                        Archived
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Search feedback..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-4 py-2 rounded-lg border border-yhb-medium-gray focus:outline-none focus:ring-2 focus:ring-yhb-blue/20 focus:border-yhb-blue"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredFeedback.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="bg-white border border-yhb-medium-gray rounded-lg p-6 space-y-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-yhb-navy mb-1">
                            {feedback.videoTitle}
                          </h3>
                          <p className="text-sm text-yhb-gray">
                            From {feedback.author} • {feedback.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            feedback.status === 'new'
                              ? 'bg-blue-100 text-blue-800'
                              : feedback.status === 'reviewed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                          </span>
                          <button className="text-yhb-gray hover:text-yhb-navy transition-colors">
                            <Flag className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-yhb-navy">{feedback.content}</p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4 text-sm text-yhb-gray">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{feedback.likes}</span>
                          </div>
                          {feedback.flags > 0 && (
                            <div className="flex items-center gap-1 text-red-500">
                              <Flag className="w-4 h-4" />
                              <span>{feedback.flags}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="px-3 py-1 text-sm text-yhb-gray hover:text-yhb-navy transition-colors"
                          >
                            Archive
                          </button>
                          <button
                            className="px-3 py-1 text-sm bg-yhb-blue text-white rounded-lg hover:bg-yhb-light-blue transition-colors"
                          >
                            Mark as Reviewed
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'manage-videos' && (
              <div className="grid grid-cols-3 gap-8">
                {/* Video List */}
                <div className="col-span-2 space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-yhb-navy">Video Management</h2>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="Search videos..."
                        className="px-4 py-2 rounded-lg border border-yhb-medium-gray focus:outline-none focus:ring-2 focus:ring-yhb-blue/20 focus:border-yhb-blue"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {videos.map((video) => (
                      <div
                        key={video.id}
                        className={`bg-white border rounded-lg p-6 cursor-pointer transition-colors ${
                          selectedVideo?.id === video.id ? 'border-yhb-blue' : 'border-yhb-medium-gray'
                        }`}
                        onClick={() => handleEditVideo(video)}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-medium text-yhb-navy">{video.title}</h3>
                            <p className="text-sm text-yhb-gray mt-1">{video.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              video.status === 'ready' 
                                ? 'bg-green-100 text-green-800'
                                : video.status === 'processing'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-yhb-gray">
                          <div>
                            <span className="font-medium">Duration:</span> {video.duration}
                          </div>
                          <div>
                            <span className="font-medium">Section:</span> {video.section}
                          </div>
                          <div>
                            <span className="font-medium">Order:</span> {video.order}
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-sm">
                          <BookOpen className="w-4 h-4 text-yhb-blue" />
                          <span className={video.instructorNotes ? 'text-yhb-blue' : 'text-yhb-gray'}>
                            {video.instructorNotes ? 'Notes available' : 'No notes'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video Details & Notes */}
                <div className="border-l pl-8">
                  {selectedVideo ? (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-yhb-navy">Video Details</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-yhb-gray mb-1">Title</label>
                          <input
                            type="text"
                            value={selectedVideo.title}
                            className="w-full px-3 py-2 border border-yhb-medium-gray rounded-lg"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-yhb-gray mb-1">Section</label>
                          <input
                            type="text"
                            value={selectedVideo.section}
                            className="w-full px-3 py-2 border border-yhb-medium-gray rounded-lg"
                            readOnly
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-yhb-gray mb-1">Duration</label>
                            <input
                              type="text"
                              value={selectedVideo.duration}
                              className="w-full px-3 py-2 border border-yhb-medium-gray rounded-lg"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-yhb-gray mb-1">Order</label>
                            <input
                              type="number"
                              value={selectedVideo.order}
                              className="w-full px-3 py-2 border border-yhb-medium-gray rounded-lg"
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-base font-semibold text-yhb-navy">Instructor Notes</h4>
                            <button
                              onClick={() => setEditingNotes(!editingNotes)}
                              className="text-yhb-blue hover:text-yhb-light-blue transition-colors"
                            >
                              {editingNotes ? (
                                <Check className="w-5 h-5" />
                              ) : (
                                <Pencil className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          
                          {editingNotes ? (
                            <div className="space-y-4">
                              <RichTextEditor
                                content={tempNotes}
                                onChange={setTempNotes}
                                placeholder="Add instructor notes..."
                              />
                              <div className="flex justify-end gap-4">
                                <button
                                  onClick={() => setEditingNotes(false)}
                                  className="px-4 py-2 text-yhb-gray hover:text-yhb-navy transition-colors"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={handleSaveNotes}
                                  className="px-4 py-2 bg-yhb-blue text-white rounded-lg hover:bg-yhb-light-blue transition-colors"
                                >
                                  Save Notes
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div 
                              className="prose prose-sm max-w-none bg-gray-50 rounded-lg p-4"
                              dangerouslySetInnerHTML={{ __html: selectedVideo.instructorNotes || '' }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-yhb-gray py-8">
                      <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select a video to view and edit details</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}