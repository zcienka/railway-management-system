using Microsoft.AspNetCore.Mvc;
using System.Data;
using Npgsql;
using Backend.Models;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RailroadCarriageController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RailroadCarriageController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"
                            select  *  from
                            wagonwpociagu
                            order by idwagonu, idpociagu
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

        [HttpGet("{idwagonu}/{idpociagu}")]
        public IActionResult Get(string idwagonu, string idpociagu)
        {
            string query = @"
                            select  *  from
                            wagonwpociagu 
                            where idwagonu = @idwagonu
                            and idpociagu = @idpociagu
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idwagonu", idwagonu);
                    myCommand.Parameters.AddWithValue("@idpociagu", idpociagu);

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
        public IActionResult Post(RailroadCarriage railroadCarriage)
        {
            string query = @"
                            insert into wagonwpociagu(idwagonu, procentznizki, dokumentpotwierdzajacy) 
                            values(@idwagonu, @procentznizki, @dokumentpotwierdzajacy)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    // myCommand.Parameters.AddWithValue("@idwagonu", railroadCarriage.idwagonu);
                    // myCommand.Parameters.AddWithValue("@procentznizki", railroadCarriage.procentznizki);
                    // myCommand.Parameters.AddWithValue("@dokumentpotwierdzajacy", railroadCarriage.dokumentpotwierdzajacy);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return CreatedAtAction(nameof(Get), railroadCarriage);
        }

        [HttpPatch]
        public IActionResult Patch(Reservation reservation)
        {
            string query = @"
                           update wagonwpociagu
                           set procentznizki = @procentznizki,
                           dokumentpotwierdzajacy = @dokumentpotwierdzajacy
                           where idwagonu = @idwagonu
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

            return Ok(reservation);
        }

        [HttpDelete("{idwagonu}")]
        public IActionResult Delete(string idwagonu)
        {
            string query = @"
                           delete from wagonwpociagu
                           where idwagonu=@idwagonu
                           ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idwagonu", idwagonu);

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