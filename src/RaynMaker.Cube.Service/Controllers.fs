namespace RaynMaker.Cube.Gateways

module Controllers =
    open System
    open Suave.Http
    open RaynMaker.Cube.Entities
    
    [<AutoOpen>]
    module private Impl =
        open Suave
        open Suave.Successful
        open Suave.Operators
        open Newtonsoft.Json
        open Newtonsoft.Json.Serialization

        let JSON v =
            let jsonSerializerSettings = new JsonSerializerSettings()
            jsonSerializerSettings.ContractResolver <- new CamelCasePropertyNamesContractResolver()

            JsonConvert.SerializeObject(v, jsonSerializerSettings)
            |> OK
            >=> Writers.setMimeType "application/json; charset=utf-8"

        let (=>) k v = k,v |> box
        let formatDate (date:DateTime) = date.ToString("yyyy-MM-dd")
        let formatTimespan (span:TimeSpan) = 
            match span.TotalDays with
            | x when x > 365.0 -> sprintf "%.2f years" (span.TotalDays / 365.0)
            | x when x > 90.0 -> sprintf "%.2f months" (span.TotalDays / 30.0)
            | x -> sprintf "%.0f days" span.TotalDays
        let formatCount = sprintf "%.2f"
        let formatPrice = sprintf "%.2f"
        
    let explore cases = 
        cases
        |> List.map(fun case -> dict [ "isin" => case.Isin; "name" => case.Name ])
        |> JSON
                        
    let case cases isin = 
        printfn "Isin: %s" isin
        cases
        |> Seq.find(fun c -> c.Isin = isin)
        |> fun c -> c.Figures
        |> Seq.map(fun f ->
            dict [
                "title" => f.Name
                "labels" => (f.Values |> Seq.sortBy(fun (k,_) -> k) |> Seq.map(fun (k,_) -> k |> sprintf "%i") |> List.ofSeq)
                "data" => (f.Values |> Seq.sortBy(fun (k,_) -> k) |> Seq.map snd |> List.ofSeq)
            ]
        )
        |> List.ofSeq
        |> JSON
                        
