function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    var body = req.body;
    if (typeof body === "string") {
      try { body = JSON.parse(body || "{}"); } catch (e) { body = {}; }
    }
    body = body || {};
    var name = (body.name || "").toString().trim();
    var email = (body.email || "").toString().trim();
    var message = (body.message || "").toString().trim();

    if (!name || !email || !message) {
      res.status(400).json({ error: "Please fill in all fields." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: "Invalid email address." });
      return;
    }

    var apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "Email service is not configured yet." });
      return;
    }

    var to = process.env.CONTACT_TO || "avidharani110@gmail.com";
    var from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";

    var html =
      '<div style="font-family:Arial,sans-serif;font-size:15px;color:#0b1a33">' +
      "<h2 style=\"color:#12245c\">New message from your portfolio</h2>" +
      "<p><strong>Name:</strong> " + escapeHtml(name) + "</p>" +
      "<p><strong>Email:</strong> " + escapeHtml(email) + "</p>" +
      "<p><strong>Message:</strong></p>" +
      '<p style="white-space:pre-wrap;background:#f4f7ff;padding:14px;border-radius:8px">' +
      escapeHtml(message) + "</p></div>";

    var resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: from,
        to: [to],
        reply_to: email,
        subject: "New portfolio message from " + name,
        text: "Name: " + name + "\nEmail: " + email + "\n\n" + message,
        html: html
      })
    });

    if (!resp.ok) {
      var detail = await resp.text();
      res.status(502).json({ error: "Could not send message.", detail: detail });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
