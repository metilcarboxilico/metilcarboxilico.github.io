 
 
src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";

 //las variables obj, son donde se almacenan los objetivos y las user y rival el puntaje
    //y habiaendo una variable local en el turno que copie el puntaje previo y el puntaje a obtener
    var obj_user,obj_rival, user=0, rival=0; 
    //la tirada es comun a ambos ya que va ser constantemente rescrita.
    var tirada = new Array(3);

    var jugador=true; //una variable de quien es el turno, invertida al final de siguiente tirada? si se continua con el jugador o false si continua la maquina?

//elemento primordial de todo el juego, el pseudo random, en este caso acotado como un dado.
function dado(){
    return Math.floor((Math.random() * 6) + 1);
}
//una funcion para generar una tirada de tres dados en un array
function tirar(){
    for(a=0;a<tirada.length;a++){
        tirada[a]=dado();
    }
}

//funcion generica para modificar elemetnos, sobretodo orientada a marcadores.
function act(id_,txt_){
        document.getElementById(id_).innerHTML=String(txt_);
    }



//funcions de objetivo consta de dos partes la creacion del mismo y la asgnacion a cada juagdor:
//creacion del objetivo decidido por user asignar y comprobarlo el dato q sea valido
function num_obj(){
    
         objetivo = Number(prompt('Ingrese un número entre los siguientes, 4,5 o 6',''));
    while(isNaN(objetivo)||objetivo<4||objetivo>6)
    {
        objetivo = Number(prompt('Error. Ingrese un número objetivo corecto',''));
        
    }
    return objetivo;}

//objetivo hecho al azar.
function obj(){
     obj_=dado();   //reutilizar la funcion dado para obtener un numero dentro de un conjunto mas acotado.
        while(isNaN(obj_)||obj_<4||obj_>6){
             obj_=dado();
        }
    return obj_;
    }

//asignacion al azar
function asignar(){
obj_rival=obj();
act('rival',obj_rival);
obj_user=obj();
act("yo",obj_user);
}
//asignacion decidida por el usuario
function decidir(){
alert(" a continuacionelija el numero objetivo de su rival");
obj_rival=num_obj();
act('rival',obj_rival);
alert(" a continuacion elija su numero objetivo");
obj_user=num_obj();
act("yo",obj_user);
}
/*
    funcion central del juego, el flujo de eventos se centra en determinar y asignar un turno,
    tirar los dados invocando a una funcion y corroborar esa tirada luego asignar puntaje o cambiar de turno
    dejo los rastros de la consola y cierto codigos comentados como metodo primitivo de comprovacion
*/
function ganar(){
    if(puntaje==15){
        $(document).ready(function(){
            $("#turno").hide();
            $("#marcadores").hide();
            $("#re").show();
    });
        return true;
    }
}
function re(){
    location.reload();
}
function turno(){
        
       toca();
        tirar();
        //problemas con las incro lo mas probalbe es que deberia separar las funciones y hacer que primero se tire, luego se actualice luego se compruebe el puntaje
        //por eso cambio la dispocicion de tirada a siguiente turno y el msj a turno fue:
        console.log("si es true es mi turno: "+jugador);
        console.log("puntaje: "+puntaje);
        console.log("objetivo: "+objetivo);
        console.log(tirada);
        for(t=0;t<tirada.length;t++){//reviso si hay algun objetivo
                act("t"+String(t),tirada[t]);
        }
        //puntajes
        puntos();
        
        console.log("puntaje: "+puntaje);

        //  control de que el puntaje este dentro de los parametros del juego
        //aca o donde deveria ir  el control de si se repite la tirada o no
        control();
    }


function toca(){
    if(jugador){//como no se como pasar by copy una variable agrego un if haciendolo
           // alert("es tu turno ");
            puntaje=user;//copio el puntaje del turno actual
            objetivo=obj_user;
            //funcions de actualizacion de marcadores en el html
            
          //  act("quien","tu turno fue: ");
        }else{
           //    alert("es su turno ");
            puntaje=rival;
            objetivo=obj_rival;
            
           // act("quien"," el turno de la maquina fue:");
        }
}
function puntos(){
    if(tirada[0]==objetivo&&tirada[1]==objetivo&&tirada[2]==objetivo){//dicierne si se gana el juego x dados identicos con el obje.
            alert("ganastes el juego por la tirada de tres numeros");
        }else{
                ante=tirada[2];
            for(t=0;t<tirada.length;t++){//reviso si hay algun objetivo
                console.log("for en t= "+ t +" resvision de comparacion de n°: " + ante);
                //act("t"+String(t),tirada[t]);
                if(tirada[t]==objetivo){puntaje+=1;}
                if((ante+tirada[t])==objetivo){puntaje+=1;}// revisa las sumas
                    
                    ante=tirada[t];
            }

            /*la unica excepcion seria un tripe 2 con objetivo 4 que daria 8 puntos 
            ya q ab bc y ca son 3 puntos mas el triplo 
            que al no estar aclarada, la contemplo como legal en la logica del programa*/

            if(tirada[0]==tirada[1]&&tirada[1]==tirada[2]){
                puntaje+=5;
            }
        }
};

function control(){
    if(puntaje<=15){//asigno el puntaje del turno actual
            if (jugador&&user!=puntaje){                
                user=puntaje;
                if(ganar()){alert("ganaste el juego!!!");}
                alert("el turno continua se ganaron puntos");
                act("pp",user);
            }else if(!jugador&&rival!=puntaje){//el puntaje q se compara es el del rival 
                rival=puntaje;
                if(ganar()){alert("la maquina gana el juego!!!");}
                alert("la maquina continua gano puntos");
                act("rp",rival);
            }else{//cambia el turno
                jugador= !jugador;

                alert("no se lograron puntos, se cambia de turno");
                if(jugador){act("quien","es tu turno ");                
                }else{act("quien","es el turno de la maquina ");
                
                }
            }
        }else{
            alert("no se obtuvieron puntos por exederse de 15 puntos, se cambia de turno");
            jugador= !jugador;
            if(jugador){act("quien","es tu turno ");
            }else{act("quien","es el turno de la maquina ");}
            
        }};

//jquerry haciendo modificando los display de los botones a usar en funcion de los id.
$(document).ready(function(){
  $("#deci").click(function(){
    $("#deci").hide();
    $("#asig").hide();    
    $("#turno").show();
    $("#marcadores").show();
  });
  $("#asig").click(function(){
    $("#deci").hide();
    $("#asig").hide();
    $("#turno").show();
    $("#marcadores").show();
  });
});
