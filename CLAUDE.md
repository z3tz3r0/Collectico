# Collectico project instructions

## Fix findings inline, do not file tracker issues

In this repo, fix review findings, debt, and bugs **inline** as part of the work · do not file GitHub or Linear issues for them. This overrides the global "file a follow-up issue" rule for this project.

- Reviewer findings (code-review, security-review, `<lang>`-reviewer, adversarial workflows), smells, and latent bugs get fixed in the same change that surfaced them, or in an immediate follow-up commit.
- Still surface what you fixed in one line each (`also fixed X at file:line because Y`).
- Exception only for R1+ changes (security architecture, infra/cost, schema or API-contract changes): give a one-line heads-up or take a quick decision first per the global Dissent-before-R1 rule, then fix inline. Do not silently defer to an issue tracker.
