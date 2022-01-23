exports = async function(changeEvent) {
  
  const movies= context.services.get("Cluster0").db("Escuela").collection("Matricula");
  const conteo= context.services.get("Cluster0").db("Escuela").collection("Periodo");

  try {
  const frutas=await movies.count({Estudiante: changeEvent.fullDocument.Estudiante, Periodo:changeEvent.fullDocument.Periodo});
console.log(frutas);
  if(frutas>=2){
    movies.deleteOne({_id: changeEvent.documentKey._id});
    movies.insertOne({fullDocumentBeforeChange});
          console.log("Usuario ya registrado");
    throw Error;

  }
  
   conteo.updateOne({_id:changeEvent.fullDocumentBeforeChange.Periodo},
  {
       $inc: {
        cupos:-1
        }
  }
 );
  
  
 const contar=  conteo.updateOne({_id:changeEvent.fullDocument.Periodo},
  {
       $inc: {
        cupos:1
        }
  }
 );
       console.log(JSON.stringify(contar));   

  } catch (err) {
    
    console.error("No valio", err);
  }
  
  return; 
  
};