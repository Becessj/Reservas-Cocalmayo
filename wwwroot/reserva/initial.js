
var step = 1;
var fu1= new Date();
var fecha1 = fu1.toISOString().substring(0, 10);
var fecha = "";
var fechacompleta = "";
var poza = 0;
var horario = 0;
var local = 0;
var nacional = 0;
var extranjero = 0;
var local_n = 0;
var nacional_n = 0;
var extranjero_n = 0;
var total = 0;
var montolocal = 0;
var montonacional = 0;
var montoextranjero = 0;
var montolocal_n = 0;
var montonacional_n = 0;
var montoextranjero_n = 0;
var nombre = '';
var apellidos = '';
var tipodocumento = 0;
var nrodocumento = "";
var correo = '';
var today = '';
var idreserva = 0;
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };




window.onload = function() {
    Swal.fire({
        //title: 'CONDICIONES  DE USO  DEL SERVICIO EN COCALMAYO',
        html: `<img src="img/aviso.jpg" class="responsive" width="1400" height="341"></img>`,
        //footer: '<a href=""></a>',
        showCloseButton: true,
          showConfirmButton: false,
          width: '800px'
        }),
        

    validator(step);
    tarifario();

    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear();
    
    today = yyyy + '-' + mm + '-' + dd ;


    fechacompleta = new Date(yyyy, mm, dd);
    

    fechacompleta = fechacompleta.toLocaleDateString("es-ES", options);
   

}


function tarifario(){
    var objXMLHttpRequest = new XMLHttpRequest();
                objXMLHttpRequest.onreadystatechange = function() {
                if(objXMLHttpRequest.readyState === 4) {
                    if(objXMLHttpRequest.status === 200) {
                        

                   const json = JSON.parse(objXMLHttpRequest.responseText);

                   for (let x in json) {

                    switch(json[x].ORIGEN) {
                        case 'NACIONAL':
                          montonacional = json[x].MONTO;
                          break;
                        case 'LOCAL':
                          montolocal = json[x].MONTO;
                          break;
                        case 'EXTRANJERO':
                          montoextranjero = json[x].MONTO;
                          break;
                        case 'NACIONAL_N':
                          montonacional_n = json[x].MONTO;
                            break;
                        case 'LOCAL_N':
                          montolocal_n = json[x].MONTO;
                            break;
                        case 'EXTRANJERO_N':
                          montoextranjero_n = json[x].MONTO;
                            break;
                    
                  }

                  }
                
                    }
                }
                }
    objXMLHttpRequest.open('GET', "http://localhost:51811/api/Tarifa");
                objXMLHttpRequest.send();
}


function getHora(hora){
    var horatexto;
    switch(hora){
        case "1":
        horatexto = '6:00 am. a 7:30 am';
        break;
        case "2":
        horatexto = '8:00 am. a 9:30 am.';
        break;
        case "3":
        horatexto = '10:00 am. a 11:30am.';
        break;
        case "4":
        horatexto = '12:00 pm. a 1:30pm.';
        break;
        case "5":
        horatexto = '2:00 pm. a 3:30pm.';
        break;
        case "6":
        horatexto = '4:00 pm. a 5:30pm.';
        break;
        case "7":
        horatexto = '6:00 pm. a 7:30pm.';
        break;
        case "8":
        horatexto = '8:00 pm. a 9:30pm.';
        break;
        case "10":
        horatexto = '10:00 pm. a 11:30pm';
        break;
    }
    return horatexto;
}
function getHoraCambiada(h){
    var horacambiada;
    switch(h){
        case "1":
        horacambiada = 6;
        break;
        case "2":
        horacambiada = 8;
        break;
        case "3":
        horacambiada = 10;
        break;
        case "4":
        horacambiada = 12;
        break;
        case "5":
        horacambiada = 14;
        break;
        case "6":
        horacambiada = 16;
        break;
        case "7":
        horacambiada = 18;
        break;
        case "8":
        horacambiada = 20;
        break;
        case "10":
        horacambiada = 22;
        break;
    }
    return horacambiada;
}



function getPoza(poza){
    var pozatexto;
    switch(poza){
        case "7":
        pozatexto = 'POZA 1';
        break;
        case "8":
        pozatexto = 'POZA 2';
        break;
        case "9":
        pozatexto = 'POZA 3';
        break;
        case "10":
        pozatexto = 'POZA 4';
        break;
    }
    return pozatexto;
}




 function backnormal(id,div,resto,hora){

   


    var fecha = document.getElementById("fechavisita").value;
    var objXMLHttpRequest = new XMLHttpRequest();
                objXMLHttpRequest.onreadystatechange = function() {
                if(objXMLHttpRequest.readyState === 4) {
                    if(objXMLHttpRequest.status === 200) {
                        

                   const json = JSON.parse(objXMLHttpRequest.responseText);

        

                   let text = '<div id="tablahorario" class="table-wrapper-scroll-y my-custom-scrollbar"><div style="overflow-x:auto;"><table class="table table-dark table-hover center"><thead><tr><th class="text-center">POZA 1</th><th class="text-center">POZA 2</th><th class="text-center">POZA 3</th><th class="text-center">POZA 4</th></tr></thead><tbody>';
                    for (let x in json) {
                        text += "<tr><td><div id='div-"+json[x].HORARIO+"-"+json[x].ID_POZA1+"' class='buttonreservation'><Button id='"+json[x].HORARIO+"-"+json[x].ID_POZA1+"-"+json[x].POZA1+"' onClick='reservation(this)'><i class='bi bi-clock'></i> Horario<br>"+json[x].DESCRIPCION+ "<br>"+ json[x].POZA1+"</Button></div></td><td><div id='div-"+json[x].HORARIO+"-"+json[x].ID_POZA2+"' class='buttonreservation'><Button id='"+json[x].HORARIO+"-"+json[x].ID_POZA2+"-"+json[x].POZA2+"' onClick='reservation(this)' ><i class='bi bi-clock'></i> Horario<br>"+json[x].DESCRIPCION+ "<br>"+json[x].POZA2+"</Button></div></td><td><div id='div-"+json[x].HORARIO+"-"+json[x].ID_POZA3+"' class='buttonreservation'><Button id='"+json[x].HORARIO+"-"+json[x].ID_POZA3+"-"+json[x].POZA3+"' onClick='reservation(this)'><i class='bi bi-clock'></i> Horario<br>"+json[x].DESCRIPCION+ "<br>"+json[x].POZA3+"</Button></div></td><td><div id='div-"+json[x].HORARIO+"-"+json[x].ID_POZA4+"' class='buttonreservation'><Button id='"+json[x].HORARIO+"-"+json[x].ID_POZA4+"-"+json[x].POZA4+"' onClick='reservation(this)'><i class='bi bi-clock'></i> Horario<br>"+json[x].DESCRIPCION+ "<br>"+json[x].POZA4+"</Button></div></td></tr>";
                    }
                    text += "</tbody></table></div></div>"    
                    document.getElementById("tablahorario").innerHTML = text;


                    var horatexto = getHora(hora);
                    

                    document.getElementById(div).innerHTML = "";
                    document.getElementById(div).innerHTML = "<Button id="+id+" onClick='reservation(this);' style='background-color:gray;'><i class='bi bi-clock'></i> Horario<br>"+horatexto+"<br>"+ resto+"</Button>";

                   
                        
                    
                    
                    
                    
                    }
                }
                }
                
    objXMLHttpRequest.open('GET', "http://localhost:51811/api/AforoDisponible/"+fecha);
                objXMLHttpRequest.send();
}



