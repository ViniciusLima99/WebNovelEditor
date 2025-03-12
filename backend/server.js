const express = require("express");
const pool = require("./db"); // Apenas importa o pool de conexões
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Rota para buscar capítulos
app.get("/chapters", async (req, res) => {
  console.log("Requisição GET /chapters recebida");
  try {
    const [rows] = await pool.query("SELECT * FROM chapters ORDER BY novel");
    console.log("Resultados obtidos:", rows);
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar capítulos:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Rota para adicionar um capítulo
app.post("/chapters", async (req, res) => {
  console.log("Requisição POST /chapters recebida com dados:", req.body);
  try {
    const { title, content, novel } = req.body;
    const [result] = await pool.query(
      "INSERT INTO chapters (title, content, novel) VALUES (?, ?, ?)",
      [title, content, novel]
    );
    console.log("Capítulo adicionado com ID:", result.insertId);
    res.json({ message: "Capítulo adicionado", id: result.insertId });
  } catch (err) {
    console.error("Erro ao adicionar capítulo:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Rota para atualizar um capítulo
app.put("/chapters/:id", async (req, res) => {
  console.log(`Requisição PUT /chapters/${req.params.id} recebida com dados:`, req.body);
  try {
    const { title, content, novel } = req.body;
    const { id } = req.params;
    await pool.query(
      "UPDATE chapters SET title = ?, content = ?, novel = ? WHERE id = ?",
      [title, content, novel, id]
    );
    console.log(`Capítulo com ID ${id} atualizado`);
    res.json({ message: "Capítulo atualizado" });
  } catch (err) {
    console.error("Erro ao atualizar capítulo:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Rota para buscar um capítulo específico por ID
app.get("/chapters/:id", async (req, res) => {
  console.log(`Requisição GET /chapters/${req.params.id} recebida`);
  try {
    const { id } = req.params;
    const [results] = await pool.query("SELECT * FROM chapters WHERE id = ?", [id]);
    if (results.length === 0) {
      console.log(`Capítulo com ID ${id} não encontrado`);
      return res.status(404).json({ error: "Capítulo não encontrado" });
    }
    console.log("Capítulo encontrado:", results[0]);
    res.json(results[0]);
  } catch (err) {
    console.error("Erro ao buscar capítulo:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Rota para deletar um capítulo por ID
app.delete("/chapters/:id", async (req, res) => {
  console.log(`Requisição DELETE /chapters/${req.params.id} recebida`);
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM chapters WHERE id = ?", [id]);
    console.log(`Capítulo com ID ${id} deletado`);
    res.json({ message: "Capítulo deletado" });
  } catch (err) {
    console.error("Erro ao deletar capítulo:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Iniciar o servidor
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
