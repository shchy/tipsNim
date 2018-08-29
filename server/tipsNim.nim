import 
    alpaka,
    alpaka/auth/sessionauth,
    module/signin


let handler = choose(
    # subRoute("/",           signin.handlers),
    # subRoute("/home/",      mustBeAuth >=> choose(home.handlers)),
    serveDir("/", "./assets/dist/", 60 * 60 * 24 * 7),
    NOTFOUND >=> view "./assets/index.html",
)

handler
    .newRouter()
    .useSessionAuth(getUser, "/", "authCookie", "hash", 60 * 30)
    .useAsyncHttpServer(8080)
    .run()
