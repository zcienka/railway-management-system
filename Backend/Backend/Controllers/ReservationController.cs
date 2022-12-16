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
                            select  *  from
                            rezerwacja
                            order by id
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
        public IActionResult Get(int id)
        {
            string query = @"
                            select  *  from
                            rezerwacja where id = @id 
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);

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
                            insert into rezerwacja(id, imie, nazwisko, idprzejazdu, znizka) 
                            values(@id, @imie, @nazwisko, @idprzejazdu, @znizka)
                            ";

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

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return CreatedAtAction(nameof(Get), new { id = reservation.Id }, reservation);
        }

        [HttpPatch]
        public IActionResult Patch(Reservation reservation)
        {
            string query = @"
                           update rezerwacja
                           set imie = @imie,
                           nazwisko = @nazwisko,
                           idprzejazdu = @idprzejazdu,
                           znizka = @znizka
                           where id = @id
                            ";

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

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return Ok(reservation);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            string query = @"
                           delete from rezerwacja
                           where id=@id
                           ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return NoContent(); 
        }
    }
}