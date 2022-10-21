import { useCallback, useState } from "react";

const useExtractColors = () => {
  const [extractColors, setExtractColors] = useState([]);

  const getColors = useCallback((IDs) => {
    fetch(`${window.location.origin}/api/image/extractColors?ids=${IDs}`)
      .then((res) => res.json())
      .then((json) => setExtractColors(JSON.parse(json.data)))
      .catch((error) => console.warn(error));
  }, []);

  return { getColors, extractColors };
};

export default useExtractColors;
