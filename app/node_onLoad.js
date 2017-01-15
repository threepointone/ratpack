// this is run in stand-alone single node process
// as a script / cli-tool
// and should print result back to console

const fs = require('fs')
const filepath = process.argv[2]


fs.readFile(filepath, 'utf8', (err, src) => {
  if(err) throw err

  process.stdout.write(src)
})
