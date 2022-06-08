import React from 'react';
import Feed from '../components/feed.jsx';
import Button from '@mui/material/Button';


const Features = () => {
  return (
    <div>
      <h1 id="features">Features</h1>
      <div id="featureControls">
      <Button variant="contained" id="featureButton">Add Feature</Button>
      </div>
    <Feed />
    </div>
  )
}

export default Features; 