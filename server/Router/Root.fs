namespace Tips.Router
open Giraffe

module Root =
    let webApp: HttpHandler =
        choose [
            subRoute "/api/v1/auth" (Auth.handlers)
            GET >=> htmlFile "./assets/index.html" 
        ]
