var nombre='';
var nrodoc='';
var reserva = 0;
var fechareserva='';
var poza='';
var horario=0;
var personas=0;
var local=0;
var nacional=0;
var extranjero=0;
var local_n=0;
var nacional_n=0;
var extranjero_n=0;
var estado='';
var estado_control;
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today='';
var fechaletras='';
var fechaotra='';
var horat='';


window.onload = function() {
    on_scanner() // init 
    // Make a request for a user with a given ID
        
    /*Swal.fire('ENTRASTE WACHO')*/
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    today = yyyy + '-' + mm + '-' + dd ;

    fechareservacom = new Date(today);
    fechareservacom.setDate(fechareservacom.getDate());
    fechareservacom = fechareservacom.toLocaleDateString("es-ES", options);

  
    var fecha2 =new Date();
    var horaU = fecha2.getHours();

    //console.log(mostrarmensajereservado('C','A'));


    
}

function getHora(h){
    var horatexto;
    switch(h){
        case 1:
        horatexto = '6:00 am. a 7:30 am';
        break;
        case 2:
        horatexto = '8:00 am. a 9:30 am.';
        break;
        case 3:
        horatexto = '10:00 am. a 11:30am.';
        break;
        case 4:
        horatexto = '12:00 pm. a 1:30pm.';
        break;
        case 5 :
        horatexto = '2:00 pm. a 3:30pm.';
        break;
        case 6:
        horatexto = '4:00 pm. a 5:30pm.';
        break;
        case 7:
        horatexto = '6:00 pm. a 7:30pm.';
        break;
        case 8:
        horatexto = '8:00 pm. a 9:30mn.';
        break;
        case 10:
        horatexto = '10:00 pm. a 11:30pm';
        break;
    }
    return horatexto;
}
function mostrarmensajereservado(x,y){
    var x;
    var y;
    var mensajetexto='';
    switch(true){
        case x=='C' && y==' ':
            mensajetexto='LA RESERVA ESTA DISPONIBLE PARA USAR'
            
             break;
        case x=='C' && y=='A':
            mensajetexto='LA RESERVA HA SIDO USADA'
             break;
        case x=='P':
                mensajetexto='LA RESERVA AÚN NO SE HA PAGADO'
             break;

    }
    return mensajetexto;


}
function getHoraCambiada(h){
    var horacambiada;
    switch(h){
        case 1:
        horacambiada = 6;
        break;
        case 2:
        horacambiada = 8;
        break;
        case 3:
        horacambiada = 10;
        break;
        case 4:
        horacambiada = 12;
        break;
        case 5:
        horacambiada = 14;
        break;
        case 6:
        horacambiada = 16;
        break;
        case 7:
        horacambiada = 18;
        break;
        case 8:
        horacambiada = 20;
        break;
        case 10:
        horacambiada = 22;
        break;
    }
    return horacambiada;
}


