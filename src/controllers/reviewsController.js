import { getConnection } from "../db/db.js";

export async function addReview(req, res) {
  const { id } = req.params;
  const { reviewAuthor, reviewText, rating } = req.body;

  if (!reviewAuthor || !reviewText || !rating) {
    return res.status(400).json({ error: "Alle felter er påkrevd" });
  }
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("movieId", id)
      .input("reviewAuthor", reviewAuthor)
      .input("reviewText", reviewText)
      .input("rating", rating)
      .query(
        "INSERT INTO dbo.Reviews (movieId, reviewAuthor, reviewText, rating) VALUES (@movieId, @reviewAuthor, @reviewText, @rating)"
      );
    res.status(201).json({ message: "Anmeldelse lagt til" });
  } catch (error) {
    console.error("Feil:", error);
    res
      .status(500)
      .json({ error: "Noe gikk galt ved oppretting av anmeldelsen" });
  }
}

export async function getAllReviews(req, res) {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("movieId", id)
      .query("SELECT * FROM dbo.Reviews WHERE movieId = @movieId");

    res.json(result.recordset);
  } catch (error) {
    console.error("Feil:", error);
    res.status(500).json({ error: "Noe gikk galt ved henting av anmeldelser" });
  }
}
