namespace Tips.Router
open Microsoft.Extensions.Configuration
open Giraffe

type Root(config: IConfiguration) =
   let config = config
   let auth = new Auth(config)

   member this.Handlers: HttpHandler =
        choose [
            subRoute "/api/v1/auth" (auth.Handlers)
            GET >=> htmlFile "./assets/index.html" 
        ]
