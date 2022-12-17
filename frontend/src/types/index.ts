export type Reservation = {
    id?: number
    idprzejazdu: number
    imie: string
    nazwisko: string
    znizka: string
}

export type Discount = {
    nazwaznizki: string,
    procentznizki: number,
    dokumentpotwierdzajacy: string,
}

export type TrainStop = {
    numerprzystanku: number,
    nazwastacji: string,
    idlinii: number,
}

export type Station = {
    nazwa: string,
    adres: string,
}

export type TrainRide = {
    id?: number,
    dataodjazdu: Date,
    dataprzyjazdu: Date,
    idkonduktora: number,
    idmaszynisty: number,
    idliniiprzejazdu: number,
    idpociagu: number,
}

export type RailConnection = {
    id?: number,
}

export type Locomotive = {
    id?: number,
    databadaniatechnicznego: Date,
    nazwa: string
}

export type Train = {
    id?: number,
    nazwa: string,
    idlokomotywy: number
}

export type Worker = {
    id?: number,
    imie: string,
    nazwisko: string,
    placa: number,
    zawod: string,
}

export type Carriage = {
    id?: number,
    databadaniatechnicznego: Date,
    nazwa: string
}

export type RailroadCar = {
    numerwagonu: number,
    idwagonu: number,
    idpociagu: number,
}