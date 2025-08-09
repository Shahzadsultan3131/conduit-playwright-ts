import { test as baseTest } from '@playwright/test';
import fs from 'fs';

type MyFixtures = {
  storageStatePath: string;
};

export const test = baseTest.extend<MyFixtures>({
  storageStatePath: async ({}, use) => {
    const path = 'storageState.json';
    // If state exists, reuse. Otherwise tests can create state via a separate one-off.
    if (!fs.existsSync(path)) {
      console.log('storageState.json not found. Some tests create session programmatically.');
    }
    await use(path);
  }
});

export const expect = test.expect;
