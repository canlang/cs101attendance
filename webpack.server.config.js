const path = require("path")
const fs = require("fs")

// -- Webpack configuration --

const config = {}

// Application entry point
config.entry = "./src/server/index.js"

// We build for node
config.target = "node"
