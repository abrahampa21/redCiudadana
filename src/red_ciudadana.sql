-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: red_ciudadana
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Alumbrado','Se refiere al sistema de iluminación de las vías públicas, parques, plazas y demás espacios de libre circulación.'),(2,'Seguridad','Involucra la presencia policial, el monitoreo a través de cámaras de videovigilancia y la prevención del delito para garantizar un entorno de paz en la comunidad.'),(3,'Agua','Comprende la infraestructura y el suministro del líquido vital para el uso doméstico, comercial e industrial, así como el sistema de alcantarillado y drenaje.'),(4,'Áreas verdes','Incluye todos los espacios públicos urbanos cubiertos de vegetación, como parques, jardines, camellones y bosques urbanos.'),(5,'Tránsito','Involucra el diseño de las calles, la semaforización, la señalización vial y el cumplimiento de los reglamentos de vialidad para garantizar desplazamientos seguros y eficientes.'),(6,'Baches y vialidad','Representa el deterioro de la carpeta asfáltica o pavimentación en las calles y avenidas, manifestado en forma de hoyos o hundimientos.');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `id_estado` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'Pendiente'),(2,'En proceso'),(3,'Resuelto'),(4,'Rechazado');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evidencias`
--

DROP TABLE IF EXISTS `evidencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evidencias` (
  `id_evidence` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_archivo` varchar(255) NOT NULL,
  `ruta_archivo` varchar(500) NOT NULL,
  `fecha_subida` datetime DEFAULT current_timestamp(),
  `id_reporte` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_evidence`),
  KEY `id_reporte` (`id_reporte`),
  CONSTRAINT `evidencias_ibfk_1` FOREIGN KEY (`id_reporte`) REFERENCES `reporte` (`id_reporte`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evidencias`
--

LOCK TABLES `evidencias` WRITE;
/*!40000 ALTER TABLE `evidencias` DISABLE KEYS */;
INSERT INTO `evidencias` VALUES (17,'callejon.jfif','uploads/evidencias_reportes/evidencia_6a6d3d7106020.jfif','2026-07-31 18:27:29',32),(18,'poste_luz.jfif','uploads/evidencias_reportes/evidencia_6a6d3e26dca75.jfif','2026-07-31 18:30:30',33),(19,'basura.jfif','uploads/evidencias_reportes/evidencia_6a6d3ef08ef7e.jfif','2026-07-31 18:33:52',34),(20,'agua.jfif','uploads/evidencias_reportes/evidencia_6a6d3fec1eaab.jfif','2026-07-31 18:38:04',35),(21,'calle.jfif','uploads/evidencias_reportes/evidencia_6a6d411342ce7.jfif','2026-07-31 18:42:59',36),(22,'alcantarilla.jfif','uploads/evidencias_reportes/evidencia_6a6d41f7ebce2.jfif','2026-07-31 18:46:48',37),(25,'posterene.jfif','uploads/evidencias_reportes/evidencia_6a75e636a29cb.jfif','2026-08-07 08:05:42',40),(45,'semaforo.jfif','uploads/evidencias_reportes/evidencia_6a7a75e12fa83.jfif','2026-08-10 19:07:45',62);
/*!40000 ALTER TABLE `evidencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_reportes`
--

DROP TABLE IF EXISTS `historial_reportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_reportes` (
  `id_historial` int(11) NOT NULL AUTO_INCREMENT,
  `comentario` varchar(1000) DEFAULT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `id_reporte` int(11) DEFAULT NULL,
  `id_estado` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_historial`),
  KEY `id_reporte` (`id_reporte`),
  KEY `id_estado` (`id_estado`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `historial_reportes_ibfk_1` FOREIGN KEY (`id_reporte`) REFERENCES `reporte` (`id_reporte`),
  CONSTRAINT `historial_reportes_ibfk_2` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`),
  CONSTRAINT `historial_reportes_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_reportes`
--

LOCK TABLES `historial_reportes` WRITE;
/*!40000 ALTER TABLE `historial_reportes` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial_reportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prioridades`
--

DROP TABLE IF EXISTS `prioridades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prioridades` (
  `id_prioridades` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_prioridades`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prioridades`
--

LOCK TABLES `prioridades` WRITE;
/*!40000 ALTER TABLE `prioridades` DISABLE KEYS */;
INSERT INTO `prioridades` VALUES (1,'Baja'),(2,'Media'),(3,'Alta');
/*!40000 ALTER TABLE `prioridades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reporte`
--

DROP TABLE IF EXISTS `reporte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reporte` (
  `id_reporte` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `id_usuario` int(11) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `id_prioridades` int(11) DEFAULT NULL,
  `id_estado` int(11) DEFAULT NULL,
  `retroalimentacion` text DEFAULT NULL,
  PRIMARY KEY (`id_reporte`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_categoria` (`id_categoria`),
  KEY `id_prioridades` (`id_prioridades`),
  KEY `id_estado` (`id_estado`),
  CONSTRAINT `reporte_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `reporte_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  CONSTRAINT `reporte_ibfk_3` FOREIGN KEY (`id_prioridades`) REFERENCES `prioridades` (`id_prioridades`),
  CONSTRAINT `reporte_ibfk_4` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reporte`
--

LOCK TABLES `reporte` WRITE;
/*!40000 ALTER TABLE `reporte` DISABLE KEYS */;
INSERT INTO `reporte` VALUES (32,'Inseguridad en callejón','Este callejón se ha vuelto una zona insegura debido a la constante presencia de personas con actitud sospechosa que merodean por el área, generando preocupación e intimidación entre los vecinos. Además, se ha observado el consumo de marihuana y otras sustancias en la vía pública, lo que afecta la tranquilidad y la seguridad de la comunidad.','Calle 105-A, La Paz','2026-07-31 18:27:29','2026-08-10 08:13:20',2,2,2,3,'Problemática resuelta, se desplegará un operativo para arrestar a los sospechosos.'),(33,'Poste de luz en mal estado','Este poste de luz representa un riesgo para los vecinos durante las lluvias, ya que en varias ocasiones se han escuchado explosiones y se han registrado apagones repentinos. Esta situación genera preocupación entre los habitantes de la zona, debido al peligro que podría representar para la seguridad de las personas y sus viviendas.','Calle 112, Avenida Gobernadores','2026-07-31 18:30:30','2026-08-09 10:05:44',2,1,3,2,NULL),(34,'Basura en área verde','Lo que anteriormente era un área verde en buen estado se ha convertido, con el paso de los meses, en un tiradero frecuente de basura. Esta situación genera molestias entre los vecinos y afecta la imagen de la comunidad. A pesar de que los habitantes de la zona realizan labores constantes de limpieza para mantener el área en buenas condiciones, el problema persiste debido a que continúa siendo utilizada para depositar desechos de manera indebida.','Calle 102, Avenida Cuauhtémoc','2026-07-31 18:33:52','2026-08-09 10:05:34',2,4,3,1,NULL),(35,'Fuga de agua','Existe una fuga de agua en la colonia San Joaquín que se presenta de manera recurrente y permanece durante varios días antes de ser atendida. Esta situación provoca molestias e inconformidad entre los vecinos, ya que además de representar un desperdicio considerable de agua, afecta la calidad de vida de quienes habitan en la zona.','Calle 14A, Col. San Joaquín','2026-07-31 18:38:04','2026-08-09 10:05:51',2,3,3,2,NULL),(36,'Calle sin pavimentar','La calle ubicada detrás de Bodega Aurrera lleva varios meses sin ser pavimentada, lo que dificulta el tránsito vehicular y peatonal. Esta situación genera molestias para quienes circulan diariamente por la zona, además de incrementar el riesgo de accidentes y daños a los vehículos debido a las malas condiciones de la vía.','Calle 112, Avenida Gobernadores','2026-07-31 18:42:59','2026-08-09 10:06:00',2,6,1,2,NULL),(37,'Alcantarilla en mal estado','La alcantarilla ubicada en el estacionamiento de Bodega Aurrera genera, especialmente durante las tardes, malos olores y el desbordamiento de aguas residuales. Esta situación provoca molestias entre los vecinos y personas que transitan por la zona, además de representar un problema de higiene y salud pública que requiere atención oportuna.','Calle 112, Avenida Gobernadores, Bodega Aurrerá','2026-07-31 18:46:48','2026-08-05 18:15:25',1,3,1,3,'Las autoridades correspondientes fueron notificadas de su caso dándoles una solución a su problema'),(40,'Poste de luz en mal estado','Este poste de luz presenta emisiones de chispas de manera intermitente, lo que representa un riesgo para la seguridad de los habitantes de la zona. La situación se agrava durante las lluvias, debido a la posibilidad de provocar descargas eléctricas o accidentes. Por ello, se solicita una revisión y atención oportuna para prevenir incidentes y garantizar la seguridad de la comunidad.','Av. Gobernadores Calle 105-B','2026-08-07 08:05:42','2026-08-07 08:13:32',1,1,2,2,'Muchas gracias por su reporte, ya se le notificó a las autoridades correspondientes las cuáles les darán seguimiento lo más pronto posible'),(62,'Semáforo descompuesto y en mal estado','El semáforo ubicado en el cruce de la Av. Gobernadores presenta fallas en sus luces, \nlo que dificulta la correcta circulación y puede provocar accidentes. \nSe solicita revisar y reparar el semáforo.','Calle 105-A Av. Gobernadores','2026-08-10 19:07:45','2026-08-10 19:10:54',2,5,2,3,'Se recibió el reporte y se verificó la problemática. Se realizó la revisión y reparación correspondiente del semáforo, quedando restablecido su funcionamiento.');
/*!40000 ALTER TABLE `reporte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ciudadano'),(2,'administrador');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `fecha_registro` datetime DEFAULT current_timestamp(),
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo` (`correo`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Melanie Alcocer','melanie@gmail.com','a4f997c1534530c9000b0b1259d7cada4122108b','9817834567',1,'2026-06-01 18:20:53',1),(2,'Abraham Pech','abraham@gmail.com','a4f997c1534530c9000b0b1259d7cada4122108b','9811309087',1,'2026-07-02 19:09:28',1),(3,'Bruno Cervera','bruno@gmail.com','a4f997c1534530c9000b0b1259d7cada4122108b','9813725721',1,'2026-07-04 09:28:32',2),(9,'Kevin Bacab','kevin@gmail.com','a4f997c1534530c9000b0b1259d7cada4122108b','9813476574',0,'2026-07-18 19:12:01',1),(10,'Sergio Canché','sergio@gmail.com','a4f997c1534530c9000b0b1259d7cada4122108b','9812352621',1,'2026-07-31 18:47:52',2),(13,'Hugo Hernández','hugo@gmail.com','a4f997c1534530c9000b0b1259d7cada4122108b','9812361881',0,'2026-08-09 18:25:54',1),(14,'Daniel Pech','daniel@gmail.com','a4f997c1534530c9000b0b1259d7cada4122108b','9812345263',1,'2026-08-09 18:26:58',2);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-11  9:47:34
