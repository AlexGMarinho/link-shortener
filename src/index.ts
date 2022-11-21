import express from "express";
import { nanoid } from "nanoid";

interface UrlDB {
  link: string;
  nunVisited: number;
}

const serverIp = "http://localhost:3030";

const app = express();

app.use(express.json());

const urlDB = new Map<String, UrlDB>();

app.post("/", (req, res) => {
  const { link } = req.body;

  const id = nanoid(5);

  urlDB.set(id, {
    link,
    nunVisited: 0,
  });

  return res.json(`${serverIp}/${id}`);
});

app.get("/:id", (req, res) => {
  const { id } = req.params;

  const url = urlDB.get(id);

  if (url) {
    url.nunVisited += 1;

    return res.redirect(url.link);
  }

  return res.status(404).json({ error: "Not found" });
});

app.get("/:id/info", (req, res) => {
  return res.json({data: urlDB.get(req.params.id)})
})

app.listen(3030, () => console.log("Start"));
