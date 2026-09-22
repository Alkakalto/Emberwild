# Make Emberwild your own

## File guide

| File | Change here |
| --- | --- |
| `index.html` | Game name, tagline, page structure and metadata |
| `style.css` | Interface colors, layout, responsive sizing |
| `data.js` | Creatures, abilities, items, quests, NPCs, teams and region names |
| `core.js` | Map terrain, tactical combat, quest progress, leveling and save validation |
| `art.js` | Creature designs, tile drawing, buildings, character art |
| `game.js` | Story text, menus, controls, rendering, save/import UI |
| `tests/core.test.js` | Reachability, battle, evolution, save and campaign checks |
| `online.js` | Online room, player syncing, chat and co-op raid client |
| `server.js` | Web host and multiplayer room server |
| `render.yaml` | One-click Render deployment settings |

## Rename the game

Replace visible “Emberwild” and “The Beacon Chronicles” text in `index.html`, `game.js`, and the README. Update the favicon if desired. A repository name can differ from the title because game links use relative paths. GitHub Pages supports solo mode; deploy `server.js` on a Node host for online rooms.

For a completely different game, change `SAVE_KEY` in `data.js` so it does not read the original game's saves. For updates to an existing game, preserve species IDs and the save schema or implement a migration before validation.

## Add a creature

Add an entry in `data.js` under `species`, using a unique lowercase ID:

```js
cloudimp: {
  name: 'Cloudimp', type: 'Spark', color: '#b8c6db', accent: '#f8edb4',
  shape: 'fox', hp: 30, attack: 11, defense: 7,
  skill: 'Sky flicker', description: 'A little cloud with a big personality.'
}
```

Add `'cloudimp'` to a region's `wild` array. Existing drawable shapes are `fox`, `cat`, `stag`, `fin`, `moth`, `rock`, `frog`, `owl`, and `dragon`. Create another branch in `art.js` for an entirely new silhouette. Add `evolve: 'anotherSpeciesId'` to evolve at level 8. Edit `addXP` in `core.js` for different evolution rules.

The journal count is automatic. Companion stats scale with level in `stats()`. Species IDs are stored in saves, so avoid removing or renaming IDs after release without migration.

## Edit maps and story

Each region uses a 28 × 18 grid, with 32-pixel tiles. `tile(area,x,y)` in `core.js` determines terrain. Paths, ground, grass, sand, floors and rugs are walkable. Houses, trees, rocks, water, ruins, crystals, walls, shelves and counters block movement. NPC positions also block movement; players interact from a neighboring tile.

Region definitions in `data.js` set NPC positions, wild species and levels, exits, and trail-cache rewards. Exit `to` points to another region ID; `tx` and `ty` set the arrival tile. Optional `requires` gates an exit behind a crest. `routePath()` and the route terrain rules in `core.js` define each expedition layout. Keep arrival tiles walkable and all story characters and caches reachable. `art.js` draws the matching road surfaces, hazards, landmarks, buildings, bridges, and beacon.

Story progression is explicit. `quest()` and `interact()` in `game.js` handle journal guidance and dialogue. `beginBattle()` and `battleAction()` in `core.js` handle warden teams and rewards. Adding more wardens or crests also requires updating save validation, quest steps, tests, and final-trial requirements.

## Before publishing edits

Run `node --test tests/core.test.js` and play through changed content. Confirm new NPCs are reachable, creature artwork appears, battle buttons work on a narrow screen, and old saves still load. Test the public Pages URL after deployment.

## Suggested future additions

Branching quest choices, dialogue portraits, crafting, accessibility options for the map, persistent server accounts and player trading are useful next steps. This version has online rooms but no cloud story saves, controller support, emulator compatibility or installable mobile package.
