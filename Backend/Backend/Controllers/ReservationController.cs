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

        [HttpPost]
        public IActionResult Post(Reservation reservation)
        {
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
                    myCommand.Parameters.AddWithValue("@id", reservation.Id);
                    myCommand.Parameters.AddWithValue("@imie", reservation.Imie);
                    myCommand.Parameters.AddWithValue("@nazwisko", reservation.Nazwisko);
                    myCommand.Parameters.AddWithValue("@idprzejazdu", reservation.Idprzejazdu);
                    myCommand.Parameters.AddWithValue("@znizka", Int64.Parse(reservation.Znizka));
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[5].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if(val == 1)
                return CreatedAtAction(nameof(Get), new { id = reservation.Id }, reservation);
            else if(val == 0)
                return StatusCode(409, "Nie znaleziono przejazdu o danym ID");
            else if (val == -1)
                return StatusCode(409, "Nie znaleziono zniżki o danej nazwie");
            else if (val == -2)
                return StatusCode(409, "Imię musi być o długości między 1 a 16 znaków");
            else
                return StatusCode(409, "Imię musi być o długości między 1 a 32 znaków");
        }

        [HttpPatch]
        public IActionResult Patch(Reservation reservation)
        {
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
                    myCommand.Parameters.AddWithValue("@id", reservation.Id);
                    myCommand.Parameters.AddWithValue("@imie", reservation.Imie);
                    myCommand.Parameters.AddWithValue("@nazwisko", reservation.Nazwisko);
                    myCommand.Parameters.AddWithValue("@idprzejazdu", reservation.Idprzejazdu);
                    myCommand.Parameters.AddWithValue("@znizka", reservation.Znizka);
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[5].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if (val == 1)
                return Ok(reservation);
            else if (val == 0)
                return StatusCode(409, "Nie znaleziono przejazdu o danym ID");
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