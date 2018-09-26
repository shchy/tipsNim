import 
    alpaka,
    alpaka/auth/sessionauth,
    module/signin

var cacheSeconds = 0
when declared(release):
    cacheSeconds = 60 * 60 * 24 * 30


let handler = choose(
    # subRoute("/",           signin.handlers),
    # subRoute("/home/",      mustBeAuth >=> choose(home.handlers)),
    serveDir("/", "./assets/dist/", cacheSeconds),
    NOTFOUND >=> view "./assets/index.html",
)

handler
    .newRouter()
    .useSessionAuth(getUser, "/", "authCookie", "hash", 60 * 30)
    .useHttpServer(8080)
    .run()