function reservation(button){
    var id = button.id;
    var hora = id.split('-')[0];
    var thispoza = id.split('-')[1];
    var cantidad = parseInt(id.split('-')[2]);
    var total = parseInt(local) + parseInt(nacional) + parseInt(extranjero)+parseInt(local_n) + parseInt(nacional_n) + parseInt(extranjero_n);
    var fecha = document.getElementById("fechavisita").value;

    var fechavisita = new Date(fecha);
    fechavisita.setDate(fechavisita.getDate() + 1);

    fechavisita = fechavisita.toLocaleDateString("es-ES", options);
    
    
  
    var f = new Date(fecha);
    var a1 = f.getFullYear();
    var m1 = f.getMonth();
    var d1 = f.getDate()+1;

    var f = a1 + '-' + m1 + '-' + d1 ;

    var f = new Date(a1, m1, d1);

    var fecha2 =new Date();
    var a2 = fecha2.getFullYear();
    var m2 = fecha2.getMonth();
    var d2 = fecha2.getDate();

    var horaU = fecha2.getHours();
    var fecha2 = a2 + '-' + m2 + '-' + d2 ;

    var fecha2 = new Date(a2, m2, d2);
   
   
  
 
    if((fecha2.getTime() == f.getTime())&&(getHoraCambiada(hora)<horaU)){
        Swal.fire({
            type: "error",
            title: "TURNO VENCIDO",
            text: "NO SE PUEDE RESERVAR EN ESTE HORARIO",
            confirmButtonText: 'OK'
        });
    }
    else if( cantidad >= total){
        var resto = cantidad - total;
        var div = "div-"+hora+"-"+thispoza;
        backnormal(id,div,resto,hora);
 
        var pozatexto = '';
        var horatexto = '';
        
        poza = thispoza;
        horario = hora;

        horatexto = getHora(hora);


            
            
        pozatexto = getPoza(poza);


        document.getElementById("pozaseleccionada").innerHTML='<span id ="pozaseleccionada" class="form-label" style="display:inline;">'+pozatexto+'</span>';
        document.getElementById("labelfechavisita").innerHTML='<span id ="labelfechavisita" class="form-label" style="display:inline;">'+fechavisita+" de "+horatexto+'</span>';
        let element = document.getElementById("selecthorario");
        element.value = hora;
   

    }

    else{
        Swal.fire({
            type: "warning",
            title: "Error!",
            text: "AFORO NO DISPONIBLE",
            confirmButtonText: 'OK'
        });
    }
}
function validator(step){
    switch(step) {
        case 1:
            document.getElementById("first-section").style.display = 'block';
            document.getElementById("second-section").style.display = 'none';
            document.getElementById("third-section").style.display = 'none';
            document.getElementById("fourth-section").style.display = 'none';
          break;
        case 2:
            document.getElementById("first-section").style.display = 'none';
            document.getElementById("second-section").style.display = 'block';
            document.getElementById("third-section").style.display = 'none';
            document.getElementById("fourth-section").style.display = 'none';
          break;
        case 3:
            document.getElementById("first-section").style.display = 'none';
            document.getElementById("second-section").style.display = 'none';
            document.getElementById("third-section").style.display = 'block';
            document.getElementById("fourth-section").style.display = 'none';
        break;
        case 4:
            document.getElementById("first-section").style.display = 'none';
            document.getElementById("second-section").style.display = 'none';
            document.getElementById("third-section").style.display = 'none';
            document.getElementById("fourth-section").style.display = 'block';
        break;
        default:
          // code block
      }
}

function nextstep(){
    step ++;
    validator(step);
}

function previewstep(){
    step --;
    validator(step);
}
//mensaje de alerta
var element = document.getElementById("step1n");
    element.onclick = function(event) {
        if(fecha == ''){
            Swal.fire({
                type: "warning",
                title: "Error!",
                text: "Debes seleccionar una fecha",
                confirmButtonText: 'OK'
            });
        }
        else{
            if(local == 0 && nacional == 0 && extranjero == 0&&local_n == 0 && nacional_n == 0 && extranjero_n == 0){
                Swal.fire({
                    type: "warning",
                    title: "Error!",
                    text: "Debes seleccionar cantidad de visitantes",
                    confirmButtonText: 'OK'
                });
            }
            else{
                nextstep();
            }
        }
        
}

