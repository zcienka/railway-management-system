CREATE OR REPLACE FUNCTION pracownikReadAll()
    RETURNS SETOF pracownik AS
$$
BEGIN
    RETURN QUERY SELECT * FROM pracownik order by id;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION pracownikReadById(IN vId INTEGER)
    RETURNS SETOF pracownik AS
$$
BEGIN
    RETURN QUERY SELECT * FROM pracownik where vId = id;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION pracownikFilter(IN vImie varchar(16) DEFAULT '',
                                           IN vNazwisko varchar(32) DEFAULT '',
                                           IN vZawod varchar(16) DEFAULT '',
                                           IN vMinPlaca INTEGER DEFAULT 0,
                                           IN vMaxPlaca INTEGER DEFAULT 99999)
    RETURNS SETOF pracownik AS
$$
BEGIN
    RETURN QUERY SELECT *
                 FROM pracownik
                 where imie LIKE ('%' || vImie || '%')
                   and nazwisko LIKE ('%' || vNazwisko || '%')
                   and zawod LIKE ('%' || vZawod || '%')
                   and vMinPlaca <= placa
                   and placa <= vMaxPlaca;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION pracownikDelete(IN vId INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from pracownik where id = vId) != 1) then return 0; end if;
    delete from pracownik where id = vId;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION pracownikUpdate(IN vId INTEGER,
                                           IN vImie varchar(16),
                                           IN vNazwisko varchar(32),
                                           IN vZawod varchar(16),
                                           IN vPlaca INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from pracownik where id = vId) != 1) then return 0; end if;
    if (vZawod NOT IN ('Maszynista', 'Konduktor')) then return -1; end if;
    if (length(vImie) < 0 or length(vImie) > 16) then return -2; end if;
    if (length(vNazwisko) < 0 or length(vNazwisko) > 32) then return -3; end if;
    if (vPlaca <= 0) then return -4; end if;
    update pracownik
    SET imie     = vImie,
        nazwisko = vNazwisko,
        zawod    = vZawod,
        placa    = vPlaca
    where id = vId;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION pracownikCreate(IN vImie varchar(16),
                                           IN vNazwisko varchar(32),
                                           IN vZawod varchar(16),
                                           IN vPlaca INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if (vZawod NOT IN ('Maszynista', 'Konduktor')) then return -1; end if;
    if (length(vImie) < 0 or length(vImie) > 16) then return -2; end if;
    if (length(vNazwisko) < 0 or length(vNazwisko) > 32) then return -3; end if;
    if (vPlaca <= 0) then return -4; end if;
    insert into pracownik(id, imie, nazwisko, placa, zawod)
    values (nextval('seq_pracownik'), vImie, vNazwisko, vPlaca, vZawod);
    return 1;
END
$$ LANGUAGE plpgsql;

--##########################################################################################

CREATE OR REPLACE FUNCTION wagonReadAll()
    RETURNS SETOF wagon AS
$$
BEGIN
    RETURN QUERY SELECT * FROM wagon order by id;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION wagonReadById(IN vId INTEGER)
    RETURNS SETOF wagon AS
$$
BEGIN
    RETURN QUERY SELECT * FROM wagon where vId = id;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION wagonFilter(IN vMiejscMin INTEGER DEFAULT 0,
                                       IN vMiejscMax INTEGER DEFAULT 999,
                                       IN vDataMin DATE DEFAULT date('2022-12-31'),
                                       IN vDataMax DATE DEFAULT date('2122-12-31'))
    RETURNS SETOF wagon AS
$$
BEGIN
    RETURN QUERY SELECT *
                 FROM wagon
                 where vDataMin <= databadaniatechnicznego
                   and databadaniatechnicznego <= vDataMax
                   and vMiejscMin <= liczbamiejsc
                   and liczbamiejsc <= vMiejscMax;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION wagonDelete(IN vId INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from wagon where id = vId) != 1) then return 0; end if;
    delete from wagon where id = vId;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION wagonUpdate(IN vId INTEGER,
                                       IN vData DATE,
                                       IN vMiejsc INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from wagon where id = vId) != 1) then return 0; end if;
    if (vData < current_date) then return -1; end if;
    if (vMiejsc < 0) then return -2; end if;
    update wagon
    SET databadaniatechnicznego = vData,
        liczbamiejsc            = vMiejsc
    where id = vId;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION wagonCreate(IN vData DATE,
                                       IN vMiejsc INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if (vData < current_date) then return -1; end if;
    if (vMiejsc < 0) then return -2; end if;
    insert into wagon(id, databadaniatechnicznego, liczbamiejsc)
    values (nextval('seq_wagon'), vData, vMiejsc);
    return 1;
END
$$ LANGUAGE plpgsql;

--##########################################################################################

CREATE OR REPLACE FUNCTION znizkaReadAll()
    RETURNS SETOF znizka AS
$$
BEGIN
    RETURN QUERY SELECT * FROM znizka order by nazwaznizki;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION znizkaReadByName(IN vName varchar(32))
    RETURNS SETOF znizka AS
$$
BEGIN
    RETURN QUERY SELECT * FROM znizka where vName = nazwaznizki;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION znizkaFilter(IN vNazwa VARCHAR(32) DEFAULT '',
                                        IN vDokument VARCHAR(32) DEFAULT '',
                                        IN vProcentMin INTEGER DEFAULT 0,
                                        IN vProcentMax INTEGER DEFAULT 100)
    RETURNS SETOF znizka AS
$$
BEGIN
    RETURN QUERY SELECT *
                 FROM znizka
                 where nazwaznizki LIKE ('%' || vNazwa || '%')
                   and dokumentpotwierdzajacy LIKE ('%' || vDokument || '%')
                   and vProcentMin <= procentznizki
                   and procentznizki <= vProcentMax;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION znizkaDelete(IN vNazwa VARCHAR(32))
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from znizka where nazwaznizki = vNazwa) != 1) then return 0; end if;
    delete from znizka where nazwaznizki = vNazwa;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION znizkaUpdate(IN vNazwa VARCHAR(32),
                                        IN vDokument VARCHAR(32),
                                        IN vProcent INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from znizka where nazwaznizki = vNazwa) != 1) then return 0; end if;
    if (length(vDokument) < 0 or length(vDokument) > 32) then return -1; end if;
    if (vProcent < 0 or vProcent > 100) then return -2; end if;
    update znizka
    SET dokumentpotwierdzajacy = vDokument,
        procentznizki          = vProcent
    where nazwaznizki = vNazwa;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION znizkaCreate(IN vNazwa VARCHAR(32),
                                        IN vDokument VARCHAR(32),
                                        IN vProcent INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from znizka where nazwaznizki = vNazwa) != 0) then return 0; end if;
    if (length(vDokument) < 0 or length(vDokument) > 32) then return -1; end if;
    if (length(vNazwa) < 0 or length(vNazwa) > 32) then return -2; end if;
    if (vProcent < 0 or vProcent > 100) then return -3; end if;
    insert into znizka(nazwaznizki, procentznizki, dokumentpotwierdzajacy)
    values (vNazwa, vProcent, vDokument);
    return 1;
