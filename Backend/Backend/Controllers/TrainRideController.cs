﻿using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Npgsql;
using System.Data;

namespace Backend.Controllers
{
    [Route("api/train-ride")]
    [ApiController]
    public class TrainRideController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TrainRideController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = $@"
                            select przejazd.id, przejazd.dataodjazdu, przejazd.dataprzyjazdu, 
                                   konduktor.imie as imiekonduktora, konduktor.nazwisko as nazwiskokonduktora,
	                               maszynista.imie as imiemaszynisty, maszynista.nazwisko as nazwiskomaszynisty, 
                                   przejazd.idliniiprzejazdu, 
                                   pociag.nazwa as nazwapociagu from przejazdReadAll() przejazd 
                                   join pracownik maszynista on maszynista.id = idmaszynisty
								   join pracownik konduktor on konduktor.id = idkonduktora
								   join pociag on pociag.id = idpociagu;
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            string json = JsonConvert.SerializeObject(table, Formatting.Indented);

            return Ok(json);
        }
        
        [HttpGet("{id}/station-by-line")]
        public IActionResult GetStationsByLine(string id)
        {
            try
            {
                int idInt = Int32.Parse(id);
            }
            catch { return StatusCode(409, "Id musi być liczbą"); }

            string query = @"
                            select *
                            from
                            przystanek p join liniaprzejazdu l
                            on l.id = p.idlinii
                            where @id=id;
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {   
                    myCommand.Parameters.AddWithValue("@id", Int32.Parse(id));

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            string json = JsonConvert.SerializeObject(table, Formatting.Indented);

            return Ok(json);
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            try
            {
                int idInt = Int32.Parse(id);
            }
            catch { return StatusCode(409, "Id musi być liczbą"); }

            string query = @"
                            select przejazd.id, przejazd.dataodjazdu, przejazd.dataprzyjazdu, 
                                   konduktor.imie as imiekonduktora, konduktor.nazwisko as nazwiskokonduktora,
	                               maszynista.imie as imiemaszynisty, maszynista.nazwisko as nazwiskomaszynisty, 
                                   przejazd.idliniiprzejazdu, 
                                   pociag.nazwa as nazwapociagu from przejazdReadById(@id) przejazd 
                                   join pracownik maszynista on maszynista.id = idmaszynisty
								   join pracownik konduktor on konduktor.id = idkonduktora
								   join pociag on pociag.id = idpociagu;
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", Int32.Parse(id));

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            string json = JsonConvert.SerializeObject(table, Formatting.Indented);

            return Ok(json);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<TrainRide>>> search(string? idmin, string? idmax,
                                                                       string? dataodjazdumin, string? dataodjazdumax,
                                                                       string? dataprzyjazdumin, string? dataprzyjazdumax,
                                                                       string? idkonduktoramin, string? idkonduktoramax,
                                                                       string? idmaszynistymin, string? idmaszynistymax,
                                                                       string? idliniiprzejazdumin, string? idliniiprzejazdumax,
                                                                       string? idpociagumin, string? idpociagumax)
        {
            if (idmin == null)
                idmin = "0";
            if (idmax == null)
                idmax = "999999";
            if (dataodjazdumin == null)
                dataodjazdumin = "2022-12-23";
            if (dataodjazdumax == null)
                dataodjazdumax = "2122-12-23";
            if (dataprzyjazdumin == null)
                dataprzyjazdumin = "2022-12-23";
            if (dataprzyjazdumax == null)
                dataprzyjazdumax = "2122-12-23";
            if (idkonduktoramin == null)
                idkonduktoramin = "0";
            if (idkonduktoramax == null)
                idkonduktoramax = "9999";
            if (idmaszynistymin == null)
                idmaszynistymin = "0";
            if (idmaszynistymax == null)
                idmaszynistymax = "9999";
            if (idliniiprzejazdumin == null)
                idliniiprzejazdumin = "0";
            if (idliniiprzejazdumax == null)
                idliniiprzejazdumax = "9999";
            if (idpociagumin == null)
                idpociagumin = "0";
            if (idpociagumax == null)
                idpociagumax = "9999";
            try {
                Int32.Parse(idmin);
                Int32.Parse(idmax);
                Int32.Parse(idkonduktoramin);
                Int32.Parse(idkonduktoramax);
                Int32.Parse(idmaszynistymin);
                Int32.Parse(idmaszynistymax);
                Int32.Parse(idliniiprzejazdumin);
                Int32.Parse(idliniiprzejazdumax);
                Int32.Parse(idpociagumin);
                Int32.Parse(idpociagumax);
            } catch { return StatusCode(409, "Pola wszelkich id muszą być liczbami"); }

            try{
                DateOnly.Parse(dataodjazdumin);
                DateOnly.Parse(dataodjazdumax);
                DateOnly.Parse(dataprzyjazdumin);
                DateOnly.Parse(dataprzyjazdumax);
            } catch { return StatusCode(409, "Niepoprawny zapis dat"); }

            string query = @"
                            select * from przejazdFilter(vIdMin => @idmin, vIdMax => @idmax,
                                                         vOdjazdOd => @dataodjazdumin, vOdjazdDo => @dataodjazdumax,
                                                         vPrzyjazdOd => @dataprzyjazdumin, vPrzyjazdDo => @dataprzyjazdumax,
                                                         vIdKonduktoraOd => @idkonduktoramin, vIdKonduktoraDo => @idkonduktoramax,
                                                         vIdMaszynistyOd => @idmaszynistymin, vIdMaszynistyDo => @idmaszynistymax,
                                                         vIdLiniiPrzejazduOd => @idliniiprzejazdumin, vIdLiniiPrzejazduDo => @idliniiprzejazdumax,
                                                         vIdPociaguOd => @idpociagumin, vIdPociaguDo => @idpociagumax);
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idmin", Int32.Parse(idmin));
                    myCommand.Parameters.AddWithValue("@idmax", Int32.Parse(idmax));
                    myCommand.Parameters.AddWithValue("@dataodjazdumin", DateOnly.Parse(dataodjazdumin));
                    myCommand.Parameters.AddWithValue("@dataodjazdumax", DateOnly.Parse(dataodjazdumax));
                    myCommand.Parameters.AddWithValue("@dataprzyjazdumin", DateOnly.Parse(dataprzyjazdumin));
                    myCommand.Parameters.AddWithValue("@dataprzyjazdumax", DateOnly.Parse(dataprzyjazdumax));
                    myCommand.Parameters.AddWithValue("@idkonduktoramin", Int32.Parse(idkonduktoramin));
                    myCommand.Parameters.AddWithValue("@idkonduktoramax", Int32.Parse(idkonduktoramax));
                    myCommand.Parameters.AddWithValue("@idmaszynistymin", Int32.Parse(idmaszynistymin));
                    myCommand.Parameters.AddWithValue("@idmaszynistymax", Int32.Parse(idmaszynistymax));
                    myCommand.Parameters.AddWithValue("@idliniiprzejazdumin", Int32.Parse(idliniiprzejazdumin));
                    myCommand.Parameters.AddWithValue("@idliniiprzejazdumax", Int32.Parse(idliniiprzejazdumax));
                    myCommand.Parameters.AddWithValue("@idpociagumin", Int32.Parse(idpociagumin));
                    myCommand.Parameters.AddWithValue("@idpociagumax", Int32.Parse(idpociagumax));

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            string json = JsonConvert.SerializeObject(table, Formatting.Indented);

            return Ok(json);
        }

        [HttpPost("create")]
        public async Task<ActionResult<IEnumerable<TrainRide>>> create(string? dataodjazdu, string? dataprzyjazdu,
                                                                       string? idkonduktora, string? idmaszynisty,
                                                                       string? idliniiprzejazdu, string? idpociagu)
        {
            if (dataodjazdu == null || dataprzyjazdu == null || idkonduktora == null 
                || idmaszynisty == null || idliniiprzejazdu == null || idpociagu == null)
                return StatusCode(409, "Wszystkie pola muszą byc wypełnione");

            try{
                DateTime.Parse(dataodjazdu);
                DateTime.Parse(dataprzyjazdu);
            } catch { return StatusCode(409, "Pola dat nie zostały wypełnione poprawnie"); }
            try
            {
                Int32.Parse(idkonduktora);
                Int32.Parse(idmaszynisty);
                Int32.Parse(idliniiprzejazdu);
                Int32.Parse(idpociagu);
            } catch { return StatusCode(409, "Pola id nie zostały wypełnione poprawnie"); }
            string query = @"
                            select przejazdCreate(vOdjazd => @dataodjazdu,
										          vPrzyjazd => @dataprzyjazdu,
										          vIdKonduktora => @idkonduktora,
										          vIdMaszynisty => @idmaszynisty,
										          vIdLiniiPrzejazdu => @idliniiprzejazdu,
										          vIdPociagu => @idpociagu);
                            ";

            int val = 0;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idkonduktora", Int32.Parse(idkonduktora));
                    myCommand.Parameters.AddWithValue("@idmaszynisty", Int32.Parse(idmaszynisty));
                    myCommand.Parameters.AddWithValue("@idliniiprzejazdu", Int32.Parse(idliniiprzejazdu));
                    myCommand.Parameters.AddWithValue("@idpociagu", Int32.Parse(idpociagu));
                    myCommand.Parameters.AddWithValue("@dataodjazdu", DateTime.Parse(dataodjazdu));
                    myCommand.Parameters.AddWithValue("@dataprzyjazdu", DateTime.Parse(dataprzyjazdu));
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[6].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }

            if(val == 1)
                return Ok();
            else if (val == 0)
                return StatusCode(409, "Dany pracownik nie jest z zawodu konduktorem");
            else if (val == -1)
                return StatusCode(409, "Dany pracownik nie jest z zawodu maszynistą");
            else if (val == -2)
                return StatusCode(409, "Dana linia przejazdu nie istnieje");
            else if (val == -3)
                return StatusCode(409, "Dany pociąg nie istnieje");
            else if (val == -4)
                return StatusCode(409, "Data odjazdu nie może być przeszła");
            else
                return StatusCode(409, "Data odjazdu musi być późniejsza niż data przyjazdu");
        }

        [HttpPatch("update")]
        public async Task<ActionResult<IEnumerable<TrainRide>>> update(string? id,
                                                                       string? dataodjazdu, string? dataprzyjazdu,
                                                                       string? idkonduktora, string? idmaszynisty,
                                                                       string? idliniiprzejazdu, string? idpociagu)
        {
            if (id == null || dataodjazdu == null || dataprzyjazdu == null || idkonduktora == null
                || idmaszynisty == null || idliniiprzejazdu == null || idpociagu == null)
                return StatusCode(409, "Wszystkie pola muszą byc wypełnione");
            try{
                DateOnly.Parse(dataodjazdu);
                DateOnly.Parse(dataprzyjazdu);
            }
            catch { return StatusCode(409, "Pola dat nie zostały wypełnione poprawnie"); }

            try{
                Int32.Parse(id);
                Int32.Parse(idkonduktora);
                Int32.Parse(idmaszynisty);
                Int32.Parse(idliniiprzejazdu);
                Int32.Parse(idpociagu);
            }
            catch { return StatusCode(409, "Pola id nie zostały wypełnione poprawnie"); }

            string query = @"
                           select przejazdUpdate(vId => @id,
										        vOdjazd => @dataodjazdu,
										        vPrzyjazd => @dataprzyjazdu,
										        vIdKonduktora => @idkonduktora,
										        vIdMaszynisty => @idmaszynisty,
										        vIdLiniiPrzejazdu => 2,
										        vIdPociagu => @idpociagu);
                           ";

            int val = 0;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", Int32.Parse(id));
                    myCommand.Parameters.AddWithValue("@idkonduktora", Int32.Parse(idkonduktora));
                    myCommand.Parameters.AddWithValue("@idmaszynisty", Int32.Parse(idmaszynisty));
                    myCommand.Parameters.AddWithValue("@idliniiprzejazdu", Int32.Parse(idliniiprzejazdu));
                    myCommand.Parameters.AddWithValue("@idpociagu", Int32.Parse(idpociagu));
                    myCommand.Parameters.AddWithValue("@dataodjazdu", DateOnly.Parse(dataodjazdu));
                    myCommand.Parameters.AddWithValue("@dataprzyjazdu", DateOnly.Parse(dataprzyjazdu));
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[7].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if (val == 1)
                return Ok();
            else if (val == 0)
                return StatusCode(409, "Dany pracownik nie jest z zawodu konduktorem");
            else if (val == -1)
                return StatusCode(409, "Dany pracownik nie jest z zawodu maszynistą");
            else if (val == -2)
                return StatusCode(409, "Dana linia przejazdu nie istnieje");
            else if (val == -3)
                return StatusCode(409, "Dany pociąg nie istnieje");
            else if (val == -4)
                return StatusCode(409, "Data odjazdu nie może być przeszła");
            else if (val == -5)
                return StatusCode(409, "Data odjazdu musi być późniejsza niż data przyjazdu");
            else
                return StatusCode(409, "Nie znaleziono przejazdu o danym ID");

        }
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                int idInt = Int32.Parse(id);
            }
            catch { return StatusCode(409, "Id musi być liczbą"); }

            string query = @"
                            select przejazdDelete(@id);
                           ";

            int val = 0;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", Int32.Parse(id));
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[1].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if(val == 1)
                return NoContent();
            else
                return StatusCode(409, "Nie znaleziono przejazdu o danym ID");
        }
    }
}
