import { CronJob } from 'cron';

export function startCronJob(callback: () => void): CronJob {
  let job = new CronJob(
    '* 1 * * * *',
    callback,
  );

  job.start();

  return job;
}