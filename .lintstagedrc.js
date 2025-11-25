const { execSync } = require('child_process');

module.exports = {
  '*.ts': async (files) => {
    // Run eslint --fix but don't fail if there are unfixable errors
    try {
      execSync(`eslint --fix ${files.join(' ')}`, { stdio: 'inherit' });
    } catch (error) {
      // Ignore eslint errors - we just want to apply fixes
      console.log('ESLint found some issues, but continuing with commit...');
    }

    // Always run prettier after eslint
    return `prettier --write ${files.join(' ')}`;
  },
  '*.{js,json}': 'prettier --write',
  '*.md': 'prettier --write --prose-wrap always',
  '*.{yml,yaml}': 'prettier --write',
};
