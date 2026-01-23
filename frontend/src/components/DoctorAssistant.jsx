import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Clock, Shield, Heart, Calendar, Phone, ChevronDown } from 'lucide-react';

const DoctorAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! I\'m Dr. Sara AI 👩‍⚕️ Your personal health assistant. How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
  { text: 'Book appointment', icon: '📅' },
  { text: 'Find doctor by specialty', icon: '🩺' },
  { text: 'My appointments (cancel/reschedule)', icon: '🗓️' },
  { text: 'Payment & refund help', icon: '💳' },
  { text: 'Online consultation', icon: '💻' },
  { text: 'Reports & prescriptions', icon: '📄' },
  { text: 'Account / login help', icon: '🔐' },
  { text: 'Emergency guidance', icon: '🚨' }
];


  const suggestedQuestions = [
  'How to book an appointment step-by-step?',
  'How do I reschedule without cancelling?',
  'What is the cancellation policy?',
  'Can I do online consultation?',
  'How to download prescription or report?',
  'Which doctor is best for my symptom?',
  'What payment methods do you accept?',
  'I forgot my password, what should I do?'
];


const getBotResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();

  // Helpers
  const reply = (title, bullets, next = []) => {
    const bulletText = bullets.map(b => `• ${b}`).join('\n');
    const nextText = next.length
      ? `\n\n✅ Next you can type:\n${next.map(n => `- ${n}`).join('\n')}`
      : '';
    return `${title}\n\n${bulletText}${nextText}`;
  };

  const ask = (question, options = []) => {
    const optText = options.length ? `\n\nQuick options:\n${options.map(o => `- ${o}`).join('\n')}` : '';
    return `${question}${optText}`;
  };

  // ---- Greetings ----
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return reply(
      "👋 Hi! I’m Dr. Sara AI — your assistant inside Prescripto.",
      [
        "Book an appointment in minutes",
        "Help you choose the right specialist",
        "Manage appointments (cancel/reschedule)",
        "Payments, prescriptions, reports, and support"
      ],
      ["Book appointment", "Find doctor by specialty", "My appointments", "Payment help"]
    );
  }

  // ---- Booking flow ----
  if (msg.includes('book') || msg.includes('appointment') || msg.includes('schedule')) {
    // If user is asking HOW
    return reply(
      "📅 Book an appointment (step-by-step)",
      [
        "Go to: ALL DOCTORS",
        "Pick a doctor (check fee, experience, ratings)",
        "Select date + time slot",
        "Click BOOK / CONFIRM",
        "You’ll see it in: My Appointments"
      ],
      ["Find doctor by specialty", "Which doctor is best for fever?", "My appointments"]
    ) + "\n\n" + ask("Want me to recommend a specialist? Tell me your main issue.", [
      "Fever / cold",
      "Skin problem",
      "Heart / chest pain",
      "Stomach problem",
      "Child health",
      "Women health"
    ]);
  }

  // ---- Find doctor / specialty ----
  if (msg.includes('find') || msg.includes('doctor') || msg.includes('specialty') || msg.includes('speciality')) {
    return reply(
      "🩺 Finding the right doctor",
      [
        "Use Speciality section to filter (Cardiology, Dermatology, Pediatrics, Gynecology etc.)",
        "Or search by doctor name",
        "Compare: fee + available slots + experience",
        "Choose a time that suits you and book"
      ],
      ["Recommend doctor for headache", "Book appointment", "Online consultation"]
    ) + "\n\n" + ask("Tell me your symptom and I’ll suggest the best specialist.", [
      "Headache",
      "Acne / rash",
      "Back pain",
      "Diabetes",
      "Pregnancy",
      "Child fever"
    ]);
  }

  // ---- Cancel / reschedule ----
  if (msg.includes('cancel') || msg.includes('reschedule') || msg.includes('change time')) {
    return reply(
      "🗓️ Manage appointments (cancel / reschedule)",
      [
        "Open: My Appointments",
        "Find the appointment you want to change",
        "Choose CANCEL or RESCHEDULE (if available)",
        "Pick a new slot and confirm",
        "Status will update (Pending / Completed / Cancelled)"
      ],
      ["Cancellation policy", "Refund help", "Contact support"]
    ) + "\n\n" + ask("Do you want to cancel or reschedule?", ["Cancel", "Reschedule"]);
  }

  // ---- Policy / refund ----
  if (msg.includes('refund') || msg.includes('policy') || msg.includes('charge') || msg.includes('payment')) {
    return reply(
      "💳 Payment & refund help",
      [
        "You can pay by Cash / Online (depends on clinic/doctor settings)",
        "If you cancel, refund depends on clinic policy (usually before a time window)",
        "Check appointment card in: My Appointments → it shows payment type + status"
      ],
      ["Cancellation policy", "How to cancel appointment?", "Contact support"]
    ) + "\n\n" + ask("Which payment type did you use?", ["Cash", "Online"]);
  }

  // ---- Online consultation ----
  if (msg.includes('online') || msg.includes('video') || msg.includes('tele') || msg.includes('consultation')) {
    return reply(
      "💻 Online consultation (how it works)",
      [
        "Choose a doctor who supports Online",
        "Book an online slot",
        "You’ll receive consultation time info in your appointment",
        "Be ready with: symptoms + previous reports + current medicines"
      ],
      ["How to prepare for visit", "Reports & prescriptions", "Book appointment"]
    );
  }

  // ---- Prescriptions / reports ----
  if (msg.includes('prescription') || msg.includes('medicine') || msg.includes('report') || msg.includes('test')) {
    return reply(
      "📄 Prescriptions & reports",
      [
        "After completed appointment, doctor may provide prescription",
        "Keep your previous reports ready for faster diagnosis",
        "If your app has a prescription/report section, use it from your profile/appointments"
      ],
      ["How to prepare for visit", "My appointments", "Contact support"]
    ) + "\n\n" + ask("Do you want help with medicines or uploading reports?", ["Medicines", "Upload report"]);
  }

  // ---- Clinic hours / contact ----
  if (msg.includes('hours') || msg.includes('open') || msg.includes('time') || msg.includes('working')) {
    return reply(
      "🕒 Clinic timings",
      [
        "Clinic hours depend on doctor/clinic",
        "Check doctor profile for availability + slots",
        "You can book only available slots"
      ],
      ["Find doctor by specialty", "Book appointment"]
    );
  }

  if (msg.includes('contact') || msg.includes('support') || msg.includes('call') || msg.includes('phone')) {
    return reply(
      "📞 Support options",
      [
        "If you face booking issues: try refreshing and booking again",
        "If payment failed: check your appointment status first",
        "For account issues: log out and log in again"
      ],
      ["Account / login help", "Payment help", "My appointments"]
    );
  }

  // ---- Account / login ----
  if (msg.includes('login') || msg.includes('sign') || msg.includes('password') || msg.includes('account')) {
    return reply(
      "🔐 Account / login help",
      [
        "Make sure email + password are correct",
        "If token expired: log out then log in",
        "If you forgot password: use reset flow (if available) or contact support",
        "Clear browser cache if stuck on loading"
      ],
      ["I forgot my password", "Logout", "Contact support"]
    ) + "\n\n" + ask("What issue are you facing?", ["Wrong password", "Can't login", "Session expired"]);
  }

  // ---- Emergency ----
  if (msg.includes('emergency') || msg.includes('urgent') || msg.includes('chest pain') || msg.includes('breath')) {
    return reply(
      "🚨 Emergency guidance",
      [
        "If life-threatening: call your local emergency number immediately",
        "Chest pain, severe breathing trouble, fainting = emergency",
        "For non-emergency urgent: book the earliest available appointment"
      ],
      ["Book appointment", "Find doctor by specialty"]
    );
  }

  // ---- Thank you ----
  if (msg.includes('thank')) {
    return "🌟 You’re welcome! If you tell me your symptom, I can suggest the best specialist and next steps.";
  }

  // ---- Default helpful menu ----
  return reply(
    "🤖 I can help you with almost everything inside Prescripto:",
    [
      "Booking & managing appointments",
      "Choosing the right doctor/specialty by symptoms",
      "Payments, refunds, and policies",
      "Online consultation guidance",
      "Prescriptions, reports and preparation tips",
      "Account/login troubleshooting"
    ],
    ["Book appointment", "Find doctor by specialty", "My appointments", "Account / login help"]
  ) + "\n\n" + ask("Tell me what you need help with (example: 'book dermatologist tomorrow').");
};


  const handleSend = () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      type: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setShowQuickReplies(false);

    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(inputText),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const handleQuickReply = (reply) => {
    const userMessage = {
      type: 'user',
      text: reply,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setShowQuickReplies(false);

    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(reply),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white rounded-full p-5 shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none"
        >
          <MessageCircle size={32} className="relative z-10" />
          <Sparkles size={16} className="absolute top-2 right-2 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
          
          {/* Notification Badge */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center animate-bounce border-2 border-white">
            1
          </span>

          {/* Pulsing Ring Effect */}
          <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></span>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
            💬 Chat with Dr. Sara AI
            <div className="absolute top-full right-6 -mt-1 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl w-[420px] h-[650px] flex flex-col overflow-hidden border-2 border-blue-100 animate-in slide-in-from-bottom-8 duration-500">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg">
                    👨‍⚕️
                  </div>
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-3 border-white animate-pulse"></span>
                  <Sparkles size={14} className="absolute -top-1 -right-1 text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-bold text-xl flex items-center gap-2">
                    Dr. Sara AI
                    <Shield size={16} className="text-green-300" />
                  </h3>
                  <p className="text-xs text-blue-100 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Online • Instant replies
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-2 transition-all hover:rotate-90 duration-300"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-3 duration-300`}
              >
                <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                  {msg.type === 'bot' && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">👨‍⚕️</span>
                      <span className="text-xs font-semibold text-gray-600">Dr. Sara</span>
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-5 py-3 shadow-md ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                  </div>
                  <div className={`flex items-center gap-1 mt-1 text-xs text-gray-400 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <Clock size={12} />
                    <span>{msg.time}</span>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="bg-white rounded-2xl rounded-bl-none px-5 py-4 shadow-md border border-gray-100">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce"></span>
                    <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                    <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {showQuickReplies && messages.length === 1 && (
            <div className="px-5 py-3 bg-white border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                <Sparkles size={12} />
                Quick actions
              </p>
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(reply.text)}
                    className="px-3 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl text-xs font-medium hover:from-blue-100 hover:to-indigo-100 transition-all border border-blue-200 hover:border-blue-300 hover:shadow-md flex items-center gap-2 justify-center"
                  >
                    <span>{reply.icon}</span>
                    <span>{reply.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Questions */}
          {messages.length > 2 && (
            <div className="px-5 py-2 bg-gray-50 border-t border-gray-100">
              <button 
                onClick={() => setShowQuickReplies(!showQuickReplies)}
                className="text-xs text-gray-500 flex items-center gap-1 hover:text-blue-600 transition-colors"
              >
                <ChevronDown size={14} className={`transform transition-transform ${showQuickReplies ? 'rotate-180' : ''}`} />
                Suggested questions
              </button>
              {showQuickReplies && (
                <div className="mt-2 space-y-1">
                  {suggestedQuestions.slice(0, 2).map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickReply(question)}
                      className="w-full text-left px-3 py-2 bg-white text-gray-600 rounded-lg text-xs hover:bg-blue-50 hover:text-blue-600 transition-colors border border-gray-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full p-3 hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                disabled={inputText.trim() === ''}
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Powered by AI • Always learning to serve you better
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAssistant;