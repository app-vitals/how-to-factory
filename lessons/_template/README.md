# Lesson NN: <title>

> Template. Copy `lessons/_template/` to `lessons/NN-<slug>/` and fill every section. Delete this note.
> Rules for facts about other products: first-party source URL plus an as-of date, or leave it out.

**Component taught:** <which component from [docs/components.md](../../docs/components.md)>
**Video:** <YouTube link, added after publishing>

## Names for this

Skills and components are called different things in different factories. In this lesson ours is `<name>`;
others call it `<alt>`, `<alt>` (see [options.md](options.md)). Call yours whatever you like.

## The concept

<What the component is and why a factory needs it. Two or three sentences.>

## The simplest thing that works

<The smallest version a single person can run today. No harness, no schedule.>

## Build steps

1. <Step, matching a numbered step in [script.md](script.md)>

## How the field does it

<A short options table. Details, sources and as-of dates live in [options.md](options.md); product-by-product
cells live in the [landscape matrix](../../landscape/README.md).>

| Approach | Example | Pick this if |
|---|---|---|

## Where factories take it

<Destinations, explicitly not prescriptive. Describe what exists, never what the student should do next.>

## Maintenance cron (optional)

<A tiny scheduled job that keeps this component healthy, if one applies. Delete this section if not.>

## Exercise and go further

See [exercise.md](exercise.md).

## Files

- [script.md](script.md): talking points and demo beats, numbered
- [options.md](options.md): how other factories do it, with sources
- [exercise.md](exercise.md): the student exercise
- [deck/index.html](deck/index.html): slides (built from `decks/_template`, checked by `bun scripts/check-decks.ts`)
- [run-of-show.md](run-of-show.md): slides and demo beats in filming order