function controlreserva(reserva){
    var horat='';
    var horat='';
    var fecha2 =new Date();
    var horaU = fecha2.getHours();
    axios.get('http://localhost:51811/api/controlreserva/'+reserva)
            .then(function (response) {
                this.response = response.data
                nombre = this.response[0].NOMBRE
                nrodoc = this.response[0].NRO_DOC
                reserva = this.response[0].RESERVA
                fechareserva = new Date(this.response[0].FECHA)
                fechaotra= formatDate(fechareserva);
                poza = this.response[0].POZA
                horario = this.response[0].HORA
                horat=getHora(horario);
                personas = this.response[0].PERSONAS
                local = this.response[0].LOCAL
                nacional = this.response[0].NACIONAL
                extranjero = this.response[0].EXTRANJERO_N
                local_n = this.response[0].LOCAL_N
                nacional_n = this.response[0].NACIONAL_N
                extranjero_n = this.response[0].EXTRANJERO
                estado = this.response[0].ESTADO
                estado_control = this.response[0].ESTADO_CONTROL

                
                Swal.fire({
                    title: '<ti>'+mostrarmensajereservado(estado,estado_control)+'</ti>',
                    html:'<pre><b>NOMBRES:</b>' +nombre+ '</pre>'+
                          '<pre><b>NRO DOCUMENTO:</b>' +nrodoc+ '</pre>'+
                          '<pre><b>NRO RESERVA:</b>' +reserva+ '</pre> '+ 
                          '<pre><b>FECHA DE ACCESO:</b>' +fechaotra+ '</pre> '+
                          '<pre><b>POZA:</b> ' +poza+ '</pre> '+
                          '<pre><b>HORARIO:</b>' +horat+ '</pre> '+
                          '<pre><b>TOTAL DE PERSONAS:</b>' +personas+ '</pre> '+
                          '<pre><b>LOCAL(adulto):</b>' +local+ '</pre> '+
                          '<pre><b>NACIONAL(adulto):</b>' +nacional+ '</pre> '+
                          '<pre><b>EXTRANJERO(adulto):</b>' +extranjero+ '</pre> '+
                          '<pre><b>LOCAL(niño):</b>' +local_n+ '</pre> '+
                          '<pre><b>NACIONAL(niño):</b>' +nacional_n+ '</pre> '+
                          '<pre><b>EXTRANJERO(niño):</b>' +extranjero_n+ '</pre> '/* +
                          '<pre><b>ESTADO CANCELACION:</b>' +estado+ '</pre> '+
                          '<pre><b>ESTADO INGRESA:</b>' +estado_control+ '</pre> ' */,
                    showDenyButton: true,
                    showCancelButton: true,
                    width:600 ,
                    timer:30000,
                    confirmButtonText: "CONTROLAR",
                    confirmButtonColor: "#DD6B55",
                    cancelButtonText:"CANCELAR",
                    showCancelButton: true,
                    /* background: '#fff url(//bit.ly/1Nqn9HU)', */
                    customClass: {
                        popup: 'format-pre'
                      },
                      showCancelButton: false,
                  }).then((result) => {
                    console.log(getHoraCambiada(horario));
                    console.log(horaU);
    
                      if (result.isConfirmed && estado=="C" && estado_control==" " && fechaotra==fechareservacom && getHoraCambiada(horario)<= horaU && getHoraCambiada(horario)+1>=horaU) {
                        
                            axios.post("http://localhost:51811/api/ControlReserva",{
                                    Reserva: reserva,
                                    Usuario: 3
                                    }).then(response =>{
                                        console.log("SE HA REGISTRADO"); 
                                        delay(10000);
                                        window.location.href= "";                      
                                    })  
                                    Swal.fire({
                                        title: 'EXCELENTE',
                                        text: "La reserva ha sido registrada correctamente",
                                        icon: 'success',
                                        timer: 8000,
                                        showCancelButton: false,
                                        showConfirmButton: false
                                      }).then(function() {
                                        window.location = "";
                                        delay(2000);
                                    });
                    }
                    else if (result.isDenied) {
                               window.location.href= ""; 
                               delay(10000);
                             }
                    else if (estado=="P" && estado_control=="A"&& getHora(horario)>= horaU) {
                    Swal.fire(
                        'ERROR',
                        'La reserva ya ha sido usada o vencida',
                        'error'
                        ).then(function() {
                        window.location = "";
                    });
                }
                    else if(estado=="P"){
                        Swal.fire(
                            'ERROR',
                            'La reserva aun no ha sido pagada',
                            'error'
                            ).then(function() {
                            window.location = "";
                            delay(2000);
                        });
                    
            }
                    else if (estado=="C" && estado_control=="A") {
                            Swal.fire(
                                'ERROR',
                                'La reserva ya ha sido usada',
                                'error'
                                ).then(function() {
                                window.location = "";
                                delay(2000);
                            });
                        }
                   
                    else{
                        Swal.fire(
                            'NO PUEDES USAR LA RESERVA',
                            'Revisa el dia y la hora',
                            'error'
                            ).then(function() {
                            window.location = "";
                        });
                    }
                }
                      
                  
                  )
              
            })
            .catch(function (error) {
                console.log(error);
                Swal.fire(
                    'ERROR',
                    'Esta reserva no existe',
                    'error'
                  ).then(function() {
                    window.location = "";
                });
            });
        
            
            

}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return date.toLocaleDateString("es-ES", options);
    //return [year, month, day].join('-');

}

var element88 = document.getElementById("controlarreserva");
element88.onclick = function(event) {
    reserva = document.getElementById("scanner").value;
    
    //console.log(reserva);
    controlreserva(reserva);
        }
        function on_scanner() {
            let is_event = false; // for check just one event declaration
            let input = document.getElementById("scanner");
            input.addEventListener("focus", function () {
                if (!is_event) {
                    is_event = true;
                    input.addEventListener("keypress", function (e) {
                        setTimeout(function () {
                            if (e.keyCode == 13) {
                                scanner(input.value); // use value as you need
                                input.select();
                            }
                        }, 500)
                    })
                }
            });
            document.addEventListener("keypress", function (e) {
                if (e.target.tagName !== "INPUT") {
                    input.focus();
                }
            });
        }

        function scanner(value) {
            if (value == '') return;
            controlreserva(value);
        }
        function soloNumeros(e){
            tecla = (document.all) ? e.keyCode : e.which;
            if (tecla==8){
                return true;
            }
            // Patron de entrada, en este caso solo acepta numeros
            patron =/[0-9]/;
            tecla_final = String.fromCharCode(tecla);
            return patron.test(tecla_final);
          }