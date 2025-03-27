import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(feedback);
    setFeedback('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-yhb-navy">Share Your Feedback</h2>
          <button
            onClick={onClose}
            className="text-yhb-gray hover:text-yhb-navy transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <label className="block text-sm font-medium text-yhb-navy mb-2">
            Your Feedback
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts about this video..."
            className="w-full h-40 px-4 py-3 rounded-lg border border-yhb-medium-gray focus:outline-none focus:ring-2 focus:ring-yhb-blue/20 focus:border-yhb-blue resize-none"
          />
        </div>

        <div className="flex justify-end gap-4 p-6 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-yhb-gray hover:text-yhb-navy transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-yhb-blue text-white rounded-lg hover:bg-yhb-light-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!feedback.trim()}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;