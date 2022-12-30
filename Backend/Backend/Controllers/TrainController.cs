using Microsoft.AspNetCore.Mvc;
using System.Data;
using Npgsql;
using Backend.Models;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TrainController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"
                            select * from pociagReadAll();
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
                            select * from pociagReadById(@id);
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
        public async Task<ActionResult<IEnumerable<Train>>> search(string? nazwa, string? idlokomotywymin, string? idlokomotywymax)
        {
            if (nazwa == null)
                nazwa = "";
            if (idlokomotywymin== null)
                idlokomotywymin = "0";
            if (idlokomotywymax == null)
                idlokomotywymax = "100000";
            try{
                Int32.Parse(idlokomotywymin);
                Int32.Parse(idlokomotywymax);
            } catch { return StatusCode(409, "Pola id lokomotywy muszą być liczbami"); }
            string query = @"
                            select * from pociagFilter(vNazwa => @nazwa, 
                                                       vIdLokomotywyMin => @idlokomotywymin, vIdLokomotywyMax => @idlokomotywymax);
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@nazwa", nazwa);
                    myCommand.Parameters.AddWithValue("@idlokomotywymin", Int32.Parse(idlokomotywymin));
                    myCommand.Parameters.AddWithValue("@idlokomotywymax", Int32.Parse(idlokomotywymax));

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
        public async Task<ActionResult<IEnumerable<Train>>> create(string? nazwa, string? idlokomotywy)
        {
            if (nazwa == null)
                nazwa = "";
            if (idlokomotywy == null)
                return StatusCode(409, "Pole id lokomotywy nie może być puste");
            try{
                Int32.Parse(idlokomotywy);
            } catch { return StatusCode(409, "Pole id lokomotywy musi być liczbą"); }

            string query = @"
                            select pociagCreate(vIdLokomotywy => @idlokomotywy, vNazwa => @nazwa);
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
                    myCommand.Parameters.AddWithValue("@nazwa", nazwa);
                    myCommand.Parameters.AddWithValue("@idlokomotywy", Int32.Parse(idlokomotywy));
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[2].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if (val == 1)
                return Ok();
            else if (val == -1)
                return StatusCode(409, "Nie znaleziono lokomotywy o danym ID");
            else
                return StatusCode(409, "Nazwa musi być dlugości maksymalnie 32");
        }

        [HttpPatch("update")]
        public async Task<ActionResult<IEnumerable<Train>>> update(string? id, string? nazwa, string? idlokomotywy)
        {
            if (id == null)
                return StatusCode(409, "Pole id nie może być puste");
            if (nazwa == null)
                nazwa = "";
            if (idlokomotywy == null)
                return StatusCode(409, "Pole id lokomotywy nie może być puste");
            try
            {
                Int32.Parse(id);
                Int32.Parse(idlokomotywy);
            }
            catch { return StatusCode(409, "Pola id muszą być liczbami"); }

            string query = @"
                           select pociagUpdate(vId => @id, vNazwa => @nazwa, vIdLokomotywy => @idlokomotywy);
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
                    myCommand.Parameters.AddWithValue("@nazwa", nazwa);
                    myCommand.Parameters.AddWithValue("@idlokomotywy", Int32.Parse(idlokomotywy));
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[3].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if (val == 1)
                return Ok();
            else if (val == 0)
                return StatusCode(409, "Nie znaleziono pociągu o danym ID");
            else if (val == -1)
                return StatusCode(409, "Nie znaleziono lokomotywy o danym ID");
            else
                return StatusCode(409, "Nazwa musi być dlugości maksymalnie 32");
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
                           select pociagDelete(@id);
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
                return StatusCode(409, "Nie znaleziono pociągu o danym ID");
        }
    }
}