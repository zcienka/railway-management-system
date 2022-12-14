using Microsoft.AspNetCore.Mvc;
using System.Data;
using Npgsql;
using Backend.Models;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarriageController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CarriageController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"
                            select  *  from
                            wagon
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
        public IActionResult Get(string id)
        {
            string query = @"
                            select  *  from
                            wagon where id = @id 
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", Int64.Parse(id));

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
        public IActionResult Post(Carriage carriage)
        {
            string query = @"
                            insert into wagon(id, databadaniatechnicznego, liczbamiejsc) 
                            values(@id, @databadaniatechnicznego, @liczbamiejsc)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", carriage.Id);
                    myCommand.Parameters.AddWithValue("@databadaniatechnicznego", carriage.Databadaniatechnicznego);
                    myCommand.Parameters.AddWithValue("@liczbamiejsc", carriage.Liczbamiejsc);


                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return CreatedAtAction(nameof(Get), carriage);
        }

        [HttpPatch]
        public IActionResult Patch(Carriage carriage)
        {
            string query = @"
                           update wagon
                           set databadaniatechnicznego = @databadaniatechnicznego,
                           liczbamiejsc = @liczbamiejsc
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
                    myCommand.Parameters.AddWithValue("@id", carriage.Id);
                    myCommand.Parameters.AddWithValue("@databadaniatechnicznego", carriage.Databadaniatechnicznego);
                    myCommand.Parameters.AddWithValue("@liczbamiejsc", carriage.Liczbamiejsc);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return Ok(carriage);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            string query = @"
                           delete from wagon
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