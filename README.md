# Visual Line Numbers

Visual Line Numbers puts a number on every display row of the editor gutter. A long paragraph that wraps onto five rows gets five numbers, not one. In relative and hybrid mode the numbers count rows from the cursor, so a counted Vim motion such as 5gj lands on the row that shows 5.

Core line numbers give a wrapped line one number. If you map j and k to gj and gk, the gutter count does not match the motion. This plugin counts the rows that the editor draws.

<img src="https://raw.githubusercontent.com/theluckystrike/visual-line-numbers/HEAD/docs/cursor-moves.gif" alt="The numbers in the gutter change as the cursor moves down a note with wrapped paragraphs and back up" width="720">

## Features

### A number on every wrapped row

Relative mode is the default. The row with the cursor shows 0. The rows above and below show how many rows away they are. A paragraph that wraps onto four rows shows four numbers, so you can count rows without counting lines.

<img src="https://raw.githubusercontent.com/theluckystrike/visual-line-numbers/HEAD/docs/relative-mode.png" alt="Relative numbers in the gutter next to a note with two wrapped paragraphs and a wrapped list item" width="720">

### Hybrid mode

Hybrid mode gives the same counts. The cursor row shows the line number of the cursor line instead of 0, as Vim does with both options on. You see where you are in the note and how far each row is.

<img src="https://raw.githubusercontent.com/theluckystrike/visual-line-numbers/HEAD/docs/hybrid-mode.png" alt="Hybrid numbers with the line number 5 on the cursor row and distances on the other rows" width="720">

### Absolute mode

Absolute mode shows the line number on the first row of each line. The rows that a long line wraps onto have no number, so the gutter matches the line numbers that other tools and error messages use.

<img src="https://raw.githubusercontent.com/theluckystrike/visual-line-numbers/HEAD/docs/absolute-mode.png" alt="Absolute line numbers on the first row of each line, with no number on the wrapped rows" width="720">

### Count folded lines (Pro)

Turn on "Count folded lines" and each line that a fold hides takes one count. The number of the row below a fold then matches the document lines between it and the cursor. With the option off, a fold counts as the one row that you see.

<img src="https://raw.githubusercontent.com/theluckystrike/visual-line-numbers/HEAD/docs/fold-aware.png" alt="Three folded sections with relative numbers 2, 9 and 14 because the hidden lines are counted" width="720">

### Highlight the current row (Pro)

The number of the cursor row is shown in bold, in the accent color, with a tinted background.

<img src="https://raw.githubusercontent.com/theluckystrike/visual-line-numbers/HEAD/docs/current-row.png" alt="The cursor row number highlighted in the gutter in hybrid mode" width="720">

### Motion hint (Pro)

Hover over a number to see the Vim motion that reaches that row, such as 5gj for a row five rows below the cursor, or 3gk for a row three rows above.

<img src="https://raw.githubusercontent.com/theluckystrike/visual-line-numbers/HEAD/docs/motion-hint.png" alt="The hint 5gj next to the number 5 in the gutter" width="720">

### Per-note property (Pro)

Add `visual-line-numbers: false` to the properties of a note to hide the gutter in that note. Every other note keeps its gutter. Use it for notes with long prose, where numbers add noise.

<img src="https://raw.githubusercontent.com/theluckystrike/visual-line-numbers/HEAD/docs/note-property.png" alt="A note with the property visual-line-numbers set to false" width="720">

### A color for each mode (Pro)

Choose one color for absolute numbers, one for relative numbers, and one for the line number on the cursor row in hybrid mode. Without a chosen color, the numbers use the theme.

<img src="https://raw.githubusercontent.com/theluckystrike/visual-line-numbers/HEAD/docs/mode-colors.png" alt="Relative numbers in blue and the hybrid cursor line number in orange" width="720">

## Install

1. Open "Settings → Community plugins" and turn off restricted mode.
2. Select "Browse", search for "Visual Line Numbers", then select "Install" and "Enable".
3. Open "Settings → Editor" and turn off "Show line numbers". Two gutters of numbers would show together.

To install by hand, copy `main.js`, `manifest.json` and `styles.css` from the latest release into `<vault>/.obsidian/plugins/visual-line-numbers/`. Then enable the plugin. You need Obsidian 1.13.4 or later. The plugin works on desktop and on mobile.

## Usage

The gutter is on after you enable the plugin. Open a note in Live Preview or Source mode and look at the left of the text.

The plugin adds these commands to the command palette:

- Toggle the number gutter: turns the gutter on or off.
- Cycle number mode: goes from absolute to relative to hybrid and back.
- Use absolute numbers, Use relative numbers, Use hybrid numbers: set one mode.

