import React, { useEffect, useState } from 'react';

export const useDocument = () => {
  const [myDocument, setMyDocument] = useState(null);

  useEffect(() => {
    return setMyDocument(document);
  }, []);

  return myDocument;
};
