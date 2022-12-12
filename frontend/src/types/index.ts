export type Reservation = {
    id: number
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


export type TrainPassage = {
    id: number,
    dataodjazdu: Date,
    dataprzyjazdu: Date,
    idkonduktora: number,
    idmaszynisty: number,
    idliniiprzejazdu: number,
    idpociagu: number,
}

export type TrainRouteLine = {
    id: number,
}
