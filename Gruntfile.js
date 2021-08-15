const exec = {
  cspell: 'npx cspell ".*" "*" "**/*"',
  eslint: 'npx esw "**/*.{js,ts}" --fix --ignore-path .gitignore',
  mocha: "npx nyc mocha 'dist/**/*.js' -R mochawesome --exit",
  prettier: 'npx prettier . --write --ignore-path .gitignore --single-quote',
  remark: 'npx remark -r .remarkrc --ignore-path .gitignore . .github',
};

const tsc = {
  tsc: 'npx tsc -p src/tsconfig.json',
  tscTest: 'npx tsc -p src/tsconfig.spec.json',
};

const cleanExecs = (arr) => [
  'clean',
  ...arr.map((i) => (i.includes(':') ? i : 'exec:'.concat(i))),
];

module.exports = (grunt) => {
  grunt.initConfig({
    exec: { ...exec, ...tsc },
    clean: { dist: './dist' },
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask(
    'lint',
    'Lint the source code.',
    cleanExecs(['cspell', 'eslint', 'remark'])
  );

  grunt.registerTask(
    'format',
    'Format the source code.',
    cleanExecs(['prettier'])
  );

  grunt.registerTask(
    'build',
    'Compile the source code for a production environment.',
    cleanExecs(['tsc'])
  );

  grunt.registerTask(
    'test',
    'Compile and run unit tests.',
    cleanExecs(['tscTest', 'mocha'])
  );
};
