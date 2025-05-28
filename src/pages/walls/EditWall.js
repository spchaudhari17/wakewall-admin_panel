import React from 'react';
import { useParams } from 'react-router-dom';

const EditWall = () => {
    
    const {id} = useParams()

  return (
    <>
      <h1>Edit Wall -- {id} </h1>
    </>
  );
}

export default EditWall;
