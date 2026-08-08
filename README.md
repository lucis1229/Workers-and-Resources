# Utility Planner — Workers & Resources: Soviet Republic

Enter a population, get the electricity, drinking water and sewage capacity your republic
needs, plus the plants required to cover it.

Everything is one static file — `index.html`, no build step, no dependencies, works offline.

## Running it

Open `index.html` in a browser. That's it.

If you prefer to serve it:

```sh
npx http-server . -p 8080     # then open http://localhost:8080
```

## What it calculates

For a given population (plus optional tourists, industry load and reserve margin):

| Output | Use it for |
| --- | --- |
| **Average demand** — MW, m³/day | Sizing sources: power plants, wells, treatment plants. These run continuously. |
| **Peak demand** — MW, m³/day | Sizing distribution: substations, power lines, pipes, pumps. These have to survive the evening when everyone is home at once. |
| **Build list** | How many substations, power plants and treatment plants cover the demand. |

Water and sewage are the solid numbers — the game's per-citizen rates are well documented
and the treatment plant capacities cross-check against them exactly (a 120 m³/day plant is
quoted as serving ~12 000 citizens, which is 0.01 m³/day each).

Electricity is the soft number. The game sets power draw per building, not per head, and
heating type, industry and night lighting move it a lot. The 0.9 kW average per citizen is
back-calculated from residential blocks and should be tuned against your own substation
readout.

## Tuning it

Section 04 of the page lists every coefficient with its source and makes it editable.
Change one and the whole sheet recalculates. Edits persist in browser local storage;
**Reset to defaults** puts them back.

This matters because values shift between game versions and difficulty settings — the
defaults are a starting point, not gospel.

## Where the defaults come from

- Per-citizen water and sewage rates, treatment plant flows, and the pressure-to-flow
  conversion — *Ultimate Water Management Guide* (Steam community guide).
- Measured consumption for a 1 500-population settlement — *Population needs*
  (Steam community guide).
- Power plant outputs and substation limits — the official Workers & Resources wiki and
  Steam discussions on wattage and power plants.

## Files

```
index.html                 the app
tools/build-artifact.mjs   emits a body-only copy for publishing as a hosted page
```
