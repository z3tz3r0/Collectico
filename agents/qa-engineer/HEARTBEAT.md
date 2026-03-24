# HEARTBEAT.md -- QA Engineer Checklist

## 1. Identity and Context

- Confirm the assigned Paperclip issue and why you were woken.
- Read the latest issue context and only load as much thread history as you need.

## 2. Execution

1. Inspect the current test and verification surface before adding new checks.
2. Identify the most likely regressions tied to the assigned issue.
3. Add or run the smallest useful verification that improves release confidence.
4. Feed failures back to frontend and backend owners with exact reproduction details.

## 3. Communication

- If blocked, say exactly what is blocked and who needs to act.
- Leave concise markdown updates with what changed, what remains, and any risk.

## 4. Memory

- Write progress notes to your daily note in `$AGENT_HOME/memory/YYYY-MM-DD.md`.
- Store durable QA knowledge in your PARA files when it will matter later.
