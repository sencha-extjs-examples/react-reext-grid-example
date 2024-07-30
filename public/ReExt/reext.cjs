#!/usr/bin/env node
 // node ./public/ReExt/reext.cjs 7.7.0 ~/@/ExtJS ./public

var spawn = require('child_process').spawn;

async function main2() {

 const copyIt = (sdkBuildPath, destSdkPath, fileorfolder) => {
  fs.cpSync(sdkBuildPath + fileorfolder, destSdkPath + fileorfolder, { recursive: true ,overwrite: true })
 }

 const copyItTheme = (sdkBuildPath, destSdkPath, toolkit, theme, version) => {
  if (theme === 'material') {
   copyIt(sdkBuildPath, destSdkPath, `/${toolkit}/theme-${theme}/resources/fonts`)
   copyIt(sdkBuildPath, destSdkPath, `/${toolkit}/theme-${theme}/resources/font-ext`)
   copyIt(sdkBuildPath, destSdkPath, `/${toolkit}/theme-${theme}/resources/font-awesome`)
  }
  if (theme !== 'ios') {
   copyIt(sdkBuildPath, destSdkPath, `/${toolkit}/theme-${theme}/resources/images`)
  }
  copyIt(sdkBuildPath, destSdkPath, `/${toolkit}/theme-${theme}/resources/theme-${theme}-all.css`)
  copyIt(sdkBuildPath, destSdkPath, `/${toolkit}/theme-${theme}/resources/theme-${theme}-all_1.css`)
  copyIt(sdkBuildPath, destSdkPath, `/${toolkit}/theme-${theme}/resources/theme-${theme}-all_2.css`)
  copyIt(sdkBuildPath, destSdkPath, `/${toolkit}/theme-${theme}/resources/theme-${theme}-all-debug.css`)
  copyIt(sdkBuildPath, destSdkPath, `/${toolkit}/theme-${theme}/resources/theme-${theme}-all-debug_1.css`)
  copyIt(sdkBuildPath, destSdkPath, `/${toolkit}/theme-${theme}/resources/theme-${theme}-all-debug_2.css`)
 if (toolkit === 'classic' && theme === 'material') {
  copyIt(sdkBuildPath, destSdkPath, `/${toolkit}/theme-${theme}/resources/theme-${theme}-all_3.css`)
  copyIt(sdkBuildPath, destSdkPath, `/${toolkit}/theme-${theme}/resources/theme-${theme}-all-debug_3.css`)
 }
 }

 const {default:fs} = await import("fs");
 const prefix = '** ReExt: ';
 const {default:readline} = await import("readline");
 const {default:chalk} = await import("chalk");
 const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
 const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

 console.log("\nWelcome to the ReExt ExtJS SDK copy utility") 
 console.log(chalk.blue(`\nto use: node ./public/ReExt/reext.js <version> <unzipped sdk root folder> <destination folder>`))
 console.log(chalk.blue(`example: node ./public/ReExt/reext.js 7.7.0 ~/@/ExtJS ~/@/ReExtApp`))
 console.log('')

 var sourceArgvText = 'path for the source folder where the SDK was unzipped?'
 // var toolkitArgvText = 'ExtJS toolkit'
 var sdkVersionArgvText = 'ExtJS SDK version'
 var destArgvText = 'destination folder'

 var sdkVersionArgv = process.argv[2]
 // var toolkitArgv = process.argv[3]
 var sourceArgv = process.argv[3]
 var destArgv = process.argv[4]

 const doIt = (sourcePath, sdkBuildPath, destPath, sourceAddonsAvailable, addonsVersion, sourceAddonsPackagesPath, sdkVersion) => {
  //const destSdkPath = destPath + '/' + 'ext-' + sdkVersion
  const destSdkPath = destPath + '/' + 'ext-' + sdkVersion + '/build'
  if (fs.existsSync(destSdkPath)){
   fs.rmSync(destSdkPath, {recursive: true, force: true});
  }
  fs.mkdirSync(destSdkPath, {force: true, recursive: true});
  console.log(c.white.bgBlue(`Dest SDK path: ${destSdkPath}`))

  if (fs.existsSync(destSdkPath+'c')){
   fs.rmSync(destSdkPath+'c', {recursive: true, force: true});
  }
  fs.mkdirSync(destSdkPath+'c', {force: true, recursive: true});
  console.log(c.white.bgBlue(`Dest SDKc path: ${destSdkPath+'c'}`))

  //classic
  copyIt(sdkBuildPath, destSdkPath, '/ext-all-debug.js')
  copyIt(sdkBuildPath, destSdkPath, '/ext-all.js')

  //copyItTheme(sdkBuildPath, destSdkPath, 'aria')
  copyItTheme(sdkBuildPath, destSdkPath, 'classic', 'classic', sdkVersion)
  copyItTheme(sdkBuildPath, destSdkPath, 'classic', 'crisp', sdkVersion)
  copyItTheme(sdkBuildPath, destSdkPath, 'classic', 'graphite', sdkVersion)
  copyItTheme(sdkBuildPath, destSdkPath, 'classic', 'gray', sdkVersion)
  copyItTheme(sdkBuildPath, destSdkPath, 'classic', 'material', sdkVersion)
  copyItTheme(sdkBuildPath, destSdkPath, 'classic', 'neptune', sdkVersion)
  copyItTheme(sdkBuildPath, destSdkPath, 'classic', 'triton', sdkVersion)

  //charts
  var charts
  charts = '/packages/charts/classic'
  copyIt(sdkBuildPath, destSdkPath, charts + '/classic/resources')
  copyIt(sdkBuildPath, destSdkPath, charts + '/crisp/resources')
  copyIt(sdkBuildPath, destSdkPath, charts + '/neptune/resources')
  copyIt(sdkBuildPath, destSdkPath, charts + '/triton/resources')
  copyIt(sdkBuildPath, destSdkPath, charts + '/charts.js')
  copyIt(sdkBuildPath, destSdkPath, charts + '/charts-debug.js')
  if (sdkVersion !== '7.0.0') {
   copyIt(sdkBuildPath, destSdkPath, charts + '/classic-material/resources')
   copyIt(sdkBuildPath, destSdkPath, charts + '/graphite/resources')
  }

  //ux
  var ux
  ux = '/packages/ux/classic'
  copyIt(sdkBuildPath, destSdkPath, ux + '/classic/resources')
  copyIt(sdkBuildPath, destSdkPath, ux + '/crisp/resources')
  copyIt(sdkBuildPath, destSdkPath, ux + '/neptune/resources')
  copyIt(sdkBuildPath, destSdkPath, ux + '/triton/resources')
  copyIt(sdkBuildPath, destSdkPath, ux + '/ux.js')
  copyIt(sdkBuildPath, destSdkPath, ux + '/ux-debug.js')
  if (sdkVersion !== '7.0.0') {
   copyIt(sdkBuildPath, destSdkPath, ux + '/classic-material/resources')
   copyIt(sdkBuildPath, destSdkPath, ux + '/graphite/resources')
  }

  //font-awesome
  var fontawesome = '/packages/font-awesome'
  copyIt(sdkBuildPath, destSdkPath, fontawesome + '/resources/fonts')
  copyIt(sdkBuildPath, destSdkPath, fontawesome + '/resources/font-awesome-all-debug.css')
  copyIt(sdkBuildPath, destSdkPath, fontawesome + '/resources/font-awesome-all-rtl-debug.css')
  copyIt(sdkBuildPath, destSdkPath, fontawesome + '/resources/font-awesome-all-rtl.css')
  copyIt(sdkBuildPath, destSdkPath, fontawesome + '/resources/font-awesome-all.css')

  spawn('cat',[
   destSdkPath + '/classic/theme-classic/resources' + '/theme-classic-all_1.css',
   destSdkPath + '/classic/theme-classic/resources' + '/theme-classic-all_2.css',
   destSdkPath + '/packages/charts/classic/classic/resources' + '/charts-all.css',
   destSdkPath + '/packages/font-awesome/resources' + '/font-awesome-all.css',
   destSdkPath + '/packages/charts/ux/ux/resources' + '/ux-all.css',
   '>',
   destSdkPath+'c' + '/ext-' + sdkVersion+'c' + '-theme-classic-sdk.css'
  ],{ shell: true });

  spawn('cat',[
   destSdkPath + '/ext-all.js',
   destSdkPath + charts + '/charts.js',
   destSdkPath + ux + '/ux.js',
   '>',
   destSdkPath+'c' + '/ext-' + sdkVersion+'c' + '-toolkit-classic-sdk.js'
  ],{ shell: true });

  console.log(sdkBuildPath + '/packages/font-awesome/resources/fonts')

  fs.cpSync(sdkBuildPath + '/packages/font-awesome/resources/fonts', destSdkPath+'c'+'/fonts', { recursive: true ,overwrite: true })
  //fs.cpSync('./public/ReExt/fonts', destSdkPath+'c'+'/fonts', { recursive: true ,overwrite: true })


 //modern
  copyIt(sdkBuildPath, destSdkPath, '/ext-modern-all-debug.js')
  copyIt(sdkBuildPath, destSdkPath, '/ext-modern-all.js')

  copyItTheme(sdkBuildPath, destSdkPath, 'modern', 'ios', sdkVersion)
  copyItTheme(sdkBuildPath, destSdkPath, 'modern', 'material', sdkVersion)
  copyItTheme(sdkBuildPath, destSdkPath, 'modern', 'neptune', sdkVersion)
  copyItTheme(sdkBuildPath, destSdkPath, 'modern', 'triton', sdkVersion)

  charts = '/packages/charts/modern'
  copyIt(sdkBuildPath, destSdkPath, charts + '/modern-material/resources')
  copyIt(sdkBuildPath, destSdkPath, charts + '/modern-neptune/resources')
  copyIt(sdkBuildPath, destSdkPath, charts + '/modern-triton/resources')
  copyIt(sdkBuildPath, destSdkPath, charts + '/charts.js')
  copyIt(sdkBuildPath, destSdkPath, charts + '/charts-debug.js')
  if (sdkVersion !== '7.0.0') {
   copyIt(sdkBuildPath, destSdkPath, charts + '/modern-ios/resources')
  }

  ux = '/packages/ux/modern'
  copyIt(sdkBuildPath, destSdkPath, ux + '/modern-neptune/resources')
  copyIt(sdkBuildPath, destSdkPath, ux + '/ux.js')
  copyIt(sdkBuildPath, destSdkPath, ux + '/ux-debug.js')
  copyIt(sdkBuildPath, destSdkPath, charts + '/modern-neptune/resources')
  if (sdkVersion !== '7.0.0') {
   copyIt(sdkBuildPath, destSdkPath, ux + '/material/resources')
   copyIt(sdkBuildPath, destSdkPath, charts + '/modern-triton/resources')
  }

  spawn('cat',[
   destSdkPath + '/ext-all.js',
   destSdkPath + charts + '/charts.js',
   destSdkPath + ux + '/ux.js',
   '>',
   destSdkPath+'c' + '/ext-' + sdkVersion+'c' + '-toolkit-modern-sdk.js'
  ],{ shell: true });

  if (sourceAddonsAvailable === false) {
   return 1;
  }

  const destAddonsPath = destPath + '/' + 'ext-addons-' + addonsVersion + '/packages'
  if (fs.existsSync(destAddonsPath)){
   fs.rmSync(destAddonsPath, {force: true, recursive: true});
  }
  fs.mkdirSync(destAddonsPath, {force: true, recursive: true});
  console.log(c.white.bgBlue(`Dest Addons path: ${destAddonsPath}`))
  
  var exporter
  var d3 
  var pivot
  var pivotd3
  var pivotlocale
  var calendar

  // classic
  exporter = '/exporter/build/classic'
  copyIt(sourceAddonsPackagesPath, destAddonsPath, exporter + '/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, exporter + '/exporter.js')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, exporter + '/exporter-debug.js')
  
  d3 = '/d3/build/classic'
  copyIt(sourceAddonsPackagesPath, destAddonsPath, d3 + '/classic/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, d3 + '/classic-material/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, d3 + '/crisp/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, d3 + '/neptune/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, d3 + '/triton/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, d3 + '/d3.js')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, d3 + '/d3-debug.js')

  pivot = '/pivot/build/classic'
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivot + '/classic/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivot + '/classic-material/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivot + '/crisp/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivot + '/neptune/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivot + '/triton/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivot + '/pivot.js')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivot + '/pivot-debug.js')

  pivotd3 = '/pivot-d3/build/classic'
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotd3 + '/classic/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotd3 + '/classic-material/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotd3 + '/crisp/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotd3 + '/neptune/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotd3 + '/triton/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotd3 + '/pivot-d3.js')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotd3 + '/pivot-d3-debug.js')

  // pivotlocale = '/pivot-locale/build/classic'
  // copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotlocale + '/classic/resources')
  // copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotlocale + '/classic-material/resources')
  // copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotlocale + '/crisp/resources')
  // copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotlocale + '/neptune/resources')
  // copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotlocale + '/triton/resources')
  // copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotlocale + '/pivot-locale.js')
  // copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotlocale + '/pivot-locale-debug.js')

  calendar = '/calendar/build/classic'
  try {
   if (addonsVersion === '7.0.0.156') {
    fs.cpSync(sourceAddonsPackagesPath + calendar + '/classic/resources', destAddonsPath + calendar + '/classic/resources', { recursive: true ,overwrite: true })
    fs.cpSync(sourceAddonsPackagesPath + calendar + '/classic/resources', destAddonsPath + calendar + '/classic-material/resources', { recursive: true ,overwrite: true })
    fs.cpSync(sourceAddonsPackagesPath + calendar + '/classic/resources', destAddonsPath + calendar + '/crisp/resources', { recursive: true ,overwrite: true })
    fs.cpSync(sourceAddonsPackagesPath + calendar + '/classic/resources', destAddonsPath + calendar + '/neptune/resources', { recursive: true ,overwrite: true })
    fs.cpSync(sourceAddonsPackagesPath + calendar + '/classic/resources', destAddonsPath + calendar + '/triton/resources', { recursive: true ,overwrite: true })
   }
   else {
    copyIt(sourceAddonsPackagesPath, destAddonsPath, calendar + '/classic/resources')
    copyIt(sourceAddonsPackagesPath, destAddonsPath, calendar + '/classic-material/resources')
    copyIt(sourceAddonsPackagesPath, destAddonsPath, calendar + '/crisp/resources')
    copyIt(sourceAddonsPackagesPath, destAddonsPath, calendar + '/neptune/resources')
    copyIt(sourceAddonsPackagesPath, destAddonsPath, calendar + '/triton/resources')
   }
   copyIt(sourceAddonsPackagesPath, destAddonsPath, calendar + '/calendar.js')
   copyIt(sourceAddonsPackagesPath, destAddonsPath, calendar + '/calendar-debug.js')
  }
  catch(e) {
   console.log(prefix + e.toString())
  }

  console.log(destAddonsPath + '/classic/classic/resources' + '/calendar-all.css',)

  spawn('cat',[
   destAddonsPath + '/calendar/build/classic/classic/resources' + '/calendar-all.css',
   destAddonsPath + '/d3/build//classic/classic/resources' + '/d3-all.css',
   destAddonsPath + '/exporter/build//classic/classic/resources' + '/exporter-all.css',
   destAddonsPath + '/pivot/build//classic/classic/resources' + '/pivot-all.css',
   destAddonsPath + '/pivot-d3/build//classic/classic/resources' + '/pivot-d3-all.css',
   '>',
   destSdkPath+'c' + '/ext-' + sdkVersion+'c' + '-theme-classic-addons.css'
  ],{ shell: true });

console.log( destAddonsPath + exporter + '/exporter.js')

  spawn('cat',[
   destAddonsPath + '/' + exporter + '/exporter.js',
   destAddonsPath + '/' + d3 + '/d3.js',
   destAddonsPath + '/' + pivot + '/pivot.js',
   destAddonsPath + '/' + pivotd3 + '/pivot-d3.js',
   destAddonsPath + '/' + calendar + '/calendar.js',
   '>',
   destSdkPath+'c' + '/ext-' + sdkVersion+'c' + '-toolkit-classic-addons.js'
  ],{ shell: true });

  // modern
  exporter = '/exporter/build/modern'
  copyIt(sourceAddonsPackagesPath, destAddonsPath, exporter + '/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, exporter + '/exporter.js')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, exporter + '/exporter-debug.js')
  
  d3 = '/d3/build/modern'
  copyIt(sourceAddonsPackagesPath, destAddonsPath, d3 + '/ios/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, d3 + '/material/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, d3 + '/modern-neptune/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, d3 + '/modern-triton/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, d3 + '/d3.js')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, d3 + '/d3-debug.js')

  pivot = '/pivot/build/modern'
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivot + '/ios/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivot + '/material/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivot + '/modern-neptune/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivot + '/modern-triton/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivot + '/pivot.js')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivot + '/pivot-debug.js')

  pivotd3 = '/pivot-d3/build/modern'
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotd3 + '/ios/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotd3 + '/material/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotd3 + '/modern-neptune/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotd3 + '/modern-triton/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotd3 + '/pivot-d3.js')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotd3 + '/pivot-d3-debug.js')

  // pivotlocale = '/pivot-locale/build/modern'
  // copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotlocale + '/ios/resources')
  // copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotlocale + '/material/resources')
  // copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotlocale + '/modern-neptune/resources')
  // copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotlocale + '/modern-triton/resources')
  // copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotlocale + '/pivot-locale.js')
  // copyIt(sourceAddonsPackagesPath, destAddonsPath, pivotlocale + '/pivot-locale-debug.js')
  
  calendar = '/calendar/build/modern'
  try {
   if (addonsVersion === '7.0.0.156') {
    //fs.cpSync(sourceAddonsPackagesPath + calendar + '/material/resources', destAddonsPath + calendar + '/material/resources', { recursive: true ,overwrite: true })
    copyIt(sourceAddonsPackagesPath, destAddonsPath, calendar + '/material/resources')
   }
   else {
    copyIt(sourceAddonsPackagesPath, destAddonsPath, calendar + '/modern-material/resources')
   }
  }
  catch(e) {
   console.log(prefix + e.toString())
  }
  copyIt(sourceAddonsPackagesPath, destAddonsPath, calendar + '/ios/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, calendar + '/modern-neptune/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, calendar + '/modern-triton/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, calendar + '/calendar.js')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, calendar + '/calendar-debug.js')
  
  var froala = '/froala-editor'
  copyIt(sourceAddonsPackagesPath, destAddonsPath, froala + '/build/resources')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, froala + '/froala-editor.js')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, froala + '/froala-editor-debug.js')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, froala + '/development')
  copyIt(sourceAddonsPackagesPath, destAddonsPath, froala + '/production')

  spawn('cat',[
   destAddonsPath + exporter + '/exporter.js',
   destAddonsPath + d3 + '/d3.js',
   destAddonsPath + pivot + '/pivot.js',
   destAddonsPath + pivotd3 + '/pivot-d3.js',
   destAddonsPath + calendar + '/calendar.js',
   destAddonsPath + froala + '/froala-editor.js.js',
   destAddonsPath + froala + '/development/froalaeditor.pkgd.js',
   '>',
   destSdkPath+'c' + '/ext-' + sdkVersion+'c' + '-toolkit-modern-addons.js'
  ],{ shell: true });

  return 0
 }

 async function go() {
  console.log('go')

  var sdkVersions = ['7.0.0', '7.6.0', '7.7.0']
  //var sdkVersionString = `${sdkVersionArgvText}? (valid versions: ${sdkVersions.toString()})`
  var sdkVersionString = `${sdkVersionArgvText}?`
  var sdkVersion
  if (sdkVersionArgv === undefined || sdkVersions.indexOf(sdkVersionArgv.trim()) === -1) {
   var sdkVersionString2 = `Valid ExtJS SDK versions: ${sdkVersions.toString()}`
   console.log(c.white.bgBlue(sdkVersionString2))
   sdkVersion = await getVersion(sdkVersionString, sdkVersions)
  }
  else {
   sdkVersion = sdkVersionArgv
   console.log(c.white.bgBlue(`SDK version (from the command line): ${sdkVersion}`))
  }

  // var toolkits = ['classic','modern','both']
  // var toolkitString = `${toolkitArgvText}?`
  // var toolkit
  // if (toolkitArgv === undefined || toolkits.indexOf(toolkitArgv.trim()) === -1) {
  //  var toolkitString2 = `Valid toolkits: ${toolkits.toString()}`
  //  console.log(c.white.bgBlue(toolkitString2))
  //  toolkit = await getVersion(toolkitString, toolkits)
  // }
  // else {
  //  toolkit = toolkitArgv
  //  console.log(c.white.bgBlue(`toolkit (from the command line): ${toolkit}`))
  // }

  var sourcePath
  if (sourceArgv === undefined) {
   sourcePath = await getFolderPath(sourceArgvText)
  }
  else {
   sourcePath = sourceArgv
   console.log(c.white.bgBlue(`Source path (from the command line): ${sourcePath}`))
  }
  if (!fs.existsSync(sourcePath)) {
   console.log(c.reset.red(`${sourcePath} does not exist`))
   process.exit(1);
  }

  var destPath
  if (destArgv === undefined) {
   destPath = await getFolderPath(destArgvText)
  }
  else {
   destPath = destArgv
   console.log(c.white.bgBlue(`Dest path (from the command line): ${destPath}`))
  }
  if (!fs.existsSync(destPath)) {
   console.log(c.reset.red(`${destPath} does not exist`))
  }

  var sourceSDKPath = `${sourcePath}/ext-${sdkVersion}`
  if (!fs.existsSync(sourceSDKPath)) {
   console.log(c.reset.red(`${sourceSDKPath} does not exist`))
   process.exit(1);
  }
  else {
   console.log(c.white.bgBlue(`Source SDK path: ${sourceSDKPath}`))
  }

  var sdkBuildPath = `${sourceSDKPath}/build`
  if (!fs.existsSync(sdkBuildPath)) {
   console.log(c.reset.red(`${sdkBuildPath} does not exist`))
   process.exit(1);
  }

  var addonsVersion = sdkVersion;
  if (sdkVersion === '7.0.0') {
   addonsVersion = addonsVersion + '.156'
  }
  if (sdkVersion === '7.1.0') {
   addonsVersion = addonsVersion + '.46'
  }
  
  var sourceAddonsAvailable
  var sourceAddonsPath = `${sourcePath}/ext-addons-${addonsVersion}`
  var sourceAddonsPackagesPath = `${sourceAddonsPath}/packages`
  if (!fs.existsSync(sourceAddonsPath)) {
   console.log(c.reset.red(`Addons not available`))
   sourceAddonsAvailable = false
  }
  else {
   sourceAddonsAvailable = true
   console.log(c.white.bgBlue(`Source Addons path: ${sourceAddonsPath}`))
  }

  var doItPrompt = await prompt(c.reset(`Creata a copy of this SDK (yes/No)?: `));
  if (doItPrompt === 'yes') {
   doIt(sourcePath, sdkBuildPath, destPath, sourceAddonsAvailable, addonsVersion, sourceAddonsPackagesPath, sdkVersion)
  }
  else {
   console.log('cancelled')
  }
  process.exit(0);
 }

 class cClass {
  constructor() {
   const colors = {white:[37,89],red:[31,89],bgGreen:[42,49],bgBlue:[44,49]}
   const styles = {reset: [0, 0],italic: [3, 23]}
    this.str = [];
    const ref = Object.assign({}, colors, styles);
    const all = Object.keys(ref);
    all.forEach(d => {
      const obj = {
        [d]: {
          get() {
            this.str.push(ref[[d]]);
            const self = this;
            const b = function(arg) {
              const reset = "\x1b[" + styles.reset[0] + "m";
              for (var d of self.str.reverse())
                arg = "\x1b[" + d[0] + "m" + arg + "\x1b[" + d[1] + "m";
              self.str = [];
              return arg + reset;
            };
            b.__proto__ = this;
            return b;
          }
        }
      };
      Object.defineProperties(cClass.prototype, obj);
    });
  }
 }
 var c = new cClass

 const getVersion = async (argvText, versions) => {
  var valid = false;
  var input =''
  var returnvalue = ''
  while (valid === false) {
   if (input !== '') {
    console.log(`${input} is not a valid ${argvText}: `)
   }
   input = await prompt(c.reset(`What is the ${argvText}: `));
   returnvalue = input
   
   if (versions.indexOf(input.trim()) > -1) {
    valid = true
   }
  }
  return returnvalue
 }

 const getFolderPath = async (argvText) => {
  var valid = false;
  var input =''
  var returnvalue = ''
  while (valid === false) {
   if (input !== '') {
    console.log(`${input} is not a valid ${argvText}: `)
   }
   input = await prompt(c.reset(`What is your ${argvText}: `));
   returnvalue = input.replace("~", require("os").homedir);
   if (fs.existsSync(returnvalue)) {
    valid = true
   }

  }
  return returnvalue
 }

 go()
}
main2()

async function main() {
 console.log('\n')
 const {default:chalk} = await import("chalk");
 const l = (s) => {
  var prefix = '* ReExt: '
  console.log(chalk.blue(prefix+s))
 }
 l('started...')

 const { default:inquirer } = await import("inquirer");
 const {default:d} = await import("inquirer-select-directory");
 inquirer.registerPrompt('directory', d);
 var valid = false
 var message = "select source folder"
 while (valid === false) {
  var a = await inquirer.prompt([
   {
     type: "directory",
     name: "from",
     options: {displayFiles:false},
     message: message,
     basePath: "/Users/marcgusmano"
   }
 ]);
  if (a.from === '/Users') {
   valid = true
   console.log('valid')
  }
  else {
   console.log('not valid, please select again')
   message = 'not valid, please select again'
  }
 }
}
//main();
