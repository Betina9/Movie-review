import { getConnection } from "../db/db.js";

export async function getAllMovies(req, res) {
  try {
    console.log(" GET /movies ble kalt");

    const pool = await getConnection();
    console.log(" Tilkoblet til DB!");

    const result = await pool.request().query("SELECT * FROM dbo.Movies");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(" FULL FEIL:", error);
    res.status(500).json({ error: "Noe gikk galt ved henting av filmer" });
  }
}

export async function getMovieById(req, res) {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", id)
      .query("SELECT * FROM dbo.Movies WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Film ikke funnet" });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Feil:", error);
    res.status(500).json({ error: "Noe gikk galt ved henting av filmen" });
  }
}

export async function addMovie(req, res) {
  try {
    const { title, director, releaseYear, genre } = req.body;

    if (!title || !director || !releaseYear || !genre) {
      return res.status(400).json({ error: "Alle felter er påkrevd" });
    }

    const pool = await getConnection();
    await pool
      .request()
      .input("title", title)
      .input("director", director)
      .input("releaseYear", releaseYear)
      .input("genre", genre)
      .query(
        "INSERT INTO dbo.Movies (title, director, releaseYear, genre) VALUES (@title, @director, @releaseYear, @genre)"
      );

    res.status(201).json({ message: "Film lagt til" });
  } catch (error) {
    console.error("Feil ved opprettelse:", error);
    res.status(500).json({ error: "Noe gikk galt ved opprettelse av filmen" });
  }
}

export async function updateMovie(req, res) {
  const { id } = req.params;
  const { title, director, releaseYear, genre } = req.body;

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("id", id)
      .input("title", title)
      .input("director", director)
      .input("releaseYear", releaseYear)
      .input("genre", genre)
      .query(
        "UPDATE dbo.Movies SET title = @title, director = @director, releaseYear = @releaseYear, genre = @genre WHERE id = @id"
      );
    res.status(200).json({ message: "Film oppdatert" });
  } catch (error) {
    console.error("Feil:", error);
    res.status(500).json({ error: "Noe gikk galt ved oppdatering av filmen" });
  }
}
