using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using WebReserva.Models;
using Microsoft.AspNetCore.Cors;

namespace WebReserva.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]


    public class AforoDisponibleController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AforoDisponibleController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{Date}")]



        public JsonResult Get(String Date)
        {
            string query = @"exec sp_AforoDisponible @Date";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WebReserva");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.Add("@Date", SqlDbType.Date);
                    myCommand.Parameters["@Date"].Value = Convert.ToDateTime(Date).ToString();

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }

            }
            return new JsonResult(table);
        }

      

        /**
        public ActionResult<IEnumerable<string>> Usuarios()
        {
            return new string[] { "value1", "value2" };
        }
        /**
         public IActionResult Index()
         {
             return View();
         }
        **/

    }
}
