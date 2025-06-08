const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const bodyParser = require("body-parser");
const { NFC } = require("nfc-pcsc"); // NFC integration

const app = express();
const db = new sqlite3.Database("./database.db");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// Create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )
`);

// Save contact and trigger NFC write
app.post("/save-contact", (req, res) => {
  const { name, email } = req.body;
  const stmt = db.prepare("INSERT INTO contacts (name, email) VALUES (?, ?)");
  stmt.run(name, email, function(err) {
    if (err) {
      return res.status(500).json({ error: "Database insert error" });
    }

    const contactId = this.lastID;
    const link = `https://your-ngrok-url.ngrok-free.app/contact?id=${contactId}`;

    // NFC WRITING LOGIC
    const nfc = new NFC(); // auto-detect reader
    nfc.on("reader", reader => {
      console.log(`Reader detected: ${reader.reader.name}`);
      reader.on("card", async card => {
        console.log("Card detected, writing data...");

        const message = [
          {
            tnf: 1,
            type: Buffer.from("U"), // URI Record
            payload: Buffer.concat([
              Buffer.from([0x00]), // URI Prefix: 0x00 means no prefix
              Buffer.from(link)
            ])
          }
        ];

        try {
          await reader.write(message);
          console.log("Link written to NFC tag!");
          reader.close(); // optional: close after writing
        } catch (err) {
          console.error("Error writing to NFC tag:", err);
        }
      });
    });

    res.json({ id: contactId, link: link });
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
