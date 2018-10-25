namespace Tips.Model

open System

[<CLIMutable>]
type LoginModel =
    {
        Email : string;
        Password : string;
    }

[<CLIMutable>]
type TokenModel =
    {
        Token : string;
    }
