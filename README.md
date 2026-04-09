# 🕯️ The Ashcroft Murder

A fully playable browser-based murder mystery game set in an old English manor during a thunderstorm.

**Estimated playtime:** 15–25 minutes

---

## 🎮 How to Play

1. Open `index.html` in any modern browser — no installation, no build step required.
2. Watch the opening cutscene (click to advance panels).
3. Enter your Inspector's name and begin the investigation.
4. Explore rooms, examine objects, talk to suspects, and collect evidence.
5. When you've pieced together the truth, go to the **Parlour** to make your accusation.
6. If you're right — fight the murderer in the final confrontation.

---

## 🔍 Investigation Tips

- **Talk to everyone.** New dialogue options unlock as you find clues.
- **Examine everything.** Some clues are easy to miss.
- **Read the documents.** The letters, diary, and financial records tell a clear story.
- **Connect the threads.** The Evidence Board (`📋 Evidence` button) tracks everything you've found.
- **Use hints sparingly.** You get 3 — they get more specific each time.
- **The final battle is easier with more evidence.** Every clue you collect becomes an attack.

---

## 🏆 Achievements (12 total)

| Achievement | Description |
|---|---|
| Elementary | Find your first clue |
| No Stone Unturned | Visit every room |
| Conversationalist | Talk to every suspect |
| Sharp Eye | Find all key evidence |
| Bookworm | Read every letter and document |
| Ace Detective | Solve without using hints |
| True Detective | Correct accusation on first try |
| Survivor | Defeat the murderer in combat |
| Into the Storm | Visit the garden |
| Lightning Justice *(secret)* | Solve in under 12 minutes |
| Evidence Master *(secret)* | Use 5+ evidence attacks in combat |
| Meticulous *(secret)* | Find every single clue |

---

## 🌐 Deploying to GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Set the source to **main branch, root folder**.
4. Your game will be live at `https://[username].github.io/[repo-name]/`

No build process, no dependencies, no server required. Pure HTML, CSS, and vanilla JavaScript.

---

## 📁 File Structure

```
/
├── index.html          # Main entry point
├── style.css           # All styling (Gothic Victorian theme)
├── js/
│   ├── story.js        # All game content (rooms, characters, clues, dialogue)
│   └── game.js         # Game engine (rendering, combat, achievements, audio)
└── README.md
```

---

## 🎭 The Story

**England, November 14th, 1921.** Lord Victor Ashcroft has been found dead in his study at Ashcroft Manor. The official verdict is heart failure. His solicitor thinks otherwise.

Six suspects remain in the manor. The roads are flooded. No one can leave.

One of them is a murderer — and they are watching you.

---

*Built with pure vanilla HTML/CSS/JS. No frameworks, no dependencies.*
