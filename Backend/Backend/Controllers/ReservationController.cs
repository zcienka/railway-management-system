using Microsoft.AspNetCore.Mvc;
using System.Data;
using Npgsql;
using Backend.Models;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ReservationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"
                            select r.id, r.imie, r.nazwisko, p.dataodjazdu, p.dataprzyjazdu, r.znizka from rezerwacjaReadAll() 
                            r join przejazd p on p.id=r.idprzejazdu;
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

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            try
            {
                int idInt = Int32.Parse(id);
            }
            catch { return StatusCode(409, "Id musi być liczbą"); }

            string query = @"
                            select * from rezerwacjaReadById(@id);
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
        public async Task<ActionResult<IEnumerable<Reservation>>> search(string? imie, string? nazwisko, string? znizka, string? idprzejazdumin,
                                                                                                                         string? idprzejazdumax)
        {
            if (imie == null)
                imie = "";
            if (nazwisko == null)
                nazwisko = "";
            if (znizka == null)
                znizka = "";
            if (idprzejazdumin == null)
                idprzejazdumin = "0";
            if (idprzejazdumax == null)
                idprzejazdumax = "99999";
            try
            {
                Int32.Parse(idprzejazdumin);
                Int32.Parse(idprzejazdumax);
            } catch { return StatusCode(409, "Id muszą byc liczbami"); }

            string query = @"
                            select r.id, r.imie, r.nazwisko, p.dataodjazdu, p.dataprzyjazdu, r.znizka from 
                            (select * from rezerwacjaFilter(vImie => @imie, vNazwisko => @nazwisko,
                                                         vIdPrzejazduMin => @idprzejazdumin, vIdPrzejazduMax => @idprzejazdumax,
                                                         vZnizka => @znizka)) r join przejazd p on p.id=r.idprzejazdu;
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@imie", imie);
                    myCommand.Parameters.AddWithValue("@nazwisko", nazwisko);
                    myCommand.Parameters.AddWithValue("@idprzejazdumin", Int32.Parse(idprzejazdumin));
                    myCommand.Parameters.AddWithValue("@idprzejazdumax", Int32.Parse(idprzejazdumax));
                    myCommand.Parameters.AddWithValue("@znizka", znizka);

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
        public async Task<ActionResult<IEnumerable<Reservation>>> create(string? imie, string? nazwisko, string? znizka, string? idprzejazdu)
        {
            if(imie == null || nazwisko == null || znizka == null || idprzejazdu == null)
                return StatusCode(409, "Wszystkie pola muszą byc wypełnione");
            try
            {
                Int32.Parse(idprzejazdu);
            } catch { StatusCode(409, "id musi być liczbą"); }

            string query = @"
                            select rezerwacjaCreate(vImie => @imie,
						                            vNazwisko => @nazwisko,
						                            vIdPrzejazdu => @idprzejazdu,
						                            vZnizka => @znizka);
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
                    myCommand.Parameters.AddWithValue("@imie", imie);
                    myCommand.Parameters.AddWithValue("@nazwisko", nazwisko);
                    myCommand.Parameters.AddWithValue("@idprzejazdu", Int32.Parse(idprzejazdu));
                    myCommand.Parameters.AddWithValue("@znizka", znizka);
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[4].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if (val == 1)
                return Ok();
            else if (val == 0)
                return StatusCode(409, "Nie znaleziono przejazdu o danym id");
            else if (val == -1)
                return StatusCode(409, "Nie znaleziono zniżki o danej nazwie");
            else if (val == -2)
                return StatusCode(409, "Imię musi być o długości między 1 a 16 znaków");
            else
                return StatusCode(409, "Nazwisko musi być o długości między 1 a 32 znaków");
        }

        [HttpPatch("update")]
        public async Task<ActionResult<IEnumerable<Reservation>>> update(string? id, string? imie, string? nazwisko, string? znizka, string? idprzejazdu)
        {
            if (id == null || imie == null || nazwisko == null || znizka == null || idprzejazdu == null)
                return StatusCode(409, "Wszystkie pola muszą byc wypełnione");
            try
            {
                Int32.Parse(id);
                Int32.Parse(idprzejazdu);
            }
            catch { StatusCode(409, "id muszą być liczbami"); }

            string query = @"
                           select rezerwacjaUpdate(vId => @id,
						                           vImie => @imie,
						                           vNazwisko => @nazwisko,
						                           vIdPrzejazdu => @idprzejazdu,
						                           vZnizka => @znizka);
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
                    myCommand.Parameters.AddWithValue("@imie", imie);
                    myCommand.Parameters.AddWithValue("@nazwisko", nazwisko);
                    myCommand.Parameters.AddWithValue("@idprzejazdu", Int32.Parse(idprzejazdu));
                    myCommand.Parameters.AddWithValue("@znizka", znizka);
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[5].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if (val == 1)
                return Ok();
            else if (val == 0)
                return StatusCode(409, "Nie znaleziono przejazdu o danym id");
            else if (val == -1)
                return StatusCode(409, "Nie znaleziono zniżki o danej nazwie");
            else if (val == -2)
                return StatusCode(409, "Imię musi być o długości między 1 a 16 znaków");
            else if (val == -3)
                return StatusCode(409, "Imię musi być o długości między 1 a 32 znaków");
            else
                return StatusCode(409, "Nie znaleziono rezerwacji o danym ID");
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
                           select rezerwacjaDelete(@id);
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
                return StatusCode(409, "Nie znaleziono rezerwacji o danym ID");
        }
    }
}