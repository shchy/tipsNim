module Tips.App

open System
open System.IO
open System.Text
open Microsoft.AspNetCore.Authentication.JwtBearer
open System.Reflection
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Cors.Infrastructure
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.Logging
open Microsoft.Extensions.DependencyInjection
open Microsoft.IdentityModel.Tokens
open Giraffe
open Tips.Router

let mutable Configuration: IConfiguration = null

let jwtOptions (options :JwtBearerOptions) = 
    options.TokenValidationParameters <- new TokenValidationParameters(
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = Configuration.["Jwt:Issuer"],
        ValidAudience = Configuration.["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.["Jwt:Key"]))
    )
    
    
// ---------------------------------
// Error handler
// ---------------------------------

let errorHandler (ex : Exception) (logger : ILogger) =
    logger.LogError(EventId(), ex, "An unhandled exception has occurred while executing the request.")
    clearResponse >=> setStatusCode 500 >=> text ex.Message

// ---------------------------------
// Config and Main
// ---------------------------------

let configureCors (builder : CorsPolicyBuilder) =
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader()
           |> ignore

let configureApp (app : IApplicationBuilder) =
    let env = app.ApplicationServices.GetService<IHostingEnvironment>()
    (match env.IsDevelopment() with
    | true  -> app.UseDeveloperExceptionPage()
    | false -> app.UseGiraffeErrorHandler errorHandler)
        // .UseHttpsRedirection()
        .UseCors(configureCors)
        .UseStaticFiles()
        .UseAuthentication()
        .UseGiraffe(Root.webApp)

let configureServices (services : IServiceCollection) =                                                
    services.AddCors()    |> ignore
    services.AddGiraffe() |> ignore
    services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(Action<JwtBearerOptions>(jwtOptions)) |> ignore

let configureLogging (builder : ILoggingBuilder) =
    let filter (l : LogLevel) = l.Equals LogLevel.Error
    builder.AddFilter(filter).AddConsole().AddDebug() |> ignore

[<EntryPoint>]
let main _ =
    let contentRoot = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location)
    let webRoot     = Path.Combine(contentRoot, "assets/dist")
    let builder = 
        new ConfigurationBuilder()
    builder.SetBasePath(contentRoot) |> ignore
    builder.AddJsonFile("appsettings.json", optional= false, reloadOnChange= true) |> ignore
    builder.AddEnvironmentVariables() |> ignore
    Configuration <- builder.Build() 
    
    WebHostBuilder()
        .UseKestrel()
        .UseContentRoot(contentRoot)
        .UseIISIntegration()
        .UseWebRoot(webRoot)
        .Configure(Action<IApplicationBuilder> configureApp)
        .ConfigureServices(configureServices)
        .ConfigureLogging(configureLogging)
        .UseUrls("http://*:8080/;https://*:8081/")
        .UseSetting("https_port", "8081")
        .Build()
        .Run()
    0