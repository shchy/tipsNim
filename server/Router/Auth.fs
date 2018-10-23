namespace Tips.Router


open System
open System.Security.Claims
open System.Threading
open Microsoft.AspNetCore
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.AspNetCore.Http
open Microsoft.AspNetCore.Http.Features
open Microsoft.AspNetCore.Authentication
open Microsoft.AspNetCore.Authentication.Cookies
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.Logging
open Microsoft.Extensions.DependencyInjection
open FSharp.Control.Tasks.V2.ContextInsensitive
open Giraffe

module Auth =
    let mustBeAuth: HttpHandler =
        fun (next : HttpFunc) (ctx : HttpContext) ->
            task {
                let user = ctx.User
                let email = 
                    user.Claims
                    |> Seq.tryFind(fun x -> x.Type = ClaimTypes.Email) 
                    |> function 
                        | Some(x) -> x
                        | None    -> null
                
                return!
                    if isNotNull email
                    then next ctx
                    else (clearResponse >=> setStatusCode 401 >=> text "Must be Auth") next ctx
            }

    let handlers: HttpHandler =
        choose[
            POST  >=> route "/token" >=> text "{\"token\" :\"testToken\"}"
            GET   >=> route "/me" >=> mustBeAuth >=> text "{\"name\" :\"test\"}"
        ]