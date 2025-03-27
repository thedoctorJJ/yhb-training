import React, { useState } from 'react';
import { Home, BookOpen, GraduationCap, Library, Settings, User, ChevronDown } from 'lucide-react';

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const navigation = [
  { 
    name: 'Home', 
    icon: Home, 
    progress: null,
    description: 'Course Overview'
  },
  { 
    name: 'Course Modules', 
    icon: BookOpen, 
    progress: '1/10 sessions completed',
    description: 'View all modules'
  },
  { 
    name: 'Course Progress', 
    icon: Library, 
    progress: '1/10 sessions completed',
    description: 'View all sessions'
  },
  { 
    name: 'Resources', 
    icon: GraduationCap, 
    progress: null,
    description: 'Supplementary materials'
  },
  { 
    name: 'Profile', 
    icon: User, 
    progress: null,
    description: 'Your learning profile'
  },
  { 
    name: 'Settings', 
    icon: Settings, 
    progress: null,
    description: 'Course preferences'
  },
];

export default function Sidebar({ currentSection, onSectionChange }: SidebarProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleLogoClick = () => {
    onSectionChange('Home');
  };

  const handleNavClick = (name: string) => {
    onSectionChange(name);
    setExpandedItem(expandedItem === name ? null : name);
  };

  return (
    <div className="fixed inset-y-0 flex w-72 flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-yhb-medium-gray bg-yhb-navy px-6">
        <div className="flex h-40 shrink-0 items-center justify-center px-6 pt-8 pb-4">
          <button 
            onClick={handleLogoClick}
            className="w-full hover:opacity-80 transition-opacity"
          >
            <img 
              src="/yhb-logo.svg" 
              alt="YHB Logo" 
              className="w-full h-auto max-w-[160px] object-contain"
            />
          </button>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavClick(item.name)}
                      className={`
                        group w-full flex flex-col rounded-md p-3 text-sm leading-6 font-semibold transition-all duration-200
                        ${
                          currentSection === item.name
                            ? 'bg-yhb-blue text-white'
                            : 'text-white/80 hover:text-white hover:bg-yhb-blue/80'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-x-3">
                          <item.icon
                            className={`h-6 w-6 shrink-0 ${
                              currentSection === item.name ? 'text-white' : 'text-white/80 group-hover:text-white'
                            }`}
                          />
                          {item.name}
                        </div>
                        {(item.description || item.progress) && (
                          <ChevronDown 
                            className={`w-5 h-5 transition-transform duration-200 ${
                              expandedItem === item.name ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                      </div>
                      
                      <div className={`
                        overflow-hidden transition-all duration-200 
                        ${expandedItem === item.name ? 'max-h-20 mt-2' : 'max-h-0'}
                      `}>
                        {item.description && (
                          <p className="text-xs font-normal opacity-80 pl-9 mb-2">
                            {item.description}
                          </p>
                        )}
                        {item.progress && (
                          <span className="text-xs font-medium bg-white/20 rounded-full px-2 py-0.5 self-start ml-9">
                            {item.progress}
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}