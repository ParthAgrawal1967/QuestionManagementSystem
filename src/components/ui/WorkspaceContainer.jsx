import React from 'react';

const WorkspaceContainer = ({ children, className = '' }) => {
  return (
    <div className="workspace-container">
      <div className={`workspace-content ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default WorkspaceContainer;