namespace Tips.Service

open Tips.Model

type IDataStore =

    abstract member CreateUser : User -> User
    abstract member GetUsers : unit -> User list
    abstract member UpdateUser : User -> bool
    abstract member DeleteUser : User -> bool

    abstract member CreateProject : Project -> Project
    abstract member GetProjects : unit -> Project list
    abstract member UpdateProject : Project -> bool
    abstract member DeleteProject : Project -> bool

    abstract member CreateTaskItem : TaskItem -> TaskItem
    abstract member GetTaskItems : unit -> TaskItem list
    abstract member UpdateTaskItem : TaskItem -> bool
    abstract member DeleteTaskItem : TaskItem -> bool

    abstract member CreateSprint : Sprint -> Sprint
    abstract member GetSprints : unit -> Sprint list
    abstract member UpdateSprint : Sprint -> bool
    abstract member DeleteSprint : Sprint -> bool


// Debug用のin memoryTable
type Crud<'M> 
    ( getID : 'M -> int
    , createFrom : int -> 'M -> 'M) =
    let mutable models : 'M list = List.Empty
    member __.Create (model:'M) = 
        let newID = 
            models 
            |> List.fold (fun (max:int) (x:'M) -> if max < getID x then getID x else max ) -1
            |> (+) 1
            
        let newOne = createFrom newID model
        models <- models @ [newOne]
        newOne
    member __.Get () = models
    member __.Update model =
        let xs = 
            models
            |> List.where (fun (x:'M) -> getID x = getID model)
        models <- xs @ [model]
        true            
         
    member __.Delete model =
        let xs = 
            models
            |> List.where (fun (x:'M) -> getID x = getID model)
        models <- xs
        true


// debug 
type DebugDataStore () =
    let userCRUD = Crud<User>((fun x -> x.ID), (fun id x -> 
        { 
            ID = id 
            Name = x.Name 
            Email = x.Email
            Password = x.Password
        })) 
    let projectCRUD = Crud<Project>((fun x -> x.ID), (fun id x -> 
        { 
            ID = id
            Name = x.Name
            Sprints = x.Sprints
            Tasks = x.Tasks
            Users = x.Users
        }) ) 
    let taskCRUD = Crud<TaskItem>((fun x -> x.ID), (fun id x -> 
        { 
            ID = id
            Name = x.Name
            Value = x.Value
            Tags = x.Tags
        }) ) 
    let sprintCRUD = Crud<Sprint>((fun x -> x.ID), (fun id x -> 
        { 
            ID = id 
            Name = x.Name 
            Tasks = x.Tasks
            Range = x.Range
        }) ) 

    do 
        let user = userCRUD.Create {
                ID = -1
                Email = "test"
                Name = "testUser"
                Password = "test"
        }
        projectCRUD.Create {
            ID = 1
            Name = "project01"
            Sprints = List.empty
            Tasks = List.empty
            Users = [user]
        } |> ignore
        ()


    interface IDataStore with
        member __.CreateUser u = userCRUD.Create u 
        member __.GetUsers () = userCRUD.Get ()
        member __.UpdateUser u = userCRUD.Update u
        member __.DeleteUser u = userCRUD.Delete u

        member __.CreateProject x = projectCRUD.Create x
        member __.GetProjects () = projectCRUD.Get ()
        member __.UpdateProject x = projectCRUD.Update x
        member __.DeleteProject x = projectCRUD.Delete x

        member __.CreateTaskItem x = taskCRUD.Create x
        member __.GetTaskItems () = taskCRUD.Get ()
        member __.UpdateTaskItem x = taskCRUD.Update x
        member __.DeleteTaskItem x = taskCRUD.Delete x

        member __.CreateSprint x = sprintCRUD.Create x
        member __.GetSprints () = sprintCRUD.Get ()
        member __.UpdateSprint x = sprintCRUD.Update x
        member __.DeleteSprint x = sprintCRUD.Delete x