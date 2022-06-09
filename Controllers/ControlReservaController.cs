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
using Microsoft.AspNetCore.Authorization;

namespace WebReserva.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]



    public class ControlReservaController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ControlReservaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
       /** [HttpGet]

        public JsonResult Get()
        {
            string query = @"SELECT RESERVA,ESTADO,USUARIO FROM dbo.CONTROL_RESERVA";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WebReserva");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                 using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }
**/
        
        [HttpGet("{Res}")]

        public JsonResult Get(int Res)
        {
            string query = @"exec sp_Mostrarreserva @Res";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WebReserva");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                 using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.Add("@Res", SqlDbType.Int);
                    myCommand.Parameters["@Res"].Value = Res;

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }
        [AllowAnonymous]
        [HttpPost]


        public JsonResult Post(ControlReserva controlreserva)

        {
            string query = @"exec sp_ControlReserva @Reserva,@Usuario";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WebReserva");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.Add("@Reserva", SqlDbType.Int);
                    myCommand.Parameters["@Reserva"].Value = Convert.ToInt16(controlreserva.Reserva);

                    myCommand.Parameters.Add("@Usuario", SqlDbType.Int);
                    myCommand.Parameters["@Usuario"].Value = Convert.ToInt16(controlreserva.Usuario);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }

            }
            return new JsonResult("RESERVA YA SE ÍNSERTÓ");
        }
        }
    
        /**
         public IActionResult Index()
         {
             return View();
         }
        **/

    

}