END
$$ LANGUAGE plpgsql;

--##########################################################################################

CREATE OR REPLACE FUNCTION lokomotywaReadAll()
    RETURNS SETOF lokomotywa AS
$$
BEGIN
    RETURN QUERY SELECT * FROM lokomotywa order by id;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION lokomotywaReadById(IN vId INTEGER)
    RETURNS SETOF lokomotywa AS
$$
BEGIN
    RETURN QUERY SELECT * FROM lokomotywa where vId = id;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION lokomotywaFilter(IN vNazwa VARCHAR(32) DEFAULT '',
                                            IN vDataMin DATE DEFAULT date('2022-12-31'),
                                            IN vDataMax DATE DEFAULT date('2122-12-31'))
    RETURNS SETOF lokomotywa AS
$$
BEGIN
    RETURN QUERY SELECT *
                 FROM lokomotywa
                 where vDataMin <= databadaniatechnicznego
                   and databadaniatechnicznego <= vDataMax
                   and nazwa LIKE ('%' || vNazwa || '%');
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION lokomotywaDelete(IN vId INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from lokomotywa where id = vId) != 1) then return 0; end if;
    delete from lokomotywa where id = vId;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION lokomotywaUpdate(IN vId INTEGER,
                                            IN vData DATE,
                                            IN vNazwa VARCHAR(32))
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from lokomotywa where id = vId) != 1) then return 0; end if;
    if (vData < current_date) then return -1; end if;
    if (length(vNazwa) > 32) then return -2; end if;
    update lokomotywa
    SET databadaniatechnicznego = vData,
        nazwa                   = vNazwa
    where id = vId;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION lokomotywaCreate(IN vData DATE,
                                            IN vNazwa VARCHAR(32))
    RETURNS INTEGER AS
