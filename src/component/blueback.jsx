import React from 'react';
import { useNavigate } from 'react-router-dom';
export const BackButton2 = (color = "Black") => {
    const navigate = useNavigate();
  
    return (
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor:'transparent',
          border:'none',
          cursor:'pointer',      
          color:color,
          fontWeight:'bold',
          marginRight:'10px',
          fontSize:'40px',
          marginTop:'10px',  
        }}
        
      >
      <span>&#8592;</span>
      </button>
    );
  };