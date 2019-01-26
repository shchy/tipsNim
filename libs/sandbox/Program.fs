// Learn more about F# at http://fsharp.org

open System
open Evm

[<EntryPoint>]
let main argv =
    printfn "Hello World from F#!"
    let pv = [
        for i in 0..10 ->
            { Date = DateTime.Now.AddDays(float(i)); Value = float(1.0) }
    ]

    let ev = [
        for i in 1..10 ->
            { Date = DateTime.Now.AddDays(float(i)); Value = float(1.0) }
    ]

    let ac = [
        for i in 2..10 ->
            { Date = DateTime.Now.AddDays(float(i)); Value = float(1.0) }
    ]
    
    let ctxt = Context.Make pv ev ac
    for log in ctxt.logs do
        log.ToString() |> printfn "%s"
    for log in ctxt.makeLog 7 do
        log.ToString() |> printfn "%s"         

    0 // return an integer exit code