$$
BEGIN
    if (vData < current_date) then return -1; end if;
    if (length(vNazwa) > 32) then return -2; end if;
    insert into lokomotywa(id, databadaniatechnicznego, nazwa)
    values (nextval('seq_lokomotywa'), vData, vNazwa);
    return 1;
END
$$ LANGUAGE plpgsql;

--##########################################################################################

CREATE OR REPLACE FUNCTION pociagReadAll()
    RETURNS SETOF pociag AS
$$
BEGIN
    RETURN QUERY SELECT * FROM pociag order by id;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION pociagReadById(IN vId INTEGER)
    RETURNS SETOF pociag AS
$$
BEGIN
    RETURN QUERY SELECT * FROM pociag where vId = id;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION pociagFilter(IN vNazwa VARCHAR(32) DEFAULT '',
                                        IN vIdLokomotywyMin INTEGER DEFAULT 0,
                                        IN vIdLokomotywyMax INTEGER DEFAULT 99999)
    RETURNS SETOF pociag AS
$$
BEGIN
    RETURN QUERY SELECT *
                 FROM pociag
                 where vIdLokomotywyMin <= idlokomotywy
                   and idlokomotywy <= vIdLokomotywyMax
                   and nazwa LIKE ('%' || vNazwa || '%');
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION pociagDelete(IN vId INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from pociag where id = vId) != 1) then return 0; end if;
    delete from pociag where id = vId;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION pociagUpdate(IN vId INTEGER,
                                        IN vIdLokomotywy INTEGER,
                                        IN vNazwa VARCHAR(32))
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from pociag where id = vId) != 1) then return 0; end if;
    if ((select count(*) from lokomotywa where id = vIdLokomotywy) != 1) then return -1; end if;
    if (length(vNazwa) > 32) then return -2; end if;
    update pociag
    SET idlokomotywy = vIdLokomotywy,
        nazwa        = vNazwa
    where id = vId;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION pociagCreate(IN vIdLokomotywy INTEGER,
                                        IN vNazwa VARCHAR(32))
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from lokomotywa where id = vIdLokomotywy) != 1) then return -1; end if;
    if (length(vNazwa) > 32) then return -2; end if;
    insert into pociag(id, nazwa, idlokomotywy)
    values (nextval('seq_pociag'), vNazwa, vIdLokomotywy);
    return 1;
END
$$ LANGUAGE plpgsql;

--##########################################################################################

CREATE OR REPLACE FUNCTION wagonwpociaguReadAll()
    RETURNS SETOF wagonwpociagu AS
