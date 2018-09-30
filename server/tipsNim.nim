import 
    alpaka,
    alpaka/auth/sessionauth,
    module/signin,
    os, strutils

var cacheSeconds = 0
when defined(release):
    cacheSeconds = 60 * 60 * 24 * 30

let handler = choose(
    # subRoute("/",           signin.handlers),
    # subRoute("/home/",      mustBeAuth >=> choose(home.handlers)),
    serveDir("/", "./assets/dist/", cacheSeconds),
    NOTFOUND >=> view "./assets/index.html",
)


var port = 80
if paramCount() >= 1:
  port = paramStr(1).parseInt()
handler
    .newRouter()
    .useSessionAuth(getUser, "/", "authCookie", "hash", 60 * 30)
    .useAsyncHttpServer(port, "0.0.0.0")
    .run()
