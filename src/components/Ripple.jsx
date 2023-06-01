import React, { useState, useLayoutEffect } from "react";

// Custom hook for debounced ripple cleanup
const useDebouncedRippleCleanUp = (rippleCount, cleanUpFunction) => {
  useLayoutEffect(() => {
    let bounce = null;
    if (rippleCount > 0) {
      clearTimeout(bounce);

      // Set a timeout to clean up ripples after 650 milliseconds
      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce);
      }, 650);
    }

    // Clean up the timeout when the component unmounts or 'rippleCount' changes
    return () => clearTimeout(bounce);
  }, [rippleCount, cleanUpFunction]);
};

const Ripple = (props) => {
  const { color = "#fff" } = props;
  const [rippleArray, setRippleArray] = useState([]);

  // Custom hook to clean up ripples with a debounce effect
  useDebouncedRippleCleanUp(rippleArray.length, () => {
    setRippleArray([]);
  });

  // Function to add a new ripple on click
  const addRipple = (event) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;
    const x = event.pageX - rippleContainer.x - size / 2;
    const y = event.pageY - rippleContainer.y - size / 2;
    const newRipple = {
      x,
      y,
      size,
    };

    // Add the new ripple to the 'rippleArray' state
    setRippleArray([...rippleArray, newRipple]);
  };

  return (
    <div className="ripple" color={color} onMouseDown={addRipple}>
      {/* Render the ripples */}
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
            <span
              key={"span" + index}
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
                backgroundColor: color,
              }}
            />
          );
        })}
    </div>
  );
};

export default Ripple;