$$
BEGIN
    RETURN QUERY SELECT * FROM wagonwpociagu order by idpociagu;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION wagonwpociaguReadById(IN vIdWagonu INTEGER,
                                                 IN vIdPociagu INTEGER)
    RETURNS SETOF wagonwpociagu AS
$$
BEGIN
    RETURN QUERY SELECT * FROM wagonwpociagu where vIdWagonu = idwagonu and vIdPociagu = idpociagu;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION wagonwpociaguFilter(IN vIdWagonuMin INTEGER DEFAULT 0,
                                               IN vIdWagonuMax INTEGER DEFAULT 99,
                                               IN vNazwaPociagu VARCHAR(32) DEFAULT '')
    RETURNS SETOF wagonwpociagu AS
$$
BEGIN
    RETURN QUERY SELECT numerwagonu, idwagonu, nazwa
                 FROM wagonwpociagu
                          join pociag on wagonwpociagu.idpociagu = pociag.id
                 where vIdWagonuMin <= idwagonu
                   and idwagonu <= vIdWagonuMax
                   and nazwa like ('%' || vNazwaPociagu || '%');
END
$$ LANGUAGE plpgsql;

-- select * from wagonwpociagufilter(vIdWagonuMin => 1, vIdWagonuMax => 5,
--                                                        vNazwaPociagu => 'IC');

-- drop function wagonwpociagufilter(vidwagonumin integer, vidwagonumax integer, vidpociagumin integer, vidpociagumax integer)
-- drop function wagonwpociagufilter(vidwagonumin integer, vidwagonumax integer, vnazwa varchar);

---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION wagonwpociaguDelete(IN vIdWagonu INTEGER,
                                               IN vIdPociagu INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from wagonwpociagu where idpociagu = vIdPociagu and idwagonu = vIdWagonu) != 1) then
        return 0;
    end if;
    delete from wagonwpociagu where idpociagu = vIdPociagu and idwagonu = vIdWagonu;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION wagonwpociaguUpdate(IN vIdWagonu INTEGER,
                                               IN vIdPociagu INTEGER,
                                               IN vNrWagonu INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*)
         from wagonwpociagu
         where idpociagu = vIdPociagu
           and idwagonu = vIdWagonu) != 1) then
        return 0;
    end if;
    if (vIdWagonu < 0 or vIdPociagu < 0 or vNrWagonu < 0) then return -1; end if;
    if ((select count(*)
         from wagonwpociagu
         where idpociagu = vIdPociagu
           and numerwagonu = vNrWagonu) != 0) then
        return -2;
    end if;
    if ((select count(*) from wagon where vIdWagonu = wagon.id) != 1) then return -3; end if;
    if ((select count(*) from pociag where vIdPociagu = pociag.id) != 1) then return -4; end if;
    update wagonwpociagu
    SET numerwagonu = vNrWagonu
    where idpociagu = vIdPociagu
      and idwagonu = vIdWagonu;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION wagonwpociaguCreate(IN vIdWagonu INTEGER,
                                               IN vIdPociagu INTEGER,
                                               IN vNrWagonu INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*)
         from wagonwpociagu
         where idpociagu = vIdPociagu
           and idwagonu = vIdWagonu) != 0) then
        return 0;
    end if;
    if (vIdWagonu < 0 or vIdPociagu < 0 or vNrWagonu < 0) then return -1; end if;
    if ((select count(*)
         from wagonwpociagu
         where idpociagu = vIdPociagu
           and numerwagonu = vNrWagonu) != 0) then
        return -2;
    end if;
    if ((select count(*) from wagon where vIdWagonu = wagon.id) != 1) then return -3; end if;
    if ((select count(*) from pociag where vIdPociagu = pociag.id) != 1) then return -4; end if;
    insert into wagonwpociagu(numerwagonu, idWagonu, idpociagu)
    values (vNrWagonu, vIdWagonu, vIdPociagu);
    return 1;
END
$$ LANGUAGE plpgsql;

--##########################################################################################