To make counted Vim motions follow the display rows, turn on Vim key bindings in "Settings → Editor" and map j and k to gj and gk. For example, with the community plugin Vimrc Support, add `nmap j gj` and `nmap k gk` to your vimrc file. Then 5j moves five display rows, and the row that shows 5 in the gutter is the row where the cursor lands.

## Pro

The free version has the gutter, the three modes, the commands and the settings tab.

Pro adds counting of folded lines, the per-note property, the current row highlight, the motion hint and a color for each mode. To get it:

1. Sponsor [theluckystrike on GitHub Sponsors](https://github.com/sponsors/theluckystrike) with $5 a month, or $15 once. A total payment of $15 meets the payment requirement for Pro without further payment. Sign-in and the checks below still apply.
2. In Obsidian, open the settings of Visual Line Numbers and select "Sign in with GitHub".
3. The plugin copies a code and opens github.com/login/device. Paste the code there and approve.

The status line then shows your GitHub login and the tier. If you sponsor after you sign in, select Refresh. A negative sponsorship answer turns Pro off. See [Payment, account and network](#payment-account-and-network) for the check and offline limits. Your Pro choices stay saved and work again when Pro is on.

## Settings

| Setting | What it does |
| --- | --- |
| Show the gutter | Turns the numbers on or off for all notes. |
| Number mode | Relative, hybrid or absolute. The default is relative. |
| Count folded lines (Pro) | Each line hidden in a fold takes one count. |
| Per-note property (Pro) | Reads `visual-line-numbers: false` from the properties of a note. |
| Highlight the current row (Pro) | Bold number and tinted background on the cursor row. |
| Motion hint (Pro) | Hover text with the Vim motion that reaches a row. |
| Absolute, relative and hybrid cursor colors (Pro) | A color for each mode. Reset colors goes back to the theme. |

Turn off a Pro setting and the plugin goes back to the free behavior at once. The settings tab also has the Pro section with sign in, status and Refresh.

## FAQ

### How does it count the rows?

When the editor draws a line, the plugin asks the editor where each display row of the line ends, with the public CodeMirror function `EditorView.moveToLineBoundary`. It does this for the lines on screen and nothing else. The plugin changes no Obsidian code and no internal object.

### Are the numbers exact?

On screen, yes: the counts come from the rows that the editor draws. The cursor can be off screen. The editor then has only estimated heights for lines that it has not drawn, so the relative numbers on screen are close but not exact until the cursor line is on screen again. Absolute mode and the cursor line number in hybrid mode are exact, because they come from the document.

### Does a fold count as one row?

Yes, by default. A folded section is drawn as one row, so it counts as one. With Pro, "Count folded lines" counts every hidden line as well.

### Does it slow down long notes?

The plugin measures only the lines on screen. It measures again when the note, the scroll position or the window width changes.

### Does it change my notes or sync data?

No. The settings are in `data.json` in the plugin folder. The GitHub token for Pro, if you sign in, is in the secret storage of Obsidian on that device.

## Payment, account and network

The core features are free. Pro features need a GitHub Sponsors sponsorship of theluckystrike: $5 a month or more, or $15 once. A total payment of $15 meets the payment requirement for Pro without further payment. Sign-in and the checks below still apply. Your notes stay readable and editable with or without Pro.

GitHub handles the payment. Sponsor at https://github.com/sponsors/theluckystrike. You need no account for the free features. Pro needs the GitHub account that sponsors.

Until you select "Sign in with GitHub" in the settings, Visual Line Numbers makes no network requests. Sign in uses the GitHub device flow. Visual Line Numbers sends its public client ID and the scope `read:user` to `https://github.com/login/device/code` and shows you a code. While you enter the code at https://github.com/login/device, it asks `https://github.com/login/oauth/access_token` every few seconds to check the sign-in status. The scope permits profile reads only. GitHub needs this access to show the sponsorship tier. It grants no repository scope and no write access.

After sign in, Visual Line Numbers sends one query to `https://api.github.com/graphql`. It checks if the signed-in account sponsors theluckystrike. It asks for the tier and the total payment to theluckystrike. The plugin reuses a successful check for 7 days. Failed checks can retry after 6 hours. Select Refresh to request an earlier check. It sends no note content, file names or other vault data, and it has no telemetry.

After a successful check, Pro can work offline for up to 14 days. Sign out or a negative sponsorship answer turns Pro off. The plugin stores the GitHub token through the secret storage API of Obsidian. It does not put the token in its saved settings or its local sponsorship data. The local storage of this device keeps your GitHub login, the tier and the time of the last check. Sign out clears the token. You can also revoke the access in your GitHub settings, under Applications.

## Support

Report bugs and ask for features in the GitHub issues of this repository. Add your Obsidian version, your number mode and a small sample note.

```
npm ci
npm run build
npm test
```

## License

MIT
