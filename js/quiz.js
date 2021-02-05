




//if(true==1){
    //alert("abre");}

    var preguntas=[
        "los daleks por definicion son buenos? ","el doctor siempre a sido un hombre? ",0,0,0,0,
        1,"en el 2005 se relanzo la serie?",1,"en el 2018 fue la ultma temporada?",1,1,
        "uno",1,1,0,0,"cero",
        "bonus"
        ];
        
        var respuestas=[
        0,0,0,0,0,0,
        1,1,1,1,1,1,
        1,1,1,0,0,0,
        1
        ];
    
        //descomentar y comentar las variables anteriores para corroborar el funcionamiento sin tener q saber las preguntas
        /*
         
        var preguntas=[
        0,0,0,0,0,0,
        1,1,1,1,1,1,
        "uno",1,1,0,0,"cero",
        "bonus"
        ];
        
        var respuestas=[
        0,0,0,0,0,0,
        1,1,1,1,1,1,
        1,1,1,0,0,0,
        1
        ];
    */
    
        var usuario=[];//provisorio
    
        var puntaje=0, erros=0, actual=0;
        var correctas=0;//provisorio
        
    
       // display:none
        //display:block o inline o como fuese
        //fillset sed le puede asociar esa caracteristica.
    
        function iniciar(){
            document.getElementById('preg').innerHTML=preguntas[actual];
            
            document.datos.inicio.disabled=true;
            document.datos.resp.disabled=false;
    
            document.datos.inicio.style.display ="none";
            document.datos.resp.style.display ="inline";
            document.getElementById('radiu').style.display="block";// con un <p> solucione  el ocultar o no tods
            }
    
        function responder(){
            respUser=document.datos.user.value;//aca un while si resp no esta dentro de los parametros
           if(respUser!="0"&&respUser!="1"){
                alert("no ha respondido la pregunta! ");
            }else{
                usuario.push(respUser);
                //en caso de ser rejugable usuario[actual] =resUser;
                //y podria declarar var usuario=new Array(preguntas.length);
    
                //comparacionde pregunta y puntaje que se asigna
                if(respUser==respuestas[actual])
                {
                // alert('correto');
                    correctas++;// provisorio para corroborar 
                    if(actual<6){
                        puntaje+=5;
                    }else if (actual<11){
                        puntaje+=10;
                    }else if (actual<17){
                        puntaje+=20;
                    }else if (actual==18){
                        puntaje*=2;
                    }
    
                }else{
                    //alert('la pifiastes')
                    erros++
                }
        
    
                if((erros<=3&&actual<6)||(erros<=2&&actual<12)||(erros<=1&&actual<18)){
                    cambiarpregunta();
                    //aca falla por que deberia evitar si tengo erros darme el num 18 
    
                }else if(actual==18&&erros==0)//me salta pese a todo el bonus es que esto no deberia estar solo aca, deberia controlarse ademas cuando se actualiza?
                {
                    cambiarpregunta();// en teoria esto volveriaq da dar una vuelta mas
                    alert("se termino el juego con bonus")
                    alert("tu puntaje es: "+ puntaje);
                }else 
                {//esta opcion deberia desabilitar todo boton! se pueden seguir usando sino y es medio cualca
                    document.getElementById("fin").innerHTML="no hay mas preguntas";
                    alert("se termino el juego")
                    alert("tu puntaje es: "+ puntaje);
                    document.datos.resp.disabled=true;
                }
                
                consola();
                cartel();
            }
            act("pp",puntaje);
            act("rc",correctas);
            act("er",erros);
        }
    
    //donde esta la falla del bonus? en el responder o en el pregunta?
        function cambiarpregunta(){//aca deberia borrar el contador de erros?
            //cambia el index del array
    
                actual++;
    
            if(actual==18&&erros==0)//compara si exiten las condiciones para el bonus
            {
                alert("atenti la siguiente pregunta es bonus!!!")
                document.getElementById("fin").innerHTML="lapregunta actual es un bonus y duplica tu puntaje !!!";
                document.getElementById('preg').innerHTML=preguntas[actual];
    
            }else if(actual<=17){//actualiza la pregunta 
                document.getElementById("pa").innerHTML=actual+1;
                document.getElementById('preg').innerHTML=preguntas[actual];
            }else if(actual>=preguntas.length||actual==18)  //clausura la botonera si el index exede al array o no se logro el bonus
            {
                alert("se termino el juego!!! llegastae a  la final")
                alert('tu puntaje es: '+puntaje);
                document.getElementById("fin").innerHTML="no hay mas preguntas";
                document.datos.resp.disabled=true;
            }
    
        }
    
        function cartel(){
            if(actual==6||actual==12||actual==18)   
            {//salta joya 
                alert('correctas totales '+correctas);
                alert("tu puntaje es: "+ puntaje);
                //reseteo
                erros=0;
                console.log("el cartel en la R: " + actual+"\n");
            }
            
        }
    
        function consola(){
            
            console.log("correctas " + correctas+"\n");
            console.log("actual " + actual+"\n");
            console.log("erros " + erros+"\n");
            console.log("puntaje " + puntaje+"\n");
            console.log("user " + usuario +"\n");
        }
    

        //funcion generica para modificar elemetnos, sobretodo orientada a marcadores.
function act(id_,txt_){
    document.getElementById(id_).innerHTML=String(txt_);
}