CREATE OR REPLACE FUNCTION stacjaReadAll()
    RETURNS SETOF stacja AS
$$
BEGIN
    RETURN QUERY SELECT * FROM stacja order by nazwa;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION stacjaReadByName(IN vNazwa VARCHAR(64))
    RETURNS SETOF stacja AS
$$
BEGIN
    RETURN QUERY SELECT * FROM stacja where vNazwa = nazwa;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION stacjaFilter(IN vNazwa VARCHAR(64) DEFAULT '',
                                        IN vAdres VARCHAR(64) DEFAULT '')
    RETURNS SETOF stacja AS
$$
BEGIN
    RETURN QUERY SELECT *
                 FROM stacja
                 where adres LIKE ('%' || vAdres || '%')
                   and nazwa LIKE ('%' || vNazwa || '%');
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION stacjaDelete(IN vNazwa VARCHAR(64))
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from stacja where nazwa = vNazwa) != 1) then return 0; end if;
    delete from stacja where nazwa = vNazwa;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION stacjaUpdate(IN vNazwa VARCHAR(64),
                                        IN vAdres VARCHAR(64))
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from stacja where nazwa = vNazwa) != 1) then return 0; end if;
    if (length(vAdres) < 1 or length(vAdres) > 64) then return -1; end if;
    update stacja
    SET adres = vAdres
    where nazwa = vNazwa;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION stacjaCreate(IN vNazwa VARCHAR(64),
                                        IN vAdres VARCHAR(64))
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from stacja where nazwa = vNazwa) != 0) then return 0; end if;
    if (length(vNazwa) < 1 or length(vNazwa) > 64) then return -1; end if;
    if (length(vAdres) < 1 or length(vAdres) > 64) then return -2; end if;
    insert into stacja(nazwa, adres)
    values (vNazwa, vAdres);
    return 1;
END
$$ LANGUAGE plpgsql;

--##########################################################################################

CREATE OR REPLACE FUNCTION liniaprzejazduReadAll()
    RETURNS SETOF liniaprzejazdu AS
$$
BEGIN
    RETURN QUERY SELECT * FROM liniaprzejazdu order by id;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION liniaprzejazduReadById(IN vId INTEGER)
    RETURNS SETOF liniaprzejazdu AS
$$
BEGIN
    RETURN QUERY SELECT * FROM liniaprzejazdu where vId = id;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION liniaprzejazduDelete(IN vId INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from liniaprzejazdu where id = vId) != 1) then return 0; end if;
    delete from liniaprzejazdu where id = vId;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION liniaprzejazduCreate(IN vId INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from liniaprzejazdu where id = vId) != 0) then return 0; end if;
    if (vId < 0) then return -1; end if;
    insert into liniaprzejazdu(id)
    values (vId);
    return 1;
END
$$ LANGUAGE plpgsql;

--##########################################################################################

CREATE OR REPLACE FUNCTION przystanekReadAll()
    RETURNS SETOF przystanek AS
$$
BEGIN
    RETURN QUERY SELECT * FROM przystanek order by idlinii;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION przystanekFilter(IN vNrPrzystankuMin INTEGER DEFAULT 0,
                                            IN vNrPrzystankuMax INTEGER DEFAULT 99,
                                            IN vNrLiniiMin INTEGER DEFAULT 0,
                                            IN vNrLiniiMax INTEGER DEFAULT 999,
                                            IN vNazwaStacji VARCHAR(64) DEFAULT '')
    RETURNS SETOF przystanek AS
