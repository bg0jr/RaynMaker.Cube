module RaynMaker.Cube.Frameworks.Storage
open RaynMaker.Cube.Entities

    module internal Impl =
        open FSharp.Data
        open System.IO
        open System.Diagnostics
        open System

        type CaseDb = JsonProvider<"../../docs/Samples/Company1.json">

        let loadCases storeHome = 
            Directory.EnumerateFiles(storeHome, "*.json")
            |> Seq.map CaseDb.Load
            |> Seq.map(fun c -> 
                { 
                    Name = c.Name
                    Isin = c.Isin
                    Figures = 
                        c.Figures 
                        |> Seq.map(fun f -> 
                            { 
                                Name = f.Name
                                Values = 
                                    f.Values.JsonValue.Properties()
                                    |> Seq.map(fun (k,v) -> Convert.ToInt32(k),v.AsFloat())
                                    |> List.ofSeq
                            })
                        |> List.ofSeq
                })
            |> List.ofSeq

let loadCases = Impl.loadCases

