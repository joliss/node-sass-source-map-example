var fs = require('fs')
var path = require('path')
var sass = require('node-sass')
var express = require('express')

var outFile = 'dist/assets/app.css'

var result = sass.renderSync({
  file: 'styles/app.scss',
  includePaths: ['styles', 'vendor'],
  sourceMap: true,
  outFile: outFile,
  sourceMapContents: true,
})

console.error(result.map)

fs.writeFileSync(outFile, result.css)
fs.writeFileSync(outFile + '.map', result.map)
fs.writeFileSync('dist/index.html', '<!DOCTYPE html><link rel="stylesheet" href="assets/app.css">')

var app = express()
app.use(express.static(__dirname + '/dist'))
app.listen(3000, '0.0.0.0')
console.error('Serving ./dist on http://0.0.0.0:3000/')