$$
BEGIN
    RETURN QUERY SELECT *
                 FROM przystanek
                 where vNrPrzystankuMin <= numerprzystanku
                   and numerprzystanku <= vNrPrzystankuMax
                   and vNrLiniiMin <= idlinii
                   and idlinii <= vNrLiniiMax
                   and nazwastacji LIKE ('%' || vNazwaStacji || '%')
                 order by idlinii;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION przystanekDelete(IN vNazwaStacji VARCHAR(64),
                                            IN vNrLinii INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from przystanek where nazwastacji = vNazwaStacji and idlinii = vNrLinii) != 1) then
        return 0;
    end if;
    delete from przystanek where nazwastacji = vNazwaStacji and idlinii = vNrLinii;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION przystanekUpdate(IN vNrPrzystanku INTEGER,
                                            IN vNazwaStacji VARCHAR(64),
                                            IN vNrLinii INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*)
         from przystanek
         where nazwastacji = vNazwaStacji
           and idlinii = vNrLinii) != 1) then
        return 0;
    end if; 
    if ((select count(*)
         from przystanek
         where idlinii = vNrLinii
           and numerprzystanku = vNrPrzystanku) != 0) then
        return -2;
    end if;
    update przystanek
    SET numerprzystanku = vNrPrzystanku
    where nazwastacji = vNazwaStacji
      and idlinii = vNrLinii;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION przystanekCreate(IN vNrPrzystanku INTEGER,
                                            IN vNazwaStacji VARCHAR(64),
                                            IN vNrLinii INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*)
         from przystanek
         where nazwastacji = vNazwaStacji
           and idlinii = vNrLinii) != 0) then
        return 0;
    end if; -- na linii jest już ten przystanek
    if (vNrPrzystanku < 0 or vNrLinii < 0) then return -1; end if;
    if (length(vNazwaStacji) < 1 or length(vNazwaStacji) > 64) then return -2; end if;
    if ((select count(*)
         from przystanek
         where idlinii = vNrLinii
           and numerprzystanku = vNrPrzystanku) != 0) then
        return -3;
    end if; -- na linii jest już ten numer zajęty

    insert into przystanek(numerprzystanku, nazwastacji, idlinii)
    values (vNrPrzystanku, vNazwaStacji, vNrLinii);
    return 1;
END
$$ LANGUAGE plpgsql;
--##########################################################################################

CREATE OR REPLACE FUNCTION przejazdReadAll()
    RETURNS SETOF przejazd AS
$$
BEGIN
    RETURN QUERY SELECT * FROM przejazd order by id;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION przejazdReadById(vId INTEGER)
    RETURNS SETOF przejazd AS
$$
BEGIN
    RETURN QUERY SELECT * FROM przejazd where id = vId order by id;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION przejazdFilter(IN vOdjazdOd TIMESTAMP DEFAULT '23-12-2022',
                                          IN vOdjazdDo TIMESTAMP DEFAULT '23-12-2122',
                                          IN vPrzyjazdOd TIMESTAMP DEFAULT '23-12-2022',
                                          IN vPrzyjazdDo TIMESTAMP DEFAULT '23-12-2122',
                                          IN vIdLiniiPrzejazduOd INTEGER DEFAULT 0,
                                          IN vIdLiniiPrzejazduDo INTEGER DEFAULT 9999)
    RETURNS SETOF przejazd AS
$$
BEGIN
    RETURN QUERY SELECT *
                 FROM przejazd
                 where vOdjazdOd <= dataodjazdu
                   and dataodjazdu <= vOdjazdDo
                   and vPrzyjazdOd <= dataprzyjazdu
                   and dataprzyjazdu <= vPrzyjazdDo
                   and vIdLiniiPrzejazduOd <= idliniiprzejazdu
                   and idliniiprzejazdu <= vIdLiniiPrzejazduDo;

END;
$$ LANGUAGE plpgsql;


