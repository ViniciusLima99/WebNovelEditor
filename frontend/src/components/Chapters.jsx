import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Chapters() {
  const [novel, setNovel] = useState(""); 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [chapters, setChapters] = useState([]); // Adiciona o estado para armazenar os capítulos

  useEffect(() => {
    fetch("http://localhost:3001/chapters")
      .then((res) => res.json())
      .then((data) => setChapters(data)) // Agora o setChapters está definido
      .catch((err) => console.error("Erro ao buscar capítulos:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = "POST";
    const url = "http://localhost:3001/chapters";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ novel, title, content }) 
    })
      .then(() => {
        setNovel("");  
        setTitle("");
        setContent("");
        return fetch("http://localhost:3001/chapters");
      })
      .then((res) => res.json())
      .then((data) => setChapters(data)); // Atualiza os capítulos após o POST
  };

  return (
    <div className="container conteudo mt-5">
      <h2>Adicionar Capítulos</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Novel"
          value={novel}
          onChange={(e) => setNovel(e.target.value)}
          required
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Título do Capítulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="form-control mb-2"
          placeholder="Conteúdo do Capítulo"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="btn btn-primary">Adicionar</button>
      </form>
    </div>
  );
}

export default Chapters;
