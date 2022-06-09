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

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]



    public class ReservaController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ReservaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost]


        public JsonResult Post(Reserva reserva)

        {
            string query = @"exec sp_RegistroReserva @Fecha,@Local,@Nacional,@Extranjero,@Local_n,@Nacional_n,@Extranjero_n,@Monto,@Poza,@Horario,@GastoOperativo,@TipoDoc,@NroDoc,@Estado,@NroPedido,@Transaccion,@Token,@Tipo,@FControl,@RazonSocial,@NombreCompleto,@Origen,@EnRentas,@Email,@FechaCrea,@User, @IdReserva";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("WebReserva");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.Add("@Fecha", SqlDbType.Date);
                    myCommand.Parameters["@Fecha"].Value = Convert.ToDateTime(reserva.Fecha);

                    myCommand.Parameters.Add("@Local", SqlDbType.Int);
                    myCommand.Parameters["@Local"].Value = Convert.ToInt16(reserva.Local);

                    myCommand.Parameters.Add("@Nacional", SqlDbType.Int);
                    myCommand.Parameters["@Nacional"].Value = Convert.ToInt16(reserva.Nacional);

                    myCommand.Parameters.Add("@Extranjero", SqlDbType.Int);
                    myCommand.Parameters["@Extranjero"].Value = Convert.ToInt16(reserva.Extranjero);

                    myCommand.Parameters.Add("@Local_n", SqlDbType.Int);
                    myCommand.Parameters["@Local_n"].Value = Convert.ToInt16(reserva.Local_n);

                    myCommand.Parameters.Add("@Nacional_n", SqlDbType.Int);
                    myCommand.Parameters["@Nacional_n"].Value = Convert.ToInt16(reserva.Nacional_n);

                    myCommand.Parameters.Add("@Extranjero_n", SqlDbType.Int);
                    myCommand.Parameters["@Extranjero_n"].Value = Convert.ToInt16(reserva.Extranjero_n);

                    myCommand.Parameters.Add("@Monto", SqlDbType.Decimal);
                    myCommand.Parameters["@Monto"].Value = Convert.ToDecimal(reserva.Monto);

                    myCommand.Parameters.Add("@Poza", SqlDbType.Int);
                    myCommand.Parameters["@Poza"].Value = Convert.ToInt16(reserva.Poza);

                    myCommand.Parameters.Add("@Horario", SqlDbType.Int);
                    myCommand.Parameters["@Horario"].Value = Convert.ToInt16(reserva.Horario);

                    myCommand.Parameters.Add("@GastoOperativo", SqlDbType.Decimal);
                    myCommand.Parameters["@GastoOperativo"].Value = Convert.ToDecimal(reserva.GastoOperativo);

                    myCommand.Parameters.Add("@TipoDoc", SqlDbType.VarChar, 2);
                    myCommand.Parameters["@TipoDoc"].Value = Convert.ToString(reserva.TipoDoc);

                    myCommand.Parameters.Add("@NroDoc", SqlDbType.VarChar, 24);
                    myCommand.Parameters["@NroDoc"].Value = Convert.ToString(reserva.NroDoc);

                    myCommand.Parameters.Add("@Estado", SqlDbType.Char, 1);
                    myCommand.Parameters["@Estado"].Value = Convert.ToString(reserva.Estado);

                    myCommand.Parameters.Add("@NroPedido", SqlDbType.VarChar, 20);
                    myCommand.Parameters["@NroPedido"].Value = Convert.ToString(reserva.NroPedido);

                    myCommand.Parameters.Add("@Transaccion", SqlDbType.VarChar, 30);
                    myCommand.Parameters["@Transaccion"].Value = Convert.ToString(reserva.Transaccion);

                    myCommand.Parameters.Add("@Token", SqlDbType.VarChar, 100);
                    myCommand.Parameters["@Token"].Value = Convert.ToString(reserva.Token);

                    myCommand.Parameters.Add("@Tipo", SqlDbType.Char, 1);
                    myCommand.Parameters["@Tipo"].Value = Convert.ToString(reserva.Tipo);

                    myCommand.Parameters.Add("@FControl", SqlDbType.Date);
                    myCommand.Parameters["@FControl"].Value = Convert.ToDateTime(reserva.FControl);

                    myCommand.Parameters.Add("@RazonSocial", SqlDbType.VarChar, 120);
                    myCommand.Parameters["@RazonSocial"].Value = Convert.ToString(reserva.RazonSocial);

                    myCommand.Parameters.Add("@NombreCompleto", SqlDbType.VarChar, 120);
                    myCommand.Parameters["@NombreCompleto"].Value = Convert.ToString(reserva.NombreCompleto);

                    myCommand.Parameters.Add("@Origen", SqlDbType.VarChar, 12);
                    myCommand.Parameters["@Origen"].Value = Convert.ToString(reserva.Origen);

                    myCommand.Parameters.Add("@EnRentas", SqlDbType.VarChar, 11);
                    myCommand.Parameters["@EnRentas"].Value = Convert.ToString(reserva.EnRentas);

                    myCommand.Parameters.Add("@Email", SqlDbType.VarChar, 150);
                    myCommand.Parameters["@Email"].Value = Convert.ToString(reserva.Email);

                    myCommand.Parameters.Add("@FechaCrea", SqlDbType.Date);
                    myCommand.Parameters["@FechaCrea"].Value = Convert.ToDateTime(reserva.FechaCrea);

                    myCommand.Parameters.Add("@User", SqlDbType.Int);
                    myCommand.Parameters["@User"].Value = Convert.ToInt16(reserva.User);

                    myCommand.Parameters.Add("@IdReserva", SqlDbType.Int);
                    myCommand.Parameters["@IdReserva"].Value = Convert.ToInt16(reserva.IdReserva);


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
