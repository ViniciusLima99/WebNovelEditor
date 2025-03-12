import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";  // useNavigate ao invés de useHistory
import "bootstrap/dist/css/bootstrap.min.css";

function EditChapter() {
  const { id } = useParams(); // Pega o ID do capítulo na URL
  const navigate = useNavigate(); // Redireciona após a atualização
  const [novel, setNovel] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/chapters/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNovel(data.novel);
        setTitle(data.title);
        setContent(data.content);
      })
      .catch((err) => console.error("Erro ao buscar capítulo:", err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3001/chapters/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ novel, title, content }),
    })
      .then(() => {
        navigate("/"); // Redireciona para a home após salvar
      })
      .catch((err) => console.error("Erro ao atualizar capítulo:", err));
  };

  return (
    <div className="container mt-5">
      <h2>Editar Capítulo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Nome do Livro"
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
        <button type="submit" className="btn btn-primary">Atualizar Capítulo</button>
      </form>
    </div>
  );
}

export default EditChapter;
