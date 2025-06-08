document.getElementById("userForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  try {
    // Send data to server and receive contact ID
    const res = await fetch("/save-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    });

    const { id } = await res.json();
    const link = `https://yourdomain.com/contact/${id}`;

    // NFC Write
    if ("NDEFWriter" in window) {
      const writer = new NDEFWriter();
      await writer.write({ records: [{ recordType: "url", data: link }] });
      alert("NFC Tag written successfully!");
    } else {
      alert("NFC not supported on this device.");
    }

  } catch (err) {
    console.error(err);
    alert("An error occurred.");
  }
});
