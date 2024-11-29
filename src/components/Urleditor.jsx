import React from 'react';
import  { useState } from 'react';

const UrlEditor = () => {
  const [url, setUrl] = useState(localStorage.getItem('URL_PETICION') || '');

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSave = () => {
    localStorage.setItem('URL_PETICION', url);
    alert('URL_PETICION actualizada correctamente');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '300px', margin: '0 auto' }} >
      <label style={{ display: 'block', marginBottom: '10px' }}>
        Cambiar URL_PETICION:
      </label>
      <input
        type="text"
        value={url}
        onChange={handleInputChange}
        placeholder="Ingrese nueva URL"
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        className="dark:bg-gray-800 dark:text-gray-100"
      />
      <button
        onClick={handleSave}
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '10px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        CAMBIAR
      </button>
    </div>
  );
};

export default UrlEditor;
