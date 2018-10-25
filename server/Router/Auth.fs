namespace Tips.Router


open System
open System.IO
open System.Text
open System.Security.Claims
open System.Threading
open System.IdentityModel.Tokens.Jwt
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
open Microsoft.IdentityModel.Tokens
open FSharp.Control.Tasks.V2.ContextInsensitive
open Giraffe
open Tips.Model

type Auth(config: IConfiguration) =
    let _config = config
    let return401 = (clearResponse >=> setStatusCode 401 >=> text "Must be Auth")
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
                    else return401 next ctx
            }
    
    let getUser (model: LoginModel) =
        if model.Email = "test@test" && model.Password = "hoge" 
        then Some { ID = 0; Email= model.Email; Name= "tester"; Password= model.Password }
        else None

    let buildToken (user: User) =    
        let claims = [
            new Claim(JwtRegisteredClaimNames.Sub, user.Name);
            new Claim(JwtRegisteredClaimNames.Email, user.Email);
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString());
        ]

        let key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.["Jwt:Key"]));
        let creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        let expires = DateTime.Now.AddMinutes 30.0
        let token = 
            new JwtSecurityToken(
                _config.["Jwt:Issuer"],
                _config.["Jwt:Issuer"],
                claims,
                expires= new Nullable<DateTime>(expires),
                signingCredentials= creds)
        let tokenHandler = new JwtSecurityTokenHandler()
        tokenHandler.WriteToken(token)

    let createToken: HttpHandler =
        fun (next : HttpFunc) (ctx : HttpContext) ->
            task {
                let! model = ctx.BindJsonAsync<LoginModel>() 
                return!
                    getUser(model)
                    |> function 
                    | Some(x) -> buildToken(x) 
                    | _       -> ""
                    |> function 
                    | ""    -> return401 next ctx
                    | token -> ctx.WriteJsonAsync { Token = token }
                
            }
    
    member this.Handlers: HttpHandler =
        choose [
            POST  >=> route "/token" >=> createToken
            GET   >=> route "/me" >=> mustBeAuth >=> text "{\"name\" :\"test\"}"
        ]



