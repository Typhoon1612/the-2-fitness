# Our Fitness — Private Workout Website

A simple, code-edited website for two people. It has no on-page editing buttons, login, backend or database.

## Files

| File         | Purpose                                                                     | Edit it when…                        |
| ------------ | --------------------------------------------------------------------------- | ------------------------------------ |
| `data.js`    | **All content**: Plan A exercises, Plan B, weekly schedule.                 | You change the workout or schedule.  |
| `index.html` | Page structure and fixed text (headings, training reminders, priorities).   | You change the page layout.          |
| `styles.css` | Colours, spacing and layout.                                                | You change how the page looks.       |
| `app.js`     | Reads `data.js`, checks it for mistakes and builds the page.                | Rarely — only for new page features. |

`data.js` is the single source of truth. The workout is not written anywhere else, so there is only one place to update.

## Open the website

1. Keep all four files together in the same folder.
2. Double-click `index.html` to open it in Chrome, Edge or another modern browser.
3. After editing a file, save it and refresh the browser.

## Change an exercise

Open `data.js` in VS Code. Each line inside `exercises: [ ... ]` is one row of the Plan A table and one exercise note card.

```js
{ name: "Plank", category: "core", sets: "2", reps: "30 sec", focus: "Core stability", note: "Keep your body in a straight line and breathe normally." }
```

- `category` must be `"cardio"`, `"strength"` or `"core"`. The "strength movements" and "core exercises" numbers at the top of Plan A are counted from it automatically.
- To add an exercise, copy a line, paste it as a new line, and change its values. Keep a comma between lines.
- Plan B and the weekly schedule are edited the same way, further down in `data.js`.

## If something goes wrong

If `data.js` has a mistake (for example a missing comma or quotation mark, or an unknown category), the page shows a red message at the top explaining what to fix. Press F12 and open the **Console** tab for full details.