-- drop function przejazdfilter(vidmin integer, vidmax integer, vodjazdod timestamp, vodjazddo timestamp, vprzyjazdod timestamp, vprzyjazddo timestamp, vidkonduktoraod integer, vidkonduktorado integer, vidmaszynistyod integer, vidmaszynistydo integer, vidliniiprzejazduod integer, vidliniiprzejazdudo integer, vidpociaguod integer, vidpociagudo integer);
-- drop function przejazdfilter(vodjazdod timestamp, vodjazddo timestamp, vprzyjazdod timestamp, vprzyjazddo timestamp, vidkonduktoraod integer, vidkonduktorado integer, vidmaszynistyod integer, vidmaszynistydo integer, vidliniiprzejazduod integer, vidliniiprzejazdudo integer, vidpociaguod integer, vidpociagudo integer)
-- drop function przejazdFilter(vOdjazdOd TIMESTAMP, vOdjazdDo TIMESTAMP, vPrzyjazdOd TIMESTAMP, vPrzyjazdDo TIMESTAMP, vIdLiniiPrzejazduOd INTEGER, vIdLiniiPrzejazduDo INTEGER);
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION przejazdDelete(IN vId INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from przejazd where id = vId) != 1) then return 0; end if;
    delete from przejazd where id = vId;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION przejazdUpdate(IN vId INTEGER,
                                          IN vOdjazd TIMESTAMP,
                                          IN vPrzyjazd TIMESTAMP,
                                          IN vIdKonduktora INTEGER,
                                          IN vIdMaszynisty INTEGER,
                                          IN vIdLiniiPrzejazdu INTEGER,
                                          IN vIdPociagu INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*)
         from pracownik
         where pracownik.id = vIdKonduktora
           and pracownik.zawod = 'Konduktor') != 1) then
        return 0;
    end if;
    if ((select count(*)
         from pracownik
         where pracownik.id = vIdMaszynisty
           and pracownik.zawod = 'Maszynista') != 1) then
        return -1;
    end if;
    if (((select count(*) from liniaprzejazdu where liniaprzejazdu.id = vIdLiniiPrzejazdu) != 1) and
        ((select count(*) from pociag where pociag.id = vIdPociagu) != 1)) then
        return -7;
    end if;
    if ((select count(*) from liniaprzejazdu where liniaprzejazdu.id = vIdLiniiPrzejazdu) != 1) then return -2; end if;
    if ((select count(*) from pociag where pociag.id = vIdPociagu) != 1) then return -3; end if;
    if (vOdjazd < current_date) then return -4; end if;
    if (vOdjazd > vPrzyjazd) then return -5; end if;
    if ((select count(*) from przejazd where id = vID) != 1) then return -6; end if;
    update przejazd
    SET dataodjazdu      = vOdjazd,
        dataprzyjazdu    = vPrzyjazd,
        idkonduktora     = vIdKonduktora,
        idmaszynisty     = vIdMaszynisty,
        idliniiprzejazdu = vIdLiniiPrzejazdu,
        idpociagu        = vIdPociagu
    where id = vID;
    return 1;
END
$$ LANGUAGE plpgsql;

---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION przejazdCreate(IN vOdjazd TIMESTAMP,
                                          IN vPrzyjazd TIMESTAMP,
                                          IN vIdKonduktora INTEGER,
                                          IN vIdMaszynisty INTEGER,
                                          IN vIdLiniiPrzejazdu INTEGER,
                                          IN vIdPociagu INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*)
         from pracownik
         where pracownik.id = vIdKonduktora
           and pracownik.zawod = 'Konduktor') != 1) then
        return 0;
    end if;
    if ((select count(*)
         from pracownik
         where pracownik.id = vIdMaszynisty
           and pracownik.zawod = 'Maszynista') != 1) then
        return -1;
    end if;
    if (((select count(*) from liniaprzejazdu where liniaprzejazdu.id = vIdLiniiPrzejazdu) != 1) and
        ((select count(*) from pociag where pociag.id = vIdPociagu) != 1)) then
        return -7;
    end if;
    if ((select count(*) from liniaprzejazdu where liniaprzejazdu.id = vIdLiniiPrzejazdu) != 1) then return -2; end if;
    if ((select count(*) from pociag where pociag.id = vIdPociagu) != 1) then return -3; end if;
    if (vOdjazd < current_date) then return -4; end if;
    if (vOdjazd > vPrzyjazd) then return -5; end if;

    insert into przejazd(id, dataodjazdu, dataprzyjazdu, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu)
    values (nextval('seq_przejazd'), vOdjazd, vPrzyjazd, vIdKonduktora, vIdMaszynisty, vIdLiniiPrzejazdu, vIdPociagu);
    return 1;
