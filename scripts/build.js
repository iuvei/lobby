const { execSync } = require("child_process")

const themeList = ['red', 'blue', 'orange']

console.log('build start!')

for (let theme of themeList) {
  execSync(`cp -f theme/${theme}/* src/styles/scss/`, {stdio: [0, 1, 2]})

  execSync('node scripts/build1.js', {stdio: [0, 1, 2]})

  execSync(` rm -rf dist/${theme} && mkdir dist/${theme}`, {stdio: [0, 1, 2]})
  execSync(`mv build/* dist/${theme}/`, {stdio: [0, 1, 2]})

}

console.log('build end!')
