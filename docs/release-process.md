# Release Process

## Current state

The repository has a main branch, GitHub Actions validation, and Dependabot configuration. It does not currently define a formal versioning convention, release branch model, signed-tag process, automated release notes, or deployment pipeline.

## Before a release

- [ ] Review all changes and confirm they are intended.
- [ ] Update README and relevant technical guides.
- [ ] Update CHANGELOG.md with user-visible changes.
- [ ] Confirm no secrets, private data, or generated artifacts were committed.
- [ ] Run `npm ci`.
- [ ] Run `npx tsc --noEmit`.
- [ ] Run `npm run build`.
- [ ] Review the GitHub Actions run and confirm required checks passed.
- [ ] Manually test affected UI routes and API endpoints.
- [ ] Verify provider keys are configured in the target environment.
- [ ] Review provider terms, quotas, and cost impact.
- [ ] Confirm known limitations are disclosed.

## Versioning recommendation

If the project begins publishing releases, adopt semantic versioning:
- Patch: backward-compatible fixes.
- Minor: backward-compatible features.
- Major: breaking API or application behavior.

This is a recommendation, not an existing release policy.

## Tagging and publishing

Create a release only after validation succeeds. Use release notes that distinguish implemented changes from known issues. Do not state that external search coverage or AI accuracy has been validated unless a repeatable evaluation supports the claim.

## Rollback

No project-specific rollback automation exists. Follow the chosen hosting platform's deployment rollback procedure and verify that the prior version still has valid provider credentials.
