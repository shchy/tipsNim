# Package

version       = "0.1.0"
author        = "shch"
description   = "tips"
license       = "MIT"
srcDir        = "src"
binDir        = "src"
bin           = @["tipsNim"]

# Dependencies

requires "nim >= 0.18.0"
requires "alpaka >= 0.1.0"


task clean, "clean":
    exec "rm -rf ./src/tipsNim"
    exec "rm -rf ./src/nimcache"
    
task exec, "exec":
#    exec "rm -rf ./bin"
    exec "nimble build"
#    exec "cp -a ./src/assets/ ./bin/assets/"
#    exec "cp -a ./src/views/ ./bin/views/"
    exec "./src/tipsNim"

