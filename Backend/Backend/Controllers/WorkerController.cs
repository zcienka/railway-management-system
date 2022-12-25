using Microsoft.AspNetCore.Mvc;
using System.Data;
using Npgsql;
using Backend.Models;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkerController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public WorkerController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"
                            select * from
                            pracownikReadAll();
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
                            select * from
                            pracownikReadById(@id);
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

        [HttpGet("conductors")]
        public IActionResult GetConductors()
        {
            string query = @"
                            select * from pracownikFilter(vZawod => 'Konduktor');
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

        [HttpGet("drivers")]
        public IActionResult GetDrivers()
        {
            string query = @"
                            select * from pracownikFilter(vZawod => 'Maszynista');
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

        [HttpPost]
        public IActionResult Post(Worker worker)
        {
            string query = @"
                            select pracownikCreate(vImie => @imie,
                                                   vNazwisko => @nazwisko,
                                                   vZawod => @zawod,
                                                   vPlaca => @placa);
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
                    myCommand.Parameters.AddWithValue("@imie", worker.Imie);
                    myCommand.Parameters.AddWithValue("@nazwisko", worker.Nazwisko);
                    myCommand.Parameters.AddWithValue("@placa", worker.Placa);
                    myCommand.Parameters.AddWithValue("@zawod", worker.Zawod);
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[4].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if(val == 1)
                return CreatedAtAction(nameof(Get), worker);
            else if (val == -1)
                return StatusCode(409, "Dostępne zawody: \"Maszynista\", \"Konduktor\".");
            else if (val == -2)
                return StatusCode(409, "Imię musi być dlugości między 1 a 31");
            else if (val == -3)
                return StatusCode(409, "Nazwisko musi być dlugości między 1 a 31");
            else
                return StatusCode(409, "Płaca nie może być ujemna");

        }

        [HttpPatch]
        public IActionResult Patch(Worker worker)
        {
            string query = @"
                           select pracownikUpdate(vId => @id
                                                  vImie => @imie, 
                                                  vNazwisko => @nazwisko, 
                                                  vZawod => @zawod, 
                                                  vPlaca => @placa);
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
                    myCommand.Parameters.AddWithValue("@id", worker.Id);
                    myCommand.Parameters.AddWithValue("@imie", worker.Imie);
                    myCommand.Parameters.AddWithValue("@nazwisko", worker.Nazwisko);
                    myCommand.Parameters.AddWithValue("@placa", worker.Placa);
                    myCommand.Parameters.AddWithValue("@zawod", worker.Zawod);
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[5].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if (val == 1)
                return Ok(worker);
            else if (val == 0)
                return StatusCode(409, "Nie znaleziono pracownika o danym ID");
            else if (val == -1)
                return StatusCode(409, "Dostępne zawody: \"Maszynista\", \"Konduktor\".");
            else if (val == -2)
                return StatusCode(409, "Imię musi być dlugości między 1 a 32");
            else if (val == -3)
                return StatusCode(409, "Nazwisko musi być dlugości między 1 a 32");
            else
                return StatusCode(409, "Płaca nie może być ujemna");
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
                           select pracownikDelete(@id);
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

            if (val == 1)
                return Ok();
            else
                return StatusCode(409, "Nie znaleziono pracownika o danym ID");
        }


    }
}