const { execSync } = require('node:child_process');
const pkg = require('../package.json');

execSync(`npm run build:pkg`, { stdio: 'inherit' });
execSync(`docker build -t ${pkg.name}:v${pkg.version} .`, { stdio: 'inherit' });
execSync(`docker save -o ./docker-images/${pkg.name}-v${pkg.version}.tar ${pkg.name}:v${pkg.version}`, { stdio: 'inherit' });
execSync(`cd ./docker-images && tar -zvcf ${pkg.name}-v${pkg.version}.tar.gz ${pkg.name}-v${pkg.version}.tar`, {
  stdio: 'inherit',
});
