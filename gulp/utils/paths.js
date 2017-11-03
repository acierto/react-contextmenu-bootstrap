import path from 'path';
const projectDir = path.resolve(__dirname, '..', '..');
export const distDir = 'dist';
export const nodeModulesDir = `${projectDir}/node_modules`;
export const demoDir = 'demo';
export const srcDir = 'lib';
export const testDir = 'test';
export const e2eTestDir = `${testDir}/e2e`;
export const unitTestDir = 'test/unit';