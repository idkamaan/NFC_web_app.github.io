# NFC Contact Form Web Application

This is a full-stack web application that integrates NFC (Near Field Communication) technology to enhance data interaction. Users can submit a simple form containing their name and email. Once submitted, the information is stored in a SQLite database, and a unique contact URL is generated and written to an NFC tag. This URL can later be accessed via an NFC-enabled device.

---

## Features

- Responsive, modern UI built using Tailwind CSS
- Backend powered by Node.js and Express
- SQLite database for persistent contact storage
- NFC writing capability using:
  - Web NFC API (for mobile devices)
  - Desktop NFC reader using `nfc-pcsc`

## Technologies Used

- **Frontend:** HTML5, CSS (Tailwind), JavaScript
- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **NFC Support:** Web NFC API and `nfc-pcsc` (Node NFC)


This project demonstrates the use of NFC in a web environment. When a user submits their name and email, the data is stored in a database, and a unique link is generated. This link is then written to an NFC tag using either Web NFC (on mobile devices) or a USB NFC reader. The purpose of this integration is to explore efficient and touchless data sharing techniques using modern web technologies.