var element1 = document.getElementById("step2p");
    element1.onclick = function(event) {
        previewstep();
}

var element2 = document.getElementById("step2n");
    element2.onclick = function(event) {
        if(poza == 0){
            Swal.fire({
                type: "warning",
                title: "Error!",
                text: "SELECCIONE UNA POZA",
                confirmButtonText: 'OK'
            });
        }
        else{
            if(horario == 0){
                Swal.fire({
                    type: "warning",
                    title: "Error!",
                    text: "SELECCIONE UN HORARIO DE VISITA",
                    confirmButtonText: 'OK'
                });
            }
            else{
                nextstep();
            }
        }
        
}


var element3 = document.getElementById("step3p");
    element3.onclick = function(event) {
        previewstep();
}
function validarEmail(valor) {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
        return true;
    } else {
        return false;

    }
  }
var element14 = document.getElementById("step3n");
    element14.onclick = function(event) {

    nombre = document.getElementById("nombre").value;
    apellidos = document.getElementById("apellidos").value;
    tipodocumento = document.getElementById("tipodocumento").value;
    nrodocumento = document.getElementById("nrodocumento").value;
    correo = document.getElementById("correo").value;
    aceptar = document.getElementById("checkaceptar").checked;
    aceptar2 = document.getElementById("checkaceptar2").checked;
    if(nombre == '' || apellidos == '' || tipodocumento == '0' || nrodocumento == '' || validarEmail(correo) == false|| aceptar == ''|| aceptar2 == ''){
        Swal.fire({
            type: "warning",
            title: "Error!",
            text: "TODOS LOS CAMPOS DEBEN SER CORRECTOS, ACEPTAR LA DECLARACIÓN JURADA Y LAS CONDICIONES",
            confirmButtonText: 'OK'
        });
    }
    else{
        
        var fechavisita = new Date(fecha);
        fechavisita.setDate(fechavisita.getDate() + 1);

        fechavisita = fechavisita.toLocaleDateString("es-ES", options);
        
   
        document.getElementById("resumennombre").innerHTML = '<span id ="resumennombre" class="form-label" style="display:inline;">'+nombre+'</span>';
        document.getElementById("resumenapellido").innerHTML = '<span id ="resumenapellido" class="form-label" style="display:inline;">'+apellidos+'</span>';
        document.getElementById("resumentipodoc").innerHTML = '<span id ="resumennrodoc" class="form-label" style="display:inline;">'+tipodocumento+'</span>';
        document.getElementById("resumennrodoc").innerHTML = '<span id ="resumennrodoc" class="form-label" style="display:inline;">'+nrodocumento+'</span>';
        document.getElementById("resumencorreo").innerHTML = '<span id ="resumencorreo" class="form-label" style="display:inline;">'+correo+'</span>';
        document.getElementById("resumenfecha").innerHTML = '<span id ="resumenfecha" class="form-label" style="display:inline;">'+fechavisita+'</span>';
        document.getElementById("resumenlocal").innerHTML = '<span id ="resumenlocal" class="form-label" style="display:inline;">'+local+'</span>';
        document.getElementById("resumennacional").innerHTML = '<span id ="resumennacional" class="form-label" style="display:inline;">'+nacional+'</span>';
        document.getElementById("resumenextranjero").innerHTML = '<span id ="resumenextranjero" class="form-label" style="display:inline;">'+extranjero+'</span>';
        document.getElementById("resumenlocal_n").innerHTML = '<span id ="resumenlocal_n" class="form-label" style="display:inline;">'+local_n+'</span>';
        document.getElementById("resumennacional_n").innerHTML = '<span id ="resumennacional_n" class="form-label" style="display:inline;">'+nacional_n+'</span>';
        document.getElementById("resumenextranjero_n").innerHTML = '<span id ="resumenextranjero_n" class="form-label" style="display:inline;">'+extranjero_n+'</span>';
        document.getElementById("resumentotal").innerHTML = '<span id ="resumentotal" class="form-label" style="display:inline;">'+total+'</span>';
        document.getElementById("resumenpoza").innerHTML = '<span id ="resumenpoza" class="form-label" style="display:inline;">'+getPoza(poza)+'</span>';
        document.getElementById("resumenhorario").innerHTML = '<span id ="resumenhorario" class="form-label" style="display:inline;">'+getHora(horario)+'</span>';


        nextstep();
        
        
        
        new Vue({
            el:"#generarreserva",
            data(){
                return{
                    reservas:[],
                }
            },
                methods:{
                    
                addReserva(){
                    axios.post("http://localhost:51811/api/Reserva",{
                    Fecha:fecha,
                    Local:parseInt(local),
                    Nacional:parseInt(nacional),
                    Extranjero:parseInt(extranjero),
                    Local_n:parseInt(local_n),
                    Nacional_n:parseInt(nacional_n),
                    Extranjero_n:parseInt(extranjero_n),
                    Monto:total,
                    Poza:parseInt(poza),
                    Horario:parseInt(horario),
                    GastoOperativo:0,
                    TipoDoc:tipodocumento,
                    NroDoc:nrodocumento,
                    Estado:"P",
                    NroPedido:"0",
                    Transaccion:"",
                    Token:"",
                    Tipo:"W",
                    //change data type for update axios
                    FControl:"2022-01-01",
                    RazonSocial:nombre + " " + apellidos,
                    NombreCompleto:nombre + " " + apellidos,
                    Origen:"web",
                    EnRentas:"",
                    Email:correo,
                    //change data type for update axios
                        FechaCrea:"2022-01-01",
                    User: 3,
                    IdReserva: 0
                    //se añadió @reserva para retornar el incrementable
                    }).then(response =>{
                        idreserva = response.data[0].IdReserva; 
                        console.log(response.data);                        
                        var doc = new jsPDF();
                        //doc.addImage(imgData, 'JPEG', 0, 0, 240,300);
                        doc.setLineWidth(1);
                        doc.line(0, 50, 300, 50);
                        doc.addImage(logo, 'JPEG', 20, 5);
                        doc.line(0, 70, 300, 70);
                        doc.setFontSize(20);
                        doc.text("RESERVA / BOOKING", 20, 60);
                        doc.setFontSize(12);
                        doc.setFontSize(12);
                        doc.text("Fecha de Reserva(Booking Date)", 125, 55);
                        doc.text(fechacompleta, 125, 60);
                        doc.setFontSize(12);
                        doc.setFontType("normal");
                        doc.text("FECHA DE VISITA: ", 20, 90);
                        doc.setFontType("bold");
                        doc.setFontSize(14);
                        //var fechavisita = new Date(fecha);
                        doc.text(fechavisita, 80, 90);
                        doc.setFontSize(12);
                        doc.setFontType("normal");
                        doc.text("POZA SELECCIONADA : ", 20, 110);
                        doc.setFontSize(14);
                        doc.setFontType("bold");
                        doc.text(getPoza(poza), 90, 110);
                        doc.setFontSize(12);
                        doc.setFontType("normal");
                        doc.text("HORA DE VISITA :", 20, 100);
                        doc.setFontSize(14);
                        doc.setFontType("bold");
                        doc.text(getHora(horario), 80, 100);
                        doc.setFontSize(14);
                        doc.setFontType("bold");
                        doc.text("RESUMEN DE PEDIDO", 20, 120);
                        //add razon social
                        doc.setFontSize(12);
                        doc.setFontType("normal");
                        doc.text("RAZON SOCIAL: ", 40, 130);
                        doc.setFontType("bold");
                        doc.setFontSize(14);
                        doc.text(nombre +" "+apellidos, 80, 130);
                        //add documento
                        doc.setFontSize(12);
                        doc.setFontType("normal");
                        doc.text("Nro. (Document ID): ", 40, 140);
                        doc.setFontType("bold");
                        doc.setFontSize(14);
                        doc.text(nrodocumento, 80, 140);
                        doc.setFontSize(12);
                        doc.text("CANTIDAD DE VISITANTES :", 40, 150);
                        doc.setFontType("normal");
                        doc.text("Locales(adultos): ", 50, 160);
                        doc.setFontType("bold");
                        doc.text(local, 100, 160);
                        doc.setFontType("normal");
                        doc.text("Nacionales(adultos): ", 50, 168);
                        doc.setFontType("bold");
                        doc.text(nacional,100, 168);
                        doc.setFontType("normal");
                        doc.text("Extranjeros(adultos): ", 50, 176);
                        doc.setFontType("bold");
                        doc.text(extranjero, 100, 176);
                        //niños
                        doc.setFontType("normal");
                        doc.text("Locales(niños): ", 120, 160);
                        doc.setFontType("bold");
                        doc.text(local_n, 160, 160);
                        doc.setFontType("normal");
                        doc.text("Nacionales(niños): ", 120, 168);
                        doc.setFontType("bold");
                        doc.text(nacional_n, 160, 168);
                        doc.setFontType("normal");
                        doc.text("Extranjeros(niños): ", 120, 176);
                        doc.setFontType("bold");
                        doc.text(extranjero_n, 160, 176);
                        doc.setFontType("bold");
                        doc.text("Total(visitantes): ", 120, 190);
                        doc.text((parseInt(local) + parseInt(nacional) + parseInt(extranjero)+parseInt(local_n) + parseInt(nacional_n) + parseInt(extranjero_n)).toString(), 160, 190);
                        doc.setFontSize(16);
    
                        doc.text("TOTAL SOLES(PEN): ", 120, 200);
                        doc.text("S/." + total.toString() +".00", 180, 200);
    
            
                        function multiline(text,y){
                        var splitText = doc.splitTextToSize(text, 180);
                        var pageHeight = doc.internal.pageSize.height
                            doc.setFontSize(11);
                            for (var i=0; i<splitText.length; i++){
                                doc.text(20, y, splitText[i]);
                                y = y + 5;
                            }
                            
                        }
    
                        doc.setFontType("bold");
                        doc.text("CONDICIONES DE VISITA A COCALMAYO", 20, 210);
                        doc.setFontType("normal");
                        var text = '1. El plazo de pago para la vigencia de la reserva es de 2 horas.';
                        multiline(text,215);
                        var text = '2. La compra del ticket implica la aceptación de las condiciones del reglamento de cocalmayo y protocolo de bioseguridad.';
                        multiline(text,220);
                        text ="2. Hacer su reservación por internet o vía telefónica en las oficinas de turismo.";
                        multiline(text,230);
                        text ="3. Los padres o jefes del grupo son estrictamente responsables de los menores de edad y personas de riesgo a su cargo.";
                        multiline(text,235);
                        text ="4. Prohibido pasar de poza en poza. Se debe permanecer en la poza asignada.";
                        multiline(text,245);
                        text ="5. Prohibido llevar alimentos y bebidas alcohólicas.";
                        multiline(text,255);
                        text ="6. El incumplimiento de las restricciones autoriza a ser retirados del balneario sin reembolso y sin derecho a reclamo.";
                        multiline(text,260);
                        doc.setFontSize(14);
                        doc.setFontType("bold");
                        doc.text("RECOMENDACIONES", 20, 280);
                        doc.setFontType("normal");
                        text ="1. Es necesario tomar una ducha posterior al uso de los baños termales en sus hogares o hospedajes.";
                        multiline(text,285);
                        
                        var date = new Date();
                        var filename =
                            "MDST-"+idreserva.toString() +"-"+
                            ("0" + date.getDate()).slice(-2)  +"_"+
                            ("0" + (date.getMonth() + 1)).slice(-2) +"_"+
                             date.getFullYear() +
                            ".pdf";
                        //generate codebar
                        JsBarcode("#itf", idreserva.toString(), {format: "CODE39"});
                        const img = document.querySelector('img#itf');
                        doc.setFontSize(10);
                        //doc.text(60, 180, 'QR CODE MDST');
                        //                                   width,height
                        doc.addImage(img.src, 'JPEG', 140, 20, 45, 20);
                        doc.save(filename);
                        window.open(doc.output('bloburl'), '_blank');
    
    
                        $.ajax({
                            url: 'http://munisantateresa.gob.pe/senderbooking/sender.php',
                            type: 'POST',
                            data: {
                                correo: correo,
                                nroreserva: idreserva,
                                fechavisita: fechavisita,
                                horavisita:getHora(horario),
                                npoza:getPoza(poza),
                                nombrecompleto: nombre+" "+apellidos,
                                ndocumento:nrodocumento,
                                vlocal: local,
                                vnacional:nacional,
                                vextranjero:extranjero,
                                vlocal_n: local_n,
                                vnacional_n:nacional_n,
                                vextranjero_n:extranjero_n,
                                mpagar:total.toString()
    
                            }
                        })
                            .done(function (resp) {
                            })




                }).catch(error => {
                    console.log(error.response)
                    Swal.fire({
                        type: "error",
                        title: "Error!",
                        text: "NO PUDIMOS TENER CONEXION CON EL SERVIDOR, INTENTELO MÁS TARDE",
                        confirmButtonText: 'OK'
                    });
                });
                        
            },
            loading(){
                Swal.fire({
                    type: "success",
                    title: 'Su reserva ha sido '+'<br>GENERADA'
                    ,
                    showCancelButton: false,
                 
                  }).then(function() {
                    Swal.fire({
                        type: "info",
                        title: "Recuerda que debes cancelar tu reserva antes de ingresar",
                        timer:8000,
                        showCancelButton: false,
                        showConfirmButton: false
                    }).then(function(){
                        window.location="";
                    });
                });

              
            }
            
            },
            template: `<div class="col-sm-6" style="float:right;">
                            <button id="generar" @click="addReserva();loading();" type="button"  class="btn btn-primary" >Generar Pedido</button>
                        </div>`,

            

            })

    }
      
}

