namespace Evm
open System

type Point =
    {
        Value : double
        Date  : DateTime
    }

type Log =
    {
        Pv : double
        Ev : double
        Ac : double
        Date : DateTime
    }


module calc =
    // make min 00:00 - max 23:59:59
    let makeRange (min:DateTime) (max:DateTime) = (min.Date, max.Date.AddDays(1.0).AddTicks(-1L))
    
    // 
    let makeRanges (day:DateTime) span count = 
        [for i in [0..span..count] -> makeRange (day.AddDays (float(i))) (day.AddDays (float(i + span - 1)))]

    // get min,max in list
    let getDateRange (xs: Point list) = 
        let dates = List.map (fun (x:Point) -> x.Date) xs            
        let minDate = List.min dates
        let maxDate = List.max dates
        (minDate, maxDate)        

        // (xs: ^T list when ^T : (member Date : DateTime))
    let inline filterRange (min:DateTime) (max:DateTime) (xs: ^T list) =
        List.filter (fun (p:^T) -> min <= (^T : (member Date : DateTime) (p) ) 
                                       && (^T : (member Date : DateTime) (p) ) <= max) xs

type Context(logs : Log list, minDate:DateTime, maxDate:DateTime) =
    member val logs : Log list = logs

    member this.makeLog interval =
        let diff = int((maxDate - minDate).TotalDays)
        let ranges = calc.makeRanges minDate interval diff

        let intervalLogs = 
            ranges
            |> List.map (fun (min,max) ->
                calc.filterRange min max this.logs 
                |> List.reduce (fun x y ->
                {
                    Date = min
                    Pv = x.Pv + y.Pv
                    Ev = x.Ev + y.Ev
                    Ac = x.Ac + y.Ac
                })
            )
        let scanLog acc log = 
            {
                Date = log.Date
                Pv = acc.Pv + log.Pv
                Ev = acc.Ev + log.Ev
                Ac = acc.Ac + log.Ac
            }
        intervalLogs     
            |> List.scan scanLog {Date=DateTime.MinValue; Pv=0.0;Ev=0.0;Ac=0.0}
            |> List.tail
        


    static member Make (pv: Point list) (ev:Point list) (ac:Point list) =
        let (minDate, maxDate) = calc.getDateRange (pv @ ev @ ac)

        let diff = int((maxDate - minDate).TotalDays)
        let ranges = calc.makeRanges minDate 1 diff
        let mapToLog = (fun (min:DateTime,max:DateTime) -> 
                {
                    Date = min
                    Pv = calc.filterRange min max pv |> List.sumBy (fun x -> x.Value)
                    Ev = calc.filterRange min max ev |> List.sumBy (fun x -> x.Value)
                    Ac = calc.filterRange min max ac |> List.sumBy (fun x -> x.Value)
                })
        let logList = List.map mapToLog ranges
                        |> List.sortBy (fun (x: Log) -> x.Date)
        new Context(logList, minDate, maxDate)