END
$$ LANGUAGE plpgsql;

--##########################################################################################

CREATE OR REPLACE FUNCTION rezerwacjaReadAll()
    RETURNS SETOF rezerwacja AS
$$
BEGIN
    RETURN QUERY SELECT * FROM rezerwacja order by id;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION rezerwacjaReadById(IN vId INTEGER)
    RETURNS SETOF rezerwacja AS
$$
BEGIN
    RETURN QUERY SELECT * FROM rezerwacja where vId = id;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION rezerwacjaFilter(IN vImie VARCHAR(16) DEFAULT '',
                                            IN vNazwisko VARCHAR(32) DEFAULT '',
                                            IN vIdPrzejazduMin INTEGER DEFAULT 0,
                                            IN vIdPrzejazduMax INTEGER DEFAULT 99999,
                                            IN vZnizka VARCHAR(32) DEFAULT '')
    RETURNS SETOF rezerwacja AS
$$
BEGIN
    RETURN QUERY SELECT *
                 FROM rezerwacja
                 where imie LIKE ('%' || vImie || '%')
                   and znizka LIKE ('%' || vZnizka || '%')
                   and nazwisko LIKE ('%' || vNazwisko || '%')
                   and vIdPrzejazduMin <= idprzejazdu
                   and idprzejazdu <= vIdPrzejazduMax;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION rezerwacjaDelete(IN vId INTEGER)
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from rezerwacja where id = vId) != 1) then return 0; end if;
    delete from rezerwacja where id = vId;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION rezerwacjaUpdate(IN vId INTEGER,
                                            IN vImie VARCHAR(16),
                                            IN vNazwisko VARCHAR(32),
                                            IN vIdPrzejazdu INTEGER,
                                            IN vZnizka VARCHAR(32))
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from przejazd where przejazd.id = vIdPrzejazdu) != 1) then return 0; end if;
    if ((select count(*) from znizka where znizka.nazwaznizki = vZnizka) != 1) then return -1; end if;
    if (length(vImie) < 1 or length(vImie) > 16) then return -2; end if;
    if (length(vNazwisko) < 1 or length(vNazwisko) > 32) then return -3; end if;
    if ((select count(*) from rezerwacja where id = vId) != 1) then return -4; end if;
    update rezerwacja
    SET imie        = vImie,
        nazwisko    = vNazwisko,
        idprzejazdu = vIdPrzejazdu,
        znizka      = vZnizka
    where id = vId;
    return 1;
END
$$ LANGUAGE plpgsql;
---------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION rezerwacjaCreate(IN vImie VARCHAR(16),
                                            IN vNazwisko VARCHAR(32),
                                            IN vIdPrzejazdu INTEGER,
                                            IN vZnizka VARCHAR(32))
    RETURNS INTEGER AS
$$
BEGIN
    if ((select count(*) from przejazd where przejazd.id = vIdPrzejazdu) != 1) then return 0; end if;
    if ((select count(*) from znizka where znizka.nazwaznizki = vZnizka) != 1) then return -1; end if;
    if (length(vImie) < 1 or length(vImie) > 16) then return -2; end if;
    if (length(vNazwisko) < 1 or length(vNazwisko) > 32) then return -3; end if;

    insert into rezerwacja(id, imie, nazwisko, idprzejazdu, znizka)
    values (nextval('seq_rezerwacja'), vImie, vNazwisko, vIdPrzejazdu, vZnizka);
    return 1;
END
$$ LANGUAGE plpgsql;

--##########################################################################################