var element15 = document.getElementById("step4p");
    element15.onclick = function(event) {
        previewstep();
}

/*
var element16 = document.getElementById("generar");
    element16.onclick = function(event) {

        
        
}
*/


var element4 = document.getElementById("fecha");
    element4.onchange = function(event) {
        if (step == 1){
            fecha = element4.value;
            document.getElementById("fechavisita").value = fecha;
            
            if (fecha != null && fecha != ""){

                var objXMLHttpRequest = new XMLHttpRequest();
                objXMLHttpRequest.onreadystatechange = function() {
                if(objXMLHttpRequest.readyState === 4) {
                    if(objXMLHttpRequest.status === 200) {
                        

                   const json = JSON.parse(objXMLHttpRequest.responseText);
                   var horatemporal = 1;
        

                   let text = '<div id="tablahorario" class="table-wrapper-scroll-y my-custom-scrollbar"><table class="table table-dark table-hover center"><thead><tr><th class="text-center">POZA 1</th><th class="text-center">POZA 2</th><th class="text-center">POZA 3</th><th class="text-center">POZA 4</th></tr></thead><tbody>';
                    for (let x in json) {
                        text += "<tr><td><div id='div-"+json[x].HORARIO+"-"+json[x].ID_POZA1+"' class='buttonreservation'><Button id='"+json[x].HORARIO+"-"+json[x].ID_POZA1+"-"+json[x].POZA1+"' onClick='reservation(this)'><i class='bi bi-clock'></i> Horario<br>"+json[x].DESCRIPCION+ "<br>"+ json[x].POZA1+"</Button></div></td><td><div id='div-"+json[x].HORARIO+"-"+json[x].ID_POZA2+"' class='buttonreservation'><Button id='"+json[x].HORARIO+"-"+json[x].ID_POZA2+"-"+json[x].POZA2+"' onClick='reservation(this)' ><i class='bi bi-clock'></i> Horario<br>"+json[x].DESCRIPCION+ "<br>"+json[x].POZA2+"</Button></div></td><td><div id='div-"+json[x].HORARIO+"-"+json[x].ID_POZA3+"' class='buttonreservation'><Button id='"+json[x].HORARIO+"-"+json[x].ID_POZA3+"-"+json[x].POZA3+"' onClick='reservation(this)'><i class='bi bi-clock'></i> Horario<br>"+json[x].DESCRIPCION+ "<br>"+json[x].POZA3+"</Button></div></td><td><div id='div-"+json[x].HORARIO+"-"+json[x].ID_POZA4+"' class='buttonreservation'><Button id='"+json[x].HORARIO+"-"+json[x].ID_POZA4+"-"+json[x].POZA4+"' onClick='reservation(this)'><i class='bi bi-clock'></i> Horario<br>"+json[x].DESCRIPCION+ "<br>"+json[x].POZA4+"</Button></div></td></tr>";
                    }
                    text += "</tbody></table></div>"    
                    document.getElementById("tablahorario").innerHTML = text;
                    
                    //document.getElementById("tablahorario").innerHTML = obj.DESCRIPCION + ", " + obj.POZA1;
                    }
                }
                }
                objXMLHttpRequest.open('GET', "http://localhost:51811/api/AforoDisponible/"+fecha);
                objXMLHttpRequest.send();
                                
                }
              
            
        }
    
}

