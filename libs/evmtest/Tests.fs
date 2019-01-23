namespace Evmtest

open System
open Microsoft.VisualStudio.TestTools.UnitTesting
open evm

[<TestClass>]
type TestClass () =

    [<TestMethod>]
    member this.TestMethodPassing () =
        Say.hello "tester"
        Assert.IsTrue(true);
