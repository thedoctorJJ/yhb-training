import React, { useState } from 'react';
import { Bell, Search, User, Settings, Calendar, Users, Clock, BookOpen, ArrowRight } from 'lucide-react';
import Sidebar from './components/Sidebar';
import CoursePlayer from './components/CoursePlayer';
import AdminDashboard from './components/AdminDashboard';
import CourseGrid from './components/CourseGrid';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentSection, setCurrentSection] = useState('Home');

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  const handleStartLearning = () => {
    setCurrentSection('Course Modules');
  };

  return (
    <div className="h-screen flex bg-white font-montserrat">
      <Sidebar currentSection={currentSection} onSectionChange={handleSectionChange} />
      <div className="flex-1 pl-72">
        {/* Header */}
        <header className="h-16 bg-white border-b border-yhb-medium-gray px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yhb-gray" />
              <input
                type="text"
                placeholder="Search courses, modules, or resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-yhb-medium-gray focus:outline-none focus:ring-2 focus:ring-yhb-blue/20 focus:border-yhb-blue"
              />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative">
              <Bell className="w-6 h-6 text-yhb-gray hover:text-yhb-navy transition-colors" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-yhb-orange text-white text-xs flex items-center justify-center rounded-full">2</span>
            </button>
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className="relative"
            >
              <Settings className="w-6 h-6 text-yhb-gray hover:text-yhb-navy transition-colors" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-yhb-navy">Alex Johnson</p>
                <p className="text-xs text-yhb-gray">Tax Department</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-yhb-light-gray flex items-center justify-center">
                <User className="w-5 h-5 text-yhb-navy" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-8 py-6 bg-yhb-light-gray min-h-[calc(100vh-4rem)] overflow-y-auto">
          {isAdmin ? (
            <AdminDashboard />
          ) : currentSection === 'Home' ? (
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Hero Section */}
              <div className="relative bg-gradient-to-r from-yhb-navy to-yhb-blue rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/10" />
                <div className="relative p-8 sm:p-12">
                  <div className="max-w-3xl">
                    <h1 className="text-4xl font-bold text-white mb-4">
                      AI Unleashed: A Summer of Learning & Transformation
                    </h1>
                    <p className="text-white/90 text-lg mb-8 leading-relaxed">
                      Join us for an immersive learning experience designed to explore the power of AI
                      across professional services. Master cutting-edge tools and transform your workflow.
                    </p>
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-3 text-white">
                        <Calendar className="w-5 h-5" />
                        <span>June - August 2025</span>
                      </div>
                      <div className="flex items-center gap-3 text-white">
                        <Users className="w-5 h-5" />
                        <span>150+ Enrolled</span>
                      </div>
                      <div className="flex items-center gap-3 text-white">
                        <Clock className="w-5 h-5" />
                        <span>10 Sessions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-yhb-navy mb-2">✨ Why Attend?</h3>
                      <p className="text-yhb-gray">Transform your professional skills with AI expertise</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-yhb-blue" />
                    </div>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-600 text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-yhb-navy">Practical Knowledge</h4>
                        <p className="text-sm text-yhb-gray">Gain hands-on experience with AI tools and applications</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-yhb-navy">Industry Expertise</h4>
                        <p className="text-sm text-yhb-gray">Learn from leading experts and real-world case studies</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-purple-600 text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-yhb-navy">Interactive Learning</h4>
                        <p className="text-sm text-yhb-gray">Engage in discussions and hands-on exercises</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-yhb-navy mb-2">📚 Course Structure</h3>
                      <p className="text-yhb-gray">Comprehensive curriculum designed for your success</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-yhb-orange" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-yhb-gray" />
                        <span className="text-yhb-navy">Session Duration</span>
                      </div>
                      <span className="text-yhb-gray">60 minutes</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-yhb-gray" />
                        <span className="text-yhb-navy">Total Sessions</span>
                      </div>
                      <span className="text-yhb-gray">10 sessions</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-yhb-gray" />
                        <span className="text-yhb-navy">Department Focus</span>
                      </div>
                      <span className="text-yhb-gray">All departments</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Start Learning Button */}
              <div className="flex justify-center">
                <button 
                  onClick={handleStartLearning}
                  className="group flex items-center gap-2 px-8 py-4 bg-yhb-blue text-white rounded-lg hover:bg-yhb-light-blue transition-colors"
                >
                  <span className="text-lg font-semibold">Start Learning</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Recent Courses */}
              <div className="pt-8">
                <CourseGrid />
              </div>
            </div>
          ) : (
            <CoursePlayer />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;