var element5 = document.getElementById("fechavisita");
    element5.onchange = function(event) {
        if (step == 2){
            fecha = element5.value;
            document.getElementById("fecha").value = fecha;
            if (fecha != null && fecha != ""){

            var objXMLHttpRequest = new XMLHttpRequest();
                objXMLHttpRequest.onreadystatechange = function() {
                if(objXMLHttpRequest.readyState === 4) {
                    if(objXMLHttpRequest.status === 200) {
                        

                   const json = JSON.parse(objXMLHttpRequest.responseText);
                   var horatemporal = 1;

                   let text = '<div id="tablahorario" class="table-wrapper-scroll-y my-custom-scrollbar"><table class="table table-dark table-hover center"><thead><tr><th class="text-center">POZA 1</th><th class="text-center">POZA 2</th><th class="text-center">POZA 3</th><th class="text-center">POZA 4</th></tr></thead><tbody>';
                    for (let x in json) {
                        text += "<tr><td><div id='div-"+json[x].HORARIO+"-"+json[x].ID_POZA1+"' class='buttonreservation'><Button id='"+json[x].HORARIO+"-"+json[x].ID_POZA1+"-"+json[x].POZA1+"' onClick='reservation(this)'><i class='bi bi-clock'></i> Horario<br>"+json[x].DESCRIPCION+ "<br>"+ json[x].POZA1+"</Button></div></td><td><div id='div-"+json[x].HORARIO+"-"+json[x].ID_POZA2+"' class='buttonreservation'><Button id='"+json[x].HORARIO+"-"+json[x].ID_POZA2+"-"+json[x].POZA2+"' onClick='reservation(this)' ><i class='bi bi-clock'></i> Horario<br>"+json[x].DESCRIPCION+ "<br>"+json[x].POZA2+"</Button></div></td><td><div id='div-"+json[x].HORARIO+"-"+json[x].ID_POZA3+"' class='buttonreservation'><Button id='"+json[x].HORARIO+"-"+json[x].ID_POZA3+"-"+json[x].POZA3+"' onClick='reservation(this)'><i class='bi bi-clock'></i> Horario<br>"+json[x].DESCRIPCION+ "<br>"+json[x].POZA3+"</Button></div></td><td><div id='div-"+json[x].HORARIO+"-"+json[x].ID_POZA4+"' class='buttonreservation'><Button id='"+json[x].HORARIO+"-"+json[x].ID_POZA4+"-"+json[x].POZA4+"' onClick='reservation(this)'><i class='bi bi-clock'></i> Horario<br>"+json[x].DESCRIPCION+ "<br>"+json[x].POZA4+"</Button></div></td></tr>";
                    }
                    text += "</tbody></table></div>"    
                    document.getElementById("tablahorario").innerHTML = text;
                    
                    //document.getElementById("tablahorario").innerHTML = obj.DESCRIPCION + ", " + obj.POZA1;
                    }
                }
                }
                objXMLHttpRequest.open('GET', "http://localhost:51811/api/AforoDisponible/"+fecha);
                objXMLHttpRequest.send();
                            
            }
            /*
                        
                axios.get("http://191.97.48.115:80/api/AforoDisponible/"+fecha)
              .then((response)=>{
                  this.tablahorarios=response.data;        
              });
              }
          */
        }
    
}

