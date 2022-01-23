exports = async function(changeEvent) {
  
  const movies= context.services.get("Cluster0").db("Escuela").collection("Matricula");
  const conteo= context.services.get("Cluster0").db("Escuela").collection("Periodo");

  try {

 
  conteo.updateOne({_id:changeEvent.fullDocumentBeforeChange.Periodo},
  {
       $inc: {
        cupos:-1
        }
  }
 );
       console.log("Eliminado y restado el Periodo");   

  } catch (err) {
    
    console.error("No valio", err);
  }
  
  return; 
  
};