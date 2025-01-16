import { releaseVersion } from '@nx/js';

await releaseVersion({
  dryRun: true,
  verbose: true,
});