//ADULTOS
var element6 = document.getElementById("locales");
    element6.onchange = function(event) {
        local = element6.value;
        nacional = document.getElementById("nacionales").value;
        extranjero = document.getElementById("extranjeros").value;
        local_n = document.getElementById("locales_n").value;
        nacional_n = document.getElementById("nacionales_n").value;
        extranjero_n = document.getElementById("extranjeros_n").value;
        total = (local*montolocal) + (nacional*montonacional) + (extranjero*montoextranjero)+ (local_n*montolocal_n) + (nacional_n*montonacional_n) + (extranjero_n*montoextranjero_n); 
        document.getElementById("cantidadvisitantesA").innerHTML='<span id ="cantidadvisitantesA" class="form-label" style="display:inline;">Locales: '+local+" | Nacionales: "+nacional+" | Extranjeros: "+extranjero+'</span>';
        document.getElementById("cantidadvisitantesN").innerHTML='<span id ="cantidadvisitantesN" class="form-label" style="display:inline;">Locales: '+local_n+" | Nacionales: "+nacional_n+" | Extranjeros: "+extranjero_n+' | Total : '+(parseInt(local)+parseInt(nacional)+parseInt(extranjero)+parseInt(local_n)+parseInt(nacional_n)+parseInt(extranjero_n))+'</span>';
        document.getElementById("total").innerHTML='<span id ="total" class="form-label" style="display:inline;color:red;">S/. '+total+'</span>';
         
      
    }

var element7 = document.getElementById("nacionales");
    element7.onchange = function(event) {
        nacional = element7.value;
        local = document.getElementById("locales").value;
        extranjero = document.getElementById("extranjeros").value;
        local_n = document.getElementById("locales_n").value;
        nacional_n = document.getElementById("nacionales_n").value;
        extranjero_n = document.getElementById("extranjeros_n").value;
        total = (local*montolocal) + (nacional*montonacional) + (extranjero*montoextranjero)+ (local_n*montolocal_n) + (nacional_n*montonacional_n) + (extranjero_n*montoextranjero_n); 
        document.getElementById("cantidadvisitantesA").innerHTML='<span id ="cantidadvisitantesA" class="form-label" style="display:inline;">Locales: '+local+" | Nacionales: "+nacional+" | Extranjeros: "+extranjero+'</span>';
        document.getElementById("cantidadvisitantesN").innerHTML='<span id ="cantidadvisitantesN" class="form-label" style="display:inline;">Locales: '+local_n+" | Nacionales: "+nacional_n+" | Extranjeros: "+extranjero_n+' | Total : '+(parseInt(local)+parseInt(nacional)+parseInt(extranjero)+parseInt(local_n)+parseInt(nacional_n)+parseInt(extranjero_n))+'</span>';
        document.getElementById("total").innerHTML='<span id ="total" class="form-label" style="display:inline;color:red;">S/. '+total+'</span>';
         


    }

