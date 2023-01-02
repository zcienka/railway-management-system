export type Reservation = {
    id?: number
    idprzejazdu: number
    imie: string
    nazwisko: string
    znizka: string
}

export type SearchReservation = {
    imie: string,
    nazwisko: string,
    znizka: string,
    dataprzejazdumin: string,
    dataprzejazdumax: string
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

export type SearchDiscount = {
    nazwa: string,
    procentmin: string,
    procentmax: string,
    dokument: string,
}

export type TrainStop = {
    numerprzystanku: number,
    nazwastacji: string,
    idlinii: number,
}

export type SearchTrainStop = {
    numerprzystankumin: string,
    numerprzystankumax: string,
    nazwastacji: string,
    idliniimin: string,
    idliniimax: string,
}

export type TrainStopNumberless = {
    nazwastacji: string,
    idlinii: number,
}

export type Station = {
    nazwa: string,
    adres: string,
}

export type SearchStation = {
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

export type TrainRideRequest = {
    id?: number,
    dataodjazdu: string,
    dataprzyjazdu: string,
    idkonduktora: number,
    idmaszynisty: number,
    idliniiprzejazdu: number,
    idpociagu: number,
}

export type SearchTrainRide = {
    dataodjazdumin: string,
    dataodjazdumax: string,
    dataprzyjazdumin: string,
    dataprzyjazdumax: string,
    idliniiprzejazdumin: string,
    idliniiprzejazdumax: string,
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

export type SearchLocomotive = {
    databadaniamin: string,
    databadaniamax: string,
    nazwa: string
}

export type Train = {
    id?: number,
    nazwa: string,
    idlokomotywy: number
}

export type SearchTrain = {
    nazwa: string,
    idlokomotywymin: string,
    idlokomotywymax: string
}

export type Worker = {
    id?: number,
    imie: string,
    nazwisko: string,
    placa: number,
    zawod: string,
}
export type SearchWorker = {
    imie: string,
    nazwisko: string,
    placamin: string,
    placamax: string,
    zawod: string
}

export type RailroadCar = {
    id?: number,
    databadaniatechnicznego: Date,
    liczbamiejsc: number
}

export type SearchRailroadCar = {
    databadaniamin: string,
    databadaniamax: string,
    liczbamiejscmin: string,
    liczbamiejscmax: string,
}

export type RailroadCarInTheTrain = {
    numerwagonu: number,
    idwagonu: number,
    idpociagu: number,
}

export type SearchRailroadCarInTheTrain = {
    idwagonumin: string,
    idwagonumax: string,
    nazwapociagu: string,
}

export type RailroadCarNumberless = {
    idwagonu: number,
    idpociagu: number,
}

export type RailroadCarInTheTrainResponse = {
    numerwagonu: number,
    idwagonu: number,
    idpociagu: number,
    nazwapociagu: string,
}

export type RailroadCarSearch = {
    databadaniamin: Date,
    databadaniamax: Date,
    liczbamiejscmin: string,
    liczbamiejscmax: string,
}
