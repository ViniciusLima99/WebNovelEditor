import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [groupedChapters, setGroupedChapters] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/chapters")
      .then((res) => res.json())
      .then((data) => {
        const grouped = data.reduce((acc, chapter) => {
          if (!acc[chapter.novel]) {
            acc[chapter.novel] = [];
            console.log('teste')
          }
          acc[chapter.novel].push(chapter);
          return acc;
        }, {});
        setGroupedChapters(grouped);
      })
      .catch((err) => console.error("Erro ao buscar capítulos:", err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/chapters/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setGroupedChapters((prev) => {
          const updatedGroups = { ...prev };
          for (const novel in updatedGroups) {
            updatedGroups[novel] = updatedGroups[novel].filter((chapter) => chapter.id !== id);
            if (updatedGroups[novel].length === 0) {
              delete updatedGroups[novel];
            }
          }
          return updatedGroups;
        });
      })
      .catch((err) => console.error("Erro ao deletar capítulo:", err));
  };

  return (
    <div className="container conteudo mt-5">
      {Object.keys(groupedChapters).length > 0 ? (
        Object.keys(groupedChapters).map((novel) => (
          <div key={novel} className="mb-4">
            <h3>{novel}</h3>
            <ul className="list-group">
              {groupedChapters[novel].map((chapter) => (
                <li key={chapter.id} className="list-group-item d-flex justify-content-between">
                  <span>{chapter.title}</span>
                  <div>
                    <a href={`/edit/${chapter.id}`} className="btn btn-sm btn-warning me-2">
                      Editar
                    </a>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(chapter.id)}>
                      Deletar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <h3 className="text-center text-white mt-5">Aqui estarão seus próximos capítulos</h3>
      )}
    </div>
  );
}

export default Home;