var element8 = document.getElementById("extranjeros");
    element8.onchange = function(event) {
        extranjero = element8.value;
        local = document.getElementById("locales").value;
        nacional = document.getElementById("nacionales").value;
        local_n = document.getElementById("locales_n").value;
        nacional_n = document.getElementById("nacionales_n").value;
        extranjero_n = document.getElementById("extranjeros_n").value;
        total = (local*montolocal) + (nacional*montonacional) + (extranjero*montoextranjero)+ (local_n*montolocal_n) + (nacional_n*montonacional_n) + (extranjero_n*montoextranjero_n); 
        document.getElementById("cantidadvisitantesA").innerHTML='<span id ="cantidadvisitantesA" class="form-label" style="display:inline;">Locales: '+local+" | Nacionales: "+nacional+" | Extranjeros: "+extranjero+'</span>';
        document.getElementById("cantidadvisitantesN").innerHTML='<span id ="cantidadvisitantesN" class="form-label" style="display:inline;">Locales: '+local_n+" | Nacionales: "+nacional_n+" | Extranjeros: "+extranjero_n+' | Total : '+(parseInt(local)+parseInt(nacional)+parseInt(extranjero)+parseInt(local_n)+parseInt(nacional_n)+parseInt(extranjero_n))+'</span>';
        document.getElementById("total").innerHTML='<span id ="total" class="form-label" style="display:inline;color:red;">S/. '+total+'</span>';
        


    }

//NIÑOS
var element39 = document.getElementById("locales_n");
    element39.onchange = function(event) {
        local_n = element39.value;
        nacional_n = document.getElementById("nacionales_n").value;
        extranjero_n = document.getElementById("extranjeros_n").value;
        local = document.getElementById("locales").value;
        nacional = document.getElementById("nacionales").value;
        extranjero = document.getElementById("extranjeros").value;
        total = (local*montolocal) + (nacional*montonacional) + (extranjero*montoextranjero)+ (local_n*montolocal_n) + (nacional_n*montonacional_n) + (extranjero_n*montoextranjero_n); 
        document.getElementById("cantidadvisitantesA").innerHTML='<span id ="cantidadvisitantesA" class="form-label" style="display:inline;">Locales: '+local+" | Nacionales: "+nacional+" | Extranjeros: "+extranjero+'</span>';
        document.getElementById("cantidadvisitantesN").innerHTML='<span id ="cantidadvisitantesN" class="form-label" style="display:inline;">Locales: '+local_n+" | Nacionales: "+nacional_n+" | Extranjeros: "+extranjero_n+' | Total : '+(parseInt(local)+parseInt(nacional)+parseInt(extranjero)+parseInt(local_n)+parseInt(nacional_n)+parseInt(extranjero_n))+'</span>';
        document.getElementById("total").innerHTML='<span id ="total" class="form-label" style="display:inline;color:red;">S/. '+total+'</span>';
  


    }

var element20 = document.getElementById("nacionales_n");
    element20.onchange = function(event) {
        nacional_n = element20.value;
        local_n = document.getElementById("locales_n").value;
        extranjero_n = document.getElementById("extranjeros_n").value;
        local = document.getElementById("locales").value;
        nacional = document.getElementById("nacionales").value;
        extranjero = document.getElementById("extranjeros").value;
        total = (local*montolocal) + (nacional*montonacional) + (extranjero*montoextranjero)+ (local_n*montolocal_n) + (nacional_n*montonacional_n) + (extranjero_n*montoextranjero_n); 
        document.getElementById("cantidadvisitantesA").innerHTML='<span id ="cantidadvisitantesA" class="form-label" style="display:inline;">Locales: '+local+" | Nacionales: "+nacional+" | Extranjeros: "+extranjero+'</span>';
        document.getElementById("cantidadvisitantesN").innerHTML='<span id ="cantidadvisitantesN" class="form-label" style="display:inline;">Locales: '+local_n+" | Nacionales: "+nacional_n+" | Extranjeros: "+extranjero_n+' | Total : '+(parseInt(local)+parseInt(nacional)+parseInt(extranjero)+parseInt(local_n)+parseInt(nacional_n)+parseInt(extranjero_n))+'</span>';
        document.getElementById("total").innerHTML='<span id ="total" class="form-label" style="display:inline;color:red;">S/. '+total+'</span>';
    


    }

var element21= document.getElementById("extranjeros_n");
    element21.onchange = function(event) {
        extranjero_n = element21.value;
        local_n = document.getElementById("locales_n").value;
        nacional_n = document.getElementById("nacionales_n").value;
        local = document.getElementById("locales").value;
        nacional = document.getElementById("nacionales").value;
        extranjero = document.getElementById("extranjeros").value;
        total = (local*montolocal) + (nacional*montonacional) + (extranjero*montoextranjero)+ (local_n*montolocal_n) + (nacional_n*montonacional_n) + (extranjero_n*montoextranjero_n); 
        document.getElementById("cantidadvisitantesA").innerHTML='<span id ="cantidadvisitantesA" class="form-label" style="display:inline;">Locales: '+local+" | Nacionales: "+nacional+" | Extranjeros: "+extranjero+'</span>';
        document.getElementById("cantidadvisitantesN").innerHTML='<span id ="cantidadvisitantesN" class="form-label" style="display:inline;">Locales: '+local_n+" | Nacionales: "+nacional_n+" | Extranjeros: "+extranjero_n+' | Total : '+(parseInt(local)+parseInt(nacional)+parseInt(extranjero)+parseInt(local_n)+parseInt(nacional_n)+parseInt(extranjero_n))+'</span>';
        document.getElementById("total").innerHTML='<span id ="total" class="form-label" style="display:inline;color:red;">S/. '+total+'</span>';
        

    }




    
var element9 = document.getElementById("poza1");
    element9.onclick = function(event) {
        poza = 7;
        document.getElementById("pozaseleccionada").innerHTML='<span id ="pozaseleccionada" class="form-label" style="display:inline;">POZA 1</span>';
        
        if(horario!=0){
            var div = "div-"+horario+"-"+poza;
            var elemento = document.getElementById(div);
            var cantidad = elemento.children[0].id.split('-')[2];
            var id = div +"-"+cantidad;
            var total = parseInt(local) + parseInt(nacional) + parseInt(extranjero)+parseInt(local_n) + parseInt(nacional_n) + parseInt(extranjero_n);
            var resto = parseInt(cantidad) - total;

            if( parseInt(cantidad) >= total){
            backnormal(id,div,resto,horario);
            }
            else{
                Swal.fire({
                    type: "warning",
                    title: "Error!",
                    text: "AFORO NO DISPONIBLE",
                    confirmButtonText: 'OK'
                });
            }

        }
}

