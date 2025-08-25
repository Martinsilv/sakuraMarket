import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Ajusta a tu ruta

async function detectarCamposFaltantes() {
  const productosRef = collection(db, "sakura-products");
  const snapshot = await getDocs(productosRef);

  const errores = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    const problemas = [];

    // Revisar campos que podrían causar .toLowerCase o .length
    if (!data.name || typeof data.name !== "string") {
      problemas.push("Campo 'name' vacío o no es string");
    }
    if (!data.description || typeof data.description !== "string") {
      problemas.push("Campo 'description' vacío o no es string");
    }

    if (!data.price || typeof data.price !== "number") {
      problemas.push("Campo 'price' vacío o no es number");
    }

    if (problemas.length > 0) {
      errores.push({
        id: doc.id,
        problemas,
        data,
      });
    }
  });

  console.log("Productos con problemas:", errores);
}

export default detectarCamposFaltantes;
