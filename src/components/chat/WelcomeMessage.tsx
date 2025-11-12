import React from 'react';
import { Sparkles, MessageSquare, Zap } from 'lucide-react';
import { useConfig } from '@/contexts/ConfigContext';

interface WelcomeMessageProps {
  message?: string;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ message }) => {
  const { config } = useConfig();
  
  const displayMessage = message || config.welcomeMessage;

  const features = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Natural Conversations",
      description: "Chat naturally and get intelligent responses"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Fast & Reliable",
      description: "Quick responses powered by advanced AI"
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "Smart Assistance",
      description: "Get help with various tasks and questions"
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {config.appName}
          </h1>
          <p className="text-lg text-muted-foreground">
            {config.appTagline}
          </p>
        </div>

        {/* Welcome Message */}
        <div className="mb-8">
          <p className="text-xl text-foreground mb-6">
            {displayMessage}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 p-2 rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Prompts */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground mb-4">
            Try asking me about:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "Write a creative story",
              "Explain a complex topic",
              "Help with coding",
              "Generate ideas"
            ].map((prompt, index) => (
              <button
                key={index}
                className="px-4 py-2 text-sm rounded-full border border-border bg-background hover:bg-accent transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
