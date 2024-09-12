import React, { useEffect, useState, useRef } from "react";

function Box() {
  const [box1, setbox] = useState([]);
  const inputRef = useRef(null);

  const fetchData = async () => {
    try {
      const API = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=10"
      );
      const data = await API.json();

      setbox((prevData) => [...prevData, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleOnIntersec = (entries) => {
      // console.log(entries);
      if (entries[0].isIntersecting) {
        fetchData();
      }
    };
    const observer = new IntersectionObserver(handleOnIntersec, {
      threshold: 1.0,
    });
    if (inputRef.current) {
      observer.observe(inputRef.current);
    }
    return () => {
      if (inputRef.current) observer.unobserve(inputRef.current);
    };
  }, []);
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div>
      <div>
        {box1.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid blue",
              margin: 12,
              padding: 8,
              height: 100,
            }}
          >
            <div className="box">
              Box {item.id}: {item.title}
            </div>
          </div>
        ))}
      </div>
      <div ref={inputRef}>loading</div>
    </div>
  );
}

export default Box;
