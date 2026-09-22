# Validation notes (v1 baseline)

Validated on 21 September 2026.

## Automated game rules

`node --test tests/core.test.js`: **10 tests passed**.

The suite checks map connectivity and NPC/exit reachability; capture rewards and restrictions; elemental damage; all starter evolutions; complete campaign simulations with each starter after training; defeat recovery; guarding and switching; malformed save rejection; and invalid battle actions.

## Browser validation

Headless Microsoft Edge, desktop viewport 1440 × 1100 and phone-sized viewport 390 × 844:

- Starter selection, keyboard movement, touch buttons, NPC interaction and supply rewards.
- Team management, journal and help dialogs.
- Wild encounter, catching, encounter completion, autosave and reload.
- Save export, validated import, invalid-file rejection and new-game confirmation.
- Shop purchase with correct inventory and currency changes.
- All five warden challenges, crest rewards, final story battle, ending dialog and Solwyrm reward.
- No uncaught browser JavaScript errors in the tested flows.
- Mobile page and team dialog checked for horizontal overflow.
- Desktop and mobile screenshots visually inspected.

The browser story test used a trained companion fixture to exercise the story screens quickly. The separate game-rule tests simulate training and completion for all three starters. These are functional checks, not an exhaustive balance study.

The original single-player release passed these checks. Version 2 adds a full-screen shell and online rooms; see the current README for deployment details. A live deployment to your hosting account has not been performed. Safari, Firefox, real mobile devices, and assistive-technology map navigation have not been tested.

## Version 2 browser validation

Two isolated browser sessions were used as separate devices. Checks passed for the title screen, new-game flow, full-screen game shell, room creation and joining, two-player presence, movement synchronization, escaped room chat, shared raid damage, room departure, sound toggle, pause menu, and 390 × 844 mobile layout. No uncaught JavaScript errors occurred. The live `/health` endpoint and all client/server syntax checks also passed.

## Version 2.1 expansion validation

Automated connectivity checks cover every NPC and exit across all ten maps. Browser checks cover entering and leaving an interior, free healing, buying a discounted market bundle, claiming a bounty exactly once, rendering the four new frontier regions, triggering a frontier encounter, battle animation timing, all six redesigned commands, and a 390 × 844 battle layout. Battle buttons do not overlap each other, and exploration touch controls are hidden during combat so they cannot obscure commands or messages.

Separate phone-size checks confirm that the market, pause menu, party management, atlas/journal, and online-room forms fit within the viewport without horizontal overflow.

## Version 2.2 ten-region expedition validation

The campaign suite now simulates the complete five-crest story with every starter, including training through the ten added regions and the level-23 beacon trial. All 20 map definitions pass exit and NPC reachability checks.

Browser checks load and render each new region, confirm the Reed, Tide, Ember, Sky, and Stone route gates, open a new warden encounter, enforce the five-crest final lock, and verify all 17 outdoor maps in the atlas. The Aurora Peak layout was visually inspected at 1280 × 820. No uncaught browser JavaScript errors occurred.

## Version 2.3 shop and building validation

The market flow verifies six illustrated offers, live shard and pack counts, bundle purchasing, inventory and currency updates, purchase feedback, and insufficient-funds handling. The shop and guild contract board fit desktop and 390 × 844 phone viewports without horizontal overflow. The new market interior was visually inspected with its lighting, stock shelves, counter display, crates, and interaction markers. Rest-house healing still restores the party immediately and now adds visual and sound feedback.

## Version 2.4 exploration validation

Automated checks compare the walkable signatures and regional road surfaces of all ten expedition maps, confirm that every layout is unique, and verify that each hidden cache is reachable. A complete gallery was rendered and visually inspected for switchbacks, boardwalks, lava roads, ice trails, crystal mazes, reclaimed ruins, flooded causeways, skybridges, star paths, aurora trails, and their individual landmarks. The browser flow opens a cache, grants its exact rewards once, records the discovery, and reports no JavaScript errors. Existing saves on tiles changed by the redesign migrate to a safe point on the current route.

## Version 2.5 living-world validation

A timed canvas comparison confirms visible animation in all 17 outdoor regions. The reviewed effects include village chimney smoke and butterflies, fen mist and fireflies, forest leaves, moving coastal foam and gulls, ruin wisps, cavern glints, mountain wind, marsh rain and water ripples, lava bubbles and embers, ice beams and snow, moving prism light, garden petals, sanctum bubbles, drifting clouds, shooting stars, and flowing auroras. Regional music selections, map-arrival transitions, animated NPC markers, hidden-cache glints, and battle idle motion were also syntax and browser-error checked. Reduced-motion settings disable the major interface transitions.

## Version 3.0 Hollowroot validation

Automated checks cover all 24 maps and their NPC/exit reachability, all 25 creatures and abilities, the 15-item catalog, save migration from earlier releases, quest progress and one-time rewards, combat status effects, and the persistent Rootwarden victory reward. The Hollowroot gate requires the Gloomfang miniboss flag, while the regional boss uses a second phase below half health. Browser checks at 1280 × 820 and 390 × 844 cover the new quest log, Pathfinder Lodge transition, Captain Mara's quest board and mobile dialog scrolling without uncaught errors.
