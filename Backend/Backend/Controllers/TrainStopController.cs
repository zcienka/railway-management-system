using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Npgsql;
using System.Data;

namespace Backend.Controllers
{
    [Route("api/train-stop")]
    [ApiController]
    public class TrainStopController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TrainStopController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"
                            select  *  from
                            przystanek
                            order by numerprzystanku
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

        [HttpGet("{numerprzystanku}")]
        public IActionResult Get(int numerprzystanku)
        {
            string query = @"
                            select  *  from
                            przystanek where numerprzystanku = @numerprzystanku 
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@numerprzystanku", numerprzystanku);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            string json = JsonConvert.SerializeObject(table, Formatting.Indented);

            return Ok(json);
        }

        [HttpGet("line/{idLinii}")]
        public IActionResult GetTrainStopByLine(int idLinii)
        {
            string query = @"
                            select  *  from
                            przystanek where idlinii = @idlinii 
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idlinii", idLinii);

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
        public IActionResult Post(TrainStop trainStop)
        {
            string query = @"
                            insert into przystanek(numerprzystanku, nazwastacji, idlinii)
                            values(@numerprzystanku, @nazwastacji, @idlinii)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@numerprzystanku", trainStop.NumerPrzystanku);
                    myCommand.Parameters.AddWithValue("@nazwastacji", trainStop.NazwaStacji);
                    myCommand.Parameters.AddWithValue("@idlinii", trainStop.IdLinii);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return CreatedAtAction(nameof(Get), new { numerprzystanku = trainStop.NumerPrzystanku }, trainStop);
        }

        [HttpPatch]
        public IActionResult Patch(TrainStop trainStop)
        {
            string query = @"
                           update przystanek
                           set nazwastacji = @nazwastacji,
                           idlinii = @idlinii
                           where numerprzystanku = @numerprzystanku
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@numerprzystanku", trainStop.NumerPrzystanku);
                    myCommand.Parameters.AddWithValue("@nazwastacji", trainStop.NazwaStacji);
                    myCommand.Parameters.AddWithValue("@idlinii", trainStop.IdLinii);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return Ok(trainStop);
        }

        [HttpDelete("{numerprzystanku}")]
        public IActionResult Delete(int numerprzystanku)
        {
            string query = @"
                           delete from przystanek
                           where numerprzystanku=@numerprzystanku
                           ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@numerprzystanku", numerprzystanku);

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
