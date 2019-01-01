module RaynMaker.Cube.Entities

type Figure = {
    Name : string
    Values : (int * float) list
}

type Case = {
    Name : string
    Isin : string
    Figures : Figure list
}

