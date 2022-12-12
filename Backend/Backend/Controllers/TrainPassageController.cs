using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Npgsql;
using System.Data;

namespace Backend.Controllers
{
    [Route("api/train-passage")]
    [ApiController]
    public class TrainPassageController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public TrainPassageController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get()
        {
            string query = @"
                            select  *  from
                            przejazd
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

        [HttpGet("{id}/station-by-line")]
        public IActionResult GetStationsByLine(string id)
        {
            string query = @"
                            select * from
                            przystanek p join liniaprzejazdu l
                            on l.id = p.idlinii
                            where @id=id
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

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            string query = @"
                            select  *  from
                            przejazd where id = @id
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
        public IActionResult Post(TrainPassage trainPassage)
        {
            string query = @"
                            insert into przejazd(id, idkonduktora, idmaszynisty, idliniiprzejazdu, idpociagu) 
                            values(@id, @idkonduktora, @idmaszynisty, @idliniiprzejazdu, @idpociagu)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("railway_database");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", trainPassage.Id);
                    myCommand.Parameters.AddWithValue("@idkonduktora", trainPassage.IdKonduktora);
                    myCommand.Parameters.AddWithValue("@idmaszynisty", trainPassage.IdMaszynisty);
                    myCommand.Parameters.AddWithValue("@idliniiprzejazdu", trainPassage.IdLiniiPrzejazdu);
                    myCommand.Parameters.AddWithValue("@idpociagu", trainPassage.IdPociagu);


                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return CreatedAtAction(nameof(Get), trainPassage);
        }

        [HttpPatch]
        public IActionResult Patch(TrainPassage trainPassage)
        {
            string query = @"
                           update przejazd
                           set idkonduktora = @idkonduktora,
                           idmaszynisty = @idmaszynisty,
                           idliniiprzejazdu = @idliniiprzejazdu,
                           idpociagu = @idpociagu
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
                    myCommand.Parameters.AddWithValue("@id", trainPassage.Id);
                    myCommand.Parameters.AddWithValue("@idkonduktora", trainPassage.IdKonduktora);
                    myCommand.Parameters.AddWithValue("@idmaszynisty", trainPassage.IdMaszynisty);
                    myCommand.Parameters.AddWithValue("@idliniiprzejazdu", trainPassage.IdLiniiPrzejazdu);
                    myCommand.Parameters.AddWithValue("@idpociagu", trainPassage.IdPociagu);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return Ok(trainPassage);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            string query = @"
                           delete from przejazd
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