var element10 = document.getElementById("poza2");
    element10.onclick = function(event) {
        poza = 8;
        document.getElementById("pozaseleccionada").innerHTML='<span id ="pozaseleccionada" class="form-label" style="display:inline;">POZA 2</span>';
        if(horario!=0){
            var div = "div-"+horario+"-"+poza;
            var elemento = document.getElementById(div);
            var cantidad = elemento.children[0].id.split('-')[2];
            var id = div +"-"+cantidad;
            var total = parseInt(local) + parseInt(nacional) + parseInt(extranjero)+parseInt(local_n) + parseInt(nacional_n) + parseInt(extranjero_n);
            var resto = parseInt(cantidad) - total;

            if( parseInt(cantidad) >= total){
            backnormal(id,div,resto,horario);
            }
            else{
                Swal.fire({
                    type: "warning",
                    title: "Error!",
                    text: "AFORO NO DISPONIBLE",
                    confirmButtonText: 'OK'
                });
            }

        }
    
}

var element11 = document.getElementById("poza3");
    element11.onclick = function(event) {
        poza = 9;
        document.getElementById("pozaseleccionada").innerHTML='<span id ="pozaseleccionada" class="form-label" style="display:inline;">POZA 3</span>';
        if(horario!=0){
            var div = "div-"+horario+"-"+poza;
            var elemento = document.getElementById(div);
            var cantidad = elemento.children[0].id.split('-')[2];
            var id = div +"-"+cantidad;
            var total = parseInt(local) + parseInt(nacional) + parseInt(extranjero)+parseInt(local_n) + parseInt(nacional_n) + parseInt(extranjero_n);
            var resto = parseInt(cantidad) - total;

            if( parseInt(cantidad) >= total){
            backnormal(id,div,resto,horario);
            }
            else{
                Swal.fire({
                    type: "warning",
                    title: "Error!",
                    text: "AFORO NO DISPONIBLE",
                    confirmButtonText: 'OK'
                });
            }

        }

}

var element12 = document.getElementById("poza4");
    element12.onclick = function(event) {
        poza = 10;
        document.getElementById("pozaseleccionada").innerHTML='<span id ="pozaseleccionada" class="form-label" style="display:inline;">POZA 4</span>';
        if(horario!=0){
            var div = "div-"+horario+"-"+poza;
            var elemento = document.getElementById(div);
            var cantidad = elemento.children[0].id.split('-')[2];
            var id = div +"-"+cantidad;
            var total = parseInt(local) + parseInt(nacional) + parseInt(extranjero)+parseInt(local_n) + parseInt(nacional_n) + parseInt(extranjero_n);
            var resto = parseInt(cantidad) - total;

            if( parseInt(cantidad) >= total){
            backnormal(id,div,resto,horario);
            }
            else{
                Swal.fire({
                    type: "warning",
                    title: "Error!",
                    text: "AFORO NO DISPONIBLE",
                    confirmButtonText: 'OK'
                });
            }

        }

}

var element13 = document.getElementById("selecthorario");
    element13.onchange = function(event) {
        horario = document.getElementById("selecthorario").value;
        var horatexto = getHora(horario);

        var fecha = document.getElementById("fechavisita").value;
        
        var fechavisita = new Date(fecha);
        fechavisita.setDate(fechavisita.getDate() + 1);

        fechavisita = fechavisita.toLocaleDateString("es-ES", options);

        
        if(poza!=0){
            var div = "div-"+horario+"-"+poza;
            var elemento = document.getElementById(div);
            var cantidad = elemento.children[0].id.split('-')[2];
            var id = div +"-"+cantidad;
            var total = parseInt(local) + parseInt(nacional) + parseInt(extranjero);
            var resto = parseInt(cantidad) - total;
            if( parseInt(cantidad) >= total){
            backnormal(id,div,resto,horario);
            document.getElementById("labelfechavisita").innerHTML='<span id ="labelfechavisita" class="form-label" style="display:inline;">'+fechavisita+" de "+horatexto+'</span>';
            hora = horario;
            }
            else{
                Swal.fire({
                    type: "warning",
                    title: "Error!",
                    text: "AFORO NO DISPONIBLE",
                    confirmButtonText: 'OK'
                });
            }

        }
        
        
}

function abrirpoza1(){
    Swal.fire({
        //title: 'CONDICIONES  DE USO  DEL SERVICIO EN COCALMAYO',
        html: `<img src="img/infopoza1.jpg" class="responsive" width="1400" height="341"></img>`,
        //footer: '<a href=""></a>',
        showCloseButton: true,
          showConfirmButton: false,
          width: '800px'
        })
}
function abrirpoza2(){
    Swal.fire({
        //title: 'CONDICIONES  DE USO  DEL SERVICIO EN COCALMAYO',
        html: `<img src="img/infopoza2.jpg" class="responsive" width="1400" height="341"></img>`,
        //footer: '<a href=""></a>',
        showCloseButton: true,
          showConfirmButton: false,
          width: '800px'
        })
}

function abrirpoza3(){
    Swal.fire({
        //title: 'CONDICIONES  DE USO  DEL SERVICIO EN COCALMAYO',
        html: `<img src="img/infopoza3.jpg" class="responsive" width="1400" height="341"></img>`,
        //footer: '<a href=""></a>',
        showCloseButton: true,
          showConfirmButton: false,
          width: '800px'
        })
}

function abrirpoza4(){
    Swal.fire({
        //title: 'CONDICIONES  DE USO  DEL SERVICIO EN COCALMAYO',
        html: `<img src="img/infopoza4.jpg" class="responsive" width="1400" height="341"></img>`,
        //footer: '<a href=""></a>',
        showCloseButton: true,
          showConfirmButton: false,
          width: '800px'
        })
}
