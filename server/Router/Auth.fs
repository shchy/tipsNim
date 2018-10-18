namespace Tips.Router

open Giraffe

module Auth =
    let handlers: HttpHandler =
        choose[
            POST  >=> route "/token" >=> text "{\"token\" :\"testToken\"}"
            GET   >=> route "/me" >=> text "{\"name\" :\"test\"}"
        ]