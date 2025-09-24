import { useState, useEffect } from 'react';

export default function CreatorHome() 
{
  const [creator, setCreator] = useState("");

  useEffect(() => {
    const storedCreator = sessionStorage.getItem('creator');
    if (storedCreator) {
      setCreator(JSON.parse(storedCreator));
    }
  }, []);

  return (
    <div>
      <h3>Hello {creator.name}</h3>
    </div>
  );
}
