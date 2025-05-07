const express = require("express");
const {
  getProfil,
  createProfil,
  updateProfil,
  deleteProfil,
} = require("../controller/profilController");
const router = express.Router();

// Profil ile ilgili route'lar
router.get("/profil/:id", getProfil); // Profil bilgilerini al

router.post("/profil", createProfil); // Yeni profil oluştur

router.put("/profil/:id", updateProfil); // Profil bilgilerini güncelle

router.delete("/profil/:id", deleteProfil); // Profil sil

module.exports = router;
// Profil ile ilgili route'lar
