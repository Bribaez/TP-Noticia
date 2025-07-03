import { useState, useEffect } from "react";

export function useNoticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts") // API falsa de noticias
      .then((res) => res.json())
      .then((data) => setNoticias(data));
  }, []);

  return [noticias];
}
