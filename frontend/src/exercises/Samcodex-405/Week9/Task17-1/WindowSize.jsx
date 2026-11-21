
import { useEffect, useState } from "react";

function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section>
      <h2>Window Size</h2>
      <p>Width: {size.width}px</p>
      <p>Height: {size.height}px</p>
    </section>
  );
}

export default WindowSize;
