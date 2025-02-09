import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const MLHierarchy = () => {
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [hoveredTechnique, setHoveredTechnique] = useState(null);

  const algorithms = [
    {
      id: 'supervised',
      name: 'Supervised Learning',
      color: 'from-blue-400 to-cyan-400',
      glowColor: 'blue',
      description: 'Learning from labeled data with direct feedback',
      items: [
        {
          name: 'Classification Algorithms',
          techniques: [
            { name: 'Logistic Regression', caption: 'Predicts binary outcomes using logistic function.' },
            { name: 'Random Forests', caption: 'Ensemble of decision trees for robust predictions.' },
            { name: 'Support Vector Machines', caption: 'Finds optimal hyperplane for classification.' },
            { name: 'Neural Networks', caption: 'Mimics human brain for complex pattern recognition.' },
            { name: 'Gradient Boosting', caption: 'Builds models sequentially to minimize errors.' },
            { name: 'K-Nearest Neighbors', caption: 'Uses proximity to classify data points.' },
            { name: 'Decision Trees', caption: 'Splits data into branches for decision-making.' }
          ]
        },
        {
          name: 'Regression Algorithms',
          techniques: [
            { name: 'Linear Regression', caption: 'Models linear relationships between variables.' },
            { name: 'Polynomial Regression', caption: 'Fits polynomial curves to data.' },
            { name: 'Ridge/Lasso', caption: 'Regularizes regression to prevent overfitting.' },
            { name: 'Elastic Net', caption: 'Combines L1 and L2 regularization.' },
            { name: 'Decision Tree Regression', caption: 'Uses trees for regression tasks.' },
            { name: 'Random Forest Regression', caption: 'Ensemble of trees for regression.' },
            { name: 'Gradient Boosting Regression', caption: 'Sequential models for regression.' }
          ]
        }
      ]
    },
    // Other categories remain the same...
  ];

  const toggleNode = (id) => {
    setExpandedNodes((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return newExpanded;
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const renderCategory = (category) => {
    const isExpanded = expandedNodes.has(category.id);

    return (
      <motion.div
        key={category.id}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.5 }}
        className="w-full mb-6"
      >
        <motion.div
          onClick={() => toggleNode(category.id)}
          className={`
            relative cursor-pointer
            rounded-xl p-6
            border border-gray-800
            backdrop-blur-lg
            ${isExpanded ? 'bg-gray-900/90' : 'bg-gray-900/40'}
            hover:bg-gray-900/70
            transition-all duration-300 ease-in-out
            shadow-lg hover:shadow-xl
            group
          `}
          whileHover={{ scale: 1.005 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className={`
            absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl
            bg-gradient-to-b ${category.color}
            opacity-80 group-hover:opacity-100
            transition-opacity duration-300
          `} />
          
          <div className="ml-4 flex justify-between items-center">
            <div className="flex-1">
              <h3 className={`
                text-2xl font-bold
                bg-gradient-to-r ${category.color}
                bg-clip-text text-transparent
                tracking-tight
              `}>
                {category.name}
              </h3>
              <p className="text-gray-400 mt-2 text-sm font-medium">
                {category.description}
              </p>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-400"
            >
              <ChevronRight size={24} />
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 ml-8 space-y-6 overflow-hidden"
            >
              {category.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: idx * 0.1 }
                  }}
                  className="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm
                           border border-gray-800/50 shadow-lg"
                >
                  <h4 className="text-lg font-semibold text-white mb-6 pb-2 
                               border-b border-gray-700/50">
                    {item.name}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {item.techniques.map((technique, techIdx) => (
                      <motion.div
                        key={techIdx}
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: 1,
                          transition: { delay: techIdx * 0.05 }
                        }}
                        whileHover={{ scale: 1.02 }}
                        onHoverStart={() => setHoveredTechnique(`${category.id}-${techIdx}`)}
                        onHoverEnd={() => setHoveredTechnique(null)}
                        className={`
                          px-4 py-3 rounded-lg
                          bg-gray-900/40
                          hover:bg-gray-900/80
                          border-l-2 border-l-${category.glowColor}-500/30
                          hover:border-l-${category.glowColor}-400
                          transition-all duration-300
                          backdrop-blur-sm
                          ${hoveredTechnique === `${category.id}-${techIdx}` ? 'shadow-lg' : 'shadow-md'}
                        `}
                      >
                        <span className="text-gray-300 hover:text-white text-sm font-medium">
                          {technique.name}
                        </span>
                        {hoveredTechnique === `${category.id}-${techIdx}` && (
                          <p className="text-gray-400 text-xs mt-2">
                            {technique.caption}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-16 
                     bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                     bg-clip-text text-transparent
                     tracking-tight"
        >
          Machine Learning Algorithms Hierarchy
        </motion.h1>

        <div className="space-y-8">
          {algorithms.map(renderCategory)}
        </div>
      </div>
    </div>
  );
};

export default MLHierarchy;
