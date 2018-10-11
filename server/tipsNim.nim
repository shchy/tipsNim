import 
    alpaka,
    alpaka/auth/sessionauth,
    module/api/auth,
    service/datacontext,
    service/models,
    os, strutils,
    sequtils

var cacheSeconds = 0
when defined(release):
    cacheSeconds = 60 * 60 * 24 * 30

let handler = choose(
    # subRoute("/",           signin.handlers),
    subRoute("/api/v1/auth/",  auth.handlers),  
    serveDir("/", "./assets/dist/", cacheSeconds),
    NOTFOUND >=> view "./assets/index.html",
)



proc getUser*(id,pass: string): AuthedUser =
    let users = getUsers().filter do (u:User) -> bool: u.id == id and u.password == pass
    if users.len() <= 0:
        return nil
    return AuthedUser(
        id: users[0].id,
        name: users[0].name,
        role: @[],
    )

var port = 80
if paramCount() >= 1:
  port = paramStr(1).parseInt()
handler
    .newRouter()
    .useSessionAuth(getUser, "/", "authCookie", "hash", 60 * 30)
    .useAsyncHttpServer(port, "0.0.0.0")
    .run()
