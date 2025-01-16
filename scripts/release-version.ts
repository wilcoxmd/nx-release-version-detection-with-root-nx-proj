import { releaseVersion } from 'nx/release';

await releaseVersion({
  dryRun: true,
  verbose: true,
});
