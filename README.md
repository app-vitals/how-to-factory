# how-to-factory

How to build a software factory: a video tutorial series by [App Vitals](https://github.com/app-vitals).

This repository holds everything behind the series: the lesson outlines and scripts, the slide decks, a vendor-neutral
component map, a sourced comparison of how different factories work, and a sample factory built live as the course runs.

## Who it is for

Engineers who already use an AI coding agent and want to go from one-off chats to a repeatable pipeline
that plans, builds, verifies, reviews and ships work, with people kept in the loop where they matter.

## How the series works

Every software factory is made of the same handful of parts, for example planning, execution, verification,
review, release and memory. The [component map](docs/components.md) lays them out, vendor-neutral.

Each lesson takes one component and does three things:

1. **Take the component deep.** Cover what is expected, common and crucial for it, and build it live using plain tools.
2. **Where factories take it.** Show the range of ways other factories implement the same component, and the destinations
   people reach as they grow, including later deep dives. This is a menu, not a prescription.
3. **You build yours.** Students build their own version, name it whatever they like, and take it in the direction that fits them.

Lessons are picked one at a time, not in a fixed order. The [lesson backlog](lessons/README.md) is an unordered pool of
candidates grouped by component. Shipwright, App Vitals' own factory, and its origins posts are background
and inputs, not a syllabus.

## Status

Early. The lessons are tool-neutral: the sample factory in `factory/` shows one concrete toolchain, and yours can use any agent, language or runner. The component map, lesson backlog and landscape comparison are in place. Lessons 1 and 2 are written; lesson 3 (verification) has been redone and is in draft. The sample factory is built live as the course runs.

## What is in this repo

- [`docs/`](docs) holds the vendor-neutral [component map](docs/components.md) and the lesson playbook.
- [`lessons/`](lessons) has one directory per lesson (outline, script, options, exercise) and the lesson backlog.
- [`landscape/`](landscape) compares how different factories implement each component, with a source and date for every claim.
- [`decks/`](decks) is the shared slide deck framework; each lesson's deck lives under its lesson directory.
- [`factory/`](factory) is the sample factory, built live as the course runs.

## Working with the repo

Requires [Bun](https://bun.sh). Run `bun install`, then `bun run typecheck` and `bun test`.

## Contributing and security

Issues are welcome; pull requests are by invitation for now. See [CONTRIBUTING.md](CONTRIBUTING.md). To report a
vulnerability privately, see [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © 2026 App Vitals
