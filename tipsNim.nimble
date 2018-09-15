# Package

version       = "0.1.0"
author        = "shch"
description   = "tips"
license       = "MIT"
srcDir        = "server"
binDir        = "server"
bin           = @["tipsNim"]

# Dependencies

requires "nim >= 0.18.0"
requires "alpaka >= 0.1.0"


task clean, "clean":
    exec "rm -rf ./server/tipsNim"
    exec "rm -rf ./server/nimcache"
    
task exec, "exec":
    exec "nimble build"
#    exec "cp -a ./src/assets/ ./bin/assets/"
#    exec "cp -a ./src/views/ ./bin/views/"
    exec "npm run build"
    exec "./server/tipsNim"

