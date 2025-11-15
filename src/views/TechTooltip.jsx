import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';
import './TechTooltip.css';

const TechTooltip = ({ skill, children }) => {
  const techInfo = {
    // Frontend Technologies
    react: {
      name: 'React',
      description: 'JavaScript library for building user interfaces'
    },
    nextjs: {
      name: 'Next.js',
      description: 'React framework for production applications'
    },
    html: {
      name: 'HTML5',
      description: 'Markup language for creating web pages'
    },
    css: {
      name: 'CSS3',
      description: 'Stylesheet language for web design'
    },
    sass: {
      name: 'Sass',
      description: 'CSS preprocessor with enhanced features'
    },
    tailwindcss: {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework'
    },
    javascript: {
      name: 'JavaScript',
      description: 'Programming language for web development'
    },
    typescript: {
      name: 'TypeScript',
      description: 'Typed superset of JavaScript'
    },

    // Backend Technologies
    nodejs: {
      name: 'Node.js',
      description: 'JavaScript runtime for server-side development'
    },
    php: {
      name: 'PHP',
      description: 'Server-side scripting language'
    },

    // Databases
    mongodb: {
      name: 'MongoDB',
      description: 'NoSQL document-based database'
    },
    redis: {
      name: 'Redis',
      description: 'In-memory data structure store'
    },

    // Cloud & Infrastructure
    azure: {
      name: 'Microsoft Azure',
      description: 'Cloud computing platform and services'
    },
    firebase: {
      name: 'Firebase',
      description: 'Google platform for mobile & web apps'
    },

    // Mobile Development
    dart: {
      name: 'Dart',
      description: 'Programming language for Flutter apps'
    },

    // Content Management
    wordpress: {
      name: 'WordPress',
      description: 'Content management system'
    }
  };

  const info = techInfo[skill] || { name: skill, description: 'Technology' };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="tech-tooltip-container">
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" align="center" className="tech-tooltip-shadcn">
          <div className="tech-name">{info.name}</div>
          <div className="tech-description">{info.description}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TechTooltip;