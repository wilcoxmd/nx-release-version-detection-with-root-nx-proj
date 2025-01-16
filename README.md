# Nx releaseVersion -- root package.json#nx

The nx `releaseVersion` API isn't working the way we'd expect when we have an `"nx"` field set in our root package.json. 

## Reproduction steps

### Installation 

First clone and setup the repo: 

1. Clone this repo
2. Run `pnpm install` to install dependencies
3. `git fetch --tags` to fetch tags 

### Observe `releaseVersion` differences

This repo comes with some tags and commits pre-set up to demonstrate `releaseVersion` behavior. 

The latest commits are: 

```
fix: pin chalk to 5.4.0
(tag: release/project-a/1.0.2) bump project-a to 1.0.2
```

The latest commit contains an update to the `pnpm-workspace.yaml` and `pnpm-lock.yaml` files caused by a shared dependency update. 

To see how `releaseVersion` behaves: 

1. Run `pnpm tsx ./scripts/release-version.ts` to do a dry run of `releaseVersion`. You may need to force quit the script if it hangs after detecting any required version bumps.
1. Observe the console output that no changes are detected, and that versioning for project-a is being skipped. Our desire is that NX would want to bump the version to 1.0.3 due to the fix commit.
1. Delete the `"nx"` field from the root package.json (no need to commit it).
1. Run `pnpm tsx ./scripts/release-version.ts` again.
1. Observe that this time NX detects that `project-a` should update it's version to 1.0.3.

### A note

For some reason the `release-version.ts` script hangs after determining the versions. I've not had time to debug that. Regardless, I think the logged version detection output still demonstrates the issue we're interested in.