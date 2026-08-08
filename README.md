# Utility Planner — Workers & Resources: Soviet Republic

Enter a population, get the electricity, drinking water, sewage and district heating
capacity your republic needs, plus the plants required to cover it.

Everything is one static file — `index.html`, no build step, no dependencies, works offline.

## Running it

Open `index.html` in a browser. That's it.

If you prefer to serve it:

```sh
npx http-server . -p 8080     # then open http://localhost:8080
```

## What it calculates

For a given population (plus optional tourists, industry load, heating mode and reserve
margin):

| Output | Use it for |
| --- | --- |
| **Average demand** — MW, m³/day | Sizing sources: power plants, wells, treatment plants. These run continuously. |
| **Peak demand** — MW, m³/day | Sizing distribution: substations, power lines, pipes, pumps. These have to survive the evening when everyone is home at once. |
| **Build list** | How many power plants, treatment plants and heating plants cover the demand, plus the full electrical distribution chain — trunk line rating, switches, transformers, medium voltage line size and substations. |

Water and sewage are the solid numbers — the game's per-citizen rates are well documented
and the treatment plant capacities cross-check against them exactly (a 120 m³/day plant is
quoted as serving ~12 000 citizens, which is 0.01 m³/day each).

Electricity is the soft number. The game sets power draw per building, not per head, and
heating type, industry and night lighting move it a lot. The 0.9 kW average per citizen is
back-calculated from residential blocks and should be tuned against your own substation
readout.

The electrical distribution chain runs plant → high voltage trunk → switches → transformers
→ medium voltage lines → substations. Two results fall out of it that are worth knowing:

- A substation passes 2.5 MW but the largest medium voltage line carries 2.20 MW, so a
  substation near its limit needs two feeds.
- Switches come in a 3-line and a 5-line post and the sheet costs both. One slot takes the
  incoming feed and the rest branch onward, so reaching N transformers takes N−1 of the
  small posts but only about a third as many large ones.
- Medium voltage switches never turn out to be capacity-driven. A transformer runs out of
  MW (13.2) before it runs out of slots (6 × 2.5 MW of substation), so those switches are a
  routing part for working around terrain, and the sheet says so rather than inventing a count.

Below about 4 MW of peak demand — roughly 1 300 citizens — high voltage is skipped entirely
and the sheet tells you to run medium voltage straight off the plant.

Heating is counted in two currencies because the game does: buildings ask for hot water in
m³ while plants are rated in GJ. The conversion is 5 m³ of demand per GJ/day of output —
match heat exchangers to the m³ figure and plants to the GJ figure. Set heating to *None*
if you play with seasons off, since the system doesn't exist then.

The heating figures are derived rather than quoted, but four independent data points agree:
both plant sizes hit the stated 1:5 production-to-capacity ratio (210 GJ ↔ 1 050 m³ and
42 GJ ↔ 210 m³), a small plant is reckoned good for ~2 000 people, and the resulting
0.105 m³/citizen puts the largest skyscraper's 45 m³ at ~430 residents.

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
- Heating plant and exchanger capacities, pipe reach and losses — Steam discussions on
  heating mechanics and optimal heating setups.

## Files

```
index.html                 the app
tools/build-artifact.mjs   emits a body-only copy for publishing as a hosted page
```
