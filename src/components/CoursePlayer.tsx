import React, { useState, useRef } from 'react';
import { Lock, Play, Pause, Volume2, Maximize2, Minimize2, ThumbsUp, MessageCircle, ChevronLeft, ChevronRight, Check, ChevronDown } from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import FeedbackModal from './FeedbackModal';

const modules = [
  {
    title: 'Module 1: Foundational AI Knowledge',
    description: 'General Audience Introduction to AI',
    lessons: [
      {
        title: '1. Introduction to AI & Machine Learning',
        description: 'What is AI? Understanding key concepts: ML, NLP, and deep learning. History and evolution of AI. AI\'s impact across industries. Ethical considerations and responsible AI.',
        duration: '60:00',
        date: 'Monday, June 16',
        time: '1:00 PM EST',
        status: 'current',
        videoUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
        instructorNotes: `
          <h3>Key Learning Objectives:</h3>
          <ul>
            <li>Understand the fundamental concepts of AI and Machine Learning</li>
            <li>Recognize the differences between various AI technologies</li>
            <li>Identify potential applications in professional services</li>
          </ul>
          <h3>Additional Resources:</h3>
          <ul>
            <li>AI Terminology Glossary</li>
            <li>Case Studies in Professional Services</li>
            <li>Recommended Reading List</li>
          </ul>
        `
      },
      {
        title: '2. AI Tools & Applications in Professional Services',
        description: 'Overview of AI-powered tools in accounting, tax, audit, and finance. Hands-on exploration of AI in data analysis and automation. Case studies of AI success in the industry. Discussion: How AI will shape our firm\'s future.',
        duration: '60:00',
        date: 'Thursday, June 26',
        time: '12:00 PM EST',
        status: 'locked',
        videoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
      }
    ]
  },
  {
    title: 'Module 2: CAAS & Tax',
    description: 'Week 1: AI Applications in CAAS and Tax Departments',
    lessons: [
      {
        title: '3. AI for Client Accounting & Advisory Services (CAAS)',
        description: 'Automating bookkeeping and financial reporting. AI-powered forecasting and trend analysis. Workflow optimization with AI-driven insights.',
        duration: '60:00',
        date: 'Monday, July 14',
        time: '1:00 PM EST',
        status: 'locked',
        videoUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
      },
      {
        title: '4. AI in Tax: Automation & Compliance',
        description: 'AI for tax research and compliance tracking. Predictive analytics for tax planning. AI in risk assessment and fraud detection.',
        duration: '60:00',
        date: 'Friday, July 18',
        time: '10:00 AM EST',
        status: 'locked',
        videoUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
      }
    ]
  },
  {
    title: 'Module 3: Assurance & Corporate',
    description: 'Week 2: AI Integration in Audit and Corporate Processes',
    lessons: [
      {
        title: '5. AI in Assurance: Audit Transformation',
        description: 'AI-driven risk assessment and fraud detection. Automated audit procedures and anomaly detection. Future of AI in regulatory compliance.',
        duration: '60:00',
        date: 'Monday, July 21',
        time: '1:00 PM EST',
        status: 'locked',
        videoUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3'
      },
      {
        title: '6. Corporate AI Strategy & Implementation',
        description: 'AI governance and ethics in corporate decision-making. AI-powered workforce analytics and HR transformation. Data-driven strategic planning with AI.',
        duration: '60:00',
        date: 'Wednesday, July 23',
        time: '12:00 PM EST',
        status: 'locked',
        videoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3'
      }
    ]
  },
  {
    title: 'Module 4: Advanced CAAS & Tax',
    description: 'Week 3: Advanced AI Applications in CAAS and Tax',
    lessons: [
      {
        title: '7. Advanced AI for CAAS: Strategic Advisory',
        description: 'Leveraging AI for financial planning and consulting. AI-powered business process automation. Client collaboration tools with AI.',
        duration: '60:00',
        date: 'Monday, July 28',
        time: '1:00 PM EST',
        status: 'locked',
        videoUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3'
      },
      {
        title: '8. Advanced AI in Tax: AI for Complex Tax Scenarios',
        description: 'AI and blockchain for tax compliance. Advanced AI modeling for tax projections. AI-assisted tax advisory services.',
        duration: '60:00',
        date: 'Thursday, July 31',
        time: '11:00 AM EST',
        status: 'locked',
        videoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3'
      }
    ]
  },
  {
    title: 'Module 5: Advanced Assurance & Corporate',
    description: 'Week 4: Future-Proofing Audit and Corporate Innovation',
    lessons: [
      {
        title: '9. AI for Assurance: Future-Proofing Audit & Risk Management',
        description: 'AI in continuous monitoring and real-time auditing. AI-powered fraud detection and cybersecurity audits. AI\'s role in evolving audit standards.',
        duration: '60:00',
        date: 'Monday, August 4',
        time: '2:00 PM EST',
        status: 'locked',
        videoUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3'
      },
      {
        title: '10. Corporate AI Innovation & Future Trends',
        description: 'AI for strategic growth and operational efficiency. Exploring generative AI for internal and client-facing services. AI regulatory landscape and future compliance considerations.',
        duration: '60:00',
        date: 'Tuesday, August 5',
        time: '10:00 AM EST',
        status: 'locked',
        videoUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3'
      }
    ]
  }
];

