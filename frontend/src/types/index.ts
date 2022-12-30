export type Reservation = {
    id?: number
    idprzejazdu: number
    imie: string
    nazwisko: string
    znizka: string
}

export type ReservationResponse = {
    id?: number,
    dataodjazdu: Date,
    dataprzyjazdu: Date,
    imie: string,
    nazwisko: string,
    znizka: string,
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

export type TrainStopNumberless = {
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

export type TrainRideResponse = {
    id?: number,
    dataodjazdu: Date,
    dataprzyjazdu: Date,
    idkonduktora: number,
    idmaszynisty: number,
    imiekonduktora: string,
    nazwiskokonduktora: string,
    imiemaszynisty: string,
    nazwiskomaszynisty: string,
    idliniiprzejazdu: number,
    nazwapociagu: string,
}

export type RailConnection = {
    id?: number,
}

export type Locomotive = {
    id?: number,
    databadaniatechnicznego: Date,
    databadaniatechnicznegomin?: Date,
    databadaniatechnicznegomax?: Date,
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
    liczbamiejsc: number
}

export type RailroadCar = {
    numerwagonu: number,
    idwagonu: number,
    idpociagu: number,
}

export type RailroadCarNumberless = {
    idwagonu: number,
    idpociagu: number,
}

export type RailroadCarResponse = {
    numerwagonu: number,
    idwagonu: number,
    idpociagu: number,
    nazwapociagu: string,
}