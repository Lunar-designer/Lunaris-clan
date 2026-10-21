# 🌙 LUNARIS — Premium Roblox TSB Clan Website

> **Motto:** *RULE THE NIGHT. RISE ABOVE ALL.*  
> **Game:** *Roblox • The Strongest Battlegrounds (TSB)*  
> **Aesthetic:** *Dark Lunar • Competitive • Cinematic • Mysterious • Fluid*

A complete, production-ready, dark celestial website engineered specifically for the competitive Roblox TSB clan **LUNARIS**.

---

## 📁 Project Structure

```
lunaris-tsb-clan/
├── index.html                  # Semantic single-page website layout
├── favicon.svg                 # Custom glowing lunar crescent vector favicon
├── css/
│   ├── main.css                # Lunar design system tokens, typography & layout
│   ├── animations.css          # Timed hero sequence, reveals, & reduced-motion rules
│   └── responsive.css          # Mobile drawer and multi-breakpoint layouts
├── js/
│   ├── clan-config.js          # ⭐ MASTER CONFIG: Update members, links, & rules here!
│   ├── starfield.js            # Ambient canvas cosmic starfield & dust particles
│   ├── animations.js           # Scroll observer, scroll progress bar, & parallax
│   └── main.js                 # Dynamic rendering, accordions, & recruitment logic
├── assets/
│   ├── logo-crest.jpg          # Clan crest emblem (esports lunar wing)
│   ├── logo-badge.jpg          # Clan badge emblem (minimalist blade & moon)
│   └── placeholder-avatar.svg  # Stylized Roblox placeholder avatar for roster
└── README.md                   # Documentation, deployment guide, & customization notes
```

---

## ⚡ How to Run Locally

You can run this website instantly without installing any heavy build tools:

### Option 1: Direct Browser Launch
Simply double-click `index.html` or drag it into any modern web browser (Chrome, Edge, Firefox, Brave, Safari).

### Option 2: Local HTTP Server (Recommended)
Using a lightweight local web server ensures all assets and modules load with optimal performance:

**Using Python (built into Windows/Mac/Linux):**
```bash
# In your terminal inside the lunaris-tsb-clan folder:
python -m http.server 3000
```
Then visit: `http://localhost:3000`

**Using Node.js (npx):**
```bash
npx serve .
```

---

## 🛠️ How to Customize Clan Information

All editable clan data is centralized in a single file:  
`js/clan-config.js`

Open [js/clan-config.js](file:///C:/Users/shelt/.gemini/antigravity-ide/scratch/lunaris-tsb-clan/js/clan-config.js) in your editor to change:

1. **Discord Server Invite:**
   ```javascript
   discordInvite: "https://discord.gg/YOUR_INVITE_CODE",
   ```
2. **Roblox Group Link:**
   ```javascript
   robloxGroup: "https://www.roblox.com/groups/YOUR_GROUP_ID",
   ```
3. **Members Showcase:**
   Add, update, or remove members in the `members` array:
   ```javascript
   {
     robloxUsername: "YourRobloxUsername",
     displayName: "YourDisplayName",
     avatar: "assets/placeholder-avatar.svg", // or URL to your Roblox headshot
     discordUsername: "discord_handle",
     bio: "Saitama & Garou counter specialist with sharp neutral play."
   }
   ```
   *Note: In accordance with your clan guidelines, no ranks, leadership titles, or artificial tiers are shown.*

4. **Recruitment Discord Webhook (Optional):**
   If you want application submissions sent straight to your Discord staff channel:
   - Create a webhook in Discord: *Server Settings → Integrations → Webhooks → New Webhook*.
   - Copy the Webhook URL.
   - Paste it into:
     ```javascript
     recruitmentWebhookUrl: "https://discord.com/api/webhooks/...",
     ```
   *If left empty, the website runs in client demonstration mode with validation feedback.*

5. **Clan Statistics & Achievements:**
   Update your verified stats when your competitive season begins in the `statistics` array.

---

## 🚀 How to Publish to GitHub Pages (Free)

1. Create a new GitHub repository (e.g. `lunaris-tsb`).
2. Push or upload the contents of `lunaris-tsb-clan` to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Lunaris TSB Clan website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/lunaris-tsb.git
   git push -u origin main
   ```
3. In GitHub, go to **Settings → Pages**.
4. Under **Source**, select **Deploy from a branch** → Branch: `main` / `/ (root)` → Click **Save**.
5. Your website will be live at `https://YOUR_USERNAME.github.io/lunaris-tsb/` within 60 seconds!

---

## 🛡️ Static Hosting & Security Notes

- **Credentials Safety:** The recruitment form explicitly guards against passwords and sensitive account credentials. No Roblox passwords or account logins are ever requested or stored.
- **Backend Transparency:** Pure static hosting (like GitHub Pages) does not include a private SQL database. Applications are either delivered in real-time to your secure Discord staff webhook or verified in demonstration mode.
- **Accessibility:** All animations strictly respect user system preferences (`prefers-reduced-motion: reduce`).
