namespace RaynMaker.Cube.Gateways

module Controllers =
    open System
    open Suave.Http
    
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
        
    let explore storeHome = 
        [
            dict [ "id" => "US123"; "name" => "IBM" ]
            dict [ "id" => "US789"; "name" => "Apple" ]
            dict [ "id" => "DE456"; "name" => "Siemens" ]
        ]
        |> JSON
                        
    let case storeHome id = 
        printfn "%s" id
        [
            dict [
                "title" => "Dividend"
                "labels" => [ "2010"; "2011"; "2012"; "2013"; "2014"; "2015"; "2016"; "2017"; "2018" ]
                "data" => [ 2.0; 2.0; 2.1; 2.0; 2.2; 2.1; 2.3; 2.3; 2.4; ]
            ]
            dict [
                "title" => "EPS"
                "labels" => [ "2010"; "2011"; "2012"; "2013"; "2014"; "2015"; "2016"; "2017"; "2018" ]
                "data" => [ 5.1; 5.1; 5.2; 5.4; 5.6; 6.0; 6.3; 6.8; 7.1; ]
            ]
        ]
        |> JSON
                        
