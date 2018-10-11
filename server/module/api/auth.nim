import
    alpaka,
    alpaka/auth/sessionauth,
    ../../service/datacontext,
    sequtils
import 
    ../../service/models

let signin = handler(ctx) do:
    let id = ctx.req.getFormParam "id"
    let pass = ctx.req.getFormParam "password"
    # let isRemember = ctx.req.getFormParam "isRemember"
    if ctx.signin(id, pass):
        return ctx.redirect("/home/")
    return ctx.redirect("/")


let handlers* = [
    # route("/") >=> choose(
    #     GET >=> isNotAuthed >=> view "views/signin.html",
    #     GET >=> isAuthed >=> redirect("/home/"),
    #     POST >=> signin,
    # )

    POST >=> route("/token") >=> text "test"
]