export default function CoursePlayer() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isCompleted, setIsCompleted] = useState(false);
  const [likes, setLikes] = useState(124);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState(15);
  const [activeTab, setActiveTab] = useState<'my-notes' | 'instructor-notes'>('my-notes');
  const [myNotes, setMyNotes] = useState('');
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  
  const currentLesson = modules[currentModuleIndex].lessons[currentLessonIndex];
  const duration = 298; // Duration in seconds (4:58)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const handleFeedbackSubmit = (feedback: string) => {
    console.log('Feedback submitted:', feedback);
    // Here you would typically send the feedback to your backend
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;

    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(err => {
        console.error(`Error attempting to exit fullscreen: ${err.message}`);
      });
    }
  };

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    } else if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
      setCurrentLessonIndex(modules[currentModuleIndex - 1].lessons.length - 1);
    }
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < modules[currentModuleIndex].lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentLessonIndex(0);
    }
  };

  // Update fullscreen state when user exits fullscreen using Esc key
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <div className="space-y-4">
          <div 
            ref={videoContainerRef}
            className={`relative aspect-video rounded-xl overflow-hidden bg-yhb-navy ${
              isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
            }`}
          >
            <img
              src={currentLesson.videoUrl}
              alt={currentLesson.title}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={togglePlay}
                className="w-16 h-16 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-yhb-navy" />
                ) : (
                  <Play className="w-8 h-8 text-yhb-navy ml-1" />
                )}
              </button>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-white text-sm">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleTimeUpdate}
                    className="flex-1 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                  <span className="text-white text-sm">{formatTime(duration)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button onClick={togglePlay} className="text-white hover:text-yhb-blue transition-colors">
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-5 h-5 text-white" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                      />
                    </div>
                  </div>
                  
                  <button 
                    onClick={toggleFullscreen}
                    className="text-white hover:text-yhb-blue transition-colors"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-5 h-5" />
                    ) : (
                      <Maximize2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={goToPreviousLesson}
                disabled={currentModuleIndex === 0 && currentLessonIndex === 0}
                className="px-4 py-2 bg-yhb-blue text-white rounded-lg hover:bg-yhb-light-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button 
                onClick={goToNextLesson}
                disabled={currentModuleIndex === modules.length - 1 && currentLessonIndex === modules[currentModuleIndex].lessons.length - 1}
                className="px-4 py-2 bg-yhb-blue text-white rounded-lg hover:bg-yhb-light-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-6">
              <button 
                className={`flex items-center gap-2 ${hasLiked ? 'text-yhb-blue' : 'text-yhb-gray'} hover:text-yhb-blue transition-colors`}
                onClick={handleLike}
              >
                <ThumbsUp className="w-5 h-5" />
                <span>{likes}</span>
              </button>
              
              <button 
                onClick={() => setIsFeedbackModalOpen(true)}
                className="flex items-center gap-2 text-yhb-gray hover:text-yhb-blue transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{comments}</span>
              </button>

              <button 
                onClick={() => setIsCompleted(!isCompleted)}
                className={`flex items-center gap-2 ${isCompleted ? 'text-green-500' : 'text-yhb-gray'} hover:text-green-500 transition-colors`}
              >
                <Check className="w-5 h-5" />
                <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
              </button>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-yhb-navy mt-6 mb-2">
          {currentLesson.title}
        </h2>
        <div className="flex items-center space-x-4 text-yhb-gray mb-4">
          <span>{currentLesson.date}</span>
          <span>•</span>
          <span>{currentLesson.time}</span>
          <span>•</span>
          <span>Duration: {currentLesson.duration}</span>
        </div>
        <p className="text-yhb-gray text-sm leading-relaxed mb-8">
          {currentLesson.description}
        </p>

        <div className="space-y-6">
          <div className="flex gap-4 border-b">
            <button
              className={`px-4 py-2 font-medium transition-colors relative ${
                activeTab === 'my-notes'
                  ? 'text-yhb-blue'
                  : 'text-yhb-gray hover:text-yhb-blue'
              }`}
              onClick={() => setActiveTab('my-notes')}
            >
              My Notes
              {activeTab === 'my-notes' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yhb-blue" />
              )}
            </button>
            <button
              className={`px-4 py-2 font-medium transition-colors relative ${
                activeTab === 'instructor-notes'
                  ? 'text-yhb-blue'
                  : 'text-yhb-gray hover:text-yhb-blue'
              }`}
              onClick={() => setActiveTab('instructor-notes')}
            >
              Instructor Notes
              {activeTab === 'instructor-notes' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yhb-blue" />
              )}
            </button>
          </div>

          {activeTab === 'my-notes' ? (
            <div className="bg-gray-50 rounded-lg p-6">
              <RichTextEditor
                content={myNotes}
                onChange={setMyNotes}
                placeholder="Add your notes here..."
              />
            </div>
          ) : (
            <div 
              className="bg-gray-50 rounded-lg p-6 prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none"
              dangerouslySetInnerHTML={{ __html: currentLesson.instructorNotes || '' }}
            />
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-yhb-navy mb-6">Course Schedule</h3>
        <div className="space-y-8">
          {modules.map((module, moduleIndex) => (
            <div key={moduleIndex}>
              <h4 className="font-semibold text-yhb-navy mb-2">{module.title}</h4>
              <p className="text-sm text-yhb-gray mb-4">{module.description}</p>
              <ul className="space-y-3">
                {module.lessons.map((lesson, lessonIndex) => (
                  <li key={lessonIndex}>
                    <button
                      onClick={() => {
                        setCurrentModuleIndex(moduleIndex);
                        setCurrentLessonIndex(lessonIndex);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        moduleIndex === currentModuleIndex && lessonIndex === currentLessonIndex
                          ? 'bg-yhb-blue/10 text-yhb-blue'
                          : 'hover:bg-gray-50 text-yhb-gray'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {lesson.status === 'locked' ? (
                          <Lock className="w-5 h-5" />
                        ) : (
                          <Check className="w-5 h-5" />
                        )}
                        <div>
                          <div className="font-medium">{lesson.title}</div>
                          <div className="text-sm text-yhb-gray">
                            {lesson.date} • {lesson.time}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm flex-shrink-0 ml-4">{lesson.duration}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
}