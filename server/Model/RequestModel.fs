namespace Tips.Model

open System

[<CLIMutable>]
type LoginModel =
    {
        Id : string;
        Password : string;
    }

[<CLIMutable>]
type TokenModel =
    {
        Token : string;
    }
