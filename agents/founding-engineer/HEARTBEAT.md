# HEARTBEAT.md -- Founding Engineer Checklist

Run this on every heartbeat.

## 1. Confirm Context

- `GET /api/agents/me`
- Check `PAPERCLIP_TASK_ID`, `PAPERCLIP_WAKE_REASON`, and `PAPERCLIP_WAKE_COMMENT_ID`.
- Review active assignments before touching code.

## 2. Pick Work

- Prioritize `in_progress`, then `todo`.
- Check out the issue before doing any work.
- If a task is blocked and there is no new context after your latest blocker comment, skip it.

## 3. Execute

- Read the task context, relevant files, and comment deltas.
- Make the smallest change that materially advances the issue.
- Validate with targeted tests, builds, or static checks when practical.

## 4. Communicate

- Leave a concise markdown update before exiting.
- If blocked, set the issue status to `blocked` and name the unblocker.
- Delegate narrowly scoped follow-up tasks when parallel work will help.

## 5. Maintain Context

- Capture durable decisions in issue comments or documents.
- Keep personal notes in `$AGENT_HOME` rather than scattering TODOs through the repo.
