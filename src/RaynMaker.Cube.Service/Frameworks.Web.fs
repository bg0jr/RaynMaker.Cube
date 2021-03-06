﻿namespace RaynMaker.Cube.Frameworks

module Httpd =
    open Suave
    open System.Net
    open System.Threading
    
    let start app =
        let port = 25251us
        let local = HttpBinding.create HTTP IPAddress.Loopback port
                
        let cts = new CancellationTokenSource()
        let config = { defaultConfig with bindings = [ local ]
                                          cancellationToken = cts.Token }

        let _, server = startWebServerAsync config app
    
        Async.Start(server, cts.Token)

        port |> int32, cts

 module Browser =
    open System.Diagnostics

    let start port = 
        Process.Start(sprintf "http://localhost:%i/" port) |> ignore

