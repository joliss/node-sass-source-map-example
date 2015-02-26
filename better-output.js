var fs = require('fs')
var path = require('path')
var sass = require('node-sass')
var express = require('express')

var outFile = 'dist/assets/app.css'

var result = sass.renderSync({
  file: 'styles/app.scss',
  includePaths: ['styles', 'vendor'],
  sourceMap: true,
  // HACK 1: Force all "sources" to be relative to project root
  outFile: path.join(process.cwd(), path.basename(outFile)),
  sourceMapContents: true,
})

// HACK 2: node-sass does not support sourceRoot, but we can add it
var map = JSON.parse(result.map)
map.sourceRoot = 'file://' + __dirname
result.map = JSON.stringify(map, null, '\t')

console.error(result.map)

fs.writeFileSync(outFile, result.css)
fs.writeFileSync(outFile + '.map', result.map)
fs.writeFileSync('dist/index.html', '<!DOCTYPE html><link rel="stylesheet" href="assets/app.css">')

var app = express()
app.use(express.static(__dirname + '/dist'))
app.listen(3000, '0.0.0.0')
console.error('Serving ./dist on http://0.0.0.0:3000/')
