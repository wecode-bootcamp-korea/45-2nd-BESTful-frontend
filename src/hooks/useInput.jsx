import { useState } from 'react';

const useInput = init => {
  const [state, setState] = useState(init);

  const handleState = e => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  return [state, handleState];
};

export default useInput;
