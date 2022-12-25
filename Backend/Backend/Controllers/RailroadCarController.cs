using Microsoft.AspNetCore.Mvc;
using System.Data;
using Npgsql;
using Backend.Models;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [Route("api/railroad-car")]
    [ApiController]
    public class RailroadCarController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RailroadCarController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"
                            select numerwagonu, idwagonu, idpociagu, nazwa as nazwapociagu from wagonwpociaguReadAll() 
                            join pociag on pociag.id=idpociagu order by idwagonu, idpociagu;
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
            try
            {
                int idw = Int32.Parse(idwagonu);
                int idp = Int32.Parse(idpociagu);
            }
            catch { return StatusCode(409, "Id musi być liczbą"); }

            string query = @"
                            select numerwagonu, idwagonu, idpociagu, nazwa as nazwapociagu from wagonwpociaguReadById(vIdWagonu => @idwagonu,
                                                                                                      vIdPociagu => @idpociagu)
                            join pociag on pociag.id=idpociagu;
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@idwagonu", Int32.Parse(idwagonu));
                    myCommand.Parameters.AddWithValue("@idpociagu", Int32.Parse(idpociagu));

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
        public IActionResult Post(RailroadCar railroadcar)
        {
            string query = @"
                            select wagonwpociaguCreate(vIdWagonu => @idwagonu, vIdPociagu => @idpociagu, vNrWagonu => @numerwagonu);
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
                    myCommand.Parameters.AddWithValue("@numerwagonu", railroadcar.NumerWagonu);
                    myCommand.Parameters.AddWithValue("@idwagonu", railroadcar.IdWagonu);
                    myCommand.Parameters.AddWithValue("@idpociagu", railroadcar.IdPociagu);
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[3].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if(val == 1)
                return CreatedAtAction(nameof(Get), railroadcar);
            else if (val == 0)
                return StatusCode(409, "Dany wagon znajduje się już w tym pociągu");
            else if (val == -1)
                return StatusCode(409, "Wszystkie wartości muszą być nieujemne");
            else
                return StatusCode(409, "Pociąg ma już przydzielony wagon z danym numerem");
        }

        [HttpPatch]
        public IActionResult Patch(RailroadCar railroadcar)
        {
            string query = @"
                            select wagonwpociaguUpdate(vIdWagonu => @idwagonu, vIdPociagu => @idpociagu, vNrWagonu => @numerwagonu);
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
                    myCommand.Parameters.AddWithValue("@numerwagonu", railroadcar.NumerWagonu);
                    myCommand.Parameters.AddWithValue("@idwagonu", railroadcar.IdWagonu);
                    myCommand.Parameters.AddWithValue("@idpociagu", railroadcar.IdPociagu);
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[3].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }
            if(val == 1)
                return Ok(railroadcar);
            else if(val == 0)
                return StatusCode(409, "Wagon nie jest przydzielony do tego pociągu");
            else if(val == -1)
                return StatusCode(409, "Wszystkie wartości muszą być nieujemne");
            else
                return StatusCode(409, "Pociąg ma już przydzielony wagon z danym numerem");
        }

        [HttpDelete("{idpociagu}/{idwagonu}")]
        public IActionResult Delete(string idwagonu, string idpociagu)
        {
            try
            {
                int idw = Int32.Parse(idwagonu);
                int idp = Int32.Parse(idpociagu);
            }
            catch { return StatusCode(409, "Id musi być liczbą"); }

            string query = @"
                            select wagonwpociaguDelete(vIdWagonu => @idwagonu, vIdPociagu => @idpociagu);
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
                    myCommand.Parameters.AddWithValue("@idwagonu", Int32.Parse(idwagonu));
                    myCommand.Parameters.AddWithValue("@idpociagu", Int32.Parse(idpociagu));
                    myCommand.Parameters.Add(new NpgsqlParameter("output", DbType.Int32) { Direction = ParameterDirection.Output });

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    val = Int32.Parse(JsonConvert.SerializeObject(myCommand.Parameters[2].Value));

                    myReader.Close();
                    myCon.Close();
                }
            }

            if(val == 1)
                return NoContent();
            else
                return StatusCode(409, "Nie znaleziono danego wagonu w danym pociągu");
        }
    }
}