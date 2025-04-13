
import React from 'react';
import Settings from '@/components/Settings';
import { useNavigate } from 'react-router-dom';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleClose = () => {
    navigate('/app');
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Settings onClose={handleClose} />
    </div>
  );
};

export default SettingsPage;
