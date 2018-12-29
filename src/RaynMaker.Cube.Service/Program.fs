module RaynMaker.Cube.Main

open System.Threading
open System
open System.Reflection
open System.IO
open Suave
open Suave.Operators
open Suave.Filters
open Suave.Redirection
open RaynMaker.Cube.Frameworks
open System.Diagnostics
open Suave.RequestErrors
open RaynMaker.Cube.Gateways
open Suave.Writers
open Suave.Successful

type internal Services = {
    suaveCts : CancellationTokenSource
}

type Instance = {
    port : int
    services : obj 
}

let private getHome () =
    let location = Assembly.GetExecutingAssembly().Location
    location |> Path.GetDirectoryName |> Path.GetFullPath

let start storeHome =
    let location = Assembly.GetExecutingAssembly().Location
    let home = getHome()
    printfn "Home: %s" home

    // development support
    Process.GetProcesses()
    |> Seq.filter(fun x -> x.ProcessName = Path.GetFileNameWithoutExtension(location))
    |> Seq.filter(fun x -> x.Id <> Process.GetCurrentProcess().Id)
    |> Seq.iter(fun x -> x.Kill())
    
    printfn "Starting ..."

    let app = 
        let log = request (fun r -> printfn "%s" r.path; succeed)

        let setCORSHeaders =
            addHeader  "Access-Control-Allow-Origin" "*" 
            >=> addHeader "Access-Control-Allow-Headers" "content-type" 
            >=> addHeader "Access-Control-Allow-Methods" "GET,POST,PUT" 

        choose [ 
            GET >=> log >=> setCORSHeaders >=> choose
                [
                    path "/" >=> redirect "/Client/index.html"
                    pathScan "/Client/%s" (fun f -> Files.file (sprintf "%s/Client/%s" home f))
                    pathScan "/static/%s" (fun f -> Files.file (sprintf "%s/Client/static/%s" home f))
                    path "/api/Explore" >=> warbler (fun _ -> Controllers.explore storeHome)
                    NOT_FOUND "Resource not found."
                ]
        ]

    let port,cts = Httpd.start app

    { 
        port = port
        services = { suaveCts = cts } 
    }

let stop instance =
    let services = instance.services :?> Services

    services.suaveCts.Cancel()

let getStoreFromCommandLine argv =
    let home = getHome()

    argv |> printf "Cmd line: %A"

    match argv with
    | [| path |] -> path 
    | _ -> Path.Combine(home, "..", "..", "docs", "Samples")
    |> Path.GetFullPath

[<EntryPoint>]
let main argv =
    let instance = 
        argv
        |> getStoreFromCommandLine
        |> start 

    Browser.start instance.port

    Console.ReadKey true |> ignore
    
    stop